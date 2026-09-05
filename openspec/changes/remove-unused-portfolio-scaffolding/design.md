## Context

See `proposal.md` for motivation. The active App Router surface consists of the homepage and root-level project details, `/capoo`, `/wordle`, `/api/wordle/next`, and `/api/og`. Projects are rendered from `content/projects/*.mdx`; no active route consumes a dashboard, documentation site, account, subscription, database, or authentication layer.

The residue is concrete:

- `src/types/index.d.ts` still imports Prisma's `User` and defines dashboard, documentation, and subscription types even though Prisma is no longer declared and those product surfaces are absent.
- `src/types/next-auth.d.ts` augments NextAuth even though NextAuth is no longer declared or used.
- `src/env.mjs` validates NextAuth, GitHub OAuth, Postmark, SMTP, and Stripe variables that have no runtime consumer.
- Velite builds `authors` and `pages` collections even though application code imports only `projects`; `content/pages` does not exist and project metadata uses author strings directly.
- `content/backups` and several repository guides describe an older blog/docs/auth application rather than the current portfolio.
- Static backlink inspection found 33 `src/components/ui` files with no direct consumer and ten unreferenced top-level components. Some additional files are reachable only from those dead roots.
- `package.json` contains packages used only by those dormant component trees, plus development tools classified as runtime dependencies.

The repository has no automated test suite. The redesign change is already planned and owns the homepage replacement, terminal and project-tree removal, route consolidation, visual system, and motion-package decision.

## Goals / Non-Goals

**Goals:**

- Leave one code path for each currently supported capability and one owner for the production base URL.
- Remove unreachable template residue and the dependency subgraphs that exist only for it.
- Preserve every current public route and project MDX body while reducing the surface the redesign must inspect.
- Keep the cleanup reviewable as a deletion-led, behaviour-preserving commit that precedes redesign work on `dev`.

**Non-Goals:**

- Changing homepage information architecture, styling, copy, or project curation.
- Removing the terminal, project tree, duplicate project route, or their active support files; the redesign change owns those migrations.
- Removing `framer-motion` or `motion` while the current homepage still has consumers.
- Redesigning or generalising Capoo or Wordle.
- Rewriting project MDX bodies or removing project media that remains referenced.
- Tightening all TypeScript compiler options in the same change.

## Decisions

### 1. Apply cleanup before redesign, with exclusive file ownership

The cleanup will be implemented, reviewed, and committed on `dev` first. The redesign will then start from the reduced repository; deployment verification follows when both reviewed commits are pushed.

This cleanup owns dormant template types, environment declarations, unused content collections, stale guides, unreachable component trees, orphaned assets, and packages whose final caller it removes. The redesign owns `src/app/(main)/**`, `home-hero.tsx`, `projects-tree-view.tsx`, terminal components, the Ruixen project tree, the current main-layout footer, project-route consolidation, and motion packages.

This boundary avoids a partial migration in which both changes delete or replace the same files. Alternative: run the redesign first and perform one broad dead-code sweep afterward. That would identify the largest final deletion set, but it would force the redesign through the current 77-component and broad dependency surface and make its review less focused.

### 2. Prove reachability from runtime and content roots

A file is removable only after checking all relevant roots:

- App Router entry files and API routes
- Static and dynamic imports
- MDX component mappings and JSX used inside project MDX
- Velite collection configuration
- Tailwind content/configuration and global CSS
- Next.js metadata, manifest, and Open Graph assets
- Package scripts, lint, formatting, and deployment configuration

Direct backlinks alone are insufficient because route files, MDX names, generated collections, metadata paths, and scripts may be consumers without a normal TypeScript import. The implementation will record a candidate inventory, delete one coherent dependency closure at a time, then repeat the search.

The applicable patterns are Speculative Generality and Dead Paths for unreachable template surfaces, and One Source of Truth for the duplicated production URL/configuration story.

### 3. Protect behaviour with dependency-free smoke coverage

Add a small Node script that accepts a running base URL and fetches `/`, every published root-level project slug, `/capoo`, `/wordle`, and a valid `/api/og` request. It will assert successful responses and a small stable marker per route. This uses Node's built-in `fetch` and does not introduce a general test framework solely for cleanup.

Run `pnpm lint`, `pnpm build`, start the production server, and run the smoke script before cleanup and after each deletion group. Capoo and Wordle remain feature islands because their current implementations are locally bounded and do not cause the repository-wide dependency problem. They receive route protection but no speculative structural rewrite.

Alternative: add Playwright before cleanup. Browser automation will be useful for the later visual redesign, but adding a browser stack is unnecessary for a change that does not intentionally alter interactions.

### 4. Collapse dormant template configuration

Remove the unused NextAuth augmentation and dashboard/docs/subscription types. Move the small live navigation or site shapes beside their actual owners, using inferred or local TypeScript types rather than a global template declaration file.

Replace `src/env.mjs` with one direct base-URL policy: `NEXT_PUBLIC_APP_URL` may override the deployment origin, and `siteConfig.url` is the production fallback. Remove unused authentication, email, and billing variables and remove `@t3-oss/env-nextjs` if it has no remaining caller. Keep Zod because `/api/og` actively uses it.

Remove Velite's unused `pages` and `authors` collections and the dormant content they alone own. Keep the `authors` array in project frontmatter because project metadata currently consumes those strings; do not preserve a collection with no caller merely because the field shares its name.

### 5. Delete dead component closures, not isolated leaves

Start with the ten unreferenced top-level roots: dashboard navigation/header/table-of-contents remnants, the old main/mobile navigation chain, search, mode toggle, shell, page header, card skeleton, and empty placeholder. Delete helpers and UI primitives that become unreachable with each root, including hooks or configuration used only by the removed chain.

Then remove the 33 UI files with no consumer, except any file protected by an active main route, MDX mapping, or the redesign ownership boundary. Recompute reachability after each group. Remove the global toast host only after the dead search path leaves no toast producer; remove the development Tailwind indicator because it is not part of the product or build contract.

Do not create a component registry, compatibility barrel, generic wrapper, or placeholder export. A future feature can add the smallest component it actually needs.

### 6. Remove dependencies from the final import graph

After file deletion, map each declared package to source imports, configuration, scripts, and build tooling. Remove packages with no consumer and update `pnpm-lock.yaml` with pnpm. Move retained lint, TypeScript, Prettier, PostCSS, and commit tooling to `devDependencies` only when an actual script or configuration still uses them; delete dormant tool configuration together with its packages when no workflow invokes it.

Do not remove framework, Velite/MDX, analytics, Open Graph, styling, icon, or image dependencies while an active route or build configuration still consumes them. Package removal follows caller removal rather than leading it.

### 7. Delete historical instructions that contradict the live repository

Remove or replace guides that prescribe absent `/about`, `/contact`, `/skills`, docs-site, author-page, dashboard, authentication, or nested `/projects/<slug>` structures. Preserve the dated redesign audit, visual appendix, OpenSpec changes, and any guide verified against the current code. The redesign will later document its final content workflow in the README.

Remove the four `blog-post-*` images with `content/backups` once the repository-wide asset search confirms they have no other consumer. Keep personal, internship, project, favicon, manifest, and Open Graph assets for the redesign unless they are independently proven orphaned and are not named in its mockups or content plan.

## Risks / Trade-offs

- **A generated or string-based consumer is mistaken for dead code** → Search routing, MDX, configuration, CSS, metadata, manifests, scripts, and public paths before deletion; verify build and route smoke coverage after each group.
- **Cleanup and redesign modify the same file** → Enforce the ownership boundary above and defer anything touching the active main experience to `prioritize-internships-and-simplify-portfolio`.
- **A dependency appears unused because usage is configuration-driven** → Inspect configuration and package scripts, and remove packages only after their owning files are gone.
- **Stale Vercel environment variables remain configured externally** → Removing unused validation is backward compatible; document that the variables may be deleted from Vercel separately, but do not make external configuration changes in this repository change.
- **The cleanup produces a hard-to-review deletion dump** → Commit and deploy coherent closures separately: safety net, template types/config, content/docs, component graph, then packages/assets.

## Migration Plan

1. Record the current lint/build result, generated route set, and smoke-test output on `dev`.
2. Add and verify the route smoke script.
3. Remove dormant types and environment declarations, then verify.
4. Remove unused Velite collections, backup content, and contradictory guides, then verify.
5. Remove dead component closures and their now-unreachable UI dependencies, then verify.
6. Remove orphaned assets and unused packages, update the lockfile, and run the complete verification suite.
7. Review and commit the cleanup on `dev`, then apply the portfolio redesign change. Push and verify the Vercel deployment when the reviewed commits are ready to publish.

The cleanup commit is independently revertible. If a route or build check fails during implementation, restore only the latest deletion group rather than adding compatibility shims or empty placeholder files.
