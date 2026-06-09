/* ============================================================
   TC TACOS CATERING — CINEMATIC.JS
   GSAP + ScrollTrigger — 6-layer parallax, hero push-in,
   video Ken Burns, mouse parallax (desktop), section reveals.
   ============================================================ */

(function () {
  'use strict';

  // Guard — GSAP must be loaded before this file
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bail entirely if user prefers reduced motion
  if (reducedMotion) {
    // Un-hide content that starts opacity:0
    gsap.set('.hero-content, .section-header, .package-card', { opacity: 1, y: 0, scale: 1 });
    return;
  }

  /* ──────────────────────────────────────────────────────────
     HERO ENTRANCE — cinematic push-in on page load
     Video layer scales DOWN from 1.12 → 1.0 (camera rushes in)
     Content layers stagger up from below
     ────────────────────────────────────────────────────────── */
  var heroTL = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Video layer: scale-down push-in
  heroTL.fromTo(
    '.hero-video-layer',
    { scale: 1.14, transformOrigin: '50% 50%' },
    { scale: 1.0, duration: 2.6 }
  );

  // Glow layer fades in slightly behind content
  heroTL.fromTo(
    '.hero-glow-layer',
    { opacity: 0 },
    { opacity: 1, duration: 1.4 },
    '-=2.2'
  );

  // Wrap layer (chrome, flames, food circles)
  heroTL.fromTo(
    '.hero-wrap-layer',
    { opacity: 0 },
    { opacity: 1, duration: 1.0 },
    '-=1.6'
  );

  // Content block rises up and fades in
  heroTL.fromTo(
    '.hero-content',
    { y: 48, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
    '-=1.2'
  );

  // Individual content elements stagger in
  heroTL.fromTo(
    '.hero-tagline',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    '-=0.9'
  );

  heroTL.fromTo(
    '.hero-eyebrow',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    '-=0.6'
  );

  heroTL.fromTo(
    '.hero-headline',
    { y: 28, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.5'
  );

  heroTL.fromTo(
    '.hero-subheadline',
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    '-=0.4'
  );

  heroTL.fromTo(
    '.hero-phone-cta',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    '-=0.3'
  );

  heroTL.fromTo(
    '.hero-badges',
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    '-=0.3'
  );

  heroTL.fromTo(
    '.hero-actions',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    '-=0.25'
  );

  // Embers fade in last
  heroTL.fromTo(
    '.hero-embers',
    { opacity: 0 },
    { opacity: 1, duration: 1.0 },
    '-=0.8'
  );

  /* ──────────────────────────────────────────────────────────
     VIDEO SLOW KEN BURNS — continuous loop, slow drift/zoom
     Gives the static trailer video a living, breathing feel.
     ────────────────────────────────────────────────────────── */
  gsap.fromTo(
    '.hero-bg-video',
    { scale: 1.0 },
    {
      scale: 1.08,
      duration: 22,
      ease: 'none',
      repeat: -1,
      yoyo: true
    }
  );

  /* ──────────────────────────────────────────────────────────
     SCROLL PARALLAX — each layer moves at a different rate
     creating true 3D depth as user scrolls down.
     Video (deepest) → slowest   /   Content (front) → fastest
     ────────────────────────────────────────────────────────── */

  // L1: Video layer — deepest, moves slowest (background drift)
  gsap.to('.hero-video-layer', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 2.0
    }
  });

  // L3: Fire/glow layer — mid depth
  gsap.to('.hero-glow-layer', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  // L4: Wrap layer (chrome, flames) — slight mid parallax
  gsap.to('.hero-wrap-layer', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  // L5: Embers — fast, foreground feel
  gsap.to('.hero-embers', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8
    }
  });

  // L6: Content — moves forward (slight upward pop on scroll)
  gsap.to('.hero-content', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.0
    }
  });

  /* ──────────────────────────────────────────────────────────
     MOUSE PARALLAX — desktop only
     Layers shift in opposite directions based on mouse position,
     creating a 3D "look around" depth illusion.
     Damped with lerp for smooth, cinema-like feel.
     ────────────────────────────────────────────────────────── */
  if (!isMobile) {
    var mouseX = 0, mouseY = 0;
    var targetX = 0, targetY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX / window.innerWidth)  - 0.5; // -0.5 … +0.5
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    gsap.ticker.add(function () {
      // Lerp towards mouse with damping (0.07 = smooth/slow, 0.18 = snappy)
      targetX += (mouseX - targetX) * 0.07;
      targetY += (mouseY - targetY) * 0.07;

      // Video (deepest) moves opposite and very slowly
      gsap.set('.hero-video-layer', {
        xPercent: targetX * -1.8,
        yPercent: targetY * -1.2
      });

      // Wrap graphics move slightly more
      gsap.set('.hero-wrap-layer', {
        xPercent: targetX * -2.8,
        yPercent: targetY * -1.8
      });

      // Content moves with mouse (front layer, same direction)
      gsap.set('.hero-content', {
        xPercent: targetX * 1.2,
        yPercent: targetY * 0.9
      });

      // Embers move most — foreground layer exaggerated
      gsap.set('.hero-embers', {
        xPercent: targetX * 3.5,
        yPercent: targetY * 2.2
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     SECTION SCROLL REVEALS
     Elements start hidden (opacity:0 / y offset) and animate
     in when they enter the viewport.
     ────────────────────────────────────────────────────────── */

  // Section headers (Menu title, Book Now title)
  gsap.utils.toArray('.section-header').forEach(function (el) {
    gsap.fromTo(
      el,
      { y: 38, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  // Belt slider entrance — slides in from left
  gsap.fromTo(
    '.belt-section',
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.belt-section',
        start: 'top 88%',
        once: true
      }
    }
  );

  // Full menu categories — stagger in
  gsap.utils.toArray('.menu-cat').forEach(function (el, i) {
    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.menu-grid',
          start: 'top 84%',
          once: true
        }
      }
    );
  });

  // Menu CTA block
  gsap.fromTo(
    '.menu-cta',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.menu-cta',
        start: 'top 88%',
        once: true
      }
    }
  );

  // Package cards — stagger with scale-up pop
  gsap.utils.toArray('.package-card').forEach(function (el, i) {
    gsap.fromTo(
      el,
      { y: 52, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.72,
        delay: i * 0.13,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.packages-grid',
          start: 'top 82%',
          once: true
        }
      }
    );
  });

  // Booking card
  gsap.fromTo(
    '.booking-card',
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.booking-card',
        start: 'top 86%',
        once: true
      }
    }
  );

  // Trust strip items
  gsap.utils.toArray('.trust-item').forEach(function (el, i) {
    gsap.fromTo(
      el,
      { scale: 0.82, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        delay: i * 0.07,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: '.trust-strip',
          start: 'top 92%',
          once: true
        }
      }
    );
  });

  /* ──────────────────────────────────────────────────────────
     ScrollTrigger refresh — wait for fonts/layout to settle
     ────────────────────────────────────────────────────────── */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });

})();
