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
5. Add the Google Search Console verification TXT record in GoDaddy DNS
   alongside the above (don't replace anything).
6. Env vars in Vercel: `NEXT_PUBLIC_GA_ID` (GA4), plus anything else
   added later (e.g. MailerLite key).

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
