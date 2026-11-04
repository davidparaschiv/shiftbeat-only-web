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

