# SHIFT Beat website

Static, responsive product website for https://shift-beat.com, hosted with GitHub Pages.

## Preview

Run `python3 -m http.server 8080` and open http://localhost:8080.

## Payments

Pricing remains EUR 25/month. `app.js` retains the original Supabase backend, publishable key, `create-checkout` endpoint, email request body and payment-return handling. The website uses the same backend and endpoints as requested.

## Release download

The download button uses `https://github.com/davidparaschiv/shiftbeat-only-web/releases/latest/download/SHIFT-Beat.dmg`. Upload the installer as **SHIFT-Beat.dmg** on every release and publish it as the latest stable release. Create a release at https://github.com/davidparaschiv/shiftbeat-only-web/releases/new. See downloads/README.md.

## SEO

Server-rendered static HTML, page titles/descriptions, canonical URLs, Open Graph/Twitter sharing, SoftwareApplication structured data, robots.txt, sitemap.xml and llms.txt all describe SHIFT Beat. No existing crawler helper was found in the copied project. The canonical domain is shift-beat.com (CNAME).

## Deployment

Commit the site, configure the domain in GitHub Pages and DNS, then run `./deploy.sh`. Pages must serve `gh-pages` at its root. This task only edits local files; it does not deploy or change DNS.
