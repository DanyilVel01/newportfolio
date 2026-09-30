/* ==========================================================================
   VALENCE ARCHIVE | APPLICATION CORE LOGIC
   CATALOG ENGINE, FILTERING, PDP MODAL, SHOPPING BAG & WISHLIST
   ========================================================================== */

/* --------------------------------------------------------------------------
   APPLICATION STATE
   -------------------------------------------------------------------------- */
let currentCategoryFilter = 'all';
let currentPriceFilter = 'all';
let selectedColorFilter = null;
let selectedSizeFilter = null;
let currentSort = 'featured';
let currentSearchTerm = '';
let isSaleOnly = false;
let currentActiveProduct = null;
let selectedPdpColor = null;
let selectedPdpSize = null;

let shoppingBag = JSON.parse(localStorage.getItem('valence_bag') || '[]');
let wishlist = JSON.parse(localStorage.getItem('valence_wishlist') || '[]');
let appliedPromo = localStorage.getItem('valence_promo') || null;

/* --------------------------------------------------------------------------
   INITIALIZATION
   -------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof initLenis === 'function') initLenis();
  if (typeof initCustomCursor === 'function') initCustomCursor();
  if (typeof initHeroFloatingElements === 'function') initHeroFloatingElements();
  if (typeof initSpinBadge === 'function') initSpinBadge();
  if (typeof initMagneticButtons === 'function') initMagneticButtons();

  renderCatalog();
  updateBagCounters();
  updateWishlistCounters();
  setupHistoryRouting();

  if (typeof initScrollTriggerAnimations === 'function') initScrollTriggerAnimations();
});

// Deep History Routing for Product Detail URLs (#product/{id})
function setupHistoryRouting() {
  window.addEventListener('hashchange', checkHashRoute);
  checkHashRoute();
}

function checkHashRoute() {
  const hash = window.location.hash;
  if (hash.startsWith('#product/')) {
    const prodId = hash.replace('#product/', '');
    const p = PRODUCTS.find(item => item.id === prodId);
    if (p) openPdp(p.id, false);
  } else if (currentActiveProduct && hash !== '#product/' + currentActiveProduct.id) {
    closePdp(false);
  }
}

/* --------------------------------------------------------------------------
   CATALOG RENDERING & FILTERING
   -------------------------------------------------------------------------- */
function renderCatalog() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const filtered = getFilteredProducts();

  const countText = document.getElementById('catalogCountText');
  if (countText) {
    countText.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} styles`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 16px; opacity:0.4;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3>No matching products found</h3>
        <p style="color:#777; margin-bottom:16px;">Try loosening your filters or clearing search criteria.</p>
        <button class="btn btn-black" onclick="resetAllFilters()">Clear All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isFav = wishlist.includes(product.id);
    const displayPrice = formatPrice(product.price);
    const originalDisplay = product.originalPrice ? formatPrice(product.originalPrice) : null;
    
    let badgeHtml = '';
    if (product.badge) {
      const isSale = product.badge.toLowerCase().includes('sale');
      const isNew = product.badge.toLowerCase().includes('new');
      badgeHtml = `<span class="product-badge ${isSale ? 'sale' : (isNew ? 'new' : '')}">${product.badge}</span>`;
    }

    return `
      <article class="product-card" onclick="openPdp('${product.id}')" data-id="${product.id}">
        <div class="product-image-container">
          ${badgeHtml}
          <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleWishlist(event, '${product.id}')" title="Save to Favorites">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>

          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-img" 
            loading="lazy"
            onerror="handleImageFallback(this, '${product.name}')"
          />

          <button class="quick-add-btn" onclick="quickAdd(event, '${product.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Quick Add
          </button>
        </div>

        <div class="product-meta">
          <div class="product-colors-count">${product.colors.length} Colorways • ${product.gender}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-subtitle">${product.categoryLabel}</div>
          <div class="product-price-row">
            <span class="product-price">${displayPrice}</span>
            ${originalDisplay ? `<span class="product-original-price">${originalDisplay}</span>` : ''}
          </div>
          <div class="product-rating">
            <span class="star-icon">★</span>
            <span>${product.rating}</span>
            <span style="color:#999;">(${product.reviewsCount})</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (typeof initCard3DTilt === 'function') initCard3DTilt();
  if (typeof initMagneticButtons === 'function') initMagneticButtons();
  if (typeof animateCatalogEntrance === 'function') animateCatalogEntrance();
}

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    if (currentCategoryFilter !== 'all' && p.category !== currentCategoryFilter) {
      return false;
    }

    if (isSaleOnly && (!p.originalPrice && !p.badge?.includes('SALE'))) {
      return false;
    }

    if (currentSearchTerm.trim()) {
      const q = currentSearchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.categoryLabel.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    const checkedGenders = Array.from(document.querySelectorAll('.filter-checkbox-item input[type="checkbox"]:checked')).map(cb => cb.value);
    if (checkedGenders.length > 0 && !checkedGenders.includes(p.gender) && p.gender !== 'Unisex') {
      return false;
    }

    if (currentPriceFilter === 'under-75' && p.price >= 75) return false;
    if (currentPriceFilter === '75-150' && (p.price < 75 || p.price > 150)) return false;
    if (currentPriceFilter === '150-250' && (p.price < 150 || p.price > 250)) return false;
    if (currentPriceFilter === '250-plus' && p.price < 250) return false;

    if (selectedColorFilter) {
      const hasColor = p.colors.some(c => c.name.toLowerCase() === selectedColorFilter.toLowerCase());
      if (!hasColor) return false;
    }

    if (selectedSizeFilter) {
      const hasSize = p.sizes.includes(selectedSizeFilter);
      if (!hasSize) return false;
    }

    return true;
  }).sort((a, b) => {
    if (currentSort === 'newest') return (b.badge?.includes('NEW') ? 1 : 0) - (a.badge?.includes('NEW') ? 1 : 0);
    if (currentSort === 'price-low') return a.price - b.price;
    if (currentSort === 'price-high') return b.price - a.price;
    if (currentSort === 'rating') return b.rating - a.rating;
    return (b.badge?.includes('BEST') ? 1 : 0) - (a.badge?.includes('BEST') ? 1 : 0);
  });
}

function handleImageFallback(imgEl, name) {
  imgEl.onerror = null;
  const fallback = document.createElement('div');
  fallback.className = 'image-fallback-art';
  fallback.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
    </svg>
    <span class="watermark">VALENCE ARCHIVE</span>
    <span style="font-size:11px; margin-top:4px; opacity:0.8;">${name}</span>
  `;
  imgEl.replaceWith(fallback);
}

/* --------------------------------------------------------------------------
   FILTER INTERACTIONS
   -------------------------------------------------------------------------- */
function filterCategory(cat) {
  currentCategoryFilter = cat;
  isSaleOnly = false;
  
  document.querySelectorAll('.quick-chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const titles = {
    all: "All Apparel & Footwear",
    hoodies: "Hoodies & Heavy Fleece",
    outerwear: "Jackets & Technical Shells",
    tshirts: "T-Shirts & Tops",
    pants: "Pants & Cargo Bottoms",
    footwear: "Sneakers & Footwear Division",
    accessories: "Headwear & Tactical Bags"
  };
  const titleEl = document.getElementById('catalogTitle');
  if (titleEl) titleEl.textContent = titles[cat] || "Streetwear Catalog";

  renderCatalog();
}

function filterSaleOnly() {
  isSaleOnly = true;
  currentCategoryFilter = 'all';
  const titleEl = document.getElementById('catalogTitle');
  if (titleEl) titleEl.textContent = "Archive Sale Drops";
  document.querySelectorAll('.quick-chip').forEach(btn => btn.classList.remove('active'));
  renderCatalog();
}

function handleFilterUpdate() {
  const selectedRadio = document.querySelector('input[name="priceRange"]:checked');
  currentPriceFilter = selectedRadio ? selectedRadio.value : 'all';
  renderCatalog();
}

function toggleColorFilter(colorName, btn) {
  if (selectedColorFilter === colorName) {
    selectedColorFilter = null;
    btn.classList.remove('active');
  } else {
    document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
    selectedColorFilter = colorName;
    btn.classList.add('active');
  }
  renderCatalog();
}

function toggleSizeFilter(sizeName, btn) {
  if (selectedSizeFilter === sizeName) {
    selectedSizeFilter = null;
    btn.classList.remove('active');
  } else {
    document.querySelectorAll('.size-filter-chip').forEach(b => b.classList.remove('active'));
    selectedSizeFilter = sizeName;
    btn.classList.add('active');
  }
  renderCatalog();
}

function handleSortChange(sortVal) {
  currentSort = sortVal;
  renderCatalog();
}

function handleSearch(query) {
  currentSearchTerm = query;
  renderCatalog();
}

function resetAllFilters() {
  currentCategoryFilter = 'all';
  currentPriceFilter = 'all';
  selectedColorFilter = null;
  selectedSizeFilter = null;
  currentSort = 'featured';
  currentSearchTerm = '';
  isSaleOnly = false;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  document.querySelectorAll('.filter-checkbox-item input[type="checkbox"]').forEach(cb => cb.checked = false);
  const radioAll = document.querySelector('input[name="priceRange"][value="all"]');
  if (radioAll) radioAll.checked = true;
  document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.size-filter-chip').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.quick-chip').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === 'all'));
  
  const titleEl = document.getElementById('catalogTitle');
  if (titleEl) titleEl.textContent = "All Apparel & Footwear";

  renderCatalog();
  showToast("Filters reset to default.");
}

function toggleFilterSidebar() {
  const layout = document.getElementById('catalogLayout');
  const text = document.getElementById('filterToggleText');
  if (layout && text) {
    layout.classList.toggle('show-sidebar');
    text.textContent = layout.classList.contains('show-sidebar') ? "Hide Filters" : "Show Filters";
  }
}

/* --------------------------------------------------------------------------
   DEDICATED PRODUCT DETAILS (PDP) VIEW / MODAL (NIKE STYLE)
   -------------------------------------------------------------------------- */
function openPdp(productId, updateHash = true) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentActiveProduct = product;
  selectedPdpColor = product.colors[0];
  selectedPdpSize = product.sizes[0];

  if (updateHash) {
    window.location.hash = `product/${product.id}`;
  }

  const modal = document.getElementById('pdpModal');
  const content = document.getElementById('pdpDynamicContent');
  const isFav = wishlist.includes(product.id);

  const displayPrice = formatPrice(product.price);
  const originalDisplay = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const recommendations = PRODUCTS
    .filter(item => item.id !== product.id && item.category !== product.category)
    .slice(0, 4);

  content.innerHTML = `
    <!-- Left: Gallery -->
    <div class="pdp-gallery">
      <div class="pdp-main-image-wrap">
        <img 
          id="pdpMainImg" 
          src="${product.image}" 
          alt="${product.name}" 
          class="pdp-main-image" 
          onerror="handleImageFallback(this, '${product.name}')"
        />
      </div>
      <div class="pdp-thumbnails">
        ${product.gallery.map((imgUrl, i) => `
          <div class="pdp-thumb ${i === 0 ? 'active' : ''}" onclick="switchPdpThumb(this, '${imgUrl}')">
            <img src="${imgUrl}" alt="Angle ${i+1}">
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Right: Purchase Controls & Specs -->
    <div class="pdp-details-wrap">
      <div class="pdp-tag-row">
        <span class="pdp-category-eyebrow">${product.categoryLabel} • ${product.gender}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>

      <h2 class="pdp-title">${product.name}</h2>

      <div class="pdp-price-row">
        <span class="pdp-price" id="pdpPrice">${displayPrice}</span>
        ${originalDisplay ? `
          <span class="pdp-original-price">${originalDisplay}</span>
          <span class="pdp-discount-pill">${discountPercent}% OFF</span>
        ` : ''}
      </div>

      <div class="product-rating" style="margin-top:-10px;">
        <span class="star-icon">★★★★★</span>
        <strong style="font-size:14px; margin-left:4px;">${product.rating}</strong>
        <span style="color:#777;">(${product.reviewsCount} Verified Buyer Reviews)</span>
      </div>

      <p style="font-size:14px; color:#444; line-height:1.6;">${product.description}</p>

      <!-- Colorway Picker -->
      <div class="pdp-option-section">
        <div class="pdp-option-header">
          <span>Colorway: <strong id="pdpSelectedColorName">${selectedPdpColor.name}</strong></span>
          <span style="color:#777; font-size:12px;">${product.colors.length} Available</span>
        </div>
        <div class="pdp-color-picker">
          ${product.colors.map((c, idx) => `
            <div 
              class="pdp-color-dot ${idx === 0 ? 'active' : ''}" 
              onclick="selectPdpColor(this, '${c.name}', '${c.hex}')" 
              title="${c.name}"
            >
              <div class="inner" style="background:${c.hex};"></div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Size Selector -->
      <div class="pdp-option-section">
        <div class="pdp-option-header">
          <span>Select Size: <strong id="pdpSelectedSizeName">${selectedPdpSize}</strong></span>
          <a href="#faq" onclick="showToast('Sizing is true to standard street oversized fit.'); return false;" style="text-decoration:underline; font-size:12px;">Size Guide</a>
        </div>
        <div class="pdp-size-grid">
          ${product.sizes.map((s, idx) => `
            <button 
              class="pdp-size-btn ${idx === 0 ? 'active' : ''}" 
              onclick="selectPdpSize(this, '${s}')"
            >${s}</button>
          `).join('')}
        </div>
        <div class="pdp-stock-warning">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>High demand: Only 3 remaining in size ${selectedPdpSize}</span>
        </div>
      </div>

      <!-- CTAs -->
      <div class="pdp-cta-group">
        <button class="pdp-add-to-bag-btn" onclick="addToBagCurrentPdp()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          Add to Bag • ${displayPrice}
        </button>
        <button class="pdp-fav-btn ${isFav ? 'active' : ''}" id="pdpFavBtn" onclick="toggleWishlistPdp()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span>${isFav ? 'Favorited' : 'Add to Favorites'}</span>
        </button>
      </div>

      <!-- Accordions -->
      <div class="pdp-accordion-group">
        <div class="pdp-accordion-item open">
          <button class="pdp-accordion-trigger" onclick="togglePdpAccordion(this)">
            <span>Technical Specifications & Materials</span>
            <svg class="pdp-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="pdp-accordion-body">
            <ul class="pdp-specs-list">
              ${product.details.map(d => `<li>${d}</li>`).join('')}
              <li>Model Fit: ${product.model}</li>
            </ul>
          </div>
        </div>

        <div class="pdp-accordion-item">
          <button class="pdp-accordion-trigger" onclick="togglePdpAccordion(this)">
            <span>Complimentary Shipping & 30-Day Returns</span>
            <svg class="pdp-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="pdp-accordion-body">
            Standard delivery within 2–4 business days via DHL Express. Free worldwide shipping on orders above $150. Returns accepted within 30 days of delivery in original unworn condition with tags attached.
          </div>
        </div>

        <div class="pdp-accordion-item">
          <button class="pdp-accordion-trigger" onclick="togglePdpAccordion(this)">
            <span>Verified Customer Reviews (${product.reviewsCount})</span>
            <svg class="pdp-accordion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="pdp-accordion-body">
            <div style="margin-bottom:8px; font-weight:700;">Average 4.9 out of 5 stars based on ${product.reviewsCount} customer submissions.</div>
            <div style="border-left:2px solid #111; padding-left:12px; margin-top:8px; font-style:italic;">
              "The weight and drape on this piece are insane. Better quality than most designer streetwear brands charging triple the price." — Mark K. (Tokyo, Verified Buyer)
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Recommendations Strip -->
    <div class="pdp-recommendations">
      <h3>Complete The Look (Style Pairings)</h3>
      <div class="pdp-rec-grid">
        ${recommendations.map(rec => `
          <div class="product-card" onclick="openPdp('${rec.id}')">
            <div class="product-image-container" style="aspect-ratio:1/1;">
              <img src="${rec.image}" alt="${rec.name}" style="object-fit:cover; width:100%; height:100%;" onerror="handleImageFallback(this, '${rec.name}')" />
            </div>
            <div class="product-meta" style="padding-top:8px;">
              <div style="font-size:11px; color:#888;">${rec.categoryLabel}</div>
              <strong style="font-size:13px; line-height:1.2;">${rec.name}</strong>
              <div style="font-size:13px; font-weight:700; margin-top:2px;">${formatPrice(rec.price)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('#pdpModalDialog', 
      { scale: 0.92, y: 30, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  }
}

function updatePdpPrice(product) {
  const priceEl = document.getElementById('pdpPrice');
  if (priceEl) {
    priceEl.textContent = formatPrice(product.price);
  }
}

function closePdp(updateHash = true) {
  const modal = document.getElementById('pdpModal');
  if (!modal) return;

  if (typeof gsap !== 'undefined') {
    gsap.to('#pdpModalDialog', {
      scale: 0.95,
      y: 20,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  } else {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  currentActiveProduct = null;
  if (updateHash && window.location.hash.startsWith('#product/')) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function closePdpOutside(e) {
  if (e.target.id === 'pdpModal') {
    closePdp();
  }
}

function switchPdpThumb(thumbEl, imgUrl) {
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
  const mainImg = document.getElementById('pdpMainImg');
  if (mainImg) mainImg.src = imgUrl;
}

function selectPdpColor(dotEl, colorName, hex) {
  document.querySelectorAll('.pdp-color-dot').forEach(d => d.classList.remove('active'));
  dotEl.classList.add('active');
  selectedPdpColor = { name: colorName, hex: hex };
  const label = document.getElementById('pdpSelectedColorName');
  if (label) label.textContent = colorName;
}

function selectPdpSize(btnEl, size) {
  document.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  selectedPdpSize = size;
  const label = document.getElementById('pdpSelectedSizeName');
  if (label) label.textContent = size;
}

function togglePdpAccordion(trigger) {
  const item = trigger.parentElement;
  if (item) item.classList.toggle('open');
}

function toggleWishlistPdp() {
  if (!currentActiveProduct) return;
  const isFav = wishlist.includes(currentActiveProduct.id);
  const btn = document.getElementById('pdpFavBtn');

  if (isFav) {
    wishlist = wishlist.filter(id => id !== currentActiveProduct.id);
    if (btn) {
      btn.classList.remove('active');
      btn.querySelector('span').textContent = 'Add to Favorites';
      btn.querySelector('svg').setAttribute('fill', 'none');
    }
    showToast(`Removed "${currentActiveProduct.name}" from favorites`);
  } else {
    wishlist.push(currentActiveProduct.id);
    if (btn) {
      btn.classList.add('active');
      btn.querySelector('span').textContent = 'Favorited';
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
    }
    showToast(`Added "${currentActiveProduct.name}" to favorites`);
  }

  localStorage.setItem('valence_wishlist', JSON.stringify(wishlist));
  updateWishlistCounters();
  renderCatalog();
}

/* --------------------------------------------------------------------------
   SHOPPING BAG ENGINE & CHECKOUT FLOW
   -------------------------------------------------------------------------- */
function addToBagCurrentPdp() {
  if (!currentActiveProduct) return;
  addToBag(currentActiveProduct.id, selectedPdpSize, selectedPdpColor.name);
  closePdp();
  openBag();
}

function quickAdd(event, productId) {
  event.stopPropagation();
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  addToBag(p.id, p.sizes[0], p.colors[0].name);
  openBag();
}

function addToBag(productId, size, colorName) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const existingIndex = shoppingBag.findIndex(
    item => item.id === productId && item.size === size && item.color === colorName
  );

  if (existingIndex > -1) {
    shoppingBag[existingIndex].qty += 1;
  } else {
    shoppingBag.push({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.categoryLabel,
      size: size || p.sizes[0],
      color: colorName || p.colors[0].name,
      qty: 1
    });
  }

  localStorage.setItem('valence_bag', JSON.stringify(shoppingBag));
  updateBagCounters();
  updateBagUi();
  showToast(`Added "${p.name}" (${size}) to your bag`);
}

function changeBagQty(idx, delta) {
  shoppingBag[idx].qty += delta;
  if (shoppingBag[idx].qty <= 0) {
    shoppingBag.splice(idx, 1);
  }
  localStorage.setItem('valence_bag', JSON.stringify(shoppingBag));
  updateBagCounters();
  updateBagUi();
}

function removeBagItem(idx) {
  const removed = shoppingBag[idx];
  shoppingBag.splice(idx, 1);
  localStorage.setItem('valence_bag', JSON.stringify(shoppingBag));
  updateBagCounters();
  updateBagUi();
  showToast(`Removed "${removed.name}" from bag`);
}

function openBag() {
  closeDrawers();
  const bag = document.getElementById('bagDrawer');
  bag.classList.add('active');
  document.getElementById('drawerOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  updateBagUi();

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(bag, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
  }
}

function closeDrawers() {
  document.getElementById('bagDrawer').classList.remove('active');
  document.getElementById('wishlistDrawer').classList.remove('active');
  document.getElementById('drawerOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function updateBagCounters() {
  const count = shoppingBag.reduce((acc, item) => acc + item.qty, 0);
  document.querySelectorAll('.cart-counter').forEach(el => el.textContent = count);
}

function updateBagUi() {
  const list = document.getElementById('bagItemsList');
  if (!list) return;

  if (shoppingBag.length === 0) {
    list.innerHTML = `
      <div class="drawer-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.4;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
        <h4 style="font-size:16px; font-weight:700; color:#111;">Your bag is currently empty</h4>
        <p style="font-size:13px;">Explore Drop 05 and add heavyweight streetwear items to your cart.</p>
        <button class="btn btn-black" style="margin-top:10px;" onclick="closeDrawers();">Shop Now</button>
      </div>
    `;
    document.getElementById('bagSubtotal').textContent = formatPrice(0);
    document.getElementById('bagTotal').textContent = formatPrice(0);
    document.getElementById('shippingBarFill').style.width = '0%';
    document.getElementById('shippingLeftText').textContent = formatPrice(150);
    return;
  }

  list.innerHTML = shoppingBag.map((item, idx) => `
    <div class="drawer-item">
      <img src="${item.image}" alt="${item.name}" class="drawer-item-img" onerror="handleImageFallback(this, '${item.name}')">
      <div class="drawer-item-info">
        <h4 class="drawer-item-title">${item.name}</h4>
        <div class="drawer-item-variant">${item.color} / Size ${item.size}</div>
        <div class="drawer-item-price">${formatPrice(item.price * item.qty)}</div>
        <div class="drawer-item-qty">
          <button class="qty-btn" onclick="changeBagQty(${idx}, -1)">-</button>
          <span style="font-size:12px; font-weight:700; min-width:16px; text-align:center;">${item.qty}</span>
          <button class="qty-btn" onclick="changeBagQty(${idx}, 1)">+</button>
        </div>
      </div>
      <button class="drawer-item-remove" onclick="removeBagItem(${idx})" title="Remove item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  `).join('');

  const subtotalUSD = shoppingBag.reduce((acc, item) => acc + (item.price * item.qty), 0);
  let discountUSD = 0;
  if (appliedPromo === 'STREET20') {
    discountUSD = subtotalUSD * 0.20;
    document.getElementById('bagDiscountRow').style.display = 'flex';
    document.getElementById('bagDiscount').textContent = `-${formatPrice(discountUSD)}`;
  } else {
    document.getElementById('bagDiscountRow').style.display = 'none';
  }

  const shippingTarget = 150;
  const freeShippingAchieved = subtotalUSD >= shippingTarget;
  const shippingUSD = freeShippingAchieved ? 0 : 15;
  const totalUSD = (subtotalUSD - discountUSD) + shippingUSD;

  document.getElementById('bagSubtotal').textContent = formatPrice(subtotalUSD);
  document.getElementById('bagShipping').textContent = freeShippingAchieved ? 'FREE' : formatPrice(shippingUSD);
  document.getElementById('bagTotal').textContent = formatPrice(totalUSD);

  const fillBar = document.getElementById('shippingBarFill');
  const notice = document.getElementById('shippingThresholdNotice');
  if (freeShippingAchieved) {
    fillBar.style.width = '100%';
    fillBar.classList.add('achieved');
    notice.innerHTML = `<strong>FREE EXPRESS SHIPPING UNLOCKED!</strong> You saved ${formatPrice(15)}`;
  } else {
    const remaining = shippingTarget - subtotalUSD;
    const pct = Math.min(100, Math.round((subtotalUSD / shippingTarget) * 100));
    fillBar.style.width = `${pct}%`;
    fillBar.classList.remove('achieved');
    notice.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to unlock <strong>FREE EXPRESS SHIPPING</strong>`;
  }
}

function applyPromoCode() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  if (code === 'STREET20') {
    appliedPromo = 'STREET20';
    localStorage.setItem('valence_promo', 'STREET20');
    updateBagUi();
    showToast('Promo code STREET20 applied! 20% discount unlocked.');
  } else {
    showToast('Invalid promo code. Try: STREET20');
  }
}

function proceedToCheckout() {
  if (shoppingBag.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  const totalStr = document.getElementById('bagTotal').textContent;
  showToast(`Initiating secure checkout for ${totalStr}...`);
  setTimeout(() => {
    alert(`Order confirmed! Thank you for ordering with VALENCE ARCHIVE.\n\nTotal: ${totalStr}\nA tracking dispatch code has been simulated for your order.`);
    shoppingBag = [];
    localStorage.removeItem('valence_bag');
    updateBagCounters();
    updateBagUi();
    closeDrawers();
  }, 900);
}

/* --------------------------------------------------------------------------
   FAVORITES / WISHLIST SYSTEM
   -------------------------------------------------------------------------- */
function toggleWishlist(event, productId) {
  event.stopPropagation();
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Removed "${p.name}" from favorites`);
  } else {
    wishlist.push(productId);
    showToast(`Saved "${p.name}" to favorites`);
  }

  localStorage.setItem('valence_wishlist', JSON.stringify(wishlist));
  updateWishlistCounters();
  renderCatalog();
}

function updateWishlistCounters() {
  const count = wishlist.length;
  document.querySelectorAll('.wishlist-counter, .wishlist-text-count').forEach(el => el.textContent = count);
}

function openWishlist() {
  closeDrawers();
  const list = document.getElementById('wishlistItemsList');
  const drawer = document.getElementById('wishlistDrawer');
  document.getElementById('drawerOverlay').classList.add('active');
  drawer.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(drawer, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
  }

  const favProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
  if (favProducts.length === 0) {
    list.innerHTML = `
      <div class="drawer-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.4;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <h4 style="font-size:16px; font-weight:700; color:#111;">No Saved Items Yet</h4>
        <p style="font-size:13px;">Click the heart icon on any style card to curate your personal archive.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = favProducts.map(p => `
    <div class="drawer-item" onclick="openPdp('${p.id}'); closeDrawers();" style="cursor:pointer;">
      <img src="${p.image}" alt="${p.name}" class="drawer-item-img" onerror="handleImageFallback(this, '${p.name}')">
      <div class="drawer-item-info">
        <h4 class="drawer-item-title">${p.name}</h4>
        <div class="drawer-item-variant">${p.categoryLabel}</div>
        <div class="drawer-item-price">${formatPrice(p.price)}</div>
        <button class="btn btn-black" style="padding:6px 14px; font-size:11px; margin-top:6px;" onclick="event.stopPropagation(); addToBag('${p.id}', '${p.sizes[0]}', '${p.colors[0].name}'); openBag();">
          Move to Bag
        </button>
      </div>
      <button class="drawer-item-remove" onclick="event.stopPropagation(); toggleWishlist(event, '${p.id}'); openWishlist();" title="Remove">
        ✕
      </button>
    </div>
  `).join('');
}

function addAllWishlistToBag() {
  if (wishlist.length === 0) {
    showToast("No items in wishlist.");
    return;
  }
  wishlist.forEach(id => {
    const p = PRODUCTS.find(item => item.id === id);
    if (p) addToBag(p.id, p.sizes[0], p.colors[0].name);
  });
  closeDrawers();
  openBag();
  showToast("All favorites moved to your bag!");
}

/* --------------------------------------------------------------------------
   UI UTILITIES & INTERACTIVITY
   -------------------------------------------------------------------------- */
function toggleFaq(btn) {
  const item = btn.parentElement;
  if (item) item.classList.toggle('active');
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer) drawer.classList.toggle('active');
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function handleNewsletter() {
  const input = document.getElementById('newsletterInput');
  const email = input ? input.value.trim() : '';
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }
  showToast('Welcome to the Archive! Check your inbox for your 20% discount code.');
  if (input) input.value = '';
}

