import { useState } from "react";
import { PiArrowUpRight, PiPlus, PiMinus } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/vise`;
const REPO = "https://github.com/PassionChips/Vise";

const SECTIONS: CsSection[] = [
  { id: "problem",  label: "The problem" },
  { id: "research", label: "Research & gap" },
  { id: "process",  label: "The process" },
  { id: "features", label: "Key features" },
  { id: "design",   label: "Design system" },
  { id: "build",    label: "How it works" },
  { id: "next",     label: "Where it stands" },
];

/* read from each company's own privacy policy and help pages, 20 Oct 2026 */
const GAP_STATS = [
  { num: "5/5", text: "budgeting apps reviewed keep your data on their own servers" },
  { num: "5/5", text: "offer bank linking, often through a third party such as Plaid" },
  { num: "30",  text: "days is a typical wait to delete your data, with backups kept longer" },
];
const SOURCES: [string, string][] = [
  ["YNAB",       "https://www.ynab.com/privacy-policy"],
  ["Monarch",    "https://www.monarch.com/privacy"],
  ["Emma",       "https://emma-app.com/privacy"],
  ["Goodbudget", "https://goodbudget.com/privacy/"],
  ["Wallet",     "https://budgetbakers.com/en/privacy/"],
];

/* the route from problem to product; "now" marks where the project actually is */
const STEPS = [
  { name: "Problem",  note: "How much can I still spend this month?" },
  { name: "Research", note: "Five apps and their privacy policies" },
  { name: "Gap",      note: "No budget that stays on your phone" },
  { name: "Define",   note: "Principles and priorities, being refined", now: true },
  { name: "Design",   note: "13 flows and a token-based system" },
  { name: "Build",    note: "A working Android app" },
  { name: "Test",     note: "Expert review done, users next", now: true },
];

const FEATURES = [
  { title: "What's left, first", img: "budgets", alt: "Budgets screen showing €573.10 left to spend",
    text: "The biggest number on screen answers the real question: what can I still spend? Every budget says On track, Near limit or Over budget in words, not only colour." },
  { title: "Add in seconds", img: "tx", alt: "Transactions screen grouped by day",
    text: "Add a purchase from any tab. Spending is grouped by day, the way people remember it, and a slip is one tap from undo." },
  { title: "Private by design", img: "welcome", alt: "Welcome screen: No bank login needed. Your data stays on this device.",
    text: "No bank login, no account, no server. Everything stays on the phone, and you can export or delete all of it in one step." },
];

const PHONES = [
  { src: "welcome",   cap: "Welcome" },
  { src: "dash",      cap: "Dashboard" },
  { src: "tx",        cap: "Transactions" },
  { src: "budgets",   cap: "Budgets" },
  { src: "goals",     cap: "Goals" },
  { src: "dash-dark", cap: "Dark mode" },
];

export default function ViseCaseStudy() {
  const project = projects.find(p => p.slug === "vise")!;
  const [open, setOpen] = useState(0);
  const feature = FEATURES[open];

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        VISE
        <span className="cs-title-sub">Budgeting that stays <em>on your phone.</em></span>
      </h1>
      <p className="cs-lede">
        A simple budgeting app that tells you what you can still spend, without asking for your bank login.
      </p>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Team</dt><dd>Me + a friend</dd></div>
        <div><dt>Timeline</dt><dd>2026 · ongoing</dd></div>
        <div><dt>Status</dt><dd className="live">Defining · V1 testing</dd></div>
      </dl>
      <Figure src={`${IMG}/cover.webp`} alt="VISE budgets and dashboard screens in light and dark mode" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="VISE" sections={SECTIONS} header={header}>

      <Section id="problem" index={1} label="The problem" title="It started with one question">
        <p className="cs-p cs-p--lead">
          <strong>“How much can I still spend this month?”</strong> Small daily spends add up unnoticed, and by
          mid-month the answer is a guess.
        </p>
        <p className="cs-p">
          Budgeting apps promise that answer, but most start by asking for your bank login, and it's rarely clear
          where your money data goes after that.
        </p>
      </Section>

      <Section id="research" index={2} label="Research & gap" title={<>What the research <em>found.</em></>}>
        <p className="cs-p">I reviewed five popular budgeting apps through their own privacy policies and help pages.</p>
        <div className="cs-stats">
          {GAP_STATS.map(s => <div key={s.text}><strong>{s.num}</strong><span>{s.text}</span></div>)}
        </div>
        <div className="cs-statement">
          <p className="cs-statement-k">The gap</p>
          <p className="cs-statement-q">None of them keeps your money data only on your phone. That's the space VISE is built for.</p>
        </div>
        <p className="cs-sources">
          Sources, read Oct 2026:{" "}
          {SOURCES.map(([name, url], i) => (
            <span key={name}>{i > 0 && " · "}<a href={url} target="_blank" rel="noopener noreferrer">{name}</a></span>
          ))}
        </p>
      </Section>

      <Section id="process" index={3} label="The process" title={<>From problem <em>to product.</em></>}>
        <ol className="cs-route">
          {STEPS.map((s, i) => (
            <li key={s.name} className={s.now ? "is-now" : undefined}>
              <span className="cs-route-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="cs-route-name">{s.name}{s.now && <em>Now</em>}</p>
              <p className="cs-route-note">{s.note}</p>
            </li>
          ))}
        </ol>
        <p className="cs-p">
          The app was built fast to make the idea real. Now the expert review has sent it back to Define,
          to sharpen the problem before testing with users.
        </p>
      </Section>

      <Section id="features" index={4} label="Key features" title="Three key features">
        <div className="cs-feature">
          <Figure key={feature.img} src={`${IMG}/${feature.img}.webp`} alt={feature.alt} frame="phone" />
          <ul className="cs-acc">
            {FEATURES.map((f, i) => (
              <li key={f.title} className={i === open ? "is-open" : undefined}>
                <button type="button" aria-expanded={i === open} aria-controls={`feat-${i}`} onClick={() => setOpen(i)}>
                  {i === open ? <PiMinus size={18} aria-hidden /> : <PiPlus size={18} aria-hidden />}
                  {f.title}
                </button>
                <p id={`feat-${i}`} hidden={i !== open}>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="design" index={5} label="Design system" title="A design system for money">
        <p className="cs-p">
          Manrope for the interface, IBM Plex Mono for every amount so figures line up. Colours are named by
          meaning, and spending stays neutral: red is kept for going over budget.
        </p>
        <div className="cs-duo">
          <Figure src={`${IMG}/flows.webp`} alt="Thirteen VISE user flows with decision points and error paths" caption="13 user flows" />
          <Figure src={`${IMG}/colour.webp`} alt="VISE semantic colour tokens" caption="Semantic colour, light and dark" />
        </div>
      </Section>

      <Section id="build" index={6} label="How it works" title="How it works">
        <p className="cs-p">
          <strong>VISE is more than a prototype: it's a working Android app.</strong> As UX Engineer I take it from
          Figma to code. The screens run on a Rust core with the database on the phone, so the privacy promise is
          built in, not just written down.
        </p>
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

      <Section id="next" index={7} label="Where it stands" title={<>Not finished, <em>on purpose.</em></>}>
        <p className="cs-p">
          An expert review of the designs found nine things to fix. The biggest: the dashboard and the budgets
          screen show two different “left” numbers that are easy to confuse.
        </p>
        <p className="cs-p">
          Next come user interviews and a beta with Android testers, to check the core bet: <strong>will people
          log spending by hand if it only takes seconds?</strong>
        </p>
        <div className="cs-actions cs-actions--left">
          <a href={REPO} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn--ghost">View the code <PiArrowUpRight size={17} aria-hidden /></a>
        </div>
      </Section>

    </CaseStudyLayout>
  );
}
