#!/usr/bin/env python3
"""Remove white/near-white background from libro.png and save as libro-nobg.png"""

from PIL import Image
import sys, os

src = os.path.join(os.path.dirname(__file__), '..', 'public', 'libro.png')
dst = os.path.join(os.path.dirname(__file__), '..', 'public', 'libro-nobg.png')

img = Image.open(src)
print(f"Source: {img.size} {img.mode}", flush=True)

img = img.convert("RGBA")
data = img.getdata()

new_data = []
threshold = 235  # pixels with R,G,B all above this → transparent
soft_threshold = 215  # pixels between soft and hard → partial alpha

for r, g, b, a in data:
    if r > threshold and g > threshold and b > threshold:
        # Pure white / near-white → fully transparent
        new_data.append((r, g, b, 0))
    elif r > soft_threshold and g > soft_threshold and b > soft_threshold:
        # Soft transition zone → partial transparency
        # Map 215-235 to alpha 255-0
        factor = (min(r, g, b) - soft_threshold) / (threshold - soft_threshold)
        alpha = int(255 * (1 - factor))
        new_data.append((r, g, b, alpha))
    else:
        new_data.append((r, g, b, a))

img.putdata(new_data)
img.save(dst, "PNG", optimize=True)
print(f"Saved: {dst}", flush=True)
print(f"Size: {os.path.getsize(dst)} bytes", flush=True)
