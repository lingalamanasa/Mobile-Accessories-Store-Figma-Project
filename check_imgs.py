import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html)
for i, src in enumerate(imgs):
    print(f'{i+1}: {src}')

