/**
 * EV Insights - Electric Vehicle Market Intelligence
 * Client-Side Controller & Interactive UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeroTypewriter();
  initNavbarScroll();
  initMobileNavigation();
  initActiveNavObserver();
  initSmoothScroll();
  initTableauLoaders();
  initStatCounters();
  initBackToTop();
});

/* ==========================================================================
   1. Hero Animated Subtitle (Typewriter & Cycling Effect)
   ========================================================================== */
function initHeroTypewriter() {
  const subtitleEl = document.getElementById('animatedSubtitle');
  if (!subtitleEl) return;

  const phrases = [
    'Discover the EV Revolution',
    'Explore Market Intelligence',
    'Understand the Future of Mobility'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      subtitleEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      subtitleEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typingDelay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Advance to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 500;
    }

    setTimeout(typeLoop, typingDelay);
  }

  // Start the typing loop
  setTimeout(typeLoop, 800);
}

/* ==========================================================================
   2. Sticky Navigation Bar & Shadow on Scroll
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   3. Responsive Mobile Menu
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when a navigation link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });
}

/* ==========================================================================
   4. Active Navigation State (Intersection Observer)
   ========================================================================== */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   5. Smooth Scrolling for Internal Links
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   6. Tableau Embeds Loading States & Handlers
   ========================================================================== */
function initTableauLoaders() {
  const dashboardIframe = document.getElementById('tableauDashboardIframe');
  const dashboardOverlay = document.getElementById('dashboardLoadingOverlay');
  const storyIframe = document.getElementById('tableauStoryIframe');
  const storyOverlay = document.getElementById('storyLoadingOverlay');

  // Handle Dashboard loading
  if (dashboardIframe && dashboardOverlay) {
    dashboardIframe.addEventListener('load', () => {
      setTimeout(() => {
        dashboardOverlay.classList.add('loaded');
      }, 700);
    });

    // Fallback safety timeout if iframe onload is suppressed by cross-origin policy
    setTimeout(() => {
      if (!dashboardOverlay.classList.contains('loaded')) {
        dashboardOverlay.classList.add('loaded');
      }
    }, 6000);
  }

  // Handle Story loading
  if (storyIframe && storyOverlay) {
    storyIframe.addEventListener('load', () => {
      setTimeout(() => {
        storyOverlay.classList.add('loaded');
      }, 700);
    });

    // Fallback safety timeout
    setTimeout(() => {
      if (!storyOverlay.classList.contains('loaded')) {
        storyOverlay.classList.add('loaded');
      }
    }, 6000);
  }

  // Reload triggers
  const reloadDashboardBtn = document.getElementById('reloadDashboardBtn');
  if (reloadDashboardBtn && dashboardIframe && dashboardOverlay) {
    reloadDashboardBtn.addEventListener('click', () => {
      dashboardOverlay.classList.remove('loaded');
      const currentSrc = dashboardIframe.src;
      dashboardIframe.src = '';
      setTimeout(() => {
        dashboardIframe.src = currentSrc;
      }, 100);
    });
  }

  const reloadStoryBtn = document.getElementById('reloadStoryBtn');
  if (reloadStoryBtn && storyIframe && storyOverlay) {
    reloadStoryBtn.addEventListener('click', () => {
      storyOverlay.classList.remove('loaded');
      const currentSrc = storyIframe.src;
      storyIframe.src = '';
      setTimeout(() => {
        storyIframe.src = currentSrc;
      }, 100);
    });
  }
}

/* ==========================================================================
   7. Stat Card Numbers Animation
   ========================================================================== */
function initStatCounters() {
  const statValues = document.querySelectorAll('.stat-counter');
  if (!statValues.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statValues.forEach((counter) => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;

          let count = 0;
          const duration = 1800;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counterInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Easing: easeOutQuad
            const easedProgress = progress * (2 - progress);
            count = target * easedProgress;

            if (frame === totalFrames) {
              clearInterval(counterInterval);
              count = target;
            }

            counter.textContent = prefix + (isDecimal ? count.toFixed(1) : Math.floor(count)) + suffix;
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
