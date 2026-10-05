import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements up as they scroll into view.
 * Set `style={{ "--reveal-delay": ".1s" }}` on an element to stagger it.
 * Content stays visible without JS or with reduced motion: the hiding
 * class is only added once the observer is running.
 */
export default function useReveal(routeKey: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [routeKey]);
}
