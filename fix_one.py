import os
import io
import urllib.request
from PIL import Image

url = 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=650&q=80'
dst = os.path.join('assets', 'shop_clean_charger.webp')

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
buf = io.BytesIO()
img.save(buf, format='WEBP', quality=80)
with open(dst, 'wb') as f:
    f.write(buf.getvalue())
print(f"Generated shop_clean_charger.webp: {os.path.getsize(dst)} bytes")
