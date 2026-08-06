import os
from PIL import Image

base_dir = '/opt/nxtsmarthome.com.au'
web_dir = '/var/www/html/nxtsmarthome.com.au'

covers_data = [
    {
        'slug': 'overseas-smart-home-devices-australia',
        'src': '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/overseas_smart_home_devices_australia_cover_1785935298228.png',
    },
    {
        'slug': 'smart-home-starter-guide-beginners-australia',
        'src': '/root/.gemini/antigravity-ide/brain/cce3b5f3-f78c-4f0c-b1bc-bd2eccfa651b/smart_home_starter_guide_beginners_australia_cover_1785935321039.png',
    }
]

for item in covers_data:
    slug = item['slug']
    src_png = item['src']
    
    img = Image.open(src_png)

    # 1. Main Cover (1240x700)
    main_img = img.resize((1240, 1240), Image.Resampling.LANCZOS)
    height = main_img.height
    top = (height - 700) // 2
    main_crop = main_img.crop((0, top, 1240, top + 700))

    # 2. Square Cover (700x700)
    sq_crop = img.resize((700, 700), Image.Resampling.LANCZOS)

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
