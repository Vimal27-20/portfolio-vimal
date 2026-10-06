import { useEffect, useRef, useState } from "react";

interface TLItem {
  role: string;
  date: string;
  company: string;
  type: "work" | "edu";
  description: string;
}

const items: TLItem[] = [
  { role: "BSc Computer Science",    date: "2017 – 2021",        company: "SRM Institute of Technology · India",       type: "edu",  description: "Built the logic foundation that drives every design decision." },
  { role: "BI & Tableau Admin",      date: "2021 – 2022",        company: "Infosys · India",                           type: "work", description: "Turned raw data into visual stories at enterprise scale." },
  { role: "UX UI Designer",          date: "2023 – 2024",        company: "Aspira · India",                            type: "work", description: "End-to-end product design — research, prototypes & handoff." },
  { role: "Master's in IXD",         date: "2024 – 2025",        company: "University of Limerick · Ireland",            type: "edu",  description: "Deepened craft — theory, accessibility & systems thinking." },
  { role: "Freelance UX Consultant", date: "Sep 2025 – Present", company: "Peter's Restaurant & AJ Auto Spa · Ireland",  type: "work", description: "Human-centred design for real businesses — strategy to delivery." },
];

const ACCENT = "#a7f13a";
const DARK   = "#0f0f0f";

// ── S-curve geometry ───────────────────────────────────────
// 5 points winding in S-shape: each item has a fixed (x,y) on the curve
const VW    = 800;
const VH    = 600;
const ANIM  = 2600;

// Hand-placed S-curve points — alternating left/right as in reference
const PTS: [number, number][] = [
  [580, 80],   // 0 — right
  [280, 190],  // 1 — left
  [540, 310],  // 2 — right
  [220, 430],  // 3 — left
  [520, 540],  // 4 — right
];

// Build smooth catmull-rom-like path through all points using cubic beziers
function buildSCurve(): string {
  const tension = 0.45;
  let d = `M ${PTS[0][0]} ${PTS[0][1]}`;
  for (let i = 0; i < PTS.length - 1; i++) {
    const p0 = PTS[Math.max(0, i - 1)];
    const p1 = PTS[i];
    const p2 = PTS[i + 1];
    const p3 = PTS[Math.min(PTS.length - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const PATH = buildSCurve();

// ── SVG ────────────────────────────────────────────────────
function CurveSVG({ playing }: { playing: boolean }) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, []);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      {/* ghost path */}
      <path d={PATH} fill="none" stroke="#e0e0e0" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* animated accent draw */}
      {len > 0 && (
        <path
          d={PATH} fill="none" stroke={ACCENT} strokeWidth="3.5"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={playing ? 0 : len}
          style={{ transition: playing ? `stroke-dashoffset ${ANIM}ms cubic-bezier(.4,0,.2,1)` : "none" }}
        />
      )}
      <path ref={ref} d={PATH} fill="none" stroke="transparent" />

      {/* map pins */}
      {PTS.map(([x, y], i) => {
        const isWork = items[i].type === "work";
        const pinDelay = playing ? `${(i / (PTS.length - 1)) * ANIM * 0.78}ms` : "0ms";
        const pinColor = isWork ? ACCENT : "#fff";
        const pipColor = isWork ? DARK : ACCENT;

        return (
          <g
            key={i}
            style={{
              opacity:    playing ? 1 : 0,
              transform:  playing ? "none" : `translateY(-12px)`,
              transition: playing
                ? `opacity .4s ${pinDelay}, transform .5s ${pinDelay} cubic-bezier(.34,1.4,.64,1)`
                : "none",
            }}
          >
            {/* pin drop shadow */}
            <ellipse cx={x + 2} cy={y + 38} rx={10} ry={4} fill="rgba(0,0,0,.15)" />

            {/* pin body — teardrop via path */}
            <path
              d={`
                M ${x} ${y - 32}
                C ${x + 22} ${y - 32} ${x + 22} ${y - 6} ${x} ${y + 6}
                C ${x - 22} ${y - 6} ${x - 22} ${y - 32} ${x} ${y - 32}
                Z
              `}
              fill={pinColor}
              stroke={DARK}
              strokeWidth="2"
            />

            {/* pin circle inside */}
            <circle cx={x} cy={y - 19} r={10}
              fill={pipColor} />

            {/* step number inside pin */}
            <text
              x={x} y={y - 15}
              textAnchor="middle"
              fontSize="10" fontWeight="900"
              fill={isWork ? DARK : ACCENT}
              fontFamily="system-ui,sans-serif"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Text label (no box, no card) ───────────────────────────
function TLLabel({ item, index, playing }: { item: TLItem; index: number; playing: boolean }) {
  const [x, y]  = PTS[index];
  const isWork  = items[index].type === "work";
  // alternate: even index → right of pin, odd → left
  const onRight = index % 2 === 0;
  const W       = 210;
  const OFFSET  = 38;  // horizontal gap from pin center
  const delay   = playing
    ? `${(index / (PTS.length - 1)) * ANIM * 0.78 + 300}ms`
    : "0ms";

  return (
    <div style={{
      position:   "absolute",
      // place relative to SVG coordinate space
      left:       onRight
        ? `calc(${(x / VW) * 100}% + ${OFFSET}px)`
        : `calc(${(x / VW) * 100}% - ${OFFSET + W}px)`,
      top:        `calc(${(y / VH) * 100}% - 62px)`,
      width:      W,
      textAlign:  onRight ? "left" : "right",
      opacity:    playing ? 1 : 0,
      transform:  playing ? "translateX(0)" : onRight ? "translateX(-12px)" : "translateX(12px)",
      transition: playing
        ? `opacity .55s ${delay} ease, transform .55s ${delay} ease`
        : "none",
    }}>

      {/* date */}
      <p style={{
        fontSize: 9.5, fontWeight: 800,
        letterSpacing: ".16em", textTransform: "uppercase",
        color: "#bbb", margin: "0 0 5px",
      }}>
        {item.date}
      </p>

      {/* role — dominant */}
      <h3 style={{
        fontFamily:    `"Instrument Serif", Georgia, serif`,
        fontSize:      "clamp(17px, 1.8vw, 22px)",
        fontWeight:    700,
        letterSpacing: "-.03em",
        lineHeight:    1.05,
        color:         DARK,
        margin:        "0 0 4px",
      }}>
        {item.role}
      </h3>

      {/* company */}
      <p style={{
        fontSize: 10, fontWeight: 700,
        color: "#aaa", letterSpacing: ".04em",
        textTransform: "uppercase",
        margin: "0 0 7px", lineHeight: 1.4,
      }}>
        {item.company}
      </p>

      {/* thin rule */}
      <div style={{
        height: 1.5,
        background: isWork ? `${ACCENT}88` : "#e8e8e8",
        margin: onRight ? "0 0 7px" : "0 0 7px auto",
        width: "55%",
      }} />

      {/* description */}
      <p style={{
        fontSize: 11.5, lineHeight: 1.65,
        color: "#666", margin: "0 0 8px",
      }}>
        {item.description}
      </p>

      {/* type badge */}
      <span style={{
        display: "inline-block",
        fontSize: 8, fontWeight: 900,
        letterSpacing: ".12em", textTransform: "uppercase",
        padding: "3px 10px", borderRadius: 999,
        background: isWork ? ACCENT + "28" : "rgba(0,0,0,.05)",
        color: isWork ? "#1a4500" : "#555",
        border: isWork ? `1px solid ${ACCENT}66` : "1px solid #e0e0e0",
      }}>
        {isWork ? "Work" : "Education"}
      </span>

      {/* currently here */}
      {item.date.includes("Present") && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          marginLeft: onRight ? 6 : 0,
          marginTop: onRight ? 0 : 6,
          padding: "3px 10px", borderRadius: 999,
          background: "#edfff0", border: "1.5px solid #5ae27044",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", display: "inline-block",
            boxShadow: "0 0 0 3px rgba(34,197,94,.18)",
          }} />
          <span style={{
            fontSize: 8, fontWeight: 900,
            letterSpacing: ".12em", textTransform: "uppercase",
            color: "#166534",
          }}>
            Currently Here
          </span>
        </div>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setPlaying(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="sec" style={{ overflowX: "hidden" }}>

      {/* heading */}
      <div data-reveal="1" style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", marginBottom: 56,
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: ".18em", textTransform: "uppercase",
            color: "#bbb", margin: "0 0 10px",
          }}>
            The Story So Far
          </p>
          <h2 style={{
            fontFamily:    `"Instrument Serif", Georgia, serif`,
          fontSize:      "clamp(56px, 5vw, 80px)",
          letterSpacing: "-.05em",
          lineHeight:    0.88,
          color:         DARK,
          margin:        "0 0 18px",
          fontWeight:    400,
          }}>
            Timeline
          </h2>
          <p style={{ color: "#999", fontSize: 15, marginTop: 14, marginBottom: 0 }}>
            From classroom to client work — the full journey.
          </p>
        </div>

        {/* legend */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", paddingBottom: 6 }}>
          {[
            { label: "Work",      bg: ACCENT, pip: DARK },
            { label: "Education", bg: "#fff",  pip: ACCENT },
          ].map(({ label, bg, pip }) => (
            <span key={label} style={{
              display: "inline-flex", alignItems: "center",
              gap: 8, fontSize: 13, fontWeight: 700, color: "#444",
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: "50%",
                background: bg, border: `2.5px solid ${DARK}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                boxShadow: `2px 2px 0 ${DARK}`,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: pip, display: "block" }} />
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── desktop canvas ── */}
      <div
        className="tl-desk"
        style={{
          position: "relative",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <CurveSVG playing={playing} />
        {items.map((item, i) => (
          <TLLabel key={item.role} item={item} index={i} playing={playing} />
        ))}
      </div>

      {/* ── mobile vertical ── */}
      <style>{`
        @media (min-width: 1001px) { .tl-mob { display: none !important; } }
        @media (max-width: 1000px) { .tl-desk { display: none !important; } }
      `}</style>

      <div className="tl-mob" style={{ maxWidth: 560, margin: "0 auto" }}>
        {items.map((item, i) => {
          const isWork = item.type === "work";
          const isLast = i === items.length - 1;
          return (
            <div key={item.role} style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: isWork ? ACCENT : "#fff",
                  border: `2.5px solid ${DARK}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 16, flexShrink: 0,
                  fontSize: 10, fontWeight: 900,
                  color: isWork ? DARK : ACCENT,
                  fontFamily: "system-ui,sans-serif",
                  boxShadow: `2px 2px 0 ${DARK}`,
                }}>
                  {i + 1}
                </div>
                {!isLast && (
                  <div style={{
                    width: 2, flex: 1, minHeight: 40,
                    background: `linear-gradient(to bottom, ${isWork ? ACCENT : "#ccc"}, #eee)`,
                    marginTop: 3,
                  }} />
                )}
              </div>
              <div style={{ marginLeft: 16, paddingBottom: isLast ? 0 : 36, paddingTop: 13, flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#bbb", margin: "0 0 4px" }}>
                  {item.date}
                </p>
                <h3 style={{ fontFamily: `"Instrument Serif", Georgia, serif`, fontSize: "clamp(20px, 4.5vw, 24px)", letterSpacing: "-.025em", lineHeight: 1.1, color: DARK, margin: "0 0 3px" }}>
                  {item.role}
                </h3>
                <p style={{ fontSize: 11.5, fontWeight: 700, color: "#aaa", letterSpacing: ".04em", textTransform: "uppercase", margin: "0 0 7px", lineHeight: 1.4 }}>
                  {item.company}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#666", margin: "0 0 7px" }}>
                  {item.description}
                </p>
                <span style={{
                  fontSize: 10, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase",
                  padding: "3px 10px", borderRadius: 999,
                  background: isWork ? ACCENT + "28" : "rgba(0,0,0,.05)",
                  color: isWork ? "#1a4500" : "#555",
                  border: isWork ? `1px solid ${ACCENT}66` : "1px solid #e0e0e0",
                }}>
                  {isWork ? "Work" : "Education"}
                </span>
                {item.date.includes("Present") && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 6, padding: "3px 10px", borderRadius: 999, background: "#edfff0", border: "1.5px solid #5ae27044" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", color: "#166534" }}>Now</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}