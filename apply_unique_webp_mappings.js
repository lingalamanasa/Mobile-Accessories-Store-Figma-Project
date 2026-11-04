const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Global logo replacement in all files
const allFiles = ['index.html', 'shop.html', 'services.html', 'about.html', 'blog.html', 'contact.html', 'login.html', 'signup.html'];

allFiles.forEach(f => {
  let content = fs.readFileSync(path.join(rootDir, f), 'utf8');
  content = content.replace(/assets\/exact_logo\.png/g, 'assets/exact_logo.webp');
  fs.writeFileSync(path.join(rootDir, f), content, 'utf8');
});
console.log('Updated logo to exact_logo.webp across all files');

// 1. Update index.html
let indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
indexContent = indexContent
  .replace(/assets\/hero_headphone\.png/g, 'assets/hero_headphone.webp')
  .replace(/assets\/red_headphone\.png/g, 'assets/red_headphone.webp')
  .replace(/assets\/black_headphone\.png/g, 'assets/black_headphone.webp')
  .replace(/assets\/earbuds\.png/g, 'assets/earbuds.webp')
  .replace(/assets\/cat_cable\.jpg/g, 'assets/idx_cat_cables.webp')
  .replace(/assets\/cat_cases\.jpg/g, 'assets/idx_cat_cases.webp')
  .replace(/assets\/cat_audio\.jpg/g, 'assets/idx_cat_audio.webp')
  .replace(/assets\/cat_smart\.jpg/g, 'assets/idx_cat_chargers.webp')
  .replace(/assets\/product_case\.jpg/g, 'assets/idx_feat_case.webp')
  .replace(/assets\/product_charger\.jpg/g, 'assets/idx_feat_charger.webp')
  .replace(/assets\/product_battery\.jpg/g, 'assets/idx_feat_battery.webp')
  .replace(/assets\/product_cable\.jpg/g, 'assets/idx_feat_cable.webp')
  .replace(/assets\/product_magsafe\.jpg/g, 'assets/idx_mag_wallet.webp')
  .replace(/assets\/product_dock\.jpg/g, 'assets/idx_mag_stand.webp')
  .replace(/assets\/product_car\.jpg/g, 'assets/idx_mag_car.webp')
  .replace(/assets\/product_earbuds\.jpg/g, 'assets/idx_mag_pad.webp')
  .replace(/assets\/why_durability\.jpg/g, 'assets/idx_why_durability.webp')
  .replace(/assets\/why_materials\.jpg/g, 'assets/idx_why_materials.webp')
  .replace(/assets\/why_ergonomics\.jpg/g, 'assets/idx_why_ergonomics.webp')
  .replace(/assets\/why_qi2\.jpg/g, 'assets/idx_why_qi2.webp')
  .replace(/assets\/dev_iphone\.jpg/g, 'assets/dev_iphone16pro.webp')
  .replace(/assets\/dev_iphone15\.jpg/g, 'assets/dev_iphone16.webp')
  .replace(/assets\/dev_s24\.jpg/g, 'assets/dev_s24ultra.webp')
  .replace(/assets\/dev_pixel\.jpg/g, 'assets/dev_pixel9pro.webp')
  .replace(/assets\/dev_oneplus\.jpg/g, 'assets/dev_oneplus12.webp')
  .replace(/assets\/dev_ipad\.jpg/g, 'assets/dev_ipadpro.webp')
  .replace(/assets\/dev_airpods\.jpg/g, 'assets/dev_airpodspro.webp')
  .replace(/assets\/prod_iphone_case\.jpg/g, 'assets/idx_dev_ip16p_case.webp')
  .replace(/assets\/prod_iphone_dock\.jpg/g, 'assets/idx_dev_ip16p_dock.webp')
  .replace(/assets\/prod_iphone_lens\.jpg/g, 'assets/idx_dev_ip16p_lens.webp')
  .replace(/assets\/prod_iphone15_case\.jpg/g, 'assets/idx_dev_ip16_case.webp')
  .replace(/assets\/prod_iphone15_wallet\.jpg/g, 'assets/idx_dev_ip16_wallet.webp')
  .replace(/assets\/prod_iphone15_battery\.jpg/g, 'assets/idx_dev_ip16_battery.webp')
  .replace(/assets\/prod_s24_case\.jpg/g, 'assets/idx_dev_s24_case.webp')
  .replace(/assets\/prod_s24_stand\.jpg/g, 'assets/idx_dev_s24_stand.webp')
  .replace(/assets\/prod_s24_charger\.jpg/g, 'assets/idx_dev_s24_charger.webp')
  .replace(/assets\/prod_pixel_case\.jpg/g, 'assets/idx_dev_px9_case.webp')
  .replace(/assets\/prod_pixel_stand\.jpg/g, 'assets/idx_dev_px9_stand.webp')
  .replace(/assets\/prod_pixel_cable\.jpg/g, 'assets/idx_dev_px9_cable.webp')
  .replace(/assets\/prod_oneplus_case\.jpg/g, 'assets/idx_dev_op12_case.webp')
  .replace(/assets\/prod_oneplus_cable\.jpg/g, 'assets/idx_dev_op12_cable.webp')
  .replace(/assets\/prod_oneplus_mount\.jpg/g, 'assets/idx_dev_op12_mount.webp')
  .replace(/assets\/prod_ipad_folio\.jpg/g, 'assets/idx_dev_ipad_folio.webp')
  .replace(/assets\/prod_ipad_stand\.jpg/g, 'assets/idx_dev_ipad_stand.webp')
  .replace(/assets\/prod_ipad_hub\.jpg/g, 'assets/idx_dev_ipad_hub.webp')
  .replace(/assets\/prod_airpods_case\.jpg/g, 'assets/idx_dev_pods_case.webp')
  .replace(/assets\/prod_airpods_pad\.jpg/g, 'assets/idx_dev_pods_pad.webp')
  .replace(/assets\/prod_airpods_lanyard\.jpg/g, 'assets/idx_dev_pods_lanyard.webp')
  .replace(/assets\/materials_macro\.jpg/g, 'assets/idx_materials_macro.webp')
  .replace(/assets\/lab_engineer\.jpg/g, 'assets/idx_lab_engineer.webp')
  .replace(/assets\/community_1\.jpg/g, 'assets/idx_community_1.webp')
  .replace(/assets\/community_2\.jpg/g, 'assets/idx_community_2.webp')
  .replace(/assets\/community_3\.jpg/g, 'assets/idx_community_3.webp')
  .replace(/assets\/community_4\.jpg/g, 'assets/idx_community_4.webp')
  .replace(/assets\/lifestyle_car\.jpg/g, 'assets/idx_community_5.webp')
  .replace(/assets\/lifestyle_audio\.jpg/g, 'assets/idx_community_6.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/avatar_marcus.webp')
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/avatar_sarah.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/avatar_david.webp');

fs.writeFileSync(path.join(rootDir, 'index.html'), indexContent, 'utf8');
console.log('Updated index.html unique webp assets');

// 2. Update shop.html
let shopContent = fs.readFileSync(path.join(rootDir, 'shop.html'), 'utf8');
shopContent = shopContent
  .replace(/assets\/cat_cases\.jpg/g, 'assets/shop_cat_cases.webp')
  .replace(/assets\/cat_smart\.jpg/g, 'assets/shop_cat_chargers.webp')
  .replace(/assets\/cat_cable\.jpg/g, 'assets/shop_cat_cables.webp')
  .replace(/assets\/cat_audio\.jpg/g, 'assets/shop_cat_audio.webp')
  .replace(/assets\/cat_battery\.jpg/g, 'assets/shop_cat_power.webp')
  .replace(/assets\/cat_mounts\.jpg/g, 'assets/shop_cat_mounts.webp')
  .replace(/assets\/product_case\.jpg/g, 'assets/shop_prod_1.webp')
  .replace(/assets\/product_dock\.jpg/g, 'assets/shop_prod_2.webp')
  .replace(/assets\/product_cable\.jpg/g, 'assets/shop_prod_3.webp')
  .replace(/assets\/product_battery\.jpg/g, 'assets/shop_prod_4.webp')
  .replace(/assets\/product_earbuds\.jpg/g, 'assets/shop_prod_5.webp')
  .replace(/assets\/product_car\.jpg/g, 'assets/shop_prod_6.webp')
  .replace(/assets\/prod_iphone_lens\.jpg/g, 'assets/shop_prod_7.webp')
  .replace(/assets\/prod_iphone15_wallet\.jpg/g, 'assets/shop_prod_8.webp')
  .replace(/assets\/product_charger\.jpg/g, 'assets/shop_prod_9.webp')
  .replace(/assets\/prod_airpods_case\.jpg/g, 'assets/shop_prod_10.webp')
  .replace(/assets\/prod_ipad_folio\.jpg/g, 'assets/shop_prod_11.webp')
  .replace(/assets\/prod_s24_stand\.jpg/g, 'assets/shop_prod_12.webp')
  .replace(/assets\/desk_setup_1\.jpg/g, 'assets/shop_spotlight_desk.webp')
  .replace(/assets\/bundle_gear\.jpg/g, 'assets/shop_bundle_kit.webp')
  .replace(/assets\/unboxing_gear\.jpg/g, 'assets/shop_unboxing.webp')
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/shop_rev_elena.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/shop_rev_kenji.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/shop_rev_alex.webp');

fs.writeFileSync(path.join(rootDir, 'shop.html'), shopContent, 'utf8');
console.log('Updated shop.html unique webp assets');

// 3. Update services.html
let servicesContent = fs.readFileSync(path.join(rootDir, 'services.html'), 'utf8');
servicesContent = servicesContent
  .replace(/assets\/prod_iphone_case\.jpg/g, 'assets/services_warranty_vault.webp')
  .replace(/assets\/unboxing_gear\.jpg/g, 'assets/services_tradein_calc.webp')
  .replace(/assets\/prod_iphone_lens\.jpg/g, 'assets/services_fleet_diag.webp')
  .replace(/assets\/desk_setup_1\.jpg/g, 'assets/services_recycling.webp')
  .replace(/assets\/lab_engineer\.jpg/g, 'assets/services_drop_chassis.webp')
  .replace(/assets\/why_qi2\.jpg/g, 'assets/services_thermal_analysis.webp')
  .replace(/assets\/about_hello\.jpg/g, 'assets/services_corp_fleet.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/services_tech_ravi.webp');

fs.writeFileSync(path.join(rootDir, 'services.html'), servicesContent, 'utf8');
console.log('Updated services.html unique webp assets');

// 4. Update about.html
let aboutContent = fs.readFileSync(path.join(rootDir, 'about.html'), 'utf8');
aboutContent = aboutContent
  .replace(/assets\/about_story\.jpg/g, 'assets/about_story.webp')
  .replace(/assets\/materials_macro\.jpg/g, 'assets/about_materials.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/about_founder_ravi.webp')
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/about_head_ananya.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/about_support_tom.webp')
  .replace(/assets\/about_hello\.jpg/g, 'assets/about_showroom.webp')
  .replace(/assets\/why_materials\.jpg/g, 'assets/about_pillar_durability.webp')
  .replace(/assets\/why_durability\.jpg/g, 'assets/about_pillar_honesty.webp')
  .replace(/assets\/why_ergonomics\.jpg/g, 'assets/about_pillar_waste.webp');

fs.writeFileSync(path.join(rootDir, 'about.html'), aboutContent, 'utf8');
console.log('Updated about.html unique webp assets');

// 5. Update blog.html
let blogContent = fs.readFileSync(path.join(rootDir, 'blog.html'), 'utf8');
blogContent = blogContent
  .replace(/assets\/why_qi2\.jpg/g, 'assets/blog_feat_qi2.webp')
  .replace(/assets\/cat_smart\.jpg/g, 'assets/blog_feat_cable.webp')
  .replace(/assets\/why_durability\.jpg/g, 'assets/blog_art_titanium.webp')
  .replace(/assets\/product_cable\.jpg/g, 'assets/blog_art_battery.webp')
  .replace(/assets\/product_car\.jpg/g, 'assets/blog_art_carmount.webp')
  .replace(/assets\/desk_setup_2\.jpg/g, 'assets/blog_art_magnet.webp')
  .replace(/assets\/product_battery\.jpg/g, 'assets/blog_art_recycled.webp')
  .replace(/assets\/clean_charger\.jpg/g, 'assets/blog_art_audio.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/blog_author_dev.webp')
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/blog_author_kiran.webp');

fs.writeFileSync(path.join(rootDir, 'blog.html'), blogContent, 'utf8');
console.log('Updated blog.html unique webp assets');

// 6. Update contact.html
let contactContent = fs.readFileSync(path.join(rootDir, 'contact.html'), 'utf8');
// In contact.html, there were multiple about_hello.jpg, let's distinguish them:
contactContent = contactContent
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/contact_concierge_maya.webp')
  .replace(/assets\/desk_setup_2\.jpg/g, 'assets/contact_tour_walk.webp')
  .replace(/assets\/about_hello\.jpg/g, 'assets/contact_lab_building.webp');

fs.writeFileSync(path.join(rootDir, 'contact.html'), contactContent, 'utf8');
console.log('Updated contact.html unique webp assets');

// 7. Update login.html
let loginContent = fs.readFileSync(path.join(rootDir, 'login.html'), 'utf8');
loginContent = loginContent
  .replace(/assets\/desk_setup_1\.jpg/g, 'assets/login_studio_desk.webp')
  .replace(/assets\/avatar_marcus\.jpg/g, 'assets/login_member_avatar.webp')
  .replace(/assets\/dev_iphone\.jpg/g, 'assets/dev_iphone16pro.webp')
  .replace(/assets\/dev_s24\.jpg/g, 'assets/dev_s24ultra.webp')
  .replace(/assets\/dev_pixel\.jpg/g, 'assets/dev_pixel9pro.webp')
  .replace(/assets\/dev_airpods\.jpg/g, 'assets/dev_airpodspro.webp')
  .replace(/assets\/cat_cases\.jpg/g, 'assets/login_vault_case.webp')
  .replace(/assets\/cat_audio\.jpg/g, 'assets/login_vault_audio.webp')
  .replace(/assets\/cat_battery\.jpg/g, 'assets/login_vault_battery.webp')
  .replace(/assets\/cat_mounts\.jpg/g, 'assets/login_vault_mount.webp')
  .replace(/assets\/avatar_sarah\.jpg/g, 'assets/avatar_sarah.webp')
  .replace(/assets\/avatar_david\.jpg/g, 'assets/avatar_david.webp');

fs.writeFileSync(path.join(rootDir, 'login.html'), loginContent, 'utf8');
console.log('Updated login.html unique webp assets');

// 8. Update signup.html
let signupContent = fs.readFileSync(path.join(rootDir, 'signup.html'), 'utf8');
signupContent = signupContent
  .replace(/assets\/desk_setup_2\.jpg/g, 'assets/signup_onboarding_desk.webp')
  .replace(/assets\/bundle_gear\.jpg/g, 'assets/signup_welcome_bundle.webp')
  .replace(/assets\/dev_iphone\.jpg/g, 'assets/dev_iphone16pro.webp')
  .replace(/assets\/dev_iphone15\.jpg/g, 'assets/dev_iphone16.webp')
  .replace(/assets\/dev_s24\.jpg/g, 'assets/dev_s24ultra.webp')
  .replace(/assets\/dev_pixel\.jpg/g, 'assets/dev_pixel9pro.webp')
  .replace(/assets\/dev_oneplus\.jpg/g, 'assets/dev_oneplus12.webp')
  .replace(/assets\/dev_airpods\.jpg/g, 'assets/dev_airpodspro.webp')
  .replace(/assets\/community_1\.jpg/g, 'assets/signup_community_1.webp')
  .replace(/assets\/community_2\.jpg/g, 'assets/signup_community_2.webp')
  .replace(/assets\/community_3\.jpg/g, 'assets/signup_community_3.webp')
  .replace(/assets\/community_4\.jpg/g, 'assets/signup_community_4.webp')
  .replace(/assets\/clean_charger\.jpg/g, 'assets/signup_thermal_sensor.webp')
  .replace(/assets\/desk_setup_3\.jpg/g, 'assets/signup_eco_box.webp');

fs.writeFileSync(path.join(rootDir, 'signup.html'), signupContent, 'utf8');
console.log('Updated signup.html unique webp assets');

// 9. Update app.js
let appContent = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');
appContent = appContent
  .replace(/assets\/dev_iphone\.jpg/g, 'assets/dev_iphone16pro.webp')
  .replace(/assets\/dev_iphone15\.jpg/g, 'assets/dev_iphone16.webp')
  .replace(/assets\/dev_s24\.jpg/g, 'assets/dev_s24ultra.webp')
  .replace(/assets\/dev_pixel\.jpg/g, 'assets/dev_pixel9pro.webp')
  .replace(/assets\/dev_oneplus\.jpg/g, 'assets/dev_oneplus12.webp')
  .replace(/assets\/dev_ipad\.jpg/g, 'assets/dev_ipadpro.webp')
  .replace(/assets\/dev_airpods\.jpg/g, 'assets/dev_airpodspro.webp')
  .replace(/assets\/prod_iphone_case\.jpg/g, 'assets/idx_dev_ip16p_case.webp')
  .replace(/assets\/prod_iphone_dock\.jpg/g, 'assets/idx_dev_ip16p_dock.webp')
  .replace(/assets\/prod_iphone_lens\.jpg/g, 'assets/idx_dev_ip16p_lens.webp')
  .replace(/assets\/prod_iphone15_case\.jpg/g, 'assets/idx_dev_ip16_case.webp')
  .replace(/assets\/prod_iphone15_wallet\.jpg/g, 'assets/idx_dev_ip16_wallet.webp')
  .replace(/assets\/prod_iphone15_battery\.jpg/g, 'assets/idx_dev_ip16_battery.webp')
  .replace(/assets\/prod_s24_case\.jpg/g, 'assets/idx_dev_s24_case.webp')
  .replace(/assets\/prod_s24_stand\.jpg/g, 'assets/idx_dev_s24_stand.webp')
  .replace(/assets\/prod_s24_charger\.jpg/g, 'assets/idx_dev_s24_charger.webp')
  .replace(/assets\/prod_pixel_case\.jpg/g, 'assets/idx_dev_px9_case.webp')
  .replace(/assets\/prod_pixel_stand\.jpg/g, 'assets/idx_dev_px9_stand.webp')
  .replace(/assets\/prod_pixel_cable\.jpg/g, 'assets/idx_dev_px9_cable.webp')
  .replace(/assets\/prod_oneplus_case\.jpg/g, 'assets/idx_dev_op12_case.webp')
  .replace(/assets\/prod_oneplus_cable\.jpg/g, 'assets/idx_dev_op12_cable.webp')
  .replace(/assets\/prod_oneplus_mount\.jpg/g, 'assets/idx_dev_op12_mount.webp')
  .replace(/assets\/prod_ipad_folio\.jpg/g, 'assets/idx_dev_ipad_folio.webp')
  .replace(/assets\/prod_ipad_stand\.jpg/g, 'assets/idx_dev_ipad_stand.webp')
  .replace(/assets\/prod_ipad_hub\.jpg/g, 'assets/idx_dev_ipad_hub.webp')
  .replace(/assets\/prod_airpods_case\.jpg/g, 'assets/idx_dev_pods_case.webp')
  .replace(/assets\/prod_airpods_pad\.jpg/g, 'assets/idx_dev_pods_pad.webp')
  .replace(/assets\/prod_airpods_lanyard\.jpg/g, 'assets/idx_dev_pods_lanyard.webp');

fs.writeFileSync(path.join(rootDir, 'app.js'), appContent, 'utf8');
console.log('Updated app.js unique webp assets');
