import os
import io
import urllib.request
from PIL import Image

FIX_URLS = {
    'idx_feat_charger.webp': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=650&q=80',
    'idx_why_ergonomics.webp': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=650&q=80',
    'dev_iphone16.webp': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80',
    'idx_dev_ip16_case.webp': 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=650&q=80',
    'idx_dev_op12_mount.webp': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=650&q=80',
    'idx_dev_ipad_hub.webp': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=650&q=80',
    'services_tradein_calc.webp': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=650&q=80',
    'services_hero_care.webp': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=650&q=80',
    'blog_feat_qi2.webp': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=650&q=80'
}

for fname, url in FIX_URLS.items():
    dst = os.path.join('assets', fname)
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
    print(f"Fixed {fname} -> {os.path.getsize(dst)} bytes")
