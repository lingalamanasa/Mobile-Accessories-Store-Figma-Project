const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. index.html
let indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
indexContent = indexContent
  .replace(/assets\/cat_battery\.jpg/g, 'assets/idx_cat_battery.webp')
  .replace(/assets\/cat_mounts\.jpg/g, 'assets/idx_cat_mounts.webp');
fs.writeFileSync(path.join(rootDir, 'index.html'), indexContent, 'utf8');

// 2. shop.html
let shopContent = fs.readFileSync(path.join(rootDir, 'shop.html'), 'utf8');
shopContent = shopContent
  .replace(/assets\/prod_iphone_case\.jpg/g, 'assets/shop_prod_ip16_case.webp')
  .replace(/assets\/prod_iphone_dock\.jpg/g, 'assets/shop_prod_ip16_dock.webp')
  .replace(/assets\/prod_s24_case\.jpg/g, 'assets/shop_prod_s24_case.webp')
  .replace(/assets\/prod_pixel_case\.jpg/g, 'assets/shop_prod_px9_case.webp')
  .replace(/assets\/prod_oneplus_case\.jpg/g, 'assets/shop_prod_op12_case.webp')
  .replace(/assets\/clean_charger\.jpg/g, 'assets/shop_clean_charger.webp')
  .replace(/assets\/lifestyle_car\.jpg/g, 'assets/shop_lifestyle_car.webp')
  .replace(/assets\/lifestyle_audio\.jpg/g, 'assets/shop_lifestyle_audio.webp')
  .replace(/assets\/desk_setup_2\.jpg/g, 'assets/shop_community_setup_2.webp')
  .replace(/assets\/desk_setup_3\.jpg/g, 'assets/shop_community_setup_3.webp');
fs.writeFileSync(path.join(rootDir, 'shop.html'), shopContent, 'utf8');

// 3. services.html
let servicesContent = fs.readFileSync(path.join(rootDir, 'services.html'), 'utf8');
servicesContent = servicesContent
  .replace(/assets\/about_story\.jpg/g, 'assets/services_enterprise_fleet.webp')
  .replace(/assets\/cat_cases\.jpg/g, 'assets/services_aramid_care.webp')
  .replace(/assets\/product_charger\.jpg/g, 'assets/services_gan_maint.webp')
  .replace(/assets\/product_battery\.jpg/g, 'assets/services_battery_care.webp');
fs.writeFileSync(path.join(rootDir, 'services.html'), servicesContent, 'utf8');

// 4. about.html
let aboutContent = fs.readFileSync(path.join(rootDir, 'about.html'), 'utf8');
aboutContent = aboutContent
  .replace(/assets\/lab_engineer\.jpg/g, 'assets/about_lab_engineer.webp')
  .replace(/assets\/community_1\.jpg/g, 'assets/about_comm_1.webp')
  .replace(/assets\/community_2\.jpg/g, 'assets/about_comm_2.webp')
  .replace(/assets\/community_3\.jpg/g, 'assets/about_comm_3.webp')
  .replace(/assets\/community_4\.jpg/g, 'assets/about_comm_4.webp');
fs.writeFileSync(path.join(rootDir, 'about.html'), aboutContent, 'utf8');

// 5. blog.html
let blogContent = fs.readFileSync(path.join(rootDir, 'blog.html'), 'utf8');
blogContent = blogContent
  .replace(/assets\/cat_battery\.jpg/g, 'assets/blog_art_battery_chem.webp')
  .replace(/assets\/cat_cable\.jpg/g, 'assets/blog_art_edc_gear.webp')
  .replace(/assets\/why_ergonomics\.jpg/g, 'assets/blog_art_flir_telemetry.webp')
  .replace(/assets\/materials_macro\.jpg/g, 'assets/blog_art_aramid_fiber.webp')
  .replace(/assets\/lifestyle_audio\.jpg/g, 'assets/blog_art_acoustic_diaphragm.webp')
  .replace(/assets\/lifestyle_car\.jpg/g, 'assets/blog_art_peltier_cryo.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/blog_author_ravi.webp')
  .replace(/assets\/prod_iphone_dock\.jpg/g, 'assets/blog_prod_dock.webp')
  .replace(/assets\/prod_iphone_case\.jpg/g, 'assets/blog_prod_case.webp')
  .replace(/assets\/community_3\.jpg/g, 'assets/blog_whitepaper_bench.webp');
fs.writeFileSync(path.join(rootDir, 'blog.html'), blogContent, 'utf8');

// 6. contact.html
let contactContent = fs.readFileSync(path.join(rootDir, 'contact.html'), 'utf8');
contactContent = contactContent
  .replace(/assets\/community_2\.jpg/g, 'assets/contact_shipping_map.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/contact_reviewer_david.webp')
  .replace(/assets\/lab_engineer\.jpg/g, 'assets/contact_emerg_support.webp')
  .replace(/assets\/bundle_gear\.jpg/g, 'assets/contact_retail_range.webp');
fs.writeFileSync(path.join(rootDir, 'contact.html'), contactContent, 'utf8');

console.log('All remaining images updated to unique webp!');
