const items = [
  { text: "Vimal transformed our restaurant's digital presence completely. The new menus and displays look stunning and customer engagement has visibly improved.", name: "Restaurant Owner", role: "Digital menu & brand · Peter's Restaurant", init: "R", bg: "var(--accent)", color: "var(--accent-text)" },
  { text: "Vimal's design thinking and digital strategy brought real, measurable results. Our online reach grew significantly and the UX fixes were exactly what we needed.", name: "Marketing Lead", role: "Growth & UX improvements · AJ Auto Spa", init: "M", bg: "#c8e7ff", color: "#0a3055" },
  { text: "A rare UX designer who truly understands enterprise complexity. Vimal delivered a design system our entire team adopted and still uses today.", name: "Product Director", role: "Enterprise design system · Aspira", init: "P", bg: "#ffe4cd", color: "#5c2a0c" },
];

const cursorCSS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Ccircle cx='17' cy='17' r='15' fill='%23a7f13a' stroke='%23222' stroke-width='2.5'/%3E%3Ctext x='17' y='22' text-anchor='middle' font-size='14' font-family='serif' fill='%231a3300'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E") 17 17, pointer`;

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="sec-head">
        <h2>Testimonials</h2>
        <p>Hover cards for a custom cursor · Real feedback from real clients</p>
      </div>
      <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
        {items.map((t) => (
          <div
            key={t.name}
            style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--r-lg)", padding: "26px",
              boxShadow: "var(--shadow)", display: "flex",
              flexDirection: "column", gap: "16px",
              cursor: cursorCSS,
              transition: "transform .22s, box-shadow .22s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 38px rgba(0,0,0,.12)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "var(--shadow)"; }}
          >
            <div style={{ color: "#f6b900", fontSize: "18px", letterSpacing: "3px" }}>★★★★★</div>
            <div style={{ fontFamily: `"Instrument Serif",Georgia,serif`, fontSize: "80px", lineHeight: ".4", color: "var(--accent)", marginBottom: "6px" }}>"</div>
            <p style={{ fontSize: "15px", color: "#333", lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "12px", borderTop: "1px solid var(--line)" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: t.bg, fontWeight: 800, fontSize: "18px", color: t.color, border: "2px solid #222", flexShrink: 0 }}>{t.init}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
