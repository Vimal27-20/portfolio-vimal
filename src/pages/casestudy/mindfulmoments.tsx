import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, Section, type CsSection } from "./layout";

const FIGMA_URL = "https://www.figma.com/design/ykJApcdwM0KMk4cDloI0Ix/Untitled?node-id=2-3";
const IMG = `${import.meta.env.BASE_URL}img/ride`;

const SECTIONS: CsSection[] = [
  { id: "moment",    label: "The moment" },
  { id: "insight",   label: "Insight" },
  { id: "idea",      label: "The idea" },
  { id: "passenger", label: "Passenger flow" },
  { id: "driver",    label: "Driver flow" },
  { id: "system",    label: "Design system" },
  { id: "ending",    label: "The ending" },
];

const PASSENGER = [
  { src: "p1", cap: "On the way" },
  { src: "p2", cap: "1 min out: a gentle nudge" },
  { src: "p3", cap: "Arrived: final check" },
  { src: "p4", cap: "“Not yet”: take your time" },
  { src: "p5", cap: "Closure: belongings first" },
];
const DRIVER = [
  { src: "d1", cap: "Drop-off" },
  { src: "d2", cap: "Check the back seat" },
  { src: "d3", cap: "Confirm later: re-prompt" },
  { src: "d4", cap: "Both confirmed" },
];

function PhoneFlow({ steps, start = 1 }: { steps: { src: string; cap: string }[]; start?: number }) {
  return (
    <div className="cs-stage">
      <ol className="cs-phones">
        {steps.map((s, i) => (
          <li key={s.src}>
            <Figure src={`${IMG}/${s.src}.webp`} alt={s.cap} frame="phone" />
            <p className="cs-phone-cap"><span>{String(start + i).padStart(2, "0")}</span>{s.cap}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function MindfulMomentsCaseStudy() {
  const project = projects.find(p => p.slug === "mindful-moments")!;

  const header = (
    <header className="cs-header">
      <span className="cs-pill">{project.tag}</span>
      <h1 className="cs-title">
        Remembering what matters
        <span className="cs-title-sub">The last 10 seconds of a ride, <em>redesigned.</em></span>
      </h1>
      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Timeline</dt><dd>{project.duration}</dd></div>
        <div><dt>Platform</dt><dd>iOS · Passenger + Driver</dd></div>
        <div><dt>Tools</dt><dd>Figma</dd></div>
      </dl>
      <div className="cs-actions">
        <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="cs-btn">Open prototype in Figma ↗</a>
      </div>
      <Figure src={`${IMG}/cover.webp`} alt="Mindful ride closure screens" className="cs-cover" />
      <p className="cs-disclaimer">Independent concept. Not affiliated with Uber or any ride-hailing company.</p>
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="Remembering what matters" sections={SECTIONS} header={header} accent="#16a34a">

      <Section id="moment" index={1} label="The moment" title={<>A few taps to get there. <em>One second</em> to forget.</>}>
        <ol className="cs-beats">
          <li><span>1</span>The car stops.</li>
          <li><span>2</span>You're already thinking about what's next.</li>
          <li><span>3</span>Ten minutes later: <em>“Where's my phone?”</em></li>
        </ol>
        <p className="cs-p">
          What follows is anxious calls, support tickets and long waits. I wanted to stop that
          before it starts.
        </p>
      </Section>

      <Section id="insight" index={2} label="Insight" title={<>Rides end with a payment, <em>not a pause.</em></>}>
        <p className="cs-p">
          Competitor benchmarking and social listening (Reddit, Facebook groups, rider forums)
          pointed the same way: <strong>people don't forget because of bad design. They forget because
          the exit is rushed.</strong>
        </p>
        <Figure src={`${IMG}/iceberg.webp`} alt="Iceberg of hidden causes: cognitive overload, time pressure, unfamiliar places, communication gap, no exit protocol" />
      </Section>

      <Section id="idea" index={3} label="The idea" title={<>One shared check, <em>before the trip closes.</em></>}>
        <div className="cs-duo">
          <div className="cs-card">
            <span className="cs-card-num">P</span>
            <h3>Passenger</h3>
            <p>A nudge one minute out, then a quick “All set?” on arrival.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-num">D</span>
            <h3>Driver</h3>
            <p>“Belongings taken?” before End trip. Can't stop? Confirm later.</p>
          </div>
        </div>
      </Section>

      <Section id="passenger" index={4} label="Passenger flow" title="Remind early, check once, then let go.">
        <PhoneFlow steps={PASSENGER} />
        <ul className="cs-list cs-list--tight">
          <li><strong>Nudge before the stop</strong>, while there's still time to gather things.</li>
          <li><strong>“Not yet” never blocks.</strong> The driver is told you're checking.</li>
          <li><strong>The receipt leads with</strong> “Belongings secured”.</li>
        </ul>
      </Section>

      <Section id="driver" index={5} label="Driver flow" title="A two-second habit for drivers.">
        <PhoneFlow steps={DRIVER} start={6} />
        <ul className="cs-list cs-list--tight">
          <li><strong>Dark sheets</strong> keep the driver app calm at night and distinct from the passenger app.</li>
          <li><strong>Confirm later</strong> re-prompts after 30 s, so busy drop-offs aren't slowed down.</li>
        </ul>
      </Section>

      <Section id="system" index={6} label="Design system" title={<>Dark map, light sheets, <em>one green.</em></>}>
        <p className="cs-p">
          16 colour tokens, 7 text styles, 15 icons and 7 components, all built as Figma variables and
          components so every screen stays consistent.
        </p>
        <Figure src={`${IMG}/design-system.webp`} alt="Mindful Ride design system: colours, type, icons, components" />
      </Section>

      <Section id="ending" index={7} label="The ending" title="Peace of mind, not just belongings.">
        <div className="cs-ending">
          <Figure src={`${IMG}/ending.webp`} alt="A relaxed passenger walking away with his bag" />
          <div>
            <blockquote className="cs-quote">
              “A small moment of mindfulness at the right time turns the end of a ride from rushed to reassuring.”
            </blockquote>
            <p className="cs-p"><strong>Next:</strong> test the timing of the nudge with real riders, and measure the drop in lost-item reports.</p>
          </div>
        </div>
      </Section>

    </CaseStudyLayout>
  );
}
