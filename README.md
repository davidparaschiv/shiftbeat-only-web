# SHIFT Beat website

Static, responsive product website for https://shift-beat.com, hosted with GitHub Pages.

## Preview

Run `python3 -m http.server 8080` and open http://localhost:8080.

## Payments

Pricing is EUR 25/month. `app.js` retains the original Supabase backend, publishable key, `create-checkout` endpoint, payment-return handling, and extends the request with billing details. The website uses the same backend and endpoints as requested. The actual checkout price is selected server-side by `STRIPE_PRICE_ID`; updating website copy does not update Stripe. The backend uses a EUR 25/month recurring Stripe Price without Stripe tax rates. Romanian invoice VAT is split internally by the backend.

## Release download

The download button uses `https://github.com/davidparaschiv/shiftbeat-only-web/releases/latest/download/SHIFT.Beat.dmg`. Upload the installer as **SHIFT.Beat.dmg** on every release and publish it as the latest stable release. Create a release at https://github.com/davidparaschiv/shiftbeat-only-web/releases/new. See downloads/README.md.

## SEO

Server-rendered static HTML, page titles/descriptions, canonical URLs, Open Graph/Twitter sharing, SoftwareApplication structured data, robots.txt, sitemap.xml and llms.txt all describe SHIFT Beat. No existing crawler helper was found in the copied project. The canonical domain is shift-beat.com (CNAME).

The final public origin is **https://shift-beat.com**. HTTP and www variants redirect there through GitHub Pages, with HTTPS enforced. Home is canonical at `/`; Terms is canonical at `/terms.html`. Home links use `/` rather than the duplicate `/index.html` URL. `robots.txt` allows all public pages and rendering resources and declares the absolute sitemap URL. The XML sitemap uses the standard namespace and lists only those two existing indexable pages, with no anchors, external URLs, `lastmod`, `priority` or `changefreq`.

Run `python3 scripts/check_indexing.py` before publication. `deploy.sh` runs this check both on the source and the packaged site, and includes `robots.txt`, `sitemap.xml` and `CNAME` at the published root. Python 3 is required for these checks. After the GitHub Pages build completes, run `python3 scripts/check_indexing.py --live`: this checks GET and HEAD, exact release contents, HTTP 200, MIME types (`text/plain` for robots and `application/xml` for the sitemap), no blocking response headers, and HTTP/www redirects preserving page paths. Hosting response headers are controlled by GitHub Pages; no unsupported `_headers` or server configuration file is added.

Submit **https://shift-beat.com/sitemap.xml** in Google Search Console → the `shift-beat.com` property → Sitemaps. Submission remains pending: browser access timed out and authorized property access could not be verified. No Search Console submission or Google indexing result is claimed. These changes help discovery and indexing but do not guarantee indexing or ranking.

Official references: [Google robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Deployment

Commit the site, configure the domain in GitHub Pages and DNS, then run `./deploy.sh`. Pages must serve `gh-pages` at its root. The script publishes that branch; after the Pages build finishes, verify the release with `python3 scripts/check_indexing.py --live`.

## Billing form

The checkout request now sends `email` and `billing` (`first_name`, `last_name`, `address`, ISO `country`, Romanian `city_id` or external free-text `city`). The public backend catalogues are `get-countries` and `get-cities`. Deploy the matching backend migrations/functions and configure the EUR 25 monthly price before publishing this form. The frontend does not set the billed amount or tax rate.

The billing form follows the original 680px purchase panel and green CTA, with a single-column layout on mobile. It shows the EUR 25 monthly price without country-specific tax calculations. Local visual QA used display fixtures at desktop, 390px and 320px; it did not contact Supabase or verify catalog loading/live checkout.
