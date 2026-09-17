# xrocket.lol

Static site: landing page with three subscription plans billed through Lemon Squeezy, a trend-data graph page, legal pages, and a post-checkout page.

## Files
- `index.html` — landing page (hero, how it works, data proof, pricing, FAQ, about)
- `graph.html` — the 448-post founder-intro trend chart (age × views, flags as marks)
- `success.html` — post-checkout page (Lemon Squeezy redirect URL target)
- `legal.html` — imprint, privacy, terms, refunds (fill in the bracketed parts)
- `config.js` — the only file you need to edit: Lemon Squeezy checkout links, members URL, booking URL, contact email
- `style.css` — shared styles

## Payments: Lemon Squeezy (merchant of record)
Lemon Squeezy sells the subscription as the seller of record, so it collects VAT in every country, invoices the customer, handles refunds/chargebacks and pays out monthly. Individuals can sign up (ID + bank account). Fee about 5% + 50c per transaction.

1. Sign up at lemonsqueezy.com, create a store, complete identity verification.
2. Products → New: three **subscription** products in EUR, monthly: Starter 29, Coach 149, Personal 499. In each product's settings set **Redirect URL** to `https://xrocket.lol/success.html`.
3. On each product click **Share** and copy the checkout link (`https://STORE.lemonsqueezy.com/buy/...`).
4. Paste the three links into `config.js` under `checkout`. `overlay: true` opens checkout in an overlay on the page (lemon.js is already loaded); set `false` to send people to the checkout page instead.
5. Settings → Customer portal: enable it so subscribers can cancel/switch plans themselves.
6. Deploy (`vercel deploy --prod`).

## Deploy
Production is **Vercel**, project `todooo1s-projects/xgrowth`, fed by `main` on github.com/todooo/xgrowth (connect the repo in the Vercel dashboard (Project → Settings → Git) so every push redeploys; until then deploy with the CLI). Manual deploy from this folder: `vercel deploy --prod`.

- Production URL: https://xrocket.lol
- Custom domain `xrocket.lol` is attached to the project. DNS at the registrar:

| type  | host | value |
|-------|------|-------|
| A     | @    | 76.76.21.21 |
| CNAME | www  | cname.vercel-dns.com. |

Or point the domain's nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` and let Vercel manage DNS. Vercel issues the HTTPS certificate automatically once DNS resolves. Check status: `vercel domains inspect xrocket.lol`.

GitHub Pages (https://todooo.github.io/xgrowth/) is also enabled on the repo as a backup; it has no custom domain.

## Local preview
`python3 -m http.server 8766` inside this folder, then open http://localhost:8766/.
