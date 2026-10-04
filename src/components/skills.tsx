const skills = [
  { icon: "🎨", title: "UX/UI Design", desc: "User Research, Interaction Design, Wireframing, Prototyping, Usability Testing, A/B Testing, Heuristic Evaluation, Accessibility (WCAG), Design Systems, Service Design" },
  { icon: "🛠️", title: "Design Tools", desc: "Figma, Sketch, Framer, Adobe XD, Miro, Notion, Affinity, Canva, Photoshop" },
  { icon: "🤖", title: "AI Design Tools", desc: "Claude Design, Framer AI, UXtweak AI, Dovetail AI, UX Writing, Vibe Coding" },
  { icon: "💻", title: "Front-End", desc: "HTML, CSS, JavaScript, TypeScript, React.js — enabling smooth design-to-development handoffs" },
  { icon: "📊", title: "Data & Methods", desc: "Tableau, Power BI, GCP, AWS, BigQuery, ServiceNow, GitHub, Agile/Scrum, Probe Methodology, Design Sprints" },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="sec-head">
        <h2>Skills</h2>
        <p>Design, technology, and methods from your resume</p>
      </div>
      <div
        className="skills-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }}
      >
        {skills.map((s) => (
          <div
            key={s.title}
            style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)", padding: "22px",
              boxShadow: "var(--shadow)", minHeight: "200px",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>{s.icon}</div>
            <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>{s.title}</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
