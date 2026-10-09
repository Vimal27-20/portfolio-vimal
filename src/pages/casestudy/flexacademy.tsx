import { useEffect } from "react";
import { PiArrowDown, PiArrowUpRight } from "react-icons/pi";
import { projects } from "../../data/projects";
import CaseStudyLayout, { Figure, ScrollFrame, Section, type CsSection } from "./layout";

const FIGMA_URL =
  "https://www.figma.com/design/pCtrixcWvQBGKKOWfHAPEh/Vimal-Flex-Assignment?node-id=1-3";
const IMG = `${import.meta.env.BASE_URL}img/flex`;

const SECTIONS: CsSection[] = [
  { id: "overview",   label: "Overview" },
  { id: "challenge",  label: "The challenge" },
  { id: "audience",   label: "Audience" },
  { id: "structure",  label: "Page structure" },
  { id: "decisions",  label: "Design decisions" },
  { id: "system",     label: "Visual language" },
  { id: "responsive", label: "Desktop → mobile" },
  { id: "final",      label: "Final design" },
  { id: "reflection", label: "Reflection" },
];

/* the page's narrative, one question per section */
const SPINE = [
  { name: "Hero",            q: "Is this for me?" },
  { name: "Proof ticker",    q: "Is this real?" },
  { name: "The problem",     q: "Do they understand my situation?" },
  { name: "The method",      q: "What will I actually learn?" },
  { name: "Founders",        q: "Who is teaching it?" },
  { name: "Three brands",    q: "Why should I trust them?" },
  { name: "The programme",   q: "What do I get?" },
  { name: "Results",         q: "Has it worked for people like me?" },
  { name: "Fit",             q: "Is it honestly right for me?" },
  { name: "FAQ",             q: "What's the catch?" },
  { name: "Final CTA",       q: "What do I do next?" },
];

const COLORS = [
  { name: "bg/base",            hex: "#f5f4f0" },
  { name: "bg/surface",         hex: "#ecebe7" },
  { name: "bg/dark",            hex: "#171717", dark: true },
  { name: "text/primary",       hex: "#111111", dark: true },
  { name: "text/secondary",     hex: "#647487", dark: true },
  { name: "accent/orange",      hex: "#f15a24", dark: true },
  { name: "accent/orange-text", hex: "#c4400d", dark: true },
  { name: "border/default",     hex: "#d8d7d3" },
];

const TYPE = [
  { token: "Display XL", spec: "Manrope ExtraBold · 88 / 0.95 · −3", sample: "Scale your STR", style: { fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 44, letterSpacing: "-0.035em", lineHeight: 1 } },
  { token: "Display M",  spec: "Manrope SemiBold · 48 / 1.05 · −2",  sample: "1:1 with a founder", style: { fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 30, letterSpacing: "-0.03em" } },
  { token: "Accent",     spec: "Serif italic · used once per headline", sample: "the chaos.", style: { fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: 38, color: "#f15a24" } },
  { token: "Body L",     spec: "Inter Regular · 18 / 1.55",           sample: "Learn the playbook, systems and technology…", style: { fontFamily: "Inter, sans-serif", fontSize: 18, color: "#647487" } },
  { token: "Label",      spec: "IBM Plex Mono Medium · 11 · +16% tracking", sample: "01 / THE PROBLEM", style: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: ".16em" } },
];

const COMPONENTS = ["Button / Primary", "Link / Secondary", "Ticker item", "Row / Pillar", "Card / Founder", "Layer row", "Testimonial card", "Fit list item", "FAQ item"];

// this page shows Flex Academy's own type specimens, so only it loads those faces
const SPECIMEN_FONTS = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600&family=Manrope:wght@600;800&family=IBM+Plex+Mono:wght@500&display=swap";

export default function FlexAcademyCaseStudy() {
  useEffect(() => {
    if (document.querySelector(`link[href="${SPECIMEN_FONTS}"]`)) return;
    const link = Object.assign(document.createElement("link"), { rel: "stylesheet", href: SPECIMEN_FONTS });
    document.head.appendChild(link);
  }, []);

  const project = projects.find(p => p.slug === "flex-academy")!;

  const header = (
    <header className="cs-header">
      <h1 className="cs-title">
        Flex Academy
        <span className="cs-title-sub">Scale your STR without scaling the <em>chaos</em>.</span>
      </h1>
      <p className="cs-lede">
        A landing page that turns busy short-term rental operators into strategy-call bookings.
      </p>

      <dl className="cs-meta">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Project</dt><dd>{project.duration}</dd></div>
        <div><dt>Deliverables</dt><dd>Desktop 1440 · Mobile 390</dd></div>
        <div><dt>Tools</dt><dd>Figma</dd></div>
      </dl>

      <div className="cs-actions">
        <a href="#final" className="cs-btn" onClick={e => { e.preventDefault(); document.getElementById("final")?.scrollIntoView({ behavior: "smooth" }); }}>
          See the final design <PiArrowDown size={17} aria-hidden />
        </a>
        <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn--ghost">
          Open in Figma <PiArrowUpRight size={17} aria-hidden />
        </a>
      </div>

      <Figure src={`${IMG}/hero.webp`} alt="Flex Academy hero section, desktop" frame="browser" className="cs-cover" />
    </header>
  );

  return (
    <CaseStudyLayout project={project} name="Flex Academy" sections={SECTIONS} header={header}>

      {/* 01 ─────────────────────────────── */}
      <Section id="overview" index={1} label="Overview" title={<>One page, one job: <em>book the call.</em></>}>
        <p className="cs-p">
          Flex Academy teaches short-term rental operators the playbook behind <strong>The Flex</strong> and{" "}
          <strong>Base360</strong>. I designed the landing page end to end: story, structure, components and layouts.
        </p>
        <div className="cs-stats">
          <div><strong>11</strong><span>sections, one question each</span></div>
          <div><strong>1</strong><span>primary action, repeated at every decision point</span></div>
          <div><strong>2</strong><span>breakpoints: 1440 and 390</span></div>
          <div><strong>9</strong><span>reusable components</span></div>
        </div>
      </Section>

      {/* 02 ─────────────────────────────── */}
      <Section id="challenge" index={2} label="The challenge" title="Selling a system to people who've seen every course.">
        <div className="cs-cards">
          <div className="cs-card">
            <span className="cs-card-num">A</span>
            <h3>Scepticism</h3>
            <p>Operators have seen every “Airbnb course”. It has to sound like an operator, not a guru.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-num">B</span>
            <h3>Three brands, one story</h3>
            <p>Credibility comes from The Flex and Base360, without confusing who you buy from.</p>
          </div>
          <div className="cs-card">
            <span className="cs-card-num">C</span>
            <h3>A big commitment</h3>
            <p>12 weeks is a big ask, so the page asks for a free call instead.</p>
          </div>
        </div>
      </Section>

      {/* 03 ─────────────────────────────── */}
      <Section id="audience" index={3} label="Audience" title={<>The operator stuck between <em>3 and 30 units.</em></>}>
        <div className="cs-persona">
          <div>
            <p className="cs-persona-h">Today · manual</p>
            <ul className="cs-strike">
              <li>Guest messages answered manually</li>
              <li>Pricing set once a season</li>
              <li>Cleaners tracked in spreadsheets and group chats</li>
              <li>Operations depend too heavily on the owner</li>
            </ul>
          </div>
          <div>
            <p className="cs-persona-h cs-persona-h--accent">Wants · a system</p>
            <ul className="cs-check">
              <li>Unified guest operations</li>
              <li>Smarter, data-led pricing</li>
              <li>Repeatable SOPs for cleaning and maintenance</li>
              <li>Room to grow without being the bottleneck</li>
            </ul>
          </div>
        </div>
        <p className="cs-note">Their own words became the page's “before / after” section.</p>
      </Section>

      {/* 04 ─────────────────────────────── */}
      <Section id="structure" index={4} label="Page structure" title={<>A page built as a <em>conversation.</em></>}>
        <p className="cs-p">
          I wrote the questions a sceptical operator asks, in order. Each section answers one.
        </p>
        <ol className="cs-spine">
          {SPINE.map((s, i) => (
            <li key={s.name}>
              <span className="cs-spine-num">{String(i).padStart(2, "0")}</span>
              <div className="cs-spine-body">
                <p className="cs-spine-q">“{s.q}”</p>
                <p className="cs-spine-name">{s.name}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 05 ─────────────────────────────── */}
      <Section id="decisions" index={5} label="Design decisions" title="Key decisions, section by section.">
        <div className="cs-decision">
          <Figure src={`${IMG}/hero.webp`} alt="Hero section" />
          <div>
            <h3>Qualify first, then promise</h3>
            <ul>
              <li>The eyebrow names the audience before the headline sells.</li>
              <li>One italic word, <em className="cs-accent">chaos</em>, carries the emotion.</li>
              <li>The CTA has reassurance underneath: <code>20–30 MIN · NO OBLIGATION</code>.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <Figure src={`${IMG}/problem.webp`} alt="Problem section with before and after comparison" />
          <div>
            <h3>Show the cost of doing nothing</h3>
            <ul>
              <li>The manual way is struck through, and the system sits beside it.</li>
              <li>“The manual tax” frames the status quo as a cost.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <Figure src={`${IMG}/method.webp`} alt="Method section with three pillars" />
          <div>
            <h3>“Not a course. A system.”</h3>
            <ul>
              <li>Three pillars, in the order an operator needs them.</li>
              <li>Three concrete topics each, so the curriculum feels real.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <div className="cs-fig-stack">
            <Figure src={`${IMG}/founders.webp`} alt="Founders section on dark background" />
            <Figure src={`${IMG}/brands.webp`} alt="Three brands layer stack" />
          </div>
          <div>
            <h3>Earn trust with people, then structure</h3>
            <ul>
              <li>The only dark section introduces the founders, a pause before “the people”.</li>
              <li>Three brands shown as a stack: operation → technology → playbook.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <div className="cs-fig-stack">
            <Figure src={`${IMG}/programme.webp`} alt="Programme section" />
            <Figure src={`${IMG}/results.webp`} alt="Results testimonials" />
          </div>
          <div>
            <h3>Make the offer tangible</h3>
            <ul>
              <li>“12 weeks” is the biggest thing on screen.</li>
              <li>Each inclusion shows how often it happens.</li>
              <li>Testimonials lead with the result: <em>3 → 24 units</em>.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <div className="cs-fig-stack">
            <Figure src={`${IMG}/fit.webp`} alt="Who this is for and not for" />
            <Figure src={`${IMG}/faq.webp`} alt="FAQ accordion" />
          </div>
          <div>
            <h3>Filter the leads, remove the objections</h3>
            <ul>
              <li>“Who this is not for” filters leads on purpose.</li>
              <li>The FAQ answers the objections just before the ask.</li>
            </ul>
          </div>
        </div>

        <div className="cs-decision">
          <Figure src={`${IMG}/cta.webp`} alt="Final call to action" />
          <div>
            <h3>Close in their words</h3>
            <ul>
              <li>The close repeats the visitor's goal and the hero's two actions.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 06 ─────────────────────────────── */}
      <Section id="system" index={6} label="Visual language" title={<>Calm, editorial, <em>operator-grade.</em></>}>
        <p className="cs-p">Warm paper, near-black type, one orange accent. All set up as Figma variables.</p>

        <h3 className="cs-h3">Colour</h3>
        <div className="cs-swatches">
          {COLORS.map(c => (
            <div key={c.name} className="cs-swatch">
              <div className="cs-swatch-chip" style={{ background: c.hex }} />
              <p className="cs-swatch-name">{c.name}</p>
              <p className="cs-swatch-hex">{c.hex.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <h3 className="cs-h3">Typography</h3>
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

        <h3 className="cs-h3">Components</h3>
        <div className="cs-chips">
          {COMPONENTS.map(c => <span key={c} className="cs-chip">{c}</span>)}
        </div>
      </Section>

      {/* 07 ─────────────────────────────── */}
      <Section id="responsive" index={7} label="Desktop → mobile" title="Designed for the phone in the operator's hand.">
        <p className="cs-p">Same story, reorganised for one thumb:</p>
        <div className="cs-responsive">
          <ul className="cs-list">
            <li><strong>Full-width CTAs</strong> for one thumb.</li>
            <li><strong>Image below the action</strong>, so the CTA stays above the fold.</li>
            <li><strong>Before / after stacks</strong> with a “↓ SYSTEM” connector.</li>
            <li><strong>Proof ticker scrolls</strong> sideways instead of wrapping.</li>
          </ul>
          <ScrollFrame src={`${IMG}/mobile-full.webp`} alt="Flex Academy mobile layout" device="phone" />
        </div>
      </Section>

      {/* 08 ─────────────────────────────── */}
      <Section id="final" index={8} label="Final design" title="The full page.">
        <p className="cs-p">Scroll inside the frame to see the whole page.</p>
        <ScrollFrame src={`${IMG}/desktop-full.webp`} alt="Flex Academy full desktop landing page" device="desktop" />
        <div className="cs-actions" style={{ marginTop: 20 }}>
          <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="cs-btn">Open in Figma <PiArrowUpRight size={17} aria-hidden /></a>
        </div>
      </Section>

      {/* 09 ─────────────────────────────── */}
      <Section id="reflection" index={9} label="Reflection" title="What I'd do next.">
        <div className="cs-cards">
          <div className="cs-card">
            <h3>Real proof</h3>
            <p>Swap placeholder testimonials, stats and stock photos for real ones.</p>
          </div>
          <div className="cs-card">
            <h3>Measure</h3>
            <p>Track CTA clicks, scroll depth and booking rate per section.</p>
          </div>
          <div className="cs-card">
            <h3>Test</h3>
            <p>A/B test the hero headline and where the founders appear.</p>
          </div>
        </div>
      </Section>

    </CaseStudyLayout>
  );
}
