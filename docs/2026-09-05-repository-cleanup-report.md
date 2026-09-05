# Repository Cleanup Report

**Date:** 2026-09-05
**OpenSpec change:** [`remove-unused-portfolio-scaffolding`](../openspec/changes/remove-unused-portfolio-scaffolding/proposal.md)

## Baseline

Before cleanup:

- TypeScript and TSX files under `src`: 105
- Component TypeScript and TSX files: 77
- Runtime dependencies: 88
- Development dependencies: 5
- Velite collections: 3
- Published project MDX entries: 12
- Generated routes: 18
- `pnpm lint`: passed
- `pnpm build`: passed outside the restricted sandbox

The build reported one empty author body, duplicate generation of all twelve project paths, and outdated Browserslist data. Duplicate project routes belong to the later portfolio-redesign change.

## Protected Paths

The cleanup must preserve:

- `src/app/(main)/**`
- `src/components/home-hero.tsx`
- `src/components/projects-tree-view.tsx`
- `src/components/terminal-loader.tsx`
- `src/components/terminal-loader-wrapper.tsx`
- `src/components/ruixen/**`
- `src/components/site-footer.tsx`
- UI primitives imported by those files
- `src/app/capoo/**`
- `src/app/wordle/**`
- `src/app/api/wordle/**`
- `src/app/api/og/**`
- `src/components/mdx-components.tsx`, `callout.tsx`, and `mdx-card.tsx`
- `content/projects/**` and every referenced project asset
- metadata, favicon, manifest, analytics, fonts, and Open Graph assets
- `framer-motion` and `motion` until the redesign removes their active callers

These paths are owned by active public behaviour or by the subsequent `prioritize-internships-and-simplify-portfolio` change.

## Cleanup Evidence

### Removed dormant configuration and content

- Removed the unused NextAuth augmentation and the global template types that still referenced Prisma, dashboards, docs, and subscriptions.
- Removed unused auth, OAuth, email, billing, and database environment declarations.
- Replaced environment validation with one `getSiteUrl()` policy: `NEXT_PUBLIC_APP_URL` overrides `siteConfig.url` when present.
- Reduced Velite from `projects`, `pages`, and `authors` collections to `projects` only; all 12 project entries still generate.
- Removed `content/authors`, `content/backups`, and six guides that described deleted template features or incorrect routes.

### Removed dead component closures

The import graph was traced from App Router entries, MDX mappings, configuration, and styles. The cleanup removed the unreachable navigation, dashboard header, table of contents, search, mode toggle, shell, page header, placeholder, card skeleton, Kibo pill, toast host, and breakpoint indicator closures.

The remaining component files are the 19 files used by the current homepage, project renderer, root layout, or the subsequent redesign. Seven UI primitives remain because the current main experience imports them: accordion, aspect ratio, button, icon cloud, terminal, tooltip, and typing animation.

### Dependency evidence

Runtime packages retained because current source imports them:

```text
@radix-ui/react-accordion
@radix-ui/react-aspect-ratio
@radix-ui/react-icons
@radix-ui/react-slot
@radix-ui/react-tooltip
@vercel/analytics
@vercel/og
@vercel/speed-insights
class-variance-authority
clsx
date-fns
framer-motion
lucide-react
motion
next
next-themes
react
react-dom
sharp
tailwind-merge
zod
```

Build-only imports and configured tools were moved to `devDependencies`: Prettier and its import-sorting plugin, ESLint and its active plugins/config, TypeScript and React/Node types, Tailwind and its active plugins, PostCSS/Autoprefixer, Velite, the three configured rehype plugins, and Shiki.

Removed packages had no remaining source, configuration, or script owner after their component closure was deleted. These included dormant commit/hook tooling, `@t3-oss/env-nextjs`, Cursorify, Hook Form, unused Radix primitives, `cmdk`, Embla, FlyonUI, input OTP, Mermaid, Pretty Quick, PropTypes, React Day Picker, React Icons, resizable panels, textarea autosize, Sonner, `unist-util-visit`, and Vaul.

### Asset evidence

- Removed four `blog-post-*` images referenced only by deleted backup content.
- Removed the unreferenced CampusG Temporal code capture, ESMOS Locust capture, PetConnect collage, old SMU logo, and Zora Health logo.
- Retained project images referenced by MDX, metadata and manifest assets, the profile avatar, internship/iPiD logos used by the current or planned homepage, and Open Graph fonts.

## Result

After cleanup:

- TypeScript and TSX files under `src`: 42, down from 105
- Component TypeScript and TSX files: 19, down from 77
- Runtime dependencies: 21, down from 88
- Development dependencies: 20, reorganized from 5
- Total declared dependencies: 41, down from 93
- Velite collections: 1, down from 3
- Published project MDX entries: 12, unchanged
- Public assets: 60

The implementation removed 63 source files, 58 component files, and 52 declared packages while preserving the current public route set. The duplicate project routes and seven protected homepage UI primitives remain intentionally for the subsequent redesign change.
