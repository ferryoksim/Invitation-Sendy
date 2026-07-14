# AGENTS.md

## Architecture

Static, framework-free HTML/CSS/JS site with one Netlify Function backing the RSVP feature.

- `index.html`, `password.html`, `welcome.html`, `save-date.html`, `dresscode.html`, `rsvp.html`, `closing.html`, `admin-login.html`, `dashboard.html` — one file per step of the invitation flow (see README for the flow order).
- `css/style.css` — design tokens (colors, fonts, radii), layout, and component styles.
- `css/animations.css` — keyframe animations (fades, sparkles, bubbles, confetti, page transitions).
- `css/responsive.css` — breakpoints only; no component styles belong here.
- `js/effects.js` — shared effects loaded on every page: animated ocean canvas, floating bubbles/sparkles, cursor sparkle, button ripple, confetti (`window.fireConfetti`), page transition helper (`window.navigateWithTransition`), and the background music toggle.
- `js/main.js`, `js/password.js`, `js/admin.js`, `js/rsvp.js`, `js/countdown.js`, `js/dashboard.js` — one script per page, loaded only where needed.
- `netlify/functions/rsvp.ts` — REST-ish API (`GET`/`POST`/`DELETE` on `/api/rsvp`) backed by Netlify Database.
- `db/schema.ts` / `db/index.ts` — Drizzle ORM schema and client for the `rsvps` table.

## Conventions

- Client-side "auth" (secret code page, admin login) is intentionally simple `sessionStorage` gating — this is a party invitation, not a security boundary. Don't add real auth infrastructure here.
- Invitation pages (`welcome.html` onward) redirect to `password.html` if `sessionStorage.senn_invite_unlocked` isn't set; the dashboard redirects to `admin-login.html` if `senn_admin_authed` isn't set.
- All persistent data (RSVP submissions) goes through Netlify Database via the `/api/rsvp` function — never store RSVP data client-side only.
- Third-party libraries (Typed.js, Chart.js, SheetJS) are loaded via CDN `<script>` tags per-page rather than bundled, to keep the site framework-free and buildless.
- Schema changes to `db/schema.ts` require running `npx drizzle-kit generate` to produce a migration in `netlify/database/migrations/`.
