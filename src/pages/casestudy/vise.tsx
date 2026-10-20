import { useEffect, type ReactNode } from "react";
import { PiTrafficCone, PiArrowUpRight, PiArrowDown } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/vise`;
const REPO = "https://github.com/PassionChips/Vise";

// this page shows VISE's own type specimens, so only it loads those faces
const SPECIMEN_FONTS = "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&family=IBM+Plex+Mono:wght@500&display=swap";

/* Every claim on this page carries one of these. "Reviewed" is desk research
   (expert review, published policies), not user research, so there is
   deliberately no "validated" yet. */
type EvKind = "built" | "reviewed" | "hypothesis" | "planned" | "open";
const EV_LABEL: Record<EvKind, string> = { built: "Built", reviewed: "Reviewed", hypothesis: "Hypothesis", planned: "Planned", open: "Open issue" };
const Ev = ({ kind }: { kind: EvKind }) => <span className={`cs-ev cs-ev--${kind}`}>{EV_LABEL[kind]}</span>;

const SECTIONS: CsSection[] = [
  { id: "opportunity", label: "The opportunity" },
  { id: "hypotheses",  label: "Hypotheses" },
  { id: "research",    label: "Research approach" },
  { id: "market",      label: "Market review" },
  { id: "privacy",     label: "Privacy & trust" },
  { id: "define",      label: "Problem & principles" },
  { id: "priorities",  label: "Priorities" },
  { id: "structure",   label: "IA & flows" },
  { id: "system",      label: "Design system" },
  { id: "screens",     label: "Key screens" },
  { id: "review",      label: "Expert review" },
  { id: "engineering", label: "Engineering" },
  { id: "testing",     label: "Usability testing" },
  { id: "iterations",  label: "Iteration log" },
  { id: "status",      label: "Progress & metrics" },
  { id: "reflection",  label: "Reflection" },
];

/* 02 · what VISE assumes, and how each assumption gets tested */
const HYPOTHESES = [
  { title: "Small spends go missing",          belief: "People lose track of small daily purchases far more than rent or bills.",               test: "Interviews on last week's spending, plus a one-week spending diary." },
  { title: "“What's left?” is the question",   belief: "People want to know what they can still spend, more than totals or charts.",             test: "Five-second and first-click tests on the dashboard." },
  { title: "Upkeep kills budgeting apps",      belief: "Long setup and daily upkeep are why people give up on budgeting tools.",                 test: "Interviews about apps people stopped using, and why." },
  { title: "A bank login is a barrier",        belief: "Some people won't connect a bank account just to try a finance app.",                    test: "Survey on willingness, interviews on what earns trust." },
  { title: "Privacy is hard to read",          belief: "People can't easily tell what a finance app collects, stores or shares.",                test: "Comprehension task: explain VISE's data handling after onboarding." },
  { title: "Manual entry is fine if it's fast", belief: "People will log spending by hand if it takes seconds. This is VISE's biggest risk.", test: "Timed add-transaction task, then two weeks of real use." },
];

/* 03 · research methods and where each one stands */
const METHODS: { name: string; why: string; kind: EvKind }[] = [
  { name: "Market & privacy review",       why: "Five budgeting apps, read from their own privacy policies and help pages. Section 04.",       kind: "reviewed" },
  { name: "Expert review",                 why: "The current designs checked against usability heuristics and WCAG, with measured contrast. Section 11.", kind: "reviewed" },
  { name: "Interviews",                    why: "How people track spending today, what they gave up on, what makes them trust a finance app.", kind: "planned" },
  { name: "Short survey",                  why: "How common the interview themes are, especially willingness to connect a bank.",             kind: "planned" },
  { name: "One-week spending diary",       why: "What actually gets logged, and what is forgotten, in a normal week.",                        kind: "planned" },
  { name: "Usability test of V1",          why: "Seven tasks on a real Android build. The script is in section 13.",                          kind: "planned" },
];

/* 04 · read from each company's own policy and help pages on 20 Oct 2026 */
type Src = [label: string, url: string];
const APPS: { name: string; bank: string; where: string; sell: string; take: string; del: string; src: Src[] }[] = [
  { name: "YNAB",
    bank: "Optional. Transactions can be added by hand without direct import.",
    where: "“Transferred, processed, and stored in the United States.”",
    sell: "“We do not sell your Financial Data”, but runs targeted advertising unless you opt out.",
    take: "On request, through a data rights form.",
    del:  "On request. Account data is kept up to 24 months after a subscription ends unless deleted.",
    src: [["Privacy policy, eff. 20 Apr 2026", "https://www.ynab.com/privacy-policy"], ["Adding transactions without direct import", "https://support.ynab.com/en_us/adding-transactions-without-direct-import-B1kBALVaxx"]] },
  { name: "Monarch Money",
    bank: "Optional. Manual accounts and CSV import on the web. Linked accounts go through Plaid, Finicity, MX or Spinwheel.",
    where: "Not stated in the policy.",
    sell: "“We will never sell your financial data”. Ad partners may still receive data, with an opt-out.",
    take: "On request, “in a machine-readable format”.",
    del:  "In settings, but it “does not erase every copy” at once.",
    src: [["Privacy policy, eff. 10 Aug 2026", "https://www.monarch.com/privacy"], ["Importing transactions manually", "https://help.monarch.com/hc/en-us/articles/4409682789908-Importing-Transactions-Manually"]] },
  { name: "Emma",
    bank: "Built around Open Banking: balances and transactions come from your bank, with consent.",
    where: "Amazon Web Services. Some data may be transferred to the US.",
    sell: "Not stated. Marketing partners only with explicit consent.",
    take: "On request, “in a portable format”.",
    del:  "From profile settings, chat or email, within 30 days. Some records kept up to 7 years by regulation.",
    src: [["Privacy policy", "https://emma-app.com/privacy"]] },
  { name: "Goodbudget",
    bank: "Manual by default. Bank files can be uploaded, and Premium adds bank sync through Plaid.",
    where: "“Your data is stored in the United States” (AWS).",
    sell: "“Never sold or rented, to anyone, for any reason, at any time.”",
    take: "In-app CSV of transactions only.",
    del:  "By email or phone. Removed from the database within 30 days, from logs and backups within 12 months.",
    src: [["Privacy policy, rev. 7 Nov 2024", "https://goodbudget.com/privacy/"], ["Manually import from your bank", "https://goodbudget.com/help/using-accounts/import/"]] },
  { name: "Wallet by BudgetBakers",
    bank: "Optional. Manual accounts, or read-only bank data with explicit consent.",
    where: "On BudgetBakers' servers whenever the app is online.",
    sell: "Not reviewed.",
    take: "Not reviewed.",
    del:  "In-app: “Delete profile and all data” on Android, iOS and web. Encrypted backups kept for a period.",
    src: [["Deleting account and all data", "https://support.budgetbakers.com/hc/en-us/articles/7183718895762-Deleting-account-and-all-data"], ["Privacy policy", "https://budgetbakers.com/en/privacy/"]] },
];
const VISE_ROW = {
  bank: "Never. Manual entry or CSV import.",
  where: "On the phone only. No server, account or sync.",
  sell: "Nothing leaves the device, so there is nothing to sell or share.",
  take: "In-app CSV of all transactions and budgets.",
  del:  "In-app, in one step, immediately. No server copy to wait for.",
};

const PATTERNS = [
  { title: "Everyone else keeps a server copy", note: "All five store data on their own servers. VISE is the outlier, which is also exactly why it has no backup." },
  { title: "Deleting is a process, not a moment", note: "Policies describe 30-day windows, backups kept up to 12 months, and records kept up to 7 years where the law requires it." },
  { title: "A bank link brings in more companies", note: "Linked accounts run through aggregators such as Plaid, MX and Finicity, each with its own privacy policy." },
  { title: "Not selling isn't the same as not sharing", note: "Two apps promise never to sell financial data, and in the same policy describe advertising partners and an opt-out." },
];

/* 04 · the questions a cautious person asks, and how VISE answers each one today */
const PRIVACY = [
  { q: "What does it collect?",           a: "Only what you type in: transactions, budgets, categories, income, a name and avatar.", where: "The delete dialog lists every kind of data stored before you confirm." },
  { q: "Where is it stored?",             a: "In a SQLite database on the phone. There's no server, account or cloud sync.",          where: "Welcome screen, and Settings › About: “On this device only”." },
  { q: "Is it shared with anyone?",       a: "There is nowhere for it to go. Nothing is sent off the device.",                        where: "Architecture: no network layer in the core." },
  { q: "Do I need to connect a bank?",    a: "No. You add transactions by hand or import a CSV.",                                     where: "Welcome screen: “No bank login needed.”" },
  { q: "Can I take my data with me?",     a: "Yes. Export every transaction and budget as a CSV.",                                    where: "Settings › Data › Export." },
  { q: "Can I delete it?",                a: "Yes, all of it in one step. You're offered an export first, and it's erased in a single transaction, so it's never half-deleted.", where: "Settings › Data › Delete all." },
];

const JOBS = [
  { when: "I'm about to buy something",  want: "see what's left in that category",  so: "I can decide without guessing" },
  { when: "I've just spent money",       want: "log it in a few seconds",           so: "my record stays accurate without becoming a chore" },
  { when: "I try a new finance app",     want: "know exactly where my data goes",   so: "I can trust it before I enter anything real" },
];

const HMW = [
  "How might we answer “what can I still spend?” in one glance?",
  "How might we make logging a purchase faster than forgetting it?",
  "How might we explain data handling at the moment it matters, not in a policy?",
  "How might we warn about overspending without shaming people?",
];

const PRINCIPLES = [
  { name: "Lead with what's left",        note: "Remaining budget is the biggest number on the dashboard and the budgets screen." },
  { name: "Seconds, not sessions",        note: "Add a transaction from any tab. Optional onboarding steps can be skipped." },
  { name: "Say where the data is",        note: "Privacy copy appears where you make the decision, starting on the welcome screen." },
  { name: "Never colour alone",           note: "Every status colour comes with a label: On track, Near limit, Over budget." },
  { name: "Estimates look like estimates", note: "Predicted values use dashed outlines and the word “Estimate”." },
];

/* 06 · MoSCoW, honest about what's built before research */
const PRIORITIES: { tier: string; items: { name: string; kind: EvKind }[] }[] = [
  { tier: "Must", items: [
    { name: "Monthly income and remaining budget", kind: "built" },
    { name: "Add, edit and delete transactions",   kind: "built" },
    { name: "Category limits and warnings",        kind: "built" },
    { name: "Onboarding with a demo option",       kind: "built" },
    { name: "Export and delete all data",          kind: "built" },
  ]},
  { tier: "Should", items: [
    { name: "Reports and category breakdown", kind: "built" },
    { name: "Currency setting",               kind: "built" },
    { name: "Light, dark and system themes",  kind: "built" },
    { name: "CSV import",                     kind: "built" },
  ]},
  { tier: "Could", items: [
    { name: "Spending calendar",              kind: "planned" },
    { name: "Budget notifications",           kind: "planned" },
    { name: "Savings goals (desktop design)", kind: "planned" },
    { name: "Next-month prediction",          kind: "built" },
  ]},
  { tier: "Won't, for now", items: [
    { name: "Bank connections",  kind: "hypothesis" },
    { name: "Cloud sync",        kind: "hypothesis" },
    { name: "Shared budgets",    kind: "hypothesis" },
  ]},
];

const TABS = [
  { name: "Dashboard",    q: "How is this month going?" },
  { name: "Transactions", q: "What did I spend, and where?" },
  { name: "Budgets",      q: "What can I still spend?" },
  { name: "Reports",      q: "Where does my money go over time?" },
  { name: "Settings",     q: "My data, my preferences." },
];

const FRICTION = [
  { title: "Onboarding length",            note: "Six steps. Income and first transaction are skippable, and “Explore with demo data” lets people look before they commit." },
  { title: "Deleting a used category",     note: "A category with transactions can't simply vanish. The flow asks where to move them first." },
  { title: "Changing currency",            note: "Amounts are not converted. The flow says so before it applies, so nobody thinks €500 became $500." },
  { title: "Deleting a transaction",       note: "Confirm, then an undo toast for 8 seconds, so a slip is easy to recover from." },
  { title: "Reports with little data",     note: "Reports need a full month. Before that, an empty state explains why instead of showing a flat chart." },
  { title: "When to warn",                 note: "“Near limit” fires at a threshold people set themselves (80% by default)." },
];

const TOKENS = [
  { name: "Primitives",       tech: "Green/600 · Grey/900 · Red/600",          note: "Raw values. Nothing in the app uses them directly." },
  { name: "Semantic tokens",  tech: "brand.primary · finance.overBudget",      note: "Named by meaning. Light and dark map the same name to different primitives." },
  { name: "Component tokens", tech: "progressBar.fill.over · card.border",     note: "Decisions for one component, built from semantic tokens." },
  { name: "Components",       tech: "BudgetCard · TransactionRow · SummaryCard", note: "Built once in Figma and once in code, from the same tokens.ts." },
];

const TYPE = [
  { token: "Display",    spec: "Manrope Bold · interface headings",        sample: "Left to spend", style: { fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em" } },
  { token: "Body",       spec: "Manrope Medium · labels and copy",         sample: "€587.70 was spent in categories without a budget.", style: { fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 17 } },
  { token: "Figure",     spec: "IBM Plex Mono Medium · every amount",      sample: "€1,596.90  ·  €42.80", style: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 26 } },
];

const PHONES = [
  { src: "welcome",   cap: "Welcome" },
  { src: "dash",      cap: "Dashboard" },
  { src: "tx",        cap: "Transactions" },
  { src: "budgets",   cap: "Budgets" },
  { src: "goals",     cap: "Goals" },
  { src: "dash-dark", cap: "Dark mode" },
];

/* 11 · expert review of the current designs. Severity 0 to 4 (Nielsen);
   contrast measured from the token sheet with the WCAG 2.x formula. */
const FINDINGS: { sev: string; title: string; where: string; rule: string; issue: string; fix: string }[] = [
  { sev: "3", title: "Two different “left” numbers", where: "Dashboard and Budgets", rule: "Consistency · match with the real world",
    issue: "The dashboard's Remaining (€2,065.40) is income minus spending. The budgets screen's Left to spend (€573.10) is budget minus spent. One idea in people's heads, two numbers, two names.",
    fix: "Name each for what it is, such as “Unspent income” and “Left in budgets”, and decide which one the dashboard leads with. Test task T1 checks it." },
  { sev: "2", title: "“Predicted” doesn't say what", where: "Dashboard summary card", rule: "Recognition rather than recall",
    issue: "€3,120.00 sits beside Income and Spending, labelled “Estimate · last 3 months”. It could be read as predicted income, spending or balance.",
    fix: "Label it “Predicted spending this month”." },
  { sev: "2", title: "A bell that does nothing yet", where: "Dashboard header", rule: "Consistency and standards",
    issue: "The notifications button is drawn without an action, and notifications aren't built.",
    fix: "Hide it until notifications ship." },
  { sev: "2", title: "Inactive segment labels at 4.29:1", where: "Week / Month / 3M control", rule: "WCAG 1.4.3 contrast",
    issue: "Secondary text #6B756D on the Variant surface #F1F3F0 measures 4.29:1, under the 4.5:1 minimum for normal text.",
    fix: "A darker secondary, #5F6961, gives 5.11:1 here and 5.38:1 on the page background." },
  { sev: "2", title: "Active nav label at 4.45:1", where: "Desktop sidebar", rule: "WCAG 1.4.3 contrast",
    issue: "Primary green #16843D on the Subtle tint #F1F9F4 measures 4.45:1.",
    fix: "Use PrimaryPressed #0C5D2B for text on Subtle: 7.49:1." },
  { sev: "2", title: "Input edges at 1.23:1", where: "Search fields", rule: "WCAG 1.4.11 non-text contrast",
    issue: "Border/Default #E3E9E5 on white measures 1.23:1. The edge of a text field needs 3:1.",
    fix: "Add an input-border token, such as #8A948C (3.14:1), and keep the light border for cards." },
  { sev: "2", title: "Filter chips about 36pt tall", where: "Transactions filters", rule: "Platform touch-target guidance",
    issue: "Measured on the 390pt-wide mockup. Apple recommends at least 44pt and Android 48dp.",
    fix: "Keep the look, and extend the tappable area to 44pt." },
  { sev: "1", title: "Three ways to add from one screen", where: "Dashboard", rule: "Aesthetic and minimalist design",
    issue: "The + button, Add expense and Add income all start the same job.",
    fix: "Keep +, and test whether the quick actions earn their space." },
  { sev: "?", title: "Phone backups not yet checked", where: "Android and iOS system backup", rule: "Accuracy of privacy claims",
    issue: "VISE sends nothing itself, but the operating system can back up app data to the cloud on its own.",
    fix: "Check the backup rules on both platforms, then make the privacy copy match exactly." },
];

const WORKS = [
  "Budget status never relies on colour: every state has an icon and a word.",
  "Spending stays neutral. Plus and minus signs carry direction, not only colour.",
  "Goals sets expectations up front: “VISE doesn't move money.”",
  "“Explore with demo data” lets people look around before typing anything real.",
  "Mistakes are recoverable: undo after delete, and errors point at the exact field.",
  "Equal-width digits line amounts up, so they can be compared at a glance.",
];

const LAYERS = [
  { name: "Screens",             tech: "React Native + Expo Router",   note: "Onboarding and five tabs. No budget maths in the UI." },
  { name: "viseCore.ts",         tech: "TypeScript client",            note: "The only file that talks to Rust, with typed mirrors of its JSON." },
  { name: "Native bridge",       tech: "Expo module · Kotlin / Swift", note: "Passes JSON between JavaScript and the compiled Rust library." },
  { name: "Rust core",           tech: "api → service → calculations", note: "Validates every write and returns errors by field, so the UI can point at the right input." },
  { name: "SQLite on the device", tech: "Diesel + bundled SQLite",     note: "Money stored as exact cents. Data never leaves the phone." },
];

/* 11 · usability tasks: what to ask, what to watch, what could go wrong */
const TASKS = [
  { goal: "Understand the available budget", scenario: "You're thinking about buying a €40 jacket today.",                        task: "Find out whether you can afford it this month.",           watch: "Where they look first. Do they read Remaining, or add up totals themselves?",  risk: "Remaining and Predicted are confused." },
  { goal: "Add a transaction",                scenario: "You just paid €4.20 for a coffee by card.",                                 task: "Record it.",                                               watch: "Time to save, taps, hesitation over category or date.",                         risk: "Comma vs. point in amounts; the category list is too long." },
  { goal: "Set a category limit",             scenario: "You want to spend no more than €150 on eating out.",                        task: "Set that up.",                                             watch: "Do they find Budgets, or look in Settings?",                                     risk: "Monthly limit vs. category limit is unclear." },
  { goal: "Read spending indicators",         scenario: "Look at the budgets screen.",                                               task: "Tell me which categories need attention, and why.",        watch: "Do labels or colours carry the meaning? Is “Near limit” understood?",           risk: "Orange vs. red is missed, especially with colour-vision differences." },
  { goal: "Navigate the spending calendar",   scenario: "You remember a big spend around the 10th.",                                 task: "Find it.",                                                 watch: "Use of the calendar vs. search vs. scrolling. (Run once the calendar is built.)", risk: "Dense day cells, amounts cut off on small screens." },
  { goal: "Understand privacy and data",      scenario: "A friend asks you if this app sends your data anywhere.",                   task: "Answer them, and show how you'd delete everything.",       watch: "Can they explain it in their own words? Do they believe it?",                   risk: "The copy is read but not trusted, or never noticed." },
  { goal: "Recover from mistakes",            scenario: "You entered €42.00 instead of €4.20 yesterday, and deleted a coffee by accident.", task: "Fix both.",                                          watch: "Discovery of edit, use of undo, confidence afterwards.",                        risk: "The undo toast disappears before it's noticed." },
];

const LOG_STEPS = ["Problem", "Evidence", "Root cause", "Options", "Chosen fix", "Validation"];

/* 12 · layout issues found while building; causes stay "not confirmed" until reproduced and proven */
const ISSUES = [
  { title: "Spending calendar overflow",    repro: "Smallest supported width, largest system font, long amounts (e.g. €12,345.67), light and dark." },
  { title: "Clipped content",               repro: "Large text and display-zoom settings on Android and iOS; long category and merchant names." },
  { title: "Responsive layout breaks",      repro: "Rotate phone and tablet; resize the web build across each breakpoint." },
  { title: "Visual glitch while scrolling", repro: "Fast scroll and overscroll on lists with sticky headers, on a low-end Android device." },
];

const DONE = [
  "Market and privacy review of five budgeting apps",
  "Expert review: 9 findings with fixes, contrast measured",
  "13 user flows mapped in Figma, with decision points and error paths",
  "Semantic colour and component system, light and dark",
  "Onboarding, five tabs, add / edit / delete flows on real data",
  "Export and delete-all, built and covered by end-to-end tests",
  "Android build and launch checked in CI on every PR",
];
const OPEN = [
  "Apply the expert-review fixes",
  "Interviews, survey and diary study",
  "Usability test of V1 with Android testers",
  "Spending calendar, notifications and tablet layout",
  "iOS bridge testing (needs macOS)",
];

const METRICS = [
  { name: "Task completion",          how: "Share of participants who finish each of the seven tasks without help." },
  { name: "Time to add a transaction", how: "Seconds from tap on + to the saved toast, timed in sessions." },
  { name: "Entry errors",             how: "Validation errors and later corrections per transaction, from sessions." },
  { name: "Understanding “what's left”", how: "Correct answer to the €40 jacket question within 10 seconds." },
  { name: "Confidence in privacy",    how: "1 to 5 rating after the privacy task, plus whether their explanation is correct." },
  { name: "Accessibility",            how: "Contrast checks on every token pair, screen-reader pass on each tab, 200% text." },
  { name: "Layout consistency",       how: "Screenshot checks on a fixed device list for every release." },
];

function Rows({ children }: { children: ReactNode }) {
  return <div className="cs-rows" role="list">{children}</div>;
}

export default function ViseCaseStudy() {
  useEffect(() => {
    if (document.querySelector(`link[href="${SPECIMEN_FONTS}"]`)) return;
    const link = Object.assign(document.createElement("link"), { rel: "stylesheet", href: SPECIMEN_FONTS });
    document.head.appendChild(link);
  }, []);

  const project = projects.find(p => p.slug === "vise")!;

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        VISE
        <span className="cs-title-sub">Budgeting that stays <em>on your phone.</em></span>
      </h1>
      <p className="cs-lede">
        An offline-first budgeting app for iOS and Android. This is the design story so far: what we believe,
        what we've built, and what we still have to prove with real people.
      </p>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Team</dt><dd>Me + a friend</dd></div>
        <div><dt>Platforms</dt><dd>Android · iOS · Web</dd></div>
        <div><dt>Status</dt><dd className="live">V1 · Android testing</dd></div>
      </dl>
      <div className="cs-actions">
        <a href="#research" className="cs-btn" onClick={e => { e.preventDefault(); document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }); }}>
          Jump to the research <PiArrowDown size={17} aria-hidden />
        </a>
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn--ghost cs-btn--on-stage">
          View the code <PiArrowUpRight size={17} aria-hidden />
        </a>
      </div>
      <div className="cs-wip-note" role="note">
        <span className="cs-wip-note-icon" aria-hidden><PiTrafficCone size={22} /></span>
        <p>
          <strong>A case study in progress, like the app.</strong> Each claim is tagged so you can see what's
          built, what's been reviewed, what's still a hypothesis and what research is next.
        </p>
      </div>
      <ul className="cs-legend" aria-label="How claims are tagged">
        <li><Ev kind="built" /> in the app today</li>
        <li><Ev kind="reviewed" /> desk research done</li>
        <li><Ev kind="hypothesis" /> believed, not proven</li>
        <li><Ev kind="planned" /> research not yet run</li>
        <li><Ev kind="open" /> known problem</li>
      </ul>
      <Figure src={`${IMG}/cover.webp`} alt="VISE budgets and dashboard screens in light and dark mode" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="VISE" sections={SECTIONS} header={header}>

      {/* 01 ─────────────────────────────── */}
      <Section id="opportunity" index={1} label="The opportunity" title="Why VISE exists">
        <p className="cs-p">
          Small daily spends are easy to lose track of. By the middle of the month, “how much do I have left?”
          often has no quick answer. Budgeting apps promise that answer, but many start by asking for a bank login,
          and it isn't always clear what happens to that data afterwards.
        </p>
        <p className="cs-p">
          VISE started from a simple bet: <strong>a budget you can check in a minute a day, that never needs your
          bank details, and that tells you plainly where your data lives.</strong>
        </p>
        <p className="cs-note">
          These are the questions VISE started from, not things we've proven. The next section writes each one down
          as a hypothesis, along with the evidence that would prove or disprove it.
        </p>
      </Section>

      {/* 02 ─────────────────────────────── */}
      <Section id="hypotheses" index={2} label="Hypotheses" title={<>What we believe, <em>but haven't proven.</em></>}>
        <ol className="cs-hyp">
          {HYPOTHESES.map((h, i) => (
            <li key={h.title} className="cs-hyp-card">
              <div className="cs-hyp-top"><span className="cs-hyp-num">H{i + 1}</span><Ev kind="hypothesis" /></div>
              <h3>{h.title}</h3>
              <p>{h.belief}</p>
              <p className="cs-hyp-test"><span>How we'll test it</span>{h.test}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 03 ─────────────────────────────── */}
      <Section id="research" index={3} label="Research approach" title="How we'll find out">
        <p className="cs-p">The research has four objectives:</p>
        <ul className="cs-list">
          <li><strong>Habits:</strong> how people track spending today, and what happens when they lose track.</li>
          <li><strong>Decisions:</strong> how they decide whether a purchase is affordable.</li>
          <li><strong>Drop-off:</strong> what makes budgeting tools hard to keep using.</li>
          <li><strong>Trust:</strong> what financial data people are comfortable entering, and what they need to know first.</li>
        </ul>
        <Rows>
          {METHODS.map(m => (
            <div key={m.name} className="cs-row" role="listitem">
              <p className="cs-row-k">{m.name}</p>
              <p className="cs-row-v">{m.why}</p>
              <Ev kind={m.kind} />
            </div>
          ))}
        </Rows>
        <div className="cs-empty" role="note">
          <p className="cs-empty-k">User research insights</p>
          <p className="cs-empty-h">Next: hearing it from users.</p>
          <p>
            The two reviews show where VISE stands against the market and against design standards. They can't
            show how people really manage money day to day. That comes from the interviews and testing, and the
            guide, survey and test script are ready.
          </p>
        </div>
      </Section>

      {/* 04 ─────────────────────────────── */}
      <Section id="market" index={4} label="Market review" title={<>What other apps ask for, <em>and what they keep.</em></>}>
        <p className="cs-p">
          Five budgeting apps, read from their own privacy policies and help pages. Only what each company states
          is recorded here, quoted where it matters. <Ev kind="reviewed" />
        </p>
        <div className="cs-apps">
          <article className="cs-app cs-app--self">
            <h3>VISE</h3>
            <dl>
              <div><dt>Bank link</dt><dd>{VISE_ROW.bank}</dd></div>
              <div><dt>Where data lives</dt><dd>{VISE_ROW.where}</dd></div>
              <div><dt>Selling or sharing</dt><dd>{VISE_ROW.sell}</dd></div>
              <div><dt>Take it with you</dt><dd>{VISE_ROW.take}</dd></div>
              <div><dt>Delete it</dt><dd>{VISE_ROW.del}</dd></div>
            </dl>
          </article>
          {APPS.map(a => (
            <article key={a.name} className="cs-app">
              <h3>{a.name}</h3>
              <dl>
                <div><dt>Bank link</dt><dd>{a.bank}</dd></div>
                <div><dt>Where data lives</dt><dd>{a.where}</dd></div>
                <div><dt>Selling or sharing</dt><dd>{a.sell}</dd></div>
                <div><dt>Take it with you</dt><dd>{a.take}</dd></div>
                <div><dt>Delete it</dt><dd>{a.del}</dd></div>
              </dl>
              <p className="cs-app-src">
                {a.src.map(([label, url]) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer">{label} <PiArrowUpRight size={12} aria-hidden /></a>
                ))}
              </p>
            </article>
          ))}
        </div>
        <p className="cs-note">
          Read on 20 October 2026. Policies change, so this reflects what each company said on that date.
          “Not reviewed” means the official source couldn't be checked, not that the app lacks the feature.
        </p>

        <h3 className="cs-h3">Four patterns</h3>
        <div className="cs-cards cs-cards--2">
          {PATTERNS.map(p => <div key={p.title} className="cs-card"><h3>{p.title}</h3><p>{p.note}</p></div>)}
        </div>

        <h3 className="cs-h3">What it means for VISE</h3>
        <ul className="cs-list">
          <li><strong>Make deletion concrete.</strong> The delete dialog can say what no policy above can: it's erased now, with no server copy.</li>
          <li><strong>Own the trade-off.</strong> With no server there's no backup, so VISE should prompt an export now and then, not leave it to chance.</li>
          <li><strong>Keep every claim exact.</strong> “No server” is true and checkable. “100% private” isn't, until phone backups are checked too.</li>
          <li><strong>Privacy is a real difference, not yet a proven reason to choose VISE.</strong> Whether people care enough to type by hand is still hypothesis H6.</li>
        </ul>
      </Section>

      {/* 04 ─────────────────────────────── */}
      <Section id="privacy" index={4} label="Privacy & trust" title={<>Privacy is a design decision, <em>not a settings page.</em></>}>
        <p className="cs-p">
          Anyone should be able to answer six questions about a finance app within a minute of opening it.
          Here's how VISE answers each one today, and where in the app you'd find the answer.
        </p>
        <div className="cs-split">
          <Figure src={`${IMG}/welcome.webp`} alt="VISE welcome screen: Know where your money goes. No bank login needed. Your data stays on this device." frame="phone" />
          <Rows>
            {PRIVACY.map(p => (
              <div key={p.q} className="cs-row cs-row--stack" role="listitem">
                <p className="cs-row-k">{p.q} <Ev kind="built" /></p>
                <p className="cs-row-v">{p.a}</p>
                <p className="cs-row-where">{p.where}</p>
              </div>
            ))}
          </Rows>
        </div>
        <h3 className="cs-h3">How privacy shaped the product</h3>
        <ul className="cs-list">
          <li><strong>Architecture:</strong> no server, account or sync. Privacy is a property of the build, not a promise in a policy.</li>
          <li><strong>Onboarding:</strong> the privacy line sits under the headline, before anyone types a number.</li>
          <li><strong>Input:</strong> manual entry and CSV import instead of a bank connection.</li>
          <li><strong>Settings:</strong> export and delete sit together under Data, and delete offers an export first.</li>
        </ul>
        <h3 className="cs-h3">The trade-off, stated plainly</h3>
        <p className="cs-p">
          Keeping data on the device means no sync between devices and no automatic backup. If the phone is lost,
          the only copy is the last CSV export. Whether people accept that trade, and whether they believe the
          privacy copy at all, is still a hypothesis. <Ev kind="hypothesis" />
        </p>
      </Section>

      {/* 05 ─────────────────────────────── */}
      <Section id="define" index={5} label="Problem & principles" title="Problem, jobs and principles">
        <div className="cs-statement">
          <p className="cs-statement-k">Problem statement <Ev kind="hypothesis" /></p>
          <p className="cs-statement-q">
            People who want to stay on top of everyday spending need a quick, trustworthy answer to “what can I
            still spend this month?”, without giving away bank access or spending time on upkeep.
          </p>
        </div>

        <h3 className="cs-h3">Jobs to be done</h3>
        <ol className="cs-jobs">
          {JOBS.map(j => (
            <li key={j.when}>
              <p><span>When</span> {j.when},</p>
              <p><span>I want to</span> {j.want},</p>
              <p><span>so</span> {j.so}.</p>
            </li>
          ))}
        </ol>

        <h3 className="cs-h3">How might we</h3>
        <ul className="cs-list">{HMW.map(h => <li key={h}>{h}</li>)}</ul>

        <h3 className="cs-h3">Design principles</h3>
        <p className="cs-p">Drawn from the hypotheses, so they'll be revised when research comes in.</p>
        <ol className="cs-spine">
          {PRINCIPLES.map((p, i) => (
            <li key={p.name}>
              <span className="cs-spine-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="cs-spine-body">
                <p className="cs-spine-q">{p.name}</p>
                <p className="cs-spine-a">{p.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 ─────────────────────────────── */}
      <Section id="priorities" index={6} label="Priorities" title="What's essential, and what can wait">
        <div className="cs-prio">
          {PRIORITIES.map(t => (
            <div key={t.tier} className="cs-prio-col">
              <p className="cs-prio-h">{t.tier}</p>
              <ul>
                {t.items.map(i => <li key={i.name}><span>{i.name}</span><Ev kind={i.kind} /></li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="cs-note">
          <strong>An honest note on order.</strong> We built most of the Must and Should features before running any
          research. The right order is the other way round. So the test plan treats these features as things to
          check, not as settled, and any of them can move down the list.
        </p>
      </Section>

      {/* 07 ─────────────────────────────── */}
      <Section id="structure" index={7} label="IA & flows" title={<>Five tabs, <em>thirteen flows.</em></>}>
        <p className="cs-p">
          Each tab answers one question. Budgets gets its own tab, rather than sitting inside the dashboard,
          because “what can I still spend?” is the question VISE is built around. The desktop design adds Goals
          to the sidebar.
        </p>
        <ol className="cs-tabs">
          {TABS.map((t, i) => (
            <li key={t.name}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{t.name}</strong>
              <em>{t.q}</em>
            </li>
          ))}
        </ol>
        <Figure src={`${IMG}/flows.webp`} alt="Thirteen VISE user flows from onboarding to data export, with decision points and error paths"
                caption="Thirteen flows mapped in Figma, from first launch to exporting data, with every decision point and error path." />
        <h3 className="cs-h3">Where people might get stuck</h3>
        <div className="cs-cards cs-cards--2">
          {FRICTION.map(f => (
            <div key={f.title} className="cs-card"><h3>{f.title}</h3><p>{f.note}</p></div>
          ))}
        </div>
      </Section>

      {/* 08 ─────────────────────────────── */}
      <Section id="system" index={8} label="Design system" title="A design system for money">
        <p className="cs-p">
          Four layers, each built only from the one before it. The same names live in Figma and in one
          <code> tokens.ts</code>, so a change in one place reaches every screen, in light and dark.
        </p>
        <ol className="cs-spine">
          {TOKENS.map((t, i) => (
            <li key={t.name}>
              <span className="cs-spine-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="cs-spine-body">
                <p className="cs-spine-q">{t.name}</p>
                <p className="cs-spine-name">{t.tech}</p>
                <p className="cs-spine-a">{t.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="cs-h3">Colour that means something</h3>
        <Figure src={`${IMG}/colour.webp`} alt="VISE semantic colour tokens for brand, surface, content, border, feedback and finance" />
        <ul className="cs-list">
          <li><strong>Spending is neutral.</strong> Spending money isn't an error, so expenses are dark grey, not red. Red is kept for going over a budget.</li>
          <li><strong>Over budget always has words.</strong> Red is paired with an “OVER BUDGET” label, so it still reads without colour.</li>
          <li><strong>Contrast is written into the token.</strong> Info teal is 3.5:1 on light, so it's documented as unfit for small text. Dark mode swaps the primary green for a lighter one to stay AA.</li>
        </ul>

        <h3 className="cs-h3">Two typefaces, two jobs</h3>
        <div className="cs-type">
          {TYPE.map(t => (
            <div key={t.token} className="cs-type-row">
              <div className="cs-type-meta">
                <p className="cs-type-token">{t.token}</p>
                <p className="cs-type-spec">{t.spec}</p>
              </div>
              <p className="cs-type-sample" style={t.style}>{t.sample}</p>
            </div>
          ))}
        </div>
        <p className="cs-p">
          Manrope keeps the interface friendly. IBM Plex Mono is used for every amount, because its equal-width
          digits line figures up in lists, so you can compare amounts at a glance.
        </p>

        <h3 className="cs-h3">Components and their states</h3>
        <Figure src={`${IMG}/components.webp`} alt="VISE components: summary cards, budget cards in on-track, near-limit and over-budget states, transaction rows, charts and goal cards" />
      </Section>

      {/* 09 ─────────────────────────────── */}
      <Section id="screens" index={9} label="Key screens" title="Key screens, and why they look that way">
        <div className="cs-stage">
          <span className="cs-wip-tag">UI not final</span>
          <ol className="cs-phones">
            {PHONES.map((s, i) => (
              <li key={s.src}>
                <Figure src={`${IMG}/${s.src}.webp`} alt={`VISE ${s.cap} screen`} frame="phone" />
                <p className="cs-phone-cap"><span>{String(i + 1).padStart(2, "0")}</span>{s.cap}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="cs-decision cs-decision--split">
          <Figure src={`${IMG}/budgets.webp`} alt="Budgets screen with €573.10 left to spend and a Shopping over-budget alert" frame="phone" />
          <div>
            <h3>Budgets: the answer comes first</h3>
            <ul>
              <li>“Left to spend this month” is the biggest thing on the screen.</li>
              <li>Spending outside any budget is called out rather than hidden.</li>
              <li>The alert names the category and the amount, so it says what to do next.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision cs-decision--split">
          <Figure src={`${IMG}/tx.webp`} alt="Transactions screen grouped by day with daily totals" frame="phone" />
          <div>
            <h3>Transactions: grouped the way you remember</h3>
            <ul>
              <li>Grouped by day with a daily total, because people recall spending by day.</li>
              <li>Income in green, spending in neutral ink.</li>
              <li>Search and filters sit at the top, for finding one purchase fast.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <Figure src={`${IMG}/desktop.webp`} alt="VISE desktop dashboard with summary cards, spending chart, category budgets and goals" />
          <div>
            <h3>Desktop: same system, more at once</h3>
            <ul>
              <li>Bottom tabs become a sidebar. Swipe actions on phone become row actions on hover.</li>
              <li>The Predicted card has a dashed border, and future weeks in the chart are dashed too.</li>
              <li>The chart has a one-line text summary underneath, readable without the chart.</li>
              <li>Tablet layouts are not designed yet. <Ev kind="planned" /></li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 11 ─────────────────────────────── */}
      <Section id="review" index={11} label="Expert review" title={<>Expert review: <em>nine things to fix.</em></>}>
        <p className="cs-p">
          The current designs checked against Nielsen's usability heuristics, WCAG 2.2 AA and platform guidelines.
          Contrast was measured from the colour tokens, not judged by eye. Severity runs from 1 (cosmetic) to 4
          (blocks the task). <Ev kind="reviewed" />
        </p>
        <ol className="cs-findings">
          {FINDINGS.map(f => (
            <li key={f.title} className="cs-finding">
              <div className="cs-finding-top">
                <span className={`cs-sev cs-sev--${f.sev === "?" ? "q" : f.sev}`} aria-label={f.sev === "?" ? "Severity to check" : `Severity ${f.sev}`}>
                  {f.sev === "?" ? "Check" : `Sev ${f.sev}`}
                </span>
                <h3>{f.title}</h3>
              </div>
              <p className="cs-finding-where">{f.where} · {f.rule}</p>
              <dl>
                <div><dt>What's wrong</dt><dd>{f.issue}</dd></div>
                <div><dt>Recommended fix</dt><dd>{f.fix}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        <h3 className="cs-h3">What already works</h3>
        <ul className="cs-list">{WORKS.map(w => <li key={w}>{w}</li>)}</ul>
        <p className="cs-note">
          An expert review finds problems a designer can see. It can't say which ones real people trip over, so
          every fix here gets checked again in usability testing. Dark mode hasn't been measured yet.
        </p>
      </Section>

      {/* 12 ─────────────────────────────── */}
      <Section id="engineering" index={12} label="Engineering" title={<>Built so the design <em>holds up.</em></>}>
        <p className="cs-p">
          As UX Engineer I take the design into code. The layers below are why the privacy promise is real, and why
          error messages can point at the exact field that's wrong.
        </p>
        <ol className="cs-spine">
          {LAYERS.map((l, i) => (
            <li key={l.name}>
              <span className="cs-spine-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="cs-spine-body">
                <p className="cs-spine-q">{l.name}</p>
                <p className="cs-spine-name">{l.tech}</p>
                <p className="cs-spine-a">{l.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="cs-stats">
          <div><strong>0</strong><span>servers: offline-first by design</span></div>
          <div><strong>13</strong><span>end-to-end flows drive the real app, including export and delete-all</span></div>
          <div><strong>6</strong><span>CI workflows on every pull request</span></div>
        </div>
      </Section>

      {/* 11 ─────────────────────────────── */}
      <Section id="testing" index={11} label="Usability testing" title="Usability test plan">
        <p className="cs-p">
          Seven tasks on a real Android build, run one to one and thinking aloud. For each task we record completion,
          time, errors and a 1 to 5 confidence rating. <Ev kind="planned" />
        </p>
        <ol className="cs-tasks">
          {TASKS.map((t, i) => (
            <li key={t.goal} className="cs-task">
              <p className="cs-task-h"><span>T{i + 1}</span>{t.goal}</p>
              <dl>
                <div><dt>Scenario</dt><dd>{t.scenario}</dd></div>
                <div><dt>Task</dt><dd>{t.task}</dd></div>
                <div><dt>Watch for</dt><dd>{t.watch}</dd></div>
                <div><dt>Likely problem</dt><dd>{t.risk}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
        <p className="cs-note">
          Results will be added here as they come in, including the tasks people struggled with. Each problem
          found becomes an entry in the iteration log below.
        </p>
      </Section>

      {/* 12 ─────────────────────────────── */}
      <Section id="iterations" index={12} label="Iteration log" title="Iteration log">
        <p className="cs-p">Every change gets the same six steps, so a fix is backed by evidence rather than taste:</p>
        <ol className="cs-steps">
          {LOG_STEPS.map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}
        </ol>
        <h3 className="cs-h3">Layout issues found while building</h3>
        <p className="cs-p">
          These turned up during implementation. A cause only counts as <strong>confirmed</strong> once it's been
          reproduced, isolated and the fix proven. Until then it's a suspect.
        </p>
        <div className="cs-issues">
          {ISSUES.map(x => (
            <div key={x.title} className="cs-issue">
              <div className="cs-issue-top"><h4>{x.title}</h4><Ev kind="open" /></div>
              <dl>
                <div><dt>Reproduce on</dt><dd>{x.repro}</dd></div>
                <div><dt>Root cause</dt><dd>Not confirmed yet.</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <p className="cs-p">
          Each fix gets a regression check: an end-to-end flow where it's behavioural, and screenshots on a fixed set
          of devices (small Android, large Android, iPhone, tablet, web at each breakpoint) where it's visual.
        </p>
      </Section>

      {/* 13 ─────────────────────────────── */}
      <Section id="status" index={13} label="Progress & metrics" title={<>Where it stands, <em>and how we'll measure it.</em></>}>
        <ul className="cs-progress-list">
          {DONE.map(d => <li key={d} className="is-done">{d}</li>)}
          {OPEN.map(d => <li key={d} className="is-open">{d}</li>)}
        </ul>
        <h3 className="cs-h3">Success criteria</h3>
        <p className="cs-p">No baselines exist yet. Targets are set after the first round of testing, not before.</p>
        <Rows>
          {METRICS.map(m => (
            <div key={m.name} className="cs-row" role="listitem">
              <p className="cs-row-k">{m.name}</p>
              <p className="cs-row-v">{m.how}</p>
            </div>
          ))}
        </Rows>
      </Section>

      {/* 14 ─────────────────────────────── */}
      <Section id="reflection" index={14} label="Reflection" title="What I've learned so far">
        <div className="cs-cards">
          <div className="cs-card">
            <h3>Research should lead</h3>
            <p>Building first made VISE real, but it means we're testing features rather than choosing them. Next time, interviews come before the first screen.</p>
          </div>
          <div className="cs-card">
            <h3>Privacy is architecture</h3>
            <p>The strongest privacy copy is true because of how the app is built. Design and engineering decided it together.</p>
          </div>
          <div className="cs-card">
            <h3>Design lives in code</h3>
            <p>Shared tokens and end-to-end tests keep the build matching the design. What I want to learn next is whether it works for people.</p>
          </div>
        </div>
        <div className="cs-actions cs-actions--left">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn--ghost">View the code on GitHub <PiArrowUpRight size={17} aria-hidden /></a>
        </div>
      </Section>

    </CaseStudyLayout>
  );
}
