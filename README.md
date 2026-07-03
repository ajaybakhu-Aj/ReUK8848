# 8848 Momo House — United Kingdom

Marketing site for **8848 Momo House UK** — Nepalese dumplings (momos) and Oriental
Fusion food. Single-page React application with a CMS-backed content layer and a
lightweight in-app admin studio.

## Tech stack

| Concern            | Choice                                             |
| ------------------ | -------------------------------------------------- |
| Framework / build  | React 19 + Vite 8                                  |
| Styling            | Tailwind CSS 4 + shadcn/ui primitives              |
| Animation          | Framer Motion                                      |
| Routing            | React Router 7                                     |
| Data fetching      | TanStack Query (server state) + Zustand (auth)     |
| i18n               | i18next / react-i18next                            |
| Forms / email      | EmailJS + Brevo                                    |

## Getting started

```bash
npm install
npm run dev        # start the Vite dev server (http://localhost:5173)
```

### Scripts

| Script            | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the local dev server with HMR        |
| `npm run build`   | Production build to `dist/`                |
| `npm run preview` | Preview the production build locally       |
| `npm run lint`    | Run ESLint over the project                |
| `npm run deploy`  | Build and publish `dist/` to GitHub Pages  |

## Project structure

```text
src/
├── App.jsx                 # Route table (lazy-loaded pages)
├── main.jsx                # App bootstrap: React Query, i18n, Toaster
├── components/
│   ├── layout/             # Navbar, Footer, page Layout
│   └── ui/                 # shadcn/ui primitives (generated)
├── pages/
│   ├── home/sections/      # Composable home-page sections
│   ├── menu/               # Menu page
│   ├── franchise/          # Franchise page + inquiry form
│   ├── about/              # About page
│   └── gallery/            # Gallery page
├── studio/                 # In-app CMS admin (routes under /studio)
├── lib/
│   ├── cms.js              # CMS hooks + fallback content (DEFAULT_* objects)
│   ├── links.js            # External link constants
│   └── utils.js            # `cn` class-name helper
└── i18n/                   # i18next config + locale bundles
```

## Content & configuration

Site content is served from a CMS API and consumed through the hooks in
[`src/lib/cms.js`](src/lib/cms.js) (`useSiteSettings`, `useHomePage`,
`useCurrentMenu`, …). Every hook falls back to the `DEFAULT_*` constants in the
same file, so the site renders fully even when the API is unavailable.

The CMS endpoint is resolved by [`resolveApiBaseUrl`](src/lib/apiConfig.js), in
priority order:

1. Runtime config — `window.__8848_CONFIG__` in [`public/config.js`](public/config.js)
2. Build-time env vars — `VITE_CMS_API_URL` / `VITE_API_URL`
3. The page's own origin (same-origin fallback)

**Deployment checklist:** `public/config.js` ships with a local-dev default
(`http://127.0.0.1:4000`). **Before/during deploy, overwrite it with the real
API URL** for that environment:

```js
window.__8848_CONFIG__ = {
  CMS_API_URL: "https://api.example.com",
}
```

If this step is missed, the app does not break silently: a production build
never trusts a `localhost`/`127.0.0.1` value from either the runtime config or
the build-time env vars — it logs a `console.warn` and falls back to the next
source (see `resolveApiBaseUrl`). Every CMS-backed hook still renders its
`DEFAULT_*` fallback content regardless, so the site never shows a blank page,
but real content and form submissions won't work until a real URL is set.

## Routes

| Path           | Page                          |
| -------------- | ----------------------------- |
| `/`            | Home                          |
| `/menu`        | Menu                          |
| `/franchise`   | Franchise enquiry             |
| `/about-us`    | About                         |
| `/studio/*`    | CMS admin studio              |

## Deployment

The build output in `dist/` is a static bundle. `npm run deploy` publishes it to
GitHub Pages; `vercel.json` is included for SPA fallback routing on Vercel.
