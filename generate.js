'use strict';

const fs = require('fs');
const path = require('path');

const JOURNEYS_DIR = path.join(__dirname, 'journeys');
const OUTPUT_DIR = path.join(__dirname, 'output');

// ---------------------------------------------------------------------------
// PART 1: File reading and markdown parsing
// ---------------------------------------------------------------------------

function readJourneyFiles() {
  const files = fs.readdirSync(JOURNEYS_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.error('No .md files found in journeys/');
    process.exit(1);
  }
  return files.map(f => ({
    filename: f,
    slug: path.basename(f, '.md'),
    raw: fs.readFileSync(path.join(JOURNEYS_DIR, f), 'utf8'),
  }));
}

// Parse a bullet list block into an array of strings
// Handles lines starting with "  - " or "- "
function parseBulletList(text) {
  return text
    .split('\n')
    .map(l => l.replace(/^\s*-\s+/, '').trim())
    .filter(Boolean);
}

// Parse the value of a single-line field like:
//   - persona: Recreational Punter, Sharp
function parseField(lines, key) {
  const prefix = `- ${key}:`;
  const line = lines.find(l => l.trim().startsWith(prefix));
  if (!line) return null;
  return line.trim().slice(prefix.length).trim() || null;
}

// Parse a multi-line bullet field that follows a "- key:" header line.
// Collects all "  - item" lines immediately after it until the next "- key:" line.
function parseBulletField(lines, key) {
  const prefix = `- ${key}:`;
  const startIdx = lines.findIndex(l => l.trim().startsWith(prefix));
  if (startIdx === -1) return [];

  const items = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    // Stop at next field definition
    if (/^\s*- \w/.test(l) && l.includes(':')) break;
    // Collect bullet items
    if (/^\s*- /.test(l)) items.push(l.replace(/^\s*-\s+/, '').trim());
  }
  return items;
}

// Parse a single step block (text between two "### Step" headings)
function parseStep(block) {
  const lines = block.split('\n');

  // First non-empty line is the step name (stripped of "### ")
  const nameLine = lines.find(l => l.startsWith('### '));
  const name = nameLine ? nameLine.replace(/^###\s+/, '').trim() : 'Unnamed Step';

  // Detect branch tag on the name line e.g. "[branch: prematch]"
  const branchMatch = name.match(/\[branch:\s*([^\]]+)\]/);
  const branch = branchMatch ? branchMatch[1].trim() : null;
  const cleanName = name.replace(/\[branch:[^\]]+\]/, '').trim();

  return {
    name: cleanName,
    branch,
    persona:                  parseField(lines, 'persona'),
    touchpoint:               parseField(lines, 'touchpoint'),
    screenshot:               parseField(lines, 'screenshot'),
    description:              parseField(lines, 'description'),
    player_goal:              parseField(lines, 'player_goal'),
    business_goal:            parseField(lines, 'business_goal'),
    player_action_description: parseField(lines, 'player_action_description'),
    player_emotions:          parseField(lines, 'player_emotions'),
    success_criteria:         parseField(lines, 'success_criteria'),
    emotion_score:            Number(parseField(lines, 'emotion_score')) || null,
    // Bullet list fields
    user_actions:   parseBulletField(lines, 'user_actions'),
    pain_points:    parseBulletField(lines, 'pain_points'),
    opportunities:  parseBulletField(lines, 'opportunities'),
    ideas:          parseBulletField(lines, 'ideas'),
    data_sources:   parseBulletField(lines, 'data_sources'),
  };
}

// Parse a phase block — everything between two "## Phase:" headings
function parsePhase(block) {
  const lines = block.split('\n');
  const nameLine = lines.find(l => l.startsWith('## Phase:'));
  const questionLine = lines.find(l => l.startsWith('## guiding_question:'));

  return {
    name: nameLine ? nameLine.replace(/^##\s+Phase:\s*/, '').trim() : 'Unnamed Phase',
    guiding_question: questionLine
      ? questionLine.replace(/^##\s+guiding_question:\s*/, '').trim()
      : null,
  };
}

// Parse top-level journey metadata from the header comment block
function parseMeta(raw) {
  const meta = {};
  const metaLines = raw.split('\n').filter(l => l.startsWith('# '));
  for (const line of metaLines) {
    const match = line.match(/^#\s+(\w+):\s*(.+)/);
    if (match) meta[match[1]] = match[2].trim();
  }
  return meta;
}

// Master parser: takes raw markdown, returns structured journey object
function parseJourney(slug, raw) {
  const meta = parseMeta(raw);

  // Split into phase+step blocks by "---" separators
  const sections = raw.split(/\n---\n/);

  const phases = [];
  const steps = [];
  let currentPhase = null;

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## Phase:')) {
      currentPhase = parsePhase(trimmed);
      phases.push(currentPhase);
      continue;
    }

    // A section may contain multiple steps (### headings)
    const stepBlocks = trimmed.split(/\n(?=### )/);
    for (const block of stepBlocks) {
      if (!block.trim().startsWith('###')) continue;
      const step = parseStep(block);
      step.phase = currentPhase ? currentPhase.name : null;
      steps.push(step);
    }
  }

  return {
    slug,
    title:       meta.Journey || slug,
    id:          meta.id || slug,
    description: meta.description || '',
    product:     meta.product || '',
    last_updated: meta.last_updated || '',
    phases,
    steps,
  };
}

// ---------------------------------------------------------------------------
// PART 2: HTML template generation
// ---------------------------------------------------------------------------

// Safe HTML escape
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Emotion score → colour (red=low, amber=mid, green=high)
function emotionColor(score) {
  if (score === null) return '#cbd5e1';
  if (score <= 3) return '#f87171';
  if (score <= 5) return '#fb923c';
  if (score <= 7) return '#facc15';
  return '#4ade80';
}

// Phase header colour cycling
const PHASE_COLORS = ['#e0e7ff', '#fce7f3', '#d1fae5', '#fef9c3'];

// ---------------------------------------------------------------------------
// Layout engine
// Returns an array of node descriptors with x, y, width, height, plus
// connector descriptors { x1, y1, x2, y2, label? }
// ---------------------------------------------------------------------------
function layoutJourney(steps) {
  const NW = 150;   // node width
  const NH = 56;    // node height
  const HG = 64;    // horizontal gap between nodes
  const VG = 72;    // vertical gap between branch rows
  const STEP = NW + HG;

  // Separate steps into: pre-branch, branch rows, post-branch
  // A step is a "branch child" if it has a non-null branch value (single label)
  // A step is the "branch point" if its branch field contains '|'
  const branchPointIdx = steps.findIndex(s => s.branch && s.branch.includes('|'));
  const branchLabels   = branchPointIdx >= 0
    ? steps[branchPointIdx].branch.split('|').map(b => b.trim())
    : [];

  // Group branch children by label, preserving order
  const branchGroups = {};
  branchLabels.forEach(lbl => { branchGroups[lbl] = []; });

  steps.forEach(s => {
    if (s.branch && !s.branch.includes('|') && branchGroups[s.branch]) {
      branchGroups[s.branch].push(s);
    }
  });

  const preBranch  = steps.slice(0, branchPointIdx >= 0 ? branchPointIdx + 1 : steps.length);
  const postBranch = branchPointIdx >= 0
    ? steps.filter(s => !preBranch.includes(s) && !(s.branch && !s.branch.includes('|')))
    : [];

  // How many branch rows?
  const rowCount   = branchLabels.length || 1;
  const midRow     = Math.floor((rowCount - 1) / 2);

  // Max steps across all branch rows
  const maxBranchCols = Math.max(0, ...branchLabels.map(l => branchGroups[l].length));

  // X offsets
  const xPreEnd    = (preBranch.length - 1) * STEP;  // x of last pre-branch node
  const xBranchStart = preBranch.length * STEP;       // x where branches begin
  const xPostStart = xBranchStart + (maxBranchCols > 0 ? maxBranchCols * STEP : 0);

  // Y offsets: centre the whole branch block
  const totalBranchHeight = rowCount * NH + (rowCount - 1) * VG;
  const mainY = Math.floor(totalBranchHeight / 2) - Math.floor(NH / 2);
  const rowYs = branchLabels.map((_, i) => i * (NH + VG));

  const nodes      = [];
  const connectors = [];

  // --- Pre-branch nodes (all on mainY) ---
  preBranch.forEach((step, i) => {
    nodes.push({ step, x: i * STEP, y: mainY, w: NW, h: NH });
    if (i > 0) {
      connectors.push({ x1: i * STEP - HG, y1: mainY + NH / 2, x2: i * STEP, y2: mainY + NH / 2 });
    }
  });

  // --- Branch rows ---
  branchLabels.forEach((lbl, rowIdx) => {
    const rowY  = rowYs[rowIdx];
    const group = branchGroups[lbl];
    group.forEach((step, colIdx) => {
      const x = xBranchStart + colIdx * STEP;
      nodes.push({ step, x, y: rowY, w: NW, h: NH, branchLabel: lbl });

      if (colIdx === 0 && preBranch.length > 0) {
        // Connector from branch-point node to first node in this row
        const srcX = xPreEnd + NW;
        const srcY = mainY + NH / 2;
        const dstY = rowY + NH / 2;
        connectors.push({ x1: srcX, y1: srcY, x2: x, y2: dstY, curved: true });
      } else if (colIdx > 0) {
        connectors.push({
          x1: x - HG, y1: rowY + NH / 2,
          x2: x,      y2: rowY + NH / 2,
        });
      }
    });

    // Connector from last branch node to post-branch
    if (group.length > 0 && postBranch.length > 0) {
      const lastNode = group[group.length - 1];
      const srcX = xBranchStart + (group.length - 1) * STEP + NW;
      const srcY = rowY + NH / 2;
      const dstY = mainY + NH / 2;
      connectors.push({ x1: srcX, y1: srcY, x2: xPostStart, y2: dstY, curved: true });
    }
  });

  // --- Post-branch nodes ---
  postBranch.forEach((step, i) => {
    const x = xPostStart + i * STEP;
    nodes.push({ step, x, y: mainY, w: NW, h: NH });
    if (i > 0) {
      connectors.push({ x1: x - HG, y1: mainY + NH / 2, x2: x, y2: mainY + NH / 2 });
    } else if (branchLabels.length === 0 && preBranch.length > 0) {
      connectors.push({ x1: xPreEnd + NW, y1: mainY + NH / 2, x2: x, y2: mainY + NH / 2 });
    }
  });

  const svgW = xPostStart + postBranch.length * STEP + 40;
  const svgH = totalBranchHeight + 80;

  return { nodes, connectors, svgW, svgH, mainY, rowYs, branchLabels, NW, NH };
}

// ---------------------------------------------------------------------------
// SVG flow diagram
// ---------------------------------------------------------------------------
function buildFlowSVG(journey) {
  const { nodes, connectors, svgW, svgH } = layoutJourney(journey.steps);

  const PADX = 20;
  const PADY = 20;
  const W = svgW + PADX * 2;
  const H = svgH + PADY * 2;

  // Connector path helper (straight or curved)
  function connPath(c) {
    const x1 = c.x1 + PADX;
    const y1 = c.y1 + PADY;
    const x2 = c.x2 + PADX;
    const y2 = c.y2 + PADY;
    if (!c.curved || y1 === y2) {
      return `M${x1},${y1} L${x2},${y2}`;
    }
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }

  const connSVG = connectors.map(c =>
    `<path d="${connPath(c)}" stroke="#94a3b8" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>`
  ).join('\n    ');

  const nodesSVG = nodes.map(n => {
    const x  = n.x + PADX;
    const y  = n.y + PADY;
    const ec = emotionColor(n.step.emotion_score);
    const label = n.step.name.replace(/^Step \d+[a-z]*:\s*/i, '');
    // Truncate long labels
    const display = label.length > 22 ? label.slice(0, 20) + '…' : label;
    const branchTag = n.branchLabel
      ? `<text x="${x + n.w / 2}" y="${y + n.h + 13}" text-anchor="middle" font-size="9" fill="#64748b" font-family="system-ui">${esc(n.branchLabel)}</text>`
      : '';
    return `
    <g class="step-node" data-idx="${journey.steps.indexOf(n.step)}" style="cursor:pointer">
      <rect x="${x}" y="${y}" width="${n.w}" height="${n.h}"
            rx="8" fill="white" stroke="${ec}" stroke-width="2.5"
            class="node-rect"/>
      <rect x="${x}" y="${y}" width="${n.w}" height="6" rx="4" fill="${ec}" opacity="0.7"/>
      <text x="${x + n.w / 2}" y="${y + 28}" text-anchor="middle"
            font-size="11" font-weight="600" fill="#1e293b" font-family="system-ui"
            class="node-label">${esc(display)}</text>
      ${n.step.emotion_score !== null
        ? `<text x="${x + n.w - 10}" y="${y + n.h - 8}" text-anchor="end" font-size="10" fill="#64748b" font-family="system-ui">${n.step.emotion_score}/10</text>`
        : ''}
      ${branchTag}
    </g>`;
  }).join('');

  return `
<svg id="flow-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
  ${connSVG}
  ${nodesSVG}
</svg>`;
}

// ---------------------------------------------------------------------------
// Emotion curve SVG
// ---------------------------------------------------------------------------
function buildEmotionCurveSVG(journey) {
  // Only steps with an emotion score, in order
  const scored = journey.steps.filter(s => s.emotion_score !== null);
  if (scored.length < 2) return '';

  const W = 900;
  const H = 130;
  const PAD = { top: 16, right: 24, bottom: 32, left: 36 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const xStep = chartW / (scored.length - 1);
  const points = scored.map((s, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + chartH - ((s.emotion_score / 10) * chartH),
    step: s,
  }));

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  // Filled area under the curve
  const areaPath = `M${points[0].x},${PAD.top + chartH} ` +
    points.map(p => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${PAD.top + chartH} Z`;

  const dotsSVG = points.map(p => `
    <circle cx="${p.x}" cy="${p.y}" r="5" fill="${emotionColor(p.step.emotion_score)}"
            stroke="white" stroke-width="1.5" class="emotion-dot"
            data-idx="${journey.steps.indexOf(p.step)}" style="cursor:pointer">
      <title>${esc(p.step.name)} — ${p.step.emotion_score}/10</title>
    </circle>`).join('');

  // Y axis labels
  const yLabels = [2, 4, 6, 8, 10].map(v => {
    const y = PAD.top + chartH - ((v / 10) * chartH);
    return `<text x="${PAD.left - 6}" y="${y + 4}" text-anchor="end" font-size="9"
                  fill="#94a3b8" font-family="system-ui">${v}</text>
            <line x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}"
                  stroke="#f1f5f9" stroke-width="1"/>`;
  }).join('');

  // X axis step labels (abbreviated)
  const xLabels = points.map((p, i) => {
    const label = scored[i].name.replace(/^Step \d+[a-z]*:\s*/i, '');
    const abbr  = label.length > 14 ? label.slice(0, 12) + '…' : label;
    return `<text x="${p.x}" y="${H - 4}" text-anchor="middle" font-size="9"
                  fill="#94a3b8" font-family="system-ui">${esc(abbr)}</text>`;
  }).join('');

  return `
<div class="emotion-wrap">
  <div class="section-label">Emotion Curve</div>
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;max-width:100%"
       xmlns="http://www.w3.org/2000/svg">
    ${yLabels}
    <path d="${areaPath}" fill="#e0f2fe" opacity="0.5"/>
    <polyline points="${polyline}" fill="none" stroke="#38bdf8" stroke-width="2"/>
    ${dotsSVG}
    ${xLabels}
    <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top + chartH}"
          stroke="#e2e8f0" stroke-width="1"/>
    <line x1="${PAD.left}" y1="${PAD.top + chartH}" x2="${W - PAD.right}" y2="${PAD.top + chartH}"
          stroke="#e2e8f0" stroke-width="1"/>
  </svg>
</div>`;
}

// ---------------------------------------------------------------------------
// Table view (steps as columns, attributes as rows)
// ---------------------------------------------------------------------------
function buildTableView(journey) {
  const rows = [
    { key: 'persona',                  label: 'Persona' },
    { key: 'touchpoint',               label: 'Touchpoint' },
    { key: 'player_action_description',label: 'Player Action' },
    { key: 'player_goal',              label: 'Player Goal' },
    { key: 'business_goal',            label: 'Business Goal' },
    { key: 'success_criteria',         label: 'Success Criteria' },
    { key: 'player_emotions',          label: 'Emotions / Feeling' },
    { key: 'pain_points',              label: 'Pain Points', list: true },
    { key: 'opportunities',            label: 'Opportunities', list: true },
    { key: 'ideas',                    label: 'Ideas', list: true },
    { key: 'data_sources',             label: 'Data Sources', list: true },
    { key: 'emotion_score',            label: 'Emotion Score' },
  ];

  const headerCols = journey.steps.map((s, i) => {
    const ec = emotionColor(s.emotion_score);
    return `<th style="background:${ec}22;border-bottom:3px solid ${ec};min-width:180px">
      <span class="th-step-name">${esc(s.name)}</span>
      ${s.phase ? `<span class="th-phase">${esc(s.phase)}</span>` : ''}
    </th>`;
  }).join('');

  const bodyRows = rows.map(row => {
    const cells = journey.steps.map(s => {
      let val = s[row.key];
      if (Array.isArray(val) && val.length > 0) {
        return `<td><ul>${val.map(v => `<li>${esc(v)}</li>`).join('')}</ul></td>`;
      }
      if (val === null || val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) {
        return `<td class="empty">—</td>`;
      }
      return `<td>${esc(String(val))}</td>`;
    }).join('');
    return `<tr><th class="row-label">${esc(row.label)}</th>${cells}</tr>`;
  }).join('');

  return `
<div id="view-table" class="view" hidden>
  <div class="table-scroll">
    <table class="journey-table">
      <thead>
        <tr>
          <th class="row-label corner"></th>
          ${headerCols}
        </tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </div>
</div>`;
}

// ---------------------------------------------------------------------------
// Phase banner strip above the flow
// ---------------------------------------------------------------------------
function buildPhaseBanner(journey) {
  // Count how many steps per phase
  const phaseCounts = {};
  journey.steps.forEach(s => {
    if (s.phase) phaseCounts[s.phase] = (phaseCounts[s.phase] || 0) + 1;
  });

  return `<div class="phase-banner">` +
    journey.phases.map((p, i) => {
      const count = phaseCounts[p.name] || 0;
      const bg = PHASE_COLORS[i % PHASE_COLORS.length];
      return `<div class="phase-chip" style="background:${bg}">
        <span class="phase-name">${esc(p.name)}</span>
        ${p.guiding_question ? `<span class="phase-q">${esc(p.guiding_question)}</span>` : ''}
        <span class="phase-count">${count} step${count !== 1 ? 's' : ''}</span>
      </div>`;
    }).join('') +
    `</div>`;
}

// ---------------------------------------------------------------------------
// Detail panel (populated by JS on click)
// ---------------------------------------------------------------------------
function buildDetailPanel() {
  return `
<aside id="detail-panel">
  <button id="panel-close" aria-label="Close">✕</button>
  <div id="panel-content"></div>
</aside>`;
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------
function buildCSS() {
  return `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  background: #f8fafc;
  color: #1e293b;
  font-size: 14px;
  line-height: 1.5;
}

/* ── Header ─────────────────────────────────────────── */
.app-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 32px 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
}
.header-text { flex: 1; min-width: 240px; }
.header-text h1 { font-size: 20px; font-weight: 700; color: #0f172a; }
.header-text p  { color: #64748b; font-size: 13px; margin-top: 4px; }
.header-meta    { font-size: 11px; color: #94a3b8; margin-top: 6px; }
.header-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

/* ── Buttons ─────────────────────────────────────────── */
.btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn:hover { background: #f1f5f9; }
.btn.active { background: #0f172a; color: white; border-color: #0f172a; }
.btn-export {
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #0ea5e9;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-export:hover { background: #0284c7; }

/* ── Phase banner ─────────────────────────────────────── */
.phase-banner {
  display: flex;
  gap: 12px;
  padding: 16px 32px;
  overflow-x: auto;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}
.phase-chip {
  flex: 1;
  min-width: 160px;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.phase-name  { font-weight: 700; font-size: 13px; color: #0f172a; }
.phase-q     { font-size: 11px; color: #475569; font-style: italic; }
.phase-count { font-size: 11px; color: #94a3b8; margin-top: 2px; }

/* ── Main content ─────────────────────────────────────── */
.main { padding: 28px 32px; }

.view { }
.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 10px;
}

/* ── Flow view ───────────────────────────────────────── */
#view-flow { overflow-x: auto; }
.flow-wrap { min-width: 600px; padding: 8px 0 16px; }

/* Node hover */
.step-node .node-rect {
  transition: filter 0.15s;
}
.step-node:hover .node-rect {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12));
}
.step-node.selected .node-rect {
  stroke-width: 3;
}

/* ── Emotion curve ───────────────────────────────────── */
.emotion-wrap {
  margin-top: 32px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px 20px;
  overflow-x: auto;
}
.emotion-dot { transition: r 0.15s; }
.emotion-dot:hover { r: 7; }

/* ── Table view ──────────────────────────────────────── */
.table-scroll { overflow-x: auto; }
.journey-table {
  border-collapse: collapse;
  width: 100%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.journey-table th, .journey-table td {
  border: 1px solid #e2e8f0;
  padding: 10px 12px;
  vertical-align: top;
  font-size: 13px;
}
.journey-table thead th {
  background: #f8fafc;
  font-weight: 600;
  text-align: left;
}
.row-label {
  background: #f8fafc !important;
  font-weight: 600;
  font-size: 12px;
  color: #475569;
  white-space: nowrap;
  min-width: 140px;
}
.corner { background: white !important; }
.th-step-name { display: block; font-size: 13px; color: #0f172a; }
.th-phase { display: block; font-size: 10px; color: #94a3b8; margin-top: 2px; }
.journey-table td.empty { color: #cbd5e1; font-size: 12px; }
.journey-table td ul { padding-left: 16px; }
.journey-table td li { margin-bottom: 2px; }

/* ── Detail panel ────────────────────────────────────── */
#detail-panel {
  position: fixed;
  top: 0;
  right: -420px;
  width: 400px;
  height: 100vh;
  background: white;
  border-left: 1px solid #e2e8f0;
  box-shadow: -4px 0 24px rgba(0,0,0,0.08);
  transition: right 0.25s ease;
  z-index: 100;
  overflow-y: auto;
  padding: 24px 24px 48px;
}
#detail-panel.open { right: 0; }

#panel-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}
#panel-close:hover { color: #0f172a; }

.panel-step-name {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  padding-right: 28px;
}
.panel-phase {
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}
.panel-score-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.score-track {
  flex: 1;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}
.score-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}
.score-label { font-size: 12px; font-weight: 600; color: #475569; white-space: nowrap; }

.panel-section { margin-bottom: 18px; }
.panel-section-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 6px;
}
.panel-text { font-size: 13px; color: #334155; }
.panel-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.panel-list li {
  font-size: 13px;
  color: #334155;
  padding: 5px 8px;
  border-radius: 4px;
  background: #f8fafc;
  border-left: 3px solid transparent;
}
.panel-list.pain    li { border-color: #f87171; background: #fef2f2; }
.panel-list.opps    li { border-color: #34d399; background: #f0fdf4; }
.panel-list.ideas   li { border-color: #818cf8; background: #eef2ff; }
.panel-list.data    li { border-color: #94a3b8; background: #f8fafc; }
.panel-list.actions li { border-color: #38bdf8; background: #f0f9ff; }
.no-data { font-size: 12px; color: #cbd5e1; font-style: italic; }
`;
}

// ---------------------------------------------------------------------------
// Inline JS (interactivity — no external libraries)
// ---------------------------------------------------------------------------
function buildJS(journey) {
  const data = JSON.stringify(journey);
  return `
const JOURNEY = ${data};

// ── View toggle ──────────────────────────────────────
const btnFlow  = document.getElementById('btn-flow');
const btnTable = document.getElementById('btn-table');
const viewFlow = document.getElementById('view-flow');
const viewTable= document.getElementById('view-table');

btnFlow.addEventListener('click', () => {
  viewFlow.hidden = false; viewTable.hidden = true;
  btnFlow.classList.add('active'); btnTable.classList.remove('active');
});
btnTable.addEventListener('click', () => {
  viewTable.hidden = false; viewFlow.hidden = true;
  btnTable.classList.add('active'); btnFlow.classList.remove('active');
});

// ── Detail panel ─────────────────────────────────────
const panel      = document.getElementById('detail-panel');
const panelBody  = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');

function emotionColor(score) {
  if (score === null) return '#cbd5e1';
  if (score <= 3) return '#f87171';
  if (score <= 5) return '#fb923c';
  if (score <= 7) return '#facc15';
  return '#4ade80';
}

function listSection(title, items, cls) {
  if (!items || items.length === 0)
    return \`<div class="panel-section">
      <div class="panel-section-title">\${title}</div>
      <span class="no-data">None defined</span>
    </div>\`;
  return \`<div class="panel-section">
    <div class="panel-section-title">\${title}</div>
    <ul class="panel-list \${cls}">\${items.map(i => \`<li>\${i}</li>\`).join('')}</ul>
  </div>\`;
}

function textSection(title, val) {
  if (!val) return '';
  return \`<div class="panel-section">
    <div class="panel-section-title">\${title}</div>
    <p class="panel-text">\${val}</p>
  </div>\`;
}

function openPanel(idx) {
  const s = JOURNEY.steps[idx];
  const ec = emotionColor(s.emotion_score);
  const pct = s.emotion_score !== null ? (s.emotion_score / 10 * 100) : 0;
  panelBody.innerHTML = \`
    <div class="panel-step-name">\${s.name}</div>
    <div class="panel-phase">\${s.phase || ''}\${s.touchpoint ? ' · ' + s.touchpoint : ''}</div>
    \${s.emotion_score !== null ? \`
    <div class="panel-score-bar">
      <span class="score-label">Emotion \${s.emotion_score}/10</span>
      <div class="score-track"><div class="score-fill" style="width:\${pct}%;background:\${ec}"></div></div>
    </div>\` : ''}
    \${textSection('Description', s.description)}
    \${textSection('Player Goal', s.player_goal)}
    \${textSection('Business Goal', s.business_goal)}
    \${textSection('Player Action', s.player_action_description)}
    \${textSection('Success Criteria', s.success_criteria)}
    \${textSection('Player Emotions', s.player_emotions)}
    \${listSection('User Actions', s.user_actions, 'actions')}
    \${listSection('Pain Points', s.pain_points, 'pain')}
    \${listSection('Opportunities', s.opportunities, 'opps')}
    \${listSection('Ideas', s.ideas, 'ideas')}
    \${listSection('Data Sources', s.data_sources, 'data')}
  \`;
  panel.classList.add('open');

  // Highlight selected node
  document.querySelectorAll('.step-node').forEach(n => n.classList.remove('selected'));
  const sel = document.querySelector(\`.step-node[data-idx="\${idx}"]\`);
  if (sel) sel.classList.add('selected');
}

panelClose.addEventListener('click', () => {
  panel.classList.remove('open');
  document.querySelectorAll('.step-node').forEach(n => n.classList.remove('selected'));
});

// Attach click handlers to SVG nodes and emotion dots
document.querySelectorAll('.step-node, .emotion-dot').forEach(el => {
  el.addEventListener('click', () => openPanel(Number(el.dataset.idx)));
});

// ── Export to Markdown ────────────────────────────────
document.getElementById('btn-export').addEventListener('click', () => {
  let md = \`# Journey: \${JOURNEY.title}\\n\\n\`;
  md += \`**Product:** \${JOURNEY.product}  \\n\`;
  md += \`**Description:** \${JOURNEY.description}  \\n\`;
  md += \`**Last updated:** \${JOURNEY.last_updated}\\n\\n---\\n\\n\`;

  let currentPhase = null;
  JOURNEY.steps.forEach(s => {
    if (s.phase !== currentPhase) {
      currentPhase = s.phase;
      md += \`## Phase: \${currentPhase}\\n\\n\`;
    }
    md += \`### \${s.name}\\n\\n\`;
    if (s.persona)        md += \`**Persona:** \${s.persona}  \\n\`;
    if (s.touchpoint)     md += \`**Touchpoint:** \${s.touchpoint}  \\n\`;
    if (s.emotion_score)  md += \`**Emotion Score:** \${s.emotion_score}/10  \\n\`;
    md += \`\\n\`;
    if (s.description)    md += \`**Description:** \${s.description}\\n\\n\`;
    if (s.player_goal)    md += \`**Player Goal:** \${s.player_goal}\\n\\n\`;
    if (s.business_goal)  md += \`**Business Goal:** \${s.business_goal}\\n\\n\`;
    if (s.success_criteria) md += \`**Success Criteria:** \${s.success_criteria}\\n\\n\`;
    if (s.pain_points?.length) {
      md += \`**Pain Points:**\\n\${s.pain_points.map(p => \`- \${p}\`).join('\\n')}\\n\\n\`;
    }
    if (s.opportunities?.length) {
      md += \`**Opportunities:**\\n\${s.opportunities.map(o => \`- \${o}\`).join('\\n')}\\n\\n\`;
    }
    if (s.ideas?.length) {
      md += \`**Ideas:**\\n\${s.ideas.map(i => \`- \${i}\`).join('\\n')}\\n\\n\`;
    }
    if (s.data_sources?.length) {
      md += \`**Data Sources:**\\n\${s.data_sources.map(d => \`- \${d}\`).join('\\n')}\\n\\n\`;
    }
    md += \`---\\n\\n\`;
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = \`\${JOURNEY.id}-journey-map.md\`;
  a.click();
});
`;
}

// ---------------------------------------------------------------------------
// Assemble full HTML page
// ---------------------------------------------------------------------------
function buildPageHTML(journey) {
  const flowSVG       = buildFlowSVG(journey);
  const emotionSVG    = buildEmotionCurveSVG(journey);
  const tableView     = buildTableView(journey);
  const phaseBanner   = buildPhaseBanner(journey);
  const detailPanel   = buildDetailPanel();
  const css           = buildCSS();
  const js            = buildJS(journey);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Journey Map — ${esc(journey.title)}</title>
  <style>${css}</style>
</head>
<body>

<header class="app-header">
  <div class="header-text">
    <h1>${esc(journey.title)}</h1>
    <p>${esc(journey.description)}</p>
    <div class="header-meta">${esc(journey.product)}${journey.last_updated ? ' &nbsp;·&nbsp; Updated ' + esc(journey.last_updated) : ''}</div>
  </div>
  <div class="header-actions">
    <button class="btn active" id="btn-flow">Flow</button>
    <button class="btn" id="btn-table">Table</button>
    <button class="btn-export" id="btn-export">⬇ Export MD</button>
  </div>
</header>

${phaseBanner}

<main class="main">

  <div id="view-flow" class="view">
    <div class="section-label">Journey Flow — click any step for details</div>
    <div class="flow-wrap">${flowSVG}</div>
    ${emotionSVG}
  </div>

  ${tableView}

</main>

${detailPanel}

<script>${js}</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// PART 3: File writer and CLI runner
// ---------------------------------------------------------------------------

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJourney(journey) {
  ensureDir(OUTPUT_DIR);
  const outFile = path.join(OUTPUT_DIR, `${journey.slug}.html`);
  const html = buildPageHTML(journey);
  fs.writeFileSync(outFile, html, 'utf8');
  return outFile;
}

function run() {
  console.log('BetOnline Journey Map Generator');
  console.log('================================\n');

  // Optional: filter to a single slug via CLI arg  e.g. node generate.js prematch
  const targetSlug = process.argv[2] || null;

  const files = readJourneyFiles();
  const filtered = targetSlug
    ? files.filter(f => f.slug === targetSlug)
    : files;

  if (filtered.length === 0) {
    console.error(`No journey found with slug "${targetSlug}". Available: ${files.map(f => f.slug).join(', ')}`);
    process.exit(1);
  }

  const results = [];
  for (const file of filtered) {
    process.stdout.write(`Parsing  ${file.filename} ... `);
    let journey;
    try {
      journey = parseJourney(file.slug, file.raw);
      console.log(`OK  (${journey.steps.length} steps, ${journey.phases.length} phases)`);
    } catch (err) {
      console.error(`FAILED\n  ${err.message}`);
      process.exit(1);
    }

    process.stdout.write(`Building ${journey.slug}.html ... `);
    let outFile;
    try {
      outFile = writeJourney(journey);
      const size = (fs.statSync(outFile).size / 1024).toFixed(1);
      console.log(`OK  → ${path.relative(process.cwd(), outFile)}  (${size} KB)`);
      results.push({ slug: journey.slug, file: outFile });
    } catch (err) {
      console.error(`FAILED\n  ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\n✓ Generated ${results.length} file${results.length !== 1 ? 's' : ''}:`);
  results.forEach(r => console.log(`  output/${r.slug}.html`));
  console.log('\nOpen any file directly in your browser — no server needed.');
}

if (require.main === module) {
  run();
}

module.exports = { readJourneyFiles, parseJourney, buildPageHTML, writeJourney, run };
