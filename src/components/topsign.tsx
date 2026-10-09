import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiList, PiX, PiDownloadSimple } from "react-icons/pi";
import { BigLinks, RESUME } from "./links";

/** Nothing's floating grey pill: menu, the name in dots, the résumé. */
export default function TopSign() {
  const menu = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();
  const close = () => menu.current?.close();
  useEffect(close, [pathname]);

  return (
    <>
      <header className="top">
        <div className="pill">
          <button className="pill-btn" onClick={() => menu.current?.showModal()} aria-label="Open menu" aria-haspopup="dialog">
            <PiList size={20} aria-hidden />
          </button>
          <Link to="/" className="pill-id" aria-label="Vimal Kumar, home" onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={`${import.meta.env.BASE_URL}img/LOGO-VK.png`} alt="" className="pill-logo" />
            <span className="dot">Vimal Kumar</span>
          </Link>
          <a href={RESUME} download="Vimal-kumar-Resume.pdf" className="pill-btn" aria-label="Download résumé (PDF)">
            <PiDownloadSimple size={20} aria-hidden />
          </a>
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
