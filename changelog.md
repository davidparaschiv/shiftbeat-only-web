## 2026-11-27

- Updated Bombu compatibility from macOS 26+ to macOS 15+ on the product page, Terms, search/social metadata, structured data and crawler information. Text-only change; screenshot and styling preserved. Validation: indexing and whitespace checks. No integration tests run.

## 2026-11-26

- Deployment follow-up: the owner explicitly authorized pushing the Bombu frontend, then backend, running the existing backend sync script, and finally publishing the website with ./deploy.sh. Integration tests remain excluded from this follow-up.

- Simplified the separate Bombu page `/product-bombu/` to email plus the existing monthly/yearly switch. Removed name/address/country/city fields and catalog requests; Stripe Checkout collects billing details. Added a short Stripe collection note and versioned the Bombu app script to avoid stale form code. Existing prices, discount, screenshot, subscription messages and management/download links are preserved. Root SHIFT Beat changes in other entries are separate work.
- Bombu verification: JavaScript syntax and source/whitespace review only; no integration suite or provider requests. Matching Bombu backend migration/functions must be deployed before publication. No commit, push or deployment performed for this change.

- Simplified only the root SHIFT Beat subscription form to email; monthly/yearly switch, prices, centered panel, subscription messages and management/download links are preserved. Stripe collects full name, address, country and city. Removed form catalog loading and billing fields; checkout sends email/plan only, while controls stay locked during the request. Updated Terms and versioned app.js.
- Local Chrome/WebKit checks passed at 320/390/1440px for email validation, yearly payload, disabled controls, error recovery and no overflow. Indexing, JavaScript syntax and whitespace checks passed. No country/city-loading tests added, no provider requests or hosted integration suite run. The owner authorized publication after successful SHIFT Beat backend sync; hosted integration tests remain unrun. Separate pending product-bombu edits are preserved locally and excluded from this publication.

## 2026-11-23

- Centered the SHIFT Beat Download section from its heading through the download button, including the plan switch, pricing, billing panel and subscription-management row. Kept form and download-button contents aligned as before; no Bombu or backend changes.
- Validation: Chrome/WebKit at 320/390/1440px confirmed centered direct elements, preserved internal alignment and no horizontal overflow. Indexing and whitespace checks passed.

## 2026-11-19

- Removed the requested compatibility/internet note beneath Bombu pricing on `/product-bombu/`. Validation: indexing and whitespace checks passed.

- Added SHIFT Beat monthly/yearly selection using the Bombu toggle pattern in SHIFT Beat colors: €25/month by default, €200/year with a small gray 33% off badge. Checkout sends only the plan and locks the switch while opening. Updated Terms and crawler pricing information. Yearly checkout also requires the backend to confirm the yearly plan, preventing an older monthly-only deployment from opening a monthly checkout for a yearly selection. Bombu files unchanged.
- Validation: JavaScript syntax, indexing and whitespace checks passed; local browser checks at 1440px, 390px and 320px confirmed default/changed pricing, badge visibility, no horizontal overflow, selected plan payload and disabled switch during checkout. Browser requests used local display fixtures and did not contact Supabase.

## 2026-11-19

- Added the Bombu product page's simple Pay monthly / Pay yearly switch, defaulting to EUR 25/month with EUR 200/year as the alternative. The price and subscribe label follow the selection, and checkout sends only the plan name to the backend. Yearly displays a small “33% off” badge immediately to the right of its price, with a 50%-opacity gray background and light gray text. Updated Bombu Terms and structured offers; app screenshot and root SHIFT Beat product are unchanged.
- Validation: JavaScript syntax, indexing for all four pages, structured JSON and whitespace passed. An isolated offline pricing fixture passed 27 checks at 320/390/1440px, including toggle state, selected checkout plan, badge position/colors and no horizontal overflow; inspected mobile/desktop renders. No country/city loading test or hosted payment was performed. The owner explicitly authorized website publication before the backend because the app is not live yet; matching backend setup is documented in the backend YEARLY-BILLING.md. Native app packaging is unaffected.

## 2026-11-17

- Updated the copied Bombu page download URL in browser configuration and HTML fallback to the Bombu.dmg asset in the latest shiftbeat-only-web GitHub release.
- Validation: JavaScript syntax, both download references, indexing checks and whitespace checks passed.

## 2026-11-16

- Added the same already-active handling to the independent Bombu product page at `/product-bombu/`, showing the exact agreed message in its existing green purchase-status area beside Manage subscription. No root-page code or styles changed by this update.

- Show the agreed existing-subscription message for `?payment=already-active`, using the same purchase status area and success styling as payment confirmation. Existing Manage subscription link is retained.
- Validation: JavaScript syntax, payment-result display checks and indexing validation passed.

## 2026-11-15

- Styled the Bombu cross-promotion as a compact navy card with scoped blue/violet accents, app icon, decorative waveform and circular arrow; retained requested copy and product route. Mobile layout hides the waveform and wraps the description. Rendered and inspected the isolated section using cached headless Chromium at desktop/390px/320px, with no horizontal overflow and card heights 86–105px. Corrected the temporary preview harness charset/font-import removal before final renders; no preview-only changes shipped. Indexing and whitespace checks passed. No backend calls, push or deployment.

- Changed the “Check also: Bombu.” card description to the owner’s wording: “Our DJ Pioneer DDJ FLX4 soft”. Layout, link, copied product and backend unchanged. Whitespace check passed; no deployment.

- Added an isolated Bombu public-site snapshot at product-bombu/ and a responsive “Check also: Bombu” homepage section. Preserved Bombu branding, separate Terms/styles/scripts, public Supabase configuration, Stripe portal and installer URL. Original Bombu project public-file hashes verified unchanged.
- Adapted copied canonical/social/structured URLs and Terms home links to the nested route; extended root sitemap/crawler information and indexing validation to four pages. Publishing now archives committed public paths, including the copied product, rather than recursively copying the working directory.
- Local references, structured JSON, JavaScript/shell syntax, indexing, whitespace and static GET/HEAD checks passed; /product-bombu redirects to /product-bombu/ in the local static server. First HTTP smoke check closed a large response unread and produced a local BrokenPipeError; repeated check consumes responses. Owner confirmed they will handle Bombu backend origin permission separately; frontend checkout remains connected to Bombu, with existing bombu.net Stripe return URLs until the owner changes the backend. No backend changes, Supabase requests, checkout transactions, push or deployment performed.

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

