import os
from PIL import Image

src_png = '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/smart_home_devices_older_australians_raw_cover_1785939772304.png'
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

locs = [
    (os.path.join(base_dir, 'public/covers/smart-home-devices-older-australians.webp'), main_crop),
    (os.path.join(base_dir, 'public/covers/square/smart-home-devices-older-australians.webp'), sq_crop),
    (os.path.join(web_dir, 'covers/smart-home-devices-older-australians.webp'), main_crop),
    (os.path.join(web_dir, 'covers/square/smart-home-devices-older-australians.webp'), sq_crop),
]

for path, image_obj in locs:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    image_obj.save(path, 'WEBP', quality=92)
    print(f"Saved: {path}")
