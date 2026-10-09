import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiArrowRight, PiArrowUpRight, PiArrowLeft } from "react-icons/pi";
import { HUB, LINES, STATIONS, destination, type Station } from "../data/network";
import type { Category } from "../data/projects";

// three.js only loads when the glass network is actually shown
const GlassNet = lazy(() => import("./glassnet"));

/** 3D on wide screens with WebGL; phones and no-WebGL get the crisp 2D map. */
function useGlass() {
  const query = "(min-width: 1001px)";
  const webgl = () => {
    try { return !!document.createElement("canvas").getContext("webgl2"); } catch { return false; }
  };
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches && webgl());
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOn(mq.matches && webgl());
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return on;
}

/* The opening: the whole body of work as one network. Picking a station
   moves the "you are here" marker there and steps the platform sign. */

function Go({ s, className }: { s: Station; className: string }) {
  const d = destination(s.project);
  const Icon = d.kind === "external" ? PiArrowUpRight : PiArrowRight;
  if (d.kind === "case") return <Link to={d.href} className={className}>{d.label} <Icon size={18} aria-hidden /></Link>;
  if (d.kind === "external")
    return (
      <a href={d.href} target="_blank" rel="noopener noreferrer" className={className}>
        {d.label} <Icon size={18} aria-hidden /><span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  return <span className={className} aria-disabled="true">{d.label}</span>;
}

function Map({ current, filter, onPick }: { current: Station; filter: Category | null; onPick: (s: Station) => void }) {
  const dim = (id: Category) => (filter && filter !== id ? " is-dim" : "");
  return (
    <svg className="net-map" viewBox="0 20 1000 530" role="group" aria-label="Project network map">
      {LINES.map(l => (
        <g key={l.id} className={`net-line${dim(l.id)}`}>
          <path d={l.path} stroke={l.color} />
        </g>
      ))}

      {/* interchange where all four lines meet */}
      <rect className="net-hub" x={HUB.x - 16} y={HUB.y - 30} width="32" height="60" rx="16" />

      {/* "you are here": one ring that snaps from station to station */}
      <g className="net-here" style={{ transform: `translate(${current.x}px, ${current.y}px)` }} aria-hidden>
        <circle r="27" />
      </g>

      {STATIONS.map(s => {
        const on = s.code === current.code;
        const ly = s.label === "above" ? s.y - 34 : s.y + 48;
        return (
          <g
            key={s.code}
            className={`net-stop${on ? " is-on" : ""}${dim(s.line.id)}`}
            role="button" tabIndex={0}
            aria-pressed={on}
            aria-label={`${s.code} ${s.project.title}, ${s.line.name}, ${s.project.year}`}
            onClick={() => onPick(s)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(s); } }}
          >
            <circle cx={s.x} cy={s.y} r="18" style={{ stroke: s.line.color }} />
            <text x={s.x} y={s.y + 6} className="net-code">{s.code}</text>
            <text x={s.x} y={ly} className="net-name">{s.short}</text>
          </g>
        );
      })}
    </svg>
  );
}

function PlatformSign({ s, onStep }: { s: Station; onStep: (dir: 1 | -1) => void }) {
  const p = s.project;
  return (
    <aside className="plat" aria-live="polite" aria-label="Selected project">
      <div className="plat-head sign">
        <span className="badge" data-line={s.line.id} style={{ "--badge": s.line.color } as React.CSSProperties}>{s.code}</span>
        <span className="plat-line">{s.line.name}</span>
        {p.status === "in-progress"
          ? <span className="plat-now">Now · in progress</span>
          : <span className="plat-year">{p.year}</span>}
      </div>

      {/* keyed so each change steps in as a new panel */}
      <div className="plat-body" key={s.code}>
        <div className="plat-img"><img src={p.img} alt={p.alt} /></div>
        <h2 className="plat-title">{p.title}</h2>
        <p className="plat-desc">{p.desc}</p>
        <dl className="plat-facts">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Timeline</dt><dd>{p.duration}</dd></div>
        </dl>
        <div className="plat-actions">
          <Go s={s} className="btn" />
          <span className="plat-step">
            <button className="plat-arrow" onClick={() => onStep(-1)} aria-label="Previous station"><PiArrowLeft size={18} /></button>
            <button className="plat-arrow" onClick={() => onStep(1)} aria-label="Next station"><PiArrowRight size={18} /></button>
          </span>
        </div>
      </div>
    </aside>
  );
}

export default function Network() {
  const [current, setCurrent] = useState<Station>(STATIONS.find(s => s.project.slug === "vise") ?? STATIONS[0]);
  const [filter, setFilter] = useState<Category | null>(null);
  const visible = filter ? STATIONS.filter(s => s.line.id === filter) : STATIONS;

  const step = (dir: 1 | -1) => {
    const list = visible.length ? visible : STATIONS;
    const i = list.findIndex(s => s.code === current.code);
    setCurrent(list[(i + dir + list.length) % list.length]);
  };
  const toggle = (id: Category) => {
    const next = filter === id ? null : id;
    setFilter(next);
    if (next && current.line.id !== next) setCurrent(STATIONS.find(s => s.line.id === next) ?? current);
  };

  const use3D = useGlass();
  const key = (
    <div className="net-key" role="group" aria-label="Filter by line">
      {LINES.map(l => (
        <button key={l.id} className="net-keybtn" aria-pressed={filter === l.id} onClick={() => toggle(l.id)}>
          <i style={{ background: l.color }} aria-hidden />
          {l.id}
          <span>{STATIONS.filter(s => s.line.id === l.id).length}</span>
        </button>
      ))}
    </div>
  );
  const intro = (
    <header className="net-intro">
      <h1 id="net-title">UX Engineer who designs and builds.</h1>
      <p>Seven projects on four lines. {use3D ? "Drag to turn the network, pick a station to open it." : "Pick a station to open it."}</p>
    </header>
  );

  return (
    <section id="work" className={`net${use3D ? " is-3d" : ""}`} aria-labelledby="net-title">
      {use3D ? (
        /* desktop: the glass network is the first viewport; its parts float over it */
        <div className="net-stage">
          <Suspense fallback={<div className="gn gn-wait" aria-hidden />}>
            <GlassNet current={current} filter={filter} onPick={setCurrent} />
          </Suspense>
          <div className="net-overlay">
            {intro}
            {key}
            <PlatformSign s={current} onStep={step} />
          </div>
        </div>
      ) : (
      <>
      {intro}
      <div className="net-grid">
        <div className="net-mapcol">
          <Map current={current} filter={filter} onPick={setCurrent} />

          {/* phones get a station strip instead of the map */}
          <ul className="net-strip" aria-label="Stations">
            {STATIONS.map(s => (
              <li key={s.code}>
                <button className={`net-chip${s.code === current.code ? " is-on" : ""}`} aria-pressed={s.code === current.code} onClick={() => setCurrent(s)}>
                  <span className="badge" data-line={s.line.id} style={{ "--badge": s.line.color } as React.CSSProperties}>{s.code}</span>
                  {s.short}
                </button>
              </li>
            ))}
          </ul>

          {key}
        </div>

        <PlatformSign s={current} onStep={step} />
      </div>
      </>
      )}

      {/* departures: every project in one scannable table */}
      <div className="board" role="region" aria-labelledby="board-title">
        <h2 id="board-title" className="board-title">All departures</h2>
        <table>
          <thead>
            <tr><th scope="col">Code</th><th scope="col">Project</th><th scope="col">Role</th><th scope="col">Timeline</th><th scope="col">Year</th><th scope="col">Opens</th></tr>
          </thead>
          <tbody>
            {visible.map(s => {
              const d = destination(s.project);
              return (
                <tr key={s.code} className={s.code === current.code ? "is-on" : ""}>
                  <td><span className="badge" data-line={s.line.id} style={{ "--badge": s.line.color } as React.CSSProperties}>{s.code}</span></td>
                  <th scope="row">
                    <button className="board-name" onClick={() => { setCurrent(s); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
                      {s.project.title}
                    </button>
                    {s.project.status === "in-progress" && <span className="board-now">In progress</span>}
                  </th>
                  <td>{s.project.role}</td>
                  <td>{s.project.duration}</td>
                  <td className="num">{s.project.year}</td>
                  <td><Go s={s} className="board-go" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
