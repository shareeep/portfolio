# Renaming Guide: "blog" to "projects" and "marketing" to "main" (Detailed Steps)

This guide outlines the steps required to rename the core concepts and file structures related to "blog" and "marketing" within the application.

**Note:** Execute these steps carefully in the specified order. Stop the development server before starting unless otherwise noted.

## Preparation

1.  **STOP the Development Server:** (Completed)

## Part 1: Rename "blog" to "projects" (Completed)

1.  **Rename Content Directory:** (Completed)
    *   Renamed `content/blog/` -> `content/projects/`.

2.  **Update `velite.config.ts`:** (Completed)
    *   Opened `velite.config.ts`.
    *   Changed collection `name`: `"Post"` -> `"Project"`.
    *   Changed collection `pattern`: `"blog/**/*.mdx"` -> `"projects/**/*.mdx"`.
    *   Renamed collection constant: `posts` -> `projects`.
    *   Updated `collections` export: `{ pages, authors, projects }`.
    *   Made `image` field optional in Project schema.

3.  **Force Velite Rebuild:** (Completed - implicitly via server restarts/rebuilds)
    *   Velite rebuild was triggered by changes and server restarts during the process.

4.  **Rename App Route Directory:** (Completed)
    *   Renamed `app/(marketing)/blog/` -> `app/(marketing)/projects/`.

5.  **Update Project List Page (`app/(marketing)/projects/page.tsx`):** (Completed)
    *   Updated import from `#site/content` to use `projects as allProjects`.
    *   Renamed component `BlogPage` -> `ProjectsPage`.
    *   Renamed variables `allPosts` -> `allProjects`, `posts` -> `projects`, loop variable `post` -> `project`.
    *   Updated page title, description, and empty state text.
    *   Updated metadata title.

6.  **Update Individual Project Page (`app/(marketing)/projects/[...slug]/page.tsx`):** (Completed)
    *   Updated import from `#site/content` to use `projects as allProjects, type Project`.
    *   Renamed function `getPostFromParams` -> `getProjectFromParams` and updated internal logic.
    *   Renamed props interface `PostPageProps` -> `ProjectPageProps`.
    *   Updated `generateMetadata` function signature and internal logic (using `project` variable).
    *   Updated `generateStaticParams` function signature and internal logic (using `allProjects`, `project`).
    *   Renamed main component `PostPage` -> `ProjectPage`.
    *   Updated internal variable references from `post` -> `project`.
    *   Updated "See all posts" links to `/projects` and "See all projects".

7.  **Update Navigation Config (`config/marketing.ts`):** (Completed)
    *   Changed navigation item `title`: `"Blog"` -> `"Projects"`.
    *   Changed navigation item `href`: `"/blog"` -> `"/projects"`.

8.  **Rename/Remove Related Components:** (Completed)
    *   Removed `components/post-create-button.tsx`.
    *   Removed `components/post-operations.tsx`.
    *   Removed `components/editor.tsx`.
    *   Removed `components/sidebar-nav.tsx`.
    *   Removed `components/pager.tsx` (was DocsPager).
    *   Removed `components/project-item.tsx` (formerly `post-item.tsx`, deemed unused for project list).

9.  **Global Search/Replace & Image Path Updates:** (Completed)
    *   Renamed image directory `public/images/blog/` -> `public/images/projects/`.
    *   Updated image paths in `content/projects/*.mdx` files.

## Part 2: Rename "marketing" to "main" (Completed)

1.  **Rename App Route Directory:** (Completed)
    *   Renamed the app route group: `app/(marketing)/` -> `app/(main)/`. (Resulting path: `app/(main)/projects/`).

2.  **Rename Configuration File:** (Completed)
    *   Renamed the config file: `config/marketing.ts` -> `config/main.ts`.

3.  **Update Type Definition (`types/index.d.ts`):** (Completed)
    *   Renamed type `MarketingConfig` -> `MainConfig`.

4.  **Update Renamed Config File (`config/main.ts`):** (Completed)
    *   Updated import from `types` to use `MainConfig`.
    *   Updated exported constant name and type annotation to `mainConfig: MainConfig`.

5.  **Update Layout File (`app/(main)/layout.tsx`):** (Completed)
    *   Updated import path to `@/config/main`.
    *   Updated imported config name to `mainConfig`.
    *   Updated prop passed to `MainNav` to use `mainConfig.mainNav`.
    *   Renamed props interface `MarketingLayoutProps` -> `MainLayoutProps`.

## Final Steps (Testing Pending)

1.  **Start Development Server:** Run `pnpm dev`.
2.  **Test Thoroughly:**
    *   Check for any console errors during startup or navigation.
    *   Verify the main navigation shows "Projects" instead of "Blog" and links correctly to `/projects`.
    *   Verify the `/projects` page lists all projects, including the new "CampusG" one.
    *   Verify clicking on a project title navigates to the correct individual project page.
    *   Verify the content and layout of individual project pages.
    *   Verify the homepage and any other pages in the `app/(main)/` group load correctly.
