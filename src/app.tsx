import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import CursorFollower from "./components/cursorfollower";
import ScrollManager, { scrollIfSamePage } from "./components/scrollmanager";
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
  return (
    <>
      <ScrollManager />
      <CursorFollower />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudyRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
