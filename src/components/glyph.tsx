import { useEffect, useRef } from "react";

/* A round dot display, after the Glyph Matrix on the back of a Nothing
   phone. It scrolls a line of text in a 5×7 pixel font; dots near the
   pointer light up. With reduced motion it holds still on "VK". */

const N = 25;                                  // 25 × 25 grid, clipped to a circle
const FONT: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01111"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  "1": ["010", "110", "010", "010", "010", "010", "111"],
  " ": ["00", "00", "00", "00", "00", "00", "00"],
  "•": ["000", "000", "000", "010", "000", "000", "000"],
};

/** Text → columns of 7 bits, one blank column between letters. */
function columns(text: string) {
  const cols: number[][] = [];
  for (const ch of text) {
    const g = FONT[ch] ?? FONT[" "];
    for (let x = 0; x < g[0].length; x++) cols.push(g.map(row => +row[x]));
    cols.push([0, 0, 0, 0, 0, 0, 0]);
  }
  return cols;
}

export default function Glyph({ text, label }: { text: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tape = columns(reduce ? "VK" : text + "   ");
    const pointer = { x: -1, y: -1 };
    let size = 0, raf = 0, visible = true, last = 0, offset = reduce ? -10 : -N;

    const fit = () => {
      size = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const cell = size / N, r = cell * 0.34, mid = (N - 1) / 2;
      ctx.clearRect(0, 0, size, size);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        if (Math.hypot(x - mid, y - mid) > mid + 0.2) continue;
        const ty = y - 9;                       // text sits on rows 9–15
        const col = tape[(x + offset) % tape.length];
        const on = ty >= 0 && ty < 7 && x + offset >= 0 && !!col?.[ty];
        // dots near the pointer warm up
        const near = pointer.x < 0 ? 0 : Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 4.5);
        const a = on ? 1 : 0.16 + near * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, on ? r * 1.08 : r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (t - last < 90) return;               // the display steps, it doesn't glide
      last = t;
      if (!reduce) offset = offset + 1 >= tape.length ? -N + 1 : offset + 1;
      draw();
    };

    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - b.left) / b.width) * N - 0.5;
      pointer.y = ((e.clientY - b.top) / b.height) * N - 0.5;
      if (reduce) draw();
    };
    const leave = () => { pointer.x = pointer.y = -1; if (reduce) draw(); };

    const ro = new ResizeObserver(() => { fit(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    fit(); draw();
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [text]);

  return <canvas ref={ref} className="glyph" role="img" aria-label={label} />;
}
