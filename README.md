# ProteinTracker.com.au

SEO acquisition site for HitProtein. Static Next.js site — no backend, no
database. Content ships as static/TS data files, fact-checked against
Australian government nutrition sources (FSANZ AUSNUT/NUTTAB, Eat for
Health, NHMRC) before publishing.

## Setup

1. `npm install`
2. `npm run dev` → http://localhost:3000

## Deploying

1. Push this repo to a **new** GitHub repo (`proteintracker-web`) — kept
   separate from the HitProtein app and hitprotein.com.au repos.
2. In Vercel: New Project → import the repo.
3. Vercel → Project → Settings → Domains → add `proteintracker.com.au`
   and `www.proteintracker.com.au`. Vercel will show the required
   A / CNAME records.
4. In GoDaddy → DNS management for proteintracker.com.au → update the
   A record (`@`) and CNAME (`www`) to the values Vercel gave you.
   Do not change nameservers — just the records.
5. Set up Google Analytics 4 and Search Console (see below).

## Google Analytics & Search Console

**GA4:**
1. Create a GA4 property at analytics.google.com for proteintracker.com.au.
2. Copy its Measurement ID (looks like `G-XXXXXXXXXX`).
3. In Vercel → Project → Settings → Environment Variables, add
   `NEXT_PUBLIC_GA_ID` = that value, for Production.
4. Redeploy. `components/GoogleAnalytics.tsx` picks it up automatically —
   no code change needed. Until this env var is set, the component
   renders nothing (safe to ship without it).

**Search Console:**
1. Add proteintracker.com.au as a property at
   search.google.com/search-console — choose the "HTML tag" verification
   method (simpler than DNS TXT once the site's already live).
2. It gives you a `content="..."` value. In Vercel, add
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = that value, for Production.
3. Redeploy, then click Verify in Search Console.
4. Once verified, submit the sitemap: Search Console → Sitemaps →
   enter `sitemap.xml` → Submit. (The site generates this automatically
   at /sitemap.xml — see app/sitemap.ts.)

## Technical SEO already wired up

- `/sitemap.xml` — auto-generated from `app/sitemap.ts`. **Add any new
  page's route to that file the same day it ships**, or it won't be
  discovered via the sitemap.
- `/robots.txt` — auto-generated from `app/robots.ts`, allows all
  crawlers and points to the sitemap.
- Every page sets its own canonical URL via `alternates.canonical`.
- Sitewide WebSite + Organization JSON-LD is in `app/layout.tsx`.
  Page-specific FAQPage/Recipe schema lives on the pages that use it.

## Content workflow

For every food/meal/guide page:
1. AI drafts the page against the SEO brief (structure, FAQs, internal
   links).
2. MJ fact-checks every numeric claim against AUSNUT/NUTTAB or the
   cited source before merge.
3. Note the source under each data table/footnote.

## Calculator

`lib/protein-calculator.ts` is the single source of truth for protein
math — it must mirror the app's `calculate_protein_target()` exactly.
Every calculator page variant (weight-loss, muscle-gain, women, men,
over-50) imports this one function; only page copy and defaults differ.
