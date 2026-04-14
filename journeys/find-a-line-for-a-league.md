# Journey: Find a Specific League Line
# id: leagueline
# description: A punter tries to find pre-match, live, and outright markets for a specific league (e.g. NFL, Premier League) in a single session
# product: BetOnline Sportsbook
# last_updated: 2026-04-14

---

## Phase: Discovery
## guiding_question: How does a punter become aware of and navigate to a specific league's betting content?

---

### Step 1: Land on Homepage

- persona: Recreational Punter
- touchpoint: Homepage
- screenshot: screenshots/find-a-line-for-a-league-step1-homepage.png
- description: The user arrives at BetOnline/sportsbook after deciding they want to bet on a specific league (e.g. World Cup). They orient themselves on the homepage.
- player_goal: Quickly find the league they have in mind and see available betting options
- business_goal: Minimize time-to-first-bet; surface the most popular leagues prominently
- player_action_description: The user physically lands on the homepage and scans the layout for navigation cues
- user_actions:
  - Scans left navigation or most popular leagues
  - Looks for sport/league 
- player_emotions: Neutral to slightly impatient — they know what they want and just need to find it
- octalysis_drives:
  - CD2: Development & Accomplishment — motivated to find and place their bet
  - CD7: Unpredictability & Curiosity — curious what the current lines look like
- success_criteria: User identifies a clear path to their target sport/league within 10 seconds
- pain_points:
  - Homepage includes promotion; navigation to specific leagues is not available unless league is popular in mobile, not in desktop without left nav, only to specific most popular games
  - No persistent "recently viewed leagues" shortcut
  - Live and Pre-match are presented as separate top-level sections, creating confusion about where to start
- opportunities:
  - Offering direct league access in the home page without too many clicks in left nav
- ideas:
  - Personalized league shortcuts based on bet history
  - Smart banner that detects live games in the user's preferred leagues
- data_sources:
  - Google Analytics: homepage scroll depth, click heatmaps
  - Internal: most-clicked sports/leagues from homepage sessions

---

### Step 2: Navigate to League

- persona: Recreational Punter
- touchpoint: Left nav / top nav Popular leagues only in mobile
- screenshot: screenshots/step2-sport-nav.png
- description: The user clicks on the sport (e.g. Football / Soccer) from the left nav or top menu. They expand the sport that lists available leagues.
- player_goal: Get one level closer to their target league
- business_goal: Keep the funnel moving; reduce drop-off between sport and league selection
- player_action_description: The user clicks a sport category and scans the resulting league list
- user_actions:
  - Clicks sport in left navigation
  - Scans league list 
  - May scroll extensively if the league list is long
- player_emotions: Mild frustration if the list is long and with several entries for same league
- octalysis_drives:
  - CD2: Development & Accomplishment — making progress toward the bet
  - CD6: Scarcity & Impatience — the game may be starting soon
- success_criteria: User finds their target league in one single entry in the list
- pain_points:
  - League list can be very long and lacks of one single league entry
  - No indication of which leagues have live games vs pre-match only vs outrights available
  - No indications of where all lines for the league are available
  - Sharp bettors find the navigation too slow; they prefer direct URLs or search
- opportunities:
  - Show live/pre-match/outright availability badges next to each league name
  - Create a League Hub with all league related content
- ideas:
  - "Now Live" indicator on league rows
  - Filter chips: Show Pre-match only / Live only / Has Outrights
- data_sources:
  - Internal: sport → league click-through rates
  - Session recordings (FullStory / Hotjar): scroll depth on sport pages

---

### Step 3: Select League

- persona: Recreational Punter, Sharp
- touchpoint: League entry point (left nav item or top popular leaguesin mobile)
- screenshot: screenshots/step3-league-select.png
- description: The user clicks on their target league (e.g. NFL, Premier League). This is the critical decision point — the product currently routes them to either Pre-match OR Live, not a unified league hub. Sometimes even for same prematch league content they are multie entry points and outrights are separated
- player_goal: See all available betting options for this league in one place
- business_goal: Route user to the highest-value market (live if game is in progress; pre-match if not)
- player_action_description: The user clicks the league name expecting to see all markets for that league
- user_actions:
  - Clicks league name
  - Expects to land on a page showing upcoming games, live games, and outrights
- player_emotions: Expectation of comprehensiveness — quickly becomes frustration when they realize the view is partial
- octalysis_drives:
  - CD8: Loss & Avoidance — worried they're missing markets they don't know exist
  - CD6: Scarcity & Impatience — losing time navigating instead of betting
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
  - Smart default: if a game is live, live is at the top of the game list hub; otherwise only Pre-match
- data_sources:
  - Internal: bounce rate on league pages
  - Internal: navigation paths after league click (do users bounce back and re-navigate?)
- branch: prematch | live | outrights

---

## Phase: Selection

## guiding_question: Once inside a league, how does a punter find the specific market they want and place a bet?

---

### Step 4a: Browse Pre-match Markets [branch: prematch]

- persona: Recreational Punter, Sharp
- touchpoint: Pre-match Sportsbook — League view
- screenshots:
  - screenshots/step3-league-select.png
  - screenshots/step4a-prematch.png
- description: The user is on the pre-match league page. They browse upcoming games and available markets.
- player_goal: Find the game and market they want to bet on before it starts
- business_goal: Maximize pre-match handle; encourage multi-game/parlay selection
- player_action_description: The user scans game rows, scroll right to see more markets, and evaluates lines
- user_actions:
  - Scans list of upcoming games sorted by date/time
  - Clicks into a game to see full market offering
  - Compares lines across games (e.g. spreads, totals, moneylines)
- player_emotions: Engaged if the market offering is rich; frustrated if limited or slow to load
- octalysis_drives:
  - CD3: Empowerment of Creativity — building their bet strategy, comparing lines
  - CD4: Ownership & Possession — selecting their picks, building their betslip
  - CD2: Development & Accomplishment — feeling like a smart bettor finding value
- success_criteria: User finds their target game and market within 2 clicks from the league page
- pain_points:
  - Not all the markets are available in the same left nav entry point
  - Real Games are duplicated in the list
  - Left nav counter doesn´t represent real games
  - No way to compare lines across multiple games on one screen
  - Live games that have started are not available, causing confusion
- opportunities:
  - Merge duplicated games into one single game entry
  - Unified left nav entries for same leagues within a game
  - Add a "Same Game Parlay" and "Odds Boosters" filtered content CTA on league view for recreational bettors
- ideas:
  - Unified all league related content in one entry point
  - Prematch to live transitions
- data_sources:
  - Internal: click-through rate from league list to game detail
  - Internal: markets per game viewed before bet placement
  - Navigation loops

---

### Step 4b: Browse Live Markets [branch: live]

- persona: Recreational Punter, Sharp
- touchpoint: Live Betting section — League filter
- screenshot: screenshots/step4b-live.png
- description: The user is looking for in-play betting on their league. They must navigate to the separate Live Betting section and then filter by sport and find the league — there is no direct path from the league page to live markets.
- player_goal: Find an in-play market on a specific league's game quickly
- business_goal: Capture live handle; live bettors are high-value, time-sensitive
- player_action_description: The user navigates to Live Betting, scans active games, and filters or scrolls to find their league
- user_actions:
  - Navigates to Live Betting (separate top-level section)
  - Scans all live games across all sports
  - Filters or scrolls to find their target league
  - Clicks into a game to see live markets
- player_emotions: High urgency — live markets move fast; every extra navigation step costs real betting opportunity
- octalysis_drives:
  - CD6: Scarcity & Impatience — the live moment is passing, odds are moving
  - CD8: Loss & Avoidance — fear of missing the bet window or getting a stale price
  - CD7: Unpredictability & Curiosity — the in-play moment is exciting but fleeting
- success_criteria: User finds their live game within 15 seconds of deciding to bet live
- pain_points:
  - No direct access from the league page to live markets for that league
  - Live Betting section shows all lagues with alphabetical order — finding a relevant league requires a lot of scrolling
  - Odds update speed and latency can cause selections to be rejected ("line has moved")
- opportunities:
  - Add live games link directly on the league hub to access live now content 
  - Persist league filter when user switches from pre-match to live
- ideas:
  - Live games are in the league hub
  - Prematch to live transition in both league hub view and event view
  - Leagues order by popularity in live only inside a specific sport
  - Push notification or on-site alert when a followed league goes live
- data_sources:
  - Internal: live bet acceptance rate (rejection due to line movement)
  - Internal: navigation path from pre-match league page → live section
  - Internal: time-to-first-live-bet per session

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
  - Navigates to Outrights/Futures (separated sections)
  - Browser different outright types for the league
  - Browses market list (winner, top scorer, relegation, etc.)
  - Evaluates multiple outcomes before selecting
- player_emotions: Exploratory and patient, but frustrated by the navigation break from the main league context
- octalysis_drives:
  - CD7: Unpredictability & Curiosity — intrigued by futures, exploring possibilities
  - CD4: Ownership & Possession — wants to "own" a position on the season outcome
  - CD8: Loss & Avoidance — worried they're missing better odds elsewhere or will forget
- success_criteria: User finds and evaluates at least 3 outright market options for their league
- pain_points:
  - Outrights are completely disconnected from the league page — discoverability is very low
  - No cross-sell from pre-match game view to relevant outrights ("Also bet: NFL MVP Outright")
  - Market availability is inconsistent — some leagues have rich futures, others have none
  - In soccer Outrights are not even inside the sport tree
- opportunities:
  - Surface outright teasers on the league hub with an outright tab
  - Add a cross-sell strip in game detail views linking to relevant futures
- ideas:
  - "League Futures" tab on the unified league hub
  - Remove all different outrights entry points to be inside the league hun
  - Add the soccer outrights into each soccer league 
  - Create better naming for different outrights type
- data_sources:
  - Internal: outright section traffic and conversion rate
  - Internal: bounce rate on outright listings by league

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
- octalysis_drives:
  - CD7: Unpredictability & Curiosity — anticipation of the outcome
  - CD4: Ownership & Possession — the bet is now "theirs"
  - CD6: Scarcity & Impatience — wants to lock in before the line moves
  - CD8: Loss & Avoidance — fear of rejection or odds changing at confirmation
- success_criteria: Bet is placed successfully with correct selection and stake in under 30 seconds from betslip open
- pain_points:
  - Betslip can be slow to update when odds change
  - Parlay building across pre-match and live is not supported
  - Stake entry UX on mobile is poor (keyboard obscures betslip)
- opportunities:
  - Improve live betting delay
  - Push users to change their betslip accept odds preferences
  - Enable quick-stake buttons (e.g. $10 / $25 / $50 / $100)
- ideas:
  - "Bet and Watch" integration — place bet and get live stream in one flow
  - Cross-product parlay builder that spans pre-match + live + outrights
- data_sources:
  - Internal: betslip open → bet placed conversion rate
  - Internal: bet rejection rate (odds changed, stake limit)
  - Internal: average time from betslip open to bet confirmation
