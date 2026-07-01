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

The CMS endpoint is resolved at runtime from `window.__8848_CONFIG__` in
[`public/config.js`](public/config.js), which is overridden per environment:

```js
window.__8848_CONFIG__ = {
  CMS_API_URL: "https://api.example.com",
}
```

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
