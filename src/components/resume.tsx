import { useEffect, useRef, useState, type ReactNode } from "react";
import { PiDownloadSimple, PiCheck } from "react-icons/pi";
export const RESUME = `${import.meta.env.BASE_URL}img/Vimal-kumar-Resume.pdf`;

/* Every résumé link: the browser downloads the PDF straight away, and the
   link plays it back: the arrow drops into its tray while a row of dots
   fills underneath, then it settles on a tick. */
export default function ResumeLink({
  className = "", label = "Résumé", icon = true, iconOnly = false, children,
}: { className?: string; label?: string; icon?: boolean; iconOnly?: boolean; children?: ReactNode }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const play = () => {
    timers.current.forEach(clearTimeout);
    setState("busy");
    timers.current = [
      setTimeout(() => setState("done"), 1100),
      setTimeout(() => setState("idle"), 3200),
    ];
  };

  const Icon = state === "done" ? PiCheck : PiDownloadSimple;
  return (
    <a href={RESUME} download="Vimal-kumar-Resume.pdf" onClick={play}
       className={`dl is-${state} ${className}`} aria-label={iconOnly ? "Download résumé (PDF)" : undefined}>
      {!iconOnly && <span className="dl-text">{state === "done" ? "Saved" : children ?? label}</span>}
      {icon && <span className="dl-icon" aria-hidden><Icon size={iconOnly ? 20 : 15} /></span>}
      <span className="dl-bar" aria-hidden />
      <span className="sr-only" aria-live="polite">{state === "busy" ? "Downloading résumé" : state === "done" ? "Résumé downloaded" : ""}</span>
    </a>
  );
}
