import { Routes, Route, Navigate } from "react-router-dom";
import ScrollManager from "./components/scrollmanager";
import TopSign from "./components/topsign";
import Hero from "./components/hero";
import Work from "./components/work";
import Widgets from "./components/widgets";
import Journey from "./components/journey";
import Terminus from "./components/terminus";
import { QuickViewProvider } from "./components/quickview";
import { BigLinks } from "./components/links";
import { useDublinTime } from "./components/clock";
import CaseStudyRoute from "./pages/casestudy";
import Pointer from "./components/pointer";
import "./styles/nothing.css";
import "./styles/glass.css";

function Home() {
  return (
    <QuickViewProvider>
      <Hero />
      <Work />
      <Widgets />
      <Journey />
      <Terminus />
    </QuickViewProvider>
  );
}

/** Nothing's footer: the whole site as one big dot-matrix menu. */
function Footer() {
  const time = useDublinTime();
  return (
    <footer className="foot">
      <nav aria-label="Footer" className="wrap"><BigLinks /></nav>

      {/* where the look comes from, said plainly */}
      <div className="wrap credits">
        <p className="credits-lead">
          Inspired by <a href="https://nothing.tech" target="_blank" rel="noopener noreferrer">Nothing OS and nothing.tech<span className="sr-only"> (opens in a new tab)</span></a>.
          Glass and motion touches after Apple's iOS and visionOS.
          An independent portfolio, not affiliated with or endorsed by Nothing Technology Limited or Apple Inc.
        </p>
        <dl className="credits-list">
          <div><dt className="mono">Design &amp; code</dt><dd>Vimal Kumar</dd></div>
          <div><dt className="mono">Dot-matrix type</dt><dd>Doto by Óliver Lalan</dd></div>
          <div><dt className="mono">Serif</dt><dd>Newsreader by Production Type</dd></div>
          <div><dt className="mono">Sans &amp; mono</dt><dd>Geist by Vercel</dd></div>
          <div><dt className="mono">Icons</dt><dd>Phosphor</dd></div>
          <div><dt className="mono">Built with</dt><dd>React, Vite, Claude Code</dd></div>
        </dl>
      </div>

      <div className="wrap foot-in mono">
        <span>© 2026 Vimal Kumar</span>
        <span>Dublin {time}</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Pointer />
      <TopSign />

      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudyRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
