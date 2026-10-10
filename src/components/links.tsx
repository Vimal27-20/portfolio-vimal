import { Link, useLocation } from "react-router-dom";
import { scrollIfSamePage } from "./scrollmanager";
import ResumeLink from "./resume";

export { RESUME } from "./resume";
export const EMAIL = "vimal.v27k@gmail.com";
export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vimal27k/" },
  { label: "Behance",  href: "https://www.behance.net/vimalkveerara" },
  { label: "Dribbble", href: "https://dribbble.com/vimalkumar" },
];
const PAGES = [
  { label: "Work",    to: "/#work" },
  { label: "Right now", to: "/#now" },
  { label: "Journey", to: "/#journey" },
  { label: "Contact", to: "/#contact" },
];

/** The big dot-matrix menu, shared by the nav overlay and the footer. */
export function BigLinks({ onGo }: { onGo?: () => void }) {
  const { pathname } = useLocation();
  return (
    <ul className="big-links">
      {PAGES.map(l => (
        <li key={l.label}>
          <Link className="dot" to={l.to} onClick={() => { onGo?.(); scrollIfSamePage(l.to, pathname); }}>{l.label}</Link>
        </li>
      ))}
      <li><ResumeLink className="dot" icon={false} /></li>
      {SOCIALS.map(s => (
        <li key={s.label}>
          <a className="dot" href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
