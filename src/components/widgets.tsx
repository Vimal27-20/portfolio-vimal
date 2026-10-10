import { useState } from "react";
import {
  PiArrowLeft, PiArrowRight, PiCaretRight,
  PiMagnifyingGlass, PiHandHeart, PiSparkle, PiCheckCircle,
} from "react-icons/pi";
import Glyph from "./glyph";
import { useQuickView } from "./quickview";
import ResumeLink from "./resume";
import PortraitDots from "./portraitdots";

/* Right now: few words, more to look at. What is being built, how Vimal
   approaches a problem (four rolling discs), availability with his portrait
   in dots, and client notes. */

/* ── How I approach a problem: four discs that keep rolling ──
   Vimal's own principles, word for word. Each disc carries its principle
   on a ring of text; the one-liner shows on hover, focus or tap. */
const PRINCIPLES = [
  { title: "Problem before technology", line: "Find the gap before selecting the solution.", Icon: PiMagnifyingGlass },
  { title: "Human before AI", line: "Design for human needs, agency and context.", Icon: PiHandHeart },
  { title: "Purpose over novelty", line: "Introduce AI only when it adds value.", Icon: PiSparkle },
  { title: "Evidence over assumptions", line: "Test outcomes and improve continuously.", Icon: PiCheckCircle },
];

function Disc({ title, line, Icon, k, open, onToggle }: (typeof PRINCIPLES)[number] & { k: number; open: boolean; onToggle: () => void }) {
  const ring = `${title.toUpperCase()} • `.repeat(2);
  return (
    <li className={`disc-item${open ? " is-open" : ""}`}>
      <button className="disc" onClick={onToggle} aria-expanded={open} aria-describedby={`disc-line-${k}`}>
        <svg className={`disc-ring disc-ring--${k % 2 ? "ccw" : "cw"}`} viewBox="0 0 120 120" aria-hidden>
          <defs><path id={`disc-path-${k}`} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text><textPath href={`#disc-path-${k}`} textLength="289" lengthAdjust="spacingAndGlyphs">{ring}</textPath></text>
        </svg>
        <span className="disc-icon"><Icon size={30} aria-hidden /></span>
        <span className="sr-only">{title}</span>
      </button>
      <p className="disc-title" aria-hidden>{title}</p>
      <p className="disc-line" id={`disc-line-${k}`}>{line}</p>
    </li>
  );
}

function Principles() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="wg wg--principles">
      <h3 className="wg-title">How I look at a problem</h3>
      <ul className="discs">
        {PRINCIPLES.map((p, k) => (
          <Disc key={p.title} {...p} k={k} open={open === k} onToggle={() => setOpen(open === k ? null : k)} />
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
      <div className="wrap">
        <div className="sec-head">
          <h2 id="now-title" className="sec-title">Right now</h2>
          <p>What I'm building, and how I think.</p>
        </div>

        <div className="widgets">
          <button className="wg wg--black wg--glyph" onClick={() => quick("vise")} aria-label="Now building VISE, V1 in testing. Open quick view">
            <Glyph text="NOW BUILDING VISE • V1 IN TESTING •" label="" />
            <span className="mono wg-foot"><span className="live">VISE</span><span className="wg-open">Open <PiCaretRight size={12} aria-hidden /></span></span>
          </button>
          <Principles />
          <div className="wg wg--open">
            <PortraitDots src={`${import.meta.env.BASE_URL}img/vimal-bw.webp`} label="Vimal Kumar, a portrait drawn in dots" />
            <p className="wg-big"><span className="live" aria-hidden /> Open to UX Engineer roles in Ireland.</p>
            <ResumeLink className="btn btn--accent" />
          </div>
          <Quotes />
        </div>
      </div>
    </section>
  );
}
