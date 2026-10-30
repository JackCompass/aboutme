# aboutme

Personal portfolio site built with [Next.js](https://nextjs.org/) (Pages Router). It renders About, Projects, and Discoveries content fetched at runtime from the [`JackCompass/googleme`](https://github.com/JackCompass/googleme) GitHub repository.

## Prerequisites

- **Node.js** 16.x or 18.x (recommended). Next.js 12 works best on these LTS lines.
- **npm** 8+ (comes with Node). This repo uses `package-lock.json`, so prefer npm over yarn/pnpm.

No environment variables are required for local development. Content is loaded from public GitHub URLs.

## Local setup

1. Clone the repository:

   ```bash
   git clone https://github.com/JackCompass/aboutme.git
   cd aboutme
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app hot-reloads when you edit files under `pages/`, `components/`, `styles/`, and related modules.

## Develop locally

### Useful scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start Next.js in development mode (port 3000)    |
| `npm run build`   | Create an optimized production build             |
| `npm run start`   | Serve the production build (run `build` first)   |
| `npm run lint`    | Run ESLint (`next lint` / `next/core-web-vitals`) |

### Project layout

```text
aboutme/
├── components/     # UI for about, projects, discoveries, header, errors
├── network/        # GitHub API helpers (axios + SWR)
├── pages/          # Next.js routes (index, projects, discoveries, api)
├── public/         # Static assets (favicon, author images)
├── state/          # Recoil atoms and helpers
└── styles/         # Global and module CSS
```

### Content source

Projects and discoveries are Markdown files in [`JackCompass/googleme`](https://github.com/JackCompass/googleme). The app:

1. Lists the repo tree via the GitHub API.
2. Classifies files matching `.preview.md`, `.md`, and `discovery.md`.
3. Loads file contents from `raw.githubusercontent.com`.

To change site content, edit that repository; restart or refresh the local app to pick up updates. Unauthenticated GitHub API calls are rate-limited (~60/hour), so heavy reloads may hit the limit.

### Formatting and linting

- ESLint is configured via `.eslintrc.json` (`eslint-config-next`).
- Prettier options live in `.prettierrc` for editor integration. Format on save is recommended; there is no dedicated `npm run format` script yet.

## Production build check

Before opening a PR, verify a clean production build:

```bash
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) and smoke-test the home, projects, and discoveries pages.
