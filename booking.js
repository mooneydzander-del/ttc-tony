/* ============================================================
   TC TACOS — BOOKING CONFIG   booking.js
   ============================================================

   This is a plain HTML/JS site served as a static file on Vercel.
   Vercel environment variables cannot be injected into static HTML.

   ── To enable Calendly ───────────────────────────────────────
   1. Set CALENDLY_URL below to your Calendly event link.
   2. Uncomment the two Calendly CDN lines in index.html <head>.
   3. Push to GitHub — Vercel auto-deploys.

   ── To switch accounts (e.g. your test → Tony's) ─────────────
   Update CALENDLY_URL below and push to deploy.
   No other changes needed.
   ============================================================ */

var TC_BOOKING = {

  // ── Calendly event URL ───────────────────────────────────────
  // Example: 'https://calendly.com/tc-tacos/catering'
  // Leave empty ('') to scroll to the Call/Text section instead.
  CALENDLY_URL: '',

  // ── Contact info ─────────────────────────────────────────────
  PHONE:    '5097133555',
  EMAIL:    'tctacoscatering@yahoo.com',
  TEL_HREF: 'tel:5097133555',
  SMS_HREF: 'sms:5097133555'

};

/**
 * openCalendlyBooking()
 *
 * Call this from any Book Now / Reserve button.
 * — If CALENDLY_URL is set: opens the Calendly popup (or new tab fallback).
 * — If CALENDLY_URL is empty: smooth-scrolls to the #book section.
 */
function openCalendlyBooking() {
  var url = (TC_BOOKING.CALENDLY_URL || '').trim();

  if (!url) {
    /* No Calendly URL — scroll to the Call / Text section */
    var section = document.getElementById('book');
    if (section) {
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      var top = section.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    return;
  }

  /* Try Calendly popup widget (CDN script in index.html head) */
  if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    window.Calendly.initPopupWidget({ url: url });
    return;
  }

  /* Fallback: open in a new tab */
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ── Wire up all .booking-trigger elements on DOM ready ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.booking-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openCalendlyBooking();
    });
  });
});
