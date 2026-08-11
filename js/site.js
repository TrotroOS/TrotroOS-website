(function () {
  // Mobile menu toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      // Toggle aria-expanded for accessibility
      const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Update year in footer
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Web app links
  const webAppLinks = document.querySelectorAll('[data-web-app-link]');
  const webAppUrl =
    document.documentElement.getAttribute('data-web-app-url') || 'https://trotroos.app';
  webAppLinks.forEach(el => {
    el.setAttribute('href', webAppUrl);
  });

  // Track page handling
  const trackRoot = document.querySelector('[data-track-page]');
  if (trackRoot) {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const statusEl = document.querySelector('[data-track-status]');
    const messageEl = document.querySelector('[data-track-message]');
    const openBtn = document.querySelector('[data-open-app]');

    if (token) {
      if (statusEl) statusEl.textContent = 'Live';
      if (messageEl) {
        messageEl.textContent =
          'Open the TrotroOS app to view full live GPS tracking for this shared trip.';
      }
      if (openBtn) {
        openBtn.href = `trotroos://track/live?token=${encodeURIComponent(token)}`;
      }
    } else {
      if (statusEl) statusEl.textContent = 'Waiting';
      if (messageEl) {
        messageEl.textContent =
          'This link is missing a track token. Open the link from Trip Guardian in the app.';
      }
      if (openBtn) openBtn.style.display = 'none';
    }
  }

  // Phone mockup mode tabs — swap screenshot image
  const modeTabs = document.querySelectorAll('.mode-tab');
  const previewImage = document.querySelector('[data-preview-image]');

  const modeImages = {
    passenger: {
      src: '/images/screens/find-ride.svg',
      alt: 'TrotroOS Find Ride screen showing live mates on a Kumasi corridor map',
    },
    mate: {
      src: '/images/screens/mate-dashboard.svg',
      alt: 'TrotroOS Mate dashboard with GPS broadcasting and incoming seat bids',
    },
    station: {
      src: '/images/screens/station-master.svg',
      alt: 'TrotroOS Station Master screen with live dispatch and queue counts',
    },
  };

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-mode');
      if (!mode || !modeImages[mode]) return;
      modeTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (previewImage) {
        previewImage.src = modeImages[mode].src;
        previewImage.alt = modeImages[mode].alt;
      }
    });
  });

  // Rotating verification code demo
  const verificationEl = document.querySelector('[data-verification-code]');
  if (verificationEl) {
    const refreshCode = () => {
      const code = String(100000 + Math.floor(Math.random() * 900000));
      verificationEl.textContent = code;
    };
    refreshCode();
    setInterval(refreshCode, 8000);
  }

  const demoStartBtn = document.getElementById('demo-start');
  const demoResetBtn = document.getElementById('demo-reset');
  const routeStatusElements = {
    route1: document.getElementById('route1-status'),
    route2: document.getElementById('route2-status'),
    route3: document.getElementById('route3-status'),
    route4: document.getElementById('route4-status'),
  };

  if (demoStartBtn && demoResetBtn && Object.values(routeStatusElements).every(Boolean)) {
    let demoActive = false;
    let demoInterval = null;

    // Mock data for demonstration
    const mockData = [
      { label: 'Light', count: 3 },
      { label: 'Moderate', count: 8 },
      { label: 'Heavy', count: 15 },
      { label: 'Very Heavy', count: 22 },
      { label: 'Light', count: 2 },
      { label: 'Moderate', count: 6 },
      { label: 'Light', count: 1 },
      { label: 'Very Heavy', count: 25 },
    ];

    let dataIndex = 0;

    const updateRouteStatuses = () => {
      // Update each route with random-ish data that changes over time
      Object.keys(routeStatusElements).forEach((key, index) => {
        const element = routeStatusElements[key];
        // Use different parts of the mock data array for each route
        const dataIndexForRoute = (dataIndex + index * 2) % mockData.length;
        const data = mockData[dataIndexForRoute];

        element.textContent = `${data.count} waiting`;
        element.className = 'count';

        // Add 'live' class if count is above threshold (simulating active queue)
        if (data.count > 5) {
          element.classList.add('live');
        } else {
          element.classList.remove('live');
        }
      });

      // Increment index for next update
      dataIndex = (dataIndex + 1) % mockData.length;
    };

    const startDemo = () => {
      demoActive = true;
      demoStartBtn.disabled = true;
      demoResetBtn.disabled = false;

      // Initial update
      updateRouteStatuses();

      // Start periodic updates
      demoInterval = setInterval(updateRouteStatuses, 3000);
    };

    const resetDemo = () => {
      demoActive = false;
      demoStartBtn.disabled = false;
      demoResetBtn.disabled = true;

      if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
      }

      // Reset to initial state
      Object.values(routeStatusElements).forEach(element => {
        element.textContent = 'Loading...';
        element.className = 'count';
      });

      dataIndex = 0;
    };

    demoStartBtn.addEventListener('click', startDemo);
    demoResetBtn.addEventListener('click', resetDemo);
  }

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateHeader);
    });
    // Initial check
    updateHeader();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        const nav = document.querySelector('[data-site-nav]');
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Initialize AOS-like animations for elements entering viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    '.bento-card, .gallery-item, .platform-stat, .timeline-step, .testimonial-card, .news-card, .feature-card, .tech-card, .use-case-card, .step'
  );
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Mobile menu keyboard accessibility
  if (toggle && nav) {
    trapFocus({
      element: nav,
      trapFocus: () => nav.classList.contains('is-open'),
    });
  }

  // Simple focus trap utility
  function trapFocus({ element, trapFocus }) {
    const focusableSelector = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]',
    ].join(',');

    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    function updateFocusableElements() {
      focusableElements = Array.from(element.querySelectorAll(focusableSelector)).filter(
        el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length
      );
      if (focusableElements.length) {
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
      }
    }

    // Initial population
    updateFocusableElements();

    // Listen for changes in the DOM that might affect focusable elements
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(element, { childList: true, subtree: true });

    // Handle keydown events when trapped
    const handleKeyDown = e => {
      if (!trapFocus()) return;

      if (e.key === 'Tab') {
        updateFocusableElements();

        if (!focusableElements.length) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }

      // Escape to close modal (if applicable)
      if (e.key === 'Escape' && !trapFocus()) {
        // This would close the mobile menu in our case
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
          toggle.focus(); // Return focus to the toggle button
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }
})();
