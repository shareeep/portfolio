## Project Tags Implementation Plan (Further Updated)

**Objective:** Add a tagging system to projects to allow recruiters to quickly identify technologies and skills used in each project. This involves updating the data structure (Velite), content files, UI components, and implementing tag-based filtering.

**Phase 1: Data Structure Update**

1.  **Modify Velite Configuration ([`velite.config.ts`](velite.config.ts:1)):**
    *   **Action:** Add a `tags` field to the `projects` schema defined around [`line 46`](velite.config.ts:46).
    *   **Details:** The field will be `tags: s.array(s.string()).optional()`. This makes the tags an optional array of strings.
    *   **Example Snippet (within the `s.object`):**
        ```typescript
        // ...
        authors: s.array(s.string()),
        tags: s.array(s.string()).optional(), // New field for tags
        body: s.mdx(),
        // ...
        ```
2.  **Update Project Content Files (`.mdx`):**
    *   **Action:** Add the `tags` array to the frontmatter of each project `.mdx` file located in the [`content/projects/`](content/projects/) directory.
    *   **Example (for [`content/projects/breadtalk-digital-transformation.mdx`](content/projects/breadtalk-digital-transformation.mdx:1)):**
        ```yaml
        ---
        title: The New Talk in Town - BreadTalk Digital Transformation
        description: A digital transformation proposal for BreadTalk, utilising AI effectively with a focus on digital leadership.
        image: /images/projects/breadtalk-cover.png
        date: "2025-04-03"
        authors:
          - shariff-rashid
        tags: ["AI", "Computer Vision", "YOLOv11", "Recommender Systems", "Digital Transformation", "Figma"] # Example tags
        ---
        
        Project Grade Received: "A"
        ...
        ```
    *   **Note:** You will need to determine the appropriate tags for each of your projects.

**Phase 2: Displaying Tags on the Website**

1.  **Home Page ([`app/(main)/page.tsx`](app/(main)/page.tsx)):**
    *   **Action:** Modify the component to fetch and display tags for projects shown "at a glance".
    *   **Details:**
        *   Ensure the Velite-generated data for projects includes the `tags` field.
        *   For each project displayed on the home page, if `tags` exist, iterate through the array.
        *   Display each tag, likely using the [`components/ui/badge.tsx`](components/ui/badge.tsx) component, in a way that fits the "at a glance" design.
2.  **Projects Listing Page ([`app/(main)/projects/page.tsx`](app/(main)/projects/page.tsx)):**
    *   **Action:** Modify the component to fetch and display the tags for each project card.
    *   **Details:**
        *   Ensure the Velite-generated data includes the `tags` field.
        *   For each project, if `tags` exist, iterate through the array.
        *   Display each tag using the [`components/ui/badge.tsx`](components/ui/badge.tsx) component for styling. These tags will also serve as potential filter triggers.
3.  **Individual Project Page ([`app/(main)/projects/[...slug]/page.tsx`](app/(main)/projects/[...slug]/page.tsx)):**
    *   **Action:** Modify the component to fetch and display the tags for the currently viewed project.
    *   **Details:**
        *   Ensure the Velite-generated data for the specific project includes the `tags` field.
        *   If `tags` exist, display them, likely below the project title or in a metadata section, using the [`components/ui/badge.tsx`](components/ui/badge.tsx) component.

**Phase 3: Implementing Tag Filtering (Projects Page - [`app/(main)/projects/page.tsx`](app/(main)/projects/page.tsx))**

1.  **Extract and Display All Unique Tags:**
    *   **Action:** Collect all unique tags from all projects.
    *   **Details:**
        *   Iterate through all projects fetched for the page.
        *   Compile a unique list of all tags available across these projects.
        *   Display these unique tags as clickable filter options (e.g., using [`components/ui/badge.tsx`](components/ui/badge.tsx) or similar interactive elements) at the top of the projects list or in a sidebar.
2.  **State Management for Selected Filters:**
    *   **Action:** Implement state to keep track of currently selected filter tags.
    *   **Details:**
        *   Use React's `useState` hook to manage an array of selected tags (e.g., `selectedTags`, initialized as an empty array).
        *   When a user clicks on a tag from the unique list, update this state (add or remove the tag from `selectedTags`).
3.  **Filtering Logic:**
    *   **Action:** Filter the displayed projects based on the `selectedTags`.
    *   **Details:**
        *   Before rendering the list of projects, filter the main projects array.
        *   A project should be included if:
            *   No tags are selected (show all projects).
            *   The project's `tags` array contains *all* of the tags present in the `selectedTags` array (AND logic). Alternatively, consider if an OR logic (project contains *any* of the selected tags) is more appropriate. *Default assumption: AND logic for more precise filtering.*
4.  **UI Updates for Filtering:**
    *   **Action:** Update the UI to reflect active filters and the filtered project list.
    *   **Details:**
        *   Visually indicate which tags are currently active filters (e.g., change the appearance of the selected tag badges).
        *   The list of projects displayed should dynamically update based on the filtering logic.
        *   Consider adding a "Clear Filters" button to reset `selectedTags` to an empty array.

**Phase 4: (Optional Future Enhancement)**

*   **Search Integration:**
    *   **Action:** (If applicable) Update any existing search functionality ([`components/search.tsx`](components/search.tsx) might be relevant) to include tags in the searchable content.

**Mermaid Diagram of the Plan (Further Updated):**

```mermaid
graph TD
    A[Start: Add Tags to Projects] --> B{Phase 1: Data Structure};
    B --> C[Modify velite.config.ts];
    B --> D[Update .mdx Project Files with Tags];

    A --> E{Phase 2: Display Tags};
    E --> F[Update Home Page (app/(main)/page.tsx)];
    E --> G[Update Projects Listing Page (app/(main)/projects/page.tsx) - Display Tags];
    E --> H[Update Individual Project Page (app/(main)/projects/[...slug]/page.tsx)];
    F --> I[Use Badge Component for Display];
    G --> I;
    H --> I;

    A --> P{Phase 3: Implement Tag Filtering};
    P --> P1[Extract & Display Unique Tags on Projects Page];
    P --> P2[State Management for Selected Filters (useState)];
    P --> P3[Implement Filtering Logic (AND/OR)];
    P --> P4[UI Updates for Active Filters & Filtered List];
    P1 --> I; % Unique tags also use badge component

    A --> J{Phase 4: Optional Enhancements};
    J --> L[Integrate Tags into Search];

    C --> M[Re-run Velite to Generate Types];
    D --> M;
    M --> F;
    M --> G;
    M --> H;
    M --> P1; % Data for unique tags