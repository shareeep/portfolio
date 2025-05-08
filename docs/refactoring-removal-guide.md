# Refactoring and Feature Removal Guide for Blog Template

This document outlines the steps to refactor the original Next.js template into a streamlined blog, removing unnecessary features like full user authentication, Stripe integration, and email functionalities.

## Phase 0: Investigation (Completed)

*   **Objective:** Determine how author information is handled for blog posts.
*   **Findings:**
    *   Author information is managed via local MDX files in `content/authors/` and processed by Velite (`velite.config.ts`).
    *   Blog posts in `content/blog/` link to authors using slugs in their frontmatter (e.g., `authors: ["shadcn"]`).
    *   The database `User` model and related authentication tables are **not** used for displaying blog author information.
*   **Conclusion:** We can safely remove database tables and backend code related to user accounts and authentication if the blog is the sole focus.

## Phase 1: Removing Stripe Functionality (Completed)

*   **Code & Config:**
    *   Removed `lib/stripe.ts`.
    *   Removed `lib/subscription.ts`.
    *   Removed `config/subscriptions.ts`.
    *   Ensured Stripe-related environment variables are optional (already done in `env.mjs`) and can be removed from `.env.example` and `.env`.
*   **UI & Pages:**
    *   Removed `components/billing-form.tsx`.
    *   Removed the pricing page: `app/(marketing)/pricing/`.
    *   *Action Item: Review and remove any remaining links or UI elements pointing to the pricing page or billing during general cleanup.*
*   **API Routes:**
    *   Removed Stripe webhook API route: `app/api/webhooks/stripe/`.
*   **Database (Prisma):**
    *   Removed Stripe-specific fields from the `User` model in `prisma/schema.prisma`.
    *   *Note: We will likely remove the entire `User` model in a later phase.*

## Phase 2: Removing User Authentication & Accounts (Completed - Prisma Migration Deferred)

*   **UI & Pages:**
    *   Removed login/register pages and their parent directory: `app/(auth)/`.
    *   Removed user account components: `components/user-account-nav.tsx`, `components/user-auth-form.tsx`, `components/user-avatar.tsx`, `components/user-name-form.tsx`.
    *   Removed dashboard pages and their parent directory: `app/(dashboard)/`.
    *   Removed editor pages and their parent directory: `app/(editor)/`.
*   **Navigation:**
    *   Removed "Pricing" link from `config/marketing.ts` (used by `main-nav.tsx` and `mobile-nav.tsx`).
    *   Emptied navigation arrays in `config/dashboard.ts`.
*   **Backend & API:**
    *   Removed `lib/auth.ts`.
    *   Removed `lib/session.ts`.
    *   Removed NextAuth API route directory: `app/api/auth/`.
*   **Database (Prisma):**
    *   Removed `User`, `Account`, `Session`, `VerificationToken` models from `prisma/schema.prisma`.
    *   Removed `authorId` and `author` relation from `Post` model in `prisma/schema.prisma`.
    *   *Prisma Migration Note: Migration (`prisma migrate dev`) is deferred. If the database is kept, a migration will be needed. If the database is removed (Phase 5), this step becomes obsolete.*
*   **Middleware:**
    *   Updated `middleware.ts` to remove authentication-related logic and matcher.

## Phase 3: Removing Email Functionality (Postmark) (Completed)

*   Searched for Postmark-related environment variables (`POSTMARK_API_TOKEN`, `SMTP_FROM`). Found them only in `env.mjs` where they are already optional.
*   Concluded that email sending logic was likely tied to the removed authentication system. No active email sending code is apparent.
*   Ensured Postmark-related environment variables are optional (already done in `env.mjs`) and can be removed from `.env.example` and `.env` during cleanup.

## Phase 4: General Cleanup & Dependency Removal (Completed)

*   **Configuration:**
    *   Reviewed `config/docs.ts` and removed "Dashboard" and "Authentication" sections from sidebar navigation.
    *   Reviewed `config/site.ts`; no changes needed.
*   **Components:** *Action Item: Further review `components/` directory for any other obviously unused components during a final sweep.*
*   **API Routes:** *Action Item: Further review `app/api/` directory for any other obviously unused routes during a final sweep.*
*   **Dependencies:**
    *   Uninstalled: `@next-auth/prisma-adapter`, `next-auth`, `nodemailer`, `postmark`, `stripe`, `@editorjs/*` packages, `react-editor-js`.
    *   Ran `pnpm install` to update lockfile and regenerate Prisma client.
    *   *Note: `zod` is still likely used by `@t3-oss/env-nextjs` for the remaining environment variables. `@prisma/client` and `prisma` are still present, pending Phase 5.*

## Phase 5: Database Simplification (if Posts are also File-Based) (Completed)

*   **Investigation:** Confirmed that the Prisma `Post` model was used for backend CMS-like API routes (`app/api/posts/`) and not for public blog rendering, which uses Velite.
*   **Action (as content is file-based via Velite):**
    *   Commented out the `Post` model in `prisma/schema.prisma`.
    *   Removed API routes `app/api/posts/`.
    *   Removed `lib/db.ts` (Prisma client initialization).
    *   Uninstalled Prisma dependencies (`@prisma/client`, `prisma`) from `package.json`.
    *   Commented out `DATABASE_URL` from `env.mjs`, `.env`, and `.env.example`.
    *   Removed the entire `prisma/` directory.

## Phase 6: Additional UI and Content Cleanup (Ongoing)

*   **Documentation Feature:**
    *   Removed "Documentation" link from `config/marketing.ts`.
    *   Removed docs pages directory: `app/(docs)/docs/`.
    *   Removed docs layout: `app/(docs)/layout.tsx`.
    *   Removed parent grouping directory: `app/(docs)/`.
    *   Removed `config/docs.ts`.
    *   Removed `content/docs/`.
    *   Commented out "docs" and "guides" collections from `velite.config.ts` and updated the `collections` export.
*   **Login Button:**
    *   Removed the Login button from `app/(marketing)/layout.tsx`.
*   **API Routes Cleanup:**
    *   Removed `app/api/users/` directory (contained leftover user and Stripe routes).
    *   Removed empty `app/api/webhooks/` directory.
    *   Retained `app/api/og/` for Open Graph image generation.
*   **Lib/Hooks Cleanup:**
    *   Removed unused validation files: `lib/validations/auth.ts`, `lib/validations/post.ts`, `lib/validations/user.ts`. Retained `lib/validations/og.ts`.
    *   Removed unused `lib/exceptions.ts` (contained `RequiresProPlanError`).
    *   Reviewed `lib/utils.ts` and confirmed remaining functions (`cn`, `formatDate`, `absoluteUrl`) are needed.
    *   Reviewed `hooks/use-lock-body.ts` and confirmed it's used by `components/mobile-nav.tsx`.
    *   Reviewed `hooks/use-mounted.ts` and confirmed it's used by `components/toc.tsx`.

---

*This guide documents the completed refactoring steps.*
