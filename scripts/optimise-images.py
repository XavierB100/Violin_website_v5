"""Generate responsive copies; leave original photographs untouched.

Run: uv run --with pillow python scripts/optimise-images.py
"""
from pathlib import Path
from PIL import Image, ImageOps

assets = Path(__file__).resolve().parents[1] / "assets"
photos = {
    "250327-MUFG-004.jpeg": "performance",
    "IMG_9263.jpeg": "portrait",
    "902fedcf-2c16-4347-ae5c-759b7afc24d6.jpeg": "outdoor",
    "Screenshot 2025-08-01 at 15.45.29.jpeg": "event",
    "Screenshot 2025-07-19 at 21.53.20.jpeg": "church",
    "IMG_0103.jpeg": "strings",
    "IMG_0107.jpeg": "stage",
    "IMG_0345.jpeg": "video-poster",
}
output = assets / "responsive"
output.mkdir(exist_ok=True)
for original, name in photos.items():
    with Image.open(assets / original) as source:
        source = ImageOps.exif_transpose(source).convert("RGB")
        for width in (640, 1200):
            resized = source.copy()
            resized.thumbnail((width, 2400), Image.Resampling.LANCZOS)
            target = output / f"{name}-{width}.webp"
            resized.save(target, "WEBP", quality=82, method=6)
            print(f"{target.name}: {target.stat().st_size:,} bytes")
        if name in {"performance", "portrait"}:
            for width in (640, 800, 1200):
                resized = source.copy()
                resized.thumbnail((width, 2400), Image.Resampling.LANCZOS)
                target = output / f"{name}-{width}.avif"
                resized.save(target, "AVIF", quality=55, speed=6)
                print(f"{target.name}: {target.stat().st_size:,} bytes")
