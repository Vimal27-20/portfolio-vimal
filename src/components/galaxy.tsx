import { useEffect, useRef } from "react";

/* Behind "Right now": a slow two-armed galaxy of dots on plain black, in
   the spirit of the Glyph Matrix playground. Inner stars orbit faster than
   outer ones. The pointer is a small gravity well: nearby dots are drawn
   in and swirl around it, then drift home. A click sends a ripple out.
   With reduced motion it is a still field; offscreen it stops. */

type Star = { r: number; a: number; w: number; s: number; lime: boolean; ox: number; oy: number; vx: number; vy: number };

export default function Galaxy() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const host = canvas.parentElement!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, R = 0, stars: Star[] = [], raf = 0, visible = false;
    let quiet: { x: number; y: number; rx: number; ry: number } | null = null;
    const ptr = { x: -1e4, y: -1e4, on: false };
    const PITCH = 5;
    // the core sits in the head band, behind the title, where nothing covers it
    const coreY = () => Math.min(h * 0.5, w < 700 ? 150 : 210);

    const seed = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.hypot(w, h) * 0.55;
      // the heading and its line: stars clear out of this box so the text stays clean
      const head = host.querySelector(".sec-head")?.getBoundingClientRect();
      quiet = head
        ? { x: head.left - r.left + head.width / 2, y: head.top - r.top + head.height / 2, rx: head.width / 2 + 28, ry: head.height / 2 + 24 }
        : null;
      const n = Math.round(Math.min(1100, (w * h) / 900));
      stars = Array.from({ length: n }, (_, i) => {
        const rr = Math.pow(Math.random(), 0.55) * R;
        const arm = i % 2 ? Math.PI : 0;
        return {
          r: rr,
          a: arm + rr / (R * 0.18) + (Math.random() - 0.5) * (0.9 - rr / R * 0.4),   // two arms that wind outward
          w: 0.00009 * Math.sqrt(R / Math.max(rr, 30)),                            // inner stars orbit faster
          s: Math.random() * 1.3 + 0.35,
          lime: Math.random() < 0.14,
          ox: 0, oy: 0, vx: 0, vy: 0,
        };
      });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = coreY();
      for (const st of stars) {
        if (!calm) st.a += st.w * dt;
        let x = cx + Math.cos(st.a) * st.r, y = cy + Math.sin(st.a) * st.r * 0.62;   // a tilted disc
        if (!calm) {
          // the pointer pulls nearby dots in and around itself; springs bring them home
          const dx = ptr.x - (x + st.ox), dy = ptr.y - (y + st.oy), d = Math.hypot(dx, dy);
          if (ptr.on && d < 180) {
            const f = (1 - d / 180) * 0.6;
            st.vx += (dx / d) * f - (dy / d) * f * 0.9;
            st.vy += (dy / d) * f + (dx / d) * f * 0.9;
          }
          st.vx += -st.ox * 0.012; st.vy += -st.oy * 0.012;
          st.vx *= 0.9; st.vy *= 0.9;
          st.ox += st.vx; st.oy += st.vy;
          x += st.ox; y += st.oy;
          // stars sit on a dot pitch, like lit pixels on a Glyph Matrix
          x = Math.round(x / PITCH) * PITCH; y = Math.round(y / PITCH) * PITCH;
        }
        if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue;
        const fade = 1 - Math.min(1, st.r / R) * 0.75;
        // fade out inside a soft oval around the heading
        let clear = 1;
        if (quiet) {
          const q = Math.hypot((x - quiet.x) / quiet.rx, (y - quiet.y) / quiet.ry);
          if (q < 1.15) clear = Math.max(0, (q - 0.85) / 0.3);
          if (clear === 0) continue;
        }
        ctx.globalAlpha = (0.25 + 0.6 * fade) * (st.lime ? 1 : 0.85) * clear;
        ctx.fillStyle = st.lime ? "#a8f83a" : "#fff";
        ctx.beginPath(); ctx.arc(x, y, st.s * (0.6 + fade * 0.6), 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(48, now - last); last = now;
      if (!visible || document.hidden) return;
      draw(dt);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = e.pointerType === "mouse";
    };
    const leave = () => { ptr.on = false; };
    // a click sends a ripple through the field
    const burst = (e: PointerEvent) => {
      if (calm) return;
      const r = canvas.getBoundingClientRect();
      const bx = e.clientX - r.left, by = e.clientY - r.top, cx = w / 2, cy = coreY();
      for (const st of stars) {
        const x = cx + Math.cos(st.a) * st.r + st.ox, y = cy + Math.sin(st.a) * st.r * 0.62 + st.oy;
        const dx = x - bx, dy = y - by, d = Math.hypot(dx, dy);
        if (d < 260 && d > 0.1) { const f = (1 - d / 260) * 9; st.vx += (dx / d) * f; st.vy += (dy / d) * f; }
      }
    };

    seed();
    if (calm) draw(0);
    const ro = new ResizeObserver(() => { seed(); if (calm) draw(0); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerdown", burst);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerdown", burst);
    };
  }, []);

  return <canvas ref={ref} className="galaxy" aria-hidden />;
}
