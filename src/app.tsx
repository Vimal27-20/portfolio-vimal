import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import ScrollManager, { scrollIfSamePage } from "./components/scrollmanager";
import TopSign from "./components/topsign";
import Network from "./components/network";
import Journey from "./components/journey";
import Notices from "./components/notices";
import Toolkit from "./components/toolkit";
import Terminus from "./components/terminus";
import CaseStudyRoute from "./pages/casestudy";
import "./styles/line.css";

const FOOT_LINKS = [
  { label: "Work",    to: "/#work" },
  { label: "Journey", to: "/#journey" },
  { label: "Contact", to: "/#contact" },
];

function Home() {
  return (
    <div className="wrap home">
      <Network />
      <Journey />
      <Notices />
      <Toolkit />
      <Terminus />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollManager />
      <TopSign />

      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudyRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>© 2026 Vimal Kumar</span>
          <nav aria-label="Footer">
            {FOOT_LINKS.map(l => (
              <Link key={l.label} to={l.to} onClick={() => scrollIfSamePage(l.to, pathname)}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
