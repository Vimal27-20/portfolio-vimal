import { lazy, Suspense, type ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";

/**
 * Registry of in-site case studies. To add another:
 *   1. create src/pages/casestudy/<name>.tsx using <CaseStudyLayout>
 *   2. add it here under its slug
 *   3. set `caseStudy: "/work/<slug>"` on the project in src/data/projects.ts
 *
 * Each case study is its own chunk, so the homepage doesn't download them.
 * They're fetched once the browser is idle (see preloadCaseStudies), so a
 * click renders straight away and the quick view's image morph still works.
 */
const LOADERS: Record<string, () => Promise<{ default: ComponentType }>> = {
  "flex-academy":    () => import("./flexacademy"),
  "mindful-moments": () => import("./mindfulmoments"),
  "vise":            () => import("./vise"),
  "assist-now":      () => import("./assistnow"),
};

const loaded: Record<string, ComponentType> = {};
const lazyPages: Record<string, ComponentType> = {};
const load = (slug: string) => LOADERS[slug]().then(m => (loaded[slug] = m.default));

export function preloadCaseStudies() {
  Object.keys(LOADERS).forEach(slug => { if (!loaded[slug]) load(slug).catch(() => {}); });
}

export default function CaseStudyRoute() {
  const { slug = "" } = useParams();
  if (!LOADERS[slug]) return <Navigate to="/#work" replace />;
  const Ready = loaded[slug];
  if (Ready) return <Ready />;
  const Page = (lazyPages[slug] ??= lazy(() => load(slug).then(C => ({ default: C }))));
  return <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--stage)" }} />}><Page /></Suspense>;
}
