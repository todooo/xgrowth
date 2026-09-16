# xgrowth.lol

Static site: landing page with three Stripe-billed plans, a trend-data graph page, legal pages, and a post-checkout page.

## Files
- `index.html` — landing page (hero, how it works, data proof, pricing, FAQ, about)
- `graph.html` — the 448-post founder-intro trend chart (age × views, flags as marks)
- `success.html` — Stripe success URL target
- `legal.html` — imprint, privacy, terms, refunds (fill in the bracketed parts)
- `config.js` — the only file you need to edit: Stripe Payment Links, members URL, booking URL, contact email
- `style.css` — shared styles

## Stripe (EU company)
1. Stripe Dashboard → Products: create three recurring products in EUR: Starter 29, Coach 149, Personal 499 (monthly).
2. Payment Links → New, one per product. Turn on **Collect tax automatically** (needs Stripe Tax enabled once, handles EU VAT / OSS), collect billing address, allow cards + SEPA Direct Debit + iDEAL/Bancontact, and set **After payment → redirect to** `https://xgrowth.lol/success.html`.
3. Optional: enable the customer portal so people can cancel themselves from the receipt email link.
4. Paste the three link URLs into `config.js`. Commit and push; the site redeploys.

## Deploy
Two targets, both fed by `main`:
- **GitHub Pages** → configured with custom domain `xgrowth.lol` (the `CNAME` file). Live at https://todooo.github.io/xgrowth/ until DNS points at GitHub.
- **Vercel** (optional, same as princessbid): import the repo at vercel.com/new, framework "Other", no build settings. Add the domain under Project → Settings → Domains.

DNS at the registrar for GitHub Pages:

| type  | host | value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `todooo.github.io.` |

For Vercel instead: A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com.` (use the records the Vercel domain page prints).

After DNS resolves, in the repo Settings → Pages tick **Enforce HTTPS**.

## Local preview
`python3 -m http.server 8766` inside this folder, then open http://localhost:8766/.
