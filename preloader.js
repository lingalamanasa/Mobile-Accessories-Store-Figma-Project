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
          gsap.to(preloader, {
            yPercent: -100,
            duration: 0.65,
            ease: 'power4.inOut',
            onComplete: () => {
              preloader.style.display = 'none';
              document.body.style.overflow = '';
              window.dispatchEvent(new CustomEvent('stacklyPreloaderComplete'));
            }
          });
        }
      });

      // Progress bar fill (0% -> 100%)
      if (progressBar) {
        tl.to(progressBar, {
          width: '100%',
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }

      // Counter animation
      if (percentText) {
        const obj = { val: 0 };
        tl.to(obj, {
          val: 100,
          duration: 0.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            percentText.textContent = Math.round(obj.val) + '%';
          }
        }, '<');
      }

      // Micro pulse on title
      tl.to('.preloader-title', {
        letterSpacing: '0.32em',
        duration: 0.4,
        ease: 'power2.out'
      }, '<0.2');

    } else {
      // Graceful fallback if GSAP isn't loaded yet
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
        }, 350);
      }, 700);
    }
  }

  // Trigger when DOM is interactive or on window load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreloader);
  } else {
    runPreloader();
  }

  // Absolute safety fallback (max 1.4s)
  setTimeout(() => {
    const preloader = document.getElementById('stackly-preloader');
    if (preloader && preloader.style.display !== 'none') {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
    }
  }, 1400);
})();

