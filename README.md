# Shariff Rashid's Portfolio

A résumé-led portfolio built with Next.js, TypeScript, Tailwind CSS, Velite, and MDX.

## Local development

```bash
pnpm install
pnpm dev
```

The site runs at <http://localhost:3000>.

## Verification

```bash
pnpm lint
pnpm build
pnpm start
pnpm smoke
```

`pnpm smoke` expects a production server at `http://127.0.0.1:3000`. Set `SMOKE_BASE_URL` to test another local origin.

## Content ownership

- `src/config/site.ts` owns metadata, email, and public profile links.
- `src/content/profile.ts` owns the introduction and the GovTech and HTX experience entries.
- `content/projects/*.mdx` owns project titles, summaries, dates, images, categories, highlights, and case-study bodies.
- `openspec/changes/prioritize-internships-and-simplify-portfolio` is the source of truth for the current portfolio information architecture.

Components should render these sources rather than copy their display text into another data file.

## Add or edit a project

Create or update a file under `content/projects`. Every project needs the existing Velite frontmatter fields and an MDX body. The public URL is the filename at the site root: `content/projects/example.mdx` renders at `/example`.

Use the optional `homepageOrder` field to feature a published project:

```yaml
homepageOrder: 1
```

Featured projects are ordered by that number. Published projects without `homepageOrder` appear in the homepage's older-projects list, ordered by descending date with title as the stable tie-breaker. Together, those two lists are the complete project directory; every row links directly to its case study.

Project images are optional. Omit `image` when a case study should not display product media; the page does not create a placeholder.

## Supported routes

- `/` — profile, work experience, featured projects, older projects, and Playground
- `/<project-slug>` — project case study
- `/capoo` and `/wordle` — Playground experiments

## Deployment

Vercel provides development and production deployments. `NEXT_PUBLIC_APP_URL` can override the canonical origin for a deployment; otherwise the site uses the production URL in `src/config/site.ts`.
