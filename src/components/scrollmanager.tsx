import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scroll position on route changes:
 *  - "/#projects" or "/work/flex-academy#process" → scroll to that section
 *  - a plain new page → start at the top
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // "instant" bypasses `html { scroll-behavior: smooth }`, which would
      // otherwise animate all the way up from the previous page's position
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    // the target may not be rendered yet right after navigation — retry briefly
    const seek = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 20) window.setTimeout(seek, 50);
    };
    seek();
  }, [pathname, hash]);

  return null;
}

/**
 * Click handler for in-app links like "/" or "/#projects".
 * React Router ignores a click to the URL you're already on, so when the
 * link points at the current page we scroll manually instead.
 */
export function scrollIfSamePage(to: string, currentPath: string) {
  const [path, id] = to.split("#");
  if ((path || "/") !== currentPath) return;
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
