import { useEffect, useRef } from "react";

/* The pointer, after iPadOS: a soft round cursor that glides after the
   mouse and, over a button or link, morphs into an outline hugging that
   control. Over running text it steps aside for the normal text cursor.
   Only for a real mouse; touch, reduced motion and open dialogs keep the
   system cursor. */

const TARGET = "a, button, summary, [role='button'], .filter";
const TEXT = "p, h1, h2, h3, h4, li, blockquote, dd, dt, figcaption, code";
const MORPH_MAX = { w: 360, h: 120 };                  // bigger things (cards) keep the round pointer

export default function Pointer() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current;
    if (!fine || calm || !el) return;
    document.documentElement.classList.add("has-pointer");

    const now = { x: -100, y: -100, w: 18, h: 18, r: 9 };
    const want = { ...now };
    let over: Element | null = null, raf = 0, down = false, shown = false;

    const aim = (x: number, y: number) => {
      const r = over?.getBoundingClientRect();
      if (r && r.width <= MORPH_MAX.w && r.height <= MORPH_MAX.h) {
        const rad = parseFloat(getComputedStyle(over!).borderTopLeftRadius) || 6;
        // hug the control, with a little give toward the pointer
        Object.assign(want, {
          x: r.left - 5 + (x - (r.left + r.width / 2)) * 0.08,
          y: r.top - 5 + (y - (r.top + r.height / 2)) * 0.12,
          w: r.width + 10, h: r.height + 10, r: Math.min(rad + 5, (r.height + 10) / 2),
        });
        el.classList.add("is-on");
      } else {
        const s = down ? 14 : over ? 34 : 18;            // over a card the pointer swells
        Object.assign(want, { x: x - s / 2, y: y - s / 2, w: s, h: s, r: s / 2 });
        el.classList.remove("is-on");
        el.classList.toggle("is-big", !!over);
      }
    };

    let last = { x: -100, y: -100 };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = { x: e.clientX, y: e.clientY };
      const t = e.target as Element;
      over = t.closest?.(`${TARGET}, .card-btn`) ?? null;
      // over running text the system text cursor takes over
      el.classList.toggle("is-text", !over && !!t.closest?.(TEXT));
      if (!shown) { shown = true; el.style.opacity = "1"; Object.assign(now, { x: e.clientX, y: e.clientY }); }
      aim(e.clientX, e.clientY);
    };
    const press = (on: boolean) => () => { down = on; aim(last.x, last.y); };
    const hide = () => { shown = false; el.style.opacity = "0"; };
    const pressDown = press(true), pressUp = press(false);
    const reaim = () => aim(last.x, last.y);             // controls move under a still pointer when the page scrolls

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const k = el.classList.contains("is-on") ? 0.3 : 0.38;   // a springy follow, tighter when free
      (Object.keys(now) as (keyof typeof now)[]).forEach(p => { now[p] += (want[p] - now[p]) * k; });
      el.style.transform = `translate3d(${now.x}px, ${now.y}px, 0)`;
      el.style.width = `${now.w}px`; el.style.height = `${now.h}px`; el.style.borderRadius = `${now.r}px`;
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pressDown);
    window.addEventListener("pointerup", pressUp);
    window.addEventListener("scroll", reaim, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-pointer");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pressDown);
      window.removeEventListener("pointerup", pressUp);
      window.removeEventListener("scroll", reaim);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, []);

  return <div ref={dot} className="pointer" aria-hidden />;
}
