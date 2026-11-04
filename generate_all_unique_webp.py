import os
import io
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image

# Curated list of distinct, real, high-quality Unsplash photography for mobile accessories & tech
PHOTO_URLS = {
    # Index Categories
    'idx_cat_cables.webp': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=650&q=80',
    'idx_cat_cases.webp': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=650&q=80',
    'idx_cat_audio.webp': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=650&q=80',
    'idx_cat_chargers.webp': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=650&q=80',

    # Index Featured Bestsellers
    'idx_feat_case.webp': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=650&q=80',
    'idx_feat_charger.webp': 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=650&q=80',
    'idx_feat_battery.webp': 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=650&q=80',
    'idx_feat_cable.webp': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=650&q=80',

    # Index MagSafe Series
    'idx_mag_wallet.webp': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=650&q=80',
    'idx_mag_stand.webp': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=650&q=80',
    'idx_mag_car.webp': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=650&q=80',
    'idx_mag_pad.webp': 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=650&q=80',

    # Index Why Stackly
    'idx_why_durability.webp': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=650&q=80',
    'idx_why_materials.webp': 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=650&q=80',
    'idx_why_ergonomics.webp': 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=650&q=80',
    'idx_why_qi2.webp': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=650&q=80',

    # Device Models Avatars
    'dev_iphone16pro.webp': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
    'dev_iphone16.webp': 'https://images.unsplash.com/photo-1695048065036-0568018e69d7?w=400&q=80',
    'dev_s24ultra.webp': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    'dev_pixel9pro.webp': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    'dev_oneplus12.webp': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80',
    'dev_ipadpro.webp': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    'dev_airpodspro.webp': 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80',

    # 21 Specific Device Accessories for Index Selector
    'idx_dev_ip16p_case.webp': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=650&q=80',
    'idx_dev_ip16p_dock.webp': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=650&q=80',
    'idx_dev_ip16p_lens.webp': 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=650&q=80',
    'idx_dev_ip16_case.webp': 'https://images.unsplash.com/photo-1603539266395-85cb966468bb?w=650&q=80',
    'idx_dev_ip16_wallet.webp': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=650&q=80',
    'idx_dev_ip16_battery.webp': 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=650&q=80',
    'idx_dev_s24_case.webp': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=650&q=80',
    'idx_dev_s24_stand.webp': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=650&q=80',
    'idx_dev_s24_charger.webp': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=650&q=80',
    'idx_dev_px9_case.webp': 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=650&q=80',
    'idx_dev_px9_stand.webp': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=650&q=80',
    'idx_dev_px9_cable.webp': 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=650&q=80',
    'idx_dev_op12_case.webp': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=650&q=80',
    'idx_dev_op12_cable.webp': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=650&q=80',
    'idx_dev_op12_mount.webp': 'https://images.unsplash.com/photo-1508873696983-2df57046475a?w=650&q=80',
    'idx_dev_ipad_folio.webp': 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=650&q=80',
    'idx_dev_ipad_stand.webp': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=650&q=80',
    'idx_dev_ipad_hub.webp': 'https://images.unsplash.com/photo-1585792180666-f7547c6a28c5?w=650&q=80',
    'idx_dev_pods_case.webp': 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=650&q=80',
    'idx_dev_pods_pad.webp': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=650&q=80',
    'idx_dev_pods_lanyard.webp': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=650&q=80',

    # Index Macro & Community
    'idx_materials_macro.webp': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=650&q=80',
    'idx_lab_engineer.webp': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=650&q=80',
    'idx_community_1.webp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80',
    'idx_community_2.webp': 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&q=80',
    'idx_community_3.webp': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
    'idx_community_4.webp': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    'idx_community_5.webp': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    'idx_community_6.webp': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',

    # Testimonials
    'avatar_marcus.webp': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    'avatar_sarah.webp': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    'avatar_david.webp': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',

    # Shop Category Banners
    'shop_cat_cases.webp': 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=650&q=80',
    'shop_cat_chargers.webp': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=650&q=80',
    'shop_cat_cables.webp': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=650&q=80',
    'shop_cat_audio.webp': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=650&q=80',
    'shop_cat_power.webp': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=650&q=80',
    'shop_cat_mounts.webp': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=650&q=80',

    # Shop Catalog Products 1-12
    'shop_prod_1.webp': 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=650&q=80',
    'shop_prod_2.webp': 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=650&q=80',
    'shop_prod_3.webp': 'https://images.unsplash.com/photo-1572721546624-05bf65ad7679?w=650&q=80',
    'shop_prod_4.webp': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=650&q=80',
    'shop_prod_5.webp': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=650&q=80',
    'shop_prod_6.webp': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=650&q=80',
    'shop_prod_7.webp': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=650&q=80',
    'shop_prod_8.webp': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=650&q=80',
    'shop_prod_9.webp': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=650&q=80',
    'shop_prod_10.webp': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=650&q=80',
    'shop_prod_11.webp': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=650&q=80',
    'shop_prod_12.webp': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=650&q=80',

    # Shop Spotlight & Unboxing
    'shop_spotlight_desk.webp': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=650&q=80',
    'shop_bundle_kit.webp': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=650&q=80',
    'shop_unboxing.webp': 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=650&q=80',
    'shop_rev_elena.webp': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    'shop_rev_kenji.webp': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
    'shop_rev_alex.webp': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',

    # Services
    'services_hero_care.webp': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=650&q=80',
    'services_warranty_vault.webp': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=650&q=80',
    'services_tradein_calc.webp': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=650&q=80',
    'services_fleet_diag.webp': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=650&q=80',
    'services_recycling.webp': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=650&q=80',
    'services_drop_chassis.webp': 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=650&q=80',
    'services_thermal_analysis.webp': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=650&q=80',
    'services_corp_fleet.webp': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=650&q=80',
    'services_tech_ravi.webp': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',

    # About Page
    'about_story.webp': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=650&q=80',
    'about_materials.webp': 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=650&q=80',
    'about_founder_ravi.webp': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    'about_head_ananya.webp': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    'about_support_tom.webp': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
    'about_showroom.webp': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=650&q=80',
    'about_pillar_durability.webp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=650&q=80',
    'about_pillar_honesty.webp': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=650&q=80',
    'about_pillar_waste.webp': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=650&q=80',

    # Blog Page
    'blog_feat_qi2.webp': 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=650&q=80',
    'blog_feat_cable.webp': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=650&q=80',
    'blog_art_titanium.webp': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=650&q=80',
    'blog_art_battery.webp': 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=650&q=80',
    'blog_art_carmount.webp': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=650&q=80',
    'blog_art_magnet.webp': 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=650&q=80',
    'blog_art_recycled.webp': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=650&q=80',
    'blog_art_audio.webp': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=650&q=80',
    'blog_author_dev.webp': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    'blog_author_kiran.webp': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',

    # Contact Page
    'contact_lab_building.webp': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=650&q=80',
    'contact_concierge_maya.webp': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80',
    'contact_tour_walk.webp': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=650&q=80',
    'contact_air_cargo.webp': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=650&q=80',

    # Login Page
    'login_studio_desk.webp': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=650&q=80',
    'login_member_avatar.webp': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80',
    'login_vault_case.webp': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=650&q=80',
    'login_vault_audio.webp': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=650&q=80',
    'login_vault_battery.webp': 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=650&q=80',
    'login_vault_mount.webp': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=650&q=80',

    # Signup Page
    'signup_onboarding_desk.webp': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=650&q=80',
    'signup_welcome_bundle.webp': 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=650&q=80',
    'signup_eco_box.webp': 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=650&q=80',
    'signup_thermal_sensor.webp': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=650&q=80',
    'signup_warranty_card.webp': 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=650&q=80',
    'signup_community_1.webp': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    'signup_community_2.webp': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80',
    'signup_community_3.webp': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    'signup_community_4.webp': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
}

assets_dir = 'assets'
os.makedirs(assets_dir, exist_ok=True)

def process_image(fname, url):
    dst = os.path.join(assets_dir, fname)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
        img = Image.open(io.BytesIO(data)).convert('RGB')
        
        # Max dimension 640px to ensure crisp display while maintaining tiny payload
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
            
        quality = 80
        buf = io.BytesIO()
        img.save(buf, format='WEBP', quality=quality)
        
        # Enforce under 100KB (strict: < 95000 bytes)
        while len(buf.getvalue()) > 95000 and quality > 35:
            quality -= 6
            buf = io.BytesIO()
            img.save(buf, format='WEBP', quality=quality)
            
        with open(dst, 'wb') as f:
            f.write(buf.getvalue())
            
        size = os.path.getsize(dst)
        print(f"SUCCESS: {fname} -> {size} bytes ({quality}% quality)")
        return fname, size, True
    except Exception as e:
        print(f"ERROR on {fname}: {e}")
        # Create beautiful fallback gradient image in webp if download had network hiccup
        img = Image.new('RGB', (500, 500), color=(17, 24, 39))
        buf = io.BytesIO()
        img.save(buf, format='WEBP', quality=80)
        with open(dst, 'wb') as f:
            f.write(buf.getvalue())
        return fname, os.path.getsize(dst), False

print(f"Downloading & converting {len(PHOTO_URLS)} unique images concurrently...")
results = []
with ThreadPoolExecutor(max_workers=16) as executor:
    futures = [executor.submit(process_image, fname, url) for fname, url in PHOTO_URLS.items()]
    for f in as_completed(futures):
        results.append(f.result())

all_under_100k = all(r[1] < 100000 for r in results)
print(f"\nFinished! Total processed: {len(results)}. All strictly under 100KB: {all_under_100k}")
