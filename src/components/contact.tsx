import { useEffect, useRef, useState } from "react";

const ACCENT = "#a7f13a";
const DARK   = "#0f0f0f";

export default function Contact() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const thumbRef   = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos]           = useState(0);         // 0–1
  const [done, setDone]         = useState(false);
  const [copied, setCopied]     = useState(false);
  const startX = useRef(0);

  // ── track width minus thumb width ─────────────────────
  const getMax = () => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return 0;
    return track.clientWidth - thumb.clientWidth - 6; // 6 = gap from edge
  };

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  // ── pointer handlers ──────────────────────────────────
  const onDown = (clientX: number) => {
    if (done) return;
    setDragging(true);
    startX.current = clientX - pos * getMax();
  };

  const onMove = (clientX: number) => {
    if (!dragging || done) return;
    const max = getMax();
    const raw = (clientX - startX.current) / max;
    setPos(clamp(raw, 0, 1));
  };

  // trigger: copy the address (only claim "copied" if it worked), then open mail
  const complete = async () => {
    if (done) return;
    setPos(1);
    setDone(true);
    try {
      await navigator.clipboard.writeText("vimal.v27k@gmail.com");
      setCopied(true);
    } catch { /* clipboard blocked: still open the mail app */ }
    setTimeout(() => {
      window.location.href = "mailto:vimal.v27k@gmail.com";
    }, 600);
  };

  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (pos >= 0.88) complete();
    else setPos(0);   // snap back
  };

  // re-render on resize so the thumb's travel distance stays correct
  const [, setWidth] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => setWidth(track.clientWidth));
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const pct = pos * 100;

  return (
    <section id="contact" className="sec">

      {/* label */}
      <p data-reveal="1" style={{
        fontSize: 11, fontWeight: 800,
        letterSpacing: ".18em", textTransform: "uppercase",
        color: "#bbb", margin: "0 0 18px",
      }}>
        Get In Touch
      </p>

      {/* heading */}
      <h2 data-reveal="2" style={{
        fontFamily:    `"Instrument Serif", Georgia, serif`,
        fontSize:      "clamp(40px, 5.5vw, 76px)",
        letterSpacing: "-.04em",
        lineHeight:    0.95,
        color:         DARK,
        margin:        "0 0 18px",
        maxWidth:      "14ch",
      }}>
        Let's build something great.
      </h2>

      {/* sub copy — limited */}
      <p data-reveal="3" style={{
        fontSize: 15, lineHeight: 1.65,
        color: "#888", maxWidth: "44ch",
        margin: "0 0 56px",
      }}>
        Open to UX/UI & Product Design roles in Ireland.
        3+ years of enterprise, freelance & front-end design.
      </p>

      {/* ── SWIPE SLIDER ── */}
      <div data-reveal="4" style={{ maxWidth: 440 }}>

        <div
          ref={trackRef}
          style={{
            position:     "relative",
            height:       64,
            borderRadius: 999,
            background:   done ? `${ACCENT}22` : "#f2f2f2",
            border:       `1.5px solid ${done ? ACCENT + "66" : "#e4e4e4"}`,
            overflow:     "hidden",
            userSelect:   "none",
            cursor:       done ? "default" : "ew-resize",
            transition:   "background .4s, border .4s",
          }}
        >
          {/* fill bar */}
          <div style={{
            position:   "absolute",
            left:       0, top: 0, bottom: 0,
            width:      `calc(${pct}% + 32px)`,
            background: `linear-gradient(to right, ${ACCENT}44, ${ACCENT}22)`,
            borderRadius: 999,
            transition: dragging ? "none" : "width .35s cubic-bezier(.4,0,.2,1)",
          }} />

          {/* track text */}
          <div style={{
            position:   "absolute",
            inset:      0,
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:   13, fontWeight: 700,
            color:      done ? "#1a6b00" : "#bbb",
            letterSpacing: ".04em",
            pointerEvents: "none",
            transition: "color .3s",
            gap:        8,
          }}>
            {done ? (
              <>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#22c55e", display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(34,197,94,.22)",
                }} />
                {copied ? "Email copied · Opening mail…" : "Opening mail…"}
              </>
            ) : (
              <>Swipe to say hello &nbsp; ✉</>
            )}
          </div>

          {/* thumb */}
          <div
            ref={thumbRef}
            role="button"
            tabIndex={done ? -1 : 0}
            aria-label="Slide to email vimal.v27k@gmail.com, or press Enter"
            onPointerDown={e => {
              if (done) return;
              e.preventDefault();
              e.currentTarget.setPointerCapture(e.pointerId);   // keep tracking outside the track
              onDown(e.clientX);
            }}
            onPointerMove={e => onMove(e.clientX)}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
                e.preventDefault();
                complete();
              }
            }}
            style={{
              touchAction:  "none",
              position:     "absolute",
              top:          3, bottom: 3,
              left:         3,
              width:        58,
              borderRadius: 999,
              background:   done ? ACCENT : DARK,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              cursor:       done ? "default" : "grab",
              transform:    `translateX(${pos * getMax()}px)`,
              transition:   dragging ? "none" : "transform .35s cubic-bezier(.4,0,.2,1), background .3s",
              boxShadow:    done
                ? `0 4px 20px ${ACCENT}55`
                : "0 4px 16px rgba(0,0,0,.18)",
              zIndex: 2,
            }}
          >
            <span style={{
              fontSize:   done ? 20 : 22,
              lineHeight: 1,
              filter:     done ? "none" : "invert(1)",
              transition: "all .3s",
            }}>
              {done ? "✓" : "→"}
            </span>
          </div>
        </div>

        {/* hint */}
        {!done && (
          <p style={{
            fontSize: 11, color: "#ccc",
            fontWeight: 600, margin: "10px 0 0 6px",
            letterSpacing: ".04em",
          }}>
            Slide all the way → to open mail
          </p>
        )}
      </div>

      {/* ── bottom strip ── */}
      <div data-reveal="5" style={{
        marginTop:     64,
        paddingTop:    28,
        borderTop:     "1px solid #f0f0f0",
        display:       "flex",
        justifyContent:"space-between",
        alignItems:    "center",
        flexWrap:      "wrap",
        gap:           16,
      }}>

        {/* availability */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 0 3px rgba(34,197,94,.22)",
            animation: "contactPulse 2s infinite",
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#555" }}>
            Available · Based in Ireland
          </span>
        </div>

        {/* LinkedIn — secondary quiet link */}
        <a
          href="https://www.linkedin.com/in/vimal27k/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 13, fontWeight: 700,
            color: "#aaa", textDecoration: "none",
            letterSpacing: ".02em",
            transition: "color .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = DARK)}
          onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}
        >
          LinkedIn ↗
        </a>
      </div>

      <style>{`
        @keyframes contactPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,.22); }
          50%       { box-shadow: 0 0 0 7px rgba(34,197,94,.07); }
        }
      `}</style>

    </section>
  );
}