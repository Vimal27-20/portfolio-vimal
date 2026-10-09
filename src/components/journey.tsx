/* The career as one route: work stops are filled, study stops are open
   rings, the current stop is marked Now. Oldest at the start of the line. */

const STOPS = [
  { role: "BSc Computer Science",    date: "2017 – 2021",        place: "SRM Institute of Technology, India",       type: "edu",  note: "Built the logic foundation that drives every design decision." },
  { role: "BI & Tableau Admin",      date: "2021 – 2022",        place: "Infosys, India",                           type: "work", note: "Turned raw data into visual stories at enterprise scale." },
  { role: "UX UI Designer",          date: "2023 – 2024",        place: "Aspira, India",                            type: "work", note: "End-to-end product design: research, prototypes and handoff." },
  { role: "Master's in IXD",         date: "2024 – 2025",        place: "University of Limerick, Ireland",          type: "edu",  note: "Deepened craft: theory, accessibility and systems thinking." },
  { role: "Freelance UX Consultant", date: "Sep 2025 – Present", place: "Peter's Restaurant & AJ Auto Spa, Ireland", type: "work", note: "Human-centred design for real businesses, from strategy to delivery." },
];

export default function Journey() {
  return (
    <section id="journey" className="sec" aria-labelledby="journey-title">
      <h2 id="journey-title" className="sec-title">The journey <small>From computer science to UX engineering.</small></h2>

      <ol className="route">
        {STOPS.map(s => {
          const now = s.date.includes("Present");
          return (
            <li key={s.role} className={`route-stop is-${s.type}${now ? " is-now" : ""}`}>
              <span className="route-dot" aria-hidden />
              <p className="route-date">{now ? <><span className="route-nowtag">Now</span> {s.date}</> : s.date}</p>
              <h3 className="route-role">{s.role}</h3>
              <p className="route-place">{s.place}</p>
              <p className="route-note">{s.note}</p>
            </li>
          );
        })}
      </ol>
      <p className="route-key">
        <span><i className="k-work" aria-hidden /> Work</span>
        <span><i className="k-edu" aria-hidden /> Study</span>
      </p>
    </section>
  );
}
