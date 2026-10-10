import { useEffect, useRef } from "react";

/* The hero stage: a sparse grid of dots across black that swell under the
   pointer like a lens passing over the grid. Given a photo it can also draw
   it as a halftone dot-matrix portrait (brighter parts become bigger dots,
   scanning in from the top), or light a word; the hero lights the word
   VIMAL in bold dots. With reduced motion it is simply on. */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function DotField({ src = "", word = "", label }: { src?: string; word?: string; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, gap = 8, cols = 0, rows = 0, pitch = 12;
    let lit = new Float32Array(0), delay = new Float32Array(0);
    let img: HTMLImageElement | null = null;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let born = performance.now(), raf = 0, visible = true, dirty = true;

    // sample the portrait (or the word) onto the dot grid
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = w < 700;
      // a portrait needs fine dots to read; a word reads best in bold dots, like the Nothing wordmark
      gap = img
        ? (small ? Math.max(4.5, w / 80) : Math.max(5, Math.min(6.5, w / 230)))
        : small ? Math.max(5, w / 72) : Math.max(8, Math.min(13, w / 110));   // finer on phones, so letters keep their shape
      cols = Math.ceil(w / gap); rows = Math.ceil(h / gap);
      pitch = Math.max(6, Math.round(88 / gap));        // the sparse stage grid, ~90px apart

      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      lit = new Float32Array(cols * rows);
      delay = new Float32Array(cols * rows);

      if (img) {
        // the portrait fills the space between the nav pill and the headline,
        // measured, so it never runs under the text at any screen size
        const text = canvas.parentElement?.querySelector(".hero-in")?.getBoundingClientRect();
        const top = (small ? 64 : 76) / gap;
        const bottom = text ? (text.top - r.top - (small ? 16 : 24)) / gap : rows * 0.6;
        const room = Math.max(8, bottom - top);
        // the top ~10% of the photo is faded out anyway, so it may tuck up under the pill
        const ph = Math.round(Math.min(room / 0.9, rows * 0.66, (cols * 0.9) * (img.height / img.width)));
        const pw = Math.round(ph * (img.width / img.height));
        const px0 = Math.round((cols - pw) / 2), py0 = Math.round(top + (room - ph * 0.9) / 2 - ph * 0.1);
        o.imageSmoothingQuality = "high";
        o.drawImage(img, px0, py0, pw, ph);
        const d = o.getImageData(0, 0, cols, rows).data;
        for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          if (x < px0 || x >= px0 + pw || y < py0 || y >= py0 + ph) continue;
          const L = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
          // levels: the room and hair drop to nothing, skin sits mid, the shirt is full
          const v = Math.pow(Math.min(1, Math.max(0, (L - 0.14) / 0.6)), 0.85);
          // an oval around the head fades the room (and the window) into the stage
          const u = (x - px0) / pw - 0.46, t = (y - py0) / ph - 0.46;
          const fy = (y - py0) / ph;
          const m = (1 - smooth(0.6, 0.98, Math.hypot(u / 0.36, t / 0.58)))
            * smooth(0.04, 0.16, fy)                       // the ceiling light above the head drops out
            * (1 - smooth(0.7, 0.97, fy));               // the shirt fades out before the headline
          lit[i] = v * m;
          // the portrait scans in from the top, a row at a time with a little scatter
          delay[i] = ((y - py0) / ph) * 700 + Math.random() * 220;
        }
      } else {
        // the word fills the space between the nav pill and the headline, measured,
        // so it never runs under the text on short screens
        const text = canvas.parentElement?.querySelector(".hero-in")?.getBoundingClientRect();
        const top = (small ? 64 : 76) / gap;
        const bottom = text ? (text.top - r.top - (small ? 20 : 32)) / gap : rows * 0.6;
        const room = Math.max(6, bottom - top);
        // a medium weight, scaled evenly: on a narrow screen the whole word gets smaller,
        // it is never squeezed sideways
        let size = Math.min(room * 0.8, rows * 0.32);
        o.font = `600 ${size}px "Geist Variable", system-ui, sans-serif`;
        const fit = (cols * (small ? 0.92 : 0.84)) / o.measureText(word).width;
        if (fit < 1) { size *= fit; o.font = `600 ${size}px "Geist Variable", system-ui, sans-serif`; }
        o.textAlign = "center"; o.textBaseline = "middle";
        o.setTransform(1, 0, 0, 1, cols / 2, top + room / 2);
        o.fillStyle = "#fff";
        o.fillText(word, 0, 0);
        const d = o.getImageData(0, 0, cols, rows).data;
        for (let i = 0; i < cols * rows; i++) { lit[i] = d[i * 4 + 3] > 110 ? 0.48 : 0;   /* smaller dots with air between them */ delay[i] = Math.random() * 900; }
      }
      dirty = true;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const age = reduce ? 1e9 : t - born;
      const lens = Math.max(80, w / 13);
      ctx.fillStyle = "#fff";
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = y * cols + x, cx = x * gap + gap / 2, cy = y * gap + gap / 2;
        const dd = Math.hypot(cx - ptr.x, cy - ptr.y);
        const near = dd < lens ? 1 - dd / lens : 0;
        const v = age > delay[i] ? lit[i] : 0;
        if (v > 0.035) {
          // halftone: dot area follows brightness
          const r = gap * 0.5 * Math.sqrt(v) * (1 + near * 0.3);
          ctx.globalAlpha = 0.95;
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.fill();
        } else if (near > 0 || (x % pitch === 2 && y % pitch === 2)) {
          // the sparse stage grid; the lens reveals the fine grid under it
          ctx.globalAlpha = 0.22 + near * 0.45;
          ctx.beginPath(); ctx.arc(cx, cy, Math.max(0.8, gap * 0.12) * (1 + near * 1.4), 0, 6.2832); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      // ease the lens toward the pointer
      const dx = ptr.tx - ptr.x, dy = ptr.ty - ptr.y;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) { ptr.x += dx * 0.22; ptr.y += dy * 0.22; dirty = true; }
      if (t - born < 1100) dirty = true;
      if (dirty) { draw(t); dirty = false; }
    };

    const host = canvas.parentElement!;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;            // touch scrolls the page; no lens chasing a thumb
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
      if (ptr.x < -999) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      if (reduce) { ptr.x = ptr.tx; ptr.y = ptr.ty; dirty = true; }
    };
    const leave = () => { ptr.tx = ptr.ty = ptr.x = ptr.y = -9999; dirty = true; };

    let alive = true;
    const ro = new ResizeObserver(layout);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const start = () => {
      if (!alive) return;
      layout(); born = performance.now();
      ro.observe(canvas);
      // the headline can change height (fonts load, text wraps): re-fit the word
      const text = host.querySelector(".hero-in"); if (text) ro.observe(text);
    };
    if (src) {
      const photo = new Image();
      photo.src = src;
      photo.decode().then(() => { img = photo; start(); }, () => document.fonts.ready.then(start));
    } else start();                                     // grid only: nothing lit, just the stage dots and the lens
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [src, word]);

  return label
    ? <canvas ref={ref} className="dotfield" role="img" aria-label={label} />
    : <canvas ref={ref} className="dotfield" aria-hidden />;
}
