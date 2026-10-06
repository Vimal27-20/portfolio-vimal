import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, categoryOf, CATEGORIES, type Category, type Project } from "../data/projects";

const ACCENT = "#a7f13a";
const DARK   = "#111111";

type Filter = "All" | Category;
const count = (f: Filter) => (f === "All" ? projects.length : projects.filter(p => categoryOf(p) === f).length);

/* One card, same structure every time so recruiters can compare at a glance:
   image → category/year → title → summary → role/timeline → skills → link */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const hasLink = !!p.link && !p.link.includes("your-case-study-link");
  const internal = !!p.caseStudy;

  return (
    <article className="pcard" style={{ "--i": index } as React.CSSProperties}>
      <div className="pcard-media">
        <img src={p.img} alt={p.alt} loading="lazy" />
      </div>

      <div className="pcard-body">
        <p className="pcard-kicker">
          <span className="pcard-cat">{categoryOf(p)}</span>
          {p.status === "in-progress" ? <span className="wip-badge">In progress</span> : <span>{p.year}</span>}
        </p>

        <h3 className="pcard-title">{p.title}</h3>
        <p className="pcard-desc">{p.desc}</p>

        <dl className="pcard-facts">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Timeline</dt><dd>{p.duration}</dd></div>
        </dl>

        <ul className="pcard-tags" aria-label="Skills">
          {p.tags.slice(0, 3).map(t => <li key={t}>{t}</li>)}
        </ul>

        {/* the whole card is clickable through this link (see .pcard-cta::after) */}
        <div className="pcard-foot">
          {internal ? (
            <Link to={p.caseStudy!} className="pcard-cta">
              Read case study <span aria-hidden>→</span>
            </Link>
          ) : hasLink ? (
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="pcard-cta">
              View on Behance <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span className="pcard-cta is-disabled" aria-disabled="true">Coming soon</span>
          )}
          <span className="pcard-where">{internal ? "On this site" : hasLink ? "Behance" : ""}</span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? projects : projects.filter(p => categoryOf(p) === filter);

  return (
    <section id="projects" className="sec">
      <style>{`
        /* ── filters ── */
        .pfilters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
        .pfilter {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px; border-radius: 999px; cursor: pointer;
          font: 700 13px/1 Inter, system-ui, sans-serif; letter-spacing: .01em;
          background: #fff; color: ${DARK}; border: 2px solid #222; box-shadow: 3px 3px 0 #222;
          transition: transform .15s, box-shadow .15s, background .2s;
        }
        .pfilter:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 #222; }
        .pfilter:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #222; }
        .pfilter[aria-pressed="true"] { background: ${ACCENT}; }
        .pfilter-n {
          min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px;
          display: inline-grid; place-items: center; font-size: 11px;
          background: ${DARK}; color: #fff;
        }

        /* ── grid ── */
        .pgrid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
        .pcard {
          position: relative; display: flex; flex-direction: column; height: 100%;
          background: #fff; border: 2px solid #222; border-radius: 24px; overflow: hidden;
          box-shadow: 6px 6px 0 #222;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1);
          animation: pcardIn .6s cubic-bezier(.16,1,.3,1) backwards;
          animation-delay: calc(var(--i) * 60ms);
        }
        @keyframes pcardIn { from { opacity: 0; transform: translateY(18px); } }
        .pcard:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 #222; }
        .pcard:has(.pcard-cta:focus-visible) { outline: 3px solid ${ACCENT}; outline-offset: 4px; }

        .pcard-media { aspect-ratio: 16 / 10; overflow: hidden; border-bottom: 2px solid #222; background: #f2f2f2; }
        .pcard-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s cubic-bezier(.16,1,.3,1); }
        .pcard:hover .pcard-media img { transform: scale(1.05); }

        .pcard-body { flex: 1; display: flex; flex-direction: column; padding: 20px 22px 22px; }
        .pcard-kicker {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #777;
        }
        .pcard-cat {
          padding: 5px 11px; border-radius: 999px; color: var(--accent-text);
          background: ${ACCENT}; border: 1.5px solid #222;
        }
        .pcard-title {
          margin: 14px 0 8px;
          font-family: "Instrument Serif", Georgia, serif; font-weight: 400;
          font-size: clamp(26px, 2.3vw, 32px); line-height: 1; letter-spacing: -.04em; color: ${DARK};
        }
        .pcard-desc {
          font-size: 14.5px; line-height: 1.6; color: #555;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        .pcard-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 16px 0 14px; }
        .pcard-facts div { background: #f5f5f3; border-radius: 12px; padding: 9px 12px; }
        .pcard-facts dt { font-size: 9px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: #999; margin-bottom: 3px; }
        .pcard-facts dd { font-size: 13px; font-weight: 700; color: ${DARK}; line-height: 1.3; }

        .pcard-tags { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .pcard-tags li {
          font-size: 11px; font-weight: 700; padding: 5px 11px; border-radius: 999px;
          background: ${ACCENT}22; border: 1px solid ${ACCENT}66; color: #2a5000;
        }

        /* footer pinned to the bottom so every card's button lines up */
        .pcard-foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .pcard-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 14px;
          background: ${DARK}; color: #fff; font-size: 14px; font-weight: 800; letter-spacing: .01em;
          transition: background .2s, color .2s;
        }
        .pcard-cta::after { content: ""; position: absolute; inset: 0; border-radius: 24px; }   /* whole card is the hit area */
        .pcard:hover .pcard-cta { background: ${ACCENT}; color: ${DARK}; }
        .pcard-cta.is-disabled { opacity: .4; }
        .pcard-cta.is-disabled::after { display: none; }
        .pcard-where { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #999; }

        /* work still being designed/built (Project.status) */
        .wip-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
          padding: 5px 11px; border-radius: 999px;
          background: #fff4dc; color: #8a5300; border: 1.5px solid #f3c66b;
        }
        .wip-badge::before {
          content: ""; width: 7px; height: 7px; border-radius: 50%; background: #e59a0c;
          animation: wipPulse 1.6s ease-in-out infinite;
        }
        @keyframes wipPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

        @media (max-width: 1100px) { .pgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 680px) {
          .pgrid { grid-template-columns: 1fr; gap: 22px; }
          .pcard { box-shadow: 5px 5px 0 #222; border-radius: 20px; }
          .pcard:hover { transform: none; box-shadow: 5px 5px 0 #222; }
          .pfilters { flex-wrap: nowrap; overflow-x: auto; margin: 0 -16px 24px; padding: 4px 16px 8px; scrollbar-width: none; }
          .pfilters::-webkit-scrollbar { display: none; }
          .pfilter { flex-shrink: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcard { animation: none; }
          .pcard:hover, .pcard:hover .pcard-media img { transform: none; }
        }
      `}</style>

      {/* ── heading ── */}
      <div data-reveal="1" style={{ marginBottom: 32 }}>
        <p style={{
          fontSize: 11, fontWeight: 800,
          letterSpacing: ".18em", textTransform: "uppercase",
          color: "#999", margin: "0 0 14px",
        }}>Selected Work</p>

        <h2 style={{
          fontFamily: `"Instrument Serif", Georgia, serif`,
          fontSize: "clamp(56px, 5vw, 80px)",
          letterSpacing: "-.05em", lineHeight: 0.88,
          color: DARK, margin: "0 0 18px", fontWeight: 400,
        }}>Case Studies</h2>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: "#777", margin: 0 }}>
          {projects.length} projects · 2023 – 2026
        </p>
      </div>

      {/* ── filters ── */}
      <div className="pfilters" role="group" aria-label="Filter projects" data-reveal="2">
        {(["All", ...CATEGORIES] as Filter[]).map(f => (
          <button key={f} className="pfilter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === "All" ? "All work" : f}
            <span className="pfilter-n">{count(f)}</span>
          </button>
        ))}
      </div>

      {/* ── grid (re-keyed per filter so the cards animate back in) ── */}
      <p className="sr-only" aria-live="polite">Showing {list.length} {list.length === 1 ? "project" : "projects"}</p>
      <ul key={filter} className="pgrid">
        {list.map((p, i) => (
          <li key={p.slug}><ProjectCard p={p} index={i} /></li>
        ))}
      </ul>

      {/* footer */}
      <div style={{
        marginTop: 48,
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <span style={{ fontSize: 11, color: "#999", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
          UX · UI · Research
        </span>
        <span style={{ fontSize: 11, color: "#999", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
          {projects.length} Projects
        </span>
      </div>
    </section>
  );
}
