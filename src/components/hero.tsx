import { PiCaretRight } from "react-icons/pi";
import DotField from "./dotfield";

/* The stage: black, a field of dots with a dot-matrix portrait in it, and one
   statement in the serif voice. */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <DotField src={`${import.meta.env.BASE_URL}img/vimal-portrait.webp`} word="VIMAL" label="Vimal Kumar, drawn in dots" />
      <div className="hero-in">
        <h1 id="hero-title">
          <span className="sr-only">Vimal Kumar, </span>UX Engineer who designs and builds.
        </h1>
        <p className="hero-lede">From research to the shipped screen, in React and React Native. Based in Ireland.</p>
        <a href="#work" className="btn btn--white">See the work <PiCaretRight size={14} aria-hidden /></a>
      </div>
    </section>
  );
}
