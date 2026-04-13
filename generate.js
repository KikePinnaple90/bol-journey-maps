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
// Run parsing and log output for verification
// ---------------------------------------------------------------------------

if (require.main === module) {
  const files = readJourneyFiles();
  const journeys = files.map(f => parseJourney(f.slug, f.raw));

  journeys.forEach(j => {
    console.log(`\n===== ${j.title} (${j.slug}) =====`);
    console.log(`  Description : ${j.description}`);
    console.log(`  Phases      : ${j.phases.map(p => p.name).join(', ')}`);
    console.log(`  Steps (${j.steps.length}):`);
    j.steps.forEach((s, i) => {
      const branch = s.branch ? ` [branch: ${s.branch}]` : '';
      console.log(`    ${i + 1}. [${s.phase}] ${s.name}${branch} — emotion: ${s.emotion_score}`);
    });
  });

  console.log('\nParsing complete. Ready for Part 2 (HTML generation).');
}

module.exports = { readJourneyFiles, parseJourney };
