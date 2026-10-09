import { PiPlus } from "react-icons/pi";

/* The career as a spec list: one row per stop, newest first, each opens
   to say what it taught. The current stop starts open with the red light. */

const STOPS = [
  { role: "Freelance UX Consultant", date: "Sep 2025 – Present", place: "Peter's Restaurant & AJ Auto Spa, Ireland", type: "Work",  note: "Human-centred design for real businesses, from strategy to delivery." },
  { role: "Master's in IXD",         date: "2024 – 2025",        place: "University of Limerick, Ireland",          type: "Study", note: "Deepened craft: theory, accessibility and systems thinking." },
  { role: "UX UI Designer",          date: "2023 – 2024",        place: "Aspira, India",                            type: "Work",  note: "End-to-end product design: research, prototypes and handoff." },
  { role: "BI & Tableau Admin",      date: "2021 – 2022",        place: "Infosys, India",                           type: "Work",  note: "Turned raw data into visual stories at enterprise scale." },
  { role: "BSc Computer Science",    date: "2017 – 2021",        place: "SRM Institute of Technology, India",       type: "Study", note: "Built the logic foundation that drives every design decision." },
];

export default function Journey() {
  return (
    <section id="journey" className="sec" aria-labelledby="journey-title">
      <div className="wrap journey">
        <div className="journey-head">
          <h2 id="journey-title" className="sec-title">The journey</h2>
          <p>From computer science to UX engineering, across India and Ireland.</p>
        </div>

        <ol className="stops">
          {STOPS.map((s, i) => {
            const now = s.date.includes("Present");
            return (
              <li key={s.role}>
                <details className="stop" open={i === 0}>
                  <summary>
                    <span className="dot stop-year" aria-hidden>{s.date.match(/\d{4}/)?.[0]}</span>
                    <span className="stop-role">{s.role}</span>
                    <span className={`mono stop-type${now ? " live" : ""}`}>{now ? "Now" : s.type}</span>
                    <PiPlus className="stop-icon" size={18} aria-hidden />
                  </summary>
                  <div className="stop-body">
                    <p className="mono">{s.date}</p>
                    <p className="stop-place">{s.place}</p>
                    <p className="stop-note">{s.note}</p>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
