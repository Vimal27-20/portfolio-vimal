# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers filling UX/UI and product design roles in Ireland. They arrive from a CV, LinkedIn or a job application, usually short on time, and are judging whether Vimal is worth an interview. Success is that they download the resume or get in touch.

## Product Purpose

The personal portfolio of Vimal Kumar. It presents his case studies, experience and skills so a hiring team can quickly see what he does and how he works, then act on it. Success means more interviews: resume downloads and contact (email, LinkedIn).

## Positioning

Vimal is a **UX Engineer**: a designer who also builds. He takes work from research and design systems through to production code. The proof is VISE, an offline-first budgeting app he works on as UX Engineer (React Native + Expo UI on a Rust + SQLite core, CI and end-to-end tests, V1 in Android testing with real users), backed by a Master's in Interaction Design (University of Limerick), a computer science degree and enterprise experience at Aspira and Infosys.

Decided: the homepage hero introduces him as "UX Engineer who designs and builds." (shipped October 2026).

## Operating Context

- Visitors skim first: they look for name, role, availability, the projects and a resume within seconds, on desktop and phone.
- Case studies are read in two places: in-site pages (`/work/flex-academy`, `/work/mindful-moments`, `/work/vise`) and external Behance pages for the other projects.
- Contact happens off-site: email (`vimal.v27k@gmail.com`), LinkedIn, Behance and Dribbble. There is no form or backend.

## Capabilities and Constraints

- Single-page app: Vite + React 18 + TypeScript + React Router, plain CSS (globals plus component styles).
- Hosted on GitHub Pages at `https://vimal27-20.github.io/portfolio-vimal/`. The app is built with base path `/portfolio-vimal/`, deep links rely on a `404.html` copy of `index.html`, and the GitHub Actions workflow deploys only from `main`.
- Project data lives in `src/data/projects.ts`. A project opens an in-site case study (`caseStudy`), an external page (`link`), or neither. Projects can be marked `status: "in-progress"`, and filters use the categories Enterprise, Mobile, Web and IoT.
- No server, analytics, CMS or contact form.

## Brand Commitments

- Name: Vimal Kumar. Handle: vimal27k.
- The VK logo (`public/img/LOGO-VK.png`) is an existing identity asset.
- Links that must stay correct: LinkedIn `https://www.linkedin.com/in/vimal27k/`, Behance `https://www.behance.net/vimalkveerara`, Dribbble `https://dribbble.com/vimalkumar`, VISE code `https://github.com/PassionChips/Vise`.

## Evidence on Hand

- **Projects** (`src/data/projects.ts`, images in `public/img/`): VISE (in progress, in-site case study), Flex Academy (in-site), Hybrid Work Experience Planner, Balanci, Remembering What Matters (in-site), Enhancing Gardening with Smart Tech, Assist Now.
- **Resume:** `public/img/Vimal-kumar-Resume.pdf`.
- **Experience:** BSc Computer Science (SRM, 2017-2021), BI & Tableau Admin (Infosys, 2021-2022), UX UI Designer (Aspira, 2023-2024), Master's in IXD (University of Limerick, 2024-2025), Freelance UX Consultant (Peter's Restaurant & AJ Auto Spa, Ireland, Sep 2025-present).
- **Testimonials** (`src/components/testimonials.tsx`, confirmed real by Vimal): Peter's Restaurant (restaurant owner), AJ Auto Spa (marketing lead), Aspira (product director). They are attributed by role, not by person's name. The section is not currently shown on the site.
- **Skills:** listed in `src/components/skills.tsx` (UX/UI methods, design tools, AI design tools, front-end, data and methods).
- **Absences:** no quantified outcomes or metrics for most projects, and no named-person testimonials. Do not invent numbers, results or attributions.

## Product Principles

1. **A recruiter's minute comes first.** Role, availability, work and resume must be findable immediately, on any screen size.
2. **Show the building, not only the screens.** Lead with how things were designed and built; UI images support the story rather than carry it.
3. **Truth over polish.** Work in progress is labelled as such, and claims stay within what the evidence supports.
4. **The site is a work sample.** Its own accessibility, responsiveness and code quality are part of what's being judged.
