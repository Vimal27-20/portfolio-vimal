import React, { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiArrowLeft, PiArrowRight, PiArrowUpRight, PiX } from "react-icons/pi";
import { projects, type Project } from "../../data/projects";
import { STATIONS } from "../../data/network";
import "./casestudy.css";

const stationOf = (p: Project) => STATIONS.find(s => s.project.slug === p.slug);

/** A project's route badge: its station code in its line colour. */
function Badge({ p }: { p: Project }) {
  const s = stationOf(p);
  if (!s) return null;
  return <span className="badge" data-line={s.line.id} style={{ "--badge": s.line.color } as React.CSSProperties}>{s.code}</span>;
}

/* ───────────────────────── lightbox ───────────────────────── */

type LightboxImg = { src: string; alt: string } | null;
const LightboxCtx = createContext<(img: LightboxImg) => void>(() => {});

/** Clickable, zoomable figure used throughout case studies */
export function Figure({
  src, alt, caption, frame = "plain", className = "",
}: {
  src: string; alt: string; caption?: ReactNode;
  frame?: "plain" | "browser" | "phone"; className?: string;
}) {
  const open = useContext(LightboxCtx);
  return (
    <figure className={`cs-fig cs-fig--${frame} ${className}`}>
      {frame === "browser" && (
        <div className="cs-browserbar" aria-hidden>
          <span /><span /><span />
          <div className="cs-browserbar-url">flex.academy</div>
        </div>
      )}
      <button className="cs-fig-btn" onClick={() => open({ src, alt })} aria-label={`Enlarge: ${alt}`}>
        <img src={src} alt={alt} loading="lazy" />
        <span className="cs-fig-zoom" aria-hidden>⤢</span>
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Tall screenshot shown inside a fixed-height scrollable frame */
export function ScrollFrame({
  src, alt, device = "desktop", height,
}: { src: string; alt: string; device?: "desktop" | "phone"; height?: number }) {
  return (
    <div className={`cs-scrollframe cs-scrollframe--${device}`}>
      {device === "desktop" ? (
        <div className="cs-browserbar" aria-hidden>
          <span /><span /><span />
          <div className="cs-browserbar-url">flex.academy</div>
        </div>
      ) : (
        <div className="cs-phone-notch" aria-hidden />
      )}
      <div className="cs-scrollframe-view" style={height ? { height } : undefined} tabIndex={0}
           aria-label={`${alt} — scroll to explore`}>
        <img src={src} alt={alt} decoding="async" />
      </div>
      <div className="cs-scrollframe-hint" aria-hidden>Scroll inside ↕</div>
    </div>
  );
}

/** One case-study section; `id` is what the side nav links to (the nav carries
    the numbering and label, so the section opens straight on its heading) */
export function Section({
  id, title, children,
}: { id: string; index: number; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="cs-section">
      <h2 className="cs-h2">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Work-in-progress veil: everything inside gets blurrier the further you
 * scroll into it, with a card explaining the work isn't final.
 * Blurred content can't be clicked or opened in the lightbox.
 */
export function WipVeil({ title, children, note }: { title: string; note: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(3);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.9)));
      setBlur(3 + p * 13);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div ref={ref} className="cs-wip">
      <div className="cs-wip-content" style={{ filter: `blur(${blur.toFixed(1)}px)` }} aria-hidden="true">
        {children}
      </div>
      <div className="cs-wip-overlay">
        <div className="cs-wip-card" role="note">
          <span className="cs-status">In progress</span>
          <h3>{title}</h3>
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── layout ───────────────────────── */

export interface CsSection { id: string; label: string }

export default function CaseStudyLayout({
  project, name, sections, header, children, accent,
}: {
  project: Project;
  /** per-project highlight colour (defaults to the CSS value) */
  accent?: string;
  /** short name for the breadcrumb */
  name: string;
  sections: CsSection[];
  header: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive]     = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxImg>(null);

  /* reading-progress bar */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy: highlight the section currently in view */
  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  /* keep the active chip visible in the mobile nav */
  // (scrolls only the chip strip sideways: scrollIntoView would also move the page)
  useEffect(() => {
    const toc = document.querySelector<HTMLElement>(".cs-toc");
    const chip = toc?.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (!toc || !chip || toc.scrollWidth <= toc.clientWidth) return;
    toc.scrollTo({ left: chip.offsetLeft - (toc.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  /* close lightbox with Esc */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    navigate(`${pathname}#${id}`, { replace: true });
  }, [navigate, pathname]);

  const idx  = projects.findIndex(p => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const station = stationOf(project);
  // colour only ever means a line, so the page accent is the station's line colour
  const lineColor = station?.line.color ?? accent;

  return (
    <LightboxCtx.Provider value={setLightbox}>
      <div className="cs" style={lineColor ? ({ "--cs-accent": lineColor } as React.CSSProperties) : undefined}>
        <div className="cs-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />

        <div className="wrap">
          {/* breadcrumb / back */}
          <div className="cs-crumbs">
            <Link to="/#work" className="cs-back"><PiArrowLeft size={16} aria-hidden /> All work</Link>
            <nav aria-label="Breadcrumb" className="cs-crumb-path">
              <Link to="/">Home</Link><span>/</span>
              <Link to="/#work">Work</Link><span>/</span>
              <span aria-current="page">{name}</span>
            </nav>
          </div>

          {/* the station's own sign: code, line, status */}
          {station && (
            <div className="cs-station sign">
              <Badge p={project} />
              <span className="cs-station-line">{station.line.name}</span>
              {project.status === "in-progress"
                ? <span className="cs-station-now">Now · in progress</span>
                : <span className="cs-station-year">{project.year}</span>}
            </div>
          )}

          {header}

          <div className="cs-body">
            <aside className="cs-aside">
              <nav className="cs-toc" aria-label="Case study sections">
                <p className="cs-toc-title">On this page</p>
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-id={s.id}
                    className={active === s.id ? "is-active" : ""}
                    onClick={e => { e.preventDefault(); goTo(s.id); }}
                  >
                    <span className="cs-toc-num">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="cs-article">{children}</article>
          </div>

          {/* prev / next */}
          <nav className="cs-pager" aria-label="More projects">
            <ProjectLink p={prev} dir="prev" />
            <ProjectLink p={next} dir="next" />
          </nav>
          <div style={{ textAlign: "center", margin: "8px 0 24px" }}>
            <Link to="/#work" className="cs-btn cs-btn--ghost">Back to all work</Link>
          </div>
        </div>

        {lightbox && (
          <div className="cs-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt}
               onClick={() => setLightbox(null)}>
            <button className="cs-lightbox-close" aria-label="Close"><PiX size={18} /></button>
            <img src={lightbox.src} alt={lightbox.alt} onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    </LightboxCtx.Provider>
  );
}

function ProjectLink({ p, dir }: { p: Project; dir: "prev" | "next" }) {
  const inner = (
    <>
      <span className="cs-pager-label">
        {dir === "prev" ? <><PiArrowLeft size={14} aria-hidden /> Previous</> : <>Next project <PiArrowRight size={14} aria-hidden /></>}
      </span>
      <span className="cs-pager-title"><Badge p={p} /> {p.title}</span>
      <span className="cs-pager-tag">
        {p.status === "in-progress" ? "In progress · " : ""}{p.tag}
        {!p.caseStudy && p.link && <> · Behance <PiArrowUpRight size={12} aria-hidden /></>}
      </span>
    </>
  );
  const cls = `cs-pager-item cs-pager-item--${dir}`;
  if (p.caseStudy) return <Link to={p.caseStudy} className={cls}>{inner}</Link>;
  return <a href={p.link} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
}
