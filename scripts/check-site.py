"""Dependency-free checks for broken local links, metadata and JSON-LD."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://violinplayer.pro"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.links = []
        self.h1s = 0
        self.canonical = None
        self.description = None
        self.schema = []
        self.json_text = None
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if "id" in a:
            assert a["id"] not in self.ids, f"Duplicate ID: {self.path.name} {a['id']}"
            self.ids.add(a["id"])
        self.h1s += tag == "h1"
        if tag == "link" and a.get("rel") == "canonical":
            assert self.canonical is None, f"Duplicate canonical: {self.path.name}"
            self.canonical = a["href"]
        if tag == "meta" and a.get("name") == "description":
            self.description = a.get("content")
        if tag == "img":
            assert a.get("alt"), f"Missing image alt: {self.path.name}"
        for key in ("href", "src", "poster"):
            if key in a:
                self.links.append(a[key])
        if "srcset" in a:
            self.links.extend(item.strip().split()[0] for item in a["srcset"].split(","))
        if tag == "script" and a.get("type") == "application/ld+json":
            self.json_text = ""

    def handle_data(self, data):
        if self.json_text is not None:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == "script" and self.json_text is not None:
            self.schema.append(json.loads(self.json_text))
            self.json_text = None


def local_path(url):
    path = unquote(urlsplit(url).path).lstrip("/")
    if not path:
        return ROOT / "index.html"
    target = ROOT / path
    if not target.suffix:
        target = target.with_suffix(".html")
    return target


pages = {path: Page(path) for path in ROOT.glob("*.html")}
for path, page in pages.items():
    assert page.h1s == 1, f"Expected one H1: {path.name}"
    assert page.description, f"Missing description: {path.name}"
    assert page.canonical, f"Missing canonical: {path.name}"
    if path.name != "404.html":
        expected = ORIGIN + ("/" if path.stem == "index" else "/" + path.stem)
        assert page.canonical == expected, f"Canonical mismatch: {path.name}"
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = path if not url.path else local_path(link)
        assert target.is_file(), f"Missing target: {path.name} -> {link}"
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f"Missing fragment: {path.name} -> {link}"
    for schema in page.schema:
        for offer in schema.get("makesOffer", schema.get("offers", [])):
            spec = offer["priceSpecification"]
            assert spec["minPrice"] in (100, 150) and spec["priceCurrency"] == "GBP"
            assert "price" not in offer, "Starting prices must not be described as fixed quotes"

sitemap = ET.parse(ROOT / "sitemap.xml")
for loc in sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
    assert pages[local_path(loc.text)].canonical == loc.text
print(f"PASS: {len(pages)} pages; local links, fragments, assets, H1s, canonical URLs, descriptions, sitemap and JSON-LD")
