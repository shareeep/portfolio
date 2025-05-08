# Deployment and Linting Issues Guide

This document outlines the issues encountered during the deployment process and the steps taken to address them, including persistent linting errors.

## 1. Initial Deployment Error: Missing Environment Variable

The first error encountered during deployment was:
```
Invalid environment variables: { NEXT_PUBLIC_APP_URL: [ 'Required' ] }
```
This indicated that the `NEXT_PUBLIC_APP_URL` environment variable, defined as required in `env.mjs`, was not set in the Vercel build environment.

**Solution:**

*   **For Vercel Production (main branch):**
    *   In Vercel project settings, under Environment Variables:
        *   Name: `NEXT_PUBLIC_APP_URL`
        *   Value: `https://www.shariffrashid.com`
        *   Environment: Production
*   **For Vercel Preview (dev branch, PRs):**
    *   In Vercel project settings, under Environment Variables:
        *   Name: `NEXT_PUBLIC_APP_URL`
        *   Value: `https://$VERCEL_URL` (This uses Vercel's system variable to dynamically set the URL for each preview deployment, e.g., `https://portfolio-orcin-alpha-11.vercel.app`)
        *   Environment: Preview
*   **For Vercel Development (if using `vercel dev`):**
    *   In Vercel project settings, under Environment Variables:
        *   Name: `NEXT_PUBLIC_APP_URL`
        *   Value: `http://localhost:3000`
        *   Environment: Development
*   **For Local Development (using `pnpm run dev`):**
    *   Create a `.env.local` file in the project root.
    *   Add the line: `NEXT_PUBLIC_APP_URL=http://localhost:3000`
    *   Ensure `.env.local` is added to `.gitignore`.

Setting these variables resolved the initial deployment blocker.

## 2. Subsequent ESLint Errors

After resolving the environment variable issue, the build process failed due to ESLint errors. These included:

*   `tailwindcss/no-unnecessary-arbitrary-value`: Suggested replacing arbitrary Tailwind values (e.g., `min-h-[12rem]`) with standard Tailwind classes (e.g., `min-h-48`).
*   `tailwindcss/classnames-order`: Enforced a specific order for Tailwind utility classes.
*   `react/no-unescaped-entities`: Required special characters in JSX text content, like apostrophes (`'`), to be escaped (e.g., using `'`).

**Solution for Tailwind CSS errors:**

Running the command `pnpm lint --fix` successfully resolved the `tailwindcss/no-unnecessary-arbitrary-value` and `tailwindcss/classnames-order` errors by automatically correcting the class names and their order.

## 3. Persistent ESLint Error: `react/no-unescaped-entities`

The `pnpm lint --fix` command did not resolve the `react/no-unescaped-entities` errors. These errors indicate that apostrophes (`'`) used within JSX text content must be replaced with their HTML entity equivalent, `'`.

**Affected Files and Lines (based on the last ESLint output):**

*   **`./app/(main)/about/page.tsx`**
    *   Line 11: `Hi 👋, I'm Shariff` should be `Hi 👋, I'm Shariff`
    *   Line 37: `Now, I'm building them hands-on!` should be `Now, I'm building them hands-on!`
*   **`./app/(main)/contact/page.tsx`**
    *   Line 21: `I'm always open...` should be `I'm always open...`
*   **`./app/(main)/page.tsx`**
    *   Line 25: `Hi 👋, I'm Shariff` should be `Hi 👋, I'm Shariff`
    *   Line 31: `I'm enthusiastic...` should be `I'm enthusiastic...`
    *   Line 78: `Now, building them hands-on!` should be `Now, I'm building them hands-on!` (The original error message pointed here, likely due to the apostrophe in "Now, I'm building them hands-on!" which was slightly different in the file content provided earlier. The fix is for the apostrophe in "I'm" if it exists, or "building them hands-on!" if that's the actual text with an unescaped apostrophe).
    *   Line 80: `Let's Build Something Amazing!` should be `Let's Build Something Amazing!`
    *   Line 98: `Here are some of the projects I've worked on.` should be `Here are some of the projects I've worked on.`
*   **`./app/(main)/skills/page.tsx`**
    *   Line 60: `technologies I'm proficient...` should be `technologies I'm proficient...`

**Attempted Automated Solutions (Unsuccessful):**

Multiple attempts were made to correct these `react/no-unescaped-entities` errors using the `replace_in_file` and `write_to_file` tools. While the tools reported successful execution, subsequent ESLint checks and file content inspections revealed that the apostrophes were not actually replaced with `'`.

**Manual Solution Required:**

The `react/no-unescaped-entities` errors need to be fixed manually by editing the specified lines in each file and replacing the literal apostrophe (`'`) with `'`. For example:
```jsx
// Incorrect
<p>It's a beautiful day.</p>

// Correct
<p>It's a beautiful day.</p>
```

After manually applying these changes, the `pnpm run build` command should be re-run to confirm that all linting errors are resolved and the build can complete successfully.
