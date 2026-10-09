import { useState } from "react";
import { PiArrowLeft, PiArrowRight, PiCaretRight } from "react-icons/pi";
import Glyph from "./glyph";
import { useDublinTime } from "./clock";
import { useQuickView } from "./quickview";
import ResumeLink from "./resume";

/* Right now: a showcase of widgets, the way a Nothing home screen would
   show them. Each one is live or does something. */

// client feedback, confirmed real by Vimal; attributed by role, as given
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
  const time = useDublinTime();
  return (
    <section id="now" className="sec" aria-labelledby="now-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="now-title" className="sec-title">Right now</h2>
          <p>What I'm building, where I am, and what clients say.</p>
        </div>

        <div className="widgets">
          <button className="wg wg--black wg--glyph" onClick={() => quick("vise")} aria-label="Now building VISE, V1 in testing. Open quick view">
            <Glyph text="NOW BUILDING VISE • V1 IN TESTING •" label="" />
            <span className="mono wg-foot"><span className="live">VISE</span><span className="wg-open">Open <PiCaretRight size={12} aria-hidden /></span></span>
          </button>

          <div className="wg wg--clock">
            <p className="dot wg-time" role="img" aria-label={`Local time ${time}`}>{time}</p>
            <p className="wg-note">Local time in Dublin, where I work.</p>
          </div>

          <Quotes />

          <div className="wg wg--open">
            <p className="wg-big"><span className="live" aria-hidden /> Open to UX Engineer roles in Ireland.</p>
            <ResumeLink className="btn" />
          </div>

          <div className="wg wg--role">
            <p className="wg-big">Freelance UX Consultant</p>
            <p className="wg-note">Since Sep 2025, for Peter's Restaurant and AJ Auto Spa.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
