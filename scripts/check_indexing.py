#!/usr/bin/env python3
"""Validate static indexing files; --live also checks public GET/HEAD and redirects."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
import sys
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET

ORIGIN = 'https://shift-beat.com'
NS = '{http://www.sitemaps.org/schemas/sitemap/0.9}'


def require(condition, message):
    if not condition:
        raise ValueError(message)


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.canonicals = []
        self.noindex = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split():
            self.canonicals.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('name', '').lower() in ('robots', 'googlebot'):
            self.noindex |= any(value in attrs.get('content', '').lower()
                                for value in ('noindex', 'none'))


def check_files(root):
    require((root / 'CNAME').read_text().strip() == 'shift-beat.com', 'CNAME mismatch')
    robots = (root / 'robots.txt').read_text(encoding='utf-8')
    directives = []
    for line in robots.splitlines():
        line = line.split('#', 1)[0].strip()
        if line:
            require(':' in line, 'Invalid robots directive')
            name, value = line.split(':', 1)
            require(name.lower() in ('user-agent', 'allow', 'disallow', 'sitemap'),
                    f'Unsupported robots directive: {name}')
            directives.append((name.lower(), value.strip()))
    require(directives == [('user-agent', '*'), ('allow', '/'),
                           ('sitemap', ORIGIN + '/sitemap.xml')], 'Unexpected crawler rules')
    crawler = urllib.robotparser.RobotFileParser()
    crawler.parse(robots.splitlines())
    sitemap = ET.parse(root / 'sitemap.xml').getroot()
    require(sitemap.tag == NS + 'urlset', 'Wrong sitemap namespace/root')
    urls = []
    for entry in sitemap:
        require(entry.tag == NS + 'url' and len(entry) == 1 and entry[0].tag == NS + 'loc',
                'Sitemap must contain only url/loc; no invented dates or optional settings')
        urls.append(entry[0].text)
    expected = {}
    for source in sorted(root.glob('*.html')):
        page = Page(source.read_text(encoding='utf-8'))
        require(len(page.canonicals) == 1, f'{source.name}: expected one canonical')
        url = ORIGIN + ('/' if source.name == 'index.html' else '/' + source.name)
        require(page.canonicals == [url], f'{source.name}: canonical mismatch')
        if not page.noindex:
            expected[url] = source.name
    require(set(urls) == set(expected) and len(urls) == len(expected),
            'Sitemap must match all existing indexable pages, without duplicates')
    for path in ['/', '/terms.html', '/styles.css', '/terms.css', '/app.js',
                 '/favicon.png', '/assets/shiftbeat-icon.png', '/assets/social-card.png']:
        require(crawler.can_fetch('Googlebot', ORIGIN + path), f'Crawler blocked: {path}')
    print(f'PASS local: robots rules, XML namespace, {len(urls)} canonical pages, public resources.')
    return expected


def fetch(url, method):
    request = urllib.request.Request(url, method=method, headers={'User-Agent': 'SHIFTBeat-Indexing-Check/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.status, response.url, response.headers, response.read() if method == 'GET' else b''


def check_live(root, pages):
    files = {'/robots.txt': ('robots.txt', 'text/plain'),
             '/sitemap.xml': ('sitemap.xml', 'application/xml')}
    files.update({urllib.parse.urlsplit(url).path: (name, 'text/html')
                  for url, name in pages.items()})
    for path, (filename, mime) in files.items():
        for method in ('GET', 'HEAD'):
            status, final, headers, body = fetch(ORIGIN + path, method)
            require(status == 200 and final == ORIGIN + path, f'{method} {path}: status/URL mismatch')
            require(headers.get_content_type() == mime, f'{method} {path}: expected {mime}')
            require('noindex' not in headers.get('X-Robots-Tag', '').lower(), f'{path}: noindex header')
            if method == 'GET':
                require(body == (root / filename).read_bytes(), f'{path}: live differs from release')
            print(f'PASS live: {method} {path} 200 {mime}')
    for origin in ('http://shift-beat.com', 'http://www.shift-beat.com', 'https://www.shift-beat.com'):
        for path in ('/', '/terms.html'):
            for method in ('GET', 'HEAD'):
                status, final, _, _ = fetch(origin + path, method)
                require(status == 200 and final == ORIGIN + path,
                        f'{method} {origin + path}: redirect must preserve path and use canonical host')
        print(f'PASS live: GET/HEAD {origin} redirects home/terms to canonical HTTPS URLs.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--live', action='store_true')
    args = parser.parse_args()
    try:
        pages = check_files(args.root)
        if args.live:
            check_live(args.root, pages)
    except (OSError, ValueError, ET.ParseError) as error:
        print(f'FAIL indexing: {error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
