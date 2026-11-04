const fs = require('fs');

const lines = fs.readFileSync('contact.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('.webp')) {
    console.log(`line ${i+1}: ${l.trim().slice(0, 100)}`);
  }
});
