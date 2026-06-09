/* ============================================================
   TC TACOS CATERING — APP.JS  (single-page)
   ============================================================ */

// ── Nav scroll state (transparent → frosted) ─────────────────────
(function initNavScroll() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function update() { nav.classList.toggle('scrolled', window.scrollY > 32); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Active nav link — tracks which section is in view ────────────
(function initActiveSection() {
  var sections = ['home', 'menu', 'book'];
  var navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 72;

  function update() {
    var scrollY = window.scrollY + navH + 80;
    var current = sections[0];
    sections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.nav-links a[data-section]').forEach(function(a) {
      a.classList.toggle('active', a.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Mobile nav toggle ────────────────────────────────────────────
(function initMobileNav() {
  var toggle  = document.querySelector('.nav-toggle');
  var links   = document.querySelector('.nav-links');
  var mobileBar = document.getElementById('mobileBar');
  if (!toggle || !links) return;

  function close() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (mobileBar) mobileBar.style.display = '';
  }

  toggle.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    /* Hide mobile bar when the full-screen nav is open */
    if (mobileBar) mobileBar.style.display = open ? 'none' : '';
  });

  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', close);
  });
})();

// ── Smooth scroll — in-page anchors (handles nav-height offset) ──
(function initSmoothScroll() {
  var navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

// ── Hero video: start playing, handle fallback ───────────────────
(function initHeroVideo() {
  var video = document.querySelector('.hero-bg-video');
  if (!video) return;

  // Attempt to play — some browsers require user gesture
  var playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(function() {
      // Autoplay blocked — video stays hidden (opacity:0 already low)
    });
  }
})();

// ── Hero food-circle images: show when loaded ────────────────────
(function initHeroImages() {
  document.querySelectorAll('.hero-food-circle img').forEach(function(img) {
    function reveal() {
      if (img.naturalWidth > 0) img.classList.add('loaded');
    }
    if (img.complete) { reveal(); } else { img.addEventListener('load', reveal); }
  });
})();

// ── Dish images: show photo when loaded, keep emoji as fallback ───
(function initDishImages() {
  document.querySelectorAll('.dish-img').forEach(function(img) {
    function reveal() {
      if (img.naturalWidth > 0) img.classList.add('loaded');
    }
    if (img.complete) { reveal(); } else { img.addEventListener('load', reveal); }
  });
})();

// ── Belt slider: pause on hover + touch ──────────────────────────
(function initBelt() {
  var track = document.getElementById('beltTrack');
  if (!track) return;

  track.addEventListener('touchstart', function() {
    track.classList.add('paused');
  }, { passive: true });

  track.addEventListener('touchend', function() {
    track.classList.remove('paused');
  }, { passive: true });
})();
