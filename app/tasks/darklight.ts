// Dark/Light Mode Implementation Tasks:

// 1. Install `next-themes` package:
//    - Run `npm install next-themes` or `yarn add next-themes`.

// 2. Configure Tailwind CSS for class-based dark mode:
//    - Ensure `darkMode: 'class'` is set in `tailwind.config.js` (or `.ts`).

// 3. Create ThemeProvider component:
//    - Create `components/theme-provider.tsx`.
//    - Add the provider logic using `next-themes`.

// 4. Wrap Application Layout:
//    - Import `ThemeProvider` in `app/layout.tsx`.
//    - Wrap the root layout's children with `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>...`.
//    - Add `suppressHydrationWarning` to the `<html>` tag.

// 5. Create Settings Page:
//    - Create `app/settings/page.tsx`.
//    - Add basic page structure (title, sections like "Appearance").

// 6. Create Theme Toggle Component:
//    - Create `components/theme-toggle.tsx`.
//    - Implement UI (Buttons, Switch, etc.) using `useTheme` hook from `next-themes` to set theme ('light', 'dark', 'system').

// 7. Add Toggle to Settings Page:
//    - Import and render `ThemeToggle` component within `app/settings/page.tsx`.

// 8. Update Navbar Link:
//    - In `components/Navbar.tsx`, change the "Settings" dropdown item's `href` to `"/settings"`.

// 9. Apply Dark Styles:
//    - Gradually add `dark:` variants to Tailwind classes throughout the application as needed (e.g., `dark:bg-slate-900`, `dark:text-slate-50`).
