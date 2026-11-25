# X Utility — official website

A production-ready Next.js website for X Utility: home, download, features, docs, about and GitHub pages, with a real GitHub Releases–driven download center.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- GitHub Releases API via `src/app/api/releases/route.ts`

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Check and build

```sh
npm run typecheck
npm run build
npm start
```

## Configuration

Edit `src/config/site.json` for navigation, features, supported platforms, asset patterns, installation instructions and roadmap text.

Optionally set `GITHUB_TOKEN` (a GitHub personal access token with public repo read access) to raise the Releases API rate limit from 60 to 5,000 requests per hour. Without it the site still works unauthenticated.

Set `NEXT_PUBLIC_SITE_URL` to your deployed origin so metadata, canonical URLs, sitemap and robots use the correct domain:

```sh
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```

## Branding and theme

The official X Utility mark is in `public/logo/` (copied from the repository's `assets/xutil.svg`, `.png` and `.ico`). It appears in the navigation, footer, home hero, favicon and Open Graph image.

The visual style is Omarchy-inspired: pure black canvas, oversized tight typography, hairline borders, monospace labels and minimal cards. Geist and JetBrains Mono are loaded with `next/font`. Theme tokens live in `tailwind.config.ts` and `src/app/globals.css`.

## Download behaviour

- `/api/releases` fetches the latest **stable, non-draft** release from `github.com/vedaprakashkamaraj/xulity`.
- Assets are classified by filename into Windows, Linux and macOS groups.
- Version, release date, size, download count and published SHA-256 checksums are shown when present.
- When no stable release exists, the site shows a clear development status and links to source and the releases page. It never invents download links or versions.
- The website never installs or executes software.

## Deployment

Deploy to Vercel or Cloudflare Pages with the build command `npm run build` and output directory `.next`. Add `NEXT_PUBLIC_SITE_URL` as an environment variable.
