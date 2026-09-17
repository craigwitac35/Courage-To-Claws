# Courage To Claws — Website

Veteran-owned general contractor site. React + Vite + TypeScript, Supabase backend, private admin dashboard.

## Run locally

```bash
npm install
cp .env.example .env     # add your Supabase URL + anon key
npm run dev
```

Without a `.env` the site still runs in dev with placeholder gallery data and console-logged form submissions. **In a production build with no env vars, the quote form shows an error instead of a fake success.** Set the env vars in Vercel before launch.

## Deploy (Vercel)

Import the repo, framework preset **Vite**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. `vercel.json` handles client-side routing.

## Where things live

| What | Where |
|---|---|
| Phone, email, headline, values, "why us" copy | `src/data/company.ts` |
| Service list and descriptions | `src/data/services.ts` |
| Quote form project types, timelines, contact methods, steps | `src/data/projectTypes.ts` |
| Gallery categories + placeholder projects | `src/data/galleryCategories.ts` |
| All styles and design tokens | `src/styles/global.css` |
| Pages (incl. `NotFound`, `Admin`) | `src/pages/` |
| Public components | `src/components/` |
| Admin components | `src/components/admin/` |
| Supabase schema, RLS, buckets | `supabase/migrations/001_init.sql`, `002_admin_and_hardening.sql`, `003_drop_timeline.sql` |
| Lead email notification | `supabase/functions/notify-quote/index.ts` |
| Images (hero, logo, favicon, share image) | `public/` |

## Supabase setup

1. Create a project. In the SQL editor run `001_init.sql`, `002_admin_and_hardening.sql`, then `003_drop_timeline.sql`, in that order.
2. Copy the project URL + anon key into `.env` and Vercel env vars.
3. **Auth:** Authentication → Providers → Email → turn **off** "Enable email signups". Then Authentication → Users → **Invite user** for Troy's email (and yours). Only invited addresses can sign in to `/admin`.
   Authentication → URL Configuration → add the site URL (`https://courage-to-claws.vercel.app`) and `https://courage-to-claws.vercel.app/admin` to redirect URLs.
4. **Edge function:** `supabase functions deploy notify-quote --no-verify-jwt`
   Secrets: `RESEND_API_KEY`, `NOTIFY_TO` (Troy's email), `NOTIFY_FROM` (verified Resend sender), `WEBHOOK_SECRET` (any long random string).
5. **Webhook:** Database → Webhooks → new, table `quote_requests`, event INSERT, type Edge Function → `notify-quote`. Add HTTP header `x-webhook-secret` = the same `WEBHOOK_SECRET` value.

## Admin dashboard (`/admin`)

Not linked anywhere; share the URL with Troy directly. Sign in = email a magic link, tap it, done.

**Photos tab**
- Add project → pick category → add photos from camera roll (any number) → title → optional description → Feature on homepage → **Save as draft** or **Publish**.
- Photos are resized to 1600px JPEG in the browser before upload (keeps the free storage tier sustainable, fixes sideways/HEIC photos).
- First photo = cover. Reorder with the arrows on Edit.
- **Description matters:** on the public gallery, a project with a description becomes a tap-to-flip card (photo on the front, description on the back). No description = plain photo, no flip.
- Drafts are invisible to the public. Publish/Unpublish is one tap.
- Delete removes the row and the photos from storage.

**Project requests tab**
- Every quote-form lead, newest first, with all fields. Photos open via signed links (1 hour).
- Status chips: New / Contacted / Closed. Filter by status at the top.

## Spam protection on the quote form

- Honeypot field (hidden; bots fill it, people can't).
- Minimum fill time (4 s).
- Database trigger: max 5 submissions per hour per email or phone.
- Webhook secret so nobody can trigger the notification email directly.

## Before launch checklist

- [ ] Confirm the real business email (`src/data/company.ts`) — current value is a malformed placeholder
- [ ] Confirm service area wording (`company.serviceAreaPlaceholder`) → then add LocalBusiness JSON-LD and geo terms to titles
- [ ] Troy approves About and Why Us copy
- [ ] Replace remaining `<Placeholder>` photos (About crew photo, Services cards, gallery) with real photos
- [ ] Custom domain: update `canonical`, `og:url`, `og:image`, `twitter:image`, Plausible `data-domain` in `index.html`, and `public/robots.txt` + `public/sitemap.xml`
- [ ] Register the domain in Plausible (or swap the script for GA4)

## Not built (by decision)

Employee hour tracking, SMS notifications, pricing estimator, email-to-upload.
