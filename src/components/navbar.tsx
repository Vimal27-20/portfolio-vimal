import { useEffect, useRef, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollIfSamePage } from "./scrollmanager";

const NAV_LINKS = [
  { label: "Home",     to: "/"          },
  { label: "Projects", to: "/#projects" },
  { label: "Contact",  to: "/#contact"  },
];

export default function Navbar() {
  const [dlState, setDlState]   = useState<"idle" | "loading" | "done">("idle");
  const [logoPressed, setLogoPressed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // compact the bar once the top-of-page marker leaves the viewport
  useEffect(() => {
    const marker = document.getElementById("scroll-sentinel");
    if (!marker) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(marker);
    return () => io.disconnect();
  }, []);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  // close the mobile menu on navigation, Esc, or a click outside
  useEffect(() => setMenuOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  const onNav = (to: string) => {
    setMenuOpen(false);
    scrollIfSamePage(to, pathname);
  };

  const handleDownload = () => {
    if (dlState !== "idle") return;
    setDlState("loading");
    setTimeout(() => {
      setDlState("done");
      const a = document.createElement("a");
      a.href = `${import.meta.env.BASE_URL}img/Vimal-kumar-Resume.pdf`;
      a.download = "Vimal-kumar-Resume.pdf";
      a.click();
      setTimeout(() => setDlState("idle"), 2200);
    }, 1400);
  };

  const handleLogo = () => {
    setLogoPressed(true);
    setTimeout(() => setLogoPressed(false), 400);
    if (pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes logoPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(.88); }
          70%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        .nav-logo {
          height: 48px; width: auto;
          cursor: pointer;
          border-radius: 10px;
          transition: box-shadow .2s;
          animation: none;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          border: none;
          background: none;
          padding: 0;
          display: block;
        }
        .nav-logo:hover { box-shadow: 0 4px 16px rgba(0,0,0,.12); }
        .nav-logo.pressed { animation: logoPop .38s cubic-bezier(.36,.07,.19,.97) forwards; }

        .nav-link {
          color: var(--muted, #666);
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          position: relative;
          transition: color .2s;
          letter-spacing: .01em;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 2px;
          background: var(--accent, #a7f13a);
          border-radius: 2px;
          transition: width .25s ease;
        }
        .nav-link:hover { color: #111; }
        .nav-link:hover::after { width: 100%; }

        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 999px;
          border: 2px solid #222;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: .01em;
          transition: background .3s, color .3s, box-shadow .3s, transform .15s;
        }
        .nav-resume:hover { transform: translateY(-2px); }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>

      <nav ref={navRef} aria-label="Main" className={`site-nav${scrolled ? " is-scrolled" : ""}`} style={{
        position:             "sticky",
        top:                  0,
        zIndex:               100,
        backdropFilter:       "saturate(180%) blur(18px)",
        WebkitBackdropFilter: "saturate(180%) blur(18px)",
      }}>
        <div
          className="wrap"
          style={{
            position:       "relative",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            24,
          }}
        >

          {/* ── logo — clickable, animated ── */}
          <button
            onClick={handleLogo}
            onMouseDown={() => setLogoPressed(true)}
            onMouseUp={() => setTimeout(() => setLogoPressed(false), 380)}
            className={`nav-logo${logoPressed ? " pressed" : ""}`}
            title={pathname === "/" ? "Back to top" : "Back to home"}
            aria-label="Go to top"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/LOGO-VK.png`}
              alt="VK"
              className="nav-logo-img"
              style={{ width: "auto", objectFit: "contain", display: "block", pointerEvents: "none" }}
            />
          </button>

          {/* ── nav links — only 3 ── */}
          <div
            className="nav-links"
            style={{ display: "flex", gap: 32, alignItems: "center" }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="nav-link" onClick={() => onNav(to)}>
                {label}
              </Link>
            ))}
          </div>

          {/* ── resume download + mobile menu toggle ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={handleDownload}
            aria-live="polite"
            className="nav-resume"
            style={{
              background: dlState === "done" ? "#a7f13a" : "#111",
              color:      dlState === "done" ? "#1a3a00" : "#fff",
              boxShadow:  dlState === "done"
                ? "4px 4px 0 #1a3a0044"
                : "4px 4px 0 rgba(0,0,0,.55)",
            }}
          >
            {dlState === "idle" && (
              <><HiDownload size={15} /> Resume</>
            )}
            {dlState === "loading" && (
              <>
                <span style={{
                  width: 13, height: 13, borderRadius: "50%",
                  border: "2.5px solid rgba(255,255,255,.28)",
                  borderTopColor: "#fff",
                  display: "inline-block",
                  animation: "spin .7s linear infinite",
                }} />
                Preparing…
              </>
            )}
            {dlState === "done" && (
              <><span style={{ fontSize: 14 }}>✓</span> Downloaded!</>
            )}
          </button>

          <button
            className="nav-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span />
          </button>
          </div>

          {/* ── mobile menu ── */}
          <div id="nav-menu" className={`nav-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} onClick={() => onNav(to)} tabIndex={menuOpen ? 0 : -1}>
                {label}
              </Link>
            ))}
          </div>

        </div>
      </nav>
    </>
  );
}