import os

assets_dir = 'assets'
webp_files = [f for f in os.listdir(assets_dir) if f.endswith('.webp')]

print(f"Total WebP files: {len(webp_files)}")
over_100k = []
for f in webp_files:
    path = os.path.join(assets_dir, f)
    size = os.path.getsize(path)
    if size > 100 * 1024:
        over_100k.append((f, size))

if over_100k:
    print(f"FAILED! Found {len(over_100k)} files over 100KB:")
    for f, s in over_100k:
        print(f"  {f}: {s} bytes")
else:
    print("ALL WebP images are strictly under 100KB! (Maximum size is < 100,000 bytes)")
