---
name: business-goals
description: Generate a Business Goals tracking document for a BetOnline feature or initiative. Use when the user wants to define business goals, success measurements, and recommendations for a product area.
argument-hint: [feature name or initiative]
allowed-tools: Read Write Bash
---

# Business Goals Generator

You are helping create a Business Goals document for a BetOnline product initiative.

## What you need to produce

A new markdown file at `goals/[slug].md` following the exact format in [template.md](template.md).

## Input

The user may provide any of the following:
- A feature or initiative name: `$ARGUMENTS`
- A list of goals or outcomes they want to achieve
- A screenshot or existing table of goals
- Nothing yet (ask for what you need)

## Step 1 — Gather information

If the user hasn't provided enough, ask for:
1. **Initiative name** — what product area or feature is this for? (e.g. "Weekly Cash Boost", "League Hub")
2. **Goals** — what are the 3–5 business goals? Start from the standard set below
3. **Measurements** — what metrics confirm each goal is being achieved?
4. **Period** — what date range does this cover?
5. **Results** — are there existing scores/results, or is this a planning document?

## Step 2 — Standard business goals

Always consider these for BetOnline initiatives:

| Business Goal | Strategic Sub-Goal | Typical Metrics |
|---|---|---|
| Build a habit of returning to the site | Increase player retention and weekly active users | WAU before/after, % returning within 7 days of receiving boost |
| Encourage players to reinvest cash received | Drive more gameplay, bets, and overall turnover | % bonus cash wagered, total bets from bonus vs. baseline, conversion bonus → real money |
| Build positive emotions and brand attachment | Enhance loyalty, NPS, and brand advocacy | Player satisfaction surveys, sentiment from chat/feedback, retention rate of high-value players |
| Players encouraged to climb VIP status | Increase long-term player value and loyalty | Players progressing in VIP tiers, avg weekly bets per VIP tier, % boosted players leveling up faster |

Add initiative-specific goals based on what the feature does.

## Step 3 — Column rules

- **Business Goal** — bold title + italicised strategic sub-goal in parentheses on second line
- **Measurement** — 3 bullet metrics + a **Confirmation:** statement that defines the observable proof the goal was achieved
- **Overall Score** — leave blank for planning docs; fill with score/status/result for review docs
- **Recommendations** — leave blank for planning docs; fill with action items based on results

## Step 4 — Confirmation statements

Each goal must have a Confirmation statement. Format: _"[Observable event or signal] vs. [baseline or control]"_

Examples:
- "A clear lift in return visits vs. a control period or group"
- "Increased wagering activity directly linked to bonus issuance"
- "Players mention positive experiences; improved repeat engagement over time"
- "Noticeable movement up VIP tiers correlated with cash boosts"

## Step 5 — Report what was created

Tell the user:
- File path of the new goals document
- Number of goals defined
- Which goals have measurements vs. which need metrics defined
- Which goals have results vs. which are pending

Refer to [template.md](../templates/business-goals.md) for the exact table structure.
