import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PiArrowLeft, PiArrowRight, PiArrowUpRight, PiX } from "react-icons/pi";
import { projects, categoryOf, type Project } from "../data/projects";
import { destination } from "../data/network";

/* Quick view: any project opens in a sheet over the page, like a product
   quick view. Arrows (and ← →) step through every project without leaving;
   a case study opens with its image morphing into the case-study cover. */

const Ctx = createContext<(slug: string) => void>(() => {});
export const useQuickView = () => useContext(Ctx);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const open = useCallback((s: string) => { setSlug(s); dialog.current?.showModal(); }, []);
  const close = () => dialog.current?.close();

  // phones: pull the sheet down by its top bar to dismiss it, like an iOS sheet
  const pull = useRef({ y: 0, on: false });
  const grab = (e: React.PointerEvent) => {
    const t = e.target as Element;
    if (e.pointerType !== "touch" || !t.closest(".qv-bar") || t.closest("button")) return;
    pull.current = { y: e.clientY, on: true };
  };
  const drag = (e: React.PointerEvent) => {
    if (!pull.current.on) return;
    dialog.current!.style.transform = `translateY(${Math.max(0, e.clientY - pull.current.y)}px)`;
  };
  const drop = (e: React.PointerEvent) => {
    if (!pull.current.on) return;
    pull.current.on = false;
    const d = dialog.current!;
    const far = e.clientY - pull.current.y > 110;
    d.style.transition = "transform .3s cubic-bezier(.2,.7,0,1)";
    d.style.transform = far ? "translateY(100%)" : "";
    setTimeout(() => { d.style.transition = ""; if (far) { close(); d.style.transform = ""; } }, 300);
  };

  const i = projects.findIndex(p => p.slug === slug);
  const p = projects[i];
  const step = useCallback((dir: 1 | -1) => {
    setSlug(cur => {
      const at = projects.findIndex(x => x.slug === cur);
      return projects[(at + dir + projects.length) % projects.length].slug;
    });
  }, []);

  useEffect(() => {
    const d = dialog.current!;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    };
    d.addEventListener("keydown", key);
    return () => d.removeEventListener("keydown", key);
  }, [step]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog ref={dialog} className="qv" aria-labelledby="qv-title" onClick={e => e.target === e.currentTarget && close()} onClose={() => setSlug(null)}
              onPointerDown={grab} onPointerMove={drag} onPointerUp={drop} onPointerCancel={drop}>
        {p && <Sheet p={p} n={i + 1} onStep={step} onClose={close} />}
      </dialog>
    </Ctx.Provider>
  );
}

function Sheet({ p, n, onStep, onClose }: { p: Project; n: number; onStep: (d: 1 | -1) => void; onClose: () => void }) {
  const d = destination(p);
  return (
    <div className="qv-in">
      <header className="qv-bar">
        <span className="qv-grab" aria-hidden />
        <p className="mono qv-count">{String(n).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
        <span className="sr-only" aria-live="polite">Project {n} of {projects.length}: {p.title}</span>
        <div className="qv-steps">
          <button className="qv-icon" onClick={() => onStep(-1)} aria-label="Previous project"><PiArrowLeft size={18} aria-hidden /></button>
          <button className="qv-icon" onClick={() => onStep(1)} aria-label="Next project"><PiArrowRight size={18} aria-hidden /></button>
          <button className="qv-icon" onClick={onClose} aria-label="Close quick view" autoFocus><PiX size={18} aria-hidden /></button>
        </div>
      </header>

      {/* keyed so each project steps in fresh */}
      <div className="qv-body" key={p.slug}>
        <div className="qv-img"><img src={p.img} alt={p.alt} /></div>
        <div className="qv-text">
          <h2 id="qv-title" className="qv-title">{p.title}</h2>
          <p className="qv-desc">{p.desc}</p>
          <dl className="qv-facts">
            <div><dt className="mono">Role</dt><dd>{p.role}</dd></div>
            <div><dt className="mono">Timeline</dt><dd>{p.duration}</dd></div>
            <div><dt className="mono">Category</dt><dd>{categoryOf(p)}</dd></div>
            <div><dt className="mono">Year</dt><dd>{p.year}</dd></div>
            {p.status === "in-progress" && <div><dt className="mono">Status</dt><dd className="live">In progress</dd></div>}
          </dl>
          <ul className="qv-tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
          <div className="qv-go">
            {d.kind === "case" && <Link to={d.href} viewTransition className="btn">{d.label} <PiArrowRight size={16} aria-hidden /></Link>}
            {d.kind === "external" && (
              <a href={d.href} target="_blank" rel="noopener noreferrer" className="btn">
                {d.label} <PiArrowUpRight size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {d.kind === "none" && <span className="btn" aria-disabled="true">{d.label}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
