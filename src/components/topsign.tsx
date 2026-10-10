import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiList, PiX } from "react-icons/pi";
import { BigLinks } from "./links";
import ResumeLink from "./resume";

const SECTIONS = [
  { id: "work", label: "The work" },
  { id: "now", label: "Right now" },
  { id: "journey", label: "The journey" },
  { id: "contact", label: "Say hello" },
];

/** The floating glass pill: menu, the name in dots, the résumé. Once the
    hero is behind you it settles into a small black island that names the
    section you're in, the way the Dynamic Island does; hover or focus
    opens it back out. */
export default function TopSign() {
  const menu = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();
  const close = () => menu.current?.close();
  useEffect(close, [pathname]);

  const [island, setIsland] = useState(false);
  const [where, setWhere] = useState("");

  // the glass takes the tone of what's under it: dark over the black stages, light over the floors
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const DARK = ".hero, #now, .contact, .foot, .cs-crumbs, .cs-header";
    const check = () => {
      const y = 34;                                     // the pill's centre line
      setDark([...document.querySelectorAll(DARK)].some(el => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      }));
    };
    const t = setTimeout(check, 60);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { clearTimeout(t); window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsland(window.scrollY > Math.min(window.innerHeight * 0.7, 560));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // which section is under the island
  useEffect(() => {
    if (pathname !== "/") {
      // only the project name: the h1 also holds the subtitle, which overflowed the island
      const h = document.querySelector(".cs-title");
      const name = [...(h?.childNodes ?? [])]
        .find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())?.textContent?.trim();
      setWhere(name || "Case study");
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setWhere(SECTIONS.find(s => s.id === e.target.id)?.label ?? "");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    const t = setTimeout(() => SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); }), 50);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  return (
    <>
      <header className="top">
        {/* tabIndex -1: a tap on the island focuses it, which opens it out */}
        <div className={`pill${island ? " is-island" : ""}`} data-tone={dark ? "dark" : "light"} tabIndex={-1}>
          <button className="pill-btn" onClick={() => menu.current?.showModal()} aria-label="Open menu" aria-haspopup="dialog">
            <PiList size={20} aria-hidden />
          </button>
          <Link to="/" className="pill-id" aria-label="Vimal Kumar, home" onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={`${import.meta.env.BASE_URL}img/LOGO-VK.png`} alt="" className="pill-logo" />
            <span className="dot">Vimal Kumar</span>
          </Link>
          <span className="pill-where mono" aria-hidden><span className="pill-where-t">{where}</span></span>
          <ResumeLink className="pill-btn" iconOnly />
        </div>
      </header>

      <dialog ref={menu} className="menu" aria-label="Menu" onClick={e => e.target === e.currentTarget && close()}>
        <div className="menu-in">
          <button className="pill-btn menu-close" onClick={close} aria-label="Close menu"><PiX size={22} aria-hidden /></button>
          <BigLinks onGo={close} />
        </div>
      </dialog>
    </>
  );
}
