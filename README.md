# TC Tacos Catering - Cinematic Sample Website

A premium, cinematic, mobile-first one-page sample website built for **TC Tacos Catering** to show the client (Tony Chairez) what the final site could look like before menu, pricing, packages, photos, and Calendly integrations are finalized.

## Vibe & Design Aesthetics
- **Color Palette**: Charcoal black backgrounds, deep fire red borders, warm orange/amber glowing buttons, cream/off-white readable body copy, and a fresh cilantro-green accent.
- **Cinematic Experience**: Features radial fire glows, glassmorphism cards (`backdrop-filter`), smooth scroll offsets, responsive accordion FAQ logic, and a dynamic fallback background gradient if the main background video fails to load.
- **Mobile-First Layout**: Fully optimized for mobile screens including a persistent bottom action bar containing quick action buttons: **Reserve**, **Call**, and **Text**.

---

## File Structure
```
├── index.html          # Semantic HTML structure & widget scripts
├── styles.css          # Vanilla CSS variables, animations, and layouts
├── app.js              # Application logic and editable content object
├── README.md           # Documentation
└── assets/
    ├── logo.png        # Sample logo (extracted from online profile)
    ├── gallery-1.jpg   # Fresh Tacos gallery placeholder
    ├── gallery-2.jpg   # Quesadillas gallery placeholder
    ├── gallery-3.jpg   # Event Setup gallery placeholder
    ├── gallery-4.jpg   # Food Truck Catering gallery placeholder
    ├── gallery-5.jpg   # Grill Action gallery placeholder
    └── gallery-6.jpg   # Catering Service gallery placeholder
```

---

## How to Run Locally

Since this is a static website utilizing pure HTML, CSS, and modern JavaScript, there are no dependencies or complex compilation steps.

1. **Direct browser check**: Double-click [index.html](index.html) to open the page directly in any modern browser.
2. **Local Server (Recommended)**: Use a lightweight HTTP server to prevent CORS issues with local assets (e.g., using VS Code Live Server, or Python's HTTP module: `python -m http.server 8000`).

---

## How to Update Site Content

The website is designed with a centralized configuration pattern. All menus, service packages, FAQs, contact info, and media paths are stored inside a single JavaScript data object (`CATERING_DATA`) at the top of [app.js](app.js). 

Tony or a developer can easily customize the site by changing the corresponding fields:

* **Update Contact Details**: Change values under `CATERING_DATA.businessInfo` (such as phone numbers, email, or social links).
* **Update the Calendly Widget**: Replace the `calendlyUrl` inside `CATERING_DATA.businessInfo` with the client's official booking link.
* **Update the Menu**: Modify the arrays in `CATERING_DATA.menu` to update names, ingredients, or availability badges.
* **Modify Packages**: Edit details or pricing structures inside `CATERING_DATA.packages`.

All TODO comments are marked with `[TODO]` in [index.html](index.html), [styles.css](styles.css), and [app.js](app.js) to indicate final asset replacement targets.

---

## License
&copy; 2026 TC Tacos Catering. Prototype sample layout. All rights reserved.
