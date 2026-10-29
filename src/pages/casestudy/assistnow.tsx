import { PiArrowUpRight } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/assist`;
const BEHANCE = "https://www.behance.net/gallery/217274669/ASSIST-NOW";

const SECTIONS: CsSection[] = [
  { id: "idea",     label: "The idea" },
  { id: "insights", label: "My insights" },
  { id: "flow",     label: "UX flow" },
  { id: "ui",       label: "UI design" },
  { id: "system",   label: "Design system" },
  { id: "next",     label: "Reflection" },
];

/* what I noticed in ServiceNow, and the answer in Assist Now */
const INSIGHTS = [
  { saw: "Key numbers sit inside long lists and reports.",       did: "Three cards up top: total requests, incidents and breached SLAs." },
  { saw: "SLA breaches are easy to notice too late.",            did: "A breached count on the home screen, and an activity feed that flags requests about to breach." },
  { saw: "Tickets, meetings and messages live in separate places.", did: "Events and messages sit beside the work, on the same screen." },
  { saw: "Seeing trends means building a report first.",         did: "A ready-made Customer Analytical Dashboard (CAD) with charts by type, source and priority." },
  { saw: "Agents look at the screen all day.",                    did: "Full light and dark modes." },
];

/* the menu, grouped the way the design groups it */
const IA = [
  { group: "Menu",         items: ["Dashboard", "CAD", "Calendar"] },
  { group: "Requirement",  items: ["Request", "Incidents", "Status"] },
  { group: "Organization", items: ["SLA reports", "Keep", "Settings"] },
];

/* a service desk agent's main path through the app */
const FLOW = [
  { name: "Dashboard", note: "See requests, incidents and breaches at a glance" },
  { name: "Spot",      note: "The activity feed flags a request about to breach" },
  { name: "Open",      note: "Go to Request or Incidents to work on it" },
  { name: "Update",    note: "Change its status as it moves along" },
  { name: "Review",    note: "Check SLA reports for breaches" },
  { name: "Analyse",   note: "Use CAD for trends by type, source and priority" },
];

/* ServiceNow area → where it lives in Assist Now */
const MAP = [
  { sn: "Incident Management", an: "Incidents, plus the incident count on the dashboard" },
  { sn: "Request Management",  an: "Request, plus the request count and activity feed" },
  { sn: "Service Level Management", an: "Breached state card and SLA reports" },
  { sn: "Reporting and analytics",  an: "Customer Analytical Dashboard (CAD)" },
];

export default function AssistNowCaseStudy() {
  const project = projects.find(p => p.slug === "assist-now")!;

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        Assist Now
        <span className="cs-title-sub">A new skin for <em>ServiceNow.</em></span>
      </h1>
      <p className="cs-lede">
        A concept: the ServiceNow service desk, redesigned with a cleaner, more visual interface shaped by my own insights.
      </p>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Timeline</dt><dd>1 week</dd></div>
        <div><dt>Type</dt><dd>UI concept</dd></div>
        <div><dt>Tools</dt><dd>Figma · Photoshop</dd></div>
      </dl>
      <div className="cs-actions">
        <a href={BEHANCE} target="_blank" rel="noopener noreferrer" className="cs-btn">View on Behance <PiArrowUpRight size={17} aria-hidden /></a>
      </div>
      <Figure src={`${IMG}/cover.webp`} alt="Assist Now dashboard in light and dark mode on a tablet" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="Assist Now" sections={SECTIONS} header={header}>

      <Section id="idea" index={1} label="The idea" title="Same jobs, a new skin">
        <p className="cs-p cs-p--lead">
          The simplest way to manage timelines, monitor deadlines, and track assigned tasks and meetings.
        </p>
        <p className="cs-p">
          Assist Now keeps what a ServiceNow service desk does: requests, incidents and SLAs. It changes how that
          work looks and feels, with graphs, clear numbers and everything an agent needs on one screen.
        </p>
        <p className="cs-sources">A concept for a portfolio. Not affiliated with or built for ServiceNow.</p>
      </Section>

      <Section id="insights" index={2} label="My insights" title={<>What I noticed, <em>and what I changed.</em></>}>
        <dl className="cs-changes">
          {INSIGHTS.map(i => <div key={i.saw}><dt>{i.saw}</dt><dd>{i.did}</dd></div>)}
        </dl>
      </Section>

      <Section id="flow" index={3} label="UX flow" title="The UX flow">
        <h3 className="cs-h3">Information architecture</h3>
        <p className="cs-p">The menu is grouped into three areas: everyday views, the tickets themselves, and team tools.</p>
        <div className="cs-cards">
          {IA.map(g => (
            <div key={g.group} className="cs-card">
              <h3>{g.group}</h3>
              <ul className="cs-ia">{g.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <h3 className="cs-h3">An agent's main path</h3>
        <ol className="cs-route">
          {FLOW.map((s, i) => (
            <li key={s.name}>
              <span className="cs-route-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="cs-route-name">{s.name}</p>
              <p className="cs-route-note">{s.note}</p>
            </li>
          ))}
        </ol>

        <h3 className="cs-h3">From ServiceNow to Assist Now</h3>
        <dl className="cs-changes">
          {MAP.map(m => <div key={m.sn}><dt>{m.sn}</dt><dd>{m.an}</dd></div>)}
        </dl>
      </Section>

      <Section id="ui" index={4} label="UI design" title="The screens">
        <div className="cs-decision">
          <Figure src={`${IMG}/o-dash.webp`} alt="Assist Now dashboard, light mode" />
          <div>
            <h3>Dashboard</h3>
            <ul>
              <li>Three summary cards: requests, incidents and breached state, each with its change.</li>
              <li>Ticket statistics across the year, filterable by type.</li>
              <li>Activity feed, events, messages and recent request activity on one screen.</li>
            </ul>
          </div>
        </div>
        <div className="cs-decision">
          <Figure src={`${IMG}/o-cad.webp`} alt="Customer Analytical Dashboard with charts by type, source and priority" />
          <div>
            <h3>Customer Analytical Dashboard</h3>
            <ul>
              <li>Tickets by type, source and priority, as charts instead of tables.</li>
              <li>Seven-day counts: created, closed, pending, open, duplicate, and satisfaction rate.</li>
              <li>Quick actions: new file, share, import and support.</li>
            </ul>
          </div>
        </div>
        <div className="cs-decision">
          <Figure src={`${IMG}/o-dark.webp`} alt="Assist Now dashboard, dark mode" />
          <div>
            <h3>Dark mode</h3>
            <ul>
              <li>Every screen in both themes, for long days at the screen.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="system" index={5} label="Design system" title="Design system">
        <p className="cs-p">
          Poppins throughout. Soft green, yellow and red tints separate requests, incidents and breaches, with one
          blue for actions.
        </p>
        <div className="cs-duo">
          <Figure src={`${IMG}/o-style.webp`} alt="Assist Now iconography and UI elements" caption="Icons and UI elements" />
          <Figure src={`${IMG}/o-palette.webp`} alt="Assist Now colour palette and Poppins typography" caption="Colour and type" />
        </div>
      </Section>

      <Section id="next" index={6} label="Reflection" title={<>A concept, <em>a week long.</em></>}>
        <p className="cs-p">
          Assist Now was a quick exploration of how a familiar enterprise tool could feel lighter. If I took it
          further, I'd test it with service desk agents, put the tickets closest to breaching on the home screen,
          and darken the action blue so white text passes WCAG AA contrast.
        </p>
      </Section>

    </CaseStudyLayout>
  );
}
