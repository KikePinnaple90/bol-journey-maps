# Journey: Find a Specific League Line
**id:** leagueline  
**product:** BetOnline Sportsbook  
**last_updated:** 2026-04-14  

> A punter tries to find pre-match, live, and outright markets for a specific league (e.g. NFL, Premier League) in a single session

---

## Phase: Discovery
_How does a punter become aware of and navigate to a specific league's betting content?_

### Step 1: Land on Homepage

**Persona:** Recreational Punter  
**Touchpoint:** Homepage  
**Emotion:** Neutral to slightly impatient — they know what they want and just need to find it  

The user arrives at BetOnline/sportsbook after deciding they want to bet on a specific league (e.g. World Cup). They orient themselves on the homepage.

**Player Goal:** Quickly find the league they have in mind and see available betting options  
**Business Goal:** Minimize time-to-first-bet; surface the most popular leagues prominently  
**Success Criteria:** User identifies a clear path to their target sport/league within 10 seconds  

#### Pain Points
- Homepage includes promotion; navigation to specific leagues is not available unless league is popular in mobile, not in desktop without left nav, only to specific most popular games
- No persistent "recently viewed leagues" shortcut
- Live and Pre-match are presented as separate top-level sections, creating confusion about where to start

#### Opportunities
- Offering direct league access in the home page without too many clicks in left nav

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

### Step 2: Navigate to League

**Persona:** Recreational Punter  
**Touchpoint:** Left nav / top nav Popular leagues only in mobile  
**Emotion:** Mild frustration if the list is long and with several entries for same league  

The user clicks on the sport (e.g. Football / Soccer) from the left nav or top menu. They expand the sport that lists available leagues.

**Player Goal:** Get one level closer to their target league  
**Business Goal:** Keep the funnel moving; reduce drop-off between sport and league selection  
**Success Criteria:** User finds their target league in one single entry in the list  

#### Pain Points
- League list can be very long and lacks of one single league entry
- No indication of which leagues have live games vs pre-match only vs outrights available
- No indications of where all lines for the league are available
- Sharp bettors find the navigation too slow; they prefer direct URLs or search

#### Opportunities
- Show live/pre-match/outright availability badges next to each league name
- Create a League Hub with all league related content

#### Ideas
- "Now Live" indicator on league rows
- Filter chips: Show Pre-match only / Live only / Has Outrights

#### Octalysis Drives
- CD2: Development & Accomplishment — making progress toward the bet
- CD6: Scarcity & Impatience — the game may be starting soon

#### Data Sources
- Internal: sport → league click-through rates
- Session recordings (FullStory / Hotjar): scroll depth on sport pages

---

### Step 3: Select League

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** League entry point (left nav item or top popular leaguesin mobile)  
**Emotion:** Expectation of comprehensiveness — quickly becomes frustration when they realize the view is partial  

The user clicks on their target league (e.g. NFL, Premier League). This is the critical decision point — the product currently routes them to either Pre-match OR Live, not a unified league hub. Sometimes even for same prematch league content they are multie entry points and outrights are separated

**Player Goal:** See all available betting options for this league in one place  
**Business Goal:** Route user to the highest-value market (live if game is in progress; pre-match if not)  
**Success Criteria:** User sees a complete, unified view of the league's betting landscape  

#### Pain Points
- No unified league hub — clicking a league in Pre-match takes you to pre-match only; clicking in Live takes you to live only
- Outrights are in a completely separate section, often hard to find
- Users have to navigate to 2-3 different places to get a full picture of a league's markets

#### Opportunities
- Build a unified League Hub page: tabs for Pre-match / Live / Outrights in one URL
- Deep-link league from anywhere to the hub, not to a product-specific silo

#### Ideas
- "League Hub" concept: single destination per league with product toggle
- Smart default: if a game is live, live is at the top of the game list hub; otherwise only Pre-match

#### Octalysis Drives
- CD8: Loss & Avoidance — worried they're missing markets they don't know exist
- CD6: Scarcity & Impatience — losing time navigating instead of betting

#### Data Sources
- Internal: bounce rate on league pages
- Internal: navigation paths after league click (do users bounce back and re-navigate?)

---

## Phase: Selection
_Once inside a league, how does a punter find the specific market they want and place a bet?_

### Step 4: Browse Pre-match Markets _(prematch)_

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Pre-match Sportsbook — League view  
**Emotion:** Engaged if the market offering is rich; frustrated if limited or slow to load  

The user is on the pre-match league page. They browse upcoming games and available markets.

**Player Goal:** Find the game and market they want to bet on before it starts  
**Business Goal:** Maximize pre-match handle; encourage multi-game/parlay selection  
**Success Criteria:** User finds their target game and market within 2 clicks from the league page  

#### Pain Points
- Not all the markets are available in the same left nav entry point
- Real Games are duplicated in the list
- Left nav counter doesn´t represent real games
- No way to compare lines across multiple games on one screen
- Live games that have started are not available, causing confusion

#### Opportunities
- Merge duplicated games into one single game entry
- Unified left nav entries for same leagues within a game
- Add a "Same Game Parlay" and "Odds Boosters" filtered content CTA on league view for recreational bettors

#### Ideas
- Unified all league related content in one entry point
- Prematch to live transitions

#### Octalysis Drives
- CD3: Empowerment of Creativity — building their bet strategy, comparing lines
- CD4: Ownership & Possession — selecting their picks, building their betslip
- CD2: Development & Accomplishment — feeling like a smart bettor finding value

#### Data Sources
- Internal: click-through rate from league list to game detail
- Internal: markets per game viewed before bet placement
- Navigation loops

---

### Step 5: Browse Live Markets _(live)_

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Live Betting section — League filter  
**Emotion:** High urgency — live markets move fast; every extra navigation step costs real betting opportunity  

The user is looking for in-play betting on their league. They must navigate to the separate Live Betting section and then filter by sport and find the league — there is no direct path from the league page to live markets.

**Player Goal:** Find an in-play market on a specific league's game quickly  
**Business Goal:** Capture live handle; live bettors are high-value, time-sensitive  
**Success Criteria:** User finds their live game within 15 seconds of deciding to bet live  

#### Pain Points
- No direct access from the league page to live markets for that league
- Live Betting section shows all lagues with alphabetical order — finding a relevant league requires a lot of scrolling
- Odds update speed and latency can cause selections to be rejected ("line has moved")

#### Opportunities
- Add live games link directly on the league hub to access live now content
- Persist league filter when user switches from pre-match to live

#### Ideas
- Live games are in the league hub
- Prematch to live transition in both league hub view and event view
- Leagues order by popularity in live only inside a specific sport
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

### Step 6: Find Outrights _(outrights)_

**Persona:** Sharp, Recreational Punter (seasonal)  
**Touchpoint:** Outrights / Futures section (separate from main sportsbook)  
**Emotion:** Exploratory and patient, but frustrated by the navigation break from the main league context  

The user wants to place a futures/outright bet (e.g. NFL Super Bowl winner, PL top scorer). Outrights are currently housed in a separate section with no link from the league page.

**Player Goal:** Find the best available futures market for their league and evaluate the odds  
**Business Goal:** Drive futures handle; futures bets have long lock-in periods that benefit the book  
**Success Criteria:** User finds and evaluates at least 3 outright market options for their league  

#### Pain Points
- Outrights are completely disconnected from the league page — discoverability is very low
- No cross-sell from pre-match game view to relevant outrights ("Also bet: NFL MVP Outright")
- Market availability is inconsistent — some leagues have rich futures, others have none
- In soccer Outrights are not even inside the sport tree

#### Opportunities
- Surface outright teasers on the league hub with an outright tab
- Add a cross-sell strip in game detail views linking to relevant futures

#### Ideas
- "League Futures" tab on the unified league hub
- Remove all different outrights entry points to be inside the league hun
- Add the soccer outrights into each soccer league
- Create better naming for different outrights type

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — intrigued by futures, exploring possibilities
- CD4: Ownership & Possession — wants to "own" a position on the season outcome
- CD8: Loss & Avoidance — worried they're missing better odds elsewhere or will forget

#### Data Sources
- Internal: outright section traffic and conversion rate
- Internal: bounce rate on outright listings by league

---

### Step 7: Select Bet and Add to Betslip

**Persona:** Recreational Punter, Sharp  
**Touchpoint:** Game detail / Market view → Betslip  
**Emotion:** Excitement mixed with anxiety — they want confirmation quickly  

The user has found their market and clicks an odds button to add a selection to the betslip. They may add one selection (single) or multiple (parlay/accumulator).

**Player Goal:** Get their selection on the betslip accurately and quickly, then place the bet  
**Business Goal:** Maximize bet placement completion rate; minimize betslip abandonment  
**Success Criteria:** Bet is placed successfully with correct selection and stake in under 30 seconds from betslip open  

#### Pain Points
- Betslip can be slow to update when odds change
- Parlay building across pre-match and live is not supported
- Stake entry UX on mobile is poor (keyboard obscures betslip)

#### Opportunities
- Improve live betting delay
- Push users to change their betslip accept odds preferences
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

