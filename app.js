/* ============================================================
   TC TACOS CATERING — APP.JS
   Non-GSAP UI: mobile nav, belt, dish images, video, phone.
   Active nav highlighting via IntersectionObserver.
   Smooth scroll handled by cinematic.js (GSAP).
   ============================================================ */

// ── Mobile nav toggle ────────────────────────────────────────
(function initMobileNav() {
  var toggle    = document.querySelector('.nav-toggle');
  var links     = document.querySelector('.nav-links');
  var mobileBar = document.getElementById('mobileBar');
  if (!toggle || !links) return;

  function close() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (mobileBar) mobileBar.style.display = '';
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (mobileBar) mobileBar.style.display = open ? 'none' : '';
  });

  // Close on any nav link click (cinematic.js handles smooth scroll)
  links.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('click', close);
  });
})();

// ── Hero video: start playing, fallback gracefully ───────────
(function initHeroVideo() {
  var video = document.querySelector('.hero-bg-video');
  if (!video) return;
  var p = video.play();
  if (p) p.catch(function () {});
})();

// ── Dish images: show real photo, fall back to emoji on error ─
(function initDishImages() {
  document.querySelectorAll('.dish-img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.setAttribute('data-error', 'true');
    });
  });
})();

// ── Belt slider: pause on hover / touch ──────────────────────
(function initBelt() {
  var track = document.getElementById('beltTrack');
  if (!track) return;

  track.addEventListener('mouseenter', function () { track.classList.add('paused'); });
  track.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
  track.addEventListener('touchstart',  function () { track.classList.add('paused'); },  { passive: true });
  track.addEventListener('touchend',    function () { track.classList.remove('paused'); }, { passive: true });
})();

// ── Logo click → scroll to top ────────────────────────────────
(function initLogoNav() {
  var logo = document.querySelector('.nav-logo');
  if (!logo) return;
  logo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── Mobile bar: tel / sms / book buttons ─────────────────────
(function initMobileBar() {
  var callBtn = document.querySelector('.mobile-bar-call');
  if (callBtn) {
    callBtn.addEventListener('click', function () {
      window.location.href = 'tel:5097133555';
    });
  }
  var textBtn = document.querySelector('.mobile-bar-text');
  if (textBtn) {
    textBtn.addEventListener('click', function () {
      window.location.href = 'sms:5097133555';
    });
  }
})();

// ── Active nav section via IntersectionObserver ───────────────
// Highlights the nav link whose section is most visible in viewport.
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 72;

  // Map section id → nav link
  var linkMap = {};
  navLinks.forEach(function (link) {
    var id = (link.getAttribute('href') || '').replace('#', '');
    if (id) linkMap[id] = link;
  });

  var activeSectionId = null;

  function setActive(id) {
    if (id === activeSectionId) return;
    activeSectionId = id;
    navLinks.forEach(function (link) { link.classList.remove('active'); });
    if (linkMap[id]) linkMap[id].classList.add('active');
  }

  // Use IntersectionObserver with a rootMargin that accounts for fixed nav
  var observer = new IntersectionObserver(
    function (entries) {
      // Find the entry that is most visible
      var best = null;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      });
      if (best) setActive(best.target.id);
    },
    {
      rootMargin: '-' + (navH + 8) + 'px 0px -45% 0px',
      threshold: [0, 0.1, 0.25, 0.5]
    }
  );

  sections.forEach(function (sec) { observer.observe(sec); });

  // Also set on scroll end for accuracy (fallback)
  var scrollTimer;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      // Find section whose top is closest to (but below) nav bottom
      var navBottom = navH + 16;
      var closest = null;
      var closestDist = Infinity;
      sections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        var dist = Math.abs(rect.top - navBottom);
        if (rect.top <= navBottom + 80 && dist < closestDist) {
          closestDist = dist;
          closest = sec;
        }
      });
      if (closest) setActive(closest.id);
    }, 100);
  }, { passive: true });
})();
