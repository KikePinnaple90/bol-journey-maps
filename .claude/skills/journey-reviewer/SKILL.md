---
name: journey-reviewer
description: Run a pre-stakeholder review checklist on a journey map. Checks for drop-off risks, missing touchpoints, and Octalysis coverage gaps. Use before sharing a journey with stakeholders, directors, or engineering.
argument-hint: [journey-slug or filename]
allowed-tools: Read Glob Bash
---

# Journey Reviewer

Run a structured pre-stakeholder review on a journey map file. Produce a scored report with clear pass/flag/fail per check. No padding — only findings that require action or acknowledgement.

## Step 1 — Load the journey

If `$ARGUMENTS` is provided, read `journeys/$ARGUMENTS.md` or `journeys/$ARGUMENTS` (try both).
If no argument, list available journeys and ask which one to review:

```!
ls journeys/
```

Read the full file before starting any checks.

## Step 2 — Run the checklist

Work through all five sections. For each check output: ✅ Pass, ⚠️ Flag, or ❌ Fail with a one-line reason.

---

### A. Structure Integrity

| Check | Criteria |
|---|---|
| Phase coverage | At least 2 phases, each with a `guiding_question` |
| Step count | 5–9 steps total |
| All fields present | Every step has: persona, touchpoint, description, player_goal, business_goal, player_action_description, user_actions, player_emotions, octalysis_drives, success_criteria, pain_points, opportunities, data_sources |
| Branch completeness | If a branch exists, every declared branch option has a corresponding step; branches converge |
| Screenshot refs | Every step has a `screenshot:` or `screenshots:` field |

---

### B. Drop-off Risk

Flag any step where two or more of the following are true — these are the steps where users abandon:

- `player_emotions` contains words like: frustrated, confused, impatient, annoyed, lost, overwhelmed
- `pain_points` has 3 or more items
- `success_criteria` is vague (no time, click count, or measurable action)
- Black hat drives (CD6, CD7, CD8) appear with no corresponding white hat drive (CD1–CD5) in the same step
- No `opportunities` listed to mitigate the pain

For each flagged step: name it, state the risk, cite the specific fields that triggered it.

---

### C. Touchpoint Coverage

- Every phase should have at least one step grounded in a specific UI surface (left nav, betslip, fixture page, etc.) — flag phases where touchpoints are generic or missing
- Check for **transition gaps**: is there a step that teleports the user from one context to another without explaining how they got there? (e.g., user is on homepage in step 2 and on a fixture page in step 3 with no navigation step between)
- Flag any step where `touchpoint` is blank, "N/A", or describes an internal system rather than a user-facing surface

---

### D. Octalysis Coverage

Evaluate drive usage across the full journey:

**Per-step checks:**
- Every step must have at least 2 drives
- No step should have more than 5 drives (indicates vague mapping)
- Drives must include a reason (`— why it applies`) not just a label

**Journey-level checks:**
- White hat drives (CD1–CD5): should appear in at least 60% of steps — if lower, the journey skews toward anxiety/urgency without enough positive motivation
- Black hat drives (CD6–CD8): should appear in steps involving live betting, scarcity, or risk — flag if they appear in discovery/onboarding steps without mitigation
- Drive variety: if the same 2 drives appear in every single step, flag as under-differentiated
- Missing drives: note which of CD1–CD8 never appear at all across the journey — may indicate a persona or phase not being served

---

### E. Stakeholder Readiness

- **Business goals**: every step must have a distinct, non-generic `business_goal` — flag duplicates or goals that say nothing specific (e.g., "improve conversion")
- **Data sources**: every step must reference at least one real tracking event, analytics tool, or data method — flag steps with no data source or placeholder text
- **Pain points specificity**: pain points must describe the actual product behaviour, not UX principles — flag items like "poor UX" or "friction" without specifics
- **Ideas vs Opportunities**: `opportunities` should be near-term product improvements; `ideas` should be longer-term or exploratory — flag if both lists contain the same items or if one is empty on every step

---

## Step 3 — Produce the report

Output in this structure:

```
## Journey Review: [Journey Title]
Reviewed: [date]
Steps: X  |  Phases: X  |  Branches: X

### A. Structure Integrity
[results]

### B. Drop-off Risks
[results — name each at-risk step]

### C. Touchpoint Coverage
[results]

### D. Octalysis Coverage
[results — include drive frequency table if issues found]

### E. Stakeholder Readiness
[results]

---
## Summary
[Blockers] X items must be fixed before sharing
[Flags] X items worth addressing
[Ready to share] Yes / No / With caveats

## Priority fixes
1. [Most critical issue — step name + field + what to fix]
2. ...
```

Do not summarise what passed. Only list what needs attention.
