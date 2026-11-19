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

The final public origin is **https://shift-beat.com**. HTTP and www variants redirect there through GitHub Pages, with HTTPS enforced. Home is canonical at `/`; Terms is canonical at `/terms.html`. Home links use `/` rather than the duplicate `/index.html` URL. `robots.txt` allows all public pages and rendering resources and declares the absolute sitemap URL. The XML sitemap uses the standard namespace and lists the four existing indexable pages (SHIFT Beat home/Terms and Bombu home/Terms), with no anchors, external URLs, `lastmod`, `priority` or `changefreq`.

Run `python3 scripts/check_indexing.py` before publication. `deploy.sh` runs this check both on the source and the packaged site, and includes `robots.txt`, `sitemap.xml` and `CNAME` at the published root. Python 3 is required for these checks. After the GitHub Pages build completes, run `python3 scripts/check_indexing.py --live`: this checks GET and HEAD, exact release contents, HTTP 200, MIME types (`text/plain` for robots and `application/xml` for the sitemap), no blocking response headers, and HTTP/www redirects preserving page paths. Hosting response headers are controlled by GitHub Pages; no unsupported `_headers` or server configuration file is added.

Submit **https://shift-beat.com/sitemap.xml** in Google Search Console → the `shift-beat.com` property → Sitemaps. Submission remains pending: browser access timed out and authorized property access could not be verified. No Search Console submission or Google indexing result is claimed. These changes help discovery and indexing but do not guarantee indexing or ranking.

Official references: [Google robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Deployment

Commit the site, configure the domain in GitHub Pages and DNS, then run `./deploy.sh`. Pages must serve `gh-pages` at its root. The script publishes that branch; after the Pages build finishes, verify the release with `python3 scripts/check_indexing.py --live`.

## Billing form

The checkout request now sends `email` and `billing` (`first_name`, `last_name`, `address`, ISO `country`, Romanian `city_id` or external free-text `city`). The public backend catalogues are `get-countries` and `get-cities`. Deploy the matching backend migrations/functions and configure the EUR 25 monthly price before publishing this form. The frontend does not set the billed amount or tax rate.

The billing form follows the original 680px purchase panel and green CTA, with a single-column layout on mobile. It shows the EUR 25 monthly price without country-specific tax calculations. Local visual QA used display fixtures at desktop, 390px and 320px; it did not contact Supabase or verify catalog loading/live checkout.

## Bombu product page

Bombu pricing is €25/month or €200/year. Its purchase toggle defaults to monthly and sends only `plan: "monthly"` or `"yearly"`; amounts and Stripe Price IDs are selected by the backend. Yearly shows a small “33% off” badge beside the price (rounded savings compared with 12 monthly payments). The badge uses a 50%-opacity gray background with light gray text. Bombu's Terms and structured offers include both plans. Deploy the matching Bombu yearly-billing migration/functions and configure `STRIPE_YEARLY_PRICE_ID` / `MOCK_STRIPE_YEARLY_PRICE_ID` before publishing. These changes apply only to `/product-bombu/`; SHIFT Beat's root pricing is unchanged.

`product-bombu/` is an independent snapshot of the public files from `/Users/davidparaschiv/Local Projects/bombu-only-web`. The original checkout and repository are unchanged; future Bombu website edits do not automatically update this copy. SHIFT Beat links to it under “Check also: Bombu”. GitHub Pages serves `/product-bombu` with a trailing-slash redirect to `/product-bombu/`, with Bombu Terms at `/product-bombu/terms.html`. Relative assets, Terms home navigation and copied metadata use the nested route.

Bombu retains its own stylesheet, scripts, public Supabase project configuration, Stripe portal and release download. SHIFT Beat’s existing checkout and Terms remain unchanged. The copied pages have their own canonicals and are included in the root sitemap. No nested CNAME, Git repository, backend source or local secrets were copied. The standalone bombu.net site remains unchanged.

**Backend setup handled by owner:** The owner will separately allow https://shift-beat.com in Bombu’s backend. Until deployed, the copied billing/checkout flow may be blocked by origin checks. The copied page continues calling Bombu’s existing Supabase checkout endpoint; no checkout redirect to the standalone site was substituted. Bombu’s current backend Stripe success/cancel URLs still point to bombu.net; update them separately if payment returns should land on /product-bombu/. No backend file was changed.

Publishing exports committed public files only, including `product-bombu/`; source and packaged indexing checks cover all four pages. No automatic publication or backend deployment is performed by preparing these files.
