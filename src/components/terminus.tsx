import { useEffect, useRef, useState } from "react";
import { PiCopy, PiCheck, PiDownloadSimple, PiArrowUpRight } from "react-icons/pi";

const EMAIL = "vimal.v27k@gmail.com";
const RESUME = `${import.meta.env.BASE_URL}img/Vimal-kumar-Resume.pdf`;
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vimal27k/" },
  { label: "Behance",  href: "https://www.behance.net/vimalkveerara" },
  { label: "Dribbble", href: "https://dribbble.com/vimalkumar" },
];

/** End of the line: the one place to act. */
export default function Terminus() {
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopy("done"); }
    catch { setCopy("failed"); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 2400);
  };

  return (
    <section id="contact" className="sec" aria-labelledby="contact-title">
      <div className="terminus sign">
        <h2 id="contact-title" className="terminus-title">Next stop: your team.</h2>

        <a href={`mailto:${EMAIL}`} className="terminus-email">{EMAIL}</a>
        <p className="terminus-status"><span className="terminus-dot" aria-hidden /> Available for UX/UI and product design roles in Ireland</p>

        <div className="terminus-actions">
          <button className="btn btn--now" onClick={copyEmail}>
            {copy === "done" ? <PiCheck size={18} aria-hidden /> : <PiCopy size={18} aria-hidden />}
            {copy === "done" ? "Copied" : "Copy email"}
          </button>
          <a href={RESUME} download="Vimal-kumar-Resume.pdf" className="btn btn--light">
            <PiDownloadSimple size={18} aria-hidden /> Download résumé
          </a>
          <span className="sr-only" aria-live="polite">
            {copy === "done" ? "Email address copied" : copy === "failed" ? "Copy failed. Select the address instead." : ""}
          </span>
        </div>
        {copy === "failed" && <p className="terminus-hint">Copy was blocked. Select the address above.</p>}

        <ul className="terminus-links">
          {SOCIALS.map(s => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <PiArrowUpRight size={15} aria-hidden /><span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
