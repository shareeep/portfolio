# Implementation Guide: Developer Portfolio Platform (Next.js + shadcn/ui + Velite)

**Version:** 1.1
**Date:** May 2, 2025
**Based on:** Original PRD specifying React/Next.js/shadcn/ui stack, updated for Velite and layout enhancements.

## 1. Introduction

*   **Purpose:** This guide provides step-by-step instructions for building the Developer Portfolio Platform using Next.js, React, TypeScript, shadcn/ui, Velite for content management, and MDX, as defined in the original Product Requirements Document (PRD) and subsequent updates.
*   **Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Velite (for MDX/content), Vercel.

## 2. Core Concepts & Design

### 2.1. Navigation & Navbar

*   **Structure:** A persistent header component (`src/components/layout/Header.tsx`) will contain the main navigation.
*   **Links:** Include links to key sections:
    *   Home (`/`)
    *   Projects (`/projects`)
    *   *(Optional: About, Contact, Blog - can be added later)*
*   **Component:** Utilize shadcn/ui `NavigationMenu` or simple styled Next.js `<Link>` components for navigation items.
*   **Features:** The header will also host the Theme Toggle component (see Milestone 7).
*   **Responsiveness:** Ensure the navbar adapts gracefully to smaller screen sizes (e.g., using a mobile menu trigger).

### 2.2. Layout Strategy: Bento Grid

*   **Concept:** Employ a "bento box" style grid layout for visual organization and appeal on key pages. This involves dividing the page into distinct rectangular sections of varying sizes.
*   **Implementation:** Use Tailwind CSS Grid utilities (`grid`, `grid-cols-*`, `grid-rows-*`, `col-span-*`, `row-span-*`, `gap-*`) with rounded corners (`rounded-lg`, `rounded-xl`, etc.) on grid items to create the layouts.
*   **Homepage (`/`):**
    *   **Grid:** Define a responsive multi-column grid (e.g., `grid-cols-1 md:grid-cols-3`). Use `gap-4` or similar for spacing.
    *   **Cells:** Allocate grid cells with varying spans (`col-span-*`, `row-span-*`) for diverse content blocks inspired by the example image:
        *   **Bio Card:** Introduction, name, title, short bio, avatar/Memoji. (e.g., `md:col-span-1 md:row-span-1`)
        *   **Location/Map Card:** Small interactive map or static image showing location. (e.g., `md:col-span-1 md:row-span-1`)
        *   **Project Showcase Card:** Visually appealing preview of a key project with image/mockup. (Could be larger, e.g., `md:col-span-1 md:row-span-2`)
        *   **Social Link Card:** Link to a primary social profile (e.g., Twitter, GitHub). (e.g., `md:col-span-1 md:row-span-1`)
        *   **Activity Status Card:** Display current activity (e.g., Spotify listening, recent commit). (e.g., `md:col-span-1 md:row-span-1`)
        *   **Blog Snippet Card:** Preview of a recent blog post or article. (e.g., `md:col-span-2 md:row-span-1`)
        *   **Theme Toggle Card:** A dedicated small card for the light/dark mode switch. (e.g., `md:col-span-1 md:row-span-1`)
        *   **Contact/Newsletter Card:** Call-to-action for contact or newsletter signup. (e.g., `md:col-span-2 md:row-span-1`)
    *   **Visuals:** Use distinct background colors, images, or gradients for different cells to enhance the bento effect. Ensure content within each cell is well-padded.
*   **Project Detail Page (`/projects/[slug]`):**
    *   **Grid:** Define a grid to structure the project content (can be simpler than homepage or also use bento style).
    *   **Cells:** Allocate grid cells for:
        *   **Project Header:** Title, date, tech stack badges. (Spanning across top or prominent cell)
        *   **Main Content:** Rendered MDX body. (Largest cell, e.g., `col-span-2 row-span-2`)
        *   **Image/Video Gallery:** Display project visuals (if any). (Medium cell)
        *   **Key Features/Highlights:** Bullet points or short descriptions. (Smaller cell)
        *   **Action Buttons:** Live Demo / Source Code links. (Smaller cell)
        *   *(Optional: Related projects, technical challenges)*

## 3. Milestone 1: Project Setup & Scaffolding (Est. Date: May 10)

1.  **Clean Up (If Necessary):** Remove any existing files from the previous Eleventy setup (e.g., `.eleventy.js`, `src/`, `tailwind.config.js`, `postcss.config.js`).
2.  **Initialize Next.js Project:**
    ```bash
    npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    cd portfolio
    ```
3.  **Setup Git & GitHub:** (As before)
4.  **Integrate shadcn/ui:**
    ```bash
    npx shadcn-ui@latest init
    ```
    *   Follow prompts.
    *   Install essential components:
        ```bash
        npx shadcn-ui@latest add button card badge navigation-menu dropdown-menu
        ```
5.  **Configure Basic Layout & Navbar:**
    *   Create `src/components/layout/Header.tsx` and `src/components/layout/Footer.tsx`.
    *   Implement the basic Navbar structure in `Header.tsx` as described in section 2.1.
    *   Modify `src/app/layout.tsx` to include `<Header />`, `<Footer />` placeholders, and wrap `children` in a `main` tag.
    *   Set up basic global styles in `src/app/globals.css`.
6.  **Connect to Vercel:** (As before)

## 4. Milestone 2: Content Integration with Velite (Est. Date: May 15)

1.  **Remove Previous Content Layer (If Applicable):**
    *   If `contentlayer` was installed: `npm uninstall contentlayer next-contentlayer`
    *   Delete `contentlayer.config.ts` and the `.contentlayer` directory.
    *   Remove `withContentlayer` from `next.config.js`.
    *   Clean up `.gitignore`.
2.  **Install Velite:**
    ```bash
    npm install velite
    ```
3.  **Configure Velite:**
    *   Create `velite.config.ts` in the project root.
    *   Define a `projects` collection:
        ```typescript
        // velite.config.ts
        import { defineConfig, defineCollection, s } from 'velite'

        const projects = defineCollection({
          name: 'Project', // Name of the collection
          pattern: 'content/projects/**/*.mdx', // Path to content files
          schema: s.object({
            title: s.string(), // Project title
            slug: s.slug('global', ['title']), // Auto-generate slug from title
            date: s.isodate(), // Publication date
            description: s.string(), // Short description
            tech: s.array(s.string()), // Array of technologies used
            repoUrl: s.string().optional(), // Optional link to repository
            demoUrl: s.string().optional(), // Optional link to live demo
            ogImage: s.string().optional(), // Optional OpenGraph image URL
            // Velite automatically captures MDX content into 'content' field
            content: s.mdx() // Process MDX content
          }).transform(data => ({ ...data, permalink: `/projects/${data.slug}` })) // Add permalink
        })

        export default defineConfig({
          root: 'content', // Root directory for content
          output: {
            data: '.velite', // Directory for generated data
            assets: 'public/static', // Directory for static assets
            base: '/static/', // Base path for assets
            clean: true // Clean output directories before build
          },
          collections: { projects } // Register collections
        })
        ```
    *   **Note:** Adjust schema fields (`name`, `pattern`, `schema` properties) based on exact project requirements.
4.  **Create Content Structure:**
    *   Create the `content/projects` directory.
    *   Add sample project `.mdx` files with valid front-matter matching the Velite schema. Example:
        ```mdx
        ---
        title: My Awesome Project
        date: 2024-05-15
        description: A brief description of this cool project.
        tech: ["React", "Next.js", "Tailwind CSS"]
        repoUrl: https://github.com/user/repo
        demoUrl: https://project-demo.com
        ---

        # Project Details

        This is the main content of the project, written in Markdown/MDX...
        ```
5.  **Update `.gitignore`:** Add `.velite/` to your `.gitignore` file.
6.  **Run Velite Build:** Velite typically integrates with Next.js builds. Running `npm run dev` or `npm run build` should trigger Velite. Check Velite documentation if specific commands are needed.

## 5. Milestone 3: Homepage & Project Index Page (`/`, `/projects`) (Est. Date: May 20)

1.  **Homepage (`src/app/page.tsx`):**
    *   Implement the Bento Grid layout as described in section 2.2.
    *   Fetch a few featured projects (e.g., latest 3) using Velite data:
        ```typescript
        import { projects } from '@/velite'; // Adjust import path if needed
        // ... inside component
        const featuredProjects = projects
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        ```
    *   Use shadcn/ui `Card` components within grid cells to display featured project previews (`title`, `description`, link to `permalink`).
    *   Populate other grid cells (Hero, Skills, CTA).
2.  **Project Index Page (`src/app/projects/page.tsx`):**
    *   Create the route file.
    *   Fetch and sort all projects:
        ```typescript
        import { projects } from '@/velite';
        // ... inside component
        const sortedProjects = projects
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        ```
    *   Build UI: Map over `sortedProjects`.
    *   Use shadcn/ui `Card` components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) for each project preview.
    *   Display `title`, `description`, and `tech` (using shadcn/ui `Badge`) within each card.
    *   Use Next.js `<Link>` component linking to `project.permalink`.

## 6. Milestone 4: Project Detail Page (`/projects/[slug]`) (Est. Date: May 25)

1.  **Create Dynamic Route:** Create `src/app/projects/[slug]/page.tsx`.
2.  **Generate Static Paths:**
    *   Implement `generateStaticParams` using `projects` from Velite to get all slugs.
        ```typescript
        import { projects } from '@/velite';

        export async function generateStaticParams() {
          return projects.map((project) => ({
            slug: project.slug,
          }));
        }
        ```
3.  **Fetch Project Data:**
    *   Implement `generateMetadata` using data from the specific project found via `slug`.
        ```typescript
        import { projects } from '@/velite';
        import type { Metadata } from 'next';

        export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
          const project = projects.find((p) => p.slug === params.slug);
          if (!project) { return {}; } // Handle not found
          return {
            title: project.title,
            description: project.description,
            openGraph: {
              title: project.title,
              description: project.description,
              images: project.ogImage ? [project.ogImage] : [],
            },
          };
        }
        ```
    *   In the page component, find the specific project data:
        ```typescript
        import { projects } from '@/velite';
        import { notFound } from 'next/navigation';

        // ... inside component props { params }: { params: { slug: string } }
        const project = projects.find((p) => p.slug === params.slug);
        if (!project) {
          notFound(); // Trigger 404 if project doesn't exist
        }
        ```
4.  **Render Project Content (Bento Layout):**
    *   Implement the Bento Grid layout as described in section 2.2 for project details.
    *   **Header Cell:** Display `title`, `date`, `tech` badges.
    *   **Main Content Cell:** Render the MDX content. Create a component (`src/components/MdxContent.tsx`?) to handle rendering:
        ```typescript
        // Example MdxContent.tsx (simplified)
        import { MDXContent } from 'velite/mdx';
        import NextImage from 'next/image'; // For image optimization

        interface MdxProps {
          code: string; // Velite provides compiled code in 'content' usually
        }

        // Optional: Map Markdown elements to custom components
        const components = {
          img: (props: any) => <NextImage {...props} />,
          // Add other custom components (e.g., for code blocks, embeds)
        };

        export function MdxContent({ code }: MdxProps) {
          return (
            <div className="prose dark:prose-invert max-w-none"> {/* Add prose styling */}
              <MDXContent code={code} components={components} />
            </div>
          );
        }

        // In [slug]/page.tsx:
        // import { MdxContent } from '@/components/MdxContent';
        // ...
        // <MdxContent code={project.content} />
        ```
        *   **Style MDX:** Use `@tailwindcss/typography` plugin (install and configure in `tailwind.config.mjs`) and apply `prose` classes as shown above.
    *   **Action Buttons Cell:** Conditionally render "Live Demo" and "Source Code" buttons (shadcn/ui `Button`) linking to `project.demoUrl` and `project.repoUrl`. Ensure `target="_blank"`. (FR-5)
    *   **Media/Features Cells:** Populate other grid cells (images, videos, key features). Handle media embeds (FR-3) potentially via custom components mapped in `MdxContent.tsx`.

## 7. Milestone 5: SEO & Accessibility (Est. Date: May 30)

*(Largely unchanged, but verify Velite data feeds metadata correctly)*
1.  **SEO:**
    *   Verify dynamic metadata generation in `[slug]/page.tsx` works correctly with Velite data.
    *   Ensure base `layout.tsx` has default metadata.
    *   Add `sitemap.xml` and `robots.txt` generation (consider `next-sitemap` package).
2.  **Accessibility (WCAG 2.1 AA):** (As before)

## 8. Milestone 6: Extensibility Features (Est. Date: June 5)

1.  **Theme Toggle (Light/Dark Mode):**
    *   Install `next-themes`: `npm install next-themes`
    *   Wrap the layout in `ThemeProvider` from `next-themes` in `src/app/layout.tsx`.
    *   Create a theme toggle button component (e.g., `src/components/ThemeToggle.tsx`) using shadcn/ui `Button` or `DropdownMenu` and `useTheme` hook. Place it in the `Header`.
    *   Ensure Tailwind dark mode (`darkMode: "class"`) and shadcn/ui styles work.
2.  **Serverless Functions (Optional):** (As before)

## 9. Milestone 7: Deployment, QA & Launch (Est. Date: June 10)

*(Largely unchanged)*
1.  **Performance Tuning:** (As before)
2.  **Final QA:** (As before)
3.  **Vercel Configuration:** (As before)
4.  **Security:**
    *   Review MDX sanitization (Velite usually handles this).
    *   Consider adding Content Security Policy (CSP) headers.

## 10. Maintainability & Workflow

*   **Adding a Project:** Create a new `.mdx` file in `content/projects`, fill in the front-matter according to the Velite schema, write content, commit, and push. Velite and Next.js handle the rest during the build process.
*   **Testing:** (As before)

---
This updated guide incorporates Velite for content management and details the navigation and bento layout structure. Remember to consult the official documentation for Next.js, shadcn/ui, and Velite throughout the process.
