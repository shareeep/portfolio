# Guide: Adding New Projects

This guide explains how to add new project entries to your portfolio site using the current MDX and Velite setup.

## Overview

Projects are managed as individual `.mdx` files within the `content/projects/` directory. Velite processes these files based on the configuration in `velite.config.ts` (specifically the `projects` collection).

## Steps to Add a New Project

1.  **Create the MDX File:**
    *   Navigate to the `content/projects/` directory.
    *   Create a new file with a descriptive name ending in `.mdx`. The filename will determine the URL slug. For example, `my-cool-project.mdx` will result in the URL `/projects/my-cool-project`. Keep filenames simple, lowercase, and use hyphens for spaces.

2.  **Add Frontmatter:**
    *   At the very top of your new `.mdx` file, add YAML frontmatter enclosed in triple hyphens (`---`).
    *   Define the required and optional fields based on the `projects` schema in `velite.config.ts`:
        ```yaml
        ---
        title: "My Cool Project Title" # Required: The main title of your project.
        description: "A brief description of this awesome project." # Optional: A short summary.
        date: "YYYY-MM-DD" # Required: The date associated with the project (e.g., completion date). Use ISO format.
        published: true # Optional (defaults to true): Set to false to hide the project from the list page.
        image: "/images/projects/my-cool-project-image.jpg" # Optional: Path to the main project image (see Image/Video section below).
        authors:
          - your-author-slug # Required: The slug of the author file in content/authors/ (e.g., shadcn). You can create your own author file there.
        ---
        ```

3.  **Add Content:**
    *   Below the closing `---` of the frontmatter, write the main content of your project page using Markdown and MDX syntax. You can include text, headings, lists, code blocks, and embed React components like `<Image />` if needed.

4.  **Add Images/Videos:**
    *   **Placement:** Place your image or video files inside the `public/images/projects/` directory.
    *   **Referencing:**
        *   For the main project image shown on the listing page, use the `image` field in the frontmatter (e.g., `image: "/images/projects/my-image.jpg"`).
        *   For images within the body content, use the standard Markdown image syntax (`![Alt text](/images/projects/my-other-image.png)`) or the Next.js `<Image />` component for optimization (`<Image src="/images/projects/my-inline-image.webp" alt="..." width={...} height={...} />`).
    *   **Formats:** Use web-friendly formats like JPG, PNG, WebP, GIF for images, and MP4 (with appropriate codecs like H.264) for videos.
    *   **Sizing:** Optimize images for the web to ensure fast loading times. Consider the aspect ratios used in the project list and detail pages. The frontmatter `image` field in `velite.config.ts` was previously associated with specific dimensions (e.g., 804x452), but you can adjust the components or prepare images accordingly.

5.  **Verify:**
    *   Run the development server (`pnpm dev`). Velite should automatically detect the new file and rebuild. If it doesn't appear immediately, try restarting the server.
    *   Navigate to the `/projects` page to see your new project listed.
    *   Click on the new project to view its individual page.
