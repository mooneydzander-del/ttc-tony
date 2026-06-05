/* ============================================================
   TC TACOS CATERING — APP.JS
   ============================================================ */

// ── Active nav link ──────────────────────────────────────────────
(function setActiveNav() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Nav scroll state ─────────────────────────────────────────────
(function initNavScroll() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function update() { nav.classList.toggle('scrolled', window.scrollY > 32); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Mobile nav toggle ────────────────────────────────────────────
(function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

// ── Hero video: fade in and hide placeholder badge ───────────────
(function initHeroVideo() {
  var video = document.querySelector('.hero-video');
  var badge = document.getElementById('videoStatusBadge');
  if (!video) return;

  video.addEventListener('playing', function onPlay() {
    video.classList.add('playing');
    if (badge) {
      badge.style.opacity = '0';
      setTimeout(function() { badge.style.display = 'none'; }, 1000);
    }
    video.removeEventListener('playing', onPlay);
  });
})();

// ── Dish images: show real photo when loaded, keep emoji fallback ─
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

  /* Touch: pause while finger is on the slider, resume on lift */
  track.addEventListener('touchstart', function() {
    track.classList.add('paused');
  }, { passive: true });

  track.addEventListener('touchend', function() {
    track.classList.remove('paused');
  }, { passive: true });
})();

// ── Smooth scroll for in-page anchor links ───────────────────────
(function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
