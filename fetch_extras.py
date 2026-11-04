import os
import io
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image

EXTRA_URLS = {
    # index.html
    'idx_cat_battery.webp': 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=650&q=80',
    'idx_cat_mounts.webp': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=650&q=80',

    # shop.html
    'shop_prod_ip16_case.webp': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=650&q=80',
    'shop_prod_ip16_dock.webp': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=650&q=80',
    'shop_prod_s24_case.webp': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=650&q=80',
    'shop_prod_px9_case.webp': 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=650&q=80',
    'shop_prod_op12_case.webp': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=650&q=80',
    'shop_clean_charger.webp': 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=650&q=80',
    'shop_lifestyle_car.webp': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=650&q=80',
    'shop_lifestyle_audio.webp': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=650&q=80',
    'shop_community_setup_2.webp': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=650&q=80',
    'shop_community_setup_3.webp': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=650&q=80',

    # services.html
    'services_enterprise_fleet.webp': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=650&q=80',
    'services_aramid_care.webp': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=650&q=80',
    'services_gan_maint.webp': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=650&q=80',
    'services_battery_care.webp': 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=650&q=80',

    # about.html
    'about_lab_engineer.webp': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=650&q=80',
    'about_comm_1.webp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80',
    'about_comm_2.webp': 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&q=80',
    'about_comm_3.webp': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
    'about_comm_4.webp': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',

    # blog.html
    'blog_art_battery_chem.webp': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=650&q=80',
    'blog_art_edc_gear.webp': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=650&q=80',
    'blog_art_flir_telemetry.webp': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=650&q=80',
    'blog_art_aramid_fiber.webp': 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=650&q=80',
    'blog_art_acoustic_diaphragm.webp': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=650&q=80',
    'blog_art_peltier_cryo.webp': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=650&q=80',
    'blog_author_ravi.webp': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    'blog_prod_dock.webp': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=650&q=80',
    'blog_prod_case.webp': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=650&q=80',
    'blog_whitepaper_bench.webp': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=650&q=80',

    # contact.html
    'contact_shipping_map.webp': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=650&q=80',
    'contact_reviewer_david.webp': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    'contact_emerg_support.webp': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=650&q=80',
    'contact_retail_range.webp': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=650&q=80'
}

assets_dir = 'assets'
os.makedirs(assets_dir, exist_ok=True)

def fetch_and_save(fname, url):
    dst = os.path.join(assets_dir, fname)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = resp.read()
    img = Image.open(io.BytesIO(data)).convert('RGB')
    w, h = img.size
    max_dim = 600
    if max(w, h) > max_dim:
        if w > h:
            new_w = max_dim
            new_h = int(h * (max_dim / w))
        else:
            new_h = max_dim
            new_w = int(w * (max_dim / h))
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    quality = 80
    buf = io.BytesIO()
    img.save(buf, format='WEBP', quality=quality)
    while len(buf.getvalue()) > 95000 and quality > 35:
        quality -= 5
        buf = io.BytesIO()
        img.save(buf, format='WEBP', quality=quality)
    with open(dst, 'wb') as f:
        f.write(buf.getvalue())
    print(f"Generated {fname}: {os.path.getsize(dst)} bytes")
    return fname, os.path.getsize(dst)

with ThreadPoolExecutor(max_workers=12) as executor:
    futures = [executor.submit(fetch_and_save, fname, url) for fname, url in EXTRA_URLS.items()]
    for f in as_completed(futures):
        f.result()

print("All extra unique images generated!")
