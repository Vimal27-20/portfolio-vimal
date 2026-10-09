/* Client feedback, confirmed real by Vimal; attributed by role, as given. */
const NOTES = [
  { text: "Vimal transformed our restaurant's digital presence completely. The new menus and displays look stunning and customer engagement has visibly improved.", who: "Restaurant Owner", where: "Peter's Restaurant", work: "Digital menu & brand" },
  { text: "Vimal's design thinking and digital strategy brought real, measurable results. Our online reach grew significantly and the UX fixes were exactly what we needed.", who: "Marketing Lead", where: "AJ Auto Spa", work: "Growth & UX improvements" },
  { text: "A rare UX designer who truly understands enterprise complexity. Vimal delivered a design system our entire team adopted and still uses today.", who: "Product Director", where: "Aspira", work: "Enterprise design system" },
];

export default function Notices() {
  return (
    <section id="notices" className="sec" aria-labelledby="notices-title">
      <div className="sec-head"><h2 id="notices-title" className="sec-title">What clients say</h2></div>
      <ul className="notices">
        {NOTES.map(n => (
          <li key={n.where} className="w notice">
            <blockquote>
              <p>“{n.text}”</p>
            </blockquote>
            <p className="notice-by">
              <strong>{n.who}</strong>, {n.where}
              <span>{n.work}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
