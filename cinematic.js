/* ============================================================
   TC TACOS CATERING — CINEMATIC.JS
   GSAP + ScrollTrigger + ScrollToPlugin
   5-panel horizontal scroll — smooth, usable, cinematic.
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  var isMobile      = window.matchMedia('(max-width: 768px)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NUM_PANELS  = 5;
  var scrollTrack = document.getElementById('scrollTrack');
  var scrollCont  = document.getElementById('scrollContainer');
  var panelDots   = document.querySelectorAll('.panel-dot');
  var panels      = document.querySelectorAll('.scroll-panel');
  var nav         = document.querySelector('.nav');

  /* ────────────────────────────────────────────────────────
     REDUCED MOTION — reveal everything and stop
     ──────────────────────────────────────────────────────── */
  if (reducedMotion) {
    gsap.set('.hero-content', { opacity: 1, x: 0, y: '-50%' });
    gsap.set('.package-card', { opacity: 1, y: 0 });
    return;
  }

  /* ════════════════════════════════════════════════════════
     NAVIGATION TO PANEL
     ════════════════════════════════════════════════════════ */

  function navigateToPanel(panelIndex) {
    var idx = Math.max(0, Math.min(panelIndex, NUM_PANELS - 1));
    if (isMobile) {
      var target = document.getElementById('panel-' + idx);
      if (!target) return;
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      var y = target.getBoundingClientRect().top + window.scrollY - navH;
      if (typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, { scrollTo: y, duration: 0.85, ease: 'power2.inOut' });
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }
    /* Desktop: map panel index to the vertical scroll progress */
    var vw          = window.innerWidth;
    var totalScroll = vw * (NUM_PANELS - 1);
    var targetY     = (idx / (NUM_PANELS - 1)) * totalScroll;
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.to(window, { scrollTo: targetY, duration: 1.0, ease: 'power2.inOut' });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  /* ── data-panel click handlers ── */
  document.querySelectorAll('[data-panel]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var tag = el.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') {
        e.preventDefault();
        var idx = parseInt(el.getAttribute('data-panel'), 10);
        if (!isNaN(idx)) navigateToPanel(idx);
      }
    });
  });

  /* ── Panel dot active state ── */
  function setActiveDot(index) {
    panelDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    /* Sync nav links */
    document.querySelectorAll('.nav-links a[data-section]').forEach(function (a) {
      var map = { home: 0, menu: 2, book: 3 };
      a.classList.toggle('active', map[a.getAttribute('data-section')] === index);
    });
    /* Nav frosted on non-hero panels */
    if (nav) nav.classList.toggle('scrolled', index > 0);
  }

  panelDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var idx = parseInt(dot.getAttribute('data-panel'), 10);
      if (!isNaN(idx)) navigateToPanel(idx);
    });
  });

  /* ════════════════════════════════════════════════════════
     VIDEO — play + Ken Burns slow zoom
     ════════════════════════════════════════════════════════ */
  var video = document.querySelector('.hero-bg-video');
  if (video) {
    var playP = video.play();
    if (playP) playP.catch(function () {});

    /* Slow zoom — 26s yoyo, very subtle */
    gsap.fromTo(video,
      { scale: 1.0 },
      { scale: 1.08, duration: 26, ease: 'none', repeat: -1, yoyo: true }
    );
  }

  /* ════════════════════════════════════════════════════════
     HERO ENTRANCE — cinematic push-in on load
     ════════════════════════════════════════════════════════ */
  var heroTL = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.05 });

  heroTL.fromTo('.hero-video-layer',
    { scale: 1.14 },
    { scale: 1.0,  duration: 2.8 }
  );

  heroTL.fromTo('.hero-glow-layer',
    { opacity: 0 },
    { opacity: 1,  duration: 1.4 },
    '-=2.4'
  );

  heroTL.fromTo('.hero-wrap-layer',
    { opacity: 0 },
    { opacity: 1,  duration: 1.0 },
    '-=1.8'
  );

  /* Content block slides in from left */
  heroTL.fromTo('.hero-content',
    { x: -40, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
    '-=1.3'
  );

  /* Stagger text elements */
  var heroEls = [
    '.hero-eyebrow',
    '.hero-tagline',
    '.hero-headline',
    '.hero-subheadline',
    '.hero-badges',
    '.hero-actions',
    '.hero-phone-cta'
  ];

  heroEls.forEach(function (sel, i) {
    heroTL.fromTo(sel,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.58, ease: 'power2.out' },
      '-=' + (i === 0 ? 1.0 : 0.34)
    );
  });

  heroTL.fromTo('.hero-embers',
    { opacity: 0 },
    { opacity: 1, duration: 1.2 },
    '-=0.9'
  );

  /* ════════════════════════════════════════════════════════
     MOUSE PARALLAX — desktop hero only
     Gentle 3-layer depth with smooth lerp
     ════════════════════════════════════════════════════════ */
  if (!isMobile) {
    var mx = 0, my = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth)  - 0.5;
      my = (e.clientY / window.innerHeight) - 0.5;
    });

    gsap.ticker.add(function () {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;

      gsap.set('.hero-video-layer', { xPercent: tx * -1.8, yPercent: ty * -1.2 });
      gsap.set('.hero-wrap-layer',  { xPercent: tx * -2.8, yPercent: ty * -1.6 });
      gsap.set('.hero-embers',      { xPercent: tx *  3.5, yPercent: ty *  2.2 });
    });
  }

  /* ════════════════════════════════════════════════════════
     DESKTOP HORIZONTAL SCROLL
     Smooth, usable, cinematic — not a trap.
     ════════════════════════════════════════════════════════ */
  if (!isMobile && scrollTrack && scrollCont) {

    var vw = window.innerWidth;

    /* Set track width to hold all panels */
    gsap.set(scrollTrack, { width: NUM_PANELS * vw + 'px' });

    var scrollTween = gsap.to(scrollTrack, {
      x: function () { return -(vw * (NUM_PANELS - 1)); },
      ease: 'none',
      scrollTrigger: {
        id: 'hscroll',
        trigger: scrollCont,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 0.8,               /* Feels smooth, not laggy */
        snap: {
          snapTo: 1 / (NUM_PANELS - 1),
          duration: { min: 0.35, max: 0.70 },
          delay: 0.08,
          ease: 'power2.inOut'
        },
        start: 'top top',
        end: function () { return '+=' + (vw * (NUM_PANELS - 1)); },
        onUpdate: function (self) {
          var idx = Math.round(self.progress * (NUM_PANELS - 1));
          setActiveDot(idx);
        }
      }
    });

    /* ── Subtle per-panel content entrance ──
       Light fade + slight translateX — no heavy rotateY */
    panels.forEach(function (panel, i) {
      if (i === 0) return; /* Hero handled by heroTL */

      var content = panel.querySelector('.panel-content, .panel-content-menu, .panel-content-wide');
      if (!content) return;

      gsap.set(content, { opacity: 0, x: 30 });

      ScrollTrigger.create({
        containerAnimation: scrollTween,
        trigger: panel,
        start: 'left 80%',
        end: 'left 15%',
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress;
          gsap.set(content, {
            opacity: Math.min(p * 2.5, 1),
            x: gsap.utils.interpolate(30, 0, p)
          });
        }
      });
    });

    /* ── Package cards stagger ── */
    var pkgPanel = document.getElementById('panel-3');
    if (pkgPanel) {
      gsap.utils.toArray('.package-card').forEach(function (card, i) {
        ScrollTrigger.create({
          containerAnimation: scrollTween,
          trigger: pkgPanel,
          start: 'left 55%',
          once: true,
          onEnter: function () {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.60,
              delay: i * 0.10,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    /* ── Stats stagger ── */
    var statsPanel = document.getElementById('panel-1');
    if (statsPanel) {
      gsap.utils.toArray('.stat-item').forEach(function (item, i) {
        gsap.set(item, { opacity: 0, y: 28 });
        ScrollTrigger.create({
          containerAnimation: scrollTween,
          trigger: statsPanel,
          start: 'left 60%',
          once: true,
          onEnter: function () {
            gsap.to(item, { opacity: 1, y: 0, duration: 0.50, delay: i * 0.09, ease: 'power2.out' });
          }
        });
      });
    }

    /* ── Belt slide-in on menu panel ── */
    var menuPanel   = document.getElementById('panel-2');
    var beltSection = document.querySelector('.belt-section');
    if (menuPanel && beltSection) {
      gsap.set(beltSection, { opacity: 0, x: -36 });
      ScrollTrigger.create({
        containerAnimation: scrollTween,
        trigger: menuPanel,
        start: 'left 65%',
        once: true,
        onEnter: function () {
          gsap.to(beltSection, { opacity: 1, x: 0, duration: 0.80, ease: 'power2.out' });
        }
      });
    }

    /* ── Resize handler ── */
    window.addEventListener('resize', function () {
      vw = window.innerWidth;
      gsap.set(scrollTrack, { width: NUM_PANELS * vw + 'px' });
      var st = ScrollTrigger.getById('hscroll');
      if (st) st.refresh();
    });

  } /* end desktop */

  /* ════════════════════════════════════════════════════════
     MOBILE — vertical reveals
     ════════════════════════════════════════════════════════ */
  if (isMobile) {

    /* Hero visible immediately on mobile */
    gsap.set('.hero-content', { opacity: 1 });

    /* Nav scroll state on mobile */
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 48);
      }, { passive: true });
    }

    /* Package cards */
    gsap.utils.toArray('.package-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.60, delay: i * 0.09, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true } }
      );
    });

    /* Stats */
    gsap.utils.toArray('.stat-item').forEach(function (item, i) {
      gsap.fromTo(item,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.50, delay: i * 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true } }
      );
    });

    /* Panel headings */
    gsap.utils.toArray('.panel-headline').forEach(function (el) {
      gsap.fromTo(el,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    /* Menu categories */
    gsap.utils.toArray('.menu-cat').forEach(function (el, i) {
      gsap.fromTo(el,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.50, delay: i * 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-grid-compact', start: 'top 88%', once: true } }
      );
    });

  } /* end mobile */

  /* ════════════════════════════════════════════════════════
     REFRESH ON LOAD
     ════════════════════════════════════════════════════════ */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
    setActiveDot(0);
  });

})();
