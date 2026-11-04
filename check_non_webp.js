const fs = require('fs');

const files = ['index.html', 'shop.html', 'services.html', 'about.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', 'app.js'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const nonWebp = [...content.matchAll(/assets\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|jpeg)/g)].map(m => m[0]);
  if (nonWebp.length > 0) {
    console.log(`${f} has ${nonWebp.length} non-webp references:`, [...new Set(nonWebp)]);
  } else {
    console.log(`${f}: 100% WEBP!`);
  }
});
