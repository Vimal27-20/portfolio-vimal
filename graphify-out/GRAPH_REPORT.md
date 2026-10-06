# Graph Report - vvport  (2026-10-06)

## Corpus Check
- Large corpus: 89 files · ~1,323,199 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 135 nodes · 217 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 45,981 input · 0 output

## Community Hubs (Navigation)
- App Shell & Homepage
- Case Study Pages
- Runtime Dependencies
- TypeScript Config
- Build, Deploy & Site Docs
- Project Grid & Data
- Experience Timeline
- Dev Tooling
- Unused Testimonials
- Unused Skills Section
- Pages Deploy Workflow

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 13 edges
2. `react` - 11 edges
3. `react-router-dom` - 8 edges
4. `App()` - 8 edges
5. `Home()` - 6 edges
6. `Projects()` - 6 edges
7. `FlexAcademyCaseStudy()` - 6 edges
8. `Figure()` - 6 edges
9. `CaseStudyLayout()` - 6 edges
10. `MindfulMomentsCaseStudy()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `SPA 404.html fallback` --references--> `index.html #root mount point`  [INFERRED]
  .github/workflows/deploy.yml → index.html
- `build job (npm ci + npm run build)` --references--> `Vite 5`  [INFERRED]
  .github/workflows/deploy.yml → readme.md
- `Public folder image assets & resume PDF` --references--> `LOGO-VK favicon`  [AMBIGUOUS]
  readme.md → index.html
- `Home()` --calls--> `Projects()`  [EXTRACTED]
  src/app.tsx → src/components/projects.tsx
- `Home()` --calls--> `Timeline()`  [EXTRACTED]
  src/app.tsx → src/components/timeline.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **SPA build and deploy pipeline** — index_html_root, readme_vite, github_workflows_deploy_build, github_workflows_deploy_dist, github_workflows_deploy_spa_404_fallback, github_workflows_deploy_deploy [INFERRED 0.85]

## Communities (12 total, 4 thin omitted)

### Community 0 - "App Shell & Homepage"
Cohesion: 0.16
Nodes (18): react, react-icons, react-router-dom, App(), FOOTER_LINKS, Home(), Contact(), clients (+10 more)

### Community 1 - "Case Study Pages"
Cohesion: 0.15
Nodes (21): projects, COLORS, COMPONENTS, FlexAcademyCaseStudy(), SECTIONS, SPINE, TYPE, CASE_STUDIES (+13 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.10
Nodes (20): dependencies, react, react-dom, react-icons, react-router-dom, name, private, scripts (+12 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.13
Nodes (14): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+6 more)

### Community 4 - "Build, Deploy & Site Docs"
Cohesion: 0.20
Nodes (11): build job (npm ci + npm run build), deploy job (actions/deploy-pages), dist build output, LOGO-VK favicon, index.html #root mount point, Skip to content link, Public folder image assets & resume PDF, Tech Stack (React 18 + TypeScript, Vite 5, CSS Variables) (+3 more)

### Community 5 - "Project Grid & Data"
Cohesion: 0.35
Nodes (9): count(), Filter, ProjectCard(), Projects(), CATEGORIES, Category, CATEGORY_BY_SLUG, categoryOf() (+1 more)

### Community 6 - "Experience Timeline"
Cohesion: 0.28
Nodes (7): CurveSVG(), items, PATH, PTS, Timeline(), TLItem, TLLabel()

### Community 7 - "Dev Tooling"
Cohesion: 0.29
Nodes (7): devDependencies, baseline-browser-mapping, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react

## Ambiguous Edges - Review These
- `LOGO-VK favicon` → `Public folder image assets & resume PDF`  [AMBIGUOUS]
  readme.md · relation: references

## Knowledge Gaps
- **63 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 69 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `LOGO-VK favicon` and `Public folder image assets & resume PDF`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `react` connect `App Shell & Homepage` to `Case Study Pages`, `Runtime Dependencies`, `Project Grid & Data`, `Experience Timeline`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `react-router-dom` connect `App Shell & Homepage` to `Case Study Pages`, `Runtime Dependencies`, `Project Grid & Data`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `index.html #root mount point` connect `Build, Deploy & Site Docs` to `App Shell & Homepage`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._