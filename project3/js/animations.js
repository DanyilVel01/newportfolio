/* ==========================================================================
   VALENCE ARCHIVE | GSAP & BOMBON.RS MOTION ENGINE
   LENIS SMOOTH SCROLL, FLUID CURSOR, PINNED ZOOM, HOTSPOTS, 3D TILT & AUDIO
   ========================================================================== */

let lenis = null;
let ambientAudioCtx = null;
let ambientGainNode = null;
let isAudioPlaying = false;

/**
 * Initialize Lenis Smooth Inertial Scroll
 */
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });

      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
      }

      if (typeof gsap !== 'undefined') {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    } catch (e) {
      console.warn('Lenis smooth scroll failed to initialize:', e);
    }
  }
}

/**
 * Smooth Scroll to Catalog Section
 */
function scrollToCatalog() {
  if (lenis) {
    lenis.scrollTo('#catalog', { offset: -60, duration: 1.4 });
  } else {
    const cat = document.getElementById('catalog');
    if (cat) cat.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Awwwards / Bombon.rs-style Custom Fluid Cursor with GSAP quickTo
 */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || typeof gsap === 'undefined') return;

  const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
  const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
  const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
  const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

  window.addEventListener('mousemove', (e) => {
    xDot(e.clientX);
    yDot(e.clientY);
    xRing(e.clientX);
    yRing(e.clientY);
  });

  const hoverSelector = 'button, a, .quick-chip, .color-swatch-btn, .size-filter-chip, .floating-spin-badge, .pdp-thumb, .hero-float-pill, input, select';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.add('cursor-hover');
    }
    if (e.target.closest('.product-card')) {
      document.body.classList.add('cursor-hover', 'cursor-view');
    }
    if (e.target.closest('.hotspot-pin')) {
      document.body.classList.add('cursor-hover', 'cursor-discover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.remove('cursor-hover');
    }
    if (e.target.closest('.product-card')) {
      document.body.classList.remove('cursor-hover', 'cursor-view');
    }
    if (e.target.closest('.hotspot-pin')) {
      document.body.classList.remove('cursor-hover', 'cursor-discover');
    }
  });
}

/**
 * Hero Floating Tech Elements: Sine Wave Physics + Mouse Parallax Depth (Bombon Homage)
 */
function initHeroFloatingElements() {
  const pills = document.querySelectorAll('.hero-float-pill');
  const hero = document.getElementById('heroSection');
  if (pills.length === 0 || typeof gsap === 'undefined') return;

  // Continuous floating bobbing animation
  pills.forEach((pill, i) => {
    gsap.to(pill, {
      y: (i % 2 === 0 ? -16 : 16),
      duration: 2.2 + (i * 0.4),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // Mousemove parallax tracking
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      pills.forEach(pill => {
        const speed = parseFloat(pill.getAttribute('data-speed') || '2.0');
        gsap.to(pill, {
          x: relX * 45 * speed,
          y: relY * 35 * speed,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });

    hero.addEventListener('mouseleave', () => {
      pills.forEach(pill => {
        gsap.to(pill, {
          x: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  }
}

/**
 * Interactive Spinning Stamp Badge (Bombon.rs Sticker)
 */
function initSpinBadge() {
  const badge = document.getElementById('spinBadge');
  const textSvg = badge ? badge.querySelector('.spin-text-svg') : null;
  if (!badge || typeof gsap === 'undefined') return;

  // Entrance
  gsap.fromTo(badge, 
    { scale: 0, opacity: 0, rotate: -90 },
    { scale: 1, opacity: 1, rotate: 0, duration: 1.2, delay: 0.6, ease: "back.out(1.7)" }
  );

  // Speed up rotation based on scroll velocity
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() / 250);
        const targetSpeed = Math.min(8, 1 + velocity);
        if (textSvg) {
          textSvg.style.animationDuration = (18 / targetSpeed) + 's';
        }
      }
    });
  }

  // Magnetic tilt on hover
  badge.addEventListener('mousemove', (e) => {
    const rect = badge.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(badge, {
      x: x * 0.35,
      y: y * 0.35,
      rotateX: -y * 0.2,
      rotateY: x * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  badge.addEventListener('mouseleave', () => {
    gsap.to(badge, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)"
    });
    if (textSvg) textSvg.style.animationDuration = '18s';
  });
}

/**
 * 3D Card Perspective Tilt with Specular Glare Effect
 */
function initCard3DTilt() {
  if (typeof gsap === 'undefined') return;
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    if (card.dataset.tiltInit === 'true') return;
    card.dataset.tiltInit = 'true';

    // Inject dynamic specular glare overlay if missing
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      const imgWrap = card.querySelector('.product-image-container');
      if (imgWrap) imgWrap.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      // Update glare radial center
      const glareX = Math.round((x / rect.width) * 100);
      const glareY = Math.round((y / rect.height) * 100);
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.028,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000
      });

      const img = card.querySelector('.product-img');
      if (img) {
        gsap.to(img, {
          x: rotateY * 0.7,
          y: -rotateX * 0.7,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
      const img = card.querySelector('.product-img');
      if (img) {
        gsap.to(img, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });
  });
}

/**
 * Magnetic Pull on Interactive Buttons
 */
function initMagneticButtons() {
  if (typeof gsap === 'undefined') return;
  const buttons = document.querySelectorAll('.btn, .action-btn, .filter-toggle-btn, .quick-chip, .audio-ambient-btn');

  buttons.forEach(btn => {
    if (btn.dataset.magneticInit === 'true') return;
    btn.dataset.magneticInit = 'true';

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.25,
        ease: "power2.out"
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)"
      });
    });
  });
}

/**
 * Bombon.rs Signature Pinned Zoom Showcase Experience (ScrollTrigger Scrub)
 */
function initVaultZoomSection() {
  const section = document.getElementById('vaultZoomSection');
  const stickyContainer = document.getElementById('vaultSticky');
  const jacketImg = document.getElementById('vaultJacket');
  const watermark = document.getElementById('vaultWatermark');
  const glow = document.getElementById('vaultGlow');
  const pins = document.querySelectorAll('.hotspot-pin');

  if (!section || !stickyContainer || typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: stickyContainer,
      anticipatePin: 1
    }
  });

  // Scale centerpiece jacket from 0.85 to 1.35 with slight rotation
  if (jacketImg) {
    tl.fromTo(jacketImg, 
      { scale: 0.82, rotate: -4 },
      { scale: 1.38, rotate: 4, ease: "none" },
      0
    );
  }

  // Atmospheric background watermark letter-spacing expansion and shift
  if (watermark) {
    tl.fromTo(watermark,
      { x: '10%', letterSpacing: '0.04em', opacity: 0.03 },
      { x: '-15%', letterSpacing: '0.14em', opacity: 0.08, ease: "none" },
      0
    );
  }

  // Pulsing ambient glow scale
  if (glow) {
    tl.fromTo(glow,
      { scale: 0.7, opacity: 0.1 },
      { scale: 1.4, opacity: 0.25, ease: "none" },
      0
    );
  }

  // Hotspots pop in as you reach the middle of the zoom
  if (pins.length > 0) {
    tl.fromTo(pins,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: "back.out(2)" },
      0.2
    );
  }
}

/**
 * Toggle Hotspot Spec Card
 */
function toggleHotspot(pinEl) {
  const wasActive = pinEl.classList.contains('active');
  document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  if (!wasActive) {
    pinEl.classList.add('active');
  }
}

/**
 * Infinite Marquee Velocity Acceleration (ScrollTrigger getVelocity)
 */
function initMarqueeVelocity() {
  const track = document.getElementById('marqueeTrack');
  if (!track || typeof gsap === 'undefined') return;

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: "none",
    duration: 18,
    repeat: -1
  });

  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity() / 300);
        const targetScale = Math.min(5, 1 + vel);
        gsap.to(tween, {
          timeScale: targetScale,
          duration: 0.4,
          overwrite: "auto"
        });
      }
    });
  }
}

/**
 * Bombon.rs Audio Homage: Web Audio API Low-Fi Ambient Generative Sound
 */
function toggleAmbientAudio() {
  const btn = document.getElementById('audioAmbientBtn');
  const label = document.getElementById('audioLabel');

  if (!isAudioPlaying) {
    startAmbientSound();
    isAudioPlaying = true;
    if (btn) btn.classList.add('playing');
    if (label) label.textContent = 'Audio: ON';
    if (typeof showToast === 'function') showToast('Ambient Soundscape: ON');
  } else {
    stopAmbientSound();
    isAudioPlaying = false;
    if (btn) btn.classList.remove('playing');
    if (label) label.textContent = 'Audio: OFF';
    if (typeof showToast === 'function') showToast('Ambient Soundscape: MUTED');
  }
}

function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!ambientAudioCtx) {
      ambientAudioCtx = new AudioContext();
    }
    if (ambientAudioCtx.state === 'suspended') {
      ambientAudioCtx.resume();
    }

    ambientGainNode = ambientAudioCtx.createGain();
    ambientGainNode.gain.setValueAtTime(0.001, ambientAudioCtx.currentTime);
    ambientGainNode.gain.exponentialRampToValueAtTime(0.08, ambientAudioCtx.currentTime + 1.5);
    ambientGainNode.connect(ambientAudioCtx.destination);

    // Warm chord drone: 110Hz (A2), 164.8Hz (E3), 220Hz (A3)
    const freqs = [110, 164.81, 220];
    freqs.forEach((freq, idx) => {
      const osc = ambientAudioCtx.createOscillator();
      const filter = ambientAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 450 + (idx * 150);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
      
      // Slight chorus LFO
      const lfo = ambientAudioCtx.createOscillator();
      const lfoGain = ambientAudioCtx.createGain();
      lfo.frequency.value = 0.2 + (idx * 0.1);
      lfoGain.gain.value = 1.5;
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(ambientGainNode);
      osc.start();
    });
  } catch (e) {
    console.warn('Web Audio Ambient error:', e);
  }
}

function stopAmbientSound() {
  if (ambientAudioCtx && ambientGainNode) {
    try {
      ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, ambientAudioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (ambientAudioCtx && !isAudioPlaying) {
          ambientAudioCtx.suspend();
        }
      }, 850);
    } catch (e) {
      console.warn('Error stopping ambient audio:', e);
    }
  }
}

/**
 * ScrollTrigger Entrance Animations
 */
function initScrollTriggerAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero content reveal
  gsap.from('.hero-tag', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
  });
  gsap.from('.hero-title', {
    opacity: 0,
    y: 35,
    duration: 1.0,
    delay: 0.35,
    ease: "power3.out"
  });
  gsap.from('.hero-description', {
    opacity: 0,
    y: 25,
    duration: 0.9,
    delay: 0.5,
    ease: "power3.out"
  });
  gsap.from('.hero-cta-group .btn', {
    opacity: 0,
    y: 20,
    stagger: 0.12,
    duration: 0.8,
    delay: 0.65,
    ease: "power3.out"
  });

  // Floating tech pills entrance
  gsap.from('.hero-float-pill', {
    opacity: 0,
    scale: 0.7,
    stagger: 0.15,
    duration: 0.9,
    delay: 0.8,
    ease: "back.out(1.5)"
  });

  // ScrollTrigger for Lookbook cards
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.from('.lookbook-card', {
      scrollTrigger: {
        trigger: '.lookbook-grid',
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out"
    });

    // FAQ items reveal
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-list',
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  initVaultZoomSection();
  initMarqueeVelocity();
  animateCatalogEntrance();
}

/**
 * Smooth Staggered Catalog Cards entrance
 */
function animateCatalogEntrance() {
  if (typeof gsap === 'undefined') return;
  const cards = document.querySelectorAll('.product-card');
  if (cards.length === 0) return;

  gsap.fromTo(cards, 
    { opacity: 0, y: 35, scale: 0.97 },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      stagger: 0.03, 
      duration: 0.55, 
      ease: "power3.out" 
    }
  );
}
