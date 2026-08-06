import os
from PIL import Image

src_png = '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/smart_plug_buying_guide_australia_cover_1785942134429.png'
base_dir = '/opt/nxtsmarthome.com.au'
web_dir = '/var/www/html/nxtsmarthome.com.au'

img = Image.open(src_png)

# 1. Main Cover (1000x600 landscape)
main_img = img.resize((1000, 1000), Image.Resampling.LANCZOS)
height = main_img.height
top = (height - 600) // 2
main_crop = main_img.crop((0, top, 1000, top + 600))

# 2. Square Cover (700x700)
sq_crop = img.resize((700, 700), Image.Resampling.LANCZOS)

slug = 'smart-plug-buying-guide-australia'
locs = [
    (os.path.join(base_dir, f'public/covers/{slug}.webp'), main_crop),
    (os.path.join(base_dir, f'public/covers/square/{slug}.webp'), sq_crop),
    (os.path.join(web_dir, f'covers/{slug}.webp'), main_crop),
    (os.path.join(web_dir, f'covers/square/{slug}.webp'), sq_crop),
]

for path, image_obj in locs:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    image_obj.save(path, 'WEBP', quality=92)
    print(f"Saved: {path}")
