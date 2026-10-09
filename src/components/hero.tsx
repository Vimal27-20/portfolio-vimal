import { PiArrowDown, PiEnvelopeSimple } from "react-icons/pi";
import { projects } from "../data/projects";
import Glyph from "./glyph";
import Go from "./go";
import { useDublinTime } from "./clock";

const EMAIL = "vimal.v27k@gmail.com";

/* The home screen: the headline and two small widgets on the left,
   the project being built right now as the big widget on the right. */
export default function Hero() {
  const p = projects.find(x => x.slug === "vise") ?? projects[0];
  const [name, sub] = p.title.split(":");
  const time = useDublinTime();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          <span className="dot hero-dot">UX Engineer</span>
          <span className="hero-line">who designs and builds.</span>
        </h1>
        <p className="hero-lede">From research to the shipped screen: I design interfaces and build them in React and React Native.</p>
        <div className="hero-actions">
          <a href="#work" className="btn">See the work <PiArrowDown size={18} aria-hidden /></a>
          <a href={`mailto:${EMAIL}`} className="btn btn--line"><PiEnvelopeSimple size={18} aria-hidden /> Email me</a>
        </div>

        <div className="hero-widgets">
          <div className="w w--black glyph-w">
            <Glyph text="NOW BUILDING VISE • V1 IN TESTING •" label="Now building VISE, V1 in testing" />
          </div>
          <div className="w place-w">
            <p className="dot place-time" aria-hidden>{time}</p>
            <p className="place-where">Dublin, Ireland</p>
            <p className="place-open">Open to UX Engineer roles</p>
          </div>
        </div>
      </div>

      <article className="w feat" aria-labelledby="feat-title">
        <header className="feat-top">
          <span className="live data">Building now</span>
          <span className="data">{p.tag}</span>
        </header>
        <div className="feat-img"><img src={p.img} alt={p.alt} /></div>
        <h2 id="feat-title" className="feat-title">
          <span className="dot">{name}</span>
          {sub && <span className="feat-sub">{sub.trim()}</span>}
        </h2>
        <p className="feat-desc">{p.desc}</p>
        <dl className="feat-facts">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Status</dt><dd>{p.duration}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
        </dl>
        <Go p={p} className="btn feat-go" />
      </article>
    </section>
  );
}
