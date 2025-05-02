# Implementation Guide: Developer Portfolio Platform (Next.js + shadcn/ui)

**Version:** 1.0
**Date:** May 2, 2025
**Based on:** Original PRD specifying React/Next.js/shadcn/ui stack.

## 1. Introduction

*   **Purpose:** This guide provides step-by-step instructions for building the Developer Portfolio Platform using Next.js, React, TypeScript, shadcn/ui, and MDX, as defined in the original Product Requirements Document (PRD).
*   **Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Contentlayer (recommended for MDX), Vercel.

## 2. Milestone 1: Project Setup & Scaffolding (Est. Date: May 10)

1.  **Clean Up (If Necessary):** Remove any existing files from the previous Eleventy setup (e.g., `.eleventy.js`, `src/`, `tailwind.config.js`, `postcss.config.js`).
2.  **Initialize Next.js Project:**
    ```bash
    npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    cd portfolio
    ```
    *(Adjust `portfolio` if you want a different directory name)*
3.  **Setup Git & GitHub:**
    *   Initialize Git: `git init`
    *   Create `.gitignore` (if not generated) and `.gitattributes`.
    *   Create a repository on GitHub.
    *   Add remote: `git remote add origin <your-github-repo-url>`
    *   Initial commit and push: `git add .`, `git commit -m "Initial commit: Next.js setup"`, `git push -u origin main`
4.  **Integrate shadcn/ui:**
    ```bash
    npx shadcn-ui@latest init
    ```
    *   Follow prompts (confirm TypeScript, App Router, Tailwind config, CSS variables, alias `@/*`).
    *   Install essential components (start with `button`, `card`, `badge`):
        ```bash
        npx shadcn-ui@latest add button card badge
        ```
5.  **Configure Basic Layout:**
    *   Modify `src/app/layout.tsx` to include global elements (e.g., header, footer placeholders, theme provider).
    *   Set up basic global styles in `src/app/globals.css`.
6.  **Connect to Vercel:**
    *   Import the GitHub repository into your Vercel account.
    *   Configure build settings (should default correctly for Next.js).
    *   Verify initial deployment.

## 3. Milestone 2: MDX Content Integration (Est. Date: May 15)

1.  **Choose & Setup MDX Processing (Contentlayer Recommended):**
    *   Install Contentlayer:
        ```bash
        npm install contentlayer next-contentlayer
        ```
    *   Create `contentlayer.config.ts` in the project root.
    *   Define the `Project` document type schema in `contentlayer.config.ts`, including all front-matter fields (`title`, `date`, `tech` (as array), `description`, `repoUrl`, `demoUrl`, `ogImage`, etc.) and validation rules (mark required fields).
    *   Configure `next.config.js` to use `withContentlayer`.
    *   Reference: [Contentlayer Docs](https://contentlayer.dev/docs/getting-started-cddd76b7)
2.  **Create Content Structure:**
    *   Create the `content/projects` directory (or configure Contentlayer to use `src/content/projects`).
    *   Add sample project `.mdx` files with valid front-matter matching the schema.
3.  **Implement Data Fetching Logic:**
    *   Use Contentlayer's generated `allProjects` import to access parsed data in server components.

## 4. Milestone 3: Project Index Page (`/projects`) (Est. Date: May 20)

1.  **Create Route:** Create `src/app/projects/page.tsx`.
2.  **Fetch & Sort Data:**
    *   In `page.tsx`, import `allProjects` from `contentlayer/generated`.
    *   Sort projects by date (descending): `allProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())`.
3.  **Build UI:**
    *   Map over the sorted projects.
    *   Use shadcn/ui `Card` components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) to display project previews.
    *   Display `title`, `description`, and `tech` (using shadcn/ui `Badge` components) within each card.
    *   Use Next.js `<Link>` component to link each card to the corresponding project detail page (`/projects/[slug]`).

## 5. Milestone 4: Project Detail Page (`/projects/[slug]`) (Est. Date: May 25)

1.  **Create Dynamic Route:** Create `src/app/projects/[slug]/page.tsx`.
2.  **Generate Static Paths:**
    *   Implement `generateStaticParams` using `allProjects` to get all slugs for pre-rendering.
3.  **Fetch Project Data:**
    *   Implement `generateMetadata` to dynamically set page title, description, and `og:image` from the project's front-matter (FR-7).
    *   In the page component, find the specific project data using the `slug` param and `allProjects.find(...)`. Handle cases where the project isn't found (e.g., show 404).
4.  **Render Project Header:**
    *   Display `title`, `date`, and `tech` badges using appropriate HTML semantics and shadcn/ui components.
5.  **Render MDX Content:**
    *   Use Contentlayer's recommended approach to render the MDX body (often involves a custom component using `useMDXComponent`).
    *   **Style MDX:** Ensure Markdown elements (headings, paragraphs, lists, code blocks) are styled consistently. Consider using `@tailwindcss/typography` plugin configured in `tailwind.config.js` and applied to the MDX container, or map MDX elements to custom React components.
6.  **Implement Action Buttons:**
    *   Conditionally render "Live Demo" and "Source Code" shadcn/ui `Button` components based on the presence of `demoUrl` and `repoUrl` in the front-matter. Ensure they open in a new tab (`target="_blank" rel="noopener noreferrer"`). (FR-5)
7.  **Handle Media Embeds (FR-3):**
    *   **Images:** Map the Markdown `img` tag to the Next.js `<Image>` component via the MDX component mapping for optimization.
    *   **Video:** Use standard HTML `<video>` or a custom React component wrapper for responsiveness.
    *   **External Embeds (YouTube/Vimeo):** Use a library like `react-lite-youtube-embed` or create custom React components (e.g., `<YouTube id="..." />`) that can be used directly within the MDX content. Configure MDX options if necessary.

## 6. Milestone 5: SEO & Accessibility (Est. Date: May 30)

1.  **SEO:**
    *   Verify dynamic metadata generation in `[slug]/page.tsx` works correctly.
    *   Ensure the base `layout.tsx` has default metadata.
    *   Consider adding a `sitemap.xml` and `robots.txt`.
2.  **Accessibility (WCAG 2.1 AA):**
    *   Audit components using browser dev tools and accessibility checkers (e.g., Axe).
    *   Ensure semantic HTML is used correctly.
    *   Add `eslint-plugin-jsx-a11y` to ESLint config for static analysis.
    *   Test keyboard navigation and screen reader compatibility.

## 7. Extensibility Features

1.  **Theme Toggle (Light/Dark Mode):**
    *   Install `next-themes`: `npm install next-themes`
    *   Wrap the layout in `ThemeProvider` from `next-themes` in `src/app/layout.tsx`.
    *   Create a theme toggle button component using shadcn/ui `Button` or `DropdownMenu` that utilizes `useTheme` hook from `next-themes`.
    *   Ensure Tailwind dark mode (`darkMode: "class"`) and shadcn/ui styles work correctly with the theme toggle.
2.  **Serverless Functions (Optional):**
    *   If needed (e.g., for a contact form), create API routes under `src/app/api/`. Example: `src/app/api/contact/route.ts`.

## 8. Milestone 6: Deployment, QA & Launch (Est. Date: June 1)

1.  **Performance Tuning:**
    *   Run Lighthouse audits; aim for scores ≥ 90.
    *   Analyze bundle sizes (`@next/bundle-analyzer`).
    *   Optimize images (using Next.js `<Image>` or other methods).
2.  **Final QA:**
    *   Cross-browser/device testing.
    *   Verify all functional requirements (FRs).
    *   Check console for errors.
    *   Validate links.
3.  **Vercel Configuration:**
    *   Set up custom domain and ensure HTTPS (FR-8).
    *   Verify preview deployments for PRs work correctly (FR-6).
4.  **Security:**
    *   Review MDX sanitization (Contentlayer usually handles this well).
    *   Consider adding Content Security Policy (CSP) headers via `next.config.js` headers configuration.

## 9. Maintainability & Workflow

*   **Adding a Project:** Document the simple workflow: Create a new `.mdx` file in `content/projects`, fill in the front-matter, write content, commit, and push.
*   **Testing:** Consider adding basic tests (e.g., using Jest/React Testing Library) for critical components or data fetching logic to meet maintainability goals.

This guide provides a roadmap for building the portfolio site according to the original PRD using the Next.js stack. Remember to consult the official documentation for Next.js, shadcn/ui, and Contentlayer throughout the process.
