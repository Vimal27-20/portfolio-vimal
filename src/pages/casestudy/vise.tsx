import { PiTrafficCone, PiArrowUpRight } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/vise`;
const REPO = "https://github.com/PassionChips/Vise";

const SECTIONS: CsSection[] = [
  { id: "overview",     label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "stack",        label: "Tech stack" },
  { id: "quality",      label: "Testing & CI" },
  { id: "release",      label: "Release · V1" },
  { id: "design",       label: "Design system" },
  { id: "screens",      label: "App screens" },
];

/* how one tap travels through the app, top to bottom (from the repo README) */
const LAYERS = [
  { name: "Screens",           tech: "React Native + Expo Router",  note: "Onboarding and 5 tabs: Dashboard, Transactions, Budgets, Reports, Settings." },
  { name: "viseCore.ts",       tech: "TypeScript client",           note: "The only file in the app that talks to Rust. Typed mirrors of the Rust JSON types." },
  { name: "Native bridge",     tech: "Expo module · Kotlin / Swift", note: "Passes JSON between JavaScript and the compiled Rust library." },
  { name: "api → service",     tech: "Rust",                         note: "JSON in, JSON out. Every write is validated in Rust before it is saved." },
  { name: "calculations",      tech: "Pure Rust",                    note: "Budget maths, analytics and a next-month spending prediction, with no database." },
  { name: "repository → SQLite", tech: "Diesel + bundled SQLite",   note: "One query file per table; migrations run on connect. Data never leaves the device." },
];

const PHONES = [
  { src: "welcome",   cap: "Welcome" },
  { src: "dash",      cap: "Dashboard" },
  { src: "tx",        cap: "Transactions" },
  { src: "budgets",   cap: "Budgets" },
  { src: "goals",     cap: "Goals" },
  { src: "dash-dark", cap: "Dark mode" },
];

const DONE = [
  "Rust core: schema, migrations, budget maths, analytics, predictions",
  "JSON API + typed TypeScript client",
  "Onboarding saved atomically through the core",
  "Every screen reads and writes real SQLite data (no demo data)",
  "Android build + launch checked in CI on every PR",
];
const OPEN = [
  "V1 Android testing with real users",
  "iOS bridge testing (needs macOS)",
];

export default function ViseCaseStudy() {
  const project = projects.find(p => p.slug === "vise")!;

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        VISE
        <span className="cs-title-sub">A budgeting app with <em>a Rust core.</em></span>
      </h1>
      <p className="cs-lede">
        An offline-first budgeting app for iOS and Android. React Native on the outside, all the logic
        and storage in Rust underneath. I work on it as a UX Engineer, from the design system through
        to the code.
      </p>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Team</dt><dd>Me + a friend</dd></div>
        <div><dt>Stack</dt><dd>React Native · Expo · Rust</dd></div>
        <div><dt>Status</dt><dd>V1 · Android testing</dd></div>
      </dl>
      <div className="cs-actions">
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="cs-btn">View the code on GitHub <PiArrowUpRight size={17} aria-hidden /></a>
      </div>
      <div className="cs-wip-note" role="note">
        <span className="cs-wip-note-icon" aria-hidden><PiTrafficCone size={22} /></span>
        <p>
          <strong>V1 is in Android testing.</strong> We're running testing and production builds with real
          users. Screens and details below may still change before release.
        </p>
      </div>
      <Figure src={`${IMG}/cover.webp`} alt="VISE budgets and dashboard screens in light and dark mode" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="VISE" sections={SECTIONS} header={header}>

      <Section id="overview" index={1} label="Overview" title={<>Your money, <em>on your phone only.</em></>}>
        <p className="cs-p">
          Track income and spending, set monthly and per-category limits, import transactions from CSV and see
          where the month is heading. There is no server, no account and no bank login: everything lives in
          SQLite on the device.
        </p>
        <div className="cs-stats">
          <div><strong>0</strong><span>servers: offline-first by design</span></div>
          <div><strong>1</strong><span>TypeScript file calls Rust</span></div>
          <div><strong>6</strong><span>CI workflows on every PR</span></div>
          <div><strong>13</strong><span>end-to-end test flows</span></div>
        </div>
      </Section>

      <Section id="architecture" index={2} label="Architecture" title={<>Thin UI, <em>all logic in Rust.</em></>}>
        <p className="cs-p">
          Each layer only calls the one below it. The UI never does budget maths or touches the database,
          so the same tested core runs on both platforms.
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
      </Section>

      <Section id="stack" index={3} label="Tech stack" title="What it's built with.">
        <div className="cs-cards">
          <div className="cs-card"><h3>App</h3><p>React Native, Expo, Expo Router, TypeScript, react-native-svg for charts.</p></div>
          <div className="cs-card"><h3>Core</h3><p>Rust (2024 edition), Diesel ORM, bundled SQLite, exact money maths in cents.</p></div>
          <div className="cs-card"><h3>Bridge & tooling</h3><p>Expo native module in Kotlin and Swift, shell scripts that cross-compile Rust for Android and iOS.</p></div>
        </div>
      </Section>

      <Section id="quality" index={4} label="Testing & CI" title="Tested from the maths to the tap.">
        <ul className="cs-list">
          <li><strong>Rust tests:</strong> unit tests for the calculations, a persistence test that reopens a real SQLite file, and a contract test against the JSON API shapes.</li>
          <li><strong>App tests (Vitest):</strong> the bridge client, the onboarding payload, the API contract, and guards against demo data or silent fallbacks.</li>
          <li><strong>End-to-end (Maestro):</strong> 13 flows drive the real app on an emulator, from onboarding and transactions to budgets, settings, CSV export and data surviving a restart.</li>
          <li><strong>CI on every PR:</strong> Rust tests, clippy with zero warnings, rustfmt, TypeScript type-check, app tests, and a full Android build that launches on an emulator.</li>
        </ul>
      </Section>

      <Section id="release" index={5} label="Release · V1" title={<>V1 in <em>Android testing.</em></>}>
        <p className="cs-p">
          V1 is being tested on Android with real users, across testing and production builds. iOS follows once
          the native bridge is verified on a Mac.
        </p>
        <ul className="cs-progress-list">
          {DONE.map(d => <li key={d} className="is-done">{d}</li>)}
          {OPEN.map(d => <li key={d} className="is-open">{d}</li>)}
        </ul>
      </Section>

      <Section id="design" index={6} label="Design system" title="One token file, from Figma to code.">
        <p className="cs-p">
          Colours, spacing, radii and type are defined in Figma and mirrored in a single <code>tokens.ts</code>,
          so the components in the app match the design system one-to-one, in light and dark.
        </p>
      </Section>

      <Section id="screens" index={7} label="App screens" title="The app today.">
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
      </Section>

    </CaseStudyLayout>
  );
}
