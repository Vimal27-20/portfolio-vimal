// src/components/CursorFollower.tsx
import { useEffect, useRef, useState } from "react";

const ACCENT = "#a7f13a";

export default function CursorFollower() {
  const curRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const cur   = curRef.current!;
    const trail = trailRef.current!;

    let mx = -200, my = -200;
    let tx = -200, ty = -200;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      tx = lerp(tx, mx, 0.09);
      ty = lerp(ty, my, 0.09);
      trail.style.left = `${tx}px`;
      trail.style.top  = `${ty}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = `${mx}px`;
      cur.style.top  = `${my}px`;
    };

    const onEnter = () => setHov(true);
    const onLeave = () => setHov(false);

    const TARGETS = "a, button, .prow, [role=button], label, select, input";
    const attach  = () => {
      document.querySelectorAll<HTMLElement>(TARGETS).forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMove);
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        .cur-arrow {
          position:       fixed;
          pointer-events: none;
          z-index:        99999;
          /* tip of arrow is top-left — no centering offset */
          transform:      translate(0, 0);
          will-change:    left, top;
          transition:     filter .15s ease;
        }

        /* glow on hover */
        .cur-arrow.hov {
          filter: drop-shadow(0 0 6px ${ACCENT}cc);
        }

        /* trailing dot */
        .cur-trail {
          position:       fixed;
          pointer-events: none;
          z-index:        99998;
          transform:      translate(-50%, -50%);
          width:          8px;
          height:         8px;
          border-radius:  50%;
          background:     #111;
          opacity:        0.18;
          will-change:    left, top;
          transition:
            width  .3s cubic-bezier(.16,1,.3,1),
            height .3s cubic-bezier(.16,1,.3,1),
            opacity .3s ease,
            background .25s ease;
        }

        .cur-trail.hov {
          width:      14px;
          height:     14px;
          background: ${ACCENT};
          opacity:    0.55;
        }

        @media (hover: none) {
          .cur-arrow, .cur-trail { display: none !important; }
          * { cursor: auto !important; }
        }
      `}</style>

      {/* ── classic Windows arrow SVG ── */}
      <div
        ref={curRef}
        className={`cur-arrow${hov ? " hov" : ""}`}
      >
        <svg
          width="26" height="30"
          viewBox="0 0 26 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* outer black stroke — 3D raised effect */}
          <path
            d="M3 2 L3 24 L8.5 18.5 L13.5 28 L16.5 26.5 L11.5 17 L19 17 Z"
            fill="#111"
            stroke="#111"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* white fill — classic inner face */}
          <path
            d="M4.5 4 L4.5 21 L9 16.5 L14 26 L15.5 25.2 L10.5 15.5 L17.5 15.5 Z"
            fill={hov ? ACCENT : "#ffffff"}
            style={{ transition: "fill .15s ease" }}
          />

          {/* left edge shadow line — gives 3D depth */}
          <path
            d="M4.5 4 L4.5 21"
            stroke="#555"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── subtle trailing dot ── */}
      <div
        ref={trailRef}
        className={`cur-trail${hov ? " hov" : ""}`}
      />
    </>
  );
}