'use strict';

const fs   = require('fs');
const path = require('path');

const JOURNEYS_DIR = path.join(__dirname, 'journeys');
const OUTPUT_DIR   = path.join(__dirname, 'output');

// ─── Helpers ────────────────────────────────────────────────────────────────

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Parser (identical to generate.js) ─────────────────────────────────────

function parseBulletList(text) {
  return text.split('\n').map(l => l.replace(/^\s*-\s+/, '').trim()).filter(Boolean);
}

function parseField(lines, key) {
  const prefix = `- ${key}:`;
  const line = lines.find(l => l.trim().startsWith(prefix));
  if (!line) return null;
  return line.trim().slice(prefix.length).trim() || null;
}

function parseBulletField(lines, key) {
  const prefix = `- ${key}:`;
  const startIdx = lines.findIndex(l => l.trim().startsWith(prefix));
  if (startIdx === -1) return [];
  const items = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^- \w[^:]*:/.test(l)) break;
    if (/^\s+- /.test(l)) items.push(l.replace(/^\s*-\s+/, '').trim());
  }
  return items;
}

function parseStep(block) {
  const lines = block.split('\n');
  const nameLine = lines.find(l => l.startsWith('### '));
  const name = nameLine ? nameLine.replace(/^###\s+/, '').trim() : 'Unnamed Step';
  const branchMatch = name.match(/\[branch:\s*([^\]]+)\]/);
  const branch = branchMatch ? branchMatch[1].trim() : null;
  const cleanName = name.replace(/\[branch:[^\]]+\]/, '').trim();
  return {
    name: cleanName,
    branch,
    persona:                   parseField(lines, 'persona'),
    touchpoint:                parseField(lines, 'touchpoint'),
    screenshot:                parseField(lines, 'screenshot'),
    description:               parseField(lines, 'description'),
    player_goal:               parseField(lines, 'player_goal'),
    business_goal:             parseField(lines, 'business_goal'),
    player_action_description: parseField(lines, 'player_action_description'),
    player_emotions:           parseField(lines, 'player_emotions'),
    success_criteria:          parseField(lines, 'success_criteria'),
    user_actions:     parseBulletField(lines, 'user_actions'),
    pain_points:      parseBulletField(lines, 'pain_points'),
    opportunities:    parseBulletField(lines, 'opportunities'),
    ideas:            parseBulletField(lines, 'ideas'),
    data_sources:     parseBulletField(lines, 'data_sources'),
    octalysis_drives: parseBulletField(lines, 'octalysis_drives'),
    screenshots:      parseBulletField(lines, 'screenshots'),
  };
}

function parsePhase(block) {
  const lines = block.split('\n');
  const nameLine     = lines.find(l => l.startsWith('## Phase:'));
  const questionLine = lines.find(l => l.startsWith('## guiding_question:'));
  return {
    name: nameLine ? nameLine.replace(/^##\s+Phase:\s*/, '').trim() : 'Unnamed Phase',
    guiding_question: questionLine
      ? questionLine.replace(/^##\s+guiding_question:\s*/, '').trim()
      : null,
  };
}

function parseMeta(raw) {
  const meta = {};
  const metaLines = raw.split('\n').filter(l => l.startsWith('# '));
  for (const line of metaLines) {
    const match = line.match(/^#\s+(\w+):\s*(.+)/);
    if (match) meta[match[1]] = match[2].trim();
  }
  return meta;
}

function parseJourney(slug, raw) {
  const meta = parseMeta(raw);
  const sections = raw.split(/\n---\n/);
  const phases = [];
  const steps  = [];
  let currentPhase = null;

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('## Phase:')) {
      currentPhase = parsePhase(trimmed);
      phases.push(currentPhase);
      continue;
    }
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
    title:        meta.Journey || slug,
    id:           meta.id || slug,
    description:  meta.description || '',
    product:      meta.product || '',
    last_updated: meta.last_updated || '',
    phases,
    steps,
  };
}

// ─── Screenshot collector ───────────────────────────────────────────────────

function collectScreenshots(journey) {
  const map = {};
  for (const step of journey.steps) {
    const paths = step.screenshots && step.screenshots.length
      ? step.screenshots
      : step.screenshot ? [step.screenshot] : [];
    step._screenshots = paths;
    for (const p of paths) {
      if (p in map) continue;
      const fullPath = path.join(__dirname, p);
      if (fs.existsSync(fullPath)) {
        const ext  = path.extname(p).slice(1).toLowerCase();
        const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
                   : ext === 'webp' ? 'image/webp' : 'image/png';
        map[p] = `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
      } else {
        map[p] = null;
      }
    }
  }
  return map;
}

// ─── Octalysis ──────────────────────────────────────────────────────────────

const OCTALYSIS = {
  CD1: { name: 'Epic Meaning & Calling',         hat: 'white', color: '#6366f1' },
  CD2: { name: 'Development & Accomplishment',   hat: 'white', color: '#22c55e' },
  CD3: { name: 'Empowerment of Creativity',      hat: 'white', color: '#a855f7' },
  CD4: { name: 'Ownership & Possession',         hat: 'white', color: '#14b8a6' },
  CD5: { name: 'Social Influence & Relatedness', hat: 'white', color: '#f59e0b' },
  CD6: { name: 'Scarcity & Impatience',          hat: 'black', color: '#f97316' },
  CD7: { name: 'Unpredictability & Curiosity',   hat: 'black', color: '#06b6d4' },
  CD8: { name: 'Loss & Avoidance',               hat: 'black', color: '#ef4444' },
};

function parseDriveCode(str) {
  const m = str.match(/^(CD[1-8])/i);
  return m ? m[1].toUpperCase() : null;
}

const PHASE_ACCENT = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

// ─── CSS ────────────────────────────────────────────────────────────────────

function buildCSS() {
  return `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #f0f4f8;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --pain-bg: #fff1f2;
  --pain-border: #fca5a5;
  --pain-text: #991b1b;
  --opp-bg: #f0fdf4;
  --opp-border: #86efac;
  --opp-text: #166534;
  --radius: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05);
  --shadow-hover: 0 4px 12px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.08);
}
html, body { height: 100%; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
}

/* ── Header ──────────────────────────────────────────── */
.app-header {
  position: sticky; top: 0; z-index: 50;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 14px 28px;
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
.header-info { flex: 1; min-width: 200px; }
.header-info h1 { font-size: 18px; font-weight: 700; }
.header-info p  { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.header-actions { display: flex; gap: 8px; }
.btn {
  padding: 6px 14px; border-radius: 6px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text-secondary); font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 0.15s;
}
.btn:hover { background: #f1f5f9; }
.btn.active { background: #0f172a; color: white; border-color: #0f172a; }
.btn-primary {
  padding: 6px 14px; border-radius: 6px; border: none;
  background: #0ea5e9; color: white; font-size: 12px; font-weight: 500;
  cursor: pointer; transition: background 0.15s;
}
.btn-primary:hover { background: #0284c7; }

/* ── Phase section ────────────────────────────────────── */
.phase-section { padding: 28px 28px 8px; }
.phase-header {
  display: flex; align-items: baseline; gap: 14px; margin-bottom: 20px;
  flex-wrap: wrap;
}
.phase-label { display: flex; align-items: center; gap: 10px; }
.phase-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.phase-name { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; }
.phase-question { font-size: 13px; color: var(--text-secondary); font-style: italic; }

/* ── Card row ─────────────────────────────────────────── */
.cards-row {
  display: flex; gap: 16px; overflow-x: auto;
  padding-bottom: 20px; align-items: flex-start;
}
.cards-row::-webkit-scrollbar { height: 5px; }
.cards-row::-webkit-scrollbar-track { background: transparent; }
.cards-row::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

/* Arrow connector between cards */
.card-arrow {
  display: flex; align-items: flex-start;
  padding-top: 30px; flex-shrink: 0; color: #cbd5e1;
}

/* ── Branch group ─────────────────────────────────────── */
.branch-group { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

/* ── Step card ────────────────────────────────────────── */
.step-card {
  width: 300px; flex-shrink: 0;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden; cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  border: 1.5px solid transparent;
  display: flex; flex-direction: column;
}
.step-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
.step-card.selected { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
.branch-card { width: 280px; }

/* ── Card accent strip ───────────────────────────────── */
.card-accent { height: 4px; }

/* ── Card header ─────────────────────────────────────── */
.card-header { padding: 14px 16px 10px; }
.card-step-num {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 4px;
  display: flex; align-items: center; justify-content: space-between;
}
.branch-badge {
  font-size: 9px; font-weight: 700; padding: 2px 6px;
  border-radius: 4px; background: #f1f5f9; color: #64748b;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.card-title {
  font-size: 15px; font-weight: 700; line-height: 1.3;
  margin-bottom: 8px; color: var(--text-primary);
}
.card-meta { display: flex; flex-wrap: wrap; gap: 5px; }
.meta-badge {
  font-size: 11px; color: var(--text-secondary);
  background: #f8fafc; border: 1px solid var(--border);
  border-radius: 4px; padding: 2px 7px;
}

/* ── Screenshot ──────────────────────────────────────── */
.card-screenshot {
  width: 100%; height: 130px; overflow: hidden;
  background: #f8fafc; position: relative;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.card-screenshot img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
  transition: transform 0.2s;
}
.card-screenshot:hover img { transform: scale(1.04); }
.ss-count {
  position: absolute; bottom: 6px; right: 8px;
  background: rgba(0,0,0,0.55); color: white;
  font-size: 10px; font-weight: 600;
  padding: 1px 6px; border-radius: 10px;
}
.ss-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 11px; font-style: italic;
}

/* ── Emotion quote ────────────────────────────────────── */
.card-emotion {
  padding: 10px 16px;
  border-bottom: 1px solid #f1f5f9;
  display: flex; gap: 6px; align-items: flex-start;
}
.emotion-mark {
  font-size: 22px; line-height: 1; color: #cbd5e1;
  flex-shrink: 0; margin-top: -2px; font-family: Georgia, serif;
}
.emotion-text {
  font-size: 12px; color: var(--text-secondary);
  font-style: italic; line-height: 1.45;
}

/* ── Pain / Opp sections ─────────────────────────────── */
.card-section { padding: 10px 16px; border-bottom: 1px solid #f1f5f9; }
.section-head { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; }
.section-icon {
  width: 16px; height: 16px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 900; flex-shrink: 0;
}
.section-title {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
}
.section-list { list-style: none; display: flex; flex-direction: column; gap: 4px; }
.section-list li {
  font-size: 12px; line-height: 1.4;
  padding: 4px 8px; border-radius: 5px;
  display: flex; gap: 6px; align-items: flex-start;
}
.section-list li::before {
  content: ''; width: 4px; height: 4px; border-radius: 50%;
  margin-top: 6px; flex-shrink: 0;
}
.more-hint { font-size: 11px !important; font-style: italic; opacity: 0.7; }

.section-pain .section-icon { background: var(--pain-bg); color: var(--pain-text); }
.section-pain .section-title { color: var(--pain-text); }
.section-pain .section-list li { background: var(--pain-bg); color: #7f1d1d; }
.section-pain .section-list li::before { background: var(--pain-text); }

.section-opp .section-icon { background: var(--opp-bg); color: var(--opp-text); }
.section-opp .section-title { color: var(--opp-text); }
.section-opp .section-list li { background: var(--opp-bg); color: #14532d; }
.section-opp .section-list li::before { background: var(--opp-text); }

/* ── Card footer ─────────────────────────────────────── */
.card-footer {
  padding: 10px 16px; border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; background: #fafbfc; margin-top: auto;
}
.drives-row { display: flex; flex-wrap: wrap; gap: 4px; flex: 1; }
.drive-chip {
  font-size: 10px; font-weight: 700; padding: 2px 6px;
  border-radius: 4px; border: 1px solid;
}
.detail-btn {
  font-size: 11px; font-weight: 600; color: #0ea5e9;
  background: none; border: none; cursor: pointer;
  white-space: nowrap; padding: 2px 0; flex-shrink: 0;
}
.detail-btn:hover { color: #0284c7; text-decoration: underline; }

/* ── Detail panel ─────────────────────────────────────── */
#detail-panel {
  position: fixed; top: 0; right: -460px;
  width: 440px; height: 100vh;
  background: var(--surface);
  border-left: 1px solid var(--border);
  box-shadow: -8px 0 32px rgba(0,0,0,0.1);
  transition: right 0.25s cubic-bezier(0.16,1,0.3,1);
  z-index: 200; overflow-y: auto;
  display: flex; flex-direction: column;
}
#detail-panel.open { right: 0; }

.panel-topbar {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 12px;
  position: sticky; top: 0;
  background: var(--surface); z-index: 1;
}
.panel-topbar-left { display: flex; flex-direction: column; gap: 4px; }
.panel-step-num { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.panel-step-name { font-size: 17px; font-weight: 700; line-height: 1.3; }
.panel-close {
  background: none; border: 1px solid var(--border); border-radius: 6px;
  width: 30px; height: 30px; display: flex; align-items: center;
  justify-content: center; cursor: pointer; color: var(--text-muted);
  font-size: 14px; flex-shrink: 0;
}
.panel-close:hover { background: #f1f5f9; color: var(--text-primary); }

.panel-body { padding: 20px 24px 48px; display: flex; flex-direction: column; gap: 18px; }

.panel-screenshots { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
.panel-ss {
  flex-shrink: 0; max-height: 200px; width: auto;
  border-radius: 8px; border: 1px solid var(--border);
  cursor: zoom-in; transition: transform 0.15s;
}
.panel-ss:hover { transform: scale(1.02); }
.panel-ss-missing {
  flex-shrink: 0; height: 60px; min-width: 100px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; border: 1px dashed #cbd5e1;
  font-size: 10px; color: #94a3b8; text-align: center; padding: 8px;
}

.panel-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.panel-block {
  background: #f8fafc; border-radius: 8px; padding: 12px;
  display: flex; flex-direction: column; gap: 5px;
}
.panel-block-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
.panel-block-text { font-size: 12px; color: var(--text-secondary); line-height: 1.45; }

.panel-section { display: flex; flex-direction: column; gap: 6px; }
.panel-section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
.panel-text { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

.panel-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.panel-list li {
  font-size: 12px; color: var(--text-secondary);
  padding: 6px 10px; border-radius: 6px; border-left: 3px solid transparent;
  background: #f8fafc;
}
.panel-list.ideas  li { background: #f5f3ff; border-color: #c4b5fd; color: #5b21b6; }
.panel-list.actions li { background: #f0f9ff; border-color: #7dd3fc; color: #0369a1; }
.panel-list.data   li { border-color: var(--border); }

.panel-drives { display: flex; flex-direction: column; gap: 6px; }
.drive-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 8px; font-size: 12px;
}
.pdc-code { font-weight: 800; flex-shrink: 0; min-width: 34px; }
.pdc-name { color: var(--text-secondary); flex: 1; }
.pdc-reason { font-size: 11px; color: var(--text-muted); font-style: italic; }
.hat-badge { font-size: 10px; padding: 1px 6px; border-radius: 4px; flex-shrink: 0; }
.hat-white { background: #dcfce7; color: #166534; }
.hat-black { background: #fee2e2; color: #991b1b; }

/* ── Table view ────────────────────────────────────────── */
#view-table { padding: 20px 28px; }
.table-scroll { overflow-x: auto; }
.journey-table {
  border-collapse: collapse; width: 100%;
  background: var(--surface); border-radius: var(--radius);
  overflow: hidden; border: 1px solid var(--border); min-width: 800px;
}
.journey-table th, .journey-table td {
  border: 1px solid var(--border); padding: 10px 12px;
  vertical-align: top; font-size: 12px;
}
.journey-table thead th { background: #f8fafc; font-weight: 600; text-align: left; }
.row-label { background: #f8fafc !important; font-weight: 600; font-size: 11px; color: var(--text-secondary); white-space: nowrap; width: 130px; }
.corner { background: var(--surface) !important; }
.th-step-name { display: block; font-size: 12px; font-weight: 600; }
.th-phase { display: block; font-size: 10px; color: var(--text-muted); margin-top: 2px; }
.cell-empty { color: #cbd5e1; font-size: 11px; }
.journey-table td ul { padding-left: 14px; }
.journey-table td li { margin-bottom: 2px; }

/* ── Lightbox ─────────────────────────────────────────── */
.lightbox {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.85); z-index: 1000;
  align-items: center; justify-content: center; cursor: zoom-out;
}
.lightbox.open { display: flex; }
.lightbox img { max-height: 90vh; max-width: 92vw; border-radius: 8px; box-shadow: 0 8px 40px rgba(0,0,0,0.6); }

.no-data { font-size: 11px; color: #cbd5e1; font-style: italic; }
`;
}

// ─── Card builder ───────────────────────────────────────────────────────────

const MAX_PAIN = 3;
const MAX_OPP  = 2;

function buildStepCard(step, globalIdx, ssMap, isBranch) {
  // Accent colour from first drive
  const firstCode  = parseDriveCode((step.octalysis_drives || [])[0] || '');
  const accentColor = firstCode && OCTALYSIS[firstCode] ? OCTALYSIS[firstCode].color : '#94a3b8';

  // Screenshot
  const ssKeys  = step._screenshots || [];
  const firstSS = ssKeys.find(k => ssMap[k]);
  let ssHTML = '';
  if (ssKeys.length) {
    const countBadge = ssKeys.length > 1
      ? `<span class="ss-count">${ssKeys.length} screenshots</span>` : '';
    ssHTML = `<div class="card-screenshot">
      ${firstSS
        ? `<img src="${ssMap[firstSS]}" alt="screenshot" loading="lazy" />`
        : `<div class="ss-placeholder">Screenshot not found</div>`}
      ${countBadge}
    </div>`;
  }

  // Emotion
  const emotionHTML = step.player_emotions
    ? `<div class="card-emotion">
        <span class="emotion-mark">&ldquo;</span>
        <span class="emotion-text">${esc(step.player_emotions)}</span>
      </div>`
    : '';

  // Pain points (max 3)
  const painAll  = step.pain_points || [];
  const painShow = painAll.slice(0, MAX_PAIN);
  const painMore = painAll.length - painShow.length;
  const painHTML = painShow.length
    ? `<div class="card-section section-pain">
        <div class="section-head">
          <div class="section-icon">!</div>
          <div class="section-title">Pain Points${painAll.length > 1 ? ` (${painAll.length})` : ''}</div>
        </div>
        <ul class="section-list">
          ${painShow.map(p => `<li>${esc(p)}</li>`).join('')}
          ${painMore > 0 ? `<li class="more-hint">+${painMore} more — see full detail</li>` : ''}
        </ul>
      </div>` : '';

  // Opportunities (max 2)
  const oppAll  = step.opportunities || [];
  const oppShow = oppAll.slice(0, MAX_OPP);
  const oppMore = oppAll.length - oppShow.length;
  const oppHTML = oppShow.length
    ? `<div class="card-section section-opp">
        <div class="section-head">
          <div class="section-icon">&#x2726;</div>
          <div class="section-title">Opportunities${oppAll.length > 1 ? ` (${oppAll.length})` : ''}</div>
        </div>
        <ul class="section-list">
          ${oppShow.map(o => `<li>${esc(o)}</li>`).join('')}
          ${oppMore > 0 ? `<li class="more-hint">+${oppMore} more — see full detail</li>` : ''}
        </ul>
      </div>` : '';

  // Drive chips
  const drivesHTML = (step.octalysis_drives || []).map(d => {
    const code = parseDriveCode(d);
    const def  = code && OCTALYSIS[code];
    if (!def) return '';
    return `<span class="drive-chip"
      style="background:${def.color}20;border-color:${def.color};color:${def.color}"
      title="${esc(def.name)}">${code}</span>`;
  }).join('');

  // Branch badge
  const branchBadge = (step.branch && !step.branch.includes('|'))
    ? `<span class="branch-badge">${esc(step.branch)}</span>` : '';

  // Clean title (strip "Step N: " prefix)
  const cleanTitle = step.name.replace(/^Step \d+[a-z]*:\s*/i, '');

  return `
<div class="step-card${isBranch ? ' branch-card' : ''}" data-idx="${globalIdx}">
  <div class="card-accent" style="background:${accentColor}"></div>
  <div class="card-header">
    <div class="card-step-num">
      Step ${globalIdx + 1}
      ${branchBadge}
    </div>
    <div class="card-title">${esc(cleanTitle)}</div>
    <div class="card-meta">
      ${step.persona    ? `<span class="meta-badge">&#x1F464; ${esc(step.persona)}</span>` : ''}
      ${step.touchpoint ? `<span class="meta-badge">&#x1F4CD; ${esc(step.touchpoint)}</span>` : ''}
    </div>
  </div>
  ${ssHTML}
  ${emotionHTML}
  ${painHTML}
  ${oppHTML}
  <div class="card-footer">
    <div class="drives-row">${drivesHTML || '<span class="no-data">—</span>'}</div>
    <button class="detail-btn" data-idx="${globalIdx}">Full detail &#x2192;</button>
  </div>
</div>`;
}

function arrowConnector() {
  return `<div class="card-arrow">
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
      <path d="M0 10 H18 M13 5 L20 10 L13 15" stroke="#cbd5e1"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>`;
}

function buildCardsRow(journey, phaseSteps, ssMap) {
  const branchPtIdx  = phaseSteps.findIndex(s => s.branch && s.branch.includes('|'));

  if (branchPtIdx === -1) {
    // No branches — simple row
    return phaseSteps.map((step, i) => {
      const gi = journey.steps.indexOf(step);
      return (i > 0 ? arrowConnector() : '') + buildStepCard(step, gi, ssMap, false);
    }).join('');
  }

  const branchPt     = phaseSteps[branchPtIdx];
  const branchLabels = branchPt.branch.split('|').map(b => b.trim());

  const branchGroups = {};
  branchLabels.forEach(lbl => { branchGroups[lbl] = []; });
  phaseSteps.forEach(s => {
    if (s.branch && !s.branch.includes('|') && branchGroups[s.branch]) {
      branchGroups[s.branch].push(s);
    }
  });

  const preBranch  = phaseSteps.slice(0, branchPtIdx + 1);
  const postBranch = phaseSteps.filter(s =>
    !preBranch.includes(s) && !(s.branch && !s.branch.includes('|')));

  const preHTML = preBranch.map((step, i) => {
    const gi = journey.steps.indexOf(step);
    return (i > 0 ? arrowConnector() : '') + buildStepCard(step, gi, ssMap, false);
  }).join('');

  const branchColHTML = `
<div class="branch-group">
  ${branchLabels.map(lbl =>
    (branchGroups[lbl] || []).map(step => {
      const gi = journey.steps.indexOf(step);
      return buildStepCard(step, gi, ssMap, true);
    }).join('')
  ).join('')}
</div>`;

  const postHTML = postBranch.map(step => {
    const gi = journey.steps.indexOf(step);
    return arrowConnector() + buildStepCard(step, gi, ssMap, false);
  }).join('');

  return preHTML + arrowConnector() + branchColHTML + postHTML;
}

// ─── Detail panel shell ──────────────────────────────────────────────────────

function buildDetailPanel() {
  return `
<aside id="detail-panel">
  <div class="panel-topbar">
    <div class="panel-topbar-left">
      <div class="panel-step-num" id="panel-step-num"></div>
      <div class="panel-step-name" id="panel-step-name"></div>
    </div>
    <button class="panel-close" id="panel-close">&#x2715;</button>
  </div>
  <div class="panel-body" id="panel-body"></div>
</aside>
<div class="lightbox" id="lightbox"><img id="lightbox-img" src="" alt="" /></div>`;
}

// ─── Table view ──────────────────────────────────────────────────────────────

function buildTableView(journey) {
  const rows = [
    { key: 'persona',                   label: 'Persona' },
    { key: 'touchpoint',                label: 'Touchpoint' },
    { key: 'player_emotions',           label: 'Emotions' },
    { key: 'player_action_description', label: 'Player Action' },
    { key: 'player_goal',               label: 'Player Goal' },
    { key: 'business_goal',             label: 'Business Goal' },
    { key: 'success_criteria',          label: 'Success Criteria' },
    { key: 'pain_points',               label: 'Pain Points',    list: true },
    { key: 'opportunities',             label: 'Opportunities',  list: true },
    { key: 'ideas',                     label: 'Ideas',          list: true },
    { key: 'octalysis_drives',          label: 'Drives',         list: true },
    { key: 'data_sources',              label: 'Data Sources',   list: true },
  ];

  const firstDriveColor = s => {
    const code = parseDriveCode((s.octalysis_drives || [])[0] || '');
    return code && OCTALYSIS[code] ? OCTALYSIS[code].color : '#94a3b8';
  };

  const headers = journey.steps.map(s =>
    `<th style="border-bottom:3px solid ${firstDriveColor(s)};min-width:160px">
      <span class="th-step-name">${esc(s.name.replace(/^Step \d+[a-z]*:\s*/i, ''))}</span>
      ${s.phase ? `<span class="th-phase">${esc(s.phase)}</span>` : ''}
    </th>`
  ).join('');

  const bodyRows = rows.map(row =>
    `<tr><th class="row-label">${esc(row.label)}</th>${
      journey.steps.map(s => {
        const val = s[row.key];
        if (Array.isArray(val) && val.length)
          return `<td><ul>${val.map(v => `<li>${esc(v)}</li>`).join('')}</ul></td>`;
        if (!val || (Array.isArray(val) && !val.length))
          return `<td class="cell-empty">—</td>`;
        return `<td>${esc(String(val))}</td>`;
      }).join('')
    }</tr>`
  ).join('');

  return `
<div id="view-table" class="view" hidden>
  <div class="table-scroll">
    <table class="journey-table">
      <thead><tr><th class="row-label corner"></th>${headers}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </div>
</div>`;
}

// ─── Inline JS ───────────────────────────────────────────────────────────────

function buildJS(journey, ssMap) {
  // Serialise data for the browser
  const JOURNEY_JSON = JSON.stringify(journey);
  const SS_JSON      = JSON.stringify(ssMap);
  const OCT_JSON     = JSON.stringify(OCTALYSIS);

  return `
const JOURNEY = ${JOURNEY_JSON};
const SS      = ${SS_JSON};
const OCT     = ${OCT_JSON};

/* helpers */
function he(s){ if(!s)return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function block(title,val){ if(!val)return ''; return '<div class="panel-section"><div class="panel-section-title">'+he(title)+'</div><p class="panel-text">'+he(val)+'</p></div>'; }
function listBlock(title,items,cls){ if(!items||!items.length)return ''; return '<div class="panel-section"><div class="panel-section-title">'+he(title)+'</div><ul class="panel-list '+cls+'">'+items.map(i=>'<li>'+he(i)+'</li>').join('')+'</ul></div>'; }

/* panel */
const panel     = document.getElementById('detail-panel');
const panelNum  = document.getElementById('panel-step-num');
const panelName = document.getElementById('panel-step-name');
const panelBody = document.getElementById('panel-body');

function openPanel(idx){
  const s = JOURNEY.steps[idx];
  panelNum.textContent  = 'Step '+(idx+1)+(s.phase?' · '+s.phase:'');
  panelName.textContent = s.name.replace(/^Step \\d+[a-z]*:\\s*/i,'');

  const ssKeys = s._screenshots||(s.screenshot?[s.screenshot]:[]);
  const ssHTML = ssKeys.length
    ? '<div class="panel-screenshots">'+ssKeys.map(k=> SS[k]
        ? '<img class="panel-ss" src="'+SS[k]+'" alt="'+he(k)+'" data-src="'+SS[k]+'" />'
        : '<div class="panel-ss-missing">'+he(k.split('/').pop())+'</div>'
      ).join('')+'</div>'
    : '';

  const drivesHTML = (s.octalysis_drives||[]).map(d=>{
    const m=d.match(/^(CD[1-8])/i); const code=m?m[1].toUpperCase():null; const def=code&&OCT[code];
    if(!def)return '';
    const parts=d.split('\\u2014'); const reason=parts.slice(1).join('\\u2014').trim();
    return '<div class="drive-row" style="background:'+def.color+'12;border:1px solid '+def.color+'40">'
      +'<span class="pdc-code" style="color:'+def.color+'">'+code+'</span>'
      +'<span class="pdc-name">'+he(def.name)+'</span>'
      +(reason?'<span class="pdc-reason">'+he(reason)+'</span>':'')
      +'<span class="hat-badge hat-'+def.hat+'">'+def.hat+'</span>'
      +'</div>';
  }).join('');

  panelBody.innerHTML = [
    ssHTML,
    block('Description', s.description),
    '<div class="panel-two-col">'
      +'<div class="panel-block"><div class="panel-block-title">Player Goal</div><div class="panel-block-text">'+he(s.player_goal||'—')+'</div></div>'
      +'<div class="panel-block"><div class="panel-block-title">Business Goal</div><div class="panel-block-text">'+he(s.business_goal||'—')+'</div></div>'
    +'</div>',
    block('Player Action', s.player_action_description),
    block('Success Criteria', s.success_criteria),
    listBlock('User Actions', s.user_actions, 'actions'),
    drivesHTML ? '<div class="panel-section"><div class="panel-section-title">Octalysis Drives</div><div class="panel-drives">'+drivesHTML+'</div></div>' : '',
    listBlock('Ideas', s.ideas, 'ideas'),
    listBlock('Data Sources', s.data_sources, 'data'),
    listBlock('Pain Points (all)', s.pain_points, ''),
    listBlock('Opportunities (all)', s.opportunities, ''),
  ].join('');

  panel.classList.add('open');
  document.querySelectorAll('.step-card').forEach(c=>c.classList.remove('selected'));
  const sel=document.querySelector('.step-card[data-idx="'+idx+'"]');
  if(sel)sel.classList.add('selected');
}

/* card clicks */
document.querySelectorAll('.step-card').forEach(card=>{
  card.addEventListener('click', e=>{
    if(!e.target.closest('.detail-btn')) openPanel(Number(card.dataset.idx));
  });
});
document.querySelectorAll('.detail-btn').forEach(btn=>{
  btn.addEventListener('click', e=>{ e.stopPropagation(); openPanel(Number(btn.dataset.idx)); });
});

document.getElementById('panel-close').addEventListener('click',()=>{
  panel.classList.remove('open');
  document.querySelectorAll('.step-card').forEach(c=>c.classList.remove('selected'));
});

/* lightbox */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
panelBody.addEventListener('click',e=>{
  const img=e.target.closest('.panel-ss'); if(!img)return;
  lightboxImg.src=img.dataset.src; lightbox.classList.add('open');
});
lightbox.addEventListener('click',()=>lightbox.classList.remove('open'));
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ lightbox.classList.remove('open'); panel.classList.remove('open'); }});

/* view toggle */
const btnCards=document.getElementById('btn-cards');
const btnTable=document.getElementById('btn-table');
const viewCards=document.getElementById('view-cards');
const viewTable=document.getElementById('view-table');
btnCards.addEventListener('click',()=>{ viewCards.hidden=false; viewTable.hidden=true; btnCards.classList.add('active'); btnTable.classList.remove('active'); });
btnTable.addEventListener('click',()=>{ viewTable.hidden=false; viewCards.hidden=true; btnTable.classList.add('active'); btnCards.classList.remove('active'); });

/* export */
document.getElementById('btn-export').addEventListener('click',()=>{
  let md='# Journey: '+JOURNEY.title+'\\n\\n**Product:** '+JOURNEY.product+'  \\n**Last updated:** '+JOURNEY.last_updated+'\\n\\n---\\n\\n';
  let phase=null;
  JOURNEY.steps.forEach((s,i)=>{
    if(s.phase!==phase){ phase=s.phase; md+='## Phase: '+phase+'\\n\\n'; }
    md+='### Step '+(i+1)+': '+s.name.replace(/^Step \\d+[a-z]*:\\s*/i,'')+'\\n\\n';
    if(s.player_emotions) md+='**Emotions:** '+s.player_emotions+'\\n\\n';
    if(s.pain_points&&s.pain_points.length) md+='**Pain Points:**\\n'+s.pain_points.map(p=>'- '+p).join('\\n')+'\\n\\n';
    if(s.opportunities&&s.opportunities.length) md+='**Opportunities:**\\n'+s.opportunities.map(o=>'- '+o).join('\\n')+'\\n\\n';
    if(s.ideas&&s.ideas.length) md+='**Ideas:**\\n'+s.ideas.map(x=>'- '+x).join('\\n')+'\\n\\n';
    md+='---\\n\\n';
  });
  const a=Object.assign(document.createElement('a'),{ href:URL.createObjectURL(new Blob([md],{type:'text/markdown'})), download:JOURNEY.id+'-export.md' });
  a.click();
});
`;
}

// ─── Page assembler ──────────────────────────────────────────────────────────

function buildPageHTML(journey) {
  const ssMap     = collectScreenshots(journey);
  const tableView = buildTableView(journey);
  const detPanel  = buildDetailPanel();
  const css       = buildCSS();
  const js        = buildJS(journey, ssMap);

  const phaseSections = journey.phases.map((phase, pi) => {
    const phaseSteps = journey.steps.filter(s => s.phase === phase.name);
    const color      = PHASE_ACCENT[pi % PHASE_ACCENT.length];
    const cardsHTML  = buildCardsRow(journey, phaseSteps, ssMap);
    return `
<section class="phase-section">
  <div class="phase-header">
    <div class="phase-label">
      <div class="phase-dot" style="background:${color}"></div>
      <span class="phase-name" style="color:${color}">${esc(phase.name)}</span>
    </div>
    ${phase.guiding_question
      ? `<span class="phase-question">${esc(phase.guiding_question)}</span>`
      : ''}
  </div>
  <div class="cards-row">${cardsHTML}</div>
</section>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Journey Map v2 — ${esc(journey.title)}</title>
  <style>${css}</style>
</head>
<body>

<header class="app-header">
  <div class="header-info">
    <h1>${esc(journey.title)}</h1>
    <p>${esc(journey.product)}${journey.last_updated ? ' &nbsp;·&nbsp; Updated ' + esc(journey.last_updated) : ''}</p>
  </div>
  <div class="header-actions">
    <button class="btn active" id="btn-cards">Cards</button>
    <button class="btn" id="btn-table">Table</button>
    <button class="btn-primary" id="btn-export">&#x2B07; Export MD</button>
  </div>
</header>

<div id="view-cards">${phaseSections}</div>

${tableView}
${detPanel}

<script>${js}</script>
</body>
</html>`;
}

// ─── CLI runner ─────────────────────────────────────────────────────────────

function run() {
  console.log('BetOnline Journey Map Generator — v2');
  console.log('=====================================\n');

  const targetSlug = process.argv[2] || null;

  const files = fs.readdirSync(JOURNEYS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      filename: f,
      slug: path.basename(f, '.md'),
      raw: fs.readFileSync(path.join(JOURNEYS_DIR, f), 'utf8'),
    }));

  const filtered = targetSlug ? files.filter(f => f.slug === targetSlug) : files;

  if (filtered.length === 0) {
    console.error(`No journey found: "${targetSlug}". Available: ${files.map(f => f.slug).join(', ')}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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

    const outFile = path.join(OUTPUT_DIR, `${journey.slug}-v2.html`);
    process.stdout.write(`Building ${journey.slug}-v2.html ... `);
    try {
      collectScreenshots(journey); // sets step._screenshots
      const html = buildPageHTML(journey);
      fs.writeFileSync(outFile, html, 'utf8');
      const size = (fs.statSync(outFile).size / 1024).toFixed(1);
      console.log(`OK  → output/${journey.slug}-v2.html  (${size} KB)`);
    } catch (err) {
      console.error(`FAILED\n  ${err.message}`);
      process.exit(1);
    }
  }

  console.log('\nOpen in your browser — no server needed.');
}

run();
