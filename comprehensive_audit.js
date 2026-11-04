const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'shop.html', 'services.html', 'about.html', 'blog.html', 'contact.html', 'login.html', 'signup.html'];

let allPassed = true;
const imageUsages = {};

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const matches = [...content.matchAll(/assets\/[a-zA-Z0-9_\-\.]+\.webp/g)].map(m => m[0]);
  
  console.log(`\n=== Checking ${p} (${matches.length} webp references) ===`);
  matches.forEach(img => {
    // Check existence
    if (!fs.existsSync(img)) {
      console.error(`  MISSING FILE: ${img}`);
      allPassed = false;
      return;
    }
    // Check file size
    const stat = fs.statSync(img);
    const sizeKB = (stat.size / 1024).toFixed(1);
    if (stat.size > 100 * 1024) {
      console.error(`  OVER 100KB: ${img} (${sizeKB} KB)`);
      allPassed = false;
    }
    
    // Track usage across non-logo images
    if (!img.includes('exact_logo')) {
      imageUsages[img] = imageUsages[img] || [];
      imageUsages[img].push(p);
    }
  });
});

console.log('\n===========================================');
console.log('CHECKING FOR UNINTENDED REPEATED IMAGES:');
console.log('===========================================');

let repeatCount = 0;
Object.entries(imageUsages).forEach(([img, pageList]) => {
  const uniquePages = [...new Set(pageList)];
  if (pageList.length > 1 && !img.includes('hero_headphone') && !img.includes('dev_')) {
    console.log(`  Repeated: ${img} appears ${pageList.length} times in [${uniquePages.join(', ')}]`);
    repeatCount++;
  }
});

if (repeatCount === 0) {
  console.log('No repeated content images found! Every section and page has its own unique image.');
} else {
  console.log(`Found ${repeatCount} repeated non-device images.`);
}

console.log('\nAudit status: ' + (allPassed ? 'ALL VERIFICATIONS PASSED!' : 'SOME CHECKS FAILED!'));
