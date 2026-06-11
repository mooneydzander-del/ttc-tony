/* ============================================================
   TC TACOS — BOOKING CONFIG   booking.js
   ============================================================

   This is a plain HTML/CSS/JS site with no build step, served
   as static files on Vercel. Vercel environment variables are
   not injected into static files at runtime.

   ── "Environment variable" equivalent for a static site ─────
   This file IS the environment config. Each key below maps
   1-to-1 to the Vercel env vars you'd use in a Next.js project:

     NEXT_PUBLIC_CALENDLY_URL   →  TC_BOOKING.CALENDLY_URL
     NEXT_PUBLIC_BOOKING_PHONE  →  TC_BOOKING.PHONE
     NEXT_PUBLIC_BOOKING_EMAIL  →  TC_BOOKING.EMAIL

   To change any value: update it here and push to GitHub.
   Vercel auto-deploys from main — no other steps needed.

   ── To switch from the test Calendly account to Tony's Calendly
      account, update NEXT_PUBLIC_CALENDLY_URL (CALENDLY_URL
      below) in Vercel and redeploy. ─────────────────────────────
   1. Go to Vercel → Project → Settings → Environment Variables
      (or just update CALENDLY_URL in this file directly).
   2. Set CALENDLY_URL to Tony's Calendly event link.
   3. Ensure the Calendly CDN lines in index.html stay uncommented.
   4. Push to GitHub — Vercel auto-deploys.
   ============================================================ */

var TC_BOOKING = {

  // ── NEXT_PUBLIC_CALENDLY_URL ─────────────────────────────────
  // Current: test account. Switch to Tony's URL when ready.
  // To disable Calendly (fallback to Call/Text section): set to ''.
  CALENDLY_URL: 'https://calendly.com/cinemlanding/reserve-tc-tacos-catering-test',

  // ── NEXT_PUBLIC_BOOKING_PHONE ────────────────────────────────
  PHONE:    '5097133555',
  TEL_HREF: 'tel:5097133555',
  SMS_HREF: 'sms:5097133555',

  // ── NEXT_PUBLIC_BOOKING_EMAIL ────────────────────────────────
  EMAIL: 'tctacoscatering@yahoo.com'

};

/* ============================================================
   FLOAT CTA — hide while Calendly popup is open
   ============================================================

   How it works:
   - Calendly.initPopupWidget() appends a .calendly-overlay div
     directly to document.body.
   - We hide the #floatCta button the moment the popup opens.
   - A MutationObserver watches document.body's direct children.
     When .calendly-overlay is removed (popup closed by user),
     the observer restores the button and disconnects.
   - The new-tab fallback never touches the float button since
     no overlay is added to the DOM in that case.
   ============================================================ */

var _floatObserver = null;

function _hideFloatCta() {
  var btn = document.getElementById('floatCta');
  if (!btn) return;
  btn.style.opacity        = '0';
  btn.style.pointerEvents  = 'none';
  btn.style.transform      = 'translateY(6px) scale(0.95)';
}

function _showFloatCta() {
  var btn = document.getElementById('floatCta');
  if (!btn) return;
  /* Clear inline styles — CSS animation and transform take over again */
  btn.style.opacity        = '';
  btn.style.pointerEvents  = '';
  btn.style.transform      = '';
}

/**
 * Watch document.body's direct children for the removal of
 * .calendly-overlay (the element Calendly appends when the popup
 * opens and removes when it closes).
 */
function _watchForCalendlyClose() {
  /* Disconnect any previous observer first */
  if (_floatObserver) {
    _floatObserver.disconnect();
    _floatObserver = null;
  }

  _floatObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var removed = mutations[i].removedNodes;
      for (var j = 0; j < removed.length; j++) {
        var node = removed[j];
        if (node.nodeType !== 1) continue;

        /* Calendly appends its overlay as a direct child of <body>
           with class "calendly-overlay". Detect its removal. */
        if (node.classList && node.classList.contains('calendly-overlay')) {
          _showFloatCta();
          _floatObserver.disconnect();
          _floatObserver = null;
          return;
        }
      }
    }
  });

  /* childList: true — only watch body's direct children,
     not the whole subtree. Efficient and precise. */
  _floatObserver.observe(document.body, { childList: true });
}

/* ============================================================
   openCalendlyBooking()
   ============================================================

   Called by every .booking-trigger click (Book Now, Reserve Your
   Date, Reserve With $200 Deposit). Never called by Call Now or
   Text Tony — those use plain href="tel:" / href="sms:".

   Behavior:
     1. If CALENDLY_URL is set → try Calendly popup widget.
        → hide float button, watch for popup close.
     2. If popup widget unavailable/throws → open URL in new tab.
        → float button stays visible (no overlay in DOM).
     3. If CALENDLY_URL is empty → smooth-scroll to #book.
   ============================================================ */

function openCalendlyBooking() {
  var url = (TC_BOOKING.CALENDLY_URL || '').trim();

  /* ── No URL: scroll to the Call / Text section ── */
  if (!url) {
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

  /* ── Try Calendly popup widget (loaded via CDN in index.html) ── */
  try {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: url });
      /* Popup is now open — hide float button and watch for close */
      _hideFloatCta();
      _watchForCalendlyClose();
      return;
    }
  } catch (err) {
    /* Popup threw (CDN blocked, ad blocker, etc.) — fall through */
  }

  /* ── Fallback: open Calendly in a new tab ──
     Float button stays visible since no overlay is added to DOM. */
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ── Wire up all .booking-trigger elements on DOM ready ─────────
   Only Book Now / Reserve Your Date / Reserve With $200 Deposit
   carry this class. Call Now and Text Tony use plain href links
   and are intentionally excluded. ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.booking-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openCalendlyBooking();
    });
  });
});
