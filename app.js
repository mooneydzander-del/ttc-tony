/* ============================================================
   TC TACOS CATERING — APP.JS
   Non-GSAP UI: mobile nav, belt, dish images, video, phone.
   Horizontal scroll active-state and smooth scroll handled
   by cinematic.js via GSAP + ScrollToPlugin.
   ============================================================ */

// ── Mobile nav toggle ────────────────────────────────────────
(function initMobileNav() {
  var toggle   = document.querySelector('.nav-toggle');
  var links    = document.querySelector('.nav-links');
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

  // Close on any nav link click (cinematic.js handles the actual scroll)
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
    // Images are display:block by default now — nothing extra needed on load
  });
})();

// ── Belt slider: pause on hover / touch ──────────────────────
(function initBelt() {
  var track = document.getElementById('beltTrack');
  if (!track) return;

  track.addEventListener('mouseenter', function () { track.classList.add('paused'); });
  track.addEventListener('mouseleave', function () { track.classList.remove('paused'); });
  track.addEventListener('touchstart',  function () { track.classList.add('paused'); }, { passive: true });
  track.addEventListener('touchend',    function () { track.classList.remove('paused'); }, { passive: true });
})();

// ── Nav logo click → panel 0 ─────────────────────────────────
(function initLogoNav() {
  var logo = document.querySelector('.nav-logo');
  if (!logo) return;
  logo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── Mobile bar: tel link for Call button ─────────────────────
(function initMobileBar() {
  var callBtn = document.querySelector('.mobile-bar-call');
  if (callBtn) {
    callBtn.addEventListener('click', function () {
      window.location.href = 'tel:5097133555';
    });
  }
})();
