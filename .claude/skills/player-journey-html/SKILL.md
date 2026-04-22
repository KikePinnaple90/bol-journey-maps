---
name: player-journey-html
description: Generate an HTML output file from a player journey map markdown file. Use when the user wants to build or rebuild the HTML for an existing journey map, or when a journey markdown has been created or updated.
argument-hint: [path to journey .md file, e.g. journeys/league/merged.md]
allowed-tools: Read Write Bash
---

# Player Journey HTML Generator

You generate a self-contained HTML file from a player journey map markdown file.

## Input

The user provides a path to a markdown file: `$ARGUMENTS`

Examples:
- `journeys/league/merged.md`
- `journeys/soccer/v1.md`
- `journeys/world-cup/v1.md`

If no argument is given, ask the user which journey file they want to build HTML for, then list available files:

```bash
find journeys/ -name "*.md" | sort
```

## Step 1 — Identify the source file and output path

Determine:
- **Source**: the `.md` file path provided
- **Output**: where to write the HTML

Output path convention:
| Source | Output |
|---|---|
| `journeys/league/v1.md` | `output/league/v1.html` |
| `journeys/league/merged.md` | `output/league/merged.html` |
| `journeys/soccer/v1.md` | `output/soccer/v1.html` |
| `journeys/soccer/merged.md` | `output/soccer/merged.html` |
| `journeys/world-cup/v1.md` | `output/world-cup/v1.html` |
| `journeys/[folder]/[name].md` | `output/[folder]/[name].html` |

## Step 2 — Choose the generation method

### Option A — Source format files (v1.md)

If the file uses the source format (fields like `- persona:`, `- touchpoint:`, `- player_goal:`, `- octalysis_drives:`), run the generator:

```bash
# Copy to flat journeys/ so the generator can find it, run, then clean up
cp journeys/[folder]/v1.md journeys/[slug].md
node generate-v2.js [slug]
mv output/[slug]-v2.html output/[folder]/v1.html
rm journeys/[slug].md
```

### Option B — Merged / exported format files (merged.md, v2.md)

If the file uses the merged format (sections like `## Stages`, `## Pain Points`, `## Detailed Steps` with `**Persona:**` style fields), build the HTML directly by reading the markdown and writing a self-contained HTML file.

The HTML must:
- Be fully self-contained (no external dependencies)
- Use tabs for the summary table sections: **Overview**, **Steps**, **Pain Points**, **Opportunities**, **Octalysis**, **Data Sources**
- Render steps as cards organized by phase/stage with branch visualization
- Match the design system: dark header, phase labels (blue=Discovery/Engage, orange=Convert/Selection), color-coded card sections (red=pain, green=opps, blue=ideas, purple=octalysis, grey=data)
- Output path: `output/[folder]/[name].html`

See `output/league/v2.html` for the established card layout reference.

## Step 3 — Write the output file

Ensure the output directory exists:

```bash
mkdir -p output/[folder]/
```

Write the HTML to `output/[folder]/[name].html`.

## Step 4 — Commit and push

```bash
git add output/[folder]/[name].html
git commit -m "Build output/[folder]/[name].html from [source path]"
git push -u origin main
```

## Step 5 — Report

Tell the user:
- Output file path
- File size in KB
- Whether to view it via GitHub raw or locally in a browser
