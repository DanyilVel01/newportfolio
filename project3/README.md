# VALENCE ARCHIVE — Streetwear & Footwear Platform (Nike-Style)

A complete, high-performance, modular e-commerce landing page and catalog platform designed for the streetwear brand **VALENCE ARCHIVE**, built following Nike's modern visual design language, micro-interactions, and typography, enhanced with **GSAP & Bombon.rs** Awwwards-tier motion styles.

---

## 📁 Modular Project Structure

All assets, styles, and scripts are cleanly separated into dedicated directories:

```
brand-website/
├── index.html            # Clean, semantic HTML5 structure & layout
├── css/
│   └── styles.css        # Complete CSS design system, responsive styles & GSAP motion
└── js/
    ├── products.js       # 60 AI-created streetwear products & currency converter
    ├── animations.js     # GSAP, Lenis smooth scroll, fluid cursor, 3D card tilt, magnetic buttons
    └── app.js            # Core e-commerce logic (catalog rendering, filters, PDP modal, cart, wishlist)
```

---

## 🌟 Key Features & Architecture

### 1. 60 AI-Created Streetwear Products (`js/products.js`)
- **Hoodies & Heavyweight Fleece** (12 items): 500+ GSM French Terry, boxy fits, acid washes, deconstructed raw seams, 3M reflective hits.
- **Jackets & Technical Shells** (10 items): GORE-TEX 3L modular parkas, 700-fill cropped down puffers, flight bombers, utility vests.
- **T-Shirts & Tops** (12 items): 300 GSM boxy cut tees, tactile 3D puff graphics, mock-neck long sleeves, thermal waffle layers.
- **Pants & Cargo Bottoms** (10 items): Bungee parachute pants, modular webbing cargo, 14oz Japanese selvedge denim, wide-leg fleece.
- **Footwear Division** (8 items): Chunky technical runners, Vibram lug outsoles, skate retros, combat boots, sculpted foam mules.
- **Accessories & Bags** (8 items): 1000D Cordura cross-body rigs, 100% extra-fine merino beanies, Fidlock belts, 24oz duffles.

### 2. GSAP & Bombon.rs Awwwards-Tier Motion (`js/animations.js` & `css/styles.css`)
- **Lenis Smooth Inertial Scroll**: Buttery smooth momentum scrolling synced with GSAP ticker (`ScrollTrigger.update`).
- **Awwwards Fluid Cursor**: Trailing cursor dot + elastic ring with `mix-blend-mode: difference` that expands over clickable elements.
- **Hero Floating Elements**: Floating technical spec pills with continuous sine-wave physics and mouse parallax depth tracking (inspired by the floating candies in Bombon.rs).
- **Interactive Rotating Stamp Badge**: Signature circular rotating stamp sticker in the bottom corner that spins, accelerates on scroll velocity, and features magnetic hover tilt.
- **3D Perspective Card Tilt**: Smooth 3D tilt on all 60 product cards based on cursor position (`perspective: 1000px`).
- **Magnetic Buttons**: CTAs and action buttons magnetically follow cursor proximity.
- **ScrollTrigger Sequence**: Staggered reveals for hero elements, catalog cards, and lookbook images.

### 3. Nike-Style Product Detail Modal (PDP)
- Dynamic URL hash routing (`#product/val-01`), enabling native browser back/forward history navigation.
- Multi-angle gallery preview with interactive thumbnails.
- Dynamic colorway swatch selector.
- Interactive size grid with real-time stock alert counters.
- Interactive accordions: Technical Specifications, Shipping & Free Returns, and Verified Customer Reviews.
- "Complete The Look" curated outfit pairings for cross-selling.

### 4. Interactive Shopping Bag & Wishlist (`js/app.js`)
- Slide-over drawer with item quantity increments and deletions.
- Free shipping progress bar with dynamic target calculation ($150 threshold).
- Promo code engine (Use code **`STREET20`** for an instant 20% discount).
- Interactive simulated express checkout.
- Persistent saved items across sessions via `localStorage`.

### 5. Multi-Currency Engine
- Switch between **USD ($)**, **EUR (€)**, **GBP (£)**, and **RUB (₽)** with live instant recalculation across all 60 products, product modal, cart, and shipping limits.

---

## 🚀 How to Run

No build tools, node packages, or Python required!

Simply open:
```
index.html
```
directly in Google Chrome, Microsoft Edge, Safari, or Firefox.
