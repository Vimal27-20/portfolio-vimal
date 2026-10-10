import { useEffect, useRef, useState } from "react";
import { PiCaretRight } from "react-icons/pi";
import { EMAIL } from "./links";
import ResumeLink from "./resume";

/** The black block at the end: the address in a field, one press to copy it. */
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
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact-in">
        <h2 id="contact-title" className="contact-title">Say hello.</h2>
        <p className="contact-sub live">Available for UX Engineer roles in Ireland</p>

        <div className="field">
          <a href={`mailto:${EMAIL}`} className="field-value">{EMAIL}</a>
          <button className="btn btn--white field-btn" onClick={copyEmail}>
            {copy === "done" ? "Copied" : "Copy"} <PiCaretRight size={14} aria-hidden />
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {copy === "done" ? "Email address copied" : copy === "failed" ? "Copy failed. Select the address instead." : ""}
        </span>
        {copy === "failed" && <p className="contact-hint">Copy was blocked. Select the address above.</p>}

        <ResumeLink className="btn btn--line-dark contact-cv" label="Download résumé" />
      </div>
    </section>
  );
}
