/* Skills grouped by craft, one row per group. */
const ROWS = [
  { title: "UX/UI Design",    items: ["User Research", "Interaction Design", "Wireframing", "Prototyping", "Usability Testing", "A/B Testing", "Heuristic Evaluation", "Accessibility (WCAG)", "Design Systems", "Service Design"] },
  { title: "Front-End",       items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "React Native"] },
  { title: "Design Tools",    items: ["Figma", "Sketch", "Framer", "Adobe XD", "Miro", "Notion", "Affinity", "Canva", "Photoshop"] },
  { title: "AI Design Tools", items: ["Claude Design", "Framer AI", "UXtweak AI", "Dovetail AI", "UX Writing", "Vibe Coding"] },
  { title: "Data & Methods",  items: ["Tableau", "Power BI", "GCP", "AWS", "BigQuery", "ServiceNow", "GitHub", "Agile/Scrum", "Probe Methodology", "Design Sprints"] },
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="sec" aria-labelledby="toolkit-title">
      <div className="sec-head"><h2 id="toolkit-title" className="sec-title">Toolkit</h2></div>
      <dl className="w timetable">
        {ROWS.map(r => (
          <div key={r.title} className="tt-row">
            <dt>{r.title}</dt>
            <dd><ul>{r.items.map(i => <li key={i}>{i}</li>)}</ul></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
