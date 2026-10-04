import type { ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";
import FlexAcademyCaseStudy from "./flexacademy";
import MindfulMomentsCaseStudy from "./mindfulmoments";

/**
 * Registry of in-site case studies. To add another:
 *   1. create src/pages/casestudy/<name>.tsx using <CaseStudyLayout>
 *   2. add it here under its slug
 *   3. set `caseStudy: "/work/<slug>"` on the project in src/data/projects.ts
 */
const CASE_STUDIES: Record<string, ComponentType> = {
  "flex-academy": FlexAcademyCaseStudy,
  "mindful-moments": MindfulMomentsCaseStudy,
};

export default function CaseStudyRoute() {
  const { slug = "" } = useParams();
  const Page = CASE_STUDIES[slug];
  if (!Page) return <Navigate to="/#projects" replace />;
  return <Page />;
}
