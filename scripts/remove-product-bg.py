import os
import sys
import glob
import json
from PIL import Image

PRODUCT_DIR = '/opt/nxtsmarthome.com.au/public/images/products'
WEB_PRODUCT_DIR = '/var/www/html/nxtsmarthome.com.au/images/products'
JSON_PATH = '/opt/nxtsmarthome.com.au/public/data/products.json'
OUT_JSON_PATH = '/opt/nxtsmarthome.com.au/out/data/products.json'

os.makedirs(PRODUCT_DIR, exist_ok=True)
os.makedirs(WEB_PRODUCT_DIR, exist_ok=True)

def remove_background_and_convert_png(file_path):
    filename = os.path.basename(file_path)
    slug = os.path.splitext(filename)[0]
    out_name = f"{slug}.png"
    out_path_public = os.path.join(PRODUCT_DIR, out_name)
    out_path_web = os.path.join(WEB_PRODUCT_DIR, out_name)

    try:
        with Image.open(file_path) as img:
            img = img.convert('RGBA')
            w, h = img.size
            pixels = img.load()

            # Sample border pixels to get background color
            corners = [pixels[0, 0], pixels[w-1, 0], pixels[0, h-1], pixels[w-1, h-1]]
            avg_r = sum(c[0] for c in corners) / 4.0
            avg_g = sum(c[1] for c in corners) / 4.0
            avg_b = sum(c[2] for c in corners) / 4.0

            # BFS from all outer borders
            visited = set()
            queue = []

            for x in range(w):
                queue.append((x, 0))
                queue.append((x, h - 1))
            for y in range(h):
                queue.append((0, y))
                queue.append((w - 1, y))

            def is_bg_pixel(r, g, b, a):
                if a == 0:
                    return True
                # White/light threshold or close to corner average
                dist = ((r - avg_r)**2 + (g - avg_g)**2 + (b - avg_b)**2)**0.5
                is_light = (r > 225 and g > 225 and b > 225)
                return is_light or dist < 40

            transparent_pixels = set()
            while queue:
                x, y = queue.pop()
                if (x, y) in visited:
                    continue
                visited.add((x, y))

                r, g, b, a = pixels[x, y]
                if is_bg_pixel(r, g, b, a):
                    transparent_pixels.add((x, y))
                    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                            queue.append((nx, ny))

            for x, y in transparent_pixels:
                pixels[x, y] = (0, 0, 0, 0)

            # Save PNG
            img.save(out_path_public, 'PNG')
            img.save(out_path_web, 'PNG')
            return out_name
    except Exception as e:
        print(f"Error processing {filename}: {e}", file=sys.stderr)
        return None

def main():
    image_files = [f for f in os.listdir(PRODUCT_DIR) if f.endswith(('.webp', '.jpg', '.jpeg', '.png'))]
    print(f"Processing {len(image_files)} product images...")

    processed_count = 0
    for filename in image_files:
        src = os.path.join(PRODUCT_DIR, filename)
        res = remove_background_and_convert_png(src)
        if res:
            processed_count += 1

    print(f"Finished processing {processed_count} images into transparent PNGs.")

    # Update products.json
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            products = json.load(f)

        updated_products = 0
        for p in products:
            if 'image' in p and p['image']:
                old_img = p['image']
                base_slug = os.path.splitext(os.path.basename(old_img))[0]
                new_img = f"/images/products/{base_slug}.png"
                if p['image'] != new_img:
                    p['image'] = new_img
                    updated_products += 1

        with open(JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=2)

        if os.path.exists(OUT_JSON_PATH):
            with open(OUT_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(products, f, indent=2)

        print(f"Updated {updated_products} product image paths in products.json to .png")

if __name__ == '__main__':
    main()
