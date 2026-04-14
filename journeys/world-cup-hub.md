# Journey: Bet on World Cup via the League Hub
# id: world-cup-hub
# description: A punter discovers the World Cup Hub via Quick Link, browses unified Games and Futures content, views a fixture page, and places bets — including a seamless automatic transition from pre-match to live betting
# product: BetOnline Sportsbook
# last_updated: 2026-04-14

---

## Phase: Discovery
## guiding_question: How does a punter find and arrive at all World Cup betting content without navigating through deep hierarchical menus?

---

### Step 1: Access Hub via Quick Link

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)
- touchpoint: Quick Links navigation — left nav (desktop) / mobile top nav
- screenshot: screenshots/wc-step1-quicklink.png
- description: The user is on the sportsbook and sees the "World Cup 2026" Quick Link prominently displayed in the navigation with a trophy icon. A single click routes them directly to the World Cup Hub, bypassing the previous deep sport/league hierarchy entirely.
- player_goal: Reach World Cup betting content in one tap without searching through sport categories
- business_goal: Maximize World Cup Hub discovery rate; reduce navigation friction to a single click from anywhere in the sportsbook
- player_action_description: User spots the trophy icon Quick Link in the left nav and clicks it
- user_actions:
  - Sees "World Cup 2026" Quick Link with trophy icon in Quick Links section
  - Clicks Quick Link from any page in the sportsbook
  - Lands directly on World Cup Hub with session and betslip intact
- player_emotions: Confident and purposeful — World Cup is immediately visible, no hunting required
- octalysis_drives:
  - CD2: Development & Accomplishment — direct path to their goal feels like instant progress
  - CD7: Unpredictability & Curiosity — excited to see what World Cup odds are available
- success_criteria: User reaches World Cup Hub in 1 click from any page in the sportsbook
- pain_points:
  - Quick Link is feature-flagged — will not appear when flag is disabled post-tournament
  - Mobile users may need to open nav menu before Quick Link is visible
  - Quick Link position (3rd recommended) may vary by brand configuration
- opportunities:
  - Feature flag enables clean activation and deactivation without code changes
  - Quick Link with live game count badge during tournament ("3 LIVE") drives urgency
- ideas:
  - Personalized Quick Link position based on user's betting history and sport preferences
  - Animated trophy icon during group stage draw or tournament milestones
- data_sources:
  - BEAT: element_interaction (element_type: "quick_link", element_name: "World Cup 2026")
  - Mixpanel: Click-through rate from Quick Link to Hub page; Quick Link impressions vs clicks

- solved_from_previous_journey:
  - SOLVED — Discovery Problem: No longer requires navigating through generic sport/league hierarchies
  - SOLVED — Desktop Navigation Persistence: Quick Link visible from anywhere in the sportsbook

---

## Phase: Exploration
## guiding_question: Once inside the hub, how does a punter orient themselves and find the content they want to bet on?

---

### Step 2: Land on World Cup Hub

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)
- touchpoint: World Cup Hub page (/sportsbook/world-cup-hub/)
- screenshot: screenshots/wc-step2-hub.png
- description: The user arrives at the unified World Cup Hub. The page displays a header with the World Cup trophy and "World Cup Hub" title, and a tab selector showing Games, Futures, Same Game Parlays, and Odds Boosters. Games tab is active by default if fixtures are available. All World Cup content — previously fragmented across pre-match, live, and outrights — is now in a single destination.
- player_goal: Quickly understand all available World Cup betting content and decide where to go
- business_goal: Orient the user to the full betting opportunity; maximize tab exploration and time on page
- player_action_description: User scans the hub, reads tab labels, and decides whether to browse Games or Futures first
- user_actions:
  - Views hub header with World Cup trophy icon and "World Cup Hub" title
  - Sees four tabs: Games, Futures, Same Game Parlays, Odds Boosters
  - Games tab active by default if upcoming or live fixtures are available
  - Scrolls tabs to assess content options before diving in
- player_emotions: Impressed and oriented — everything World Cup in one place, clear structure, no confusion
- octalysis_drives:
  - CD2: Development & Accomplishment — feels in control with clearly organized, accessible content
  - CD4: Ownership & Possession — this is their dedicated World Cup destination
  - CD7: Unpredictability & Curiosity — curious about live odds, match listings, and futures all at once
- success_criteria: User identifies Games and Futures tabs within 5 seconds of landing and begins exploring
- pain_points:
  - Nice-to-have tabs (SGPs, Boosters) may be disabled if no content is available — can appear inconsistent
  - First-time users may not immediately understand the value of the Futures tab
  - Smart default tab logic (Games vs Futures depending on content availability) must handle edge cases
- opportunities:
  - Sticky tabs during scroll keep navigation accessible throughout long content lists
  - Smart default (Games if fixtures, Futures if pre-tournament) prevents empty state confusion
- ideas:
  - Animated LIVE badge on Games tab when matches are in progress
  - Onboarding tooltip for first-time visitors explaining Futures tab value proposition
- data_sources:
  - BEAT: page_view (page_type: "world_cup_hub", active_tab: "games")
  - Mixpanel: Bounce rate from hub; time on page; tab click distribution (Dashboard Metric #2)
- branch: games | futures

- solved_from_previous_journey:
  - SOLVED — No unified league hub: Single hub replaces three separate navigation destinations
  - SOLVED — Futures market discoverability: Equal tab prominence alongside Games section

---

### Step 3a: Browse Games Section [branch: games]

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor)
- touchpoint: World Cup Hub — Games tab
- screenshot: screenshots/wc-step3a-games.png
- description: The user browses World Cup fixtures with live matches shown first, followed by upcoming matches sorted chronologically. Each event row displays primary markets directly (2-way/3-way), plus alternative and auxiliary markets consolidated in the same row. No duplicate entries for the same fixture. SGP icon visible on eligible upcoming matches. User can bet directly from the row or tap into a full fixture page.
- player_goal: Find the right match and market quickly — no duplicate rows, no fragmented entry points
- business_goal: Maximize direct selection rate from hub; drive SGP icon engagement; capture live bets during in-progress matches
- player_action_description: User scans the fixture list, spots live matches at the top, evaluates inline markets, and either adds a selection or navigates to a fixture page
- user_actions:
  - Sees live matches first with red LIVE badge, real-time score, and live odds
  - Scrolls to upcoming fixtures sorted by kick-off time
  - Spots SGP icon on eligible upcoming matches
  - Clicks odds button directly from event row to add selection to betslip
  - OR taps event row (outside odds/SGP area) to navigate to full fixture page
  - OR clicks SGP icon to open Same Game Parlay builder
- player_emotions: Engaged and efficient — clean list, no duplicate confusion, live matches immediately visible
- octalysis_drives:
  - CD2: Development & Accomplishment — making smart choices with all data visible in one clean list
  - CD3: Empowerment of Creativity — building bet strategy using SGP icon and inline market comparison
  - CD4: Ownership & Possession — adding selections and building betslip feels like claiming a position
  - CD6: Scarcity & Impatience — live game is in progress; must decide and bet before odds move
- success_criteria: User adds a selection or navigates to fixture page within 3 clicks of arriving at Games tab
- pain_points:
  - Dense fixture list during group stage (48 matches) may require extensive scrolling without round filters
  - Alternative market labels (e.g., "Spread 1.5", "Total 2.5") may confuse casual bettors
  - Odds suspension during live events temporarily blocks selections — users see grey buttons with no clear explanation
- opportunities:
  - Group stage round filter ("Round 1", "Round of 16") reduces scrolling in dense fixture lists
  - Tooltip or label on alternative market columns for casual bettor comprehension
- ideas:
  - Live match count badge on Games tab showing number of in-progress matches
  - Group Stage quick-filter chips to jump between tournament rounds
- data_sources:
  - BEAT: selection_added (bet_context: "hub_games_section")
  - BEAT: element_interaction (element_type: "event_card", element_name: fixture name)
  - BEAT: sgp_builder_opened (from hub Games section)
  - Mixpanel: Hub view → Selection added conversion rate; SGP Conversion Rate (Dashboard Metric #4, #7a)

- solved_from_previous_journey:
  - SOLVED — Live matches separated from upcoming: Live-first sorting in unified Games section
  - SOLVED — Real Games duplicated in list: Single entry per fixture with alternative markets consolidated inline
  - SOLVED — Left nav counter does not represent real games: Hub fixture count is accurate and deduplicated
  - SOLVED — Not all markets available in same left nav entry point: All markets accessible from one event row

---

### Step 3b: Browse Futures Section [branch: futures]

- persona: Alex (World Cup Opportunist — tournament winner bet), Maria (Soccer-First Bettor — top scorer, group winners)
- touchpoint: World Cup Hub — Futures tab
- screenshot: screenshots/wc-step3b-futures.png
- description: The user clicks the Futures tab to explore long-term tournament betting markets. Markets are organized by group (Tournament Winner, Top Goalscorer, Group Winners, To Reach Final, etc.) with "All" selected by default. Selection lists with 20+ options use expandable "Show More" to keep the view clean. Deep-link URLs with ?group= parameter allow direct access to specific markets via bookmarks or shared links.
- player_goal: Evaluate futures markets for the tournament in an organized, dedicated space — not buried in a generic nav hierarchy
- business_goal: Drive high-margin futures handle; capture early-tournament revenue before odds compress; establish futures as a first-class product
- player_action_description: User clicks Futures tab, scans market groups, selects a filter group, expands a market, and adds a futures selection to betslip
- user_actions:
  - Clicks Futures tab from Hub
  - Sees "All" group selected by default with all futures markets in backoffice-defined order
  - Clicks a group filter (e.g., "Tournament Winner") to narrow view
  - Expands collapsible market with 20+ selections using "Show More"
  - Checks market info icon (e.g., "Must play for action")
  - Clicks odds button (e.g., "Brazil +400") to add to betslip
- player_emotions: Exploratory and strategic — feels like a dedicated futures destination, not a buried afterthought
- octalysis_drives:
  - CD4: Ownership & Possession — wants to claim a long-term position on the tournament outcome
  - CD7: Unpredictability & Curiosity — intrigued by exploring all futures possibilities in one organized place
  - CD2: Development & Accomplishment — feels like a smart bettor capturing early value before odds shorten
  - CD8: Loss & Avoidance — fears missing favorable odds before they compress as tournament approaches
- success_criteria: User finds and evaluates at least 2 futures markets within 60 seconds of clicking Futures tab
- pain_points:
  - Tournament Winner market with 32 teams is long even with Show More
  - Futures cannot be combined with fixture lines in parlays — may surprise users who try
  - Market info icon (must play for action rules) is easy to miss for casual bettors
- opportunities:
  - Group filter chips enable instant navigation to preferred futures category
  - Deep-link URL (?group=tournament-winner) enables sharing specific markets via social or email
- ideas:
  - "Line Movement" indicator showing whether odds have moved up or down in last 24 hours
  - Favorites save button to bookmark futures selections for later comparison
- data_sources:
  - BEAT: page_view (page_type: "world_cup_hub", active_tab: "futures")
  - BEAT: selection_added (is_outright: true, league: "fifa-world-cup-2026")
  - Mixpanel: Futures Handle Share (KR2.2); Futures tab views / total hub views (Dashboard Metric #2)

- solved_from_previous_journey:
  - SOLVED — Outrights completely disconnected from league page: Futures tab has equal prominence with Games in the hub
  - SOLVED — In soccer, Outrights not even inside the sport tree: Futures is a first-class tab on the hub
  - SOLVED — No cross-sell from pre-match game view to relevant outrights: Hub structure enables natural flow between Games and Futures tabs

---

## Phase: Bet Placement & Live Engagement
## guiding_question: How does a punter move from browsing to placing a bet, and stay engaged when a match goes live?

---

### Step 4: View Fixture Page

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor)
- touchpoint: Fixture Specific Page — upcoming or live (/sportsbook/.../fixture/ID)
- screenshot: screenshots/wc-step4-fixture.png
- description: User taps an event row from the Games section and lands on the Fixture Specific Page for a specific match. The page displays all markets organized in groups (All Markets, Parlay Builder), supports the SGP iFrame builder, and shows alternative/auxiliary markets within the standard template. Breadcrumb routes back to /sportsbook/world-cup-hub/ — not the generic league path — keeping the user in the hub context.
- player_goal: See the full market depth for a specific match and build the best possible bet
- business_goal: Maximize market selection depth per session; drive SGP adoption; keep users in hub context via breadcrumb
- player_action_description: User browses market groups, adds selections to betslip, and optionally opens Parlay Builder for SGP
- user_actions:
  - Clicks event row from Hub Games section
  - Lands on fixture page with breadcrumb showing "World Cup Hub" (routes back to hub)
  - Browses All Markets tab (Main, Goalscorer, Totals, etc.)
  - Clicks odds button to add selection to betslip
  - OR clicks Parlay Builder tab and scrolls to SGP iFrame to build a Same Game Parlay
  - Taps breadcrumb to return to hub with session intact
- player_emotions: Focused and in control — full market depth available, clear breadcrumb back to hub, SGP easily accessible
- octalysis_drives:
  - CD3: Empowerment of Creativity — building complex bets from full market depth feels strategic
  - CD4: Ownership & Possession — building their personal bet strategy selection by selection
  - CD6: Scarcity & Impatience — live markets moving; must decide before odds shift
  - CD2: Development & Accomplishment — navigating all markets feels like expert behavior
- success_criteria: User adds at least one selection or opens Parlay Builder within 2 minutes of landing on fixture page
- pain_points:
  - Dense market list on mobile requires extensive scrolling; no jump-to-section nav
  - SGP available only for upcoming fixtures — live fixture Parlay Builder tab not supported in initial release
  - Second half markets (half-time feature) are nice-to-have and not guaranteed in first release
- opportunities:
  - Breadcrumb routing to World Cup Hub (vs generic league page) keeps user in hub funnel
  - Parlay Builder tab placement makes SGP discoverable without requiring SGP icon knowledge
- ideas:
  - Market group sticky side-nav or jump links for long market lists on mobile
  - "Popular bets for this match" section surfacing most-selected markets by other users
- data_sources:
  - BEAT: page_view (page_type: "fixture_page_upcoming" or "fixture_page_live", fixture_id, fixture_name)
  - BEAT: sgp_builder_opened (fixture_id, fixture_name)
  - Mixpanel: Hub → Fixture → Selection → Bet placement funnel (Dashboard Metric #7a)

---

### Step 5: Live Transition — Upcoming to Live

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor)
- touchpoint: Fixture Specific Page — automatic redirect from upcoming to live
- screenshot: screenshots/wc-step5-transition.png
- description: While browsing an upcoming fixture page, the match kicks off. The system detects the status change within 5 seconds, fires the upcoming_live_redirection tracking event, and displays a live availability notification with a CTA. User clicks the CTA and lands on the live fixture page with LIVE badge, real-time score, and live markets — session, balance, and betslip fully preserved. No manual searching required.
- player_goal: Continue betting on the match seamlessly the moment it goes live — without losing context or betslip
- business_goal: Capture live betting engagement at kickoff — the highest-value betting moment; measure KR3.1 Live Engagement Rate
- player_action_description: User sees the transition notification, clicks the CTA, and continues betting on live markets without friction
- user_actions:
  - Was browsing upcoming fixture page before kickoff
  - System detects match start within 5 seconds; displays live availability notification
  - User clicks "OK, Got It" CTA
  - Lands on live fixture page with LIVE badge, current score 0-0, and live markets
  - Continues placing bets without searching for the live match
- player_emotions: Seamlessly engaged — zero friction, arrives on live page with betslip intact and ready to bet immediately
- octalysis_drives:
  - CD6: Scarcity & Impatience — live odds are moving right now; the betting window is open
  - CD7: Unpredictability & Curiosity — in-play moment is thrilling; what happens on the first goal?
  - CD8: Loss & Avoidance — without the redirect would have missed the live betting window entirely
  - CD2: Development & Accomplishment — feels in control; didn't miss the live opportunity
- success_criteria: User arrives on live page within 5 seconds of kickoff; betslip preserved; user adds live selection within 5 minutes (KR3.1 target)
- pain_points:
  - If live fixture ID mapping is unavailable, fallback message routes user to hub Games section — 1-2 extra clicks
  - Pre-match betslip selections placed after wager cutoff will fail — user needs clear error message
  - 5-second detection window means brief delay between real kickoff and notification appearance
- opportunities:
  - upcoming_live_redirection tracking event enables direct OKR measurement (KR3.1)
  - "About to start" pre-warning at 5 minutes to kickoff reduces surprise when redirect fires
- ideas:
  - Countdown timer on upcoming fixture page for final minutes before kickoff
  - Pre-fill stake amount after redirect so user can place live bet with one tap
- data_sources:
  - BEAT: upcoming_live_redirection (fixture_id, live_fixture_id, fixture_name, current_url, redirection_url)
  - BEAT: selection_added within 5 min of redirection event (defines KR3.1 engaged cohort)
  - Mixpanel: Live Transition Conversion Rate (Dashboard Metric #5); KR3.1 Live Engagement Rate

- solved_from_previous_journey:
  - SOLVED — No direct link from league page to live markets for that league: Automatic redirect eliminates this entirely
  - SOLVED — Every extra navigation step costs a live betting opportunity: System handles the transition with zero user action required

---

### Step 6: Place Bet via Betslip

- persona: Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)
- touchpoint: Betslip — persistent component across all hub pages and fixture pages
- screenshot: screenshots/wc-step6-betslip.png
- description: User has added selections from Hub Games, Futures, and/or Fixture Pages. The betslip automatically determines bet type (Straight, Parlay, Live Parlay, SGP, Combo SGP), calculates potential payout dynamically, and enables placement. All selections persist across navigation within the hub. After placement, bet appears in Bet History under Pending Bets.
- player_goal: Place their chosen bet accurately and quickly — correct selections, correct stake, zero rejections
- business_goal: Maximize bet placement completion rate; drive multi-leg adoption (SGP, Parlay, Combo SGP); measure KR3.2 Acceptance Rate
- player_action_description: User reviews betslip, enters stake, confirms bet, and receives placement confirmation — then checks Bet History
- user_actions:
  - Reviews betslip selections (selection name, match, odds, bet type)
  - Notes automatic bet type assignment (e.g., Straight → Parlay when 2nd selection added)
  - Enters stake amount
  - Reviews potential payout
  - Clicks "Place Bet"
  - Receives confirmation; bet appears in Bet History → Pending Bets
- player_emotions: Excited and decisive — clear payout display, intuitive stake entry, and fast confirmation
- octalysis_drives:
  - CD7: Unpredictability & Curiosity — anticipation of match outcome starts the moment bet is placed
  - CD4: Ownership & Possession — the bet is now officially theirs; they have a stake in the tournament
  - CD6: Scarcity & Impatience — wants to lock in before live odds move further
  - CD8: Loss & Avoidance — fear of rejection or odds change at the confirmation moment
  - CD2: Development & Accomplishment — placing the bet is the completed goal of the entire journey
- success_criteria: Bet placed successfully within 30 seconds of betslip open; acceptance rate at or above 90% (KR3.2)
- pain_points:
  - Odds changes between selection and placement cause rejection — users must re-accept new odds
  - Mobile keyboard obscures betslip stake input on small screens
  - Futures cannot be combined with fixture selections in parlays — users who try receive unhelpful error
  - Live bet placement speed is sensitive to network latency; mobile 4G users may experience rejections
- opportunities:
  - Real-time odds change indicator in betslip before placement reduces surprise rejections
  - Quick-stake buttons ($10/$25/$50/$100) eliminate mobile keyboard friction
  - "Accept Odds Changes" preference setting reduces rejection rate and improves KR3.2
- ideas:
  - Instant bet confirmation animation reinforces placement success moment
  - Post-placement CTA linking directly to live match tracker for the bet just placed
- data_sources:
  - BEAT: bet_placement_selection (bet_type, stake_amount, status, league, is_outright)
  - BEAT: bet_placed (bet_id, num_selections, bet_type, stake_amount)
  - Mixpanel: Hub Conversion Rate (KR1.2); Bet Acceptance Rate (KR3.2); Bet Type Distribution (Dashboard #6); SGP Adoption Rate (KR2.1)

- solved_from_previous_journey:
  - PARTIALLY SOLVED — Betslip slow to update in live betting: Live betting delay improvement in scope (NFR-04: real-time updates within 1 second)
  - PARTIALLY SOLVED — Parlay building across pre-match and live not supported: SGP and Combo SGP now supported; pre-match + live cross-product parlay remains a platform limitation
