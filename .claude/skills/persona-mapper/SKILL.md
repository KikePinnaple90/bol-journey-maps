---
name: persona-mapper
description: Map a player to one of three performance sub-roles based on their betting behaviour, lifecycle stage, and risk profile: Activation/Momentum, Value/Retention, or Recovery/Risk. Use when profiling a player segment, reviewing CRM strategy, or grounding a journey map in a specific player type.
argument-hint: [player description or segment name]
---

# Persona Mapper

Map a player (or player segment) to one of three performance sub-roles. Output a clear classification with confidence level, evidence, and recommended journey entry point.

## The Three Sub-Roles

### Activation / Momentum
**Who:** New registrants, recently reactivated players, or players still forming their first betting habits.
**Signals:**
- Registered within the last 30–60 days OR dormant for 90+ days and just returned
- Low bet count (fewer than 5 lifetime bets) or irregular cadence (long gaps between sessions)
- Mostly single-market bets (Moneyline only); has not explored parlays, SGPs, or futures
- First deposit not yet fully wagered or bonus not yet triggered
- Relies on popular leagues only; has not branched into non-mainstream sports
- High navigation friction visible in session data (deep page views, bounces, back-button loops)

**What they need:** Clear entry points, reduced friction, early-win moments, education on bet types, and a reason to return within 7 days.
**Risk if ignored:** Drop-off before habit forms; bonus abuse without conversion to genuine play.

---

### Value / Retention
**Who:** Engaged, active players who bet regularly and generate meaningful handle. The core of the book.
**Signals:**
- 3–6+ sessions per month with consistent bet cadence
- Mix of bet types: straight bets plus at least occasional parlays or SGPs
- Bets across multiple sports or leagues — not single-sport locked
- Average stake is stable or growing over the last 30 days
- Engages with promotions but is not solely promo-driven
- Has placed live bets at least once
- Low rejection rate; uses betslip confidently

**What they need:** Depth of content (market variety, futures, live), personalisation (favourite leagues, bet history), and rewards that reinforce ongoing engagement without training for bonus abuse.
**Risk if ignored:** Quiet churn — no single moment of drop-off, just gradual reduction in session frequency.

---

### Recovery / Risk
**Who:** Players showing decline signals, disengagement, or problem gambling indicators. Requires careful handling.
**Signals — Churn risk:**
- Previously active (3+ sessions/month) but now 21–60 days since last bet
- Declining stake size or bet frequency over last 30 days
- Stopped using features they previously used (e.g., used to place parlays, no longer does)
- Only logging in without placing bets (browsing without converting)

**Signals — Problem gambling risk (handle with caution — do not target with retention offers):**
- Rapid escalation of stake size or session frequency
- High rejection rate due to limits exceeded
- Self-exclusion history or affordability checks triggered
- Chasing losses pattern: bet frequency spikes after large losses
- Depositing immediately after withdrawal

**What they need (churn):** Winback content, personalised re-entry offers, frictionless return to familiar content.
**What they need (PG risk):** Responsible gambling tools, cooling-off nudges, reduced marketing contact. Do NOT use FOMO or scarcity messaging.
**Risk if ignored:** Revenue loss (churn) or regulatory and reputational exposure (PG risk).

---

## Step 1 — Collect the input

If `$ARGUMENTS` is provided, use it as the player description.
If not, ask the user for the following (accept partial answers):

1. **Lifecycle stage** — new, active, lapsing, reactivated?
2. **Bet behaviour** — frequency, typical bet types (straight/parlay/SGP/live), stake range
3. **Product breadth** — how many sports/leagues? Uses futures? Places live bets?
4. **Recency** — days since last bet, trend (increasing/stable/declining)
5. **Friction signals** — any known navigation loops, high rejection rates, bonus abuse patterns?
6. **Risk flags** — any responsible gambling indicators?

---

## Step 2 — Classify

Score the player against each sub-role's signals. If signals are mixed, output the **primary** role and note the secondary.

For problem gambling signals: always flag them explicitly regardless of primary classification. Never combine PG-flagged players with standard retention plays.

---

## Step 3 — Output

```
## Persona Classification

**Player / Segment:** [name or description]
**Primary Sub-Role:** [Activation/Momentum | Value/Retention | Recovery/Risk]
**Confidence:** [High | Medium | Low]
**Secondary signal:** [if applicable]

### Evidence
- [Signal 1 — cite the specific data point or behaviour]
- [Signal 2]
- [Signal 3]

### ⚠️ Risk Flags
[List any PG indicators, compliance considerations, or edge cases. "None identified" if clean.]

### Recommended Journey Entry Point
[Which existing journey map is most relevant? At which step should messaging/product focus begin?]
e.g. "Enter at Step 2 of find-a-line-for-a-league — user knows what they want but gets lost in navigation"

### Do / Do Not
**Do:** [2–3 product or CRM actions appropriate for this sub-role]
**Do not:** [1–2 things that would be wrong or harmful for this player at this stage]
```

---

## Notes on using this in journey maps

When creating a journey map with `/journey-map`, each step's `persona` field should reference the sub-role alongside the named persona:

```
- persona: Maria (Soccer-First Bettor) — Value/Retention
```

This links behavioural lifecycle state to the named persona, making journey maps useful for both product and CRM teams.
