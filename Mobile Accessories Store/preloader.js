// ==========================================
// STACKLY UNIVERSAL GSAP PRELOADER ENGINE
// ==========================================
(function() {
  function runPreloader() {
    const preloader = document.getElementById('stackly-preloader');
    if (!preloader) return;

    // Prevent body scrolling during preloader
    document.body.style.overflow = 'hidden';

    const progressBar = document.getElementById('preloader-progress');
    const percentText = document.getElementById('preloader-num');

    // If GSAP is loaded
    if (window.gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Immediately release pointer events so navbar buttons respond in 1 click instantly
          preloader.style.pointerEvents = 'none';
          document.body.style.overflow = '';
          gsap.to(preloader, {
            yPercent: -100,
            opacity: 0,
            duration: 0.35,
            ease: 'power3.inOut',
            onComplete: () => {
              preloader.style.display = 'none';
              window.dispatchEvent(new CustomEvent('stacklyPreloaderComplete'));
            }
          });
        }
      });

      // Progress bar fill (0% -> 100%)
      if (progressBar) {
        tl.to(progressBar, {
          width: '100%',
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }

      // Counter animation
      if (percentText) {
        const obj = { val: 0 };
        tl.to(obj, {
          val: 100,
          duration: 0.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            percentText.textContent = Math.round(obj.val) + '%';
          }
        }, '<');
      }

      // Micro pulse on title
      tl.to('.preloader-title', {
        letterSpacing: '0.32em',
        duration: 0.3,
        ease: 'power2.out'
      }, '<0.1');

    } else {
      // Graceful fallback if GSAP isn't loaded yet
      preloader.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 200);
      }, 300);
    }
  }

  // Trigger when DOM is interactive or on window load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreloader);
  } else {
    runPreloader();
  }

  // Absolute safety fallback (max 0.8s) - Never block clicks
  setTimeout(() => {
    const preloader = document.getElementById('stackly-preloader');
    if (preloader) {
      preloader.style.pointerEvents = 'none';
      preloader.style.display = 'none';
      document.body.style.overflow = '';
    }
  }, 800);
})();

