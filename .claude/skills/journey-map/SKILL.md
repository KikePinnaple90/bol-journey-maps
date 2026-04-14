---
name: journey-map
description: Generate a new BetOnline player journey map markdown file and HTML from scratch or from a PRD. Use when the user wants to create a new journey, add a new journey map, or map out a user flow for a feature.
argument-hint: [journey-name or description]
allowed-tools: Read Write Bash Glob
---

# Journey Map Generator

You are helping create a new player journey map for the BetOnline sportsbook journey mapping tool.

## What you need to produce

A new markdown file at `journeys/[slug].md` following the exact format in [template.md](template.md), then run `node generate.js [slug]` to generate the self-contained HTML.

## Input

The user may provide any of the following. Work with whatever they give you:
- A journey name or slug: `$ARGUMENTS`
- A PRD, feature spec, or description pasted into the conversation
- A rough list of steps or phases
- Nothing yet (ask for what you need)

## Step 1 — Gather information

If the user hasn't provided enough to build the journey, ask for:
1. **Journey title** — what is the user trying to do? (e.g. "Place a Live Bet on a Soccer Match")
2. **Persona(s)** — who is the user? Check existing journeys for established personas first
3. **Phases** — what are the 2–4 major phases? (e.g. Discovery, Selection, Bet Placement)
4. **Steps** — what are the 5–9 steps across those phases?
5. **Branch** — is there a decision point where the journey splits? If so, at which step?

If a PRD or spec is provided, extract this information directly from it. Do not ask for what you can infer.

## Step 2 — Read existing journeys for context

Before writing, read the existing journeys to understand the voice, detail level, and product context:

```!
ls journeys/
```

Read at least one existing journey for reference:
- `journeys/find-a-line-for-a-league.md` — current-state pain point journey
- `journeys/world-cup-hub.md` — future-state PRD-derived journey

## Step 3 — Build the markdown file

Follow these rules strictly:

### File naming
- Filename: `journeys/[slug].md` where slug is kebab-case (e.g. `live-bet-soccer.md`)
- ID field must match slug exactly

### Phases
- 2–4 phases per journey
- Each phase has a `guiding_question` that frames the user's intent
- Steps belong to the phase above them

### Steps
- 5–9 steps total (7 is the sweet spot)
- Each step must have ALL fields from the template — no skipping
- `player_emotions` must be specific and contextual — never generic (not "frustrated", but "mildly frustrated because the list is long and unfiltered")
- `octalysis_drives` must reference the specific moment — explain WHY the drive applies here:
  - CD1: Epic Meaning & Calling — white hat
  - CD2: Development & Accomplishment — white hat
  - CD3: Empowerment of Creativity — white hat
  - CD4: Ownership & Possession — white hat
  - CD5: Social Influence & Relatedness — white hat
  - CD6: Scarcity & Impatience — black hat
  - CD7: Unpredictability & Curiosity — black hat
  - CD8: Loss & Avoidance — black hat
  Use 2–4 drives per step. White hat drives motivate progress; black hat drives create urgency and anxiety. Both are real and valid.
- `success_criteria` must be measurable (time, clicks, or observable action)
- `pain_points` must be specific product observations — not generic UX principles
- `data_sources` should reference real tracking events where possible (BEAT, Mixpanel, GA)

### Branches
- If the journey splits at a decision point, add `- branch: option-a | option-b` to that step
- Branch steps must append `[branch: option-a]` to their step name
- Branches should converge at a later step (omit branch tag on converged steps)

### Screenshots
- Use the path convention: `screenshots/[journey-slug]-step[N]-[name].png`
- These are placeholders — files don't need to exist yet

## Step 4 — Verify the file parses correctly

After writing the file, run:

```bash
node generate.js [slug]
```

If it fails, read the error and fix the markdown. Common issues:
- Indentation on bullet list fields must use 2 spaces + `- ` (not tabs)
- `octalysis_drives` items must be formatted as `  - CD[N]: Name — reason`
- Branch tag on step name must be `[branch: slug]` inside the heading line
- No trailing `- branch:` field needed on branch sub-steps

## Step 5 — Report what was created

Tell the user:
- File path of the new markdown file
- Number of steps and phases parsed
- Output HTML path and size
- The slug to use when downloading: `output/[slug].html`
- Remind them to add screenshots to `screenshots/` folder when ready

## Quality bar

Every journey should read like a senior PM wrote it after real user research. The detail in `pain_points` and `player_emotions` is what makes this tool valuable — not the structure itself. If the input is thin, ask follow-up questions rather than producing vague content.

Refer to [template.md](template.md) for the exact field structure.
