import { useEffect, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight, PiCaretRight, PiCheck, PiX, PiArrowCounterClockwise } from "react-icons/pi";
import Glyph from "./glyph";
import Galaxy from "./galaxy";
import { useQuickView } from "./quickview";
import ResumeLink from "./resume";
import { projects } from "../data/projects";

/* Right now: widgets floating over a dot galaxy. Each one is live or does
   something: what's being built, a small colour game with a UX point, the
   design process with AI, a project finder for the role you're hiring for,
   a contrast checker, availability, and client notes. */

/* ── Find the odd colour: 4 rounds, the difference shrinks each round ── */
const ROUNDS = [{ n: 3, d: 16 }, { n: 4, d: 10 }, { n: 5, d: 6 }, { n: 6, d: 4 }];
type Board = { hue: number; light: number; odd: number };
// any hue except the yellow-greens around the logo green (65°–115°): the tiles are the puzzle, not the brand
const gameHue = () => { const h = Math.floor(Math.random() * 310); return h >= 65 ? h + 50 : h; };
const newBoard = (n: number): Board => ({ hue: gameHue(), light: 42 + Math.random() * 14, odd: Math.floor(Math.random() * n * n) });

function ColourGame() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(() => newBoard(ROUNDS[0].n));
  const [shown, setShown] = useState<{ pick: number; right: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const done = round >= ROUNDS.length;
  const cfg = ROUNDS[Math.min(round, ROUNDS.length - 1)];

  const pick = (i: number) => {
    if (shown || done) return;
    const right = i === board.odd;
    setShown({ pick: i, right });
    if (right) setScore(s => s + 1);
    timer.current = setTimeout(() => {
      setShown(null);
      const next = round + 1;
      setRound(next);
      if (next < ROUNDS.length) setBoard(newBoard(ROUNDS[next].n));
    }, right ? 650 : 1100);
  };
  const again = () => { setRound(0); setScore(0); setShown(null); setBoard(newBoard(ROUNDS[0].n)); };

  return (
    <div className="wg wg--game">
      <div className="wg-head">
        <h3 className="wg-title">Find the odd colour</h3>
        <p className="mono wg-meta" aria-live="polite">{done ? `${score} / 4` : `Round ${round + 1} of 4 · ${score} found`}</p>
      </div>
      {!done ? (
        <div className="game-grid" style={{ gridTemplateColumns: `repeat(${cfg.n}, 1fr)` }} role="group" aria-label="Colour tiles: one is a slightly different shade">
          {Array.from({ length: cfg.n * cfg.n }, (_, i) => {
            const odd = i === board.odd;
            const state = shown && (i === shown.pick || (odd && !shown.right)) ? (odd ? " is-right" : " is-wrong") : "";
            return (
              <button key={`${round}-${i}`} className={`game-tile${state}`} onClick={() => pick(i)} disabled={!!shown}
                      aria-label={`Tile ${i + 1}${state === " is-right" ? ", the odd one" : state === " is-wrong" ? ", not it" : ""}`}
                      style={{ background: `hsl(${board.hue} 62% ${board.light + (odd ? cfg.d : 0)}%)` }}>
                {state === " is-right" && <span className="tile-mark"><PiCheck size={16} aria-hidden /></span>}
                {state === " is-wrong" && <span className="tile-mark"><PiX size={16} aria-hidden /></span>}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="game-end">
          <p className="dot game-score">{score}/4</p>
          <p className="wg-text">
            The last rounds are hard on purpose. Small shifts in colour are easy to miss, so I never let colour carry
            meaning on its own: states also get a label, an icon or a shape (WCAG 1.4.1).
          </p>
          <button className="btn btn--accent" onClick={again}><PiArrowCounterClockwise size={15} aria-hidden /> Play again</button>
        </div>
      )}
    </div>
  );
}

/* ── How I design, with AI: a stepper ── */
const STEPS = [
  { name: "Discover", text: "Interviews, observation and desk research. AI helps me sort and synthesise the notes into themes (Dovetail AI), but the questions and the listening stay human." },
  { name: "Define", text: "Problem statements, journeys and success criteria. I use Claude to pressure-test assumptions and to draft first-pass UX copy I then rewrite." },
  { name: "Ideate", text: "Sketches first, then wireframes in Figma. Framer AI and Claude Design give me fast variations to react to, not answers to accept." },
  { name: "Prototype", text: "Prototypes in real code, React or React Native, built with Claude Code. Real data and real states show problems a clickable mock hides." },
  { name: "Test", text: "Usability sessions and heuristic reviews; UXtweak AI speeds up analysis of the recordings. Accessibility is checked here, not after launch." },
  { name: "Ship", text: "Design tokens go straight into the codebase, so the product matches the design system one-to-one. Then I measure and loop back." },
];

function Process() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + STEPS.length) % STEPS.length;
    setI(n); tabs.current[n]?.focus();
  };
  return (
    <div className="wg wg--process">
      <h3 className="wg-title">How I design, with AI</h3>
      <div className="steps" role="tablist" aria-label="Design process" onKeyDown={key}>
        {STEPS.map((s, k) => (
          <button key={s.name} ref={el => { tabs.current[k] = el; }} role="tab" id={`step-${k}`} aria-controls="step-panel"
                  aria-selected={i === k} tabIndex={i === k ? 0 : -1} className="step" onClick={() => setI(k)}>
            <span className="mono">{String(k + 1).padStart(2, "0")}</span>{s.name}
          </button>
        ))}
      </div>
      <div className="step-rail" aria-hidden><i style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} /></div>
      <p key={i} id="step-panel" role="tabpanel" aria-labelledby={`step-${i}`} className="wg-text step-text">{STEPS[i].text}</p>
    </div>
  );
}

/* ── Which project fits your role ── */
const ROLES = [
  { role: "UX Engineer", slug: "vise" },
  { role: "UX/UI Designer", slug: "flex-academy" },
  { role: "Service Designer", slug: "mindful-moments" },
  { role: "UX Researcher", slug: "balanci" },
  { role: "Accessibility", slug: "assist-now" },
];

function RoleMatch() {
  const quick = useQuickView();
  const [r, setR] = useState(0);
  const p = projects.find(x => x.slug === ROLES[r].slug)!;
  return (
    <div className="wg wg--match">
      <h3 className="wg-title">Hiring for…</h3>
      <div className="chips" role="radiogroup" aria-label="Role you are hiring for">
        {ROLES.map((x, k) => (
          <button key={x.role} role="radio" aria-checked={r === k} className="chip" onClick={() => setR(k)}>{x.role}</button>
        ))}
      </div>
      <div className="match" key={r} aria-live="polite">
        <p className="match-title">{p.title}</p>
        <p className="wg-text">{p.desc}</p>
      </div>
      <button className="tlink match-go" onClick={() => quick(p.slug)}>Open this project <PiCaretRight size={13} aria-hidden /></button>
    </div>
  );
}

/* ── Contrast checker ── */
const lum = (hex: string) => {
  const c = hex.replace("#", "").match(/../g)!.map(v => parseInt(v, 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratioOf = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

function Contrast() {
  const [fg, setFg] = useState("#a8f83a");
  const [bg, setBg] = useState("#1d1d1d");
  const r = ratioOf(fg, bg);
  const checks = [{ label: "AA", ok: r >= 4.5 }, { label: "AA large", ok: r >= 3 }, { label: "AAA", ok: r >= 7 }];
  return (
    <div className="wg wg--contrast">
      <h3 className="wg-title">Check a contrast</h3>
      <div className="contrast-sample" style={{ color: fg, background: bg }}>Aa <span>Readable?</span></div>
      <div className="contrast-row">
        <label className="swatch"><input type="color" value={fg} onChange={e => setFg(e.target.value)} /><span className="mono">Text</span></label>
        <label className="swatch"><input type="color" value={bg} onChange={e => setBg(e.target.value)} /><span className="mono">Background</span></label>
        <p className="dot contrast-ratio" aria-live="polite">{r.toFixed(1)}:1</p>
      </div>
      <ul className="checks">
        {checks.map(c => (
          <li key={c.label} className={c.ok ? "is-ok" : "is-no"}>
            {c.ok ? <PiCheck size={13} aria-hidden /> : <PiX size={13} aria-hidden />}<span className="mono">{c.label}</span>
            <span className="sr-only">{c.ok ? "passes" : "fails"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── client notes ── */
// confirmed real by Vimal; attributed by role, as given
const NOTES = [
  { text: "Vimal transformed our restaurant's digital presence completely. The new menus and displays look stunning and customer engagement has visibly improved.", who: "Restaurant Owner", where: "Peter's Restaurant" },
  { text: "Vimal's design thinking and digital strategy brought real, measurable results. Our online reach grew significantly and the UX fixes were exactly what we needed.", who: "Marketing Lead", where: "AJ Auto Spa" },
  { text: "A rare UX designer who truly understands enterprise complexity. Vimal delivered a design system our entire team adopted and still uses today.", who: "Product Director", where: "Aspira" },
];

function Quotes() {
  const [i, setI] = useState(0);
  const n = NOTES[i];
  const go = (d: number) => setI((i + d + NOTES.length) % NOTES.length);
  return (
    <figure className="wg wg--quote" aria-label="What clients say">
      <blockquote key={i} className="wg-q"><p>“{n.text}”</p></blockquote>
      <figcaption className="wg-by"><strong>{n.who}</strong>, {n.where}</figcaption>
      <div className="wg-pager">
        <span className="wg-dots" aria-hidden>{NOTES.map((_, k) => <i key={k} className={k === i ? "is-on" : ""} />)}</span>
        <span className="sr-only" aria-live="polite">Quote {i + 1} of {NOTES.length}</span>
        <button className="qv-icon" onClick={() => go(-1)} aria-label="Previous quote"><PiArrowLeft size={16} aria-hidden /></button>
        <button className="qv-icon" onClick={() => go(1)} aria-label="Next quote"><PiArrowRight size={16} aria-hidden /></button>
      </div>
    </figure>
  );
}

export default function Widgets() {
  const quick = useQuickView();
  return (
    <section id="now" className="sec" aria-labelledby="now-title">
      <Galaxy />
      <div className="wrap">
        <div className="sec-head">
          <h2 id="now-title" className="sec-title">Right now</h2>
          <p>What I'm building, how I work, and a few things to try. <span className="hint-mouse">Move through the stars, or click them.</span><span className="hint-touch">Tap the stars.</span></p>
        </div>

        <div className="widgets">
          <button className="wg wg--black wg--glyph" onClick={() => quick("vise")} aria-label="Now building VISE, V1 in testing. Open quick view">
            <Glyph text="NOW BUILDING VISE • V1 IN TESTING •" label="" />
            <span className="mono wg-foot"><span className="live">VISE</span><span className="wg-open">Open <PiCaretRight size={12} aria-hidden /></span></span>
          </button>
          <ColourGame />
          <div className="wg wg--open">
            <p className="wg-big"><span className="live" aria-hidden /> Open to UX Engineer roles in Ireland.</p>
            <ResumeLink className="btn btn--accent" />
          </div>
          <RoleMatch />
          <Contrast />
          <Process />
          <Quotes />
        </div>
      </div>
    </section>
  );
}
