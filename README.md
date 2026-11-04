# SHIFT Beat website

Static, responsive product website for https://shift-beat.com, hosted with GitHub Pages.

## Preview

Run `python3 -m http.server 8080` and open http://localhost:8080.

## Payments

Pricing is EUR 35/month. `app.js` retains the original Supabase backend, publishable key, `create-checkout` endpoint, payment-return handling, and extends the request with billing details. The website uses the same backend and endpoints as requested. The actual checkout price is selected server-side by `STRIPE_PRICE_ID`; updating website copy does not update Stripe. The backend must use an inclusive EUR 35/month recurring Stripe Price and an inclusive Romanian VAT rate of 21%.

## Release download

The download button uses `https://github.com/davidparaschiv/shiftbeat-only-web/releases/latest/download/SHIFT.Beat.dmg`. Upload the installer as **SHIFT.Beat.dmg** on every release and publish it as the latest stable release. Create a release at https://github.com/davidparaschiv/shiftbeat-only-web/releases/new. See downloads/README.md.

## SEO

Server-rendered static HTML, page titles/descriptions, canonical URLs, Open Graph/Twitter sharing, SoftwareApplication structured data, robots.txt, sitemap.xml and llms.txt all describe SHIFT Beat. No existing crawler helper was found in the copied project. The canonical domain is shift-beat.com (CNAME).

## Deployment

Commit the site, configure the domain in GitHub Pages and DNS, then run `./deploy.sh`. Pages must serve `gh-pages` at its root. This task only edits local files; it does not deploy or change DNS.

## Billing form

The checkout request now sends `email` and `billing` (`first_name`, `last_name`, `address`, ISO `country`, Romanian `city_id` or external free-text `city`). The public backend catalogues are `get-countries` and `get-cities`. Deploy the matching backend migrations/functions and configure the EUR 35 inclusive price before publishing this form. The frontend does not set the billed amount or tax rate.
