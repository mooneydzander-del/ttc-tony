/* ============================================================
   TC TACOS CATERING — CINEMATIC.JS
   GSAP + ScrollTrigger — normal vertical scroll
   No pinning · No snapping · No scroll trapping
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  var isMobile      = window.matchMedia('(max-width: 768px)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav           = document.querySelector('.nav');

  /* ────────────────────────────────────────────────────────
     REDUCED MOTION — show everything immediately and stop
     ──────────────────────────────────────────────────────── */
  if (reducedMotion) {
    gsap.set('.hero-content', { opacity: 1, x: 0 });
    gsap.set('.package-card', { opacity: 1, y: 0 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.set(el, { opacity: 1, y: 0 });
    });
    return;
  }

  /* ════════════════════════════════════════════════════════
     VIDEO — play + Ken Burns slow zoom
     ════════════════════════════════════════════════════════ */
  var video = document.querySelector('.hero-bg-video');
  if (video) {
    var playP = video.play();
    if (playP) playP.catch(function () {});

    /* Slow Ken Burns zoom — 26s yoyo, very subtle */
    gsap.fromTo(video,
      { scale: 1.0 },
      { scale: 1.08, duration: 26, ease: 'none', repeat: -1, yoyo: true }
    );
  }

  /* ════════════════════════════════════════════════════════
     HERO ENTRANCE — cinematic push-in on load
     ════════════════════════════════════════════════════════ */
  var heroTL = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.04 });

  heroTL.fromTo('.hero-video-layer',
    { scale: 1.12 },
    { scale: 1.0, duration: 2.8 }
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
    { x: -44, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
    '-=1.3'
  );

  /* Stagger text elements inside hero */
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
      { y: 0, opacity: 1, duration: 0.56, ease: 'power2.out' },
      '-=' + (i === 0 ? 1.0 : 0.32)
    );
  });

  heroTL.fromTo('.hero-embers',
    { opacity: 0 },
    { opacity: 1, duration: 1.2 },
    '-=0.8'
  );

  /* ════════════════════════════════════════════════════════
     HERO VIDEO PARALLAX — scroll past hero, video drifts up
     No pinning — just a scrubbed movement
     ════════════════════════════════════════════════════════ */
  gsap.to('.hero-video-layer', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
      /* no pin: true — just drift */
    }
  });

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
     NAV SCROLL STATE — frosted glass after 60px
     ════════════════════════════════════════════════════════ */
  if (nav) {
    ScrollTrigger.create({
      start: 60,
      end: 99999,
      onToggle: function (self) {
        nav.classList.toggle('scrolled', self.isActive);
      }
    });
  }

  /* ════════════════════════════════════════════════════════
     SCROLL REVEALS — [data-reveal] elements
     Fade up, no pin, once-only
     ════════════════════════════════════════════════════════ */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    gsap.fromTo(el,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.80,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  /* ════════════════════════════════════════════════════════
     SECTION HEADLINES — slide in from left
     ════════════════════════════════════════════════════════ */
  gsap.utils.toArray('.section-headline').forEach(function (el) {
    gsap.fromTo(el,
      { x: -28, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.90,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      }
    );
  });


  /* ════════════════════════════════════════════════════════
     BELT SECTION — slide in from left on scroll
     ════════════════════════════════════════════════════════ */
  var belt = document.querySelector('.belt-section');
  if (belt) {
    gsap.fromTo(belt,
      { x: -48, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: belt,
          start: 'top 88%',
          once: true
        }
      }
    );
  }

  /* ════════════════════════════════════════════════════════
     MENU CATEGORY GRID — stagger items
     ════════════════════════════════════════════════════════ */
  var menuGrid = document.querySelector('.menu-grid');
  if (menuGrid) {
    gsap.utils.toArray('.menu-cat').forEach(function (cat, i) {
      gsap.fromTo(cat,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.50,
          delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: menuGrid,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }

  /* ════════════════════════════════════════════════════════
     PACKAGE CARDS — stagger reveal
     ════════════════════════════════════════════════════════ */
  var pkgGrid = document.querySelector('.packages-grid');
  if (pkgGrid) {
    gsap.utils.toArray('.package-card').forEach(function (card, i) {
      gsap.to(card, {
        y: 0, opacity: 1,
        duration: 0.65,
        delay: i * 0.10,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pkgGrid,
          start: 'top 82%',
          once: true
        }
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     CONTACT CARD — scale + fade reveal
     ════════════════════════════════════════════════════════ */
  var contactCard = document.querySelector('.contact-card');
  if (contactCard) {
    gsap.fromTo(contactCard,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.90,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactCard,
          start: 'top 84%',
          once: true
        }
      }
    );
  }

  /* ════════════════════════════════════════════════════════
     SECTION BACKGROUNDS — subtle scale as you scroll in
     ════════════════════════════════════════════════════════ */
  if (!isMobile) {
    gsap.utils.toArray('.section-bg').forEach(function (bg) {
      gsap.fromTo(bg,
        { scale: 1.04 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: bg.parentElement,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2
          }
        }
      );
    });
  }

  /* ════════════════════════════════════════════════════════
     FOOTER REVEAL
     ════════════════════════════════════════════════════════ */
  var footer = document.querySelector('.footer');
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.70,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 92%',
          once: true
        }
      }
    );
  }

  /* ════════════════════════════════════════════════════════
     SMOOTH SCROLL — anchor links
     All href="#section" links scroll smoothly with nav offset
     ════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').replace('#', '');
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ════════════════════════════════════════════════════════
     REFRESH ON LOAD
     ════════════════════════════════════════════════════════ */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });

})();
