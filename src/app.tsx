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
import "./styles/nothing.css";

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
