## 2026-11-04

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

