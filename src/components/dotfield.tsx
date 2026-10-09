import { useEffect, useRef } from "react";

/* The hero stage: a grid of dots across black, with a word lit in white
   dots. Dots swell and warm under the pointer like a lens passing over
   the grid; on load the lit dots switch on in a stepped scatter. With
   reduced motion the word is simply on. */

export default function DotField({ word }: { word: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, gap = 16, cols = 0, rows = 0;
    let lit = new Uint8Array(0), order = new Float32Array(0);
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let born = performance.now(), raf = 0, visible = true, dirty = true;

    // rasterise the word onto the dot grid
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = Math.max(8, Math.min(16, w / 96));
      cols = Math.ceil(w / gap); rows = Math.ceil(h / gap);

      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d")!;
      const textRows = Math.round(rows * (w < 700 ? 0.2 : 0.3));
      o.font = `800 ${textRows}px "Geist Variable", system-ui, sans-serif`;
      o.textAlign = "center"; o.textBaseline = "middle";
      const scale = Math.min(1, (cols * 0.86) / o.measureText(word).width);
      o.setTransform(scale, 0, 0, 1, cols / 2, rows * (w < 700 ? 0.3 : 0.34));
      o.fillStyle = "#fff";
      o.fillText(word, 0, 0);
      const px = o.getImageData(0, 0, cols, rows).data;
      lit = new Uint8Array(cols * rows);
      order = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) { lit[i] = px[i * 4 + 3] > 110 ? 1 : 0; order[i] = Math.random(); }
      dirty = true;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const age = reduce ? 1e9 : t - born;
      const lens = Math.max(90, w / 12);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = y * cols + x, cx = x * gap + gap / 2, cy = y * gap + gap / 2;
        const d = Math.hypot(cx - ptr.x, cy - ptr.y);
        const near = d < lens ? 1 - d / lens : 0;
        // lit dots switch on in steps over the first second
        const on = lit[i] && age > order[i] * 900;
        // the stage grid is sparse, like Nothing's; the lens reveals the fine grid under it
        if (!on && near === 0 && (x % 7 !== 3 || y % 7 !== 3)) continue;
        const r = (on ? gap * 0.34 : gap * 0.09) * (1 + near * (on ? 0.35 : 1.6));
        ctx.fillStyle = on ? `rgba(255,255,255,${0.86 + near * 0.14})` : `rgba(255,255,255,${0.22 + near * 0.5})`;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.fill();
      }
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      // ease the lens toward the pointer
      const dx = ptr.tx - ptr.x, dy = ptr.ty - ptr.y;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) { ptr.x += dx * 0.22; ptr.y += dy * 0.22; dirty = true; }
      if (t - born < 1000) dirty = true;
      if (dirty) { draw(t); dirty = false; }
    };

    const host = canvas.parentElement!;
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
      if (ptr.x < -999) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      if (reduce) { ptr.x = ptr.tx; ptr.y = ptr.ty; dirty = true; }
    };
    const leave = () => { ptr.tx = ptr.ty = ptr.x = ptr.y = -9999; dirty = true; };

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    // the word is drawn in Geist: wait for it so the raster isn't a fallback face
    document.fonts.ready.then(() => { layout(); born = performance.now(); });
    layout();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [word]);

  return <canvas ref={ref} className="dotfield" aria-hidden />;
}
