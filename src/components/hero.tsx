import { useRef } from "react";
import { PiCaretRight } from "react-icons/pi";
import DotField from "./dotfield";

/* The stage: black, a sparse field of dots, a black-and-white portrait,
   and one statement in the serif voice. The portrait leans toward the
   pointer like a visionOS window and a soft light slides across it. */
export default function Hero() {
  const photo = useRef<HTMLDivElement>(null);

  const lean = (e: React.PointerEvent) => {
    const el = photo.current;
    if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--lx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--ly", `${((y + 0.5) * 100).toFixed(1)}%`);
    el.classList.add("is-lit");
  };
  const rest = () => {
    const el = photo.current; if (!el) return;
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
    el.classList.remove("is-lit");
  };

  return (
    <section className="hero" aria-labelledby="hero-title" onPointerMove={lean} onPointerLeave={rest}>
      <DotField />
      <div className="hero-photo" ref={photo}>
        <span className="hero-frame">
          <img src={`${import.meta.env.BASE_URL}img/vimal-bw.webp`} alt="Vimal Kumar, in a black-and-white portrait" width={708} height={671} />
        </span>
      </div>
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
