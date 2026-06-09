/* ============================================================
   TC TACOS CATERING — CINEMATIC.JS
   GSAP + ScrollTrigger + ScrollToPlugin
   5-panel horizontal scroll, 4D box transitions,
   video Ken Burns, mouse parallax, mobile reveals.
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  var isMobile       = window.matchMedia('(max-width: 768px)').matches;
  var reducedMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NUM_PANELS    = 5;
  var scrollTrack   = document.getElementById('scrollTrack');
  var scrollCont    = document.getElementById('scrollContainer');
  var panelDots     = document.querySelectorAll('.panel-dot');
  var panels        = document.querySelectorAll('.scroll-panel');

  /* ────────────────────────────────────────────────────────
     REDUCED MOTION — show everything immediately and bail
     ──────────────────────────────────────────────────────── */
  if (reducedMotion) {
    gsap.set('.hero-content', { opacity: 1, y: 0, x: 0 });
    gsap.set('.package-card', { opacity: 1, y: 0, scale: 1 });
    return;
  }

  /* ════════════════════════════════════════════════════════
     PANEL NAVIGATION HELPERS
     ════════════════════════════════════════════════════════ */

  function getPanelScrollY(panelIndex) {
    // Desktop: scroll progress per panel maps to vertical scroll range
    var vw = window.innerWidth;
    var totalScroll = vw * (NUM_PANELS - 1);
    return (panelIndex / (NUM_PANELS - 1)) * totalScroll;
  }

  function navigateToPanel(panelIndex) {
    if (isMobile) {
      // Mobile: scroll to the panel element directly
      var target = document.getElementById('panel-' + panelIndex);
      if (!target) return;
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      var y = target.getBoundingClientRect().top + window.scrollY - navH;
      if (typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, { scrollTo: y, duration: 0.8, ease: 'power2.inOut' });
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }
    // Desktop: scroll to the corresponding vertical position that triggers the panel
    var targetY = getPanelScrollY(panelIndex);
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.to(window, { scrollTo: targetY, duration: 1.0, ease: 'power2.inOut' });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  /* ── data-panel links ── */
  document.querySelectorAll('[data-panel]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      // Only intercept if it's an <a> or <button> — avoid interfering with form inputs
      var tag = el.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') {
        e.preventDefault();
        var index = parseInt(el.getAttribute('data-panel'), 10);
        if (!isNaN(index)) navigateToPanel(index);
      }
    });
  });

  /* ── Panel dot active state ── */
  function setActiveDot(index) {
    panelDots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
    // Mirror in nav links if any use data-section
    document.querySelectorAll('.nav-links a[data-section]').forEach(function (a) {
      var sec = a.getAttribute('data-section');
      var panelMap = { home: 0, menu: 2, book: 3 };
      a.classList.toggle('active', panelMap[sec] === index);
    });
  }

  // Dot buttons navigate to their panel
  panelDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-panel'), 10);
      if (!isNaN(index)) navigateToPanel(index);
    });
  });

  /* ════════════════════════════════════════════════════════
     VIDEO SETUP
     ════════════════════════════════════════════════════════ */
  var video = document.querySelector('.hero-bg-video');
  if (video) {
    var playP = video.play();
    if (playP) playP.catch(function () {});
  }

  /* ════════════════════════════════════════════════════════
     HERO ENTRANCE TIMELINE
     Push-in on page load, content staggers up
     ════════════════════════════════════════════════════════ */
  var heroTL = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });

  // Video layer: zoom-in push
  heroTL.fromTo(
    '.hero-video-layer',
    { scale: 1.16, transformOrigin: '50% 50%' },
    { scale: 1.0, duration: 2.8 }
  );

  heroTL.fromTo(
    '.hero-glow-layer',
    { opacity: 0 },
    { opacity: 1, duration: 1.4 },
    '-=2.4'
  );

  heroTL.fromTo(
    '.hero-wrap-layer',
    { opacity: 0 },
    { opacity: 1, duration: 1.0 },
    '-=1.8'
  );

  // Content block rises into view
  heroTL.fromTo(
    '.hero-content',
    { x: -36, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
    '-=1.4'
  );

  // Stagger individual items inside hero-content
  [
    '.hero-eyebrow',
    '.hero-tagline',
    '.hero-headline',
    '.hero-subheadline',
    '.hero-badges',
    '.hero-actions',
    '.hero-phone-cta'
  ].forEach(function (sel, i) {
    heroTL.fromTo(
      sel,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=' + (i === 0 ? 1.0 : 0.36)
    );
  });

  heroTL.fromTo(
    '.hero-embers',
    { opacity: 0 },
    { opacity: 1, duration: 1.2 },
    '-=1.0'
  );

  /* ════════════════════════════════════════════════════════
     VIDEO KEN BURNS — slow drift, breathing zoom
     ════════════════════════════════════════════════════════ */
  if (video) {
    gsap.fromTo(
      video,
      { scale: 1.0 },
      { scale: 1.09, duration: 24, ease: 'none', repeat: -1, yoyo: true }
    );
  }

  /* ════════════════════════════════════════════════════════
     MOUSE PARALLAX — desktop hero only
     ════════════════════════════════════════════════════════ */
  if (!isMobile) {
    var mx = 0, my = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth)  - 0.5;
      my = (e.clientY / window.innerHeight) - 0.5;
    });

    gsap.ticker.add(function () {
      tx += (mx - tx) * 0.07;
      ty += (my - ty) * 0.07;

      // Video deepest, opposite direction, subtle
      gsap.set('.hero-video-layer', {
        xPercent: tx * -2.2,
        yPercent: ty * -1.4
      });
      // Wrap graphics
      gsap.set('.hero-wrap-layer', {
        xPercent: tx * -3.2,
        yPercent: ty * -2.0
      });
      // Embers — foreground, exaggerated
      gsap.set('.hero-embers', {
        xPercent: tx * 4.0,
        yPercent: ty * 2.6
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     DESKTOP HORIZONTAL SCROLL
     GSAP pin + scrub + snap across 5 panels
     ════════════════════════════════════════════════════════ */
  if (!isMobile && scrollTrack && scrollCont) {

    var vw = window.innerWidth;

    // Size the track so it fits all panels
    gsap.set(scrollTrack, { width: (NUM_PANELS * vw) + 'px' });

    var scrollTween = gsap.to(scrollTrack, {
      x: function () { return -(vw * (NUM_PANELS - 1)); },
      ease: 'none',
      scrollTrigger: {
        id: 'hscroll',
        trigger: scrollCont,
        pin: true,
        scrub: 1.2,
        snap: {
          snapTo: 1 / (NUM_PANELS - 1),
          duration: { min: 0.3, max: 0.75 },
          delay: 0.06,
          ease: 'power2.inOut'
        },
        start: 'top top',
        end: function () { return '+=' + (vw * (NUM_PANELS - 1)); },
        onUpdate: function (self) {
          // Which panel is currently active?
          var idx = Math.round(self.progress * (NUM_PANELS - 1));
          setActiveDot(idx);

          // Nav scrolled state (always show on non-hero panels)
          var nav = document.querySelector('.nav');
          if (nav) nav.classList.toggle('scrolled', idx > 0);
        }
      }
    });

    /* ── 4D per-panel entrance / exit (containerAnimation) ── */
    panels.forEach(function (panel, i) {
      var content = panel.querySelector('.panel-content, .hero-content');
      if (!content || i === 0) return; // Hero handled by heroTL

      // Start hidden
      gsap.set(content, { opacity: 0, rotateY: 8, transformOrigin: 'left center' });

      // Entrance: rotateY 8 → 0, opacity 0 → 1 as panel scrolls in
      ScrollTrigger.create({
        containerAnimation: scrollTween,
        trigger: panel,
        start: 'left 85%',
        end: 'left 10%',
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress;
          gsap.set(content, {
            rotateY: gsap.utils.interpolate(8, 0, p),
            opacity: gsap.utils.interpolate(0, 1, Math.min(p * 2, 1)),
            translateZ: gsap.utils.interpolate(-60, 0, p)
          });
        }
      });
    });

    /* ── Atmosphere parallax per panel ── */
    panels.forEach(function (panel) {
      var bg = panel.querySelector('.panel-bg');
      var glow = panel.querySelector('.panel-fire-glow');
      if (bg) {
        gsap.to(bg, {
          backgroundPositionX: '+=40px',
          ease: 'none',
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: panel,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        });
      }
      if (glow) {
        gsap.fromTo(glow,
          { opacity: 0.6 },
          {
            opacity: 1.0,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: 'left center',
              end: 'right center',
              scrub: true
            }
          }
        );
      }
    });

    /* ── Package cards stagger in on panel-3 ── */
    var pkgPanel = document.getElementById('panel-3');
    if (pkgPanel) {
      gsap.utils.toArray('.package-card').forEach(function (card, i) {
        ScrollTrigger.create({
          containerAnimation: scrollTween,
          trigger: pkgPanel,
          start: 'left 60%',
          once: true,
          onEnter: function () {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              delay: i * 0.12,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    /* ── Stats stagger on panel-1 ── */
    var statsPanel = document.getElementById('panel-1');
    if (statsPanel) {
      gsap.utils.toArray('.stat-item').forEach(function (item, i) {
        gsap.set(item, { opacity: 0, y: 32 });
        ScrollTrigger.create({
          containerAnimation: scrollTween,
          trigger: statsPanel,
          start: 'left 65%',
          once: true,
          onEnter: function () {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              delay: i * 0.10,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    /* ── Belt slider on panel-2 ── */
    var menuPanel = document.getElementById('panel-2');
    var beltSection = document.querySelector('.belt-section');
    if (menuPanel && beltSection) {
      gsap.set(beltSection, { opacity: 0, x: -50 });
      ScrollTrigger.create({
        containerAnimation: scrollTween,
        trigger: menuPanel,
        start: 'left 70%',
        once: true,
        onEnter: function () {
          gsap.to(beltSection, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        }
      });
    }

    // Invalidate on resize
    window.addEventListener('resize', function () {
      vw = window.innerWidth;
      gsap.set(scrollTrack, { width: (NUM_PANELS * vw) + 'px' });
      ScrollTrigger.getById('hscroll') && ScrollTrigger.getById('hscroll').refresh();
    });

  } // end desktop horizontal

  /* ════════════════════════════════════════════════════════
     MOBILE — vertical scroll reveals
     Standard IntersectionObserver / ScrollTrigger reveals
     for stacked panels on mobile
     ════════════════════════════════════════════════════════ */
  if (isMobile) {
    // Package cards
    gsap.utils.toArray('.package-card').forEach(function (card, i) {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65,
          delay: i * 0.10,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Stats
    gsap.utils.toArray('.stat-item').forEach(function (item, i) {
      gsap.fromTo(
        item,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true
          }
        }
      );
    });

    // Belt
    var beltMob = document.querySelector('.belt-section');
    if (beltMob) {
      gsap.fromTo(
        beltMob,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: beltMob,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Panel content blocks
    gsap.utils.toArray('.panel-content').forEach(function (el) {
      gsap.fromTo(
        el,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true
          }
        }
      );
    });

    // Mobile: hero content is already visible from heroTL entrance
    gsap.set('.hero-content', { opacity: 1 });
  }

  /* ════════════════════════════════════════════════════════
     SCROLL TRIGGER REFRESH
     Wait for fonts + layout to settle before measuring
     ════════════════════════════════════════════════════════ */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
    // Ensure panel-0 is active on load
    setActiveDot(0);
  });

  /* ════════════════════════════════════════════════════════
     NAV SCROLL STATE — also controlled by panel index above,
     but keep vertical fallback for mobile
     ════════════════════════════════════════════════════════ */
  if (isMobile) {
    var navEl = document.querySelector('.nav');
    if (navEl) {
      window.addEventListener('scroll', function () {
        navEl.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }
  }

})();
