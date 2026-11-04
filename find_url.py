import urllib.request
import re

url = 'https://unsplash.com/photos/sony-headphones-illuminated-by-red-light-0885604ddbcd'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        matches = set(re.findall(r'https://images\.unsplash\.com/photo-[0-9a-zA-Z_-]+', html))
        print('Found Unsplash URLs:', list(matches)[:5])
except Exception as e:
    print('Error:', e)

