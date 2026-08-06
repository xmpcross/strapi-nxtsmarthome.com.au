import os
from PIL import Image

src_png = '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/smart_home_devices_older_australians_cover_1785935608127.png'
raw_dest = '/opt/nxtsmarthome.com.au/public/covers/raw/smart-home-devices-older-australians.jpg'

os.makedirs(os.path.dirname(raw_dest), exist_ok=True)
img = Image.open(src_png)
img.convert('RGB').save(raw_dest, 'JPEG', quality=95)
print(f"Saved raw image to {raw_dest}")
