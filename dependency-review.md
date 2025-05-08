# Dependency Review

This file analyzes the remaining dependencies in `package.json` after the initial refactoring to determine if further removals are possible for a streamlined blog application.

**Assessment Legend:**
*   **Keep:** Essential for core functionality (Next.js, React, Styling, Velite/MDX, OG Images, Dev Tools).
*   **Remove:** No longer needed due to feature removal.
*   **Investigate:** Potentially unused, requires searching the codebase to confirm.

| Package Name                        | Version        | Purpose                                       | Assessment   | Notes                                                                 |
| :---------------------------------- | :------------- | :-------------------------------------------- | :----------- | :-------------------------------------------------------------------- |
| **Core Framework & React**          |                |                                               |              |                                                                       |
| `next`                              | ^14.1.3        | Next.js Framework                             | Keep         | Essential                                                             |
| `react`                             | ^18.2.0        | React Library                                 | Keep         | Essential                                                             |
| `react-dom`                         | ^18.2.0        | React DOM Renderer                            | Keep         | Essential                                                             |
| `@types/node`                       | ^20.11.26      | Node.js Type Definitions                      | Keep         | Development                                                           |
| `@types/react`                      | ^18.2.65       | React Type Definitions                        | Keep         | Development                                                           |
| `@types/react-dom`                  | ^18.2.21       | React DOM Type Definitions                    | Keep         | Development                                                           |
| **Styling & UI Utils**              |                |                                               |              |                                                                       |
| `autoprefixer`                      | ^10.4.18       | CSS Vendor Prefixes                           | Keep         | Tailwind requirement                                                  |
| `class-variance-authority`          | ^0.7.0         | Utility for Tailwind variants                 | Keep         | Used by Shadcn UI                                                     |
| `clsx`                              | ^2.1.0         | Utility for conditional class names           | Keep         | Used by Shadcn UI / general utility                                   |
| `next-themes`                       | ^0.2.1         | Theme switching (light/dark)                  | Keep         | Used in `theme-provider.tsx`                                          |
| `postcss`                           | ^8.4.35        | CSS Processing Tool                           | Keep         | Tailwind requirement                                                  |
| `tailwind-merge`                    | ^2.2.1         | Utility for merging Tailwind classes          | Keep         | Used by Shadcn UI                                                     |
| `tailwindcss`                       | ^3.4.1         | CSS Framework                                 | Keep         | Core styling                                                          |
| `tailwindcss-animate`               | ^1.0.7         | Tailwind animation utilities                  | Keep         | Used by Shadcn UI                                                     |
| `@tailwindcss/line-clamp`           | ^0.4.4         | Tailwind plugin for line clamping             | Keep         | Potentially used for text truncation                                  |
| `@tailwindcss/typography`           | ^0.5.10        | Tailwind plugin for styling markdown          | Keep         | Essential for MDX blog content styling                                |
| **UI Components (Shadcn/Radix)**    |                |                                               |              |                                                                       |
| `@radix-ui/react-accessible-icon` | ^1.0.3         | Radix UI Component                            | Keep         | Likely used by other Radix components or icons                        |
| `@radix-ui/react-accordion`         | ^1.1.2         | Radix UI Component                            | Investigate  | Is Accordion used anywhere?                                           |
| `@radix-ui/react-alert-dialog`      | ^1.0.5         | Radix UI Component                            | Investigate  | Is Alert Dialog used anywhere?                                        |
| `@radix-ui/react-aspect-ratio`      | ^1.0.3         | Radix UI Component                            | Keep         | Potentially used for images/media                                     |
| `@radix-ui/react-avatar`            | ^1.0.4         | Radix UI Component                            | Investigate  | Was used for user avatars, maybe author avatars? (Check usage)        |
| `@radix-ui/react-checkbox`          | ^1.0.4         | Radix UI Component                            | Investigate  | Likely unused (no forms left?)                                        |
| `@radix-ui/react-collapsible`       | ^1.0.3         | Radix UI Component                            | Investigate  | Is Collapsible used anywhere?                                         |
| `@radix-ui/react-context-menu`      | ^2.1.5         | Radix UI Component                            | Investigate  | Is Context Menu used anywhere?                                        |
| `@radix-ui/react-dialog`            | ^1.0.5         | Radix UI Component                            | Investigate  | Is Dialog used anywhere?                                              |
| `@radix-ui/react-dropdown-menu`     | ^2.0.6         | Radix UI Component                            | Investigate  | Was used for user menu, maybe theme toggle? (Check usage)           |
| `@radix-ui/react-hover-card`        | ^1.0.7         | Radix UI Component                            | Investigate  | Is Hover Card used anywhere?                                          |
| `@radix-ui/react-icons`             | ^1.3.0         | Radix UI Icons                                | Keep         | Used by various Radix components                                      |
| `@radix-ui/react-label`             | ^2.0.2         | Radix UI Component                            | Investigate  | Likely unused (no forms left?)                                        |
| `@radix-ui/react-menubar`           | ^1.0.4         | Radix UI Component                            | Investigate  | Is Menubar used anywhere?                                             |
| `@radix-ui/react-navigation-menu`   | ^1.1.4         | Radix UI Component                            | Keep         | Used by `main-nav.tsx`                                                |
| `@radix-ui/react-popover`           | ^1.0.7         | Radix UI Component                            | Investigate  | Is Popover used anywhere? (Maybe search?)                             |
| `@radix-ui/react-progress`          | ^1.0.3         | Radix UI Component                            | Investigate  | Is Progress used anywhere?                                            |
| `@radix-ui/react-radio-group`       | ^1.1.3         | Radix UI Component                            | Investigate  | Likely unused (no forms left?)                                        |
| `@radix-ui/react-scroll-area`       | ^1.0.5         | Radix UI Component                            | Investigate  | Is Scroll Area used anywhere?                                         |
| `@radix-ui/react-select`            | ^2.0.0         | Radix UI Component                            | Investigate  | Is Select used anywhere?                                              |
| `@radix-ui/react-separator`         | ^1.0.3         | Radix UI Component                            | Investigate  | Is Separator used anywhere?                                           |
| `@radix-ui/react-slider`            | ^1.1.2         | Radix UI Component                            | Investigate  | Is Slider used anywhere?                                              |
| `@radix-ui/react-slot`              | ^1.0.2         | Radix UI Utility                              | Keep         | Used by Shadcn UI Button/other components                             |
| `@radix-ui/react-switch`            | ^1.0.3         | Radix UI Component                            | Investigate  | Is Switch used anywhere? (Maybe theme toggle?)                        |
| `@radix-ui/react-tabs`              | ^1.0.4         | Radix UI Component                            | Investigate  | Are Tabs used anywhere?                                               |
| `@radix-ui/react-toast`             | ^1.1.5         | Radix UI Component                            | Investigate  | Related to `sonner`? Likely unused.                                   |
| `@radix-ui/react-toggle`            | ^1.0.3         | Radix UI Component                            | Investigate  | Is Toggle used anywhere?                                              |
| `@radix-ui/react-toggle-group`      | ^1.0.4         | Radix UI Component                            | Investigate  | Is Toggle Group used anywhere?                                        |
| `@radix-ui/react-tooltip`           | ^1.0.7         | Radix UI Component                            | Investigate  | Is Tooltip used anywhere?                                             |
| `lucide-react`                      | ^0.356.0       | Icon Library                                  | Keep         | Used throughout UI                                                    |
| `cmdk`                              | ^1.0.0         | Command Menu Component                        | Investigate  | Likely unused (was part of search/dashboard?)                         |
| `embla-carousel-react`              | ^8.0.0         | Carousel Component                            | Investigate  | Is Carousel used anywhere?                                            |
| `input-otp`                         | ^1.1.0         | OTP Input Component                           | Investigate  | Likely unused (related to auth)                                       |
| `react-day-picker`                  | ^8.10.0        | Date Picker Component                         | Investigate  | Likely unused                                                         |
| `react-resizable-panels`            | ^2.0.12        | Resizable Panel Component                     | Investigate  | Likely unused                                                         |
| `sonner`                            | ^1.4.3         | Toast Notification Library                    | Investigate  | Likely unused                                                         |
| `vaul`                              | ^0.9.0         | Drawer Component                              | Investigate  | Likely unused                                                         |
| **Content Processing**              |                |                                               |              |                                                                       |
| `velite`                            | 0.1.0-beta.13  | Content Management (MDX processing)           | Keep         | Essential for blog content                                            |
| `rehype-autolink-headings`          | ^7.1.0         | Rehype Plugin (MDX)                           | Keep         | Used in `velite.config.ts`                                            |
| `rehype-pretty-code`                | ^0.13.0        | Rehype Plugin (MDX)                           | Keep         | Used in `velite.config.ts`                                            |
| `rehype-slug`                       | ^6.0.0         | Rehype Plugin (MDX)                           | Keep         | Used in `velite.config.ts`                                            |
| `shiki`                             | ^1.1.7         | Syntax Highlighting                           | Keep         | Used by `rehype-pretty-code`                                          |
| `unist-util-visit`                  | ^5.0.0         | AST Utility                                   | Keep         | Likely used by Rehype plugins                                         |
| `date-fns`                          | ^3.4.0         | Date Utility Library                          | Keep         | Used for formatting post dates                                        |
| **Forms**                           |                |                                               |              |                                                                       |
| `@hookform/resolvers`               | ^3.3.4         | React Hook Form Resolver (e.g., for Zod)      | Investigate  | Likely unused                                                         |
| `react-hook-form`                   | ^7.51.0        | Form Library                                  | Investigate  | Likely unused                                                         |
| `react-textarea-autosize`           | ^8.5.3         | Autosizing Textarea                           | Investigate  | Likely unused (was part of editor?)                                   |
| `zod`                               | ^3.22.4        | Schema Validation                             | Keep         | Used by `@t3-oss/env-nextjs`                                          |
| **Dev Tools & Linting**             |                |                                               |              |                                                                       |
| `@commitlint/cli`                   | ^19.1.0        | Commit Message Linting                        | Keep         | Dev Tool                                                              |
| `@commitlint/config-conventional` | ^19.1.0        | Commitlint Configuration                      | Keep         | Dev Tool                                                              |
| `@ianvs/prettier-plugin-sort-imports` | ^4.1.1       | Prettier Plugin                               | Keep         | Dev Tool                                                              |
| `@typescript-eslint/parser`         | ^7.2.0         | ESLint Parser for TypeScript                  | Keep         | Dev Tool                                                              |
| `eslint`                            | ^8.57.0        | Linter                                        | Keep         | Dev Tool                                                              |
| `eslint-config-next`                | ^14.1.3        | ESLint Config for Next.js                     | Keep         | Dev Tool                                                              |
| `eslint-config-prettier`            | ^9.1.0         | ESLint Config for Prettier                    | Keep         | Dev Tool                                                              |
| `eslint-plugin-react`               | ^7.34.0        | ESLint Plugin for React                       | Keep         | Dev Tool                                                              |
| `eslint-plugin-tailwindcss`         | ^3.15.1        | ESLint Plugin for Tailwind                    | Keep         | Dev Tool                                                              |
| `husky`                             | ^9.0.11        | Git Hooks Manager                             | Keep         | Dev Tool                                                              |
| `prettier`                          | ^3.2.5         | Code Formatter                                | Keep         | Dev Tool                                                              |
| `prettier-plugin-tailwindcss`       | ^0.5.12        | Prettier Plugin for Tailwind                  | Keep         | Dev Tool                                                              |
| `pretty-quick`                      | ^4.0.0         | Prettier Runner for Staged Files              | Keep         | Dev Tool                                                              |
| `typescript`                        | ^5.4.2         | TypeScript Language                           | Keep         | Essential                                                             |
| **Utilities & Vercel**              |                |                                               |              |                                                                       |
| `@t3-oss/env-nextjs`                | ^0.9.2         | Environment Variable Validation               | Keep         | Still used for `NEXT_PUBLIC_APP_URL`                                  |
| `@vercel/analytics`                 | ^1.2.2         | Vercel Analytics                              | Keep         | Useful if deploying to Vercel                                         |
| `@vercel/og`                        | ^0.6.2         | Vercel OG Image Generation                    | Keep         | Used by `app/api/og/route.tsx`                                        |
| `prop-types`                        | ^15.8.1        | Runtime Type Checking (Less common with TS) | Investigate  | Likely unused                                                         |
| `sharp`                             | ^0.33.2        | Image Processing Library                      | Keep         | Used by Next.js Image Optimization / OG Image generation              |
