# VISE case study: working file

The portfolio page (`src/pages/casestudy/vise.tsx`) is the public draft. This file holds everything behind it: what's known, what still needs evidence, the research kit, and the plan to finish the case study.

**Rule for this project:** nothing goes on the page as a finding until it comes from real participants. Every claim is tagged **Built**, **Hypothesis**, **Planned** or **Open issue**. Add **Validated** only when there is evidence, and say how many people it came from.

---

## 1. Evidence inventory

### Known (verifiable today)

| Fact | Source |
|---|---|
| Offline-first: SQLite on device, no server, account or cloud sync | VISE README, architecture |
| No bank login needed; manual entry + CSV import | Welcome screen, README |
| 5 tabs: Dashboard, Transactions, Budgets, Reports, Settings | `app/(tabs)/` in the VISE repo |
| Onboarding with skippable steps and "Explore with demo data" | `flows.webp`, welcome screen |
| Settings: Appearance (light/dark/system), currency, monthly income, income source, warning threshold, Data, About ("On this device only") | `app/(tabs)/settings.tsx` |
| Export all data as CSV; delete all data in one transaction, offering an export first | `settings.tsx` DataSection |
| 13 user flows mapped in Figma with decisions and error paths | `public/img/vise/flows.webp` |
| Semantic colour system incl. finance tokens; contrast notes (Info teal 3.5:1, dark-mode green) | `colour.webp` |
| Component states: on track / near limit / over budget, estimate styling | `components.webp` |
| Manrope for UI, IBM Plex Mono for figures; tokens mirrored in `tokens.ts` | Brief, repo |
| 13 Maestro end-to-end flows, Rust + Vitest tests, CI on every PR | Repo |
| V1 in Android testing with real users | Vimal |

### Desk research done (20 Oct 2026), tagged "Reviewed" on the page

- **Market & privacy review** (chapter 04): YNAB, Monarch Money, Emma, Goodbudget, Wallet by BudgetBakers, from each company's own privacy policy and help pages (links on the page). Wallet's selling and export terms couldn't be checked from an official source and are marked "Not reviewed".
- **Expert review** (chapter 11): 9 findings. Contrast was measured from the token values sampled in `colour.webp` (WCAG 2.x formula), and the chip height was measured on the 390pt mockup. Dark mode is not measured yet.

### Needs validation (hypotheses)

H1 to H6 on the page; the problem statement; the design principles; the MoSCoW order; whether people notice, understand and believe the privacy copy; whether the offline trade-off (no sync, no backup) is acceptable.

### Not in the build yet

- **Spending calendar.** The dashboard has a month picker, but there is no calendar view in the public repo. Shown as *Planned*.
- **Notifications.** There's a bell icon and the flows assume OS permission, but no notification logic yet.
- **Goals.** Designed (desktop, phone mock) but not a tab in the app.
- **Tablet layouts.** Not designed.

### Discrepancy to resolve

The brief lists 4 nav items (Dashboard, Transactions, Reports, Settings). The app and designs have **5** (plus Budgets). The page uses 5. If Budgets is ever folded into the Dashboard, update the IA section and say why.

### Artefacts still to create or recover

1. Early sketches / low-fi wireframes. Only show them if they really exist; don't recreate "early" work after the fact.
2. Screenshots of the four layout issues (calendar overflow, clipping, responsive, scroll glitch), with device, OS and font scale.
3. Before / after pairs for each fixed issue.
4. Competitor and privacy comparison (with cited sources and access dates).
5. Affinity map photo or FigJam export after synthesis.
6. Journey map, filled in from research (template below).
7. Annotated versions of the dashboard, budgets and add-transaction screens.
8. Reports, Settings › Data and the add-transaction sheet as phone screenshots. They're missing from the page.

---

## 2. Case study outline → page chapters

| Brief section | Page chapter | State |
|---|---|---|
| 1 Hero | Header (role, team, platforms, status, evidence legend) | Done |
| 2 The opportunity | 01 The opportunity | Done (framed as questions) |
| 3 Research approach | 03 Research approach | Done (plan) |
| 4 Research insights | 03 → empty state "No findings published yet" | **Waiting on research** |
| 5 Problem definition | 05 Problem & principles | Draft, hypothesis |
| 6 Opportunity areas | 02 Hypotheses + 05 HMW | Draft |
| 7 Product strategy | 05 Principles + 06 Priorities | Draft |
| 8 IA and flows | 07 IA & flows | Done |
| 9 Wireframes | Not on page | **Missing artefacts** |
| 10 Visual design & system | 08 Design system | Done |
| 11 Key screens | 09 Key screens | Done |
| 12 Privacy and trust | 04 Privacy & trust | Done |
| 13 Prototyping and testing | 11 Usability testing | Plan only |
| 14 Iterations | 12 Iteration log | Framework + open issues |
| 15 Progress | 13 Progress & metrics | Done |
| 16 Success criteria / roadmap | 13 | Metrics defined, no targets |
| 17 Reflection | 14 Reflection | Draft |
| (extra) Engineering | 10 Engineering | Done |

---

## 3. UX process narrative

The honest version: VISE was built partly *before* formal research. The process below shows what was done, and what each stage still needs.

| Stage | Objective | Activities | Deliverables | Key questions | Decided / to validate | Evidence needed | Leads to |
|---|---|---|---|---|---|---|---|
| **Discover** | Understand habits, pain points and privacy expectations | Interviews, survey, diary, competitor & privacy review | Research plan, raw notes, survey data | How do people track spending? What makes them stop? What earns trust? | To validate: H1 to H6 | Notes from 6 to 8 interviews, survey responses, diary entries | Themes for Define |
| **Define** | Turn evidence into a focused problem | Affinity mapping, prioritising pain points, archetypes, journey map | Problem statement, JTBD, HMW, principles | Which problem matters most, and for whom? | Draft problem statement exists (hypothesis) | Themes seen in multiple participants | Opportunity areas for Ideate |
| **Ideate** | Explore ways to meet the needs | Sketching, crazy 8s, comparing approaches (manual vs. import vs. bank) | Concept sketches, chosen direction | Is manual entry fast enough? Where should privacy be explained? | Decided: offline-first, manual + CSV | Concept test reactions | Feature list for Structure |
| **Structure** | Organise content and flows | IA, task flows, MoSCoW | 5-tab IA, 13 flows, priorities | Does each tab answer one question? | Done in Figma; Budgets as a tab is to validate | Tree test / first-click test | Wireframes for Design |
| **Design** | Make it clear, accessible, consistent | Wireframes → hi-fi, token system, components | Figma screens, `tokens.ts` | Is "what's left" obvious? Is status readable without colour? | Done (UI not final) | Contrast checks, 5-second test | Prototype |
| **Prototype** | Make it testable | Coded app (Expo), demo data | Android V1 build | Can people use it for real for a week? | Built | Working build on testers' phones | Test |
| **Test** | Check against the hypotheses | 7-task usability test, 2-week use | Findings, severity ratings | Where do people fail or hesitate? | Planned | Task results, quotes, ratings | Iterate |
| **Iterate** | Fix what evidence shows | Iteration log entries | Before/after, regression checks | Did the fix work, and did it break anything? | Framework ready; 4 layout issues open | Retest results, screenshot diffs | Back to Test |

---

## 4. Research kit

### 4.1 Research plan

- **Objectives:** (1) habits: how people track spending now; (2) decisions: how they judge affordability; (3) drop-off: why budgeting tools are abandoned; (4) trust: what financial data people will enter and what they need to know first.
- **Participants:** 6 to 8 interviews, survey of whoever you can reach (aim 30+, report the real number), 5 diary participants, 5 to 6 usability test participants. Recruit across the segments below. Don't recruit only friends who work in tech, and if you do, say so.
- **Ethics:** written consent, voluntary, no real account numbers or balances needed, notes anonymised (P1, P2…), recordings deleted after synthesis. Say this at the start of every session.
- **Timeline (suggested):** week 1 recruit + survey; weeks 2 to 3 interviews + diary; week 4 synthesis; week 5 usability test; week 6 iterate + update page.

### 4.2 Provisional segments (hypotheses, not personas)

| Segment | Why they might care | Recruit signal |
|---|---|---|
| **Starting out**: students and first jobs | Tight monthly budget, small frequent spends | "I often don't know what I have left before payday" |
| **Busy earner**: steady income, no system | Money "disappears", no time for upkeep | Tried a budgeting app or spreadsheet and stopped |
| **Privacy-cautious**: any income | Won't link a bank to an app | Has declined to connect a bank account to an app |

### 4.3 Interview guide (45 min)

**Intro (5 min).** Thanks. No right answers. We're testing ideas, not you. Consent to notes / recording. You don't need to share any real amounts or account details.

**Current habits (10 min)**
1. Walk me through the last time you checked how much money you had. What prompted it?
2. How do you keep track of what you spend today, if at all? Show me if you can.
3. Think about last week. What did you spend money on? Which of those would you have forgotten if I hadn't asked?
4. What happens when you lose track? Tell me about the last time.

**Deciding (8 min)**
5. Tell me about a recent purchase where you weren't sure you could afford it. How did you decide?
6. Mid-month, how do you know how much you can still spend?

**Tools (10 min)**
7. Which apps, spreadsheets or methods have you tried for budgeting? What happened?
8. What made you stop? (Probe: setup, daily effort, accuracy, guilt, design.)
9. If you could keep one number in front of you about your money, what would it be?

**Privacy and trust (10 min)**
10. What financial information would you be comfortable typing into an app? What wouldn't you?
11. Have you ever been asked to connect your bank to an app? What did you do, and why?
12. Before using a finance app, what would you want to know about your data?
13. Where would you expect to find that? Have you ever read it?
14. If an app said "your data stays on this device", what would you take that to mean? Would you believe it?
15. What would make you trust, or distrust, a money app straight away?

**Close (2 min).** Anything I should have asked? Can we contact you for a test later?

*Probes:* "Tell me more." "Why was that?" "What did you do next?" "Can you show me?" Avoid leading questions: ask "how did that feel?", not "was that frustrating?".

### 4.4 Survey (5 min, anonymous)

1. How do you currently keep track of spending? *(multi: banking app, budgeting app, spreadsheet, notes/paper, in my head, I don't)*
2. How often do you check your spending? *(daily / weekly / monthly / rarely / never)*
3. Mid-month, how confident are you about how much you can still spend? *(1 to 5)*
4. Have you used a budgeting app before? *(yes, still use / yes, stopped / no)*
5. If you stopped, why? *(multi: setup took too long, too much daily effort, didn't trust it, too complicated, didn't help, cost, other)*
6. Would you connect your bank account to a budgeting app? *(yes / only a well-known one / no / not sure)*
7. Which would you be comfortable entering into an app? *(multi: amounts spent, categories, merchant names, income, account balances, bank login)*
8. Before using a finance app, which would you want explained? *(multi: what's collected, where it's stored, who it's shared with, how to delete it, how to export it, whether a bank link is needed)*
9. How long would you spend per day on budgeting, at most? *(<1 min / 1 to 3 / 3 to 5 / 5+)*
10. Age range, employment status *(optional)*
11. Can we contact you for a 45-min interview? *(email, optional)*

### 4.5 Competitor and privacy review framework

Pick 4 to 6 apps people actually mention in interviews. For each, record **with a source link and access date**:

| Criterion | App A | App B | … |
|---|---|---|---|
| Bank connection required to start? | | | |
| Works fully without a bank connection? | | | |
| Account / sign-up required? | | | |
| Where data is stored (as stated by the app) | | | |
| Sharing with third parties (as stated in policy) | | | |
| Export available? Format? | | | |
| Delete account / data in-app? | | | |
| Privacy explained in onboarding (yes/no, quote) | | | |
| Time to first useful screen (you, timed) | | | |
| Remaining-budget visible on home? | | | |

Report only what the source states. Never write "app X sells your data" without a citation.

### 4.6 Synthesis and affinity mapping

1. One observation per sticky: `P3 · "I check my bank app and guess." · habits`.
2. Cluster silently, then name clusters as **needs in the user's voice** ("I need to know what's left before I buy").
3. For each cluster record: participants (count + IDs), strongest quotes, contradicting evidence.
4. Map clusters back to H1 to H6: **supported / mixed / not supported / new**.

### 4.7 Pain-point prioritisation

| Pain point | Frequency (# of participants) | Severity (1 to 3) | Hypothesis | VISE addresses? | Priority |
|---|---|---|---|---|---|

Priority = frequency × severity, then sanity-check by hand. A pain point seen in 1 of 8 people is a lead, not a finding.

### 4.8 User needs and opportunity statements

`[Segment] needs a way to [need] because [insight, with evidence ref]. We'll know we've met it when [measurable signal].`

### 4.9 Behavioural archetype template (label "Provisional" until 3+ participants match)

- Name (behavioural, e.g. "The head-tracker", not a stock photo persona)
- Based on: P_, P_, P_
- Current behaviour · Goal · Biggest frustration · Privacy stance · What VISE must do for them · Quote

### 4.10 Journey map template

Stages: **Get paid → Spend day to day → Wonder "what's left?" → Decide on a purchase → Review the month → Try / abandon a tool**

Rows for each stage: Doing · Thinking · Feeling (−2 to +2) · Pain points · Touchpoints · Opportunity for VISE · Evidence (P IDs). Fill in only from research; leave cells empty rather than guessing.

### 4.11 JTBD, HMW, problem statement, principles, requirements

Drafts are on the page (chapters 05 and 06). After synthesis: rewrite each one against the evidence, remove what isn't supported, and note what changed and why. **That change is the strongest part of the story.**

---

## 5. Usability test kit

**Setup:** Android V1, fresh install with demo data (or a seeded month). 45 min, think-aloud, screen + audio recording with consent. Moderator + note-taker if possible.

The seven tasks (T1 to T7) are on the page. For each participant × task, record:

| P | Task | Completed (Y / with help / N) | Time (s) | Errors | Path taken | Confidence (1 to 5) | Quote | Severity (0 to 4) |
|---|---|---|---|---|---|---|---|---|

**Post-test questions:** What was easiest? Hardest? In your own words, where is your data kept? Would you use this for a month? What would stop you?

**Severity scale:** 0 not a problem · 1 cosmetic · 2 minor · 3 major · 4 blocks the task.

Run T5 (calendar) only once the calendar exists.

---

## 6. Iteration log template

```
### [ID] Title
Status: Open | Fixing | Fixed (awaiting validation) | Validated
Problem:     What the user sees, in one sentence.
Evidence:    Screenshot / video, device, OS, font scale, theme, build. Or: test finding P_, T_.
Root cause:  CONFIRMED: <cause + how it was proven>   or   SUSPECTED: <cause>, not yet proven.
Options:     A … / B … / C … (trade-offs)
Chosen fix:  … because …
Validation:  Regression check (E2E flow / screenshot set) + retest result.
Before/after: links
```

### Investigating layout issues

1. **Reproduce.** Fixed matrix: small Android (360dp), large Android, iPhone SE-size, recent iPhone, a tablet, web at each breakpoint; font scale 100% / 200%; light + dark; longest realistic content (e.g. `€12,345.67`, 40-char merchant names).
2. **Isolate.** Reduce to the smallest screen and content that still shows it. Check whether it's data-dependent, font-scale-dependent or platform-specific.
3. **Find the cause.** Inspect the layout (React Native inspector / web devtools): fixed widths or heights, `numberOfLines` without truncation, missing `flexShrink`, nested scroll views, sticky header re-renders. Only call a cause **confirmed** when changing that one thing makes the bug appear or disappear on demand.
4. **Fix**, preferably in the component or token, not the screen.
5. **Regression-test.** Add or extend a Maestro flow for behaviour; screenshot the matrix for visuals; compare before/after.

---

## 7. Success metrics

Defined on the page (chapter 13). Baselines come from the first test round; set targets only after that. Report as "x of n participants", not percentages, while n < 10.

---

## 8. Visual content plan

| Chapter | Visual today | To add |
|---|---|---|
| Header | Cover + evidence legend | — |
| 02 Hypotheses | Cards | After research: each card shows supported / mixed / not supported |
| 03 Research | Methods + empty state | Affinity map image, survey charts (real n), 2 to 3 quotes |
| 04 Privacy | Welcome screen + Q&A | Settings › Data screen + delete dialog screenshots; competitor comparison table |
| 05 Define | Statement, JTBD, HMW, principles | Journey map (from research) |
| 06 Priorities | MoSCoW | Show what moved after research |
| 07 IA | Tabs + 13 flows | Annotated crop of 2 flows (add expense, delete with undo) |
| — Wireframes | — | Only if genuine low-fi exists: wireframe → hi-fi comparison |
| 08 System | Token layers, colour, type, components | Token naming diagram from Figma variables |
| 09 Screens | 6 phones, budgets, transactions, desktop | Annotations; Reports and add-transaction sheet; tablet once designed |
| 11 Testing | Task cards | Results table, severity chart, clips |
| 12 Iterations | Format + 4 open issues | Before/after screenshots per issue |
| 13 Status | Done/open, metrics | Real metric values |

---

## 9. Prioritised next steps

0. **Apply the expert-review fixes** (chapter 11): rename the two "left" numbers, label Predicted, hide the bell, fix the three contrast pairs, enlarge chip hit areas, check Android/iOS system backup of the database. Then log each one in the iteration log with before/after images.
1. **Run 6 to 8 interviews** with the guide above (covers H1, H3, H4, H5). This is the biggest credibility gain.
2. **Send the survey** in parallel. Report the real n.
3. **Run the usability test (T1 to T4, T6, T7)** on the Android V1 build with 5 to 6 people. Gather existing V1 tester feedback into the same log.
4. **Synthesise.** Affinity map → update hypotheses to supported / not supported, rewrite problem statement and principles, re-rank priorities. Update chapters 02, 03, 05, 06.
5. **Document the four layout issues properly**: screenshots, reproduction, confirmed cause, fix, before/after. Update chapter 12.
6. **Competitor and privacy review** with cited sources. Add to chapter 04.
7. **Add missing screens**: Reports, Settings › Data, delete dialog, add-transaction sheet.
8. **Wireframes**: add only genuine early work; otherwise leave the section out.
9. **Set metric targets** from the first test round's baselines. Update chapter 13.
10. **Rewrite the reflection** around what the research changed. That's the story hiring managers will remember.
