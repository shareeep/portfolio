# Guide: Creating New Pages for Your Navigation Bar (e.g., About, Contact, Resume)

This guide explains how to create and integrate new pages—such as 'About Me,' 'Contact Me,' or 'Resume'—into your portfolio. You'll learn how to add these pages to your main navigation bar, allowing them to serve unique functions and showcase different aspects of your profile or provide specific information.

## Overview

There are two main ways to add static pages in this setup:

1.  **Using MDX Content Files (Recommended for Content-Heavy Pages):** Similar to how projects are managed, you can create `.mdx` files for your static pages within the `content/pages/` directory. Velite is already configured to process these.
2.  **Using Standard Next.js App Router Pages:** Create new route segments (folders and `page.tsx` files) directly within the `app/(main)/` directory. This is suitable for pages requiring more custom layout or React logic than simple content display.

## Method 1: Using MDX Content Files (Recommended)

This method leverages the existing Velite setup for content processing and MDX rendering.

1.  **Create the MDX File:**
    *   Navigate to the `content/pages/` directory. (If it doesn't exist, create it).
    *   Create a new file for your page, e.g., `about.mdx`, `contact.mdx`, `resume.mdx`, or `timeline.mdx`. The filename (e.g., `about`) will become the URL slug for the page (e.g., `/about`).

2.  **Add Frontmatter:**
    *   Add YAML frontmatter at the top:
        ```yaml
        ---
        title: "About Me" # Required: The title of the page.
        description: "A little bit about my background and interests." # Optional: For SEO/metadata.
        # Add any other custom fields you might want here
        ---
        ```
    *   *(Note: The `pages` collection schema in `velite.config.ts` currently only defines `title`, `description`, `slug`, and `body`. You can extend this schema if you need more structured data for your pages).*

3.  **Add Content:**
    *   Write the page content below the frontmatter using Markdown and MDX. You can embed components if needed. For a timeline, you might create or use custom React components for timeline items and embed them here.

4.  **Link to the New Page:**
    *   Add a link to your new page in the main navigation. Edit `config/main.ts` and add a new item to the `mainNav` array. This makes your new page accessible from the site's header:
        ```typescript
        export const mainConfig: MainConfig = {
          mainNav: [
            // ... other items
            {
              title: "About", // Text displayed in the navigation
              href: "/about", // URL path, matches the MDX filename (slug)
            },
            {
              title: "Contact",
              href: "/contact", // Example for a contact page
            },
            {
              title: "Resume",
              href: "/resume",   // Example for a resume page
            },
            // {
            //   title: "Timeline",
            //   href: "/timeline", 
            // },
          ],
        }
        ```

5.  **Ensure Page Rendering Route Exists:**
    *   The template likely already has a dynamic route `app/(main)/[...slug]/page.tsx` designed to catch slugs and render the corresponding page from Velite's `pages` collection. Verify this file exists and correctly fetches and renders pages based on the slug. If it doesn't exist, you'll need to create it.

6.  **Verify:**
    *   Run `pnpm dev`.
    *   Check that the new link appears in the navigation.
    *   Click the link and verify your new page renders correctly.

## Method 2: Using Standard Next.js App Router Pages

Use this method if your page requires significant custom React logic or layout structure not easily achievable with just MDX.

1.  **Create Route Directory:**
    *   Inside `app/(main)/`, create a new directory for your page route (e.g., `app/(main)/about/`).

2.  **Create `page.tsx`:**
    *   Inside the new directory (e.g., `app/(main)/about/`), create a `page.tsx` file.
    *   Build your page component using React:
        ```typescript
        // app/(main)/about/page.tsx
        import { Metadata } from "next";

        export const metadata: Metadata = {
          title: "About Me",
          description: "Learn more about me.",
        };

        export default function AboutPage() {
          return (
            <div className="container py-6 lg:py-10">
              <h1 className="font-heading text-4xl">About Me</h1>
              <hr className="my-4" />
              <p>This is where my about content goes...</p>
              {/* Add more React components and logic here */}
            </div>
          );
        }
        ```

3.  **Link to the New Page:**
    *   Add a link to your new page in the main navigation by editing `config/main.ts` as shown in Method 1, Step 4. The `href` should match the route path (e.g., `/about`).

4.  **Verify:**
    *   Run `pnpm dev`.
    *   Check the navigation link.
    *   Click the link and verify your new React page component renders.

## Choosing a Method

*   Use **Method 1 (MDX)** for pages that are primarily content-driven (like a standard "About" page or even a timeline where you might define items in Markdown/MDX). It keeps content separate from code.
*   Use **Method 2 (App Router)** for pages needing complex layouts, state management, or specific React component interactions that go beyond simple content display.
