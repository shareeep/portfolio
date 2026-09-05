# Design: Prioritize Internships and Simplify the Portfolio

## End State

The main route group renders one responsive editorial shell. Wide screens use a left navigation rail, a narrow content column, and an empty right gutter that preserves the reading measure without creating a redundant content rail. Small screens place the navigation across the top and render one content column. The homepage keeps a stable, server-owned reading flow: identity, primary contact links, GovTech and HTX work experience, four featured projects, an older-projects list, and contact.

`src/config/site.ts` owns site metadata and links, `src/content/profile.ts` owns profile and experience copy, and project MDX frontmatter owns project summaries and homepage curation.

The public surface retains the current root-level project URLs, `/capoo`, and `/wordle`. One route module owns project-detail rendering.

## Target Screen Reference

This OpenSpec change is the source of truth for scope, behaviour, architecture, and implementation tasks. [`docs/2026-09-05-portfolio-target-screen-mockups.md`](../../../docs/2026-09-05-portfolio-target-screen-mockups.md) is a supporting visual appendix for the homepage and project case-study shell. If the illustration and OpenSpec disagree, OpenSpec governs and the mockup must be corrected.

The implementation pass will add final rendered screenshots to that document. Any intentional difference from the target mockups must include a short reason beside the final capture.

## Evidence and Constraints

- `src/app/(main)/layout.tsx` mounts the terminal wrapper across the main route group.
- `src/components/terminal-loader.tsx` can cover the page for nine seconds.
- `src/components/projects-tree-view.tsx` owns project filtering, folder expansion, project selection, viewport detection, preview rendering, and secondary cards.
- Both dynamic route modules generate the same twelve project paths.
- Project MDX frontmatter already contains title, short title, description, date, image, category, highlights, authors, and tags.
- iPiD has approved project material in the sibling `../resume-refs/master-resume.md` file but no portfolio MDX entry.
- `content/projects/hate-speech-dap.mdx` represents the SMU BIA project, while `../resume-refs/projects/hate-speech-dap.mdx` contains a newer evidence-led version.
- Existing project paths may appear in search indexes, resumes, or shared messages.
- `/capoo` and `/wordle` have direct homepage links and count as supported public routes.
- The repository has no automated test suite.

## Design Decisions

### 1. Build one responsive editorial shell

`src/app/(main)/layout.tsx` will own the global shell for the homepage and project-detail routes. At 1100 pixels and above, CSS Grid will create three columns:

```css
grid-template-columns: minmax(240px, 1fr) minmax(0, 640px) minmax(240px, 1fr);
```

The navigation and contact block will occupy the left rail. The route content will occupy the centre. The third grid track will remain empty as intentional whitespace; it will not contain a semantic aside, availability claim, location, time zone, or substitute filler. The desktop left rail will use a sticky inner wrapper, while the document keeps one page-level scroll container.

From 768 through 1099 pixels, the shell will keep a sticky left rail and the main column. Below 768 pixels, CSS will place the navigation in a non-sticky top bar. The implementation will not add a status substitute, drawer, menu button, viewport hook, or duplicate mobile route tree. The same route content will keep its document order.

One navigation model will supply each layout. Experience and Projects will use `/#experience` and `/#projects` from every route. Projects always means the homepage directory, never a competing index page. Each project row opens its root-level case study directly. The desktop rail will use Home as the route back to the profile, while the home-linked brand mark provides that affordance on mobile. A separate About item or route would duplicate the homepage identity and will not be rendered.

Low-contrast CSS backgrounds and borders will draw the reference grid. The grid is a fixed decorative treatment: the interface will not expose a grid-mode control or preference. Dates, categories, focus rings, and small labels will use warm neutral foreground tones rather than green or teal accents.

Each content section will use headings, rows, spacing, and one-pixel separators. Large card containers and the two-column filesystem browser will leave the homepage. The first release will omit project hover previews.

### 2. Render work experience

The work-experience section will contain:

1. GovTech, Data Scientist Intern
2. HTX, Software Engineering Intern

Each row will show organization, role, date range, and two or three highlights. Native `details` and `summary` elements will own disclosure state unless motion testing finds a clear need for a controlled component. Both rows will start collapsed at each viewport, which avoids screen-size-dependent state. On mobile, the expanded details will align to the section width with compact spacing and a consistent muted text treatment; they will not inherit the logo-column indent used by the summary.

The homepage will not render iPiD or SMU BIA as secondary experience. Their project case studies will carry that work.

### 3. Keep project facts in MDX

The project collection will own project titles, descriptions, images, dates, categories, case-study bodies, and homepage curation. The change will extend its schema with one optional field:

```ts
homepageOrder?: number
```

The field removes the invalid combinations created by separate `featured` and `priority` values. A published entry with `homepageOrder` appears in the featured list at that position. A published entry without it appears in the older-projects list. Components will not maintain slug arrays or duplicate project summaries.

The featured order will be:

1. `ipid-growth-intelligence`, a restrained engineering note based on approved FYP material
2. `hate-speech-dap`, refreshed from the stronger SMU BIA source in `../resume-refs`
3. `pii-anonymisation-gen-ai`
4. `hate-speech-classification`

The iPiD entry will use neutral, team-level language. It may state verified facts about what the project built, describe its GTM Engineering purpose, and explain engineering challenges in prose and illustrative pseudocode. It will not display the product, its interface, a demo, repository links, proprietary source code or data, or unapproved claims about Shariff's personal contribution. Its page renderer must support an intentionally absent image rather than substituting a product screenshot or invented placeholder.

Existing project entries may continue to render the cover or demo images already approved in their MDX. Repository and live-demo actions remain content-driven where they already exist; this change does not add new global action fields or previous/next project navigation.

The homepage will render remaining entries as compact title and year rows. Featured and older rows together form the complete project directory, so no `/projects` index or category filters will be added. Within each group, entries use their curated homepage order or descending date with a stable title fallback.

### 4. Keep no more than one animation package

The portfolio currently uses `motion` in four UI files and `framer-motion` in the Ruixen tree component. Motion's official migration path uses the `motion` package with imports from `motion/react`.

The redesign will:

- Use CSS transitions for colour, underline, and small hover changes.
- Use native `details` disclosure for work experience.
- Remove the sole `framer-motion` import with the project tree, then uninstall `framer-motion`.
- Search for `motion/react` after removing terminal and typing components. If no production consumer remains, uninstall `motion` too.
- Import from `motion/react` and respect `prefers-reduced-motion` if a supported route still needs JavaScript animation.

The change will not add a project-preview animation, animation wrapper, or shared animation framework.

### 5. Preserve route compatibility

`src/app/(main)/[projectSlug]/page.tsx` will remain the canonical project-detail route during the first refactor. The catch-all route will be removed.

The page will continue to resolve the existing root-level slugs. The implementation will add route smoke tests before deleting the duplicate route.

### 6. Limit client boundaries

`src/app/(main)/page.tsx` will remain a server component. It will sort and select project content before passing serializable data to interactive children.

The identity, navigation, links, internship disclosures, project rows, decorative grid, and footer do not need React state in the base implementation.

### 7. Remove code with its callers

The change will delete superseded components after the new homepage passes smoke checks. Dependency removal will follow code removal so each package deletion has evidence.

Removals tied to the replaced interface include:

- Terminal loader and wrapper
- Terminal and typing animation components after their callers are removed
- `home-hero.tsx`
- Project tree and Ruixen tree node
- Icon cloud homepage component
- Duplicate catch-all route
- Direct support files made unreferenced by those removals

The preceding `remove-unused-portfolio-scaffolding` change removed unrelated dashboard, documentation, subscription, Prisma, and NextAuth residue with its own evidence and rollback boundary. This change removes only the direct support files made obsolete by the redesigned main interface.

## Reference Repository Decision

The project will link to the reference commit instead of storing a clone. A vendored clone would become stale and would create a second source tree inside the portfolio.

Implementation work may use a temporary shallow clone under `/tmp`. The developer should port the layout principles and small interaction patterns, then write components against this repository's content model.

## Risks and Responses

### Project URLs regress after route cleanup

Add smoke coverage for each generated slug before deleting the catch-all route. Keep the root-level URL contract.

### Homepage becomes too sparse

Use evidence-rich internship highlights, four featured project rows, and a compact older-projects list. Do not fill space with an icon cloud or decorative cards.

### Homepage becomes long on mobile

Keep internship details collapsed, limit detailed project rows to the four featured entries, and render older projects as title and year rows.

### Dependency cleanup removes an MDX capability

Search MDX component mappings and content files before removing Callout, Card, code highlighting, or image support.

## Verification

### Behaviour

- Confirm section order in the rendered document and that no `/projects` index is exposed.
- Confirm GitHub, LinkedIn, email, Playground, section, home/brand, and direct project links.
- Confirm no résumé asset or link, availability copy, location label, time-zone label, or empty semantic status region remains.
- Confirm each existing project slug renders its case study.
- Confirm `/capoo` and `/wordle` still render.

### Responsive and accessibility

- Check 390 by 844, 768 by 1024, and 1440 by 1000 viewports.
- Navigate each disclosure and link with the keyboard.
- Confirm visible focus and correct heading order.
- Enable reduced motion and confirm that content remains stable.

### Code and contracts

- Run `pnpm lint`.
- Run `pnpm build`.
- Run the new route and homepage smoke tests.
- Search for `framer-motion`, `TerminalLoader`, `ProjectsTreeView`, and the deleted route.
- Compare declared dependencies with imports after dead-file deletion.
