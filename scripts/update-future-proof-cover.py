import os
from PIL import Image

src_png = '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/future_proof_smart_home_devices_australia_cover_1785934539094.png'
base_dir = '/opt/nxtsmarthome.com.au'
web_dir = '/var/www/html/nxtsmarthome.com.au'

img = Image.open(src_png)

# 1. Main Cover (1240x700)
main_img = img.resize((1240, 1240), Image.Resampling.LANCZOS)
# crop top/bottom center to 1240x700
width, height = main_img.size
top = (height - 700) // 2
main_crop = main_img.crop((0, top, 1240, top + 700))

# 2. Square Cover (700x700)
sq_crop = img.resize((700, 700), Image.Resampling.LANCZOS)

# Save locations
locs = [
    (os.path.join(base_dir, 'public/covers/future-proof-smart-home-devices-australia.webp'), main_crop),
    (os.path.join(base_dir, 'public/covers/square/future-proof-smart-home-devices-australia.webp'), sq_crop),
    (os.path.join(web_dir, 'covers/future-proof-smart-home-devices-australia.webp'), main_crop),
    (os.path.join(web_dir, 'covers/square/future-proof-smart-home-devices-australia.webp'), sq_crop),
]

for path, image_obj in locs:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    image_obj.save(path, 'WEBP', quality=90)
    print(f"Saved: {path}")
