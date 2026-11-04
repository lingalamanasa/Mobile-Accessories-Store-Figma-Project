const fs = require('fs');

const files = ['index.html', 'shop.html', 'services.html', 'about.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, idx) => {
    const match = l.match(/assets\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|jpeg)/);
    if (match) {
      console.log(`${f}:${idx+1}: ${match[0]} in line -> ${l.trim().slice(0, 100)}`);
    }
  });
});
