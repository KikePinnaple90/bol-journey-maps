---
name: kpi-tracker
description: Generate a KPI tracker markdown file for a BetOnline feature, journey, or initiative. Use when the user wants to define, track, or review KPIs for a product area.
argument-hint: [feature name or initiative]
allowed-tools: Read Write Bash
---

# KPI Tracker Generator

You are helping create a KPI tracking document for a BetOnline product initiative.

## What you need to produce

A new markdown file at `kpis/[slug].md` following the exact format in [template.md](template.md).

## Input

The user may provide any of the following:
- A feature or initiative name: `$ARGUMENTS`
- A list of KPIs they want to track
- A screenshot or table of existing KPIs
- Nothing yet (ask for what you need)

## Step 1 — Gather information

If the user hasn't provided enough, ask for:
1. **Initiative name** — what product area or feature is this tracking? (e.g. "League Hub", "Weekly Cash Boost")
2. **KPIs** — which metrics should be tracked? Start from the standard set below and add custom ones
3. **Owners** — who tracks each KPI? (BI, Marketing, Product, CRM)
4. **Where** — which tool or dashboard holds the data? (Siense, Mixpanel, GA, BEAT, BI)
5. **Targets** — does the user have target values? If not, leave as placeholder
6. **Period** — what date range does this cover?

## Step 2 — Standard KPI set

Always include these unless the user explicitly excludes them:

| KPI | Default Owner | Notes |
|---|---|---|
| Average Play (Active) Time | BI | Avg session duration for active players |
| Average Return Per Player (ARPU) | BI | Total revenue / active players in period |
| Lifetime Value of the Player (LTV) | BI | Projected value over player relationship |
| Retention Rate | BI | % of players returning in next period |
| Redeem Rate | Marketing | % of issued bonuses/boosts redeemed |

Add journey-specific KPIs based on the initiative:
- **Navigation / discovery journeys**: time-to-first-bet, league page CTR, bounce rate on league pages
- **Live betting**: time-to-first-live-bet, live bet acceptance rate, bet rejection rate
- **Outrights / futures**: outright section traffic, conversion rate on futures listings
- **Betslip / conversion**: betslip open → bet placed rate, avg time betslip → confirmation

## Step 3 — Build the markdown file

### File naming
- Filename: `kpis/[slug].md` where slug is kebab-case (e.g. `league-hub-kpis.md`)

### Column rules
- **KPI** — uppercase, bold, specific metric name
- **WHO TRACKING** — team responsible (BI, Marketing, Product, CRM)
- **WHERE** — exact tool or dashboard (Siense, Mixpanel, GA, BEAT, BI dashboard)
- **FORMULA** — plain English calculation (e.g. "Total % of all redeemed weekly cash boosts")
- **TARGET** — numeric goal (e.g. "70%", "> 5 min", "< 2 clicks")
- **RESULT** — current measured value (leave blank if not yet measured)
- **CONCLUSIONS** — plain English interpretation of the result vs target
- **GOAL** — the strategic objective this KPI serves (e.g. "Increase session depth", "Drive futures handle")

## Step 4 — Report what was created

Tell the user:
- File path of the new markdown file
- Number of KPIs included
- Which KPIs have targets vs which need to be defined
- Which KPIs have no WHERE yet (data source unknown)

Refer to [template.md](../templates/kpi-tracker.md) for the exact table structure.
