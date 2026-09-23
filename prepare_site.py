"""Create the public artifact with absolute social-preview metadata."""
from html import escape
from pathlib import Path
from urllib.parse import urlparse
import os
import shutil
import json

root = Path(__file__).resolve().parent
review = root / 'media-review.json'
if review.exists() and json.loads(review.read_text()).get('status') != 'approved_for_publication':
    raise SystemExit('Public build paused: this local review contains original company media. Prepare public-use assets and resolve media-review.json before publishing.')
site_url = os.environ.get('SITE_URL', '').strip().rstrip('/') + '/'
parsed = urlparse(site_url)
if parsed.scheme != 'https' or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit('SITE_URL must be the final HTTPS website address.')

public = root / '_site'
if public.exists():
    shutil.rmtree(public)
public.mkdir()
for name in ('index.html', 'trade.html', 'compliance.html'):
    source = (root / name).read_text()
    page_url = site_url if name == 'index.html' else site_url + name
    url = escape(page_url, quote=True)
    image = escape(site_url + 'social-preview.png', quote=True)
    source = source.replace('content="./social-preview.png"', f'content="{image}"')
    source = source.replace('</head>', '\n'.join([
        f'<link rel="canonical" href="{url}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta name="twitter:image" content="{image}">',
        '</head>',
    ]))
    (public / name).write_text(source)
for name in ('social-preview.png', 'warehouse.html', 'warehouse.js', 'dashboard.html', 'dashboard.css', 'dashboard.js', 'story.css', 'story.js', 'stories.js', 'exhibits.js', 'refinements.js', 'editorial.js', 'editorial.css', 'evidence.js', 'evidence.css', 'demo-languages.js'):
    shutil.copy2(root / name, public / name)
# Explicit allowlist: never copy original uploads or private source media.

(public / '.nojekyll').touch()
print('Prepared both case pages, shared styles, media and absolute HTTPS metadata.')
