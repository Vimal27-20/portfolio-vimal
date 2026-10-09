import { projects, categoryOf, type Category, type Project } from "./projects";

/* The portfolio as a transit network: each category is a line, each
   project a station with a fixed code. Coordinates live in the map's
   1000 × 600 viewBox; lines leave the central interchange (500, 290). */

export const HUB = { x: 500, y: 290 };

export const LINES: { id: Category; name: string; color: string; letter: string; path: string }[] = [
  { id: "Mobile",     name: "Mobile line",     color: "var(--line-mobile)",     letter: "M", path: "M500 290 H960" },
  { id: "Web",        name: "Web line",        color: "var(--line-web)",        letter: "W", path: "M500 290 H40" },
  { id: "Enterprise", name: "Enterprise line", color: "var(--line-enterprise)", letter: "E", path: "M500 290 L700 90 H930" },
  { id: "IoT",        name: "IoT line",        color: "var(--line-iot)",        letter: "I", path: "M500 290 L300 490 H70" },
];

// short map labels and where each station sits; label "above" or "below"
const PLACES: Record<string, { short: string; x: number; y: number; label: "above" | "below" }> = {
  "vise":                { short: "VISE",                 x: 610, y: 290, label: "below" },
  "balanci":             { short: "Balanci",              x: 750, y: 290, label: "above" },
  "mindful-moments":     { short: "Remembering What Matters", x: 880, y: 290, label: "below" },
  "flex-academy":        { short: "Flex Academy",         x: 380, y: 290, label: "above" },
  "assist-now":          { short: "Assist Now",           x: 200, y: 290, label: "above" },
  "hybrid-work-planner": { short: "Hybrid Work Planner",  x: 820, y: 90, label: "above" },
  "iot-smart-pot":       { short: "Smart Gardening",      x: 180, y: 490, label: "below" },
};

export interface Station {
  code: string;
  line: (typeof LINES)[number];
  project: Project;
  short: string;
  x: number;
  y: number;
  label: "above" | "below";
}

// codes count outward from the interchange, newest first, per line
export const STATIONS: Station[] = LINES.flatMap(line => {
  const onLine = projects
    .filter(p => categoryOf(p) === line.id && PLACES[p.slug])
    .sort((a, b) => Math.abs(PLACES[a.slug].x - HUB.x) - Math.abs(PLACES[b.slug].x - HUB.x));
  return onLine.map((project, i) => ({
    code: `${line.letter}${i + 1}`,
    line,
    project,
    ...PLACES[project.slug],
  }));
});

/** Where a project opens: in-site case study, external page, or nowhere yet. */
export function destination(p: Project) {
  if (p.caseStudy) return { kind: "case" as const, href: p.caseStudy, label: "Read case study" };
  if (p.link && !p.link.includes("your-case-study-link")) return { kind: "external" as const, href: p.link, label: "View on Behance" };
  return { kind: "none" as const, href: "", label: "Coming soon" };
}
