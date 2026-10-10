import { useEffect, useRef } from "react";

/* Vimal's photo as dotted art: the matted black-and-white portrait sampled
   onto a small dot grid, brighter areas as bigger dots. Under a mouse the
   dots near the pointer light up in the logo green. Static otherwise. */
export default function PortraitDots({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    let w = 0, h = 0, gap = 5, cols = 0, rows = 0, v = new Float32Array(0), ox = 0, oy = 0;
    const ptr = { x: -1e4, y: -1e4 };
    let alive = true;

    const sample = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      if (!w || !h || !img.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = Math.max(3.4, Math.min(5, w / 64));   // fine enough for the face to read
      // fit the photo inside the box, keeping its shape
      const scale = Math.min(w / img.width, h / img.height);
      cols = Math.floor((img.width * scale) / gap); rows = Math.floor((img.height * scale) / gap);
      ox = (w - cols * gap) / 2; oy = h - rows * gap;   // sits on the foot of the box
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.imageSmoothingQuality = "high";
      o.drawImage(img, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      v = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const L = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
        // lift the mid-tones so the face reads, not only the white shirt
        v[i] = Math.pow(Math.min(1, Math.max(0, (L - 0.1) / 0.55)), 0.7);
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const b = v[y * cols + x];
        if (b < 0.14) continue;                          // no stray specks from the dark background
        if (y < rows * 0.07) continue;                  // the faint ceiling light above the head
        const cx = ox + x * gap + gap / 2, cy = oy + y * gap + gap / 2;
        const near = Math.max(0, 1 - Math.hypot(cx - ptr.x, cy - ptr.y) / 60);
        ctx.fillStyle = near > 0.15 ? "#a8f83a" : "#fff";
        ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.arc(cx, cy, gap * 0.48 * Math.sqrt(b) * (1 + near * 0.25), 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (calm || e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    };
    const leave = () => { ptr.x = ptr.y = -1e4; cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };

    const ro = new ResizeObserver(sample);
    img.src = src;
    img.decode().then(() => { if (alive) { ro.observe(canvas); sample(); } }, () => {});
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [src]);

  return <canvas ref={ref} className="portrait-dots" role="img" aria-label={label} />;
}
