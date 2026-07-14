# Senn's Sweet 17 Invitation Website

A premium, interactive birthday invitation website with a beach-luxury aesthetic: glassmorphism cards, animated ocean waves, soft romantic colors, a secret-code gate, a full invitation flow, an RSVP form, and an admin dashboard.

## Key technologies

- Plain HTML, CSS, and JavaScript (no frontend framework)
- Canvas-based animated ocean background, CSS animations for bubbles/sparkles/confetti
- [Typed.js](https://github.com/mattboldt/typed.js/) for the typing effect on the welcome page
- [Chart.js](https://www.chartjs.org/) for the attendance pie chart on the admin dashboard
- [SheetJS (xlsx)](https://sheetjs.com/) for exporting the guest list to Excel
- Netlify Functions (TypeScript) for the RSVP API
- Netlify Database (managed Postgres via Drizzle ORM) for storing RSVP submissions

## Site flow

`index.html` (loading + role select) → `password.html` (secret code) → `welcome.html` → `save-date.html` → `dresscode.html` → `rsvp.html` → `closing.html`

Admin path: `index.html` → `admin-login.html` → `dashboard.html`

- Secret code: `2009`
- Admin login: `admin` / `sen1`

## Running locally

```bash
npm install
netlify dev
```

This starts the site with Netlify Functions and the database emulator. The RSVP form posts to `/api/rsvp`, and the admin dashboard reads from the same endpoint.

## Database

Schema is defined in `db/schema.ts`. After changing it, regenerate migrations with:

```bash
npx drizzle-kit generate
```

Migrations live in `netlify/database/migrations` and are applied automatically on deploy.
