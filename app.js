// ==========================================
// STACKLY — EXACT UI/UX GSAP ANIMATIONS & LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Register GSAP plugins
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Strictly route animations based on active page to eliminate duplicate timeline conflicts
  const path = window.location.pathname.toLowerCase();
  const pageFile = path.split('/').pop() || 'index.html';
  const isHome = pageFile === '' || pageFile === 'index.html' || path.endsWith('/') || path.endsWith('mobile-accessories-store-figma-project');

  if (isHome) {
    initGSAPAnimations();
  } else {
    initRemainingPagesGSAP();
  }

  initCart();
  initDeviceCompatibility();
  initTiltEffect();
  initMagneticButtons();
  if (typeof window.applyCatalogFilters === 'function') {
    window.applyCatalogFilters();
  }
});

// ==========================================
// 1. GSAP ENTRANCE & SCROLL ANIMATIONS
// ==========================================
function initGSAPAnimations() {
  // Header slide down
  gsap.from('.header-nav', {
    y: -25,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });

  // Hero Section Entrance (Safely sequenced so hero image card is never killed or stuck at opacity 0)
  const heroCard = document.querySelector('.hero-image-card');
  if (heroCard) {
    heroCard.style.opacity = '1';
    heroCard.style.visibility = 'visible';
  }

  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      // Start floating loop ONLY after entrance timeline completes
      if (document.querySelector('.hero-image-card')) {
        gsap.to('.hero-image-card', {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }
  });

  heroTl
    .fromTo('.hero-text-col > *',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.09,
        delay: 0.05,
        clearProps: 'transform,opacity'
      }
    )
    .fromTo('.hero-image-card',
      { scale: 0.96, y: 20 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'transform'
      },
      '-=0.45'
    )
    .fromTo('.stat-item',
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        clearProps: 'transform,opacity'
      },
      '-=0.3'
    );

  // Category Cards Horizontal Left & Right Entrance
  gsap.from('.category-card:nth-child(-n+3)', {
    x: -60,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '.category-section',
      start: 'top 88%'
    }
  });

  gsap.from('.category-card:nth-child(n+4)', {
    x: 60,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '.category-section',
      start: 'top 88%'
    }
  });

  // ========================================================
  // HORIZONTAL LEFT & HORIZONTAL RIGHT SCROLLING IMAGE ANIMATIONS
  // ========================================================
  
  // Row 1: Earbuds Image scrolls horizontally from LEFT, Text from RIGHT
  const row1 = document.querySelector('.feature-row:nth-child(1)');
  if (row1) {
    const imgCol1 = row1.querySelector('.feature-img-col');
    const textCol1 = row1.querySelector('.feature-text-col');
    gsap.fromTo(imgCol1, 
      { x: -100, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row1,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
    gsap.fromTo(textCol1, 
      { x: 80, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row1,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
  }

  // Row 2: Red Headphone Image scrolls horizontally from RIGHT, Text from LEFT
  const row2 = document.querySelector('.feature-row:nth-child(2)');
  if (row2) {
    const textCol2 = row2.querySelector('.feature-text-col');
    const imgCol2 = row2.querySelector('.feature-img-col');
    gsap.fromTo(imgCol2, 
      { x: 100, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row2,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
    gsap.fromTo(textCol2, 
      { x: -80, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row2,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
  }

  // Row 3: Black Headphone Image scrolls horizontally from LEFT, Text from RIGHT
  const row3 = document.querySelector('.feature-row:nth-child(3)');
  if (row3) {
    const imgCol3 = row3.querySelector('.feature-img-col');
    const textCol3 = row3.querySelector('.feature-text-col');
    gsap.fromTo(imgCol3, 
      { x: -100, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row3,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
    gsap.fromTo(textCol3, 
      { x: 80, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row3,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.2
        }
      }
    );
  }

  // Section 1: Product cards glide smoothly horizontally towards the left
  gsap.fromTo('#featured-gear .product-item', 
    { x: 70, opacity: 0.7 },
    {
      x: 0,
      opacity: 1,
      ease: 'power1.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '#featured-gear',
        start: 'top 90%',
        end: 'top 40%',
        scrub: 1.2
      }
    }
  );

  // Section 2: Product cards glide smoothly horizontally towards the right
  gsap.fromTo('#magsafe-series .product-item', 
    { x: -70, opacity: 0.7 },
    {
      x: 0,
      opacity: 1,
      ease: 'power1.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '#magsafe-series',
        start: 'top 90%',
        end: 'top 40%',
        scrub: 1.2
      }
    }
  );

  // Bestsellers Horizontal Left & Horizontal Right Image Scrolling Animations
  gsap.fromTo('.bestseller-row-left',
    { x: -90, opacity: 0.7 },
    {
      x: 0,
      opacity: 1,
      ease: 'power2.out',
      stagger: 0.1,
      clearProps: 'transform',
      scrollTrigger: {
        trigger: '.bestsellers-section',
        start: 'top 90%',
        end: 'top 40%',
        scrub: 1.2
      }
    }
  );

  gsap.fromTo('.bestseller-row-right',
    { x: 90, opacity: 0.7 },
    {
      x: 0,
      opacity: 1,
      ease: 'power2.out',
      stagger: 0.1,
      clearProps: 'transform',
      scrollTrigger: {
        trigger: '.bestsellers-section',
        start: 'top 90%',
        end: 'top 40%',
        scrub: 1.2
      }
    }
  );

  // ========================================================
  // 5. INTERACTIVE ENGINEERING LAB ("Why people choose Stackly")
  // Left stage scrolls from LEFT, Right telemetry console from RIGHT
  // ========================================================
  if (document.querySelector('.why-choose-section')) {
    // Header & Status badge entrance
    gsap.fromTo('.why-choose-section > div:first-child > *',
      { y: 35, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-choose-section',
          start: 'top 88%',
          end: 'top 55%',
          scrub: 1.2
        }
      }
    );

    // Engineering Tab Controls glide horizontally from LEFT
    gsap.fromTo('#engineering-tabs button',
      { x: -50, opacity: 0.5 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#engineering-tabs',
          start: 'top 92%',
          end: 'top 65%',
          scrub: 1.2
        }
      }
    );

    // Interactive Bento Studio: Left Stage from LEFT, Right Console from RIGHT
    const dropStage = document.querySelector('.why-choose-section #tab-drop-lab .lg\\:col-span-7');
    const dropConsole = document.querySelector('.why-choose-section #tab-drop-lab .lg\\:col-span-5');

    if (dropStage && dropConsole) {
      gsap.fromTo(dropStage,
        { x: -90, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#engineering-viewport',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(dropConsole,
        { x: 90, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#engineering-viewport',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2
          }
        }
      );
    }
  }

  // ========================================================
  // 6. SMART DEVICE COMPATIBILITY MATRIX SECTION
  // Chips glide from LEFT, Matched Gear cards glide from RIGHT
  // ========================================================
  if (document.querySelector('.compatibility-section')) {
    // Header entrance
    gsap.fromTo('.compatibility-section > div:first-child > *',
      { y: 35, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.compatibility-section',
          start: 'top 88%',
          end: 'top 55%',
          scrub: 1.2
        }
      }
    );

    // Device Chips horizontal glide from LEFT
    gsap.fromTo('#device-selector-chips .device-chip',
      { x: -60, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.06,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#device-selector-chips',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1.2
        }
      }
    );

    // Container Header
    const matchedHeaderLeft = document.querySelector('#compatible-gear-container .flex.items-center.gap-3');
    const matchedHeaderRight = document.querySelector('#compatible-gear-container .text-teal-800.bg-teal-50');
    if (matchedHeaderLeft) {
      gsap.fromTo(matchedHeaderLeft,
        { x: -50, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#compatible-gear-container',
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1.2
          }
        }
      );
    }
    if (matchedHeaderRight) {
      gsap.fromTo(matchedHeaderRight,
        { x: 50, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#compatible-gear-container',
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1.2
          }
        }
      );
    }

    // Matched Gear Cards glide smoothly horizontally from RIGHT
    gsap.fromTo('#matched-products-grid > div',
      { x: 70, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power1.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#matched-products-grid',
          start: 'top 90%',
          end: 'top 45%',
          scrub: 1.2
        }
      }
    );
  }

  // ========================================================
  // 7. REAL FIELD REVIEWS (CUSTOMER TESTIMONIALS)
  // Left quote from LEFT, Right verified gear card from RIGHT
  // ========================================================
  if (document.querySelector('.reviews-section')) {
    // Header & ratings badge entrance
    gsap.fromTo('.reviews-section > div:first-child > *',
      { y: 35, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.reviews-section',
          start: 'top 88%',
          end: 'top 55%',
          scrub: 1.2
        }
      }
    );

    // Category filter pills glide from LEFT
    gsap.fromTo('#review-category-filters button',
      { x: -50, opacity: 0.6 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#review-category-filters',
          start: 'top 90%',
          end: 'top 65%',
          scrub: 1.2
        }
      }
    );

    // Review Slide 0: Left quote from LEFT, Right verified gear card from RIGHT
    const reviewQuoteCol = document.querySelector('#review-slide-0 .lg\\:col-span-7');
    const reviewGearCol = document.querySelector('#review-slide-0 .lg\\:col-span-5');

    if (reviewQuoteCol && reviewGearCol) {
      gsap.fromTo(reviewQuoteCol,
        { x: -90, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#reviews-viewport',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(reviewGearCol,
        { x: 90, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#reviews-viewport',
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2
          }
        }
      );
    }
  }

  // ========================================================
  // 8. COMMUNITY EDC PHOTO GALLERY (#STACKLYEveryday)
  // Left 3 cards glide from LEFT, Right 3 cards glide from RIGHT
  // ========================================================
  const communitySec = document.querySelector('.community-feed-section') || document.querySelector('section:has(.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-6)');
  if (communitySec) {
    // Header
    gsap.fromTo(communitySec.children[0],
      { y: 35, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: communitySec,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1.2
        }
      }
    );

    const commGrid = communitySec.querySelector('.grid');
    if (commGrid) {
      gsap.fromTo(commGrid.querySelectorAll(':scope > div:nth-child(-n+3)'),
        { x: -70, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.08,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: commGrid,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 1.2
          }
        }
      );

      gsap.fromTo(commGrid.querySelectorAll(':scope > div:nth-child(n+4)'),
        { x: 70, opacity: 0.6 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.08,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: commGrid,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 1.2
          }
        }
      );
    }
  }

  // ========================================================
  // 9. NEWSLETTER / EARLY ACCESS SECTION
  // Smooth scale up & glide up entrance
  // ========================================================
  if (document.querySelector('.newsletter-section')) {
    gsap.fromTo('.newsletter-section > div',
      { scale: 0.94, y: 50, opacity: 0.6 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.newsletter-section',
          start: 'top 90%',
          end: 'top 55%',
          scrub: 1.2
        }
      }
    );

    gsap.fromTo('#newsletter-form > *',
      { y: 20, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#newsletter-form',
          start: 'top 92%',
          end: 'top 65%',
          scrub: 1.2
        }
      }
    );
  }

  // ========================================================
  // 10. MODERN FOOTER ENTRANCE
  // Staggered column entrance
  // ========================================================
  if (document.querySelector('footer')) {
    gsap.fromTo('footer .grid > div',
      { y: 30, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 95%',
          end: 'top 75%',
          scrub: 1.2
        }
      }
    );
  }

  // Engineering Studio UI/UX Interactive Tabs
  initEngineeringStudio();

  // Testimonials Interactive Carousel UI/UX
  initReviewCarousel();
}

// ==========================================
// INTERACTIVE ENGINEERING STUDIO UI/UX
// ==========================================
function initEngineeringStudio() {
  const tabs = document.querySelectorAll('.eng-tab-btn');
  const panels = document.querySelectorAll('.eng-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `tab-${tab.getAttribute('data-tab')}`;
      
      // Update Tab Styles
      tabs.forEach(t => {
        t.classList.remove('active', 'bg-neutral-900', 'text-white');
        t.classList.add('text-neutral-700');
      });
      tab.classList.add('active', 'bg-neutral-900', 'text-white');
      tab.classList.remove('text-neutral-700');

      // Crossfade Panels with GSAP
      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove('hidden');
          p.classList.add('block');
          gsap.fromTo(p, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        } else {
          p.classList.add('hidden');
          p.classList.remove('block');
        }
      });

      if (window.lucide) lucide.createIcons();
    });
  });
}

// 1. Drop Impact Simulator
window.runDropSimulation = function () {
  const stage = document.getElementById('drop-chassis-stage');
  const forceReadout = document.getElementById('hud-force-readout');
  const statusReadout = document.getElementById('hud-status-readout');
  const helperText = document.getElementById('sim-helper-text');
  const btn = document.getElementById('simulate-drop-btn');

  if (!stage) return;

  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Running Impact Test...`;
  if (window.lucide) lucide.createIcons();

  // GSAP chassis shudder & impact recoil
  gsap.timeline()
    .to(stage, { y: -12, duration: 0.08, ease: 'power1.out' })
    .to(stage, { y: 18, duration: 0.06, ease: 'power3.in' })
    .to(stage, { x: -8, y: -4, duration: 0.05 })
    .to(stage, { x: 8, y: 3, duration: 0.05 })
    .to(stage, { x: -4, y: -2, duration: 0.05 })
    .to(stage, { x: 0, y: 0, duration: 0.25, ease: 'elastic.out(1, 0.3)' });

  // Update telemetry
  const randomG = (14.8 + Math.random() * 2.2).toFixed(1);
  if (forceReadout) forceReadout.textContent = `${randomG} G-FORCE IMPACT`;
  if (statusReadout) statusReadout.textContent = `100% REBOUND ENERGY • 0 DEFLECTION`;
  if (helperText) {
    helperText.textContent = `✅ Drop cycle successful. Telemetry logged to diagnostic bus.`;
    helperText.classList.add('text-teal-600', 'font-bold');
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="play" class="w-4 h-4 fill-white text-white"></i> <span>Simulate 15ft Drop Impact</span>`;
    if (window.lucide) lucide.createIcons();
  }, 1200);

  showToast(`Drop test simulated: ${randomG}G impact fully absorbed.`);
};

// 2. Impact Angle Chips
window.setImpactAngle = function (angle) {
  const chips = document.querySelectorAll('.angle-chip');
  chips.forEach(c => {
    c.classList.remove('active', 'bg-neutral-900', 'text-white');
    c.classList.add('bg-neutral-50', 'text-neutral-700');
  });

  const activeBtn = event.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-neutral-900', 'text-white');
    activeBtn.classList.remove('bg-neutral-50', 'text-neutral-700');
  }

  const dot = document.getElementById('impact-core-dot');
  if (dot) {
    if (angle === '45deg') gsap.to(dot, { x: 30, y: -30, duration: 0.3 });
    else if (angle === 'facedown') gsap.to(dot, { x: 0, y: 0, duration: 0.3 });
    else if (angle === 'edge90') gsap.to(dot, { x: -40, y: 20, duration: 0.3 });
  }
};

// 3. Materials Toggle
let materialToggleState = false;
window.toggleMaterialMode = function () {
  materialToggleState = !materialToggleState;
  const btn = document.getElementById('material-toggle-btn');
  if (btn) {
    btn.textContent = materialToggleState ? 'Reset View' : 'Toggle Comparison';
  }
  showToast(materialToggleState ? 'Comparing carbon lifecycle: 92% footprint reduction' : 'Showing standard material baseline');
};

// 4. Ergonomic Hotspot Inspector
window.inspectHotspot = function (type) {
  const title = document.getElementById('hotspot-title');
  const desc = document.getElementById('hotspot-desc');
  const pill = document.getElementById('hotspot-target-pill');
  const box = document.getElementById('hotspot-detail-box');

  if (!box) return;

  if (type === 'palm') {
    pill.textContent = 'BEACON #1 SELECTED';
    title.textContent = '14.2° Anatomical Palm Arc';
    desc.textContent = 'Curved taper redistributes phone weight towards the index pivot, reducing thumb fatigue by 44% during continuous typing.';
  } else if (type === 'buttons') {
    pill.textContent = 'BEACON #2 SELECTED';
    title.textContent = 'Independent Microswitch Buttons';
    desc.textContent = 'Crafted from anodized CNC aluminum with 160g tactile actuation force for satisfying mechanical click response.';
  } else if (type === 'magsafe') {
    pill.textContent = 'BEACON #3 SELECTED';
    title.textContent = '1,200 Gauss Halbach Magnet Array';
    desc.textContent = '38 custom neodymium magnets precisely angled to deliver 2.4x stronger magnetic holding force than standard phone cases.';
  }

  gsap.fromTo(box, { scale: 0.96, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' });
};

// 5. Qi2 Charging Rate Selector
window.setQi2Rate = function (watts) {
  const chips = document.querySelectorAll('.qi2-rate-chip');
  chips.forEach(c => {
    c.classList.remove('active', 'bg-neutral-900', 'text-white');
    c.classList.add('bg-neutral-50', 'text-neutral-700');
  });

  const activeBtn = event.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-neutral-900', 'text-white');
    activeBtn.classList.remove('bg-neutral-50', 'text-neutral-700');
  }

  const readout = document.getElementById('qi2-wattage-readout');
  if (readout) {
    readout.textContent = `${watts}.0W ${watts === 15 ? 'MAX RAPID' : 'STANDARD'}`;
    gsap.fromTo(readout, { scale: 0.9 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
  }

  showToast(`Qi2 coil configured to ${watts}W charging standard.`);
};

// ==========================================
// INTERACTIVE CUSTOMER PROOF CAROUSEL UI/UX
// ==========================================
let currentReviewIdx = 0;
const totalReviewSlides = 3;

function initReviewCarousel() {
  updateReviewSlide(0);
}

function updateReviewSlide(idx) {
  currentReviewIdx = idx;
  const slides = document.querySelectorAll('.review-slide');
  const numDisplay = document.getElementById('review-current-num');
  const quickPills = document.querySelectorAll('.review-quick-pill');

  if (numDisplay) {
    numDisplay.textContent = `0${idx + 1}`;
  }

  slides.forEach((slide, i) => {
    if (i === idx) {
      slide.classList.remove('hidden');
      slide.classList.add('block');
      gsap.fromTo(slide, { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' });
    } else {
      slide.classList.add('hidden');
      slide.classList.remove('block');
    }
  });

  // Highlight corresponding quick pill
  quickPills.forEach((pill, i) => {
    if (i === idx) {
      pill.classList.remove('border-neutral-200');
      pill.classList.add('border-neutral-900', 'ring-2', 'ring-neutral-900/10');
    } else {
      pill.classList.remove('border-neutral-900', 'ring-2', 'ring-neutral-900/10');
      pill.classList.add('border-neutral-200');
    }
  });

  if (window.lucide) lucide.createIcons();
}

window.nextReview = function () {
  const nextIdx = (currentReviewIdx + 1) % totalReviewSlides;
  updateReviewSlide(nextIdx);
};

window.prevReview = function () {
  const prevIdx = (currentReviewIdx - 1 + totalReviewSlides) % totalReviewSlides;
  updateReviewSlide(prevIdx);
};

window.jumpToReview = function (idx) {
  updateReviewSlide(idx);
};

window.filterReviewCategory = function (cat) {
  const chips = document.querySelectorAll('.review-filter-chip');
  chips.forEach(c => {
    c.classList.remove('active', 'bg-neutral-900', 'text-white');
    c.classList.add('bg-white', 'text-neutral-700');
  });

  const activeBtn = event.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-neutral-900', 'text-white');
    activeBtn.classList.remove('bg-white', 'text-neutral-700');
  }

  if (cat === 'all') updateReviewSlide(0);
  else if (cat === 'cases') updateReviewSlide(0);
  else if (cat === 'chargers') updateReviewSlide(1);
  else if (cat === 'audio') updateReviewSlide(2);
};

window.toggleHelpful = function (btn) {
  const numSpan = btn.querySelector('.vote-number');
  if (numSpan) {
    let count = parseInt(numSpan.textContent, 10);
    if (!btn.dataset.voted) {
      count += 1;
      numSpan.textContent = count;
      btn.dataset.voted = "true";
      btn.classList.add('bg-teal-50', 'text-teal-700', 'border-teal-300');
      gsap.fromTo(btn, { scale: 0.9 }, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.2 });
      showToast('Thank you! Your feedback helps other verified buyers.');
    } else {
      count -= 1;
      numSpan.textContent = count;
      delete btn.dataset.voted;
      btn.classList.remove('bg-teal-50', 'text-teal-700', 'border-teal-300');
    }
  }
};

window.quickAddToCart = function (title, price, img) {
  const product = {
    id: 'gear-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: title,
    title: title,
    price: price,
    img: img
  };
  addToCart(product);
};

// ==========================================
// 2. SHOPPING CART STATE & LOGIC
// ==========================================
let cart = [];

function initCart() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const backdrop = document.getElementById('cart-backdrop');
  const drawer = document.getElementById('cart-drawer');
  const panel = document.getElementById('cart-panel');

  function openCart() {
    if (!drawer || !panel) {
      window.location.href = 'shop.html';
      return;
    }
    drawer.classList.remove('hidden');
    void drawer.offsetWidth;
    drawer.classList.remove('opacity-0', 'pointer-events-none');
    drawer.classList.add('opacity-100', 'pointer-events-auto');
    if (backdrop) {
      backdrop.classList.remove('pointer-events-none');
      backdrop.classList.add('pointer-events-auto');
    }
    panel.classList.remove('translate-x-full');
  }

  function closeCart() {
    if (!drawer || !panel) return;
    drawer.classList.remove('opacity-100', 'pointer-events-auto');
    drawer.classList.add('opacity-0', 'pointer-events-none');
    if (backdrop) {
      backdrop.classList.remove('pointer-events-auto');
      backdrop.classList.add('pointer-events-none');
    }
    panel.classList.add('translate-x-full');
    setTimeout(() => {
      if (drawer.classList.contains('opacity-0')) {
        drawer.classList.add('hidden');
      }
    }, 300);
  }

  if (openBtn) openBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);

  window.openCartDrawer = openCart;
  window.closeCartDrawer = closeCart;
}

window.addToCart = function (product) {
  product.name = product.name || product.title || 'Accessory';
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  showToast(`Added ${product.name} to cart`);

  // Animate cart badge if present
  if (document.getElementById('cart-count-badge')) {
    gsap.fromTo('#cart-count-badge', 
      { scale: 1.5 }, 
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    );
  }
};

window.updateQty = function (id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
};

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const countBadge = document.getElementById('cart-count-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  const subtotalEl = document.getElementById('cart-subtotal-price');

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (countBadge) countBadge.textContent = totalItems;
  document.querySelectorAll('.cart-count-badge').forEach(b => b.textContent = totalItems);
  if (drawerCount) drawerCount.textContent = `${totalItems} items`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    container.innerHTML = `
      <div id="empty-cart-msg" class="py-12 text-center text-neutral-400 space-y-1">
        <p class="text-xs font-semibold text-neutral-700">Your cart is currently empty</p>
        <p class="text-[11px]">Click "+" on any item to add it to your order.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
      <img src="${item.img}" class="w-12 h-12 rounded-lg object-cover bg-neutral-200 flex-shrink-0" alt="${item.name}">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-bold text-neutral-900 truncate">${item.name}</h5>
        <p class="text-xs font-bold text-neutral-700">$${item.price}</p>
        <div class="flex items-center gap-2 mt-1.5">
          <button onclick="updateQty('${item.id}', -1)" class="w-5 h-5 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 text-xs">-</button>
          <span class="text-xs font-semibold text-neutral-800">${item.qty}</span>
          <button onclick="updateQty('${item.id}', 1)" class="w-5 h-5 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 text-xs">+</button>
        </div>
      </div>
      <button onclick="updateQty('${item.id}', -${item.qty})" class="p-1 text-neutral-400 hover:text-red-500 transition-colors">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.handleCheckout = function () {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add accessories first.');
    return;
  }
  showToast('Proceeding to checkout...');
  setTimeout(() => {
    alert('Thank you for shopping at Stackly! Order simulation complete.');
  }, 500);
};

// ==========================================
// 3. DEVICE COMPATIBILITY SELECTOR & LIVE MATCHER
// ==========================================
const deviceCatalog = {
  'iphone-16-pro': {
    title: 'Accessories for iPhone 16 Pro Max',
    avatar: 'assets/dev_iphone16pro.webp',
    status: 'Selected: iPhone 16 Pro Max',
    products: [
      { name: 'Tactix Titanium Armor Case', cat: 'Precision Protection', desc: 'Laser cut for titanium frame & MagSafe array', price: 49, tag: '12ft Drop', img: 'assets/idx_dev_ip16p_case.webp' },
      { name: 'Orbit Qi2 Wireless Desk Dock', cat: 'Rapid Inductive', desc: 'Weighted magnetic stand for landscape StandBy mode', price: 89, tag: 'Qi2 15W', img: 'assets/idx_dev_ip16p_dock.webp' },
      { name: 'TitanFlex Sapphire Lens Guard', cat: 'Optical Grade', desc: '9H diamond hardness coating with anti-reflective ring', price: 29, tag: 'Sapphire Fit', img: 'assets/idx_dev_ip16p_lens.webp' }
    ]
  },
  'iphone-16': {
    title: 'Accessories for iPhone 16 & iPhone 15',
    avatar: 'assets/dev_iphone16.webp',
    status: 'Selected: iPhone 16 / 15',
    products: [
      { name: 'Liquid Touch Silicone Case', cat: 'Daily Defense', desc: 'Microfiber interior with reinforced camera lip ring', price: 39, tag: 'Slim MagSafe', img: 'assets/idx_dev_ip16_case.webp' },
      { name: 'MagSafe Leather Card Wallet', cat: 'Precision Leather', desc: 'Shielded RFID lining with strong dual magnetic grip', price: 35, tag: 'MagSafe', img: 'assets/idx_dev_ip16_wallet.webp' },
      { name: 'SnapMag 10K Battery Pack', cat: 'Portable Power', desc: 'Ultra-thin pocket battery with dynamic status LED', price: 65, tag: '10,000mAh', img: 'assets/idx_dev_ip16_battery.webp' }
    ]
  },
  's24-ultra': {
    title: 'Accessories for Galaxy S24 Ultra',
    avatar: 'assets/dev_s24ultra.webp',
    status: 'Selected: Galaxy S24 Ultra',
    products: [
      { name: 'Apex Galaxy Rugged Armor Frame', cat: 'Heavy Duty', desc: 'S-Pen cutout with shock absorbing honeycomb TPU', price: 48, tag: 'Armor Lock', img: 'assets/idx_dev_s24_case.webp' },
      { name: 'Fast Inductive Wireless Desk Pad', cat: 'Qi Fast Charge', desc: 'Non-slip silicone ring with active LED indicator', price: 45, tag: '15W Fast', img: 'assets/idx_dev_s24_stand.webp' },
      { name: '45W PPS Super Fast Wall Charger', cat: 'Samsung PPS', desc: 'Zero heat GaN design certified for 0-70% in 30 minutes', price: 39, tag: '45W Max', img: 'assets/idx_dev_s24_charger.webp' }
    ]
  },
  'pixel-9': {
    title: 'Accessories for Google Pixel 9 Pro',
    avatar: 'assets/dev_pixel9pro.webp',
    status: 'Selected: Pixel 9 Pro',
    products: [
      { name: 'Pixel Shield Visor Case', cat: 'Camera Protection', desc: 'Elevated bar coverage protecting camera optics', price: 42, tag: 'Visor Guard', img: 'assets/idx_dev_px9_case.webp' },
      { name: 'Qi2 Horizon Desktop Stand', cat: 'Wireless Stand', desc: 'Ergonomic tilt ideal for Google Assistant desk display', price: 79, tag: 'Qi2 Wireless', img: 'assets/idx_dev_px9_stand.webp' },
      { name: 'Kevlar Type-C Fast Cord', cat: 'Reinforced Cable', desc: 'High-amperage alloy wire with braided jacket', price: 25, tag: '100W PD', img: 'assets/idx_dev_px9_cable.webp' }
    ]
  },
  'oneplus-12': {
    title: 'Accessories for OnePlus 12',
    avatar: 'assets/dev_oneplus12.webp',
    status: 'Selected: OnePlus 12',
    products: [
      { name: 'Carbon Weave Hybrid Case', cat: 'Lightweight Fit', desc: 'Tactile grip edges with circular camera module shield', price: 38, tag: 'Carbon Weave', img: 'assets/idx_dev_op12_case.webp' },
      { name: 'SuperVOOC Fast Cable', cat: 'High Current', desc: 'Oxygen-free copper core rated for rapid current sync', price: 29, tag: 'SuperVOOC', img: 'assets/idx_dev_op12_cable.webp' },
      { name: 'Magnetic Auto Grip Car Mount', cat: 'Cockpit Mount', desc: 'High strength 360-degree ball joint with vent lock', price: 45, tag: 'Secure Vent', img: 'assets/idx_dev_op12_mount.webp' }
    ]
  },
  'ipad-pro': {
    title: 'Accessories for iPad Pro (M4 & M2)',
    avatar: 'assets/dev_ipadpro.webp',
    status: 'Selected: iPad Pro',
    products: [
      { name: 'Smart Folio Magnetic Stand', cat: 'Dual Viewing Angle', desc: 'Sleep/wake cover with pencil stylus magnetic retention', price: 69, tag: 'Magnetic Folio', img: 'assets/idx_dev_ipad_folio.webp' },
      { name: 'Studio Aluminum Stand & Dock', cat: 'Studio Ergonomics', desc: 'Precision pivot joint with weighted desktop foundation', price: 59, tag: 'Studio Pivot', img: 'assets/idx_dev_ipad_stand.webp' },
      { name: '100W 4-Port GaN Desktop Hub', cat: 'Power Hub', desc: 'Charges iPad, laptop and phone simultaneously', price: 89, tag: '100W Output', img: 'assets/idx_dev_ipad_hub.webp' }
    ]
  },
  'airpods': {
    title: 'Accessories for AirPods Pro & Max',
    avatar: 'assets/dev_airpodspro.webp',
    status: 'Selected: AirPods Pro',
    products: [
      { name: 'Armor Lock Rugged Pods Case', cat: 'Drop-Proof Pods', desc: 'Safety lock latch with aluminum carabiner clip', price: 29, tag: 'Drop Lock', img: 'assets/idx_dev_pods_case.webp' },
      { name: 'Snap Duo 2-in-1 Charging Mat', cat: 'Compact Dual Pad', desc: 'Dedicated indentation for AirPods wireless case', price: 49, tag: 'Dual Qi', img: 'assets/idx_dev_pods_pad.webp' },
      { name: 'Smart Utility Lanyard Strap', cat: 'Carry Anywhere', desc: 'Reinforced paracord cord with quick-release loop', price: 18, tag: 'Tactical', img: 'assets/idx_dev_pods_lanyard.webp' }
    ]
  }
};

window.selectDevice = function (deviceKey, el) {
  if (typeof window.handleDeviceClick === 'function') {
    window.handleDeviceClick(deviceKey, el);
    return;
  }
  const data = deviceCatalog[deviceKey];
  if (!data) return;

  // 1. Update Chips Active Style
  const chips = document.querySelectorAll('.device-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-device') === deviceKey || chip === el) {
      chip.className = "device-chip active pl-2 pr-4 py-2.5 rounded-full text-xs font-bold bg-neutral-900 text-white border border-neutral-900 shadow-md transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer ring-2 ring-neutral-900/20";
    } else {
      chip.className = "device-chip pl-2 pr-4 py-2.5 rounded-full text-xs font-bold bg-white text-neutral-700 border border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50 shadow-sm transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer";
    }
  });

  // 2. Update Header & Status
  const statusEl = document.getElementById('active-device-status-badge');
  const avatarEl = document.getElementById('matched-device-avatar');
  const titleEl = document.getElementById('matched-device-title');

  if (statusEl) statusEl.innerHTML = `Selected: <strong class="text-neutral-900">${data.title.replace('Accessories for ', '')}</strong>`;
  if (avatarEl) avatarEl.src = data.avatar;
  if (titleEl) titleEl.textContent = data.title;

  // 3. Render Matched Product Cards with clickable image zoom
  const grid = document.getElementById('matched-products-grid');
  if (grid) {
    grid.innerHTML = data.products.map(p => `
      <div class="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-lg transition-all flex flex-col justify-between group">
        <div onclick="openProductImageModal('${p.name}', '${p.img}', '${p.desc}', ${p.price})" class="relative rounded-xl overflow-hidden aspect-square mb-3 bg-white cursor-pointer group/img">
          <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500">
          <span class="absolute top-2 left-2 text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-md shadow-sm z-10">${p.tag}</span>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]">
            <i data-lucide="zoom-in" class="w-4 h-4 text-white"></i>
            <span>Click to Open Image</span>
          </div>
        </div>
        <div>
          <p class="text-[10px] font-bold uppercase tracking-wider text-teal-700 font-mono">${p.cat}</p>
          <h4 class="font-extrabold text-sm text-neutral-900 mt-0.5">${p.name}</h4>
          <p class="text-xs text-neutral-500 mt-1 leading-relaxed">${p.desc}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between gap-2">
          <span class="font-black text-sm text-neutral-900">$${p.price}</span>
          <div class="flex items-center gap-1.5">
            <button onclick="openProductImageModal('${p.name}', '${p.img}', '${p.desc}', ${p.price})" class="p-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-200 text-neutral-700 transition-colors" title="Open Image">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="window.location.href='404.html'" class="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Smooth scroll so the opened product images are immediately in view!
  const container = document.getElementById('compatible-gear-container');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Open product image modal
  if (data.products && data.products.length > 0) {
    openProductImageModal(data.products[0].name, data.products[0].img, data.products[0].desc, data.products[0].price);
  }

  if (window.lucide) lucide.createIcons();
  showToast(`Opened verified product images for ${data.title.replace('Accessories for ', '')}`);
};

// Lightbox Modal for viewing product images full size
window.openProductImageModal = function (title, imgSrc, price, desc) {
  const modal = document.getElementById('product-image-modal');
  if (!modal) return;

  const titleEl = document.getElementById('modal-product-title');
  const imgEl = document.getElementById('modal-product-img');
  const descEl = document.getElementById('modal-product-desc');
  const priceEl = document.getElementById('modal-product-price');
  const addBtn = document.getElementById('modal-add-btn');

  if (titleEl) titleEl.textContent = title;
  if (imgEl) imgEl.src = imgSrc;
  if (descEl) descEl.textContent = desc || "Precision fit guaranteed. Zero tolerance CNC hardware machining.";
  if (priceEl) priceEl.textContent = `${price}`;
  if (addBtn) {
    addBtn.onclick = () => {
      quickAddToCart(title, price, imgSrc);
      closeProductImageModal();
    };
  }

  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  if (window.gsap) {
    gsap.fromTo('#product-image-modal > div', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
  }
  if (window.lucide) lucide.createIcons();
};

window.closeProductImageModal = function () {
  const modal = document.getElementById('product-image-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    setTimeout(() => {
      if (modal.classList.contains('opacity-0')) {
        modal.classList.add('hidden');
      }
    }, 300);
  }
};

function initDeviceCompatibility() {
  const chips = document.querySelectorAll('.device-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      const dev = chip.getAttribute('data-device');
      if (dev) {
        if (typeof window.handleDeviceClick === 'function') {
          window.handleDeviceClick(dev, chip, true);
        } else {
          selectDevice(dev, chip, true);
        }
      }
    });
  });
}

// ==========================================
// 4. 3D TILT EFFECT ON CARDS
// ==========================================
function initTiltEffect() {
  const cardSelectors = [
    '.product-card',
    '.category-card',
    '.tilt-card',
    '.bento-hover-lift',
    '.figma-glass-card',
    '.figma-dark-card',
    '.ui-ux-card',
    '#products-grid > div',
    '#featured-gear .product-card',
    '.bento-grid > div',
    '.admin-metric-card',
    'article.rounded-3xl',
    'article.rounded-2xl',
    'section .group:has(img)',
    '.grid > div.rounded-2xl',
    '.grid > div.rounded-3xl'
  ].join(', ');

  const cards = document.querySelectorAll(cardSelectors);

  cards.forEach(card => {
    // Skip wide containers or header
    if (card.offsetWidth > 950 || card.classList.contains('header-nav') || card.id === 'hero') return;

    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform, box-shadow';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      gsap.to(card, {
        rotationY: xPct * 4.5,
        rotationX: -yPct * 4.5,
        y: -6,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.25,
        overwrite: 'auto'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        ease: 'power2.out',
        duration: 0.45,
        overwrite: 'auto'
      });
    });
  });
}

// ==========================================
// 5. MAGNETIC BUTTON EFFECT
// ==========================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

// ==========================================
// 6. TOAST UTILITY & SMOOTH SCROLL
// ==========================================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  clearTimeout(toastTimeout);

  if (window.gsap) {
    gsap.to(toast, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out'
    });
  } else {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }

  toastTimeout = setTimeout(() => {
    if (window.gsap) {
      gsap.to(toast, {
        y: 80,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      });
    } else {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(80px)';
    }
  }, 2200);
}
window.showToast = showToast;

window.handleSubscribe = function () {
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    showToast(`Subscribed ${emailInput.value}!`);
    emailInput.value = '';
  }
};

window.scrollToSection = function (id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

// ==========================================
// 7. AUTH MODAL (LOGIN & SIGNUP) & MOBILE NAV
// ==========================================
window.openAuthModal = function (tab = 'login') {
  window.location.href = tab === 'signup' ? 'signup.html' : 'login.html';
};

window.closeAuthModal = function () {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
  }
};

window.switchAuthTab = function (tab) {
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');
  const loginTabBtn = document.getElementById('auth-tab-login');
  const signupTabBtn = document.getElementById('auth-tab-signup');
  const title = document.getElementById('auth-modal-title');
  const subtitle = document.getElementById('auth-modal-subtitle');

  if (tab === 'login') {
    if (loginForm) loginForm.classList.remove('hidden');
    if (signupForm) signupForm.classList.add('hidden');
    if (loginTabBtn) {
      loginTabBtn.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all bg-white text-neutral-900 shadow-sm";
    }
    if (signupTabBtn) {
      signupTabBtn.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-neutral-500 hover:text-neutral-900";
    }
    if (title) title.textContent = "Welcome back to STACKLY";
    if (subtitle) subtitle.textContent = "Sign in to access your orders, warranties & device profiles.";
  } else {
    if (loginForm) loginForm.classList.add('hidden');
    if (signupForm) signupForm.classList.remove('hidden');
    if (signupTabBtn) {
      signupTabBtn.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all bg-white text-neutral-900 shadow-sm";
    }
    if (loginTabBtn) {
      loginTabBtn.className = "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-neutral-500 hover:text-neutral-900";
    }
    if (title) title.textContent = "Create your STACKLY Account";
    if (subtitle) subtitle.textContent = "Unlock 2-Year automatic warranties, early drop access & trade-in credits.";
  }
  if (window.lucide) lucide.createIcons();
};

window.handleAuthSubmit = function (e, type) {
  if (e) e.preventDefault();
  closeAuthModal();
  if (type === 'login') {
    showToast("Signed in successfully! Welcome back to STACKLY.");
  } else {
    showToast("Account created successfully! Welcome to STACKLY Club.");
  }
  const loginBtn = document.getElementById('nav-login-btn');
  const signupBtn = document.getElementById('nav-signup-btn');
  if (loginBtn) {
    loginBtn.textContent = "My Account";
    loginBtn.onclick = () => showToast("Account Dashboard: Active • 1 Order in Transit");
  }
  if (signupBtn) {
    signupBtn.innerHTML = `<span>Sign out</span>`;
    signupBtn.onclick = () => {
      showToast("Signed out of STACKLY.");
      setTimeout(() => location.reload(), 800);
    };
  }
};

window.toggleMobileMenu = function () {
  const menu = document.getElementById('mobile-nav-menu');
  if (!menu) return;
  menu.classList.toggle('hidden');
  if (!menu.classList.contains('hidden') && window.gsap) {
    gsap.fromTo(menu, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  }
  if (window.lucide) lucide.createIcons();
};


// ==========================================
// 1B. GSAP ANIMATIONS FOR REMAINING PAGES
// (Shop, Services, About, Blog, Contact, Login, Signup)
// ==========================================
function initRemainingPagesGSAP() {
  if (!window.gsap) return;
  const path = window.location.pathname.toLowerCase();
  const pageFile = path.split('/').pop() || 'index.html';
  if (pageFile === '' || pageFile === 'index.html' || path.endsWith('/') || path.endsWith('mobile-accessories-store-figma-project')) {
    return; // Strictly never run on Home Page!
  }
  const hasST = typeof ScrollTrigger !== 'undefined';

  // Determine active page
  const isShop = path.includes('shop') || !!document.getElementById('products-grid') || !!document.getElementById('catalog');
  const isAbout = path.includes('about') || !!document.getElementById('our-story') || !!document.getElementById('materials-section');
  const isServices = path.includes('services') || !!document.getElementById('warranty-checker') || !!document.getElementById('tradein-calculator');
  const isBlog = path.includes('blog') || !!document.getElementById('blog-grid');
  const isContact = path.includes('contact') || !!document.getElementById('contact-form') || !!document.getElementById('ticket-status');
  const isTargetPage = isShop || isAbout || isServices || isBlog || isContact;

  if (!isTargetPage) return;

  // ========================================================
  // 1. EXACT HOME PAGE: HEADER SLIDE DOWN
  // ========================================================
  gsap.from('.header-nav', {
    y: -25,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  });

  // ========================================================
  // 2. EXACT HOME PAGE: HERO SECTION ENTRANCE TIMELINE
  // ========================================================
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  const heroTextElements = document.querySelectorAll('.hero-text-col > *');
  if (heroTextElements.length > 0) {
    heroTl.from(heroTextElements, {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      delay: 0.1
    });
  }

  const heroImageCard = document.querySelector('.hero-image-card');
  if (heroImageCard) {
    heroTl.from(heroImageCard, {
      scale: 0.96,
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Continuous subtle floating animation (Exact match to Home Page)
    gsap.to(heroImageCard, {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  const statItems = document.querySelectorAll('.stat-item');
  if (statItems.length > 0) {
    heroTl.from(statItems, {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08
    }, '-=0.3');
  }

  // ========================================================
  // 3. EXACT HOME PAGE: HORIZONTAL LEFT & RIGHT SCROLL-SCRUB
  // Alternating horizontal scrub animations on all feature/split rows
  // ========================================================
  if (hasST) {
    const featureRows = document.querySelectorAll('.feature-row, section .grid-cols-1.lg\\:grid-cols-12');
    featureRows.forEach((row, idx) => {
      // Skip hero section itself
      if (row.closest('#hero') || row.id === 'hero') return;

      const children = Array.from(row.children).filter(el => el.classList.contains('lg:col-span-6') || el.classList.contains('lg:col-span-7') || el.classList.contains('lg:col-span-5'));
      if (children.length >= 2) {
        const leftCol = children[0];
        const rightCol = children[1];

        if (idx % 2 === 0) {
          // Even row: Left scrubs in from LEFT, Right scrubs in from RIGHT
          gsap.fromTo(leftCol,
            { x: -90, opacity: 0.6 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 38%',
                scrub: 1.2
              }
            }
          );
          gsap.fromTo(rightCol,
            { x: 90, opacity: 0.6 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 38%',
                scrub: 1.2
              }
            }
          );
        } else {
          // Odd row: Left scrubs in from RIGHT, Right scrubs in from LEFT
          gsap.fromTo(leftCol,
            { x: 80, opacity: 0.6 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 38%',
                scrub: 1.2
              }
            }
          );
          gsap.fromTo(rightCol,
            { x: -80, opacity: 0.6 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 38%',
                scrub: 1.2
              }
            }
          );
        }
      }
    });

    // ========================================================
    // 4. EXACT HOME PAGE: HORIZONTAL CATEGORY & CARD SLIDING
    // Cards on left half glide from LEFT, cards on right glide from RIGHT
    // ========================================================
    const cardGrids = document.querySelectorAll(
      '#products-grid, .category-section .grid, section .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4, section .grid-cols-1.md\\:grid-cols-3, #milestones .grid, #leadership .grid'
    );

    cardGrids.forEach(grid => {
      const cards = Array.from(grid.children);
      if (cards.length >= 2) {
        const mid = Math.ceil(cards.length / 2);
        const leftHalf = cards.slice(0, mid);
        const rightHalf = cards.slice(mid);

        gsap.from(leftHalf, {
          x: -60,
          opacity: 0.5,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%'
          }
        });

        gsap.from(rightHalf, {
          x: 60,
          opacity: 0.5,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%'
          }
        });
      }
    });
  }

  // ========================================================
  // 5. EXACT HOME PAGE: IMAGE ENTRANCE & HOVER ZOOM
  // ========================================================
  const allImages = document.querySelectorAll('section img, article img, main img, .bento-grid img');
  allImages.forEach((img) => {
    if (img.classList.contains('h-11') || img.classList.contains('h-12') || img.classList.contains('h-14') || img.alt === 'STACKLY') return;

    if (hasST) {
      gsap.fromTo(img, 
        { scale: 0.94, y: 20, opacity: 0.4 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: img,
            start: 'top 92%',
            once: true
          }
        }
      );
    }

    const cardParent = img.closest('.group, .product-card, .tilt-card, [class*="rounded-3xl"], [class*="rounded-2xl"]');
    if (cardParent) {
      cardParent.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.05, duration: 0.45, ease: 'power2.out' });
      });
      cardParent.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.45, ease: 'power2.out' });
      });
    }
  });

  // ========================================================
  // 6. EXACT HOME PAGE: STAT COUNTER NUMBERS ANIMATION
  // ========================================================
  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach(counter => {
    const rawVal = counter.getAttribute('data-target') || counter.textContent.replace(/[^0-9.]/g, '');
    const targetVal = parseFloat(rawVal);
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    if (isNaN(targetVal)) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetVal,
      duration: 1.8,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: counter,
        start: 'top 92%',
        once: true
      },
      onUpdate: () => {
        if (targetVal % 1 === 0) {
          counter.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
        } else {
          counter.textContent = prefix + obj.val.toFixed(1) + suffix;
        }
      }
    });
  });
}


window.bundleState = {
  case: { price: 48, name: 'Tactix Aramid Case Pro', img: 'assets/shop_prod_ip16_case.webp' },
  charger: { price: 89, name: 'Orbit Qi2 Multi-Coil Station', img: 'assets/shop_clean_charger.webp' },
  cable: { price: 28, name: 'TitanFlex 240W Braided Cable', img: 'assets/shop_prod_5.webp' }
};

window.selectBundleItem = function(category, price, name, imgSrc, btnEl) {
  window.bundleState[category] = { price: Number(price), name: name, img: imgSrc };

  // Update active pill UI
  const container = btnEl.parentElement;
  container.querySelectorAll('button').forEach(b => {
    b.classList.remove('border-teal-500', 'bg-teal-500/10', 'text-white');
    b.classList.add('border-neutral-700', 'bg-neutral-800/80', 'text-neutral-300');
  });
  btnEl.classList.remove('border-neutral-700', 'bg-neutral-800/80', 'text-neutral-300');
  btnEl.classList.add('border-teal-500', 'bg-teal-500/10', 'text-white');

  // Update preview image & title
  const previewImg = document.getElementById('bundle-preview-' + category);
  const previewTitle = document.getElementById('bundle-title-' + category);
  if (previewImg && imgSrc) previewImg.src = imgSrc;
  if (previewTitle && name) previewTitle.textContent = name;

  // Recalculate
  const subtotal = window.bundleState.case.price + window.bundleState.charger.price + window.bundleState.cable.price;
  const savings = Math.round(subtotal * 0.20);
  const finalPrice = subtotal - savings;

  const subtotalEl = document.getElementById('bundle-subtotal');
  const savingsEl = document.getElementById('bundle-savings');
  const totalEl = document.getElementById('bundle-total');

  if (subtotalEl) subtotalEl.textContent = '$' + subtotal + '.00';
  if (savingsEl) savingsEl.textContent = '-$' + savings + '.00';
  if (totalEl) {
    totalEl.textContent = '$' + finalPrice + '.00';
    if (window.gsap) {
      gsap.fromTo(totalEl, { scale: 1.15, color: '#2dd4bf' }, { scale: 1, color: '#ffffff', duration: 0.35 });
    }
  }
};

window.addCurrentBundleToCart = function() {
  const subtotal = window.bundleState.case.price + window.bundleState.charger.price + window.bundleState.cable.price;
  const savings = Math.round(subtotal * 0.20);
  const finalPrice = subtotal - savings;
  
  if (typeof window.showToast === 'function') {
    window.showToast('EDC Trio Bundle added! Saved $' + savings + '.00');
  }
  
  // Add as bundle item to cart
  const bundleCartItem = {
    id: 'bundle-trio-' + Date.now(),
    name: 'STACKLY EDC Trio (' + window.bundleState.case.name + ' + ' + window.bundleState.charger.name + ' + ' + window.bundleState.cable.name + ')',
    price: finalPrice,
    image: 'assets/shop_bundle_kit.webp',
    quantity: 1
  };
  
  if (window.cartItems) {
    window.cartItems.push(bundleCartItem);
    if (typeof window.updateCartDrawer === 'function') window.updateCartDrawer();
  }
};

// 2. Interactive Device Switcher for Specifications Matrix
window.specDeviceData = {
  'ip16': {
    name: 'iPhone 16 Pro Max',
    drop: '15ft Mil-Grade Lab Tested (100% Screen Intact)',
    magnet: '15N N52 Neodymium Ring (2.1x OEM strength)',
    thermal: 'Cryo-Passive Heat Sinks (-8°C Gaming Delta)',
    bezel: '1.8mm CNC Anodized Sapphire Camera Lip',
    dock: 'Magnetic Alignment with Qi2 15W Max'
  },
  's24': {
    name: 'Samsung Galaxy S24 Ultra',
    drop: '15ft Mil-Grade Lab Tested (Corner Air-Pocket Armor)',
    magnet: '15N N52 Integrated Steel Ring (Zero S-Pen jitter)',
    thermal: 'Graphene Thermal Foil Layer (-9°C Gaming Delta)',
    bezel: '2.0mm Multi-Lens Periscope Guard Lip',
    dock: 'Dual-Coil Qi2 Alignment with 15W Fast Charge'
  },
  'px9': {
    name: 'Google Pixel 9 Pro XL',
    drop: '15ft Mil-Grade Lab Tested (Visor Shield Frame)',
    magnet: '15N Magnetic Alignment Array',
    thermal: 'Passive Aluminum Heat Dispersion Rail',
    bezel: 'Continuous Camera Visor Wrap Bezel',
    dock: 'Optimized Coil Center for Tensor G4'
  },
  'op12': {
    name: 'OnePlus 12',
    drop: '15ft Mil-Grade Lab Tested (Impact Gel Core)',
    magnet: 'Precision Neodymium Core Ring',
    thermal: 'Dual Heat Vent Perforations',
    bezel: 'Circular Anodized Dial Lip Protector',
    dock: 'Universal 15W Wireless Qi Stand Matched'
  }
};

window.switchSpecDevice = function(key, btnEl) {
  const data = window.specDeviceData[key];
  if (!data) return;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('button').forEach(b => {
      b.classList.remove('bg-teal-600', 'text-white', 'shadow-md');
      b.classList.add('bg-white', 'text-neutral-700', 'border-neutral-200');
    });
    btnEl.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-200');
    btnEl.classList.add('bg-teal-600', 'text-white', 'shadow-md');
  }

  const dName = document.getElementById('spec-device-name');
  const dDrop = document.getElementById('spec-drop-val');
  const dMag = document.getElementById('spec-mag-val');
  const dTherm = document.getElementById('spec-therm-val');
  const dBezel = document.getElementById('spec-bezel-val');
  const dDock = document.getElementById('spec-dock-val');

  if (dName) dName.textContent = data.name;
  if (dDrop) dDrop.textContent = data.drop;
  if (dMag) dMag.textContent = data.magnet;
  if (dTherm) dTherm.textContent = data.thermal;
  if (dBezel) dBezel.textContent = data.bezel;
  if (dDock) dDock.textContent = data.dock;

  if (window.gsap) {
    gsap.from('#spec-device-name, #spec-drop-val, #spec-mag-val, #spec-therm-val, #spec-bezel-val, #spec-dock-val', {
      opacity: 0,
      y: 6,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

// 3. Interactive Materials Laboratory (About page)
window.materialsData = {
  'aramid': {
    title: 'Aramid Fiber 1500D',
    desc: '5x stronger than structural steel per weight ratio. Ballistic grade polymer weave precision-molded under 400 tons of heat pressure.',
    tensile: '98%',
    thermal: '72%',
    scratch: '95%',
    weight: '12g Ultra-Light'
  },
  'aluminum': {
    title: 'Aircraft-Grade 6063-T6 Aluminum',
    desc: 'Solid billet CNC milled with 0.05mm tolerances. Anodized in an electrolytic bath for zero corrosion and high thermal dissipation.',
    tensile: '92%',
    thermal: '99%',
    scratch: '88%',
    weight: '34g Rigid Armor'
  },
  'bayer': {
    title: 'Polycarbonate Bayer Shock Shield',
    desc: 'Custom formulated thermoplastic elastomer with UV stabilizers that eliminate yellowing permanently even under intense sunlight.',
    tensile: '89%',
    thermal: '65%',
    scratch: '91%',
    weight: '18g Feather Shock'
  },
  'sapphire': {
    title: '9H Mohs Synthetic Sapphire Ceramic',
    desc: 'Second only to diamond in mineral hardness. Completely immune to keys, razor blades, abrasive sand, and coarse granite surfaces.',
    tensile: '96%',
    thermal: '84%',
    scratch: '100%',
    weight: '6g Micro Ring'
  }
};

window.switchMaterialTab = function(key, btnEl) {
  const data = window.materialsData[key];
  if (!data) return;

  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('button').forEach(b => {
      b.classList.remove('bg-neutral-900', 'text-white', 'shadow-md');
      b.classList.add('bg-neutral-100', 'text-neutral-700');
    });
    btnEl.classList.remove('bg-neutral-100', 'text-neutral-700');
    btnEl.classList.add('bg-neutral-900', 'text-white', 'shadow-md');
  }

  const titleEl = document.getElementById('mat-title');
  const descEl = document.getElementById('mat-desc');
  const barTensile = document.getElementById('mat-bar-tensile');
  const barThermal = document.getElementById('mat-bar-thermal');
  const barScratch = document.getElementById('mat-bar-scratch');
  const weightEl = document.getElementById('mat-weight');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (weightEl) weightEl.textContent = data.weight;

  if (barTensile) barTensile.style.width = data.tensile;
  const valTensile = document.getElementById('mat-val-tensile');
  if (valTensile) valTensile.textContent = data.tensile;

  if (barThermal) barThermal.style.width = data.thermal;
  const valThermal = document.getElementById('mat-val-thermal');
  if (valThermal) valThermal.textContent = data.thermal;

  if (barScratch) barScratch.style.width = data.scratch;
  const valScratch = document.getElementById('mat-val-scratch');
  if (valScratch) valScratch.textContent = data.scratch;

  if (window.gsap) {
    gsap.from('#mat-title, #mat-desc', { opacity: 0, y: 8, duration: 0.35, ease: 'power2.out' });
  }
};

// 4. Interactive Stress Rig Telemetry Simulator (About page)
window.runStressSimulation = function(type) {
  const telemetryDisplay = document.getElementById('sim-telemetry-text');
  const statusBadge = document.getElementById('sim-status-badge');
  const statusText = document.getElementById('sim-status-text');

  if (!telemetryDisplay) return;

  statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono uppercase';
  statusText.textContent = 'CALIBRATING SENSORS...';
  telemetryDisplay.textContent = 'Engaging automated hydraulic pneumatic ram... Stand by.';

  setTimeout(() => {
    statusText.textContent = 'EXECUTING TEST VECTOR...';
    if (type === 'drop') {
      telemetryDisplay.textContent = 'Drop height: 4.57m (15.0 ft) · Surface: 5,000 PSI Cured Concrete · Impact Speed: 9.47 m/s...';
    } else if (type === 'thermal') {
      telemetryDisplay.textContent = 'Chamber temp: 55°C · Continuous 100W PD Load · Infrared Thermography: Peak 33.2°C at coil core...';
    } else {
      telemetryDisplay.textContent = 'Cyclic tension: 25.4 kg · Bend arc: 180° · Cycles completed: 10,000 / 10,000...';
    }
  }, 700);

  setTimeout(() => {
    statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold font-mono uppercase';
    statusText.textContent = 'PASSED · 100% STRUCTURAL INTEGRITY';
    if (type === 'drop') {
      telemetryDisplay.textContent = 'Zero glass fracture · Zero chassis deformation · Magnets retained 15.2N holding force. CERTIFIED.';
    } else if (type === 'thermal') {
      telemetryDisplay.textContent = 'Zero thermal throttling recorded · Cryo heat-sink dissipation delta: -21.8°C vs ambient limit. CERTIFIED.';
    } else {
      telemetryDisplay.textContent = 'Internal copper conductor impedance: 0.04 Ohm · Zero aramid fraying · 240W delivery maintained. CERTIFIED.';
    }
    if (window.gsap) {
      gsap.fromTo(statusBadge, { scale: 1.1 }, { scale: 1, duration: 0.3 });
    }
  }, 1600);
};


/* ======================================================== */
/* CATALOG FILTERING, SEARCH & QUICK-VIEW FUNCTIONS         */
/* ======================================================== */

window.currentCatalogCategory = 'all';
window.currentCatalogDevice = 'all';

window.filterCatalogCategory = function(cat, btnEl) {
  window.currentCatalogCategory = cat;
  
  // Update active pill UI in category tabs
  const container = document.getElementById('catalog-category-tabs');
  if (container) {
    container.querySelectorAll('.cat-pill').forEach(b => {
      b.classList.remove('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
      b.classList.add('bg-white', 'text-neutral-700', 'border', 'border-neutral-200');
    });
  }
  if (btnEl) {
    btnEl.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-200');
    btnEl.classList.add('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
  }

  window.applyCatalogFilters();
};

window.filterByDevice = function(dev, btnEl) {
  window.currentCatalogDevice = dev;

  // Update active chip UI in hero device filters
  const container = document.getElementById('hero-device-filters');
  if (container) {
    container.querySelectorAll('.device-chip').forEach(b => {
      b.classList.remove('active', 'bg-neutral-900', 'text-white');
      b.classList.add('bg-white', 'text-neutral-700', 'border-neutral-300');
    });
  }
  if (btnEl) {
    btnEl.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-300');
    btnEl.classList.add('active', 'bg-neutral-900', 'text-white');
  }

  window.applyCatalogFilters();
};

window.applyCatalogFilters = function() {
  const cards = document.querySelectorAll('#products-grid .product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const cardDev = card.getAttribute('data-device');

    const matchCat = (window.currentCatalogCategory === 'all' || cardCat === window.currentCatalogCategory);
    const matchDev = (window.currentCatalogDevice === 'all' || cardDev === 'all' || cardDev === window.currentCatalogDevice);

    if (matchCat && matchDev) {
      card.style.display = 'flex';
      visibleCount++;
      if (window.gsap) {
        gsap.to(card, { opacity: 1, scale: 1, duration: 0.25, overwrite: 'auto' });
      } else {
        card.style.opacity = '1';
      }
    } else {
      if (window.gsap) {
        gsap.to(card, { opacity: 0, scale: 0.95, duration: 0.2, overwrite: 'auto', onComplete: () => {
          card.style.display = 'none';
        }});
      } else {
        card.style.display = 'none';
      }
    }
  });

  const countEl = document.getElementById('catalog-results-count');
  if (countEl) {
    countEl.textContent = 'Showing ' + visibleCount + ' of ' + cards.length + ' items';
  }
};

window.resetCatalogFilters = function() {
  window.currentCatalogCategory = 'all';
  window.currentCatalogDevice = 'all';

  const catContainer = document.getElementById('catalog-category-tabs');
  if (catContainer) {
    catContainer.querySelectorAll('.cat-pill').forEach((b, i) => {
      if (i === 0) {
        b.classList.add('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
        b.classList.remove('bg-white', 'text-neutral-700', 'border');
      } else {
        b.classList.remove('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-neutral-700', 'border');
      }
    });
  }

  const devContainer = document.getElementById('hero-device-filters');
  if (devContainer) {
    devContainer.querySelectorAll('.device-chip').forEach((b, i) => {
      if (i === 0) {
        b.classList.add('active', 'bg-neutral-900', 'text-white');
        b.classList.remove('bg-white', 'text-neutral-700');
      } else {
        b.classList.remove('active', 'bg-neutral-900', 'text-white');
        b.classList.add('bg-white', 'text-neutral-700');
      }
    });
  }

  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';

  window.applyCatalogFilters();
};

window.handleCatalogSearch = function(query) {
  const q = (query || '').toLowerCase().trim();
  const cards = document.querySelectorAll('#products-grid .product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });

  const countEl = document.getElementById('catalog-results-count');
  if (countEl) {
    countEl.textContent = 'Showing ' + visibleCount + ' of ' + cards.length + ' items';
  }
};

window.addToCartDirect = function(name, price, img) {
  const item = {
    id: 'prod-' + Date.now(),
    name: name,
    price: Number(price),
    image: img,
    quantity: 1
  };

  if (!window.cartItems) window.cartItems = [];
  window.cartItems.push(item);

  if (typeof window.showToast === 'function') {
    window.showToast('Added ' + name + ' to cart ($' + price + '.00)');
  }

  // Update nav cart badge
  const navCount = document.getElementById('nav-cart-count');
  if (navCount) navCount.textContent = window.cartItems.length;

  if (typeof window.updateCartDrawer === 'function') {
    window.updateCartDrawer();
  }
};

window.openProductQuickView = function(title, price, desc, img, compat) {
  const modal = document.getElementById('quickview-modal');
  const modalImg = document.getElementById('qv-img');
  const modalTitle = document.getElementById('qv-title');
  const modalDesc = document.getElementById('qv-desc');
  const modalPrice = document.getElementById('qv-price');
  const modalCompat = document.getElementById('qv-compat');
  const modalAddBtn = document.getElementById('qv-add-btn');

  if (!modal) return;

  if (modalImg) modalImg.src = img;
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;
  if (modalPrice) modalPrice.textContent = '$' + price + '.00';
  if (modalCompat) modalCompat.textContent = compat || 'Universal Fit';

  if (modalAddBtn) {
    modalAddBtn.onclick = function() {
      window.addToCartDirect(title, price, img);
      window.closeQuickView();
    };
  }

  modal.classList.remove('hidden', 'pointer-events-none');
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  modal.classList.add('opacity-100');

  const panel = document.getElementById('quickview-panel');
  if (panel) {
    panel.classList.remove('scale-95');
    panel.classList.add('scale-100');
  }
};

window.closeQuickView = function() {
  const modal = document.getElementById('quickview-modal');
  if (!modal) return;

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
  
  const panel = document.getElementById('quickview-panel');
  if (panel) {
    panel.classList.remove('scale-100');
    panel.classList.add('scale-95');
  }

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
};
