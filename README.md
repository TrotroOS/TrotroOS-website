# TrotroOS website

Static marketing site for [trotroos.app](https://trotroos.app).

## Pages

| Path                  | Purpose                                 |
| --------------------- | --------------------------------------- |
| `/`                   | Landing page — features, download links |
| `/privacy.html`       | Privacy policy (Play Store requirement) |
| `/terms.html`         | Terms of service                        |
| `/track.html?token=…` | Trip Guardian share landing (opens app) |

## Preview locally

From the repo root:

```bash
# Marketing site only
npm run website:preview

# Build full web app into website/app/ (run before deploy)
npm run website:build

# Then preview — marketing at / and app at /app/
npm run website:preview
```

- http://localhost:3000 — marketing site
- http://localhost:3000/app/ — full TrotroOS web app (installable PWA)

## Web app (PWA)

The marketing site and Expo web export deploy together:

| URL | Content |
| --- | --- |
| `/` | Marketing landing (static) |
| `/app/` | Full TrotroOS app in the browser |
| `/manifest.webmanifest` | Install-to-homescreen manifest |

Rebuild the app after code changes:

```bash
npm run website:build
```

Then commit `website/app/`, `website/icons/`, and `website/manifest.webmanifest` before pushing to the website repo.

## Deploy to trotroos.app

### Option A — Netlify

1. Create a site at [netlify.com](https://netlify.com)
2. Set **Publish directory** to `website`
3. Point DNS `trotroos.app` to Netlify

### Option B — Vercel

```bash
npx vercel website --prod
```

### Option C — GitHub Pages

1. Repo → Settings → Pages
2. Source: Deploy from branch, folder `/website`

### DNS

Add records at your domain registrar:

- `A` / `CNAME` for `@` and `www` → your host (Netlify/Vercel/Pages)

## App links

Update Play Store URL in `index.html` when the listing is live (set `data-web-app-url` on `<html>` for your hosted `dist` URL until then).

Trip share URLs from the app should point to:

- `https://trotroos.app/track.html?token=…` or
- Your Supabase `public-track` edge function URL (set `EXPO_PUBLIC_PUBLIC_TRACK_URL` in the app)

## Contact

trotroapp@gmail.com
