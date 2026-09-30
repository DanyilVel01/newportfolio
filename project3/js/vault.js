/* ==========================================================================
   THE ARCHIVE VAULT EXPLORER | DEDICATED CONTROLLER
   ISOLATED LOGIC: SCROLL ZOOM, 3D TURNTABLE, HOTSPOTS, COLORWAYS & MACRO ZOOM
   ========================================================================== */

let vaultManualZoom = 1.0;
let vaultColorway = 'black';
let vaultScrollTriggerInstance = null;

const VAULT_COLORWAYS = {
  black: {
    name: 'Triple Black',
    img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=80',
    glow: 'radial-gradient(circle, rgba(212, 255, 0, 0.18) 0%, rgba(212, 255, 0, 0.03) 45%, transparent 70%)'
  },
  bone: {
    name: 'Ghost Bone',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
    glow: 'radial-gradient(circle, rgba(240, 235, 220, 0.22) 0%, rgba(240, 235, 220, 0.04) 45%, transparent 70%)'
  },
  volt: {
    name: 'Cyber Volt',
    img: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=80',
    glow: 'radial-gradient(circle, rgba(212, 255, 0, 0.32) 0%, rgba(212, 255, 0, 0.08) 50%, transparent 75%)'
  }
};

/**
 * Initialize The Archive Vault Explorer
 */
function initVaultExplorer() {
  const section = document.getElementById('vaultZoomSection');
  if (!section) return;

  setupVaultScrollAnimation();
  setupVault3DTilt();
  setupVaultKeyboardShortcuts();
}

/**
 * ScrollTrigger Pinned Zoom & Progress Scrub
 */
function setupVaultScrollAnimation() {
  const section = document.getElementById('vaultZoomSection');
  const stage = section ? section.querySelector('.vault-stage') : null;
  const jacketImg = document.getElementById('vaultJacket');
  const watermark = document.getElementById('vaultWatermark');
  const meterFill = document.getElementById('vaultMeterFill');
  const glow = document.getElementById('vaultGlow');

  if (!section || !stage || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Clean up existing instance if re-initialized
  if (vaultScrollTriggerInstance) {
    vaultScrollTriggerInstance.kill();
  }

  vaultScrollTriggerInstance = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.8,
    onUpdate: (self) => {
      const progress = self.progress;

      // Update HUD progress bar
      if (meterFill) {
        meterFill.style.width = `${Math.round(progress * 100)}%`;
      }

      // Base zoom scale from scroll
      const scrollScale = 0.84 + (progress * 0.52);
      const totalScale = scrollScale * vaultManualZoom;

      if (jacketImg) {
        gsap.to(jacketImg, {
          scale: totalScale,
          rotate: (progress - 0.5) * 6,
          duration: 0.2,
          ease: "none",
          overwrite: "auto"
        });
      }

      // Parallax typography watermark
      if (watermark) {
        const xOffset = (progress - 0.5) * -25;
        const letterSpacing = 0.05 + (progress * 0.08);
        watermark.style.transform = `translate(calc(-50% + ${xOffset}%), -50%)`;
        watermark.style.letterSpacing = `${letterSpacing}em`;
      }

      // Ambient glow pulsing
      if (glow) {
        const glowScale = 0.8 + (progress * 0.45);
        glow.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
      }
    }
  });
}

/**
 * Interactive 3D Turntable & Mouse Gyroscope
 */
function setupVault3DTilt() {
  const viewport = document.getElementById('vaultViewport');
  const wrap = document.getElementById('vaultItemWrap');
  if (!viewport || !wrap || typeof gsap === 'undefined') return;

  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateY = (x / (rect.width / 2)) * 14;
    const rotateX = (y / (rect.height / 2)) * -10;

    gsap.to(wrap, {
      rotateY: rotateY,
      rotateX: rotateX,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  viewport.addEventListener('mouseleave', () => {
    gsap.to(wrap, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)"
    });
  });
}

/**
 * Interactive Manual Zoom Control (+ / - / Reset)
 */
function adjustVaultZoom(delta) {
  if (delta === 0) {
    vaultManualZoom = 1.0;
  } else {
    vaultManualZoom = Math.min(2.4, Math.max(0.65, vaultManualZoom + delta));
  }

  const jacket = document.getElementById('vaultJacket');
  if (jacket && typeof gsap !== 'undefined') {
    gsap.to(jacket, {
      scale: vaultManualZoom,
      duration: 0.4,
      ease: "power3.out"
    });
  }

  if (typeof showToast === 'function') {
    const pct = Math.round(vaultManualZoom * 100);
    showToast(`Vault Fabric Zoom: ${pct}%`);
  }
}

/**
 * Switch Showcase Colorway in Real-Time
 */
function setVaultColorway(key, btnEl) {
  const conf = VAULT_COLORWAYS[key];
  if (!conf) return;

  vaultColorway = key;

  // Update button active state
  document.querySelectorAll('.vault-swatch-dot').forEach(d => d.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const jacket = document.getElementById('vaultJacket');
  const glow = document.getElementById('vaultGlow');

  if (jacket && typeof gsap !== 'undefined') {
    gsap.to(jacket, {
      opacity: 0.3,
      scale: '-=0.04',
      duration: 0.2,
      onComplete: () => {
        jacket.src = conf.img;
        jacket.onload = () => {
          gsap.to(jacket, {
            opacity: 1,
            scale: '+=0.04',
            duration: 0.35,
            ease: "power2.out"
          });
        };
      }
    });
  }

  if (glow) {
    glow.style.background = conf.glow;
  }

  if (typeof showToast === 'function') {
    showToast(`Vault Colorway: ${conf.name}`);
  }
}

/**
 * Select Active Hotspot (from Hotspot button or Bottom Tabs)
 */
function selectVaultHotspot(index, triggerBtn) {
  const allHotspots = document.querySelectorAll('.vault-hotspot');
  const allTabs = document.querySelectorAll('.vault-tab-btn');

  allHotspots.forEach(h => h.classList.remove('active'));
  allTabs.forEach(t => t.classList.remove('active'));

  const targetHotspot = document.querySelector(`.vault-hotspot-${index}`);
  if (targetHotspot) {
    targetHotspot.classList.add('active');
  }

  if (triggerBtn && triggerBtn.classList.contains('vault-tab-btn')) {
    triggerBtn.classList.add('active');
  } else {
    const matchingTab = document.querySelector(`.vault-tab-btn[data-index="${index}"]`);
    if (matchingTab) matchingTab.classList.add('active');
  }

  // Slight optical focus shift to target area
  const wrap = document.getElementById('vaultItemWrap');
  if (wrap && typeof gsap !== 'undefined') {
    const offsets = {
      1: { y: 20, rotateX: 6 },
      2: { y: -10, rotateX: -4 },
      3: { y: -30, rotateX: -8 },
      4: { y: 10, rotateX: 4 }
    };
    const off = offsets[index] || { y: 0, rotateX: 0 };
    gsap.to(wrap, {
      y: off.y,
      rotateX: off.rotateX,
      duration: 0.5,
      ease: "power3.out"
    });
  }
}

/**
 * Toggle Hotspot from Click on Pin
 */
function toggleVaultHotspotPin(event, index) {
  event.stopPropagation();
  const hotspot = document.querySelector(`.vault-hotspot-${index}`);
  if (!hotspot) return;

  const wasActive = hotspot.classList.contains('active');
  if (wasActive) {
    hotspot.classList.remove('active');
    document.querySelectorAll('.vault-tab-btn').forEach(t => t.classList.remove('active'));
  } else {
    selectVaultHotspot(index);
  }
}

/**
 * Close Any Open Hotspot Popovers
 */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.vault-hotspot') && !e.target.closest('.vault-tabs-group')) {
    document.querySelectorAll('.vault-hotspot').forEach(h => h.classList.remove('active'));
    document.querySelectorAll('.vault-tab-btn').forEach(t => t.classList.remove('active'));
  }
});

/**
 * Direct Commerce Hook: Order Flagship Parka ($420)
 */
function orderFlagshipParka() {
  if (typeof openPdp === 'function') {
    openPdp('prod-outerwear-01');
  } else if (typeof addToBag === 'function') {
    addToBag('prod-outerwear-01', 'L', 'Black');
    if (typeof openBag === 'function') openBag();
  }
}

/**
 * Optional Keyboard Shortcuts inside section
 */
function setupVaultKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    const section = document.getElementById('vaultZoomSection');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === '+' || e.key === '=') {
      adjustVaultZoom(0.2);
    } else if (e.key === '-' || e.key === '_') {
      adjustVaultZoom(-0.2);
    } else if (e.key === '0') {
      adjustVaultZoom(0);
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      selectVaultHotspot(parseInt(e.key, 10));
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVaultExplorer);
} else {
  initVaultExplorer();
}
