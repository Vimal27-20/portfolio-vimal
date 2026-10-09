import { useEffect, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight, PiPlus } from "react-icons/pi";
import { projects, categoryOf, CATEGORIES, type Category } from "../data/projects";
import { useQuickView } from "./quickview";

/* The work as a product row: drag or scroll it sideways, filter by
   category, open any project in a quick view. */
export default function Work() {
  const quick = useQuickView();
  const track = useRef<HTMLUListElement>(null);
  const [filter, setFilter] = useState<Category | null>(null);
  const [pos, setPos] = useState({ at: 0, end: false });
  const shown = filter ? projects.filter(p => categoryOf(p) === filter) : projects;
  const count = (c: Category) => projects.filter(p => categoryOf(p) === c).length;

  // scroll position drives the progress rail and the arrows
  const sync = () => {
    const t = track.current; if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setPos({ at: max > 0 ? t.scrollLeft / max : 1, end: t.scrollLeft >= max - 4 });
  };
  useEffect(() => { track.current?.scrollTo({ left: 0 }); sync(); }, [filter]);

  const page = (dir: 1 | -1) => {
    const t = track.current!;
    const card = t.querySelector("li")?.getBoundingClientRect().width ?? 320;
    t.scrollBy({ left: dir * (card + 16) * (t.clientWidth > 900 ? 2 : 1), behavior: "smooth" });
  };

  // mouse drag to scroll; touch and trackpads scroll natively
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { on: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) { d.moved = true; track.current!.classList.add("is-drag"); }
    if (d.moved) track.current!.scrollLeft = d.left - dx;
  };
  const up = () => { drag.current.on = false; track.current?.classList.remove("is-drag"); };

  return (
    <section id="work" className="sec work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="work-title" className="sec-title">The work</h2>
          <p>Seven projects across mobile, web, enterprise and IoT. Open any of them for a quick look.</p>
        </div>
        <div className="work-bar">
          <div className="filters" role="group" aria-label="Filter projects">
            <button className="filter" aria-pressed={!filter} onClick={() => setFilter(null)}>All <span>{projects.length}</span></button>
            {CATEGORIES.map(c => (
              <button key={c} className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c} <span>{count(c)}</span></button>
            ))}
          </div>
          <div className="work-arrows">
            <button className="qv-icon" onClick={() => page(-1)} disabled={pos.at <= 0.001} aria-label="Scroll work left"><PiArrowLeft size={18} aria-hidden /></button>
            <button className="qv-icon" onClick={() => page(1)} disabled={pos.end} aria-label="Scroll work right"><PiArrowRight size={18} aria-hidden /></button>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">{shown.length} projects shown</span>
      </div>

      <ul ref={track} className="track" onScroll={sync}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
          onClickCapture={e => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}>
        {shown.map(p => (
          <li key={p.slug} className="card">
            <button className="card-btn" onClick={() => quick(p.slug)} aria-label={`Quick view: ${p.title}${p.status === "in-progress" ? ", building now" : ""}`}>
              <span className="card-img"><img src={p.img} alt="" loading="lazy" draggable={false} /></span>
              <span className="card-title">{p.title}{p.status === "in-progress" && <span className="live card-live"></span>}</span>
              <span className="card-role">{p.role}</span>
              <span className="card-meta mono">{categoryOf(p)} · {p.year}</span>
              <span className="tlink card-open">Quick view <PiPlus size={13} aria-hidden /></span>
            </button>
          </li>
        ))}
      </ul>

      <div className="wrap"><div className="rail" aria-hidden><i style={{ width: `${Math.max(6, pos.at * 100)}%` }} /></div></div>
    </section>
  );
}
