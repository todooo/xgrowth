// xrocket.lol — site config. Edit this file only; the pages read from it.
window.XG = {
  // Lemon Squeezy checkout links (merchant of record: they collect VAT, invoice and pay you out).
  // Dashboard → Products → create three subscription products in EUR (Starter 29, Coach 149, Personal 499, monthly)
  // → each product page has a "Share" checkout link like https://YOURSTORE.lemonsqueezy.com/buy/xxxxxxxx-....
  // In each product's settings set "Redirect URL" to https://xrocket.lol/success.html
  checkout: {
    starter:  "https://REPLACE.lemonsqueezy.com/buy/REPLACE_STARTER",
    coach:    "https://REPLACE.lemonsqueezy.com/buy/REPLACE_COACH",
    personal: "https://REPLACE.lemonsqueezy.com/buy/REPLACE_PERSONAL",
  },
  // Waitlist mode: tapping a plan asks for the X handle and saves it (no checkout). Set false once checkout links are live.
  waitlist: true,
  // Google Analytics 4 measurement ID (G-XXXXXXXXXX). Leave empty to disable.
  gaId: "G-0ZK4LD9N2E",
  // true = open checkout as an overlay on the page (needs lemon.js, already included); false = go to the checkout page
  overlay: true,
  // Where the members-only playbook lives after purchase (Notion, a gated page, etc.)
  membersUrl: "https://xrocket.lol/members",
  // Booking link for the 149 / 499 tiers (Cal.com, Calendly...)
  bookingUrl: "https://cal.com/REPLACE",
  contactEmail: "hello@xrocket.lol",
  xHandle: "chiefkittenme",
};
