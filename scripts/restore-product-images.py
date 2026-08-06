import os
import json

base_dir = '/opt/nxtsmarthome.com.au'
json_path = os.path.join(base_dir, 'public/data/products.json')
images_dir = os.path.join(base_dir, 'public/images/products')

with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

restored_count = 0
for p in products:
    slug = p.get('slug')
    if not slug:
        continue
    
    webp_name = f"{slug}.webp"
    jpg_name = f"{slug}.jpg"
    
    webp_path = os.path.join(images_dir, webp_name)
    jpg_path = os.path.join(images_dir, jpg_name)
    
    if os.path.exists(webp_path):
        p['image'] = f"/images/products/{webp_name}"
        restored_count += 1
    elif os.path.exists(jpg_path):
        p['image'] = f"/images/products/{jpg_name}"
        restored_count += 1

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully restored image URLs for {restored_count} products in products.json.")
