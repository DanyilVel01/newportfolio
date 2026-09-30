/* ==========================================================================
   VALENCE ARCHIVE | PRODUCTS DATA & CURRENCY SYSTEM
   60 AI-CREATED TECHNICAL STREETWEAR & FOOTWEAR PRODUCTS
   ========================================================================== */

/* --------------------------------------------------------------------------
   CURRENCY CONFIGURATION & CONVERSION
   -------------------------------------------------------------------------- */
const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, decimals: 0 },
  EUR: { symbol: '€', rate: 0.92, decimals: 0 },
  GBP: { symbol: '£', rate: 0.79, decimals: 0 },
  RUB: { symbol: '₽', rate: 92.0, decimals: 0 }
};
let currentCurrency = 'USD';

function formatPrice(amountInUSD) {
  const conf = CURRENCIES[currentCurrency];
  const converted = amountInUSD * conf.rate;
  if (currentCurrency === 'RUB') {
    return Math.round(converted).toLocaleString('ru-RU') + ' ' + conf.symbol;
  }
  return conf.symbol + Math.round(converted);
}

function changeCurrency(curr) {
  currentCurrency = curr;
  const shipNotice = document.getElementById('tickerFreeShipText');
  if (shipNotice) shipNotice.textContent = formatPrice(150);
  renderCatalog();
  if (typeof currentActiveProduct !== 'undefined' && currentActiveProduct) {
    updatePdpPrice(currentActiveProduct);
  }
  updateBagUi();
}

/* --------------------------------------------------------------------------
   60 DISTINCT STREETWEAR PRODUCTS CATALOG
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  // --- 1. HOODIES & FLEECE (12 ITEMS) ---
  {
    id: "val-01",
    name: "Heavyweight Boxy Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 150,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 142,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Bone", hex: "#e8e4dc" },
      { name: "Olive", hex: "#4b5320" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Engineered from custom 520 GSM loopback cotton fleece. Features an architectural drop-shoulder cut, double-lined hood without drawstrings for a sleek profile, and reinforced ribbed trims.",
    details: ["520 GSM 100% Combed Cotton", "Pre-shrunk Japanese French Terry", "Seamless kangaroo pouch pocket", "Made in Portugal"],
    model: "Model is 6'1\" (185 cm) wearing size L (Relaxed drape)"
  },
  {
    id: "val-02",
    name: "Tactical Half-Zip Polar Pullover",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 140,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 96,
    badge: "NEW DROP",
    gender: "Men",
    colors: [
      { name: "Grey", hex: "#666666" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dense 380 GSM thermal polar fleece with a nylon ripstop chest pocket and matte hardware. Stand collar shields against wind chill.",
    details: ["380 GSM Recycled Polar Fleece", "Water-repellent nylon chest overlay", "YKK VISLON half zipper", "Cinch cord hem"],
    model: "Model is 6'0\" (183 cm) wearing size M"
  },
  {
    id: "val-03",
    name: "Acid Washed Distressed Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 155,
    originalPrice: 175,
    rating: 4.9,
    reviewsCount: 118,
    badge: "LIMITED",
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#444444" },
      { name: "Sand", hex: "#b5a38a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Individual mineral acid wash treatments give each piece a unique vintage patina. Subtle artisanal distressing at cuffs and hem.",
    details: ["480 GSM Cotton Terry", "Hand-finished mineral wash", "Oversized boxy cut", "Tonal embroidered logo"],
    model: "Model is 5'11\" (180 cm) wearing size L"
  },
  {
    id: "val-04",
    name: "Cybernetic 3M Reflective Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 165,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 78,
    badge: "DROP 05",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Volt", hex: "#d4ff00" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Featuring high-luminescence 3M reflective typography across the spine. High-density organic cotton engineered for nightlife visibility.",
    details: ["500 GSM Loopback Fleece", "Reflective 3M Scotchlite graphic", "Ergonomic sleeve articulation"],
    model: "Model is 6'2\" (188 cm) wearing size XL"
  },
  {
    id: "val-05",
    name: "Minimalist Valence Boxy Crewneck",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 130,
    originalPrice: 150,
    rating: 4.7,
    reviewsCount: 88,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Bone", hex: "#e8e4dc" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A clean architectural crewneck with a micro-injected rubber logo at the nape. Crafted for effortless layering over oversized tees.",
    details: ["460 GSM Heavy Cotton", "Inverted flatlock stitching", "Reinforced rib collar"],
    model: "Model is 5'9\" (175 cm) wearing size M"
  },
  {
    id: "val-06",
    name: "Modular Asymmetric Dual-Zip Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 170,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 64,
    badge: "TECHNICAL",
    gender: "Men",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Grey", hex: "#3a3a3a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Features an off-center two-way YKK zip track allowing temperature regulation and dynamic silhouette styling.",
    details: ["Dual two-way front zippers", "Hidden media pocket", "520 GSM Brushed Cotton"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-07",
    name: "Thermal Waffle-Knit Heavy Pullover",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 135,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 52,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Olive", hex: "#4b5320" },
      { name: "Sand", hex: "#c2b280" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"],
    description: "Heavy chunky waffle texture providing superior thermal warmth without excessive bulk. Extended ribbed cuffs with thumb slots.",
    details: ["100% Organic Waffle Cotton", "Thumbhole sleeve construction", "Relaxed fit"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-08",
    name: "Sun-Faded Vintage Hooded Sweatshirt",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 145,
    originalPrice: 165,
    rating: 4.8,
    reviewsCount: 91,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Red", hex: "#8a2b2b" },
      { name: "Grey", hex: "#555555" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"],
    description: "Pigment-dyed and sun-faded by hand. Has the softness and relaxed drape of a decade-old vintage grail.",
    details: ["Vintage sun-faded wash", "Double-rib side gussets", "Heavy 480 GSM fabric"],
    model: "Model is 5'10\" (178 cm) wearing size M"
  },
  {
    id: "val-09",
    name: "Windproof Bonded Tech Fleece",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 160,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 43,
    badge: "WEATHERPROOF",
    gender: "Men",
    colors: [
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"],
    description: "Triple-bonded fabric with internal polyurethane membrane that completely halts gusting winds while retaining body warmth.",
    details: ["Bonded fleece membrane", "Taped zip pockets", "Reflective neck print"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-10",
    name: "Raw Seam Deconstructed Fleece",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 140,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 38,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Bone", hex: "#e5ded4" },
      { name: "Black", hex: "#191919" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],
    description: "Inverted 4-thread overlock seams expose the internal construction, creating raw lines across the shoulders and back.",
    details: ["Exposed exterior seams", "Raw unfinished hemline", "480 GSM Cotton"],
    model: "Model is 5'9\" (176 cm) wearing size S"
  },
  {
    id: "val-11",
    name: "Valence Stealth Lab Utility Zip",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 175,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 51,
    badge: "LAB SERIES",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"],
    description: "Designed in our Tokyo design bunker. Features hidden forearm transit-card slot and storm-proof hood gasket.",
    details: ["Sleeve contactless pocket", "Waterproof zips", "500 GSM French Terry"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-12",
    name: "Neo-Tokyo Graphic Heavy Fleece",
    category: "hoodies",
    categoryLabel: "Hoodies & Fleece",
    price: 150,
    originalPrice: 170,
    rating: 4.9,
    reviewsCount: 110,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Red", hex: "#b91c1c" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"],
    description: "High-density screenprint celebrating our flagship Tokyo opening. Heavyweight ribbed waistband keeps cold air sealed out.",
    details: ["Screenprinted archival artwork", "Pre-washed for zero shrinkage"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },

  // --- 2. OUTERWEAR & JACKETS (10 ITEMS) ---
  {
    id: "val-13",
    name: "3-Layer GORE-TEX Tactical Parka",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 340,
    originalPrice: 390,
    rating: 5.0,
    reviewsCount: 84,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Grey", hex: "#4a4a4a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The crown jewel of our technical outerwear program. 28,000mm waterproof rating with fully taped seams, magnetic Fidlock storm placket, and internal sling harness for indoor hands-free carrying.",
    details: ["GORE-TEX 3L Shell Membrane", "Internal removable carry harness", "Fidlock magnetic fasteners", "Storm-proof hood with brim wire"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-14",
    name: "Cropped 700-Fill Matte Down Puffer",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 260,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 130,
    badge: "NEW DROP",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Bone", hex: "#e0ded9" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra-plush 700 fill power responsibly sourced goose down wrapped in water-resistant matte Japanese ripstop nylon. Modern cropped silhouette with cinchable waist.",
    details: ["700 Fill Power Down (90/10)", "DWR matte ripstop shell", "Fleece-lined handwarmer pockets", "Internal storm cuffs"],
    model: "Model is 5'10\" (179 cm) wearing size M"
  },
  {
    id: "val-15",
    name: "Reversible MA-1 Flight Bomber",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 220,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 95,
    badge: "SALE",
    gender: "Men",
    colors: [
      { name: "Olive", hex: "#4b5320" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"],
    description: "Heritage military MA-1 silhouette re-engineered with modern proportions. Flips inside-out to reveal high-visibility emergency orange insulation.",
    details: ["Heavyweight 210D flight nylon", "Reversible dual-tone design", "Heavy gauge utility arm zip"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-16",
    name: "Ripstop Kangaroo Anorak Windbreaker",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 175,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 48,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Olive", hex: "#3e4827" },
      { name: "Grey", hex: "#525252" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"],
    description: "Packs into its own oversized center kangaroo pouch. Ultra-light diamond ripstop with DWR coating deflects sudden downpours.",
    details: ["Packable into chest pocket", "Underarm breathable mesh vents", "Elasticated hem toggle"],
    model: "Model is 6'0\" (183 cm) wearing size M"
  },
  {
    id: "val-17",
    name: "Tactical Multi-Pocket Combat Vest",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 140,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 67,
    badge: "UTILITY",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0d0d0d" },
      { name: "Sand", hex: "#b5a38a" }
    ],
    sizes: ["S/M", "L/XL"],
    image: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80"],
    description: "8 strategically placed cargo bellows pockets, military webbing straps, and lightweight breathable mesh back lining for layering over hoodies.",
    details: ["500D Cordura Construction", "8 Compartment Storage", "Adjustable side buckles"],
    model: "Model is 6'1\" (185 cm) wearing size L/XL"
  },
  {
    id: "val-18",
    name: "Technical Flannel-Lined Coach Jacket",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 160,
    originalPrice: 185,
    rating: 4.6,
    reviewsCount: 39,
    badge: null,
    gender: "Men",
    colors: [
      { name: "Grey", hex: "#2b2b2b" },
      { name: "Bone", hex: "#dedcd7" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"],
    description: "A streetwear staple updated with heavyweight cotton flannel lining and matte black coated metal snap closures.",
    details: ["Water-shedding outer shell", "Soft brushed cotton lining", "Drawcord bottom hem"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-19",
    name: "Volt-Accent Storm-Shell Anorak",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 210,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 54,
    badge: "NEW DROP",
    gender: "Unisex",
    colors: [
      { name: "Volt", hex: "#d4ff00" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"],
    description: "Neon electric volt contrast tape lines and waterproof taped zip garages. Engineered for dark rainy nights in high-density traffic.",
    details: ["20K/20K Waterproof Membrane", "Contrast heat-welded seams", "Laser-cut ventilation eyelets"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-20",
    name: "Distressed Vegan Leather Oversized Moto",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 280,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 72,
    badge: "GRAIL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#151515" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"],
    description: "Ultra-heavy vegetable-tanned synthetic leather with hand-scuffed distress marks on lapels and elbows. Heavyweight satin lining.",
    details: ["Custom heavyweight vegan hide", "Chunky silver YKK #10 hardware", "Boxy drop-shoulder cut"],
    model: "Model is 5'11\" (180 cm) wearing size M"
  },
  {
    id: "val-21",
    name: "Quilted Insulated Streetwear Liner",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 170,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 31,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Olive", hex: "#4b5320" },
      { name: "Sand", hex: "#c5b39a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"],
    description: "Onion-quilted ripstop filled with lightweight recycled thermal insulation. Perfect stand-alone outer layer or snap-in mid-layer.",
    details: ["Onion-pattern stitching", "Cotton bound hem and cuffs", "Twin deep stash pockets"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-22",
    name: "Modern Technical Oversized Trench",
    category: "outerwear",
    categoryLabel: "Outerwear & Jackets",
    price: 290,
    originalPrice: 340,
    rating: 5.0,
    reviewsCount: 46,
    badge: "LIMITED",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0b0b0b" },
      { name: "Sand", hex: "#baa88f" }
    ],
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"],
    description: "Streetwear interpretation of the iconic trench coat. Features an integrated nylon webbing belt with quick-release tactical buckle.",
    details: ["Water-repellent structured twill", "Magnetic waist buckle", "Rear storm flap with vent"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },

  // --- 3. T-SHIRTS & TOPS (12 ITEMS) ---
  {
    id: "val-23",
    name: "Heavyweight 300 GSM Boxy Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 65,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 240,
    badge: "CORE ESSENTIAL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0d0d0d" },
      { name: "White", hex: "#ffffff" },
      { name: "Olive", hex: "#4b5320" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The definitive streetwear t-shirt. Cut from massive 300 GSM single jersey with a thick 1.25\" rib collar that never sags or stretches.",
    details: ["300 GSM Combed Cotton", "High-density thick collar rib", "Zero shrinkage pre-shrunk wash"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-24",
    name: "Acid Wash Cybernetic Archive Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 70,
    originalPrice: 85,
    rating: 4.8,
    reviewsCount: 165,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#3a3a3a" },
      { name: "Bone", hex: "#ded9cf" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Custom vintage enzyme washed with cracked screen-print back graphics inspired by 90s cyber-dystopian tech documentation.",
    details: ["280 GSM Vintage Wash Jersey", "Cracked puff-ink printing", "Dropped shoulders"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-25",
    name: "Minimalist Silicone Monogram Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 60,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 92,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Grey", hex: "#666666" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"],
    description: "Subtle matte silicone emblem heat-pressed at the center sternum. Clean architectural styling for high-end casual wear.",
    details: ["100% Organic Ring-spun Cotton", "Silicone rubber micro logo", "Reinforced shoulder tape"],
    model: "Model is 5'9\" (176 cm) wearing size M"
  },
  {
    id: "val-26",
    name: "Raw Hem Distressed Skate T-Shirt",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 65,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 77,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#4c4c4c" },
      { name: "Sand", hex: "#aa997f" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"],
    description: "Raw unfinished edge cuts at hemline and sleeves with micro-grind distressing around the neckline collar.",
    details: ["Hand-distressed edges", "260 GSM single jersey", "Overdyed color treatment"],
    model: "Model is 5'11\" (180 cm) wearing size L"
  },
  {
    id: "val-27",
    name: "Mock-Neck Heavyweight Long-Sleeve",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 80,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 104,
    badge: "NEW DROP",
    gender: "Men",
    colors: [
      { name: "Black", hex: "#0c0c0c" },
      { name: "Bone", hex: "#ded8cb" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"],
    description: "1.75\" ribbed mock turtleneck collar cut from substantial 320 GSM jersey. Excellent standalone piece or under-vest layer.",
    details: ["320 GSM Double Knit Cotton", "Ribbed cuffs with stretch retention", "Side split hem"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-28",
    name: "Tokyo Midnight High-Density Print Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 70,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 83,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"],
    description: "Bold Japanese typography and architectural coordinates screenprinted with 3D tactile puff ink that pops off the garment.",
    details: ["Tactile puff-print artwork", "100% Ring-spun heavyweight cotton"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-29",
    name: "Thermal Waffle Long-Sleeve Layer",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 75,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 44,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Sand", hex: "#c9bba6" },
      { name: "Grey", hex: "#444444" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"],
    description: "Deep honeycomb thermal weave that traps warm air next to skin. Features reinforced elbow patch stitching.",
    details: ["Honeycomb waffle weave", "Reinforced elbow patches", "Drop tail hem"],
    model: "Model is 6'0\" (183 cm) wearing size M"
  },
  {
    id: "val-30",
    name: "Double-Layer Faux Undershirt Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 75,
    originalPrice: 90,
    rating: 4.9,
    reviewsCount: 61,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#4b5320" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"],
    description: "Contrasting white knit trim at hem and sleeves replicates a perfectly proportioned layered streetwear look with zero bunching.",
    details: ["Integrated contrast layering", "280 GSM cotton body", "Boxy modern fit"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-31",
    name: "Reflective Isometric Grid Top",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 68,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 50,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0b0b0b" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"],
    description: "Clean geometric grid lines running down the lateral sleeves and center back, printed with luminous glass-bead reflective ink.",
    details: ["Glass-bead reflective printing", "100% Combed Cotton"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-32",
    name: "Heavyweight Boxy Streetwear Tank",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 55,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 36,
    badge: null,
    gender: "Men",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"],
    description: "Generously dropped armholes with reinforced binding and an oversized body block engineered for gym or summer street layering.",
    details: ["260 GSM Dense Jersey", "Wide cut shoulder straps"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-33",
    name: "Vintage Pigment Dyed Relaxed Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 65,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 114,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Sand", hex: "#c2b280" },
      { name: "Olive", hex: "#5a6336" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"],
    description: "Garment dyed in small artisanal batches for rich tonal depth. Soft peach-skin finish with zero stiffness.",
    details: ["Artisanal garment dye", "Super-soft enzyme wash", "Drop shoulder cut"],
    model: "Model is 5'10\" (178 cm) wearing size M"
  },
  {
    id: "val-34",
    name: "Prototype Technical Pocket Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts & Tops",
    price: 72,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 68,
    badge: "TECHNICAL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#555555" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"],
    description: "Features a bonded waterproof nylon chest pocket with matte zipper garage and engraved metal zipper pull.",
    details: ["Bonded ripstop pocket", "Weatherproof zip", "300 GSM Heavy Jersey"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },

  // --- 4. PANTS & CARGO (10 ITEMS) ---
  {
    id: "val-35",
    name: "Parachute Multi-Zip Oversized Pants",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 160,
    originalPrice: 190,
    rating: 5.0,
    reviewsCount: 195,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0d0d0d" },
      { name: "Grey", hex: "#5a5a5a" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The viral parachute pant silhouette. Crafted from crisp, whisper-quiet micro-nylon with knee pleats for maximum volume and elastic bungee toggle cuffs.",
    details: ["Ultra-lightweight crisp nylon", "Articulated knee darts", "Bungee ankle cinch cords", "Elastic drawcord waistband"],
    model: "Model is 6'1\" (185 cm) wearing size M (Oversized volume)"
  },
  {
    id: "val-36",
    name: "Modular Webbing Tactical Cargo",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 175,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 142,
    badge: "NEW DROP",
    gender: "Men",
    colors: [
      { name: "Olive", hex: "#434b22" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heavy-duty ripstop cargo featuring 6 deep bellowed storage pockets and integrated nylon webbing straps for adjusting calf taper.",
    details: ["Heavyweight 320 GSM Cotton Ripstop", "6 Utility Compartments", "Taper adjustment straps", "YKK Hardware"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-37",
    name: "500 GSM Wide-Leg Heavy Sweatpants",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 140,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 88,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#666666" },
      { name: "Black", hex: "#0e0e0e" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],
    description: "No cuffs, just pure wide-leg drape over your sneakers. Made from our signature 500 GSM French Terry with thick braided drawcords.",
    details: ["500 GSM Heavyweight Terry", "Open straight hem leg opening", "Deep jersey pocket bags"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },
  {
    id: "val-38",
    name: "Technical Straight Carpenter Pant",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 155,
    originalPrice: 175,
    rating: 4.8,
    reviewsCount: 79,
    badge: "SALE",
    gender: "Men",
    colors: [
      { name: "Sand", hex: "#baa88e" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"],
    description: "Double-layered knee panels with riveted stress points. Classic workwear DNA infused with modern streetwear drape.",
    details: ["12oz Heavy Duck Canvas", "Double-knee reinforcement", "Side hammer loop"],
    model: "Model is 6'1\" (185 cm) wearing size 32"
  },
  {
    id: "val-39",
    name: "14oz Japanese Selvedge Relaxed Denim",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 190,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 112,
    badge: "GRAIL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#161616" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"],
    description: "Milled in Kojima, Japan on vintage shuttle looms. Relaxed straight leg cut with silver selvedge ID line.",
    details: ["14oz Kurabo Japanese Selvedge", "Silver ticker selvedge line", "Heavy metal donut button fly"],
    model: "Model is 6'0\" (183 cm) wearing size 32"
  },
  {
    id: "val-40",
    name: "Nylon Weatherproof Wind Pants",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 130,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 45,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Volt", hex: "#d4ff00" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"],
    description: "High-contrast lateral track piping with ankle side zippers allowing you to expand the flare over bulky sneakers.",
    details: ["Windproof technical nylon", "Zippered ankle gussets", "Breathable mesh lining"],
    model: "Model is 6'1\" (185 cm) wearing size L"
  },
  {
    id: "val-41",
    name: "Pleated Wide-Leg Streetwear Trousers",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 165,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 63,
    badge: "NEW DROP",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Grey", hex: "#3f3f3f" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"],
    description: "Deep double front pleats give a tailored high-fashion drape, combined with a relaxed streetwear rise and hidden waistband elastic.",
    details: ["Heavy poly-rayon twill", "Double front pleats", "Hidden stretch waistband"],
    model: "Model is 5'11\" (180 cm) wearing size M"
  },
  {
    id: "val-42",
    name: "Tactical Bellows Cargo Shorts",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 120,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 56,
    badge: null,
    gender: "Men",
    colors: [
      { name: "Olive", hex: "#4b5320" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80"],
    description: "Below-the-knee baggy silhouette with expandable accordion cargo pockets and quick-dry water-resistant finish.",
    details: ["Water-shedding ripstop fabric", "Below-knee skate cut", "Gusseted crotch"],
    model: "Model is 6'0\" (183 cm) wearing size L"
  },
  {
    id: "val-43",
    name: "Heavy French Terry Relaxed Shorts",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 95,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 130,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Bone", hex: "#e5ded4" },
      { name: "Grey", hex: "#555555" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"],
    description: "500 GSM loopback cotton shorts with raw hem edges and extra long drawstrings with metal aglets.",
    details: ["500 GSM Combed Cotton", "Raw cut bottom hem", "Deep front pockets"],
    model: "Model is 6'1\" (185 cm) wearing size M"
  },
  {
    id: "val-44",
    name: "Asymmetric Articulated Bungee Cargo",
    category: "pants",
    categoryLabel: "Pants & Cargo",
    price: 180,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 71,
    badge: "TECHNICAL",
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#444444" },
      { name: "Sand", hex: "#baa88f" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"],
    description: "Spiral leg seam architecture allows uninhibited leg movement. Diagonal quick-access utility zip pocket on right thigh.",
    details: ["Articulated spiral pattern", "Weather-resistant YKK zip", "Ankle cinch adjusters"],
    model: "Model is 6'2\" (188 cm) wearing size L"
  },

  // --- 5. FOOTWEAR & SNEAKERS (8 ITEMS) ---
  {
    id: "val-45",
    name: "Kinetik-01 Chunky Tech Runner",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 220,
    originalPrice: 250,
    rating: 5.0,
    reviewsCount: 215,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0d0d0d" },
      { name: "Volt", hex: "#d4ff00" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Our signature silhouette. Sculpted dual-density EVA midsole with high-traction Vibram lugged rubber outsole and ballistic nylon upper.",
    details: ["Vibram Megagrip Lug Outsole", "Ballistic nylon & welded TPU overlays", "Ortholite antibacterial insole", "Reflective heel pull"],
    model: "Fits true to size. Take your standard Nike / athletic shoe size."
  },
  {
    id: "val-46",
    name: "Archive Retro Low Skate Sneaker",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 160,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 184,
    badge: "CORE ESSENTIAL",
    gender: "Unisex",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Buttery full-grain calfskin leather, vulcanized rubber foxing tape, and a padded mesh collar built to withstand intense wear.",
    details: ["Premium Nappa calfskin upper", "Reinforced double-stitch toe cap", "Cushioned skate cupsole"],
    model: "Fits true to size."
  },
  {
    id: "val-47",
    name: "Tactical High-Top Street Combat Boot",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 260,
    originalPrice: 300,
    rating: 4.9,
    reviewsCount: 88,
    badge: "LIMITED",
    gender: "Men",
    colors: [
      { name: "Black", hex: "#0b0b0b" },
      { name: "Sand", hex: "#bca98f" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
    description: "Waterproof Cordura 1000D combined with oiled nubuck leather. Quick-entry medial YKK zipper for rapid lace-free access.",
    details: ["Waterproof bootie membrane", "Speed lace hooks + side entry zip", "Oil-resistant lug sole"],
    model: "For half sizes, we recommend sizing down."
  },
  {
    id: "val-48",
    name: "Cyber-Dunk Sculpted Foam Mules",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 130,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 120,
    badge: "NEW DROP",
    gender: "Unisex",
    colors: [
      { name: "Bone", hex: "#ded9cc" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"],
    description: "Single-injected EVA foam construction with ergonomic arch contouring and lateral ventilation slots. Lightweight luxury recovery slip-on.",
    details: ["100% Injected Superfoam", "Anatomical footbed design", "Waterproof and buoyant"],
    model: "True to size. Wear barefoot or with thick socks."
  },
  {
    id: "val-49",
    name: "Aero-Knit Lightweight Street Trainer",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 170,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 94,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Grey", hex: "#3b3b3b" },
      { name: "Volt", hex: "#d4ff00" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"],
    description: "Engineered one-piece circular knit sock upper that hugs the foot like a glove. Nitrogen-infused foam sole for bounce.",
    details: ["Seamless engineered knit upper", "Dynamic speed lacing system", "Nitrogen foam cushioning"],
    model: "Fits snug like a second skin. Order 0.5 size up for wide feet."
  },
  {
    id: "val-50",
    name: "Modular Platform Court Sneaker",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 190,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 110,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Bone", hex: "#eeeae2" }
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"],
    description: "1.8\" elevated sculpted platform midsole with clean minimalist panels and embossed Valence branding on the heel tab.",
    details: ["Elevated 45mm platform height", "Italian tumbled leather", "Padded tongue and collar"],
    model: "Fits true to size."
  },
  {
    id: "val-51",
    name: "Waterproof GORE-TEX Trail Sneaker",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 230,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 76,
    badge: "ALL-WEATHER",
    gender: "Unisex",
    colors: [
      { name: "Olive", hex: "#3b4421" },
      { name: "Black", hex: "#0f0f0f" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
    description: "Impervious GORE-TEX lining keeps socks bone dry in torrential sleet and snow. Deep multi-directional chevron lugs.",
    details: ["GORE-TEX Extended Comfort bootie", "Chevron lug rubber outsole", "Quicklace single-pull cinch"],
    model: "Fits true to size."
  },
  {
    id: "val-52",
    name: "Retro 90s Chunky Basketball High",
    category: "footwear",
    categoryLabel: "Sneakers & Footwear",
    price: 210,
    originalPrice: 240,
    rating: 4.8,
    reviewsCount: 145,
    badge: "HERITAGE",
    gender: "Men",
    colors: [
      { name: "Red", hex: "#cf1e1e" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"],
    description: "Heavy ankle lockdown collar with visible heel air-cushioning chamber. Classic black, white, and varsity red color blocking.",
    details: ["Visible pressurized air unit", "Full-grain leather panels", "Padded high-top collar"],
    model: "Fits true to size."
  },

  // --- 6. ACCESSORIES & HEADWEAR (8 ITEMS) ---
  {
    id: "val-53",
    name: "Cordura 1000D Tactical Cross-Body Rig",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 85,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 198,
    badge: "BEST SELLER",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Sand", hex: "#baa88f" }
    ],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Military-spec 1000D ballistic Cordura with genuine Cobra metal quick-release buckle. Features internal organizer sleeves and waterproof zipper seals.",
    details: ["1000D Ballistic Cordura Nylon", "AustriAlpin style aluminum buckle", "Water-resistant YKK Aquaguard zippers"],
    model: "Adjustable strap from 30\" to 54\""
  },
  {
    id: "val-54",
    name: "Merino Wool Ribbed Streetwear Beanie",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 45,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 220,
    badge: "CORE ESSENTIAL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#4b5320" },
      { name: "Grey", hex: "#777777" }
    ],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "100% Extra-fine 19.5 micron merino wool. Heavy fisherman 7-gauge ribbed knit that hugs comfortably without itching or losing elasticity.",
    details: ["100% Extra-fine Merino Wool", "Folded fisherman cuff", "Non-itch natural temperature control"],
    model: "One size fits all."
  },
  {
    id: "val-55",
    name: "Distressed Valence Monogram Cap",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 50,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 140,
    badge: null,
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Sand", hex: "#b5a285" }
    ],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Unstructured 6-panel dad cap cut from enzyme-washed cotton twill with pre-curved brim and antiqued metal adjuster clasp.",
    details: ["100% Washed Cotton Twill", "Subtle tonal 3D embroidery", "Embossed metal clasp adjuster"],
    model: "Adjustable 54cm - 62cm circumference."
  },
  {
    id: "val-56",
    name: "Ripstop Bucket Hat with Chin Strap",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 60,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 75,
    badge: "OUTDOOR LAB",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Olive", hex: "#4b5320" }
    ],
    sizes: ["S/M", "L/XL"],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"],
    description: "Engineered with water-shedding DWR ripstop, hidden stash pocket inside the crown, and detachable paracord cinch strap.",
    details: ["DWR coated ripstop nylon", "Internal stash pocket", "Reflective paracord toggle"],
    model: "Size S/M fits 56cm, L/XL fits 59cm."
  },
  {
    id: "val-57",
    name: "Heavy-Duty Webbing Tactical Belt",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 55,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 162,
    badge: "SALE",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Sand", hex: "#c4b49d" }
    ],
    sizes: ["One Size (125cm)"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"],
    description: "Ultra-dense nylon military webbing paired with a magnetic Fidlock V-buckle for instantaneous snap-lock closure.",
    details: ["Fidlock magnetic quick-release", "38mm heavy nylon webbing", "Laser-cut heat sealed tip"],
    model: "Fits waists from 26\" to 44\""
  },
  {
    id: "val-58",
    name: "Thermal Technical Knit Balaclava",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 45,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 93,
    badge: "WINTER GRAIL",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#0c0c0c" },
      { name: "Grey", hex: "#666666" }
    ],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"],
    description: "Seamless engineered 3D knit featuring perforated mouth and nose zones for effortless breathability without lens fogging.",
    details: ["Perforated ventilation zones", "Thermal moisture-wicking yarns", "Drop-down neck gaiter cut"],
    model: "One size fits all stretch fabric."
  },
  {
    id: "val-59",
    name: "Oversized 24oz Canvas Weekender Duffle",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 140,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 84,
    badge: "LIMITED",
    gender: "Unisex",
    colors: [
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["52 Liters"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"],
    description: "Indestructible 24oz washed cotton canvas with reinforced seatbelt webbing straps, separate shoe garage, and heavy brass zippers.",
    details: ["24oz Heavyweight Canvas", "Dedicated ventilated sneaker pocket", "Luggage trolley sleeve"],
    model: "55cm x 30cm x 32cm (Carry-on compliant)"
  },
  {
    id: "val-60",
    name: "Heavy Ribbed Crew Street Socks (3-Pack)",
    category: "accessories",
    categoryLabel: "Accessories & Bags",
    price: 35,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 310,
    badge: "CORE ESSENTIAL",
    gender: "Unisex",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["US 6-9", "US 9-13"],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"],
    description: "Extra thick terry cushioning along the entire footbed with targeted midfoot arch compression and stay-up ribbing.",
    details: ["80% Combed Cotton, 17% Poly, 3% Elastane", "High-density cushioned sole", "Reinforced heel & seamless toe"],
    model: "Pack of 3 pairs."
  }
];

