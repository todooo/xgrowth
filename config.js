// xgrowth.lol — site config. Edit this file only; the pages read from it.
window.XG = {
  // Stripe Payment Links. Create three subscription links in the Stripe dashboard
  // (Payments → Payment Links → New) and paste the URLs here.
  // Recommended settings for an EU company: currency EUR, "Collect tax automatically" ON
  // (Stripe Tax handles EU VAT / OSS), collect billing address, allow SEPA + cards + iDEAL,
  // and set the success URL to https://xgrowth.lol/success.html
  stripe: {
    starter:  "https://buy.stripe.com/REPLACE_STARTER",
    coach:    "https://buy.stripe.com/REPLACE_COACH",
    personal: "https://buy.stripe.com/REPLACE_PERSONAL",
  },
  // Where the members-only instructions live after purchase (Notion, a gated page, etc.)
  membersUrl: "https://xgrowth.lol/members",
  // Booking link for the 149 / 499 tiers (Cal.com, Calendly...)
  bookingUrl: "https://cal.com/REPLACE",
  contactEmail: "hello@xgrowth.lol",
  xHandle: "chiefkittenme",
};
