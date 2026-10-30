# AGENTS.md

Portfolio site built with Next.js 15 (Pages Router), React 18, Recoil and SWR, in
plain JavaScript. This repo contains no content: all Markdown is fetched in the
browser at runtime from the GitHub repo `JackCompass/googleme`. To change site
content, edit that repo instead. Pin Node to `24.x` (`.nvmrc` / `engines`) for
Vercel.

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run lint` and `npm run build`: run both to verify changes (there are no tests)

## How data loads

- Every page wraps its content in `<Header>`, which calls `useNetwork` to fetch
  the repo file list and store it in Recoil atoms (`state/atom.js`).
- Feature hooks (`useAbout`, `useProjects`, …) fetch file contents and call each
  other so detail pages work on a direct visit. Keep that chain intact.
- Detail pages find files by slug: `<slug>.md` for projects and
  `<slug>.discovery.md` for discoveries.
- There is no server-side fetching, so components must handle undefined or empty
  data by showing skeleton placeholders.
- GitHub limits unauthenticated API calls to about 60 per hour, so don't add
  extra fetches.

## Conventions

- Each component has its markup in `X.js`, its logic in `useX.js` and its
  styles in `X.module.css`.
- Use Next `<Link>` without a nested `<a>`; pass `className`, `target`, and
  `rel` on `Link` itself.
- Add dark-mode rules (`prefers-color-scheme`) next to any new color styles.
- Format with `.prettierrc` and write commit messages with prefixes like
  `fix:`, `feat:`, `docs:` or `chore:`.
