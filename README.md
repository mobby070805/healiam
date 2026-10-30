# Healiam site

Marketing site for healiam.com. Next.js 15 (App Router), TypeScript, Tailwind CSS 3.

## Quick start

Needs Node.js 20 or newer (https://nodejs.org).

```bash
npm install
npm run dev:clean
```

Then open http://localhost:3001.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage |
| `/tests` | The full panel: 11 categories, every marker |
| `/fairs` | Upcoming health fairs, grouped by state |
| `/fairs/[slug]` | One page per fair (6, generated from `src/lib/fairs.ts`) |
| `/demo` | Interactive 8-stage walkthrough |
| `/employer` | For employers: workplace fairs |
| `/about` | Team and mission |
| `/contact` | Phone, email, host a fair, message form |
| `/texas/blood-test` | Texas landing page |

Also generated: `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and Open Graph images.

## How it is put together

- **Copy lives in `src/lib/pages/*.ts`**, one file per page. Components only lay it out,
  so text changes never mean touching JSX.
- **Shared facts live in one place.** `src/lib/site.ts` (price, phone, links),
  `src/lib/fairs.ts` (every fair) and `src/lib/panel.ts` (every marker). The marker
  count on `/tests`, the fairs on the homepage, the sitemap and `/llms.txt` are all
  derived from these, so they cannot drift apart.
- **Server components by default.** Only `/demo`, the sticky CTA and the video embed
  ship JavaScript to the browser.
- **JSON-LD** for every page is built in `src/lib/schema.ts`.

## Scripts

```bash
npm run dev:clean   # dev server on :3001, clearing .next first
npm run build       # production build
npm run typecheck   # tsc --noEmit
```

`STATIC_EXPORT=1 npm run build` writes a plain static site to `out/` for Cloudflare Pages.

## Configuration

Copy `.env.example` to `.env.local`. Both values are optional and the site runs without them.

## Dependencies

`npm audit` reports zero vulnerabilities. The `overrides` entry in `package.json` pins postcss
forward, because Next vendors an older copy of it; `docs/PROJECT-NOTES.md` explains why and when
to remove it.

## Decisions and open items

`docs/PROJECT-NOTES.md` is the running log: every design decision, why it was made, and
what is still outstanding. Read it before changing anything that looks arbitrary.
