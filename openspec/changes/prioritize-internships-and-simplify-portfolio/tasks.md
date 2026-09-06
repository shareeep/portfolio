# Tasks: Prioritize Internships and Simplify the Portfolio

## 1. Establish the Safety Net

- [x] 1.1 Add a homepage smoke test that checks identity, primary links, and section order.
- [x] 1.2 Add route smoke coverage for each published project slug, `/capoo`, and `/wordle`.
- [x] 1.3 Record desktop and mobile screenshots of the current homepage for comparison.
- [x] 1.4 Confirm the baseline with `pnpm lint` and `pnpm build`.

## 2. Define Canonical Content

- [x] 2.1 Extend the project frontmatter schema with one optional `homepageOrder` field.
- [x] 2.2 Create `content/projects/ipid-growth-intelligence.mdx` as a team-level engineering note using only approved FYP facts, the project's GTM Engineering purpose, engineering challenges, and illustrative pseudocode; omit product UI, screenshots, demos, repository links, proprietary code or data, and unsupported individual-contribution claims.
- [x] 2.3 Refresh `content/projects/hate-speech-dap.mdx` from the evidence-led SMU BIA source in `../resume-refs/projects/hate-speech-dap.mdx`.
- [x] 2.4 Set `homepageOrder` from 1 through 4 on iPiD, SMU BIA hate speech, PII anonymisation, and BERT classification.
- [x] 2.5 Create `src/content/profile.ts` for the introduction, GovTech, and HTX content.
- [x] 2.6 Keep site metadata, social URLs, and email in `src/config/site.ts`; do not publish a résumé or location/status fields.
- [x] 2.7 Remove duplicated display copy from components after the new content owners compile.
- [x] 2.8 Allow a project image to be absent and verify the iPiD route renders without a broken image or invented placeholder.
- [x] 2.9 Refresh GovTech and iPiD from the settled September resume: preserve approved facts, adapt GovTech for readable web copy, and convert iPiD's individual resume bullets into publication-safe team-level project language.
- [x] 2.10 Standardize GovTech and HTX highlights on implied-first-person, action-led resume phrasing without changing their approved facts.
- [x] 2.11 Rewrite the four featured-project descriptions around one verified differentiator each; rename the SMU BIA entry around its Singlish-aware guardrail; and add its code-switching method, adversarial-data challenges, and carefully qualified model observations to the case study.
- [x] 2.12 Clarify GovTech ownership by stating that Shariff built the document-job queue system and that the prompt changes improved cache reuse and reduced latency; rewrite the recent-work summary around the evidence shown on the page.
- [x] 2.13 Refocus the SMU BIA case study on the embedding benchmark and Singlish guardrail: remove numbered track labels and the discarded sarcasm, agentic-LLM, and KG-RAG content; align its overview, highlights, tags, datasets, and technologies.
- [x] 2.14 Describe GovTech ownership across full-stack development, AI engineering, and production operations while retaining the settled resume's two-product scope and launch history.

## 3. Build the New Homepage

- [x] 3.1 Build one shared main-route shell with three desktop columns, two tablet columns, sticky desktop/tablet side rails, and a non-sticky mobile top bar backed by one route-safe navigation model.
- [x] 3.2 Build the static identity, contact, and primary-link section.
- [x] 3.3 Build the work-experience section with GovTech followed by HTX.
- [x] 3.4 Build the flat featured-project list from the MDX collection.
- [x] 3.5 Build the compact older-projects list from published entries without `homepageOrder`.
- [x] 3.6 Expose every published project through the homepage featured and older-project lists, with direct links to root-level case studies and no separate `/projects` index.
- [x] 3.7 Add compact Experiments and footer content while leaving the desktop right gutter intentionally unoccupied.
- [x] 3.8 Apply the grid, typography, rules, and responsive treatments in global styles.
- [x] 3.9 Use desktop Home and the mobile brand mark to return to the profile; omit a redundant About navigation item and page.

## 4. Simplify Navigation and Routes

- [x] 4.1 Remove the terminal loader from the main layout.
- [x] 4.2 Replace the project tree with the new project list.
- [x] 4.3 Keep the existing root-level project URLs under `[projectSlug]`.
- [x] 4.4 Delete `[...slug]` after route smoke tests pass.
- [x] 4.5 Keep `/capoo` and `/wordle` and expose them through one Experiments entry.

## 5. Consolidate Motion and Dependencies

- [x] 5.1 Use CSS transitions for basic hover and focus effects.
- [x] 5.2 Use native `details` elements for work-experience disclosure and omit project hover previews.
- [x] 5.3 Remove the project tree, search for `framer-motion`, and remove the package when the search returns no imports.
- [x] 5.4 Search for `motion/react`; remove `motion` if no production imports remain, otherwise standardize retained imports on `motion/react`.
- [x] 5.5 Confirm reduced-motion behaviour for each retained animation.
- [x] 5.6 Delete only direct support files made unreferenced by the replaced homepage interface.
- [x] 5.7 Remove dependencies tied only to those deleted files and update `pnpm-lock.yaml` with pnpm.

## 6. Verify and Document

- [x] 6.1 Run lint, production build, and smoke tests.
- [x] 6.2 Check keyboard navigation, focus visibility, headings, and link labels.
- [x] 6.3 Check mobile, tablet, and desktop layouts.
- [x] 6.4 Verify metadata and Open Graph output for the homepage and a project page.
- [x] 6.5 Search for removed components, routes, and package imports.
- [x] 6.6 Update the repository README with the new content-editing and project-curation workflow.
- [x] 6.7 Compare the homepage and project-detail layouts with `docs/2026-09-05-portfolio-target-screen-mockups.md` at the documented desktop and mobile viewports.
- [x] 6.8 Add each final capture listed in the target-screen document and record each intentional difference.
- [x] 6.9 Verify the iPiD route exposes no product media, external product actions, proprietary implementation detail, or unsupported personal attribution.
- [x] 6.10 Remove the competing `/projects` index and verify Projects consistently opens the homepage directory from every main route.
- [x] 6.11 Replace green and teal metadata accents with a warm neutral hierarchy and compact expanded mobile experience details to the full content width.
- [x] 6.12 Refresh final responsive captures, including an expanded mobile experience row, and repeat lint, build, smoke, accessibility, and strict OpenSpec checks.
- [x] 6.13 Remove every résumé link and the public résumé asset, remove availability/location/time-zone status UI at every breakpoint, and verify the right desktop track remains non-semantic whitespace.
- [x] 6.14 Refresh affected screenshots and repeat lint, build, smoke, responsive, and strict OpenSpec checks.
- [x] 6.15 Make the visible `SR` text the start of the home mark's accessible name and verify named landmarks, skip navigation, focus visibility, external-link names, and disclosure semantics.
- [x] 6.16 Give Capoo one concise non-text alternative; give Wordle semantic status updates, meaningful key/cell names, native disabled states, help disclosure state, and visible non-color result cues; repeat lint, build, smoke, and strict OpenSpec validation.
- [x] 6.17 Verify the refreshed GovTech and iPiD copy against the settled resume Markdown and HTML, confirm the iPiD page still exposes no product media or proprietary detail, and repeat lint, smoke, build, and strict OpenSpec validation.
- [x] 6.18 Verify that no experience highlight uses an explicit first-person pronoun, then repeat lint, smoke, build, and strict OpenSpec validation.
- [x] 6.19 Verify the four featured summaries against their case studies, confirm the homepage names the Singlish and code-switched guardrail, then repeat lint, smoke, build, and strict OpenSpec validation.
- [x] 6.20 Verify the revised profile and GovTech copy in the rendered homepage, then repeat lint, smoke, build, and strict OpenSpec validation.
- [x] 6.21 Verify the focused SMU BIA route exposes no discarded track content or stale metadata, then repeat lint, smoke, build, and strict OpenSpec validation.
- [x] 6.22 Verify the rendered GovTech entry names full-stack development, AI engineering, and production operations without implying sole product-management ownership; repeat lint, smoke, and strict OpenSpec validation.
