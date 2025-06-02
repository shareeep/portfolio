## Project Tags Implementation Plan - Status Report

**Objective:** Add a tagging system to projects to allow recruiters to quickly identify technologies and skills used in each project.

### Implementation Status Checklist

- [x] **Phase 1: Data Structure Update**
  - [x] Added `tags` field to Velite schema in `velite.config.ts`
  - [x] Updated all project .mdx files with appropriate tags
  - [x] Regenerated Velite types with `npx velite`

- [x] **Phase 2: UI Display Implementation**
  - [x] Updated homepage to display tags under project cards
  - [x] Updated projects listing page to display tags for each project
  - [x] Updated individual project page to display tags
  - [x] Styled tags using the Badge component

- [x] **Phase 3: Basic Filtering Implementation**
  - [x] Extracted unique tags from all projects
  - [x] Added state management for selected tags
  - [x] Implemented filtering logic (AND logic)
  - [x] Added UI for tag selection and filtering

### Enhanced Features (Implementation Progress)

- [x] **Phase 4: Enhanced Filtering System** _(Stage 1 Complete)_

  #### Data Structure Changes
  - [x] **Tag Categorization System:**
    - [x] Design schema for categorizing tags (add metadata to tags)
    - [x] Create a mapping file (`tag-categories.ts`) to define categories:
      ```typescript
      export const tagCategories = {
        scope: ["Frontend", "Backend", "AI/ML", "UI/UX", "DevOps", "Cloud"],
        tools: ["Flask", "React", "Vue.js", "Kafka", "PostgreSQL", "Docker", "Kubernetes", "Grafana", "Temporal", "AWS", "Azure"],
        focus: ["Digital Transformation", "Solution Architecture", "Web Application", "Mobile Application", "Machine Learning", "Data Analysis"]
      };
      
      // Map each tag to its category
      export const tagCategoryMap = {
        "Frontend": "scope",
        "React": "tools",
        "Digital Transformation": "focus",
        // ... and so on for all tags
      };
      ```
    - [x] Add helper functions for tag categorization and representative tag selection
  
  #### UI Components (Partially Complete)
  - [x] **Category Tab System:**
    - [x] Create a tabbed interface for tag categories
    - [x] Implement collapsible sections for each category
  
  - [x] **Active Filters Display:**
    - [x] Create a component to show currently active filters
    - [x] Add "remove" option for individual filters
    - [x] Add "clear all" for each category and for all filters
  
  - [ ] **Dropdown Filter Component:** _(Future Enhancement)_
    - [ ] Design and implement dropdown component for category filters
    - [ ] Add search functionality within the dropdown
    - [ ] Support multi-select within each category
  
  #### State Management
  - [x] **Enhanced Filter State:**
    - [x] Update state structure to handle categories:
      ```typescript
      // Implemented state structure
      const [selectedTags, setSelectedTags] = useState<{
        scope: string[];
        tools: string[];
        focus: string[];
      }>({
        scope: [],
        tools: [],
        focus: []
      });
      ```
    - [x] Implement state management for active tab display
  
  #### Filter Logic
  - [x] **Multi-Category Filtering Algorithm:**
    - [x] Implement filtering logic that combines selections across categories
    - [x] Support for AND logic across all selected tags
    - [ ] Add option for OR logic within categories _(Future Enhancement)_
  
  #### User Experience Improvements
  - [x] **Visual Design Enhancement:**
    - [x] Add color coding for different categories (blue for scope, green for tools, purple for focus)
    - [x] Design and implement active state styling for selected tags
  
  - [ ] **Responsive Design:** _(Future Enhancement)_
    - [ ] Implement collapsible sidebar for desktop
    - [ ] Create modal/drawer approach for mobile filters
    - [ ] Ensure touch-friendly interface for mobile

  #### Testing & Optimization
  - [x] Manual testing with existing project tags
  - [ ] Create test cases for different filter combinations _(Future Enhancement)_
  - [ ] Test with a large number of projects/tags to ensure performance _(Future Enhancement)_
  - [ ] Implement skeleton loading state for filtered results _(Future Enhancement)_

  #### Implementation Approach - Current Progress & Next Steps

  The enhanced filtering system implementation is being carried out incrementally:

  **Stage 1: Tag Categorization Structure** ✅ **COMPLETED**
  - ✅ Created the category mapping data structure (`tag-categories.ts`)
  - ✅ Updated existing tags in all project files to fit into our categories (scope, tools, focus)
  - ✅ Refactored project page filter UI to use categorized tags

  **Stage 2: Enhanced UI Features** ✅ **PARTIALLY COMPLETED**
  - ✅ Implemented tabbed category interface for filtering
  - ✅ Added category sections with proper organization
  - ✅ Updated filter logic to handle multi-category filtering
  - ✅ Implemented visual distinctions (colors) for different category tags
  - ✅ Created active filters display with removal functionality

  **Stage 3: Advanced Features** 🔄 **PLANNED**
  - Add dropdown filter components for more complex filtering
  - Enhance multi-select functionality within each category
  - Add search within filter tags
  - Implement OR/AND toggle for filter logic options

  **Stage 4: Mobile Optimization & Polish** 🔄 **PLANNED**
  - Responsive design improvements for various screen sizes
  - Performance optimizations for filtering large numbers of projects
  - Additional visual design enhancements
  - User testing & refinements based on feedback

  #### Visual Concept (Current Implementation)

  ```
  DESKTOP LAYOUT:
  +-------------------------------------------------------+
  | Projects                                              |
  | Filter by:                                            |
  +-------------------------------------------------------+
  | [Scope ▼] [Tools ▼] [Focus ▼]  | Active: Frontend, React, X |
  +---------------------------+-----------------------------+
  |                           |                             |
  | ┌─────────────────────┐  |  ┌─────────────────────┐    |
  | │ Project Card 1      │  |  │ Project Card 2      │    |
  | │ with tags           │  |  │ with tags           │    |
  | └─────────────────────┘  |  └─────────────────────┘    |
  |                           |                             |
  +---------------------------+-----------------------------+

  DROPDOWN EXAMPLE:
  +------------------------+
  | Scope ▼                |
  +------------------------+
  | ☑ Frontend             |
  | ☐ Backend              |
  | ☐ AI/ML                |
  | ☐ UI/UX                |
  | ☐ DevOps               |
  +------------------------+
  ```

  #### Timeline Estimate

  - **Stage 1:** 1-2 days
  - **Stage 2:** 2-3 days
  - **Stage 3:** 3-4 days
  - **Stage 4:** 2-3 days

  Total implementation time: ~8-12 days depending on complexity and testing requirements

  #### Home Page Tag Display Strategy

  For the home page, where space is limited and visual clarity is important, we'll implement a "representative tags" approach:

  - **Display Strategy:**
    - Show one representative tag from each category (scope, tools, focus)
    - For example, a project might show "Backend" (scope), "Flask" (tools), and "Solution Architecture" (focus)
  
  - **Selection Logic:**
    - For each project, select the most representative tag from each category
    - Could be based on tag priority (predefined) or first tag in each category
  
  - **Visual Design:**
    - Color-code tags by category (e.g., blue for scope, green for tools, purple for focus)
    - Consider subtle category indicators (small icons or prefixes)
    - Use a consistent order of categories

  - **Overflow Handling:**
    - If needed, add a subtle "+X more" indicator for projects with many tags
    - On hover/mobile tap, could reveal full tag list

  **Visual Example:**
  ```
  [Backend] [Flask] [Solution Architecture]
  ```
  
  This approach gives recruiters an immediate understanding of each project's key attributes without overwhelming the home page with excessive tags.

- [ ] **Phase 5: Search Integration**
  - [ ] Update search functionality to include tags in searchable content
  - [ ] Enable combined search-and-filter operations

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