import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiDownloadSimple } from "react-icons/pi";
import { scrollIfSamePage } from "./scrollmanager";

const RESUME = `${import.meta.env.BASE_URL}img/Vimal-kumar-Resume.pdf`;
const LINKS = [
  { label: "Work",    to: "/#work" },
  { label: "Journey", to: "/#journey" },
  { label: "Contact", to: "/#contact" },
];

/** The station-name bar: who this is, where to go, the résumé. */
export default function TopSign() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="top">
      <div className="wrap top-in">
        <button
          className="top-id"
          onClick={() => (pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : navigate("/"))}
          aria-label={pathname === "/" ? "Back to top" : "Home"}
        >
          <img src={`${import.meta.env.BASE_URL}img/LOGO-VK.png`} alt="" className="top-logo" />
          <span className="top-name">Vimal Kumar<small>UX Engineer · Ireland</small></span>
        </button>

        <nav aria-label="Main" className="top-nav">
          {LINKS.map(l => (
            <Link key={l.label} to={l.to} onClick={() => scrollIfSamePage(l.to, pathname)}>{l.label}</Link>
          ))}
        </nav>

        <a href={RESUME} download="Vimal-kumar-Resume.pdf" className="btn btn--now top-cv">
          <PiDownloadSimple size={18} aria-hidden /> <span>Résumé</span>
        </a>
      </div>
    </header>
  );
}
