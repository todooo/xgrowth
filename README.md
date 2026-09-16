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
Production is **Vercel**, project `todooo1s-projects/xgrowth`, fed by `main` on github.com/todooo/xgrowth (connect the repo in the Vercel dashboard (Project → Settings → Git) so every push redeploys; until then deploy with the CLI). Manual deploy from this folder: `vercel deploy --prod`.

- Production URL: https://xgrowth-nine.vercel.app
- Custom domain `xgrowth.lol` is attached to the project. DNS at the registrar:

| type  | host | value |
|-------|------|-------|
| A     | @    | 76.76.21.21 |
| CNAME | www  | cname.vercel-dns.com. |

Or point the domain's nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` and let Vercel manage DNS. Vercel issues the HTTPS certificate automatically once DNS resolves. Check status: `vercel domains inspect xgrowth.lol`.

GitHub Pages (https://todooo.github.io/xgrowth/) is also enabled on the repo as a backup; it has no custom domain.

## Local preview
`python3 -m http.server 8766` inside this folder, then open http://localhost:8766/.
