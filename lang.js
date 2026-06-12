/* ============================================================
   TC TACOS CATERING — LANG.JS
   EN / ES language switch. Saves choice to localStorage.
   ============================================================ */

var TC_LANG = {
  en: {
    'nav.home':  'Home',
    'nav.menu':  'Menu',
    'nav.book':  'Book Now',

    'hero.eyebrow':     'Live Taco Catering &nbsp;&middot;&nbsp; Tri-Cities, WA',
    'hero.tagline':     'Best Service In Town',
    'hero.subheadline': 'Fresh taco catering for backyard parties, weddings, work events, and celebrations across the Tri-Cities.',
    'hero.badge1':      '3 Food Trucks',
    'hero.badge2':      'Made Fresh On-Site',
    'hero.badge3':      '$200 Holds Your Date',
    'hero.viewMenu':    'View Menu',

    'stats.headline': 'Real Trucks.<br>Real Food.',
    'stats.subhead':  'Fresh on-site. Made to order. $200 holds your date.',
    'stats.trucks':   'Food Trucks',
    'stats.events':   'Events Per Day',
    'stats.deposit':  'Deposit to Reserve',
    'stats.area':     'Catering Area',
    'stats.menuBtn':  'See the Menu',

    'menu.eyebrow':          'What We Serve',
    'menu.headline':         'Menu',
    'menu.subhead':          'Made fresh on-site for backyard parties, weddings, work events, and full-service celebrations.',
    'menu.onTruck':          "What's On The Truck",
    'menu.cat.tacos':        'Tacos',
    'menu.cat.quesadillas':  'Quesadillas',
    'menu.cat.specialties':  'Specialties',
    'menu.cat.drinks':       'Drinks',
    'menu.note':             'Menu options may vary by event.',

    'pkg.eyebrow':     'Book Your Date',
    'pkg.headline':    'Choose Your Package',
    'pkg.subhead':     'Lock in your date with a $200 deposit. Tony will follow up to confirm your menu, headcount, and final price.',
    'pkg.small':       'Small Event',
    'pkg.standard':    'Standard Event',
    'pkg.large':       'Large Event',
    'pkg.startingAt':  'Starting at',
    'pkg.smallDesc':   'Perfect for backyard parties, family dinners, and casual get-togethers.',
    'pkg.standardDesc':'Great for birthdays, company events, graduation parties, and weekend celebrations.',
    'pkg.largeDesc':   'Built for weddings, receptions, large block parties, and community events.',
    'pkg.depositNote': '$200 deposit to reserve',
    'pkg.reserveBtn':  'Reserve With $200 Deposit',
    'pkg.note':        'Final price depends on guest count, menu choices, location, and event details.',

    'cta.eyebrow': 'Ready To Book',
    'cta.heading': 'Book Your Date',
    'cta.body':    'Choose a time through Calendly so Tony can confirm your event details, menu, guest count, location, and final price.',

    'book.eyebrow': 'Ready To Book',
    'book.heading': 'Book Your Date',
    'book.body':    'Choose a time through Calendly so Tony can confirm your event details, menu, guest count, location, and final price.',
    'book.tcNote':  'TC Tacos runs 3 food trucks and can serve up to 3 events per day. Your $200 deposit reserves the date. The remaining balance is confirmed after Tony reviews your event details.',

    'footer.tagline':      'Fresh taco catering for backyard parties, weddings, and events across the Tri-Cities. Reserve with a $200 deposit.',
    'footer.navLabel':     'Sections',
    'footer.packages':     'Packages',
    'footer.contactLabel': 'Contact',
    'footer.copy':         '&copy; 2025 TC Tacos Catering. All rights reserved.',

    'shared.bookDate': 'Book Date',
  },

  es: {
    'nav.home':  'Inicio',
    'nav.menu':  'Men&uacute;',
    'nav.book':  'Reservar Ahora',

    'hero.eyebrow':     'Servicio de Tacos Para Eventos &nbsp;&middot;&nbsp; Tri-Cities, WA',
    'hero.tagline':     'El Mejor Servicio de la Ciudad',
    'hero.subheadline': 'Servicio de tacos frescos para fiestas en casa, bodas, eventos de trabajo y celebraciones en Tri-Cities.',
    'hero.badge1':      '3 Food Trucks',
    'hero.badge2':      'Preparado Fresco En El Evento',
    'hero.badge3':      '$200 Reserva Tu Fecha',
    'hero.viewMenu':    'Ver Men&uacute;',

    'stats.headline': 'Food Trucks Reales.<br>Comida Real.',
    'stats.subhead':  'Fresco en el evento. A tu orden. $200 reserva tu fecha.',
    'stats.trucks':   'Food Trucks',
    'stats.events':   'Eventos Por D&iacute;a',
    'stats.deposit':  'Dep&oacute;sito para Reservar',
    'stats.area':     '&Aacute;rea de Servicio',
    'stats.menuBtn':  'Ver el Men&uacute;',

    'menu.eyebrow':          'Lo Que Servimos',
    'menu.headline':         'Men&uacute;',
    'menu.subhead':          'Preparado fresco en el evento para fiestas en casa, bodas, eventos de trabajo y celebraciones completas.',
    'menu.onTruck':          'Lo Que Hay En El Food Truck',
    'menu.cat.tacos':        'Tacos',
    'menu.cat.quesadillas':  'Quesadillas',
    'menu.cat.specialties':  'Especialidades',
    'menu.cat.drinks':       'Bebidas',
    'menu.note':             'Las opciones del men&uacute; pueden variar seg&uacute;n el evento.',

    'pkg.eyebrow':     'Reserva Tu Fecha',
    'pkg.headline':    'Elige Tu Paquete',
    'pkg.subhead':     'Reserva tu fecha con un dep&oacute;sito de $200. Tony confirmar&aacute; tu men&uacute;, n&uacute;mero de invitados y precio final.',
    'pkg.small':       'Evento Peque&ntilde;o',
    'pkg.standard':    'Evento Est&aacute;ndar',
    'pkg.large':       'Evento Grande',
    'pkg.startingAt':  'Desde',
    'pkg.smallDesc':   'Perfecto para fiestas en casa, cenas familiares y reuniones informales.',
    'pkg.standardDesc':'Ideal para cumplea&ntilde;os, eventos de empresa, fiestas de graduaci&oacute;n y celebraciones de fin de semana.',
    'pkg.largeDesc':   'Ideal para bodas, recepciones, fiestas de vecindario y eventos comunitarios.',
    'pkg.depositNote': 'Dep&oacute;sito de $200 para reservar',
    'pkg.reserveBtn':  'Reservar Con Dep&oacute;sito de $200',
    'pkg.note':        'El precio final depende del n&uacute;mero de invitados, opciones del men&uacute;, ubicaci&oacute;n y detalles del evento.',

    'cta.eyebrow': 'Listo Para Reservar',
    'cta.heading': 'Reserva Tu Fecha',
    'cta.body':    'Elige una hora en Calendly para que Tony pueda confirmar los detalles de tu evento, men&uacute;, n&uacute;mero de invitados, ubicaci&oacute;n y precio final.',

    'book.eyebrow': 'Listo Para Reservar',
    'book.heading': 'Reserva Tu Fecha',
    'book.body':    'Elige una hora en Calendly para que Tony pueda confirmar los detalles de tu evento, men&uacute;, n&uacute;mero de invitados, ubicaci&oacute;n y precio final.',
    'book.tcNote':  'TC Tacos tiene 3 food trucks y puede servir hasta 3 eventos por d&iacute;a. Tu dep&oacute;sito de $200 reserva la fecha. El saldo restante se confirma despu&eacute;s de que Tony revise los detalles de tu evento.',

    'footer.tagline':      'Servicio de tacos frescos para fiestas en casa, bodas y eventos en Tri-Cities. Reserva con un dep&oacute;sito de $200.',
    'footer.navLabel':     'Navegaci&oacute;n',
    'footer.packages':     'Paquetes',
    'footer.contactLabel': 'Contacto',
    'footer.copy':         '&copy; 2025 TC Tacos Catering. Todos los derechos reservados.',

    'shared.bookDate': 'Reservar Fecha',
  }
};

function applyLang(lang) {
  var t = TC_LANG[lang] || TC_LANG.en;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  try { localStorage.setItem('tc-lang', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  var saved = 'en';
  try { saved = localStorage.getItem('tc-lang') || 'en'; } catch (e) {}
  applyLang(saved);
});
