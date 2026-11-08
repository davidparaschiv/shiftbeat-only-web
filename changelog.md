## 2026-11-08

- Expanded the supported audio input list to MP3, AIF/AIFF, FLAC, WAV, and AAC in the visible feature list, SoftwareApplication structured data and llms.txt. Export formats, layout and styles are unchanged.
- Checks: local indexing validation, structured-data JSON parsing, input-list consistency and whitespace checks passed. Reviewed native Scripts/build.py and Package.swift packaging dependencies: no app/DMG changes required.

## 2026-11-06

- Audited GitHub Pages domain/HTTPS: HTTP and www variants redirect to https://shift-beat.com; Pages serves gh-pages at the root. Preserved the existing permissive robots.txt and per-page canonicals; formatted the two-page standard XML sitemap without invented dates or optional settings. Terms home links now use the canonical root URL. No design or visible copy changes.
- Added an indexing validator for robots rules, sitemap/page/canonical consistency and optional live GET/HEAD checks, MIME types, release contents and path-preserving redirects. Deployment validates both source and packaged indexing files and includes them at the published root.
- Documented Google guidance, verification commands and pending Search Console submission: browser access timed out, so authorized property access could not be confirmed. Native Scripts/build.py and Package.swift packaging reviewed: no app/DMG updates required.
- Verification: source and deployment-package indexing checks, shell syntax and whitespace checks passed. After Pages publication, live GET/HEAD passed for both pages, robots.txt (200 text/plain) and sitemap.xml (200 application/xml), matching release bytes; HTTP/www redirects preserve both home and Terms paths. The first live check saw the prior sitemap while the Pages build was still running; the final check passed after publication. No Search Console submission was performed.

## 2026-11-04

- Corrected setup documentation: Stripe charges EUR 25 without Tax Rate IDs; fiscal Romanian VAT is calculated by the backend. No website UI or payment endpoint changed. Documentation/whitespace checks passed; native packaging needs no update.

- Restyled billing to match the original purchase panel: shared 680px width, quiet charcoal fields, aligned labels and the original solid green subscribe button. Removed the extra price summary, decorative heading and Romanian VAT breakdown from the form.
- Verified the form visually at desktop, 390px and 320px widths using local display fixtures only: single-column mobile layout, aligned fields, no horizontal overflow, Romanian city select/external city text field. No Supabase request or catalog-loading test was run. JavaScript syntax, HTML label/ID and whitespace checks passed. Native build/packaging review: no updates required.

- Corrected the final requested price from EUR 35 to EUR 25 across the billing form, Romanian VAT breakdown (20.66 + 4.34), SEO, crawler summary, Terms and documentation. Checks: JavaScript syntax, pricing consistency and whitespace checks passed; no deployment or live payment test. Reviewed native build/packaging: no changes needed.

- Added an aligned billing form in the existing dark cyan/green style, with two desktop columns and a single-column mobile layout. Collects first/last name, email, address and country; Romania uses a city dropdown, other countries use free-text city.
- Connected the public country/city catalogs with loading/error feedback and retry, and extended the existing checkout request with billing details. No catalog rate limiting or loading tests were added.
- Updated pricing, structured SEO data, crawler summary, documentation and Terms to EUR 35 final per month: Romanian 21% VAT included (28.93 + 6.07); no VAT for other countries. The existing subscription management link remains.
- Checks: JavaScript syntax and whitespace checks passed; local form label/ID, asset and structured-data checks passed. Browser/mobile visual verification and live checkout remain unverified; nothing was deployed. The matching backend must be configured/deployed by the owner before publishing this form.
- Reviewed the native app Scripts/build.py and packaging dependencies; no app/DMG build changes are needed.

## 2026-10-30

- Corrected subscription pricing to EUR 25/month in the website, checkout button, structured SEO data, crawler summary, documentation and Terms of Service. Stripe configuration is managed separately through the backend STRIPE_PRICE_ID secret.

## 2026-10-28

- Updated subscription pricing to EUR 50/month in the website, checkout button, structured SEO data, crawler summary, documentation and Terms of Service.
- Reviewed the deployed checkout source without changing it: the billed amount is controlled by the backend STRIPE_PRICE_ID. Remote Stripe configuration was not changed; checkout still requires separate backend configuration.
- Checks: parsed structured pricing data; verified displayed prices and Terms, checked local HTML references, and ran git diff --check. No live payment or browser visual test was run.
- Reviewed the native app Scripts/build.py and packaging dependencies; website pricing changes need no app/DMG build updates.

