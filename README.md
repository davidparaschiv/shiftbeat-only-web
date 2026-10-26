# SHIFT Beat website

Static, responsive product website for https://shift-beat.com, hosted with GitHub Pages.

## Preview

Run `python3 -m http.server 8080` and open http://localhost:8080.

## Payments

Pricing remains EUR 25/month. `app.js` retains the original Supabase backend, publishable key, `create-checkout` endpoint, email request body and payment-return handling. The website uses the same backend and endpoints as requested.

## Release download

The final GitHub release URL has not been supplied. The download section explicitly says the link is coming soon. Once ready, replace `.release-pending` in `index.html` with a link to the published asset. Do not point visitors to the previous app's installer. See downloads/README.md.

## SEO

Server-rendered static HTML, page titles/descriptions, canonical URLs, Open Graph/Twitter sharing, SoftwareApplication structured data, robots.txt, sitemap.xml and llms.txt all describe SHIFT Beat. No existing crawler helper was found in the copied project. The canonical domain is shift-beat.com (CNAME).

## Deployment

Commit the site, configure the domain in GitHub Pages and DNS, then run `./deploy.sh`. Pages must serve `gh-pages` at its root. This task only edits local files; it does not deploy or change DNS.
