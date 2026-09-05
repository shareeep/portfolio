# Proposal: Prioritize Internships and Simplify the Portfolio

## Intent

Restructure the portfolio so a recruiter can identify Shariff, understand his two recent internships, inspect selected projects, and reach his contact links without learning a custom interface.

## Problem

The terminal introduction blocks the first visit. The settled homepage begins with a large experience card and uses a filesystem tree to browse projects. Identity, positioning, and contact details lack a stable place near the top.

The code mirrors that interaction cost. The homepage depends on a terminal sequence, a 328-line project browser, two project-detail route implementations, two animation packages, and a broad copied UI component set.

## Proposed Change

- Replace the terminal introduction and typing panel with a static identity section.
- Use a three-column editorial shell on desktop with navigation on the left, content in the centre, and intentional breathing room on the right.
- Reflow the navigation into a plain top bar on mobile; do not create a status rail at any breakpoint.
- Present GovTech and HTX (Home Team Science and Technology Agency) under Work Experience before projects.
- Feature four projects in this order: iPiD FYP, SMU BIA hate-speech project, Privacy-Focused Agentic Anonymiser, and Hate Speech Classification with BERT.
- Show the remaining published work in a compact older-projects list.
- Make Projects a single, unambiguous homepage section whose rows open root-level case studies directly; do not add a competing `/projects` index.
- Create one restrained MDX engineering note for iPiD and keep the SMU BIA project in its existing `hate-speech-dap` case study.
- Keep the existing project case studies and root-level project URLs.
- Remove `framer-motion`; remove `motion` too if the redesigned routes have no JavaScript animation consumer.
- Remove the project tree, icon cloud, duplicate route, and homepage support code made obsolete by this redesign.
- Keep Capoo and Wordle available through a compact Experiments section.

## Scope

### Included

- Homepage information hierarchy and responsive layout
- Profile and experience content ownership
- Featured-project curation through MDX frontmatter
- iPiD engineering-note creation from approved FYP material, limited to verified project facts, its GTM Engineering character, engineering challenges, and illustrative pseudocode
- SMU BIA case-study refresh from the evidence in the sibling `../resume-refs` repository
- Homepage-to-project navigation
- Animation package consolidation or removal
- Dead component and dependency removal limited to the replaced interface
- Behavioural smoke tests for the homepage and public project routes

### Excluded

- Rewriting the full text of existing project case studies
- Redesigning the Capoo or Wordle experiences
- Migrating from Tailwind CSS v3 to v4
- Changing the Next.js major version
- Adding localization or multiple colour themes
- Publishing iPiD product screenshots, interface captures, demos, repository links, proprietary code or data, or unsupported individual-contribution claims
- Committing a copy of the reference repository

## Impact

The change affects the main route layout, homepage, project navigation, content schema, animation imports, copied UI files, and dependency manifest. Existing project URLs, project MDX bodies, analytics, Open Graph generation, `/capoo`, and `/wordle` remain supported.

## Success Criteria

- The first paint shows Shariff's name, positioning, and primary links with no blocking animation.
- Desktop visitors receive a left navigation rail, a centred reading column, and an unoccupied right gutter that preserves the editorial measure.
- Mobile visitors receive a top navigation bar and one content column without a drawer.
- GovTech and HTX appear before the featured-project section.
- The featured-project section presents iPiD first, the SMU BIA project second, then the two GenAI with LLMs projects.
- Remaining projects appear in a compact older-projects list.
- Each featured project links to its root-level case-study route.
- The iPiD route presents only approved team-level facts, GTM Engineering context, engineering challenges, and pseudocode, with no product display or external product actions.
- The featured and older-project lists together expose every published project without a separate index page.
- Navigation uses neutral metadata colours, omits a redundant About item, and treats the desktop Home item or mobile brand mark as the clear route back to the profile.
- Expanded mobile experience rows use compact, full-width resume-style details rather than a heavily indented card layout.
- The public site exposes no résumé file or link, availability claim, location label, or time-zone status.
- Mobile visitors can reach the identity and primary links within the first viewport.
- Keyboard users can open internship details and identify focus.
- Reduced-motion users receive no nonessential movement.
- The production code contains no `framer-motion` import or dependency.
- If no production file imports `motion/react`, the production dependencies do not include `motion`.
- The repository contains one project-detail route implementation.
- Lint, production build, route smoke tests, and responsive checks pass.

## Source Material

- [`docs/2026-09-05-portfolio-redesign-audit.md`](../../../docs/2026-09-05-portfolio-redesign-audit.md)
- <https://bidyut.cc/>
- <https://github.com/bidyut10/portfolio-template-one/tree/8a115ca2bebfd424111770d6ceb422d8070f69f5>
- <https://motion.dev/docs/react-upgrade-guide>
