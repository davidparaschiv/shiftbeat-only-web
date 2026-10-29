## 2026-10-29

- Website checks passed: HTML references and unique IDs, section anchors, one H1, structured JSON data, CSS brace balance and no embedded video. Browser visual verification remains pending because browser access is disabled.

- Added three-mode explanations for Build (Drop Beat), Release Tension and Maintain, plus the playlist-building workflow; updated feature copy and crawler/structured data to match current app behavior.
- Kept destination import/setup instructions out of the marketing page. Reviewed app build/packaging again; these static website changes require no build updates.

- Replaced the opening hero headline with the requested mathematical-equations message, highlighting OFFLINE Library with the app's cyan-to-green gradient and responsive typography.
- Checks passed: exact headline text, a single H1, internal anchors and local asset references, CSS brace balance, and git diff --check. Browser visual verification was not run.
- Reviewed Scripts/build.py and packaging dependencies: this static website copy/style change requires no app or DMG build changes.

## 2026-10-28

- Updated subscription pricing to EUR 50/month in the website, checkout button, structured SEO data, crawler summary, documentation and Terms of Service.
- Reviewed the deployed checkout source without changing it: the billed amount is controlled by the backend STRIPE_PRICE_ID. Remote Stripe configuration was not changed; checkout still requires separate backend configuration.
- Checks: parsed structured pricing data; verified displayed prices and Terms, checked local HTML references, and ran git diff --check. No live payment or browser visual test was run.
- Reviewed the native app Scripts/build.py and packaging dependencies; website pricing changes need no app/DMG build updates.

