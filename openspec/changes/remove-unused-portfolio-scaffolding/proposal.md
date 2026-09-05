## Why

The portfolio still carries dormant code and configuration from the template it evolved from. Removing that proven residue before the visual redesign will reduce the dependency and file surface that the redesign must navigate, while keeping the current public portfolio deployable after every cleanup step.

## What Changes

- Establish route and interaction checks for the current homepage, every published project slug, `/capoo`, `/wordle`, and `/api/og` before deleting code.
- Remove stale dashboard, documentation-site, subscription, Prisma, NextAuth, email, and Stripe types or configuration that have no runtime owner or supported consumer.
- Remove unused Velite collections and dormant template content while preserving `content/projects` and the project MDX rendering contract.
- Delete component trees proven unreachable from App Router entries, MDX component mappings, configuration, or supported public routes.
- Remove packages that become unused after their final caller is deleted, and place retained build-only tooling in the appropriate dependency group.
- Replace or remove dated repository guides that describe routes and content models which no longer exist; retain the current redesign audit, screen appendix, and OpenSpec artifacts.
- Treat Capoo and Wordle as protected feature islands. Remove only local imports or assets proven unused; do not rewrite working game or infinite-scroll behaviour without a demonstrated maintenance problem.
- Remove public assets only when searches across source, MDX, metadata, manifests, CSS, and generated-content configuration prove they have no consumer.
- Keep the cleanup disjoint from `prioritize-internships-and-simplify-portfolio`: this change will not replace the homepage, terminal, project browser, main project routes, animation packages used by those routes, or the visual system.

## Capabilities

### New Capabilities

None. This is a behaviour-preserving repository refactor, so the change opts out of delta specifications.

### Modified Capabilities

None.

## Impact

The change affects dormant files under `src/components`, `src/types`, `src/config`, `src/hooks`, `content`, environment validation, repository guides, unused public assets, `package.json`, and `pnpm-lock.yaml`. Public routes, project content, metadata, Open Graph generation, analytics, Capoo behaviour, Wordle behaviour, and the current homepage remain compatible.

After this change is implemented, reviewed, and committed on `dev`, `prioritize-internships-and-simplify-portfolio` becomes the next change to apply. Deployment verification follows when the reviewed commits are pushed.
