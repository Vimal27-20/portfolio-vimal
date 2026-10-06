import { useState, useEffect } from "react";
import { SiGmail, SiBehance, SiDribbble } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const socials = [
  { label: "Email",    href: "mailto:vimal.v27k@gmail.com",        icon: SiGmail,      defaultBg: "#EA4335", hoverBg: "#c0392b" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vimal27k/", icon: FaLinkedinIn, defaultBg: "#0A66C2", hoverBg: "#004da1" },
  { label: "Behance",  href: "https://www.behance.net/vimalkveerara",     icon: SiBehance,    defaultBg: "#1769FF", hoverBg: "#0040cc" },
  { label: "Dribbble", href: "https://dribbble.com/vimalkumar",    icon: SiDribbble,   defaultBg: "#EA4C89", hoverBg: "#c2185b" },
];

const clients = ["Peter's Restaurant", "AJ Auto Spa"];
const loop    = [...clients, ...clients, ...clients];

// ── Social button ──────────────────────────────────────────
function SocialBtn({ s }: { s: (typeof socials)[0] }) {
  const [hov, setHov] = useState(false);
  const Icon = s.icon;
  return (
    <a
      href={s.href} title={s.label} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 54, height: 54, borderRadius: "50%",
        border: "2px solid #222",
        background: hov ? s.hoverBg : s.defaultBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? `6px 6px 0 ${s.defaultBg}88` : "5px 5px 0 rgba(0,0,0,.75)",
        transform: hov ? "translateY(-5px) scale(1.12)" : "none",
        transition: "all .2s", textDecoration: "none", flexShrink: 0,
      }}
    >
      <Icon size={22} color="#fff" aria-hidden />
    </a>
  );
}

// ── Hero ───────────────────────────────────────────────────
export default function Hero() {
  const phrases = ["Available for Work", "Open to Opportunities", "Let's Collaborate"];
  const [phraseI, setPhraseI]   = useState(0);
  const [typed, setTyped]       = useState("");
  const [deleting, setDeleting] = useState(false);
  const full = phrases[phraseI];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && typed.length < full.length)
      t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 75);
    else if (!deleting && typed.length === full.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && typed.length > 0)
      t = setTimeout(() => setTyped(full.slice(0, typed.length - 1)), 40);
    else {
      t = setTimeout(() => {
        setDeleting(false);
        setPhraseI((i) => (i + 1) % phrases.length);
      }, 400);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, full]);

  return (
    <>
      <style>{`
        /* pulse dot */
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(31,220,60,.65); }
          50%      { box-shadow: 0 0 0 9px rgba(31,220,60,0);   }
        }
        .avail-dot { animation: heroPulse 1.8s ease-in-out infinite; }

        /* cursor blink */
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        .typer-cursor {
          display: inline-block; width: 2px; height: 1.1em;
          background: #222; margin-left: 3px;
          vertical-align: middle;
          animation: blink .7s step-end infinite;
        }

        /* marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .mq {
          animation: marquee 7s linear infinite;
          display: flex; width: max-content;
        }
        .mq:hover { animation-play-state: paused; }

        /* responsive */
        @media (max-width: 860px) {
          .hero-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-right { order: -1; }
        }
      `}</style>

      <section
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: "56px",
          alignItems: "center",
          minHeight: "88vh",
          padding: "32px 0 56px",
        }}
      >
        {/* ── LEFT ── */}
        <div>

          {/* animated available pill */}
          <div data-reveal="1" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "12px 20px", border: "2px solid #222",
            background: "rgba(255,255,255,.6)", borderRadius: "var(--r-pill)",
            fontSize: 15, fontWeight: 600,
            marginBottom: 28, backdropFilter: "blur(6px)",
            minWidth: 240, maxWidth: "100%",
          }}>
            <span className="avail-dot" style={{
              width: 11, height: 11, borderRadius: "50%",
              background: "#1fdc3c", flexShrink: 0, display: "block",
            }} />
            <span style={{ letterSpacing: ".01em" }}>
              {typed}<span className="typer-cursor" />
            </span>
          </div>

          {/* headline */}
          <h1 className="hero-h1" data-reveal="2" style={{
            fontFamily: `"Instrument Serif",Georgia,serif`,
            fontSize: "clamp(54px,8vw,108px)",
            lineHeight: 0.9, letterSpacing: "-.06em", marginBottom: 22,
          }}>
            Hi, I'm a UX<br /><em>Strategist</em>
          </h1>

          {/* bio */}
          <p data-reveal="3" style={{
            fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.6,
            color: "#2d2d2d", maxWidth: 580, marginBottom: 32,
          }}>
            Empathy-led designer blending research, accessibility, business
            thinking, and front-end execution to build seamless enterprise experiences.
          </p>

          {/* expertise */}
          <div data-reveal="4" style={{ marginTop: 8, marginBottom: 32 }}>
            <span style={{
              display: "block", fontWeight: 700, fontSize: 10,
              letterSpacing: ".18em", textTransform: "uppercase",
              color: "#aaa", marginBottom: 12,
            }}>
              Areas of Expertise
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Interaction Design (IXD)", "Customer Service Design (CX)", "Bridging Business & Design" ,"UX/UI Principles" , "UX Audit"].map((e) => (
                <div key={e} style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  border: "2px solid #222",
                  boxShadow: "3px 3px 0 #222",
                  fontSize: 13, fontWeight: 700,
                  color: "var(--accent-text)",
                  whiteSpace: "normal",          /* wraps instead of overflowing on narrow phones */
                  letterSpacing: ".01em",
                  lineHeight: 1.2,
                  display: "inline-flex",
                  alignItems: "center",
                }}>
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* client pill */}
          <div data-reveal="5" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: "1.5px solid #e4e4e4", borderRadius: 999,
            background: "#fafafa", padding: "8px 16px 8px 14px",
            overflow: "hidden", maxWidth: 240,
          }}>
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: ".16em",
              textTransform: "uppercase", color: "#bbb",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>
              Clients
            </span>
            <div style={{ width: 1, height: 13, background: "#e8e8e8", flexShrink: 0 }} />
            <div style={{ overflow: "hidden", width: 150, position: "relative", flexShrink: 0 }}>
              <div style={{
                position: "absolute", right: 0, top: 0, bottom: 0, width: 20,
                background: "linear-gradient(to left,#fafafa,transparent)",
                zIndex: 2, pointerEvents: "none",
              }} />
              <div className="mq">
                {loop.map((c, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center",
                    gap: 6, paddingRight: 20, whiteSpace: "nowrap",
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "#a7f13a", display: "inline-block", flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{c}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right" data-reveal="2" data-reveal-scale style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 24,
        }}>

          {/* profile */}
          <div style={{
            width: "min(380px,72vw)", aspectRatio: "1/1",
            borderRadius: "300%", border: "8px solid #222",
            boxShadow: "14px 16px 0 rgba(0,0,0,.72)",
            overflow: "hidden", flexShrink: 0,
          }}>
            <img
              src={`${import.meta.env.BASE_URL}img/pro.png`}
              alt="Vimal Kumar"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
              }}
            />
          </div>

          {/* socials */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            {socials.map((s) => <SocialBtn key={s.label} s={s} />)}
          </div>

        </div>
      </section>
    </>
  );
}