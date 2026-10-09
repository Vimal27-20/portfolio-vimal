import { useState } from "react";
import { projects, categoryOf, CATEGORIES, type Category } from "../data/projects";
import Go from "./go";

/* Every other project as a home-screen widget. Case studies get the big
   tiles; the filter row narrows by category. */
export default function Work() {
  const [filter, setFilter] = useState<Category | null>(null);
  const rest = projects
    .filter(p => p.slug !== "vise")
    .sort((a, b) => Number(!!b.caseStudy) - Number(!!a.caseStudy));
  const shown = filter ? rest.filter(p => categoryOf(p) === filter) : rest;
  const count = (c: Category | null) => (c ? rest.filter(p => categoryOf(p) === c).length : rest.length);
  const chips: (Category | null)[] = [null, ...CATEGORIES.filter(c => count(c) > 0)];

  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="sec-head">
        <h2 id="work-title" className="sec-title">More work</h2>
        <p>Mobile, web, enterprise and IoT projects. Case studies open here; the rest open on Behance.</p>
      </div>

      <div className="filters" role="group" aria-label="Filter projects">
        {chips.map(c => (
          <button key={c ?? "all"} className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c ?? "All"} <span className="data">{count(c)}</span>
          </button>
        ))}
        <span className="sr-only" aria-live="polite">{shown.length} projects shown</span>
      </div>

      <ul className="grid">
        {shown.map(p => (
          <li key={p.slug} className={`w tile${p.caseStudy && !filter ? " tile--big" : ""}`}>
            <div className="tile-img"><img src={p.img} alt={p.alt} loading="lazy" /></div>
            <h3 className="tile-title">{p.title}</h3>
            <p className="tile-meta"><span className="data">{categoryOf(p)} · {p.year}</span></p>
            {p.caseStudy && <p className="tile-desc">{p.desc}</p>}
            <p className="tile-role">{p.role} <span aria-hidden>·</span> {p.duration}</p>
            <Go p={p} className="tile-go" />
          </li>
        ))}
      </ul>
    </section>
  );
}
