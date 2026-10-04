import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const ACCENT = "#a7f13a";
const DARK   = "#111111";

function AnimPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      style={{
        overflow:   "hidden",
        height:     open ? (innerRef.current?.scrollHeight ?? "auto") : 0,
        opacity:    open ? 1 : 0,
        transition: open
          ? "height .55s cubic-bezier(.16,1,.3,1), opacity .4s ease"
          : "height .4s cubic-bezier(.4,0,1,1), opacity .25s ease",
        willChange: "height, opacity",
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section id="projects" style={{ padding: "80px 0" }}>
      <style>{`
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes imgIn {
          from { opacity: 0; transform: scale(.97) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .prow {
          border-bottom: 1.5px solid #e4e4e4;
          cursor: pointer;
          transition: background .18s ease;
        }
        .prow:first-of-type { border-top: 1.5px solid #e4e4e4; }
        .prow:hover { background: rgba(0,0,0,.012); }

        .prow-head {
          display: flex; align-items: center;
          gap: 20px; padding: 26px 4px;
          user-select: none;
        }

        .prow-num {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(15px, 1.6vw, 20px);
          color: #ccc; letter-spacing: -.06em;
          min-width: 42px; flex-shrink: 0;
          transition: color .3s ease;
        }
        .prow.is-open .prow-num { color: ${DARK}; }

        .prow-bar {
          width: 3px; border-radius: 3px;
          background: #e0e0e0; flex-shrink: 0; height: 38px;
          transition: background .3s ease, height .42s cubic-bezier(.16,1,.3,1);
        }
        .prow.is-open .prow-bar { background: ${ACCENT}; height: 50px; }

        .prow-title {
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(22px, 3.2vw, 42px);
          letter-spacing: -.05em; line-height: 1;
          color: ${DARK}; flex: 1; min-width: 0;
        }

        .prow-pill {
          font-size: 10px; font-weight: 800;
          letter-spacing: .12em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 999px; flex-shrink: 0;
          background: #f2f2f2; color: #999; border: 1.5px solid transparent;
          transition: background .3s ease, color .3s ease, border-color .3s ease;
        }
        .prow.is-open .prow-pill {
          background: ${ACCENT}; color: ${DARK}; border-color: ${ACCENT};
        }

        .prow-year {
          font-size: 12px; font-weight: 700;
          color: #ccc; letter-spacing: .06em; flex-shrink: 0;
          transition: color .25s ease;
        }
        .prow.is-open .prow-year { color: #888; }

        .prow-arrow {
          font-size: 20px; color: #ccc;
          flex-shrink: 0; display: inline-block;
          transition: transform .42s cubic-bezier(.16,1,.3,1), color .25s ease;
        }
        .prow.is-open .prow-arrow { transform: rotate(45deg); color: ${DARK}; }

        .prow-line {
          height: 2px; background: ${ACCENT}; border-radius: 2px;
          transform-origin: left;
          animation: lineGrow .5s .05s ease both;
          margin-bottom: 36px;
        }

        .panel-left { animation: fadeUp .4s .08s ease both; }

        .meta-chip {
          background: #fff; border: 1.5px solid #eee;
          border-radius: 14px; padding: 11px 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,.04);
        }
        .meta-chip-label {
          font-size: 9px; text-transform: uppercase;
          letter-spacing: .16em; color: #bbb;
          font-weight: 800; margin-bottom: 4px;
        }
        .meta-chip-value { font-size: 13px; font-weight: 800; color: ${DARK}; }

        .skill-tag {
          font-size: 11px; font-weight: 700;
          padding: 5px 13px; border-radius: 999px;
          background: ${ACCENT}22; border: 1px solid ${ACCENT}66;
          color: #2a5000;
        }

        .proj-img-wrap {
          border-radius: 20px; overflow: hidden;
          animation: imgIn .45s .1s ease both;
          box-shadow: 0 24px 56px rgba(0,0,0,.13), 0 0 0 1.5px ${ACCENT}44;
          aspect-ratio: 16/10;
        }
        .proj-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .proj-img-wrap:hover img { transform: scale(1.03); }

        /* CTA — now an <a> tag */
        .proj-cta {
          display: inline-flex; align-items: center; gap: 9px;
          background: ${DARK}; color: #fff;
          border: none; border-radius: 14px;
          padding: 14px 26px; font-size: 14px;
          font-weight: 800; cursor: pointer;
          letter-spacing: .01em; text-decoration: none;
          transition: background .2s ease, color .2s ease,
                      transform .2s cubic-bezier(.16,1,.3,1),
                      box-shadow .2s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,.15);
        }
        .proj-cta:hover {
          background: ${ACCENT}; color: ${DARK};
          transform: translateY(-2px);
          box-shadow: 0 10px 28px ${ACCENT}44;
        }
        .proj-cta:active { transform: scale(.97); }

        /* disabled state — no link yet */
        .proj-cta.no-link {
          opacity: .4; cursor: not-allowed; pointer-events: none;
        }

        @media (max-width: 760px) {
          .prow-meta     { display: none !important; }
          .proj-exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── heading ── */}
      <div style={{ marginBottom: 64 }}>
        <p style={{
          fontSize: 11, fontWeight: 800,
          letterSpacing: ".18em", textTransform: "uppercase",
          color: "#bbb", margin: "0 0 14px",
        }}>Selected Work</p>

        <h2 style={{
          fontFamily: `"Instrument Serif", Georgia, serif`,
          fontSize: "clamp(56px, 5vw, 80px)",
          letterSpacing: "-.05em", lineHeight: 0.88,
          color: DARK, margin: "0 0 18px", fontWeight: 400,
        }}>Case Studies</h2>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: "#999", margin: 0 }}>
          {projects.length} projects · 2023 – 2026
        </p>
      </div>

      {/* ── rows ── */}
      <div>
        {projects.map((p, i) => {
          const isOpen = openIndex === i;
          const hasLink = !!p.link && !p.link.includes("your-case-study-link");

          return (
            <div
              key={p.slug}
              className={`prow${isOpen ? " is-open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="prow-head">
                <span className="prow-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="prow-bar" />
                <div className="prow-title">{p.title}</div>
                <div className="prow-meta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="prow-pill">{p.tag}</span>
                  <span className="prow-year">{p.year}</span>
                </div>
                <span className="prow-arrow">↗</span>
              </div>

              <AnimPanel open={isOpen}>
                <div
                  style={{ padding: "0 4px 44px" }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="prow-line" />
                  <div
                    className="proj-exp-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1.6fr",
                      gap: 44, alignItems: "start",
                    }}
                  >
                    <div className="panel-left">
                      {/* meta chips */}
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                        {[
                          { label: "Role",     value: p.role },
                          { label: "Duration", value: p.duration },
                          { label: "Year",     value: p.year },
                        ].map(m => (
                          <div key={m.label} className="meta-chip">
                            <div className="meta-chip-label">{m.label}</div>
                            <div className="meta-chip-value">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 24 }}>
                        {p.desc}
                      </p>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {p.tags.map(t => (
                          <span key={t} className="skill-tag">{t}</span>
                        ))}
                      </div>

                      {/* ── CTA — internal case study route, external link, or disabled ── */}
                      {p.caseStudy ? (
                        <Link to={p.caseStudy} className="proj-cta" title="Open case study">
                          View Full Case Study
                          <span style={{ fontSize: 18 }}>→</span>
                        </Link>
                      ) : (
                        <a
                          href={hasLink ? p.link : undefined}
                          target={hasLink ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`proj-cta${hasLink ? "" : " no-link"}`}
                          title={hasLink ? "Open case study" : "Coming soon"}
                        >
                          {hasLink ? "View Full Case Study" : "Coming Soon"}
                          <span style={{ fontSize: 18 }}>
                            {hasLink ? "↗" : "⏳"}
                          </span>
                        </a>
                      )}
                    </div>

                    <div className="proj-img-wrap">
                      <img src={p.img} alt={p.alt} loading="lazy" />
                    </div>
                  </div>
                </div>
              </AnimPanel>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div style={{
        marginTop: 48,
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <span style={{ fontSize: 11, color: "#ddd", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
          UX · UI · Research
        </span>
        <span style={{ fontSize: 11, color: "#ddd", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
          {projects.length} Projects
        </span>
      </div>
    </section>
  );
}