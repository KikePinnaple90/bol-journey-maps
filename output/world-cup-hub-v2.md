# Journey: Bet on World Cup via the League Hub
**id:** world-cup-hub  
**product:** BetOnline Sportsbook  
**last_updated:** 2026-04-14  

> A punter discovers the World Cup Hub via Quick Link, browses unified Games and Futures content, views a fixture page, and places bets — including a seamless automatic transition from pre-match to live betting

---

## Phase: Discovery
_How does a punter find and arrive at all World Cup betting content without navigating through deep hierarchical menus?_

### Step 1: Access Hub via Quick Link

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)  
**Touchpoint:** Quick Links navigation — left nav (desktop) / mobile top nav  
**Emotion:** Confident and purposeful — World Cup is immediately visible, no hunting required  

The user is on the sportsbook and sees the "World Cup 2026" Quick Link prominently displayed in the navigation with a trophy icon. A single click routes them directly to the World Cup Hub, bypassing the previous deep sport/league hierarchy entirely.

**Player Goal:** Reach World Cup betting content in one tap without searching through sport categories  
**Business Goal:** Maximize World Cup Hub discovery rate; reduce navigation friction to a single click from anywhere in the sportsbook  
**Success Criteria:** User reaches World Cup Hub in 1 click from any page in the sportsbook  

#### Pain Points
- Quick Link is feature-flagged — will not appear when flag is disabled post-tournament
- Mobile users may need to open nav menu before Quick Link is visible
- Quick Link position (3rd recommended) may vary by brand configuration

#### Opportunities
- Feature flag enables clean activation and deactivation without code changes
- Quick Link with live game count badge during tournament ("3 LIVE") drives urgency

#### Ideas
- Personalized Quick Link position based on user's betting history and sport preferences
- Animated trophy icon during group stage draw or tournament milestones

#### Octalysis Drives
- CD2: Development & Accomplishment — direct path to their goal feels like instant progress
- CD7: Unpredictability & Curiosity — excited to see what World Cup odds are available

#### Data Sources
- BEAT: element_interaction (element_type: "quick_link", element_name: "World Cup 2026")
- Mixpanel: Click-through rate from Quick Link to Hub page; Quick Link impressions vs clicks

---

## Phase: Exploration
_Once inside the hub, how does a punter orient themselves and find the content they want to bet on?_

### Step 2: Land on World Cup Hub

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)  
**Touchpoint:** World Cup Hub page (/sportsbook/world-cup-hub/)  
**Emotion:** Impressed and oriented — everything World Cup in one place, clear structure, no confusion  

The user arrives at the unified World Cup Hub. The page displays a header with the World Cup trophy and "World Cup Hub" title, and a tab selector showing Games, Futures, Same Game Parlays, and Odds Boosters. Games tab is active by default if fixtures are available. All World Cup content — previously fragmented across pre-match, live, and outrights — is now in a single destination.

**Player Goal:** Quickly understand all available World Cup betting content and decide where to go  
**Business Goal:** Orient the user to the full betting opportunity; maximize tab exploration and time on page  
**Success Criteria:** User identifies Games and Futures tabs within 5 seconds of landing and begins exploring  

#### Pain Points
- Nice-to-have tabs (SGPs, Boosters) may be disabled if no content is available — can appear inconsistent
- First-time users may not immediately understand the value of the Futures tab
- Smart default tab logic (Games vs Futures depending on content availability) must handle edge cases

#### Opportunities
- Sticky tabs during scroll keep navigation accessible throughout long content lists
- Smart default (Games if fixtures, Futures if pre-tournament) prevents empty state confusion

#### Ideas
- Animated LIVE badge on Games tab when matches are in progress
- Onboarding tooltip for first-time visitors explaining Futures tab value proposition

#### Octalysis Drives
- CD2: Development & Accomplishment — feels in control with clearly organized, accessible content
- CD4: Ownership & Possession — this is their dedicated World Cup destination
- CD7: Unpredictability & Curiosity — curious about live odds, match listings, and futures all at once

#### Data Sources
- BEAT: page_view (page_type: "world_cup_hub", active_tab: "games")
- Mixpanel: Bounce rate from hub; time on page; tab click distribution (Dashboard Metric #2)

---

### Step 3: Browse Games Section _(games)_

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor)  
**Touchpoint:** World Cup Hub — Games tab  
**Emotion:** Engaged and efficient — clean list, no duplicate confusion, live matches immediately visible  

The user browses World Cup fixtures with live matches shown first, followed by upcoming matches sorted chronologically. Each event row displays primary markets directly (2-way/3-way), plus alternative and auxiliary markets consolidated in the same row. No duplicate entries for the same fixture. SGP icon visible on eligible upcoming matches. User can bet directly from the row or tap into a full fixture page.

**Player Goal:** Find the right match and market quickly — no duplicate rows, no fragmented entry points  
**Business Goal:** Maximize direct selection rate from hub; drive SGP icon engagement; capture live bets during in-progress matches  
**Success Criteria:** User adds a selection or navigates to fixture page within 3 clicks of arriving at Games tab  

#### Pain Points
- Dense fixture list during group stage (48 matches) may require extensive scrolling without round filters
- Alternative market labels (e.g., "Spread 1.5", "Total 2.5") may confuse casual bettors
- Odds suspension during live events temporarily blocks selections — users see grey buttons with no clear explanation

#### Opportunities
- Group stage round filter ("Round 1", "Round of 16") reduces scrolling in dense fixture lists
- Tooltip or label on alternative market columns for casual bettor comprehension

#### Ideas
- Live match count badge on Games tab showing number of in-progress matches
- Group Stage quick-filter chips to jump between tournament rounds

#### Octalysis Drives
- CD2: Development & Accomplishment — making smart choices with all data visible in one clean list
- CD3: Empowerment of Creativity — building bet strategy using SGP icon and inline market comparison
- CD4: Ownership & Possession — adding selections and building betslip feels like claiming a position
- CD6: Scarcity & Impatience — live game is in progress; must decide and bet before odds move

#### Data Sources
- BEAT: selection_added (bet_context: "hub_games_section")
- BEAT: element_interaction (element_type: "event_card", element_name: fixture name)
- BEAT: sgp_builder_opened (from hub Games section)
- Mixpanel: Hub view → Selection added conversion rate; SGP Conversion Rate (Dashboard Metric #4, #7a)

---

### Step 4: Browse Futures Section _(futures)_

**Persona:** Alex (World Cup Opportunist — tournament winner bet), Maria (Soccer-First Bettor — top scorer, group winners)  
**Touchpoint:** World Cup Hub — Futures tab  
**Emotion:** Exploratory and strategic — feels like a dedicated futures destination, not a buried afterthought  

The user clicks the Futures tab to explore long-term tournament betting markets. Markets are organized by group (Tournament Winner, Top Goalscorer, Group Winners, To Reach Final, etc.) with "All" selected by default. Selection lists with 20+ options use expandable "Show More" to keep the view clean. Deep-link URLs with ?group= parameter allow direct access to specific markets via bookmarks or shared links.

**Player Goal:** Evaluate futures markets for the tournament in an organized, dedicated space — not buried in a generic nav hierarchy  
**Business Goal:** Drive high-margin futures handle; capture early-tournament revenue before odds compress; establish futures as a first-class product  
**Success Criteria:** User finds and evaluates at least 2 futures markets within 60 seconds of clicking Futures tab  

#### Pain Points
- Tournament Winner market with 32 teams is long even with Show More
- Futures cannot be combined with fixture lines in parlays — may surprise users who try
- Market info icon (must play for action rules) is easy to miss for casual bettors

#### Opportunities
- Group filter chips enable instant navigation to preferred futures category
- Deep-link URL (?group=tournament-winner) enables sharing specific markets via social or email

#### Ideas
- "Line Movement" indicator showing whether odds have moved up or down in last 24 hours
- Favorites save button to bookmark futures selections for later comparison

#### Octalysis Drives
- CD4: Ownership & Possession — wants to claim a long-term position on the tournament outcome
- CD7: Unpredictability & Curiosity — intrigued by exploring all futures possibilities in one organized place
- CD2: Development & Accomplishment — feels like a smart bettor capturing early value before odds shorten
- CD8: Loss & Avoidance — fears missing favorable odds before they compress as tournament approaches

#### Data Sources
- BEAT: page_view (page_type: "world_cup_hub", active_tab: "futures")
- BEAT: selection_added (is_outright: true, league: "fifa-world-cup-2026")
- Mixpanel: Futures Handle Share (KR2.2); Futures tab views / total hub views (Dashboard Metric #2)

---

## Phase: Bet Placement & Live Engagement
_How does a punter move from browsing to placing a bet, and stay engaged when a match goes live?_

### Step 5: View Fixture Page

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor)  
**Touchpoint:** Fixture Specific Page — upcoming or live (/sportsbook/.../fixture/ID)  
**Emotion:** Focused and in control — full market depth available, clear breadcrumb back to hub, SGP easily accessible  

User taps an event row from the Games section and lands on the Fixture Specific Page for a specific match. The page displays all markets organized in groups (All Markets, Parlay Builder), supports the SGP iFrame builder, and shows alternative/auxiliary markets within the standard template. Breadcrumb routes back to /sportsbook/world-cup-hub/ — not the generic league path — keeping the user in the hub context.

**Player Goal:** See the full market depth for a specific match and build the best possible bet  
**Business Goal:** Maximize market selection depth per session; drive SGP adoption; keep users in hub context via breadcrumb  
**Success Criteria:** User adds at least one selection or opens Parlay Builder within 2 minutes of landing on fixture page  

#### Pain Points
- Dense market list on mobile requires extensive scrolling; no jump-to-section nav
- SGP available only for upcoming fixtures — live fixture Parlay Builder tab not supported in initial release
- Second half markets (half-time feature) are nice-to-have and not guaranteed in first release

#### Opportunities
- Breadcrumb routing to World Cup Hub (vs generic league page) keeps user in hub funnel
- Parlay Builder tab placement makes SGP discoverable without requiring SGP icon knowledge

#### Ideas
- Market group sticky side-nav or jump links for long market lists on mobile
- "Popular bets for this match" section surfacing most-selected markets by other users

#### Octalysis Drives
- CD3: Empowerment of Creativity — building complex bets from full market depth feels strategic
- CD4: Ownership & Possession — building their personal bet strategy selection by selection
- CD6: Scarcity & Impatience — live markets moving; must decide before odds shift
- CD2: Development & Accomplishment — navigating all markets feels like expert behavior

#### Data Sources
- BEAT: page_view (page_type: "fixture_page_upcoming" or "fixture_page_live", fixture_id, fixture_name)
- BEAT: sgp_builder_opened (fixture_id, fixture_name)
- Mixpanel: Hub → Fixture → Selection → Bet placement funnel (Dashboard Metric #7a)

---

### Step 6: Live Transition — Upcoming to Live

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor)  
**Touchpoint:** Fixture Specific Page — automatic redirect from upcoming to live  
**Emotion:** Seamlessly engaged — zero friction, arrives on live page with betslip intact and ready to bet immediately  

While browsing an upcoming fixture page, the match kicks off. The system detects the status change within 5 seconds, fires the upcoming_live_redirection tracking event, and displays a live availability notification with a CTA. User clicks the CTA and lands on the live fixture page with LIVE badge, real-time score, and live markets — session, balance, and betslip fully preserved. No manual searching required.

**Player Goal:** Continue betting on the match seamlessly the moment it goes live — without losing context or betslip  
**Business Goal:** Capture live betting engagement at kickoff — the highest-value betting moment; measure KR3.1 Live Engagement Rate  
**Success Criteria:** User arrives on live page within 5 seconds of kickoff; betslip preserved; user adds live selection within 5 minutes (KR3.1 target)  

#### Pain Points
- If live fixture ID mapping is unavailable, fallback message routes user to hub Games section — 1-2 extra clicks
- Pre-match betslip selections placed after wager cutoff will fail — user needs clear error message
- 5-second detection window means brief delay between real kickoff and notification appearance

#### Opportunities
- upcoming_live_redirection tracking event enables direct OKR measurement (KR3.1)
- "About to start" pre-warning at 5 minutes to kickoff reduces surprise when redirect fires

#### Ideas
- Countdown timer on upcoming fixture page for final minutes before kickoff
- Pre-fill stake amount after redirect so user can place live bet with one tap

#### Octalysis Drives
- CD6: Scarcity & Impatience — live odds are moving right now; the betting window is open
- CD7: Unpredictability & Curiosity — in-play moment is thrilling; what happens on the first goal?
- CD8: Loss & Avoidance — without the redirect would have missed the live betting window entirely
- CD2: Development & Accomplishment — feels in control; didn't miss the live opportunity

#### Data Sources
- BEAT: upcoming_live_redirection (fixture_id, live_fixture_id, fixture_name, current_url, redirection_url)
- BEAT: selection_added within 5 min of redirection event (defines KR3.1 engaged cohort)
- Mixpanel: Live Transition Conversion Rate (Dashboard Metric #5); KR3.1 Live Engagement Rate

---

### Step 7: Place Bet via Betslip

**Persona:** Alex (World Cup Opportunist), Maria (Soccer-First Bettor), Jason (Casual Group Bettor)  
**Touchpoint:** Betslip — persistent component across all hub pages and fixture pages  
**Emotion:** Excited and decisive — clear payout display, intuitive stake entry, and fast confirmation  

User has added selections from Hub Games, Futures, and/or Fixture Pages. The betslip automatically determines bet type (Straight, Parlay, Live Parlay, SGP, Combo SGP), calculates potential payout dynamically, and enables placement. All selections persist across navigation within the hub. After placement, bet appears in Bet History under Pending Bets.

**Player Goal:** Place their chosen bet accurately and quickly — correct selections, correct stake, zero rejections  
**Business Goal:** Maximize bet placement completion rate; drive multi-leg adoption (SGP, Parlay, Combo SGP); measure KR3.2 Acceptance Rate  
**Success Criteria:** Bet placed successfully within 30 seconds of betslip open; acceptance rate at or above 90% (KR3.2)  

#### Pain Points
- Odds changes between selection and placement cause rejection — users must re-accept new odds
- Mobile keyboard obscures betslip stake input on small screens
- Futures cannot be combined with fixture selections in parlays — users who try receive unhelpful error
- Live bet placement speed is sensitive to network latency; mobile 4G users may experience rejections

#### Opportunities
- Real-time odds change indicator in betslip before placement reduces surprise rejections
- Quick-stake buttons ($10/$25/$50/$100) eliminate mobile keyboard friction
- "Accept Odds Changes" preference setting reduces rejection rate and improves KR3.2

#### Ideas
- Instant bet confirmation animation reinforces placement success moment
- Post-placement CTA linking directly to live match tracker for the bet just placed

#### Octalysis Drives
- CD7: Unpredictability & Curiosity — anticipation of match outcome starts the moment bet is placed
- CD4: Ownership & Possession — the bet is now officially theirs; they have a stake in the tournament
- CD6: Scarcity & Impatience — wants to lock in before live odds move further
- CD8: Loss & Avoidance — fear of rejection or odds change at the confirmation moment
- CD2: Development & Accomplishment — placing the bet is the completed goal of the entire journey

#### Data Sources
- BEAT: bet_placement_selection (bet_type, stake_amount, status, league, is_outright)
- BEAT: bet_placed (bet_id, num_selections, bet_type, stake_amount)
- Mixpanel: Hub Conversion Rate (KR1.2); Bet Acceptance Rate (KR3.2); Bet Type Distribution (Dashboard #6); SGP Adoption Rate (KR2.1)

---

