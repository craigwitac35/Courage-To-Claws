# Courage To Claws — Website

Veteran-owned general contractor site. React + Vite + TypeScript, Supabase backend.

## Run locally

```bash
npm install
cp .env.example .env     # add your Supabase URL + anon key
npm run dev
```

Without a `.env` the site still runs: the gallery shows placeholder projects and the quote form logs submissions to the console instead of sending them.

## Deploy (Vercel)

Import the repo, framework preset **Vite**, add the two `VITE_*` env vars. Add a rewrite so client-side routes work: `vercel.json` is already included.

## Where things live

| What | Where |
|---|---|
| Phone, email, headline, values, "why us" copy | `src/data/company.ts` |
| Service list and descriptions | `src/data/services.ts` |
| Quote form project types, timelines, contact methods, steps | `src/data/projectTypes.ts` |
| Gallery categories + placeholder projects | `src/data/galleryCategories.ts` |
| All styles and design tokens | `src/styles/global.css` |
| Pages | `src/pages/` |
| Components | `src/components/` |
| Supabase schema, RLS, buckets | `supabase/migrations/001_init.sql` |
| Lead email notification | `supabase/functions/notify-quote/index.ts` |

## Supabase setup (one time)

1. Create a project. Run `supabase/migrations/001_init.sql` in the SQL editor.
2. Copy the project URL and anon key into `.env` (and Vercel env vars).
3. Deploy the edge function: `supabase functions deploy notify-quote --no-verify-jwt`
4. Set function secrets: `RESEND_API_KEY`, `NOTIFY_TO` (Troy's email), `NOTIFY_FROM` (a verified Resend sender).
5. Database > Webhooks > create one on `quote_requests`, event INSERT, target the `notify-quote` edge function.

## Adding gallery photos (launch workflow)

1. Storage > `gallery` bucket > upload the photo(s). Copy the public URL.
2. Table editor > `gallery_items` > insert row: `title`, `category` (decks / roofs / additions / remodels), `image_urls` (array of the URLs), optional `description`, `featured` true/false.
3. The homepage shows featured items (newest first, up to 6). The Our Work page shows everything.

## Swapping in real photos

- Hero: put `hero.jpg` and `hero-mobile.jpg` in `public/` and set `HERO_IMAGE = true` in `src/components/Hero.tsx`.
- Everywhere else uses the `<Placeholder>` component. Replace with `<img src=... alt=...>` where real photos exist.
- Logo: replace the SVG in `src/components/Logo.tsx` with an `<img>`.

## Before launch checklist

- [ ] Confirm the real business email (`src/data/company.ts`)
- [ ] Confirm service area wording (`company.serviceAreaPlaceholder`)
- [ ] Troy approves About and Why Us copy
- [ ] Real hero photo + mobile crop
- [ ] Real logo file
- [ ] `public/og-image.jpg` for link previews
- [ ] Add LocalBusiness structured data once address/service area are confirmed

## Phase 2 (not built)

- Password-protected `/admin` route (Supabase Auth) for uploading gallery photos from a phone.
- SMS notification via Twilio on the same webhook.
