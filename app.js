/**
 * ==========================================================================
 * TC Tacos Catering - Application Script & Data Object
 * ==========================================================================
 * 
 * DESIGN VIBE: Warm fire glow, smoky night market, mobile-first, cinematic.
 * 
 * TODO COMMENTS FOR TONY:
 * - [TODO] Final Menu: Update CATERING_DATA.menu with final tacos, quesadillas, drinks, and sides.
 * - [TODO] Final Package Names: Update CATERING_DATA.packages with custom names.
 * - [TODO] Final Package Prices: Replace deposit or add total prices to CATERING_DATA.packages.
 * - [TODO] Final Service Area: Update CATERING_DATA.businessInfo.serviceArea.
 * - [TODO] Final Calendly Link: Replace CATERING_DATA.businessInfo.calendlyUrl.
 * - [TODO] Final Logo: Place the final logo in /assets/logo.png (currently uses demo placeholder).
 * - [TODO] Final Photos: Replace gallery-*.jpg with actual photos.
 * - [TODO] Final Videos: Replace tc-tacos-bg.mp4 with the actual video file.
 */

// Centralized Data Object for easy management
const CATERING_DATA = {
  businessInfo: {
    name: "TC Tacos Catering",
    contactName: "Tony Chairez",
    phone: "(509) 713-3555",
    phoneRaw: "5097133555",
    email: "tctacoscatering@yahoo.com",
    instagram: "@tctacoscatering",
    instagramUrl: "https://instagram.com/tctacoscatering",
    facebook: "TC Tacos Catering",
    facebookUrl: "https://facebook.com/tctacoscatering",
    // [TODO] Update service area details here
    serviceArea: "Tri-Cities and surrounding Eastern Washington areas",
    // [TODO] Update Calendly link here
    calendlyUrl: "https://calendly.com/tctacoscatering/catering-reservation",
    deposit: "$200",
    trucksCount: 3,
    maxEventsPerDay: 3
  },
  
  // [TODO] Update menu list with final items and badges
  menu: [
    {
      category: "Street Tacos",
      badge: "Sample Menu",
      items: [
        { name: "Asada", desc: "Finely grilled steak marinated in house citrus and spices." },
        { name: "Al Pastor", desc: "Traditional pork marinated in chili, spices, and pineapple." },
        { name: "Pollo", desc: "Tender, grilled chicken breast seasoned with Mexican herbs." }
      ]
    },
    {
      category: "Quesadillas",
      badge: "Sample Menu",
      items: [
        { name: "Asada", desc: "Melted cheese with carne asada in a folded flour tortilla." },
        { name: "Al Pastor", desc: "Melted cheese with seasoned al pastor pork." },
        { name: "Pollo", desc: "Melted cheese with grilled chicken breast." }
      ]
    },
    {
      category: "Drinks",
      badge: "Ask About Availability",
      items: [
        { name: "Sodas", desc: "Selection of refreshing canned sodas and traditional waters." }
      ]
    },
    {
      category: "Seasonal Specials",
      badge: "Final Menu Coming Soon",
      items: [
        { name: "Taco Boxes", desc: "Perfectly packed taco boxes ready for events." },
        { name: "Quesabirrias with Consomé", desc: "Sizzling cheese and tender beef birria tacos served with rich dipping broth." }
      ]
    }
  ],

  // [TODO] Customize package details, naming, or add total prices
  packages: [
    {
      id: "small-catering",
      name: "Small Event Catering",
      description: "Great for smaller parties, family gatherings, and casual events.",
      isPopular: false,
      details: [
        "Final guest count range coming soon",
        "Final event length coming soon",
        "Final price coming soon"
      ]
    },
    {
      id: "standard-catering",
      name: "Standard Event Catering",
      description: "A strong option for birthdays, work events, private parties, and weekend celebrations.",
      isPopular: true,
      details: [
        "Final guest count range coming soon",
        "Final event length coming soon",
        "Final price coming soon"
      ]
    },
    {
      id: "large-catering",
      name: "Large Event Catering",
      description: "Built for weddings, community events, large parties, and busy gatherings.",
      isPopular: false,
      details: [
        "Final guest count range coming soon",
        "Final event length coming soon",
        "Final price coming soon"
      ]
    }
  ],

  services: [
    { name: "Birthday Parties", icon: "fa-birthday-cake" },
    { name: "Family Gatherings", icon: "fa-users" },
    { name: "Weddings", icon: "fa-heart" },
    { name: "Work Events", icon: "fa-briefcase" },
    { name: "Pop-Ups", icon: "fa-store" },
    { name: "Community Events", icon: "fa-bullhorn" },
    { name: "Private Parties", icon: "fa-glass-cheers" }
  ],

  // [TODO] Replace with actual images (e.g. client portfolio)
  gallery: [
    { title: "Fresh Tacos", image: "./assets/gallery-1.jpg" },
    { title: "Quesadillas", image: "./assets/gallery-2.jpg" },
    { title: "Event Setup", image: "./assets/gallery-3.jpg" },
    { title: "Food Truck Catering", image: "./assets/gallery-4.jpg" },
    { title: "Grill Action", image: "./assets/gallery-5.jpg" },
    { title: "Catering Service", image: "./assets/gallery-6.jpg" }
  ],

  faqs: [
    {
      q: "How do I reserve catering?",
      a: "Choose an available date and time through the booking calendar, answer the event questions, and pay the $200 deposit to reserve your spot."
    },
    {
      q: "What does the $200 deposit do?",
      a: "The deposit holds your selected date and time. Tony will follow up later with the remaining balance and final catering details."
    },
    {
      q: "Can TC Tacos handle more than one event per day?",
      a: "Yes. TC Tacos Catering has 3 food trucks, which allows up to 3 events per day depending on availability."
    },
    {
      q: "What areas do you serve?",
      a: "TC Tacos Catering serves the Tri-Cities and surrounding Eastern Washington areas. Final service area details will be confirmed soon."
    },
    {
      q: "What food options are available?",
      a: "Sample menu options include tacos, quesadillas, sodas, and seasonal specials. The final catering menu will be added soon."
    },
    {
      q: "Do I pay the full amount online?",
      a: "No. The website collects the reservation deposit. Tony will follow up with the remaining invoice and final details."
    }
  ]
};

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderPackages();
  renderServices();
  renderGallery();
  renderFAQs();
  initNavigation();
  initVideoFallback();
  initCalendlyLoader();
});

// Render Menu Preview Section
function renderMenu() {
  const menuContainer = document.getElementById("menu-grid-target");
  if (!menuContainer) return;

  menuContainer.innerHTML = CATERING_DATA.menu.map(cat => `
    <div class="glass-card menu-card">
      <div>
        <div class="menu-card-header">
          <h3 class="menu-card-title">${cat.category}</h3>
          <span class="badge badge-sample">${cat.badge}</span>
        </div>
        <ul class="menu-items-list">
          ${cat.items.map(item => `
            <li class="menu-item">
              <span class="menu-item-name">${item.name}</span>
              <span class="menu-item-desc">${item.desc}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// Render Packages Section
function renderPackages() {
  const packagesContainer = document.getElementById("packages-grid-target");
  if (!packagesContainer) return;

  packagesContainer.innerHTML = CATERING_DATA.packages.map(pkg => `
    <div class="glass-card package-card ${pkg.isPopular ? 'popular' : ''}">
      ${pkg.isPopular ? '<span class="package-badge">RECOMMENDED</span>' : ''}
      <div>
        <div class="package-header">
          <h3>${pkg.name}</h3>
          <p class="package-description">${pkg.description}</p>
        </div>
        <div class="package-deposit-info">
          <span class="deposit-label">Date Hold Deposit</span>
          <span class="deposit-val">${CATERING_DATA.businessInfo.deposit}</span>
        </div>
        <ul class="package-details-list">
          ${pkg.details.map(detail => `
            <li>
              <i class="fas fa-check-circle"></i>
              <span>${detail}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <a href="#booking" class="btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline-glow'}">
        Reserve with $200 Deposit
      </a>
    </div>
  `).join('');
}

// Render Catering Services Section
function renderServices() {
  const servicesContainer = document.getElementById("services-grid-target");
  if (!servicesContainer) return;

  servicesContainer.innerHTML = CATERING_DATA.services.map(svc => `
    <div class="glass-card service-card">
      <div class="service-icon-box">
        <i class="fas ${svc.icon}"></i>
      </div>
      <h3>${svc.name}</h3>
    </div>
  `).join('');
}

// Render Gallery Section
function renderGallery() {
  const galleryContainer = document.getElementById("gallery-grid-target");
  if (!galleryContainer) return;

  galleryContainer.innerHTML = CATERING_DATA.gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-title">${item.title}</span>
      </div>
    </div>
  `).join('');
}

// Render FAQs Section
function renderFAQs() {
  const faqContainer = document.getElementById("faqs-target");
  if (!faqContainer) return;

  faqContainer.innerHTML = CATERING_DATA.faqs.map((faq, index) => `
    <div class="accordion-item">
      <button class="accordion-header" aria-expanded="false" data-faq-index="${index}">
        <h3>${faq.q}</h3>
        <i class="fas fa-chevron-down accordion-icon"></i>
      </button>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>${faq.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Attach Accordion Toggle Event Listeners
  const headers = faqContainer.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains("active");

      // Close all other accordion items
      faqContainer.querySelectorAll(".accordion-item").forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = null;
        otherItem.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// Smooth scroll implementation & Header style change on scroll
function initNavigation() {
  const header = document.querySelector("header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Handle smooth scroll clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80; // height of header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Handle fallback if background video fails to load/is missing
function initVideoFallback() {
  const video = document.getElementById("hero-video");
  if (!video) return;

  // Trigger fallback if video fails to load or error occurs
  video.addEventListener("error", () => {
    triggerVideoFallback(video);
  });

  // Also verify video loads within a reasonable time. If not, trigger fallback
  const videoTimeout = setTimeout(() => {
    if (video.readyState < 3) { // Have not received enough data to play
      triggerVideoFallback(video);
    }
  }, 4000);

  video.addEventListener("canplay", () => {
    clearTimeout(videoTimeout);
  });
}

function triggerVideoFallback(videoElement) {
  console.log("Background video placeholder not found or failed to load. Applying high-fidelity smoky CSS fallback.");
  videoElement.style.display = "none";
  const heroWrapper = document.querySelector(".hero-wrapper");
  if (heroWrapper) {
    heroWrapper.classList.add("smoky-fallback");
  }
}

// Check when Calendly loads to remove spinner
function initCalendlyLoader() {
  const widget = document.querySelector(".calendly-inline-widget");
  if (!widget) return;

  // Calendly widgets dynamically inject an iframe. We poll for it.
  const checkIframe = setInterval(() => {
    const iframe = widget.querySelector("iframe");
    if (iframe) {
      iframe.addEventListener("load", () => {
        const spinner = document.querySelector(".calendly-loading-spinner");
        if (spinner) {
          spinner.style.opacity = "0";
          setTimeout(() => spinner.style.display = "none", 300);
        }
      });
      clearInterval(checkIframe);
    }
  }, 500);

  // Safety fallback to hide loader after 5 seconds anyway
  setTimeout(() => {
    const spinner = document.querySelector(".calendly-loading-spinner");
    if (spinner && spinner.style.display !== "none") {
      spinner.style.opacity = "0";
      setTimeout(() => spinner.style.display = "none", 300);
    }
  }, 5000);
}
