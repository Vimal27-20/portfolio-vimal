import { PiArrowUpRight } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/assist`;
const BEHANCE = "https://www.behance.net/gallery/217274669/ASSIST-NOW";

const SECTIONS: CsSection[] = [
  { id: "original",  label: "The original" },
  { id: "problem",   label: "Looking back" },
  { id: "reference", label: "Reference" },
  { id: "process",   label: "The process" },
  { id: "redesign",  label: "The redesign" },
  { id: "features",  label: "New features" },
  { id: "next",      label: "Where it stands" },
];

/* audit of the original boards; the contrast figure is measured from its palette */
const ISSUES = [
  "Two menu items look selected at once: Dashboard and CAD.",
  "Rising breaches show as “+24%”, styled like good news. All three cards repeat “+14% inc”.",
  "Stacked percentage bars without totals: 60% of what?",
  "Status relies on colour alone, in cards and charts.",
  "A large profile card takes a fifth of the screen, while tickets about to breach aren't shown at all.",
  "White on the brand blue #397EFD measures 3.77:1, under the 4.5:1 WCAG AA minimum.",
];

const PATTERNS = [
  { title: "Work first",
    text: "Agent workspaces open on lists and records, with a side panel for context.",
    src: "https://www.servicenow.com/docs/bundle/zurich-it-service-management/page/product/service-operations-workspace/concept/view-inc-record-info-contextual-sidepanel.html" },
  { title: "SLA time is always visible",
    text: "Timers turn yellow when a ticket is in danger of breaching, and red once it has.",
    src: "https://www.servicenow.com/docs/r/Recj91eIo1YnsOabQjgskg/MYx4Qo6hkU_sr430_rV3uQ" },
  { title: "Help in context",
    text: "Now Assist summarises an incident. Predictive Intelligence suggests the assignment group and similar incidents.",
    src: "https://www.servicenow.com/docs/r/it-service-management/predictive-intelligence-for-incident.html" },
];

const STEPS = [
  { name: "Audit",     note: "Six issues in the original" },
  { name: "Benchmark", note: "How ServiceNow handles the same jobs" },
  { name: "Reframe",   note: "Counts → the next ticket to work on" },
  { name: "Redesign",  note: "A work-first home" },
  { name: "Concepts",  note: "Two new features" },
  { name: "Test",      note: "With service desk agents", now: true },
];

const CHANGES = [
  { k: "One home",        v: "“My work” is the only selected item, and the menu is grouped by job: Work, Insights, Help." },
  { k: "SLA first",       v: "The queue is sorted by time left, with a timer on every row." },
  { k: "Honest numbers",  v: "Four counts an agent acts on, each saying which direction is good." },
  { k: "Never colour alone", v: "Every status has a word and an icon. The original pastels stay, as status backgrounds." },
  { k: "Accessible blue", v: "#1D5BD8 gives white text 5.93:1. Inter replaces Poppins for denser tables of numbers." },
];

export default function AssistNowCaseStudy() {
  const project = projects.find(p => p.slug === "assist-now")!;

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        Assist Now
        <span className="cs-title-sub">An IT service desk, redesigned <em>around the work.</em></span>
      </h1>
      <p className="cs-lede">
        I first designed Assist Now as a one-week UI project. Looking back, it showed the numbers but not the work.
        This is a redesign concept, using ServiceNow as the reference.
      </p>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Original</dt><dd>1-week UI project</dd></div>
        <div><dt>Redesign</dt><dd>Concept · 2026</dd></div>
        <div><dt>Reference</dt><dd>ServiceNow</dd></div>
      </dl>
      <div className="cs-actions">
        <a href={BEHANCE} target="_blank" rel="noopener noreferrer" className="cs-btn">See the original on Behance <PiArrowUpRight size={17} aria-hidden /></a>
      </div>
      <Figure src={`${IMG}/n-home.webp`} alt="Redesigned Assist Now home: a queue sorted by SLA time left" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="Assist Now" sections={SECTIONS} header={header}>

      <Section id="original" index={1} label="The original" title="Where it started">
        <p className="cs-p">
          A dashboard for service desk teams: totals for requests, incidents and breaches, plus a Customer Analytical
          Dashboard of charts. Light and dark mode, designed in a week.
        </p>
        <div className="cs-duo">
          <Figure src={`${IMG}/o-dash.webp`} alt="Original Assist Now dashboard, light mode" caption="Dashboard" />
          <Figure src={`${IMG}/o-cad.webp`} alt="Original Customer Analytical Dashboard" caption="Customer Analytical Dashboard" />
        </div>
      </Section>

      <Section id="problem" index={2} label="Looking back" title={<>It showed the numbers, <em>not the work.</em></>}>
        <p className="cs-p cs-p--lead">An agent opens this screen to find out what to do next. The original couldn't tell them.</p>
        <ul className="cs-list">{ISSUES.map(i => <li key={i}>{i}</li>)}</ul>
      </Section>

      <Section id="reference" index={3} label="Reference" title="What ServiceNow does well">
        <p className="cs-p">ServiceNow is the standard for IT service management. I studied its documentation for three patterns:</p>
        <div className="cs-cards">
          {PATTERNS.map(p => (
            <div key={p.title} className="cs-card">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <a className="cs-card-src" href={p.src} target="_blank" rel="noopener noreferrer">ServiceNow docs <PiArrowUpRight size={12} aria-hidden /></a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="process" index={4} label="The process" title={<>From audit <em>to concept.</em></>}>
        <ol className="cs-route">
          {STEPS.map((s, i) => (
            <li key={s.name} className={s.now ? "is-now" : undefined}>
              <span className="cs-route-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="cs-route-name">{s.name}{s.now && <em>Next</em>}</p>
              <p className="cs-route-note">{s.note}</p>
            </li>
          ))}
        </ol>
        <div className="cs-statement">
          <p className="cs-statement-k">The reframe</p>
          <p className="cs-statement-q">From “how many tickets are there?” to “which ticket needs me next?”</p>
        </div>
      </Section>

      <Section id="redesign" index={5} label="The redesign" title="A home built around the queue">
        <div className="cs-duo">
          <Figure src={`${IMG}/o-dash.webp`} alt="Before: original dashboard" caption="Before" />
          <Figure src={`${IMG}/n-home.webp`} alt="After: redesigned home with an SLA-sorted queue" caption="After" />
        </div>
        <dl className="cs-changes">
          {CHANGES.map(c => <div key={c.k}><dt>{c.k}</dt><dd>{c.v}</dd></div>)}
        </dl>
      </Section>

      <Section id="features" index={6} label="New features" title={<>Two new <em>feature concepts.</em></>}>
        <div className="cs-decision">
          <Figure src={`${IMG}/n-radar.webp`} alt="Breach radar: tickets likely to breach in the next four hours on a timeline, with reasons and a suggested next step" />
          <div>
            <h3>Breach radar: see a breach coming</h3>
            <ul>
              <li>Tickets due to breach in the next 4 hours, on one timeline built from SLA timers.</li>
              <li>Each one says why it's at risk and suggests a next step, such as reassigning.</li>
              <li>The agent decides. Suggestions are labelled as estimates.</li>
            </ul>
          </div>
        </div>
        <div className="cs-decision">
          <Figure src={`${IMG}/n-brief.webp`} alt="Ticket record with a brief in the side panel: issue, work done, suggested step, possible duplicate and similar fixed tickets" />
          <div>
            <h3>Ticket brief: catch up without reading every note</h3>
            <ul>
              <li>The side panel sums up the issue, what's been done and a suggested next step.</li>
              <li>It flags possible duplicates. The original only counted them afterwards.</li>
              <li>Tickets fixed before, with their fix, sit one tab away.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="next" index={7} label="Where it stands" title={<>A concept, <em>not a shipped product.</em></>}>
        <p className="cs-p">
          Next is testing with service desk agents: can they find the ticket that needs them next, and do they trust
          the radar's suggestions? Dark mode for the redesign comes after that.
        </p>
        <p className="cs-p">
          <strong>What changed for me:</strong> the first version was about how a dashboard looks. This one starts
          from what the person using it has to do next.
        </p>
        <p className="cs-sources">Redesign screens use sample data. Original screens are from my Behance project.</p>
      </Section>

    </CaseStudyLayout>
  );
}
