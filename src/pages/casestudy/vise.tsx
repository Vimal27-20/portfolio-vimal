import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, WipVeil, type CsSection } from "./layout";

const IMG = `${import.meta.env.BASE_URL}img/vise`;

const SECTIONS: CsSection[] = [
  { id: "overview",   label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "status",     label: "Where it's at" },
  { id: "foundations",label: "Foundations" },
  { id: "components", label: "Components" },
  { id: "mobile",     label: "Mobile" },
  { id: "desktop",    label: "Desktop · WIP" },
  { id: "flows",      label: "User flows · WIP" },
];

const PHONES = [
  { src: "welcome",   cap: "Welcome" },
  { src: "dash",      cap: "Dashboard" },
  { src: "tx",        cap: "Transactions" },
  { src: "budgets",   cap: "Budgets" },
  { src: "goals",     cap: "Goals" },
  { src: "dash-dark", cap: "Dark mode" },
];

const DONE = ["Foundations, light + dark", "40+ component sets", "iOS screens + empty, loading and error states", "Android, tablet and desktop layouts", "User flows + clickable prototype"];
const OPEN = ["Code Connect mappings", "Dark versions of onboarding and states", "Desktop Reports and Settings"];

export default function ViseCaseStudy() {
  const project = projects.find(p => p.slug === "vise")!;

  const header = (
    <header className="cs-header">
      <span className="cs-pill">{project.tag}</span>
      <span className="cs-status">In progress</span>
      <h1 className="cs-title">
        VISE
        <span className="cs-title-sub">Know where your money <em>goes.</em></span>
      </h1>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Team</dt><dd>Me + a friend</dd></div>
        <div><dt>Platforms</dt><dd>iOS · Android · Tablet · Web</dd></div>
        <div><dt>Status</dt><dd>Design system v0.1</dd></div>
      </dl>
      <div className="cs-wip-note" role="note">
        <span className="cs-wip-note-icon" aria-hidden>🚧</span>
        <p>
          <strong>Work in progress.</strong> VISE is a side project I'm building with a friend, aimed at a
          production release. The screens below aren't final and will change.
        </p>
      </div>
      <Figure src={`${IMG}/cover.webp`} alt="VISE budgets and dashboard screens in light and dark mode" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="VISE" sections={SECTIONS} header={header} accent="#18863c">

      <Section id="overview" index={1} label="Overview" title={<>Budgeting in <em>a minute a day.</em></>}>
        <p className="cs-p">
          Track spending, set budgets for what matters and see where the month is heading. No bank login,
          and your data stays on the device.
        </p>
        <div className="cs-stats">
          <div><strong>40+</strong><span>component sets</span></div>
          <div><strong>4</strong><span>platforms from one system</span></div>
          <div><strong>2</strong><span>themes: light + dark</span></div>
          <div><strong>7</strong><span>token collections</span></div>
        </div>
      </Section>

      <Section id="principles" index={2} label="Principles" title="Built into the tokens, not added later.">
        <div className="cs-principles">
          <div className="cs-card"><h3>Spending isn't an error</h3><p>Spending is shown in a neutral colour. Red is kept for going over budget.</p></div>
          <div className="cs-card"><h3>Estimates look like estimates</h3><p>Predictions use a dashed outline and an “Estimate” label.</p></div>
          <div className="cs-card"><h3>Never colour alone</h3><p>Every status badge has a label: On track, Near limit, Over budget.</p></div>
          <div className="cs-card"><h3>Private by default</h3><p>No bank connection needed to start. Demo data lets you explore first.</p></div>
        </div>
      </Section>

      <Section id="status" index={3} label="Where it's at" title={<>Design system <em>v0.1.</em></>}>
        <ul className="cs-progress-list">
          {DONE.map(d => <li key={d} className="is-done">{d}</li>)}
          {OPEN.map(d => <li key={d} className="is-open">{d}</li>)}
        </ul>
      </Section>

      <Section id="foundations" index={4} label="Foundations" title="Every colour is a semantic token.">
        <Figure src={`${IMG}/colour.webp`} alt="VISE semantic colour tokens, light mode" />
      </Section>

      <Section id="components" index={5} label="Components" title="Finance-first components.">
        <Figure src={`${IMG}/components.webp`} alt="VISE finance components: stat cards, budget cards, transactions, charts, goals" />
      </Section>

      <Section id="mobile" index={6} label="Mobile" title="iOS, light and dark.">
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

      <WipVeil
        title="More coming soon"
        note="Desktop, tablet and the full user flows are still being designed. The complete case study will follow once VISE ships."
      >
        <Section id="desktop" index={7} label="Desktop" title="Same system, 1440 wide.">
          <Figure src={`${IMG}/desktop.webp`} alt="VISE desktop dashboard (work in progress)" frame="browser" />
        </Section>
        <Section id="flows" index={8} label="User flows" title="Every flow mapped.">
          <Figure src={`${IMG}/flows.webp`} alt="VISE user flows (work in progress)" />
        </Section>
      </WipVeil>

    </CaseStudyLayout>
  );
}
