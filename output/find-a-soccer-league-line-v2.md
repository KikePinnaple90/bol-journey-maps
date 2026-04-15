# Journey: Find a Specific Soccer League Line
**id:** find-a-soccer-league-line  
**product:** BetOnline Sportsbook  
**last_updated:** 2026-04-15  

> A punter tries to find pre-match, live, and outright markets for a specific soccer league (e.g. Premier League, La Liga) in a single session

---

## Phase: Discovery
_How does a punter become aware of and navigate to a specific league's betting content?_

### Step 1: Land on Sports Home

**Persona:** Recreational Punter  
**Touchpoint:** Sports Homepage  
**Emotion:** Neutral to slightly impatient — they know what they want and just need to find it  

The user arrives at BetOnline's sports home after deciding they want to bet on a specific soccer league. They orient themselves on the sports homepage and look for a way into the left navigation to find their league.

**Player Goal:** Quickly locate the left nav and find their target soccer league  
**Business Goal:** Minimize time-to-first-bet; surface the most popular leagues prominently  
**Success Criteria:** User identifies the left nav as the path to their target soccer league within 10 seconds  

#### Pain Points
- Homepage is promotion-heavy; direct league navigation is not immediately visible
- No persistent "recently viewed leagues" shortcut
- Live and Pre-match are presented as separate top-level sections, creating early confusion about where to start

#### Opportunities
- Surface direct league access on the sports home without requiring left nav expansion

#### Ideas
- Personalized league shortcuts based on bet history
- Smart banner that detects live games in the user's preferred leagues

#### Octalysis Drives
- CD2: Development & Accomplishment — motivated to find and place their bet
- CD7: Unpredictability & Curiosity — curious what the current lines look like

#### Data Sources
- Google Analytics: homepage scroll depth, click heatmaps
- Internal: most-clicked sports/leagues from homepage sessions

---

### Step 2: Open Left Nav and Navigate to Soccer

**Persona:** Recreational Punter  
**Touchpoint:** Left Navigation — Sport tree  
**Emotion:** Mild frustration if the list is long or the same league appears multiple times  

The user opens the left nav and expands the Soccer tree to find their target league. They scroll through the list of available soccer leagues looking for a single, clear entry point.

**Player Goal:** Expand the soccer sport tree and locate their target league in one clear entry  
**Business Goal:** Keep the funnel moving; reduce drop-off between sport and league selection  
**Success Criteria:** User finds their target soccer league as a single, unambiguous entry in the list  

#### Pain Points
- League list can be very long and lacks a single unified entry per league
- No indication of which leagues have live games vs pre-match only vs outrights available
- No way to tell where all markets for a league are accessible from this view
- Sharp bettors find the navigation too slow; they prefer direct URLs or search

#### Opportunities
- Show live/pre-match/outright availability badges next to each league name
- Create a League Hub with all league-related content accessible from a single nav entry

#### Ideas
- "Now Live" indicator on league rows
- Filter chips: Pre-match only / Live only / Has Outrights

#### Octalysis Drives
- CD2: Development & Accomplishment — making progress toward the bet
- CD6: Scarcity & Impatience — the game may be starting soon

#### Data Sources
- Internal: sport → league click-through rates
- Session recordings (FullStory / Hotjar): scroll depth on sport pages

---

### Step 3: Select the League from the Soccer Tree

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Left nav — Soccer league list entry  
**Emotion:** Expectation of comprehensiveness — quickly becomes frustration when they realize the view is partial  

The user clicks on their target soccer league from within the Soccer tree. This is the critical decision point — the product currently routes them to either Pre-match OR Live, not a unified league hub. Multiple entry points may exist for the same league and outrights are entirely separated.

**Player Goal:** See all available betting options for this league in one place  
**Business Goal:** Route user to the highest-value market (live if a game is in progress; pre-match if not)  
**Success Criteria:** User sees a complete, unified view of the league's betting landscape  

#### Pain Points
- No unified league hub — clicking a league in Pre-match takes you to pre-match only; clicking in Live takes you to live only
- Outrights are in a completely separate section, often hard to find
- Users have to navigate to 2–3 different places to get a full picture of a league's markets
- Multiple left nav entries exist for the same league, creating confusion

#### Opportunities
- Build a unified League Hub page: tabs for Pre-match / Live / Outrights in one URL
- Deep-link league from anywhere to the hub, not to a product-specific silo

#### Ideas
- "League Hub" concept: single destination per league with product toggle
- Smart default: if a game is live, live is at the top of the hub; otherwise Pre-match first

#### Octalysis Drives
- CD8: Loss & Avoidance — worried they're missing markets they don't know exist
- CD6: Scarcity & Impatience — losing time navigating instead of betting

#### Data Sources
- Internal: bounce rate on league pages
- Internal: navigation paths after league click (do users bounce back and re-navigate?)

---

## Phase: Selection
_Once inside a league, how does a punter find the specific market they want and place a bet?_

### Step 4: Browse Pre-match Games and Markets _(prematch)_

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Pre-match Sportsbook — League view  
**Emotion:** Engaged if the market offering is rich; frustrated if limited, duplicated, or slow to load  

The user is on the pre-match league page after selecting the soccer league from the left nav. They browse upcoming games and available markets, scrolling through the game list and clicking into individual games to evaluate markets.

**Player Goal:** Find the game and market they want to bet on before it starts  
**Business Goal:** Maximize pre-match handle; encourage multi-game/parlay selection  
**Success Criteria:** User finds their target game and market within 2 clicks from the league page  

#### Pain Points
- Not all markets for the same league are available from a single left nav entry point
- Real games are duplicated in the list
- Left nav game counter doesn't reflect the true number of real games
- No way to compare lines across multiple games on one screen
- Games that have already gone live disappear from pre-match without a transition, causing confusion

#### Opportunities
- Merge duplicated games into a single game entry
- Unify left nav entries for the same league across products
- Add "Same Game Parlay" and "Odds Boosters" CTAs on the league view for recreational bettors

#### Ideas
- Unified league content in one entry point
- Pre-match to live transitions in both league and event views

#### Octalysis Drives
- CD3: Empowerment of Creativity — building their bet strategy, comparing lines
- CD4: Ownership & Possession — selecting their picks, building their betslip
- CD2: Development & Accomplishment — feeling like a smart bettor finding value

#### Data Sources
- Internal: click-through rate from league list to game detail
- Internal: markets per game viewed before bet placement
- Internal: navigation loops (users bouncing back to league list)

---

### Step 5: Select Live Betting and Browse Live Games and Markets _(live)_

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Live Betting section — Soccer league filter  
**Emotion:** High urgency — live markets move fast; every extra navigation step costs a real betting opportunity  

The user navigates to the Live Betting section (a separate top-level section from pre-match). Once inside, they must re-find their soccer league by scrolling or filtering through all live games across all sports, then browse in-play markets within the league.

**Player Goal:** Find an in-play market on a specific soccer league game quickly  
**Business Goal:** Capture live handle; live bettors are high-value and time-sensitive  
**Success Criteria:** User finds their live soccer game and browses markets within 15 seconds of deciding to bet live  

#### Pain Points
- No direct path from the league pre-match page to live markets for the same league
- Live Betting section shows all leagues in alphabetical order — finding a specific soccer league requires extensive scrolling
- No league context is carried over from the pre-match session; user must re-navigate from scratch
- Odds update speed and latency can cause selections to be rejected ("line has moved")

#### Opportunities
- Add a direct "Live Now" link on the league hub or pre-match league page
- Persist league filter when user switches from pre-match to live
- Order leagues by popularity within a sport in the live section

#### Ideas
- Live games surfaced inside the league hub alongside pre-match
- Pre-match to live transition in both league hub view and event view
- Push notification or on-site alert when a followed league goes live

#### Octalysis Drives
- CD6: Scarcity & Impatience — the live moment is passing, odds are moving
- CD8: Loss & Avoidance — fear of missing the bet window or getting a stale price
- CD7: Unpredictability & Curiosity — the in-play moment is exciting but fleeting

#### Data Sources
- Internal: live bet acceptance rate (rejection due to line movement)
- Internal: navigation path from pre-match league page → live section
- Internal: time-to-first-live-bet per session

---

### Step 6: Go Back to Sports and Find Futures in Left Nav _(outrights)_

**Persona:** Sharp, Recreational Punter (seasonal)  
**Touchpoint:** Sports Left Nav — Futures section  
**Emotion:** Exploratory but increasingly frustrated by the navigation break — feels like starting the journey over  

To find soccer outrights, the user must leave the main sportsbook, navigate back to the Sports section, and then locate Futures inside the left nav. This is a completely separate navigation context from the league they were just browsing — there is no link or shortcut from the pre-match or live league view to the relevant outright markets.

**Player Goal:** Find the Futures section in the left nav to access soccer outrights  
**Business Goal:** Drive futures discovery and handle; futures bets have long lock-in periods that benefit the book  
**Success Criteria:** User successfully locates the Futures section in the left nav and identifies the soccer outrights entry  

#### Pain Points
- Futures/Outrights are completely disconnected from the league page — discoverability is very low
- No cross-sell from pre-match game view or league hub to relevant outrights
- Soccer outrights are not inside the Soccer sport tree — they live under a separate Futures section with no contextual link
- Naming conventions for outright types are inconsistent and hard to parse

#### Opportunities
- Surface outright teasers directly on the league page with a Futures tab
- Add a cross-sell strip in game detail views linking to relevant futures
- Consolidate soccer outrights inside the Soccer sport tree in the left nav

#### Ideas
- "League Futures" tab on the unified league hub
- Remove all separate outright entry points and place them inside each league hub
- Create clearer, consistent naming conventions for outright types

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — intrigued by futures, exploring possibilities
- CD8: Loss & Avoidance — worried they'll lose track of available markets or forget to bet

#### Data Sources
- Internal: outright section traffic and conversion rate
- Internal: navigation paths from pre-match league → futures section

---

### Step 7: Find Specific Soccer League in Outrights

**Persona:** Sharp, Recreational Punter (seasonal)  
**Touchpoint:** Futures Left Nav — Soccer league list  
**Emotion:** Mild disorientation — the structure feels different from the main sportsbook; uncertain they're in the right place  

Inside the Futures section, the user navigates to find their specific soccer league. The structure here differs from the main sportsbook — soccer leagues may not match the same naming or grouping as in pre-match, requiring the user to re-orient and re-scan.

**Player Goal:** Locate their specific soccer league within the Futures section  
**Business Goal:** Connect the user to the right outright market and drive futures handle  
**Success Criteria:** User finds their target soccer league's outright markets without needing to retrace steps  

#### Pain Points
- Soccer league naming and grouping in Futures doesn't always match the main sportsbook
- No breadcrumb or context trail connecting this Futures view to the league page they came from
- Market availability is inconsistent — some leagues have rich futures, others have very few or none

#### Opportunities
- Align soccer league naming and structure between Futures and the main sportsbook
- Add contextual breadcrumbs or a "Back to league" link

#### Ideas
- Unified league identity across pre-match, live, and futures navigation
- Show futures market count next to each league name in the left nav

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — interested in what futures markets are available
- CD4: Ownership & Possession — wants to stake a position on a season-long outcome
- CD8: Loss & Avoidance — worried they are missing markets they don't know about

#### Data Sources
- Internal: bounce rate on futures league listings
- Internal: drop-off between futures section entry and league selection

---

### Step 8: Browse League Outrights and Markets

**Persona:** Sharp, Recreational Punter (seasonal)  
**Touchpoint:** Outrights / Futures — League market view  
**Emotion:** Exploratory and patient, but frustrated by inconsistent market depth and the navigation effort required to get here  

The user is now inside the outright market view for their target soccer league. They browse available futures markets (e.g. league winner, top scorer, relegation) and evaluate odds across multiple outcomes before selecting.

**Player Goal:** Find the best available futures market for their league and evaluate the odds  
**Business Goal:** Drive futures handle; maximize market exposure and time-on-page engagement  
**Success Criteria:** User finds and evaluates at least 3 outright market options for their league and successfully adds one to the betslip  

#### Pain Points
- Outrights are completely disconnected from the main league experience — the journey to get here is too long
- No cross-sell from pre-match game view to relevant outrights
- Market availability is inconsistent — some leagues have rich futures, others have almost none
- Soccer outrights are not inside the soccer sport tree, breaking the mental model
- Outright type naming is inconsistent and hard to parse across leagues

#### Opportunities
- Surface outright teasers on the league hub with a dedicated Futures/Outrights tab
- Add a cross-sell strip in game detail views linking to relevant futures
- Bring soccer outrights inside the Soccer league tree

#### Ideas
- "League Futures" tab on the unified league hub
- Remove all separate outright entry points and consolidate into each league hub
- Add soccer outrights into each corresponding soccer league entry
- Standardize naming conventions across outright types

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — intrigued by futures, exploring possibilities
- CD4: Ownership & Possession — wants to "own" a position on the season outcome
- CD8: Loss & Avoidance — worried they're missing better odds elsewhere or will forget to bet

#### Data Sources
- Internal: outright section traffic and conversion rate
- Internal: bounce rate on outright listings by league
- Internal: time spent on futures market view before selection

---

### Step 9: Select Bet and Add to Betslip

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Game detail / Market view → Betslip  
**Emotion:** Excitement mixed with anxiety — they want confirmation quickly  

The user has found their market (pre-match, live, or outright) and clicks an odds button to add a selection to the betslip. They may add one selection (single) or multiple (parlay/accumulator).

**Player Goal:** Get their selection on the betslip accurately and quickly, then place the bet  
**Business Goal:** Maximize bet placement completion rate; minimize betslip abandonment  
**Success Criteria:** Bet is placed successfully with correct selection and stake in under 30 seconds from betslip open  

#### Pain Points
- Betslip can be slow to update when odds change
- Parlay building across pre-match and live is not supported
- Stake entry UX on mobile is poor (keyboard obscures betslip)

#### Opportunities
- Improve live betting delay
- Push users to update their betslip accept-odds preferences
- Enable quick-stake buttons (e.g. $10 / $25 / $50 / $100)

#### Ideas
- "Bet and Watch" integration — place bet and get live stream in one flow
- Cross-product parlay builder that spans pre-match + live + outrights

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — anticipation of the outcome
- CD4: Ownership & Possession — the bet is now "theirs"
- CD6: Scarcity & Impatience — wants to lock in before the line moves
- CD8: Loss & Avoidance — fear of rejection or odds changing at confirmation

#### Data Sources
- Internal: betslip open → bet placed conversion rate
- Internal: bet rejection rate (odds changed, stake limit)
- Internal: average time from betslip open to bet confirmation

---

