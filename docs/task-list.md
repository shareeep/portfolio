# Feature Development Task List

Here are the tasks for tomorrow, with references to the relevant guides:

1.  **Branding Removal**
    *   Refer to: [Branding Removal Guide](./docs/branding-removal-guide.md)
    *   Tasks:
        *   [x] Review the branding removal guide.
        *   [x] Identify all branding elements to be removed/updated.
        *   [x] Implement changes as per the guide.
        *   [ ] **USER ACTION:** Generate and replace favicons (in `public/`) and the Open Graph image (`public/og-placeholder.jpg` or update `config/site.ts`). Update `public/site.webmanifest` if needed.
        *   [ ] **USER ACTION:** Review `LICENSE.md` and decide to keep, change, or remove it.
        *   [ ] Test and verify all branding changes.

2.  **Homepage Redesign & New Page Creation**
    *   Refer to: [New Pages Guide](./docs/new-pages-guide.md) (for page creation mechanics)
    *   **Homepage Redesign (`app/(main)/page.tsx`):**
        *   [x] Plan bento-style, playful layout (inspired by provided image).
        *   [x] Implement new hero section design.
        *   [ ] Ensure responsiveness. (USER ACTION: Test and provide feedback)
    *   **"About Me" Page (`/about`):**
        *   [x] Plan content: Detailed resume, timeline of past experiences.
        *   [x] Create `app/(main)/about/page.tsx`.
        *   [x] Implement page structure and content.
        *   [x] Add "About" link to the main navigation.
    *   **"Skills" Page (`/skills`):**
        *   [x] Plan content: Breakdown of technical competencies.
        *   [x] Create `app/(main)/skills/page.tsx`.
        *   [x] Implement page structure and content.
        *   [x] Add "Skills" link to the main navigation.
    *   **"Contact" Page (`/contact`):**
        *   [x] Plan content: Links to LinkedIn, GitHub, and email.
        *   [x] Create `app/(main)/contact/page.tsx`.
        *   [x] Implement page structure and content.
        *   [x] Add "Contact" link to the main navigation.
    *   **General:**
        *   [x] Review [New Pages Guide](./docs/new-pages-guide.md) for page creation best practices.
        *   [x] Test all new pages and homepage changes thoroughly. (USER ACTION COMPLETED)

3.  **Adding New Projects** (Partially addressed by adding image to existing project)
    *   Refer to: [Adding Projects Guide](./docs/adding-projects-guide.md)
    *   Tasks:
        *   [x] Add image to `campusg-food-delivery.mdx`. (USER ACTION: Provide actual image at `public/images/projects/campusg-placeholder.jpg`)
        *   [ ] (Skipped for now) Review the adding projects guide.
        *   [ ] (Skipped for now) Prepare content and assets for the new projects.
        *   [ ] (Skipped for now) Add the new projects to the site as per the guide.
        *   [ ] (Skipped for now) Ensure projects are displayed correctly.
        *   [ ] (Skipped for now) Test project pages.

4.  **Review Author Functionality**
    *   Tasks:
        *   [x] Assess if author information (metadata, schema) is beneficial for the portfolio.
        *   [x] Decide whether to keep, modify, or remove the author display/functionality. (Decision: Keep for metadata, add visual display)
        *   [x] Implement changes if any. (Modified project page template to display author name/avatar)
