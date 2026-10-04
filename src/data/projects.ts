export interface Project {
  img:        string;
  alt:        string;
  tag:        string;
  title:      string;
  desc:       string;
  tags:       string[];
  slug:       string;
  year:       string;
  role:       string;
  duration:   string;
  /** External case study (Behance etc.) — opens in a new tab */
  link?:      string;
  /** Internal case study route — opens inside the portfolio */
  caseStudy?: string;
}

export const projects: Project[] = [
  {
    img:       "/img/flex/cover.webp",
    alt:       "Flex Academy landing page",
    tag:       "Landing Page · Conversion UX",
    title:     "Flex Academy Landing Page",
    desc:      "Landing page that turns busy rental operators into strategy-call bookings.",
    tags:      ["Information Architecture", "Copy-led UX", "Design System", "Responsive"],
    slug:      "flex-academy",
    year:      "2026",
    role:      "UX/UI Designer",
    duration:  "Design assignment",
    caseStudy: "/work/flex-academy",
  },
  {
    img: "/img/hybrid.png",
    alt:      "Hybrid Work Planner",
    tag:      "Enterprise UX",
    title:    "Hybrid Work Experience Planner",
    desc:     "Data-driven planning tool optimising employee scheduling, space utilisation, and collaboration visibility for global teams.",
    tags:     ["Research", "UX Strategy", "Data Viz", "AI Integration"],
    slug:     "hybrid-work-planner",
    year:     "2026",
    role:     "UX Researcher & Designer",
    duration: "4 weeks",
    link:     "https://www.behance.net/gallery/245077007/Hybrid-Work-Experience-Planner",
  },
  {
    img:      "/img/balanci.png",
    alt:      "Balanci",
    tag:      "Student Wellbeing · Mobile",
    title:    "Balanci",
    desc:     "Probe methodology and user-centred design applied to international students work-study balance, resulting in a widget-based companion app.",
    tags:     ["Probe Study", "Prototype", "Mobile UX"],
    slug:     "balanci",
    year:     "2025",
    role:     "UX Researcher & Designer",
    duration: "4 weeks",
    link:     "https://www.behance.net/gallery/236688199/Balanci-From-User-Probes-to-Prototype-A-UX-Journey",
  },
  {
    img:       "/img/ride/cover.webp",
    alt:       "Remembering what matters: ride-hailing concept",
    tag:       "Mobile UX · Story-led",
    title:     "Remembering What Matters",
    desc:      "A shared end-of-ride check so passengers and drivers leave nothing behind.",
    tags:      ["Research", "Journey Flow", "Micro UX", "Design System"],
    slug:      "mindful-moments",
    year:      "2023",
    role:      "Service Designer",
    duration:  "6 weeks",
    link:      "https://www.behance.net/gallery/237011455/The-Ride-Doesnt-End-Here",
    caseStudy: "/work/mindful-moments",
  },
  {
    img:      "/img/gardern.png",
    alt:      "IoT Smart Pot",
    tag:      "IoT · Physical UX",
    title:    "Enhancing Gardening with Smart Tech",
    desc:     "IoT-embedded prototype enhancing human–nature interaction through smart technology and user-centred design principles.",
    tags:     ["IoT", "Prototype", "UCD"],
    slug:     "iot-smart-pot",
    year:     "2025",
    role:     "Product Designer",
    duration: "10 weeks",
    link:     "https://www.behance.net/gallery/236589417/Enhancing-Gardening-with-Smart-Tech-and-Design",
  },
  {
    img:      "/img/assist.png",
    alt:      "Assist Now",
    tag:      "UX Redesign",
    title:    "Assist Now",
    desc:     "Redesign of an on-demand assistance platform improving clarity, accessibility, and real-time interaction flow.",
    tags:     ["Dashboard", "Accessibility"],
    slug:     "assist-now",
    year:     "2023",
    role:     "UX/UI Designer",
    duration: "5 weeks",
    link:     "https://www.behance.net/gallery/217274669/ASSIST-NOW",
  },
];
