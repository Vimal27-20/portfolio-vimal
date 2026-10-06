import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import ScrollManager, { scrollIfSamePage } from "./components/scrollmanager";
import useReveal from "./components/reveal";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Timeline from "./components/timeline";
import Contact from "./components/contact";
import CaseStudyRoute from "./pages/casestudy";

const FOOTER_LINKS = [
  { label: "Home",     to: "/"          },
  { label: "Projects", to: "/#projects" },
  { label: "Contact",  to: "/#contact"  },
];

function Home() {
  return (
    <div className="wrap">
      <Hero />
      <Projects />
      <Timeline />
      <Contact />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useReveal(pathname);

  return (
    <>
      {/* 1px marker at the very top: the nav watches it to know when the page has scrolled */}
      <div id="scroll-sentinel" aria-hidden style={{ position: "absolute", top: 0, height: 1, width: 1 }} />
      <ScrollManager />
      <Navbar />

      {/* keyed by path so every page change plays the enter transition */}
      <main id="main" key={pathname} className="route-enter" tabIndex={-1} style={{ outline: "none" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudyRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer style={{ padding: "28px 0 52px" }}>
        <div
          className="wrap"
          style={{
            borderTop:      "1px solid var(--line)",
            paddingTop:     "22px",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "12px",
            fontSize:       "13px",
            color:          "var(--muted)",
          }}
        >
          {/* left — copyright */}
          <span style={{ fontWeight: 500 }}>© 2026 Vimal Kumar</span>

          {/* centre/right — 3 links only */}
          <div style={{ display: "flex", gap: "24px" }}>
            {FOOTER_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => scrollIfSamePage(to, pathname)}
                style={{
                  fontWeight:     600,
                  color:          "var(--muted)",
                  textDecoration: "none",
                  transition:     "color .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
