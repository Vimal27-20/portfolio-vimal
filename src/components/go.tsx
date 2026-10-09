import { Link } from "react-router-dom";
import { PiArrowRight, PiArrowUpRight } from "react-icons/pi";
import { destination } from "../data/network";
import type { Project } from "../data/projects";

/** The one way out of a project: its case study, its Behance page, or nothing yet. */
export default function Go({ p, className }: { p: Project; className: string }) {
  const d = destination(p);
  if (d.kind === "case") return <Link to={d.href} className={className}>{d.label} <PiArrowRight size={18} aria-hidden /></Link>;
  if (d.kind === "external")
    return (
      <a href={d.href} target="_blank" rel="noopener noreferrer" className={className}>
        {d.label} <PiArrowUpRight size={18} aria-hidden /><span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  return <span className={className} aria-disabled="true">{d.label}</span>;
}
