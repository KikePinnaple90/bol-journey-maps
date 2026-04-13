# Journey: Find a Specific League Line
# id: leagueline
# description: A punter tries to find pre-match, live, and outright markets for a specific league (e.g. NFL, Premier League) in a single session
# product: BetOnline Sportsbook
# last_updated: 2026-04-13

---

## Phase: Discovery
## guiding_question: How does a punter become aware of and navigate to a specific league's betting content?

---

### Step 1: Land on Homepage

- persona: Recreational Punter
- touchpoint: Homepage
- screenshot: screenshots/step1-homepage.png
- description: The user arrives at BetOnline after deciding they want to bet on a specific league (e.g. NFL). They orient themselves on the homepage.
- player_goal: Quickly find the league they have in mind and see available betting options
- business_goal: Minimize time-to-first-bet; surface the most popular leagues prominently
- player_action_description: The user physically lands on the homepage and scans the layout for navigation cues
- user_actions:
  - Scans header navigation
  - Looks for sport/league shortcuts or featured banners
  - May use search if visible
- player_emotions: Neutral to slightly impatient — they know what they want and just need to find it
- success_criteria: User identifies a clear path to their target sport/league within 10 seconds
- pain_points:
  - Homepage is often promotion-heavy; navigation to specific leagues is buried
  - No persistent "recently viewed leagues" shortcut
  - Live and Pre-match are presented as separate top-level sections, creating confusion about where to start
- opportunities:
  - Surface top leagues directly on the homepage hero area
  - Add a "My Leagues" quick-access widget for returning users
- ideas:
  - Personalized league shortcuts based on bet history
  - Smart banner that detects live games in the user's preferred leagues
- data_sources:
  - Google Analytics: homepage scroll depth, click heatmaps
  - Internal: most-clicked sports/leagues from homepage sessions
- emotion_score: 6

---

### Step 2: Navigate to Sport

- persona: Recreational Punter
- touchpoint: Left nav / Sport landing page
- screenshot: screenshots/step2-sport-nav.png
- description: The user clicks on the sport (e.g. Football / Soccer) from the left nav or top menu. They land on a sport-level page that lists available leagues.
- player_goal: Get one level closer to their target league
- business_goal: Keep the funnel moving; reduce drop-off between sport and league selection
- player_action_description: The user clicks a sport category and scans the resulting league list
- user_actions:
  - Clicks sport in left navigation
  - Scans league list (alphabetical or by popularity)
  - May scroll extensively if the league list is long
- player_emotions: Mild frustration if the list is long and unfiltered
- success_criteria: User finds their target league in the list without scrolling more than one screen
- pain_points:
  - League list can be very long and lacks filtering or pinning
  - No indication of which leagues have live games vs pre-match only vs outrights available
  - Sharp bettors find the navigation too slow; they prefer direct URLs or search
- opportunities:
  - Show live/pre-match/outright availability badges next to each league name
  - Allow users to pin favorite leagues to the top
- ideas:
  - "Now Live" indicator on league rows
  - Filter chips: Show Pre-match only / Live only / Has Outrights
- data_sources:
  - Internal: sport → league click-through rates
  - Session recordings (FullStory / Hotjar): scroll depth on sport pages
- emotion_score: 5

---

### Step 3: Select League

- persona: Recreational Punter, Sharp
- touchpoint: League entry point (left nav item or sport page card)
- screenshot: screenshots/step3-league-select.png
- description: The user clicks on their target league (e.g. NFL, Premier League). This is the critical decision point — the product currently routes them to either Pre-match OR Live, not a unified league hub.
- player_goal: See all available betting options for this league in one place
- business_goal: Route user to the highest-value market (live if game is in progress; pre-match if not)
- player_action_description: The user clicks the league name expecting to see all markets for that league
- user_actions:
  - Clicks league name
  - Expects to land on a page showing upcoming games, live games, and outrights
- player_emotions: Expectation of comprehensiveness — quickly becomes frustration when they realize the view is partial
- success_criteria: User sees a complete, unified view of the league's betting landscape
- pain_points:
  - No unified league hub — clicking a league in Pre-match takes you to pre-match only; clicking in Live takes you to live only
  - Outrights are in a completely separate section, often hard to find
  - Users have to navigate to 2-3 different places to get a full picture of a league's markets
- opportunities:
  - Build a unified League Hub page: tabs for Pre-match / Live / Outrights in one URL
  - Deep-link league from anywhere to the hub, not to a product-specific silo
- ideas:
  - "League Hub" concept: single destination per league with product toggle
  - Smart default: if a game is live, default to Live tab; otherwise Pre-match
- data_sources:
  - Internal: bounce rate on league pages
  - Internal: navigation paths after league click (do users bounce back and re-navigate?)
- emotion_score: 4
- branch: prematch | live | outrights

---

## Phase: Selection

## guiding_question: Once inside a league, how does a punter find the specific market they want and place a bet?

---

### Step 4a: Browse Pre-match Markets [branch: prematch]

- persona: Recreational Punter, Sharp
- touchpoint: Pre-match Sportsbook — League view
- screenshot: screenshots/step4a-prematch.png
- description: The user is on the pre-match league page. They browse upcoming games and available markets.
- player_goal: Find the game and market they want to bet on before it starts
- business_goal: Maximize pre-match handle; encourage multi-game/parlay selection
- player_action_description: The user scans game cards, expands markets, and evaluates lines
- user_actions:
  - Scans list of upcoming games sorted by date/time
  - Clicks into a game to see full market offering
  - Compares lines across games (e.g. spreads, totals, moneylines)
- player_emotions: Engaged if the market offering is rich; frustrated if limited or slow to load
- success_criteria: User finds their target game and market within 2 clicks from the league page
- pain_points:
  - Market depth varies significantly by league/game — unclear before clicking in
  - No way to compare lines across multiple games on one screen
  - Live games that have started are still listed in pre-match, causing confusion
- opportunities:
  - Show market count per game on the league list view
  - Add a "Same Game Parlay" CTA on league view for recreational bettors
- ideas:
  - Odds comparison strip on league view (show spread + total + ML in one row)
  - Auto-remove started games from pre-match view or flag them clearly
- data_sources:
  - Internal: click-through rate from league list to game detail
  - Internal: markets per game viewed before bet placement
- emotion_score: 6

---

### Step 4b: Browse Live Markets [branch: live]

- persona: Recreational Punter, Sharp
- touchpoint: Live Betting section — League filter
- screenshot: screenshots/step4b-live.png
- description: The user is looking for in-play betting on their league. They must navigate to the separate Live Betting section and then filter by league — there is no direct path from the league page to live markets.
- player_goal: Find an in-play market on a specific league's game quickly
- business_goal: Capture live handle; live bettors are high-value, time-sensitive
- player_action_description: The user navigates to Live Betting, scans active games, and filters or scrolls to find their league
- user_actions:
  - Navigates to Live Betting (separate top-level section)
  - Scans all live games across all sports
  - Filters or scrolls to find their target league
  - Clicks into a game to see live markets
- player_emotions: High urgency — live markets move fast; every extra navigation step costs real betting opportunity
- success_criteria: User finds their live game within 15 seconds of deciding to bet live
- pain_points:
  - No direct link from the league page to live markets for that league
  - Live Betting section shows all sports mixed together — finding a specific league requires filtering
  - Odds update speed and latency can cause selections to be rejected ("line has moved")
- opportunities:
  - Add "X games live now" link directly on the league hub to jump to live view
  - Persist league filter when user switches from pre-match to live context
- ideas:
  - Live scoreboard widget embedded on the league hub
  - Push notification or on-site alert when a followed league goes live
- data_sources:
  - Internal: live bet acceptance rate (rejection due to line movement)
  - Internal: navigation path from pre-match league page → live section
  - Internal: time-to-first-live-bet per session
- emotion_score: 3

---

### Step 4c: Find Outrights [branch: outrights]

- persona: Sharp, Recreational Punter (seasonal)
- touchpoint: Outrights / Futures section (separate from main sportsbook)
- screenshot: screenshots/step4c-outrights.png
- description: The user wants to place a futures/outright bet (e.g. NFL Super Bowl winner, PL top scorer). Outrights are currently housed in a separate section with no link from the league page.
- player_goal: Find the best available futures market for their league and evaluate the odds
- business_goal: Drive futures handle; futures bets have long lock-in periods that benefit the book
- player_action_description: The user navigates to a separate Outrights section, browses available markets, and evaluates futures odds
- user_actions:
  - Navigates to Outrights/Futures (separate section)
  - Browses market list (winner, top scorer, relegation, etc.)
  - Evaluates multiple outcomes before selecting
- player_emotions: Exploratory and patient, but frustrated by the navigation break from the main league context
- success_criteria: User finds and evaluates at least 3 outright market options for their league
- pain_points:
  - Outrights are completely disconnected from the league page — discoverability is very low
  - No cross-sell from pre-match game view to relevant outrights ("Also bet: NFL MVP Outright")
  - Market availability is inconsistent — some leagues have rich futures, others have none
- opportunities:
  - Surface outright teasers on the league hub ("4 outrights available — view all")
  - Add a cross-sell strip in game detail views linking to relevant futures
- ideas:
  - "League Futures" card on the unified league hub
  - Outright odds movement tracker (shows line movement over time)
- data_sources:
  - Internal: outright section traffic and conversion rate
  - Internal: bounce rate on outright listings by league
- emotion_score: 5

---

### Step 5: Select Bet and Add to Betslip

- persona: Recreational Punter, Sharp
- touchpoint: Game detail / Market view → Betslip
- screenshot: screenshots/step5-betslip.png
- description: The user has found their market and clicks an odds button to add a selection to the betslip. They may add one selection (single) or multiple (parlay/accumulator).
- player_goal: Get their selection on the betslip accurately and quickly, then place the bet
- business_goal: Maximize bet placement completion rate; minimize betslip abandonment
- player_action_description: The user clicks an odds button, reviews the betslip, enters a stake, and confirms the bet
- user_actions:
  - Clicks odds button to add selection
  - Reviews betslip (selection, odds, potential return)
  - Enters stake amount
  - Confirms bet placement
- player_emotions: Excitement mixed with anxiety — they want confirmation quickly
- success_criteria: Bet is placed successfully with correct selection and stake in under 30 seconds from betslip open
- pain_points:
  - Betslip can be slow to update when odds change
  - Parlay building across pre-match and live is not supported or is clunky
  - Stake entry UX on mobile is poor (keyboard obscures betslip)
- opportunities:
  - Show real-time odds change indicator on betslip before placement
  - Enable quick-stake buttons (e.g. $10 / $25 / $50 / $100)
- ideas:
  - "Bet and Watch" integration — place bet and get live stream in one flow
  - Cross-product parlay builder that spans pre-match + live + outrights
- data_sources:
  - Internal: betslip open → bet placed conversion rate
  - Internal: bet rejection rate (odds changed, stake limit)
  - Internal: average time from betslip open to bet confirmation
- emotion_score: 7
