## 1. Establish the Cleanup Safety Net

- [x] 1.1 Run `pnpm lint` and `pnpm build`, record the generated route set, and verify the current branch has a green baseline before deleting files.
- [x] 1.2 Add a dependency-free route smoke script for `/`, every published root-level project slug, `/capoo`, `/wordle`, `/api/wordle/next`, and a valid `/api/og` request; run it against `pnpm start` and verify every response and stable route marker.
- [x] 1.3 Record the pre-cleanup counts for source files, component files, declared packages, and generated Velite collections so the final report can quantify the reduction.
- [x] 1.4 Write a protected-path checklist for the active main route, project MDX renderer, metadata/assets, Capoo, Wordle, and files owned by `prioritize-internships-and-simplify-portfolio`; verify every deletion candidate is outside it.

## 2. Remove Dormant Types and Configuration

- [x] 2.1 Replace the imported `SiteConfig` template type with a local or inferred shape in `src/config/site.ts`; run TypeScript through `pnpm build` and verify site metadata is unchanged.
- [x] 2.2 Delete the unreachable main/mobile/dashboard navigation closure, including `src/config/main.ts`, its exclusive hooks, and its obsolete navigation types; verify repository searches find no remaining imports or named type references.
- [x] 2.3 Delete `src/types/next-auth.d.ts` and the remaining Prisma, dashboard, documentation, and subscription declarations; verify searches outside historical OpenSpec evidence find no `next-auth`, `@prisma/client`, `DashboardConfig`, `DocsConfig`, or subscription-type consumer.
- [x] 2.4 Replace `src/env.mjs` with one base-URL policy using optional `NEXT_PUBLIC_APP_URL` and `siteConfig.url` as the production fallback; verify homepage and project canonical/Open Graph URLs in both fallback and override builds.
- [x] 2.5 Remove unused auth, OAuth, SMTP, Postmark, and Stripe environment validation; verify `next.config.mjs`, `src`, and the production build no longer reference those variable names.

## 3. Reduce the Content and Documentation Surface

- [x] 3.1 Remove Velite's unused `pages` and `authors` collections while retaining project `authors` frontmatter strings; run the Velite build and verify every published project still appears in generated content.
- [x] 3.2 Delete `content/authors` after its collection is removed; verify project metadata and every project route still build without author-collection lookups.
- [x] 3.3 Delete `content/backups` and the four `public/images/projects/blog-post-*` assets; search source, MDX, CSS, metadata, and manifests and verify no reference remains.
- [x] 3.4 Remove the obsolete adding-projects, new-pages, deployment/linting, refactoring-removal, renaming, and task-list guides; verify retained documentation consists of current OpenSpec artifacts, the dated audit/mockup appendix, and accurate repository-level instructions.

## 4. Delete Unreachable Component Closures

- [x] 4.1 Delete the unreferenced header, table-of-contents, search, mode-toggle, shell, page-header, card-skeleton, empty-placeholder, and Kibo pill roots; verify no App Router file, MDX mapping, or active component imports them.
- [x] 4.2 Remove helpers used only by those roots, including `use-mounted`, and repeat the import-graph search to verify no newly orphaned local helper remains.
- [x] 4.3 Remove the root toast host after the dead search component leaves no toast producer, then delete `toaster`, `toast`, and `use-toast`; verify the root layout renders and no `toast` import remains.
- [x] 4.4 Remove the development-only Tailwind breakpoint indicator from the root layout and delete its component; verify development and production layouts compile without it.
- [x] 4.5 Delete each UI primitive with no consumer outside its own dead closure, while retaining the current main-route primitives protected for the redesign; verify every remaining file under `src/components/ui` has a runtime, MDX, or protected redesign caller.
- [x] 4.6 Re-run the repository-wide reachability pass from routes, MDX mappings, configuration, styles, metadata, and scripts; document and remove any additional dead closure, then verify the route smoke script still passes.

## 5. Prune Assets and Dependencies

- [x] 5.1 Build a final public-asset reference inventory across source, content, CSS, metadata, manifests, and OpenSpec mockups; remove only newly proven orphaned assets and verify all rendered images return successfully in route smoke checks.
- [x] 5.2 Map every declared package to a remaining source import, configuration file, or package script; save the evidence in the implementation summary and verify each proposed removal has no consumer.
- [x] 5.3 Remove runtime packages whose final caller was deleted, preserving packages used by the active homepage, project renderer, Capoo, Wordle, analytics, Open Graph, Velite, and the later redesign; verify `pnpm install` succeeds and searches find no imports from removed packages.
- [x] 5.4 Remove dormant commit/hook tooling with no configured workflow and move retained TypeScript, lint, Prettier, Tailwind, PostCSS, and type packages to `devDependencies`; verify each retained tool has a script or configuration owner.
- [x] 5.5 Update `pnpm-lock.yaml` with pnpm, run `pnpm install --frozen-lockfile`, and verify a clean install resolves without undeclared or missing packages.

## 6. Verify and Hand Off to the Redesign

- [x] 6.1 Run `pnpm lint`, `pnpm build`, the production server, and the complete route smoke script; verify the homepage, every project, Capoo, Wordle, Wordle API, and Open Graph API preserve their baseline behaviour.
- [x] 6.2 Search for removed dashboard, docs-site, auth, Prisma, subscription, email, Stripe, backup-content, dead-component, and removed-package names; verify only dated audit/OpenSpec evidence remains where historical references are intentional.
- [x] 6.3 Compare post-cleanup source, component, dependency, and Velite-collection counts with the baseline and add the measured reduction to the implementation summary.
- [x] 6.4 Run `openspec validate remove-unused-portfolio-scaffolding --strict` and verify every completed task has corresponding code, command, or search evidence.
- [x] 6.5 Commit the reviewed cleanup on `dev` and verify the commit contains no redesign-owned implementation before beginning `prioritize-internships-and-simplify-portfolio`; defer Vercel verification until the commits are pushed.
