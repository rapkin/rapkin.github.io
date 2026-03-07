/* ═══════════════════════════════════════════════════════════
   LANDING FOR 8 MARCH  ·  script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── CONSTANTS ─────────────────────────────────────────── */
const CODES = {
  '833dfc7e3eb11230369904322cc8481b2b9a166d965557f97d4832cd92e072af': 'ти відкрила моїм кодом, цікаво\u00a0)',
  'ded787fd3ddc887828b1d6533e4a3a916df2c5ef25453aa1483944dae2014425': 'ти відкрила своїм кодом, що ж це значить?\u00a0)',
  '91b4d142823f7d20c5f08df69122de43f35f057a988d9619f6d3138485c9a203': 'підглядаєте?\u00a0)',
};

async function hashCode(code) {
  const data = new TextEncoder().encode(code);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ─── DOM REFS ───────────────────────────────────────────── */
const safeScreen    = document.getElementById('safe-screen');
const safeDoor      = document.getElementById('safe-door');
const safeHandle    = document.getElementById('safe-handle');
const safeInsideText = document.getElementById('safe-inside-text');
const unlockOverlay = document.getElementById('unlock-overlay');
const unlockMsg     = document.getElementById('unlock-message');
const dots          = [...document.querySelectorAll('.dot')];
const keys          = [...document.querySelectorAll('.key[data-digit]')];
const clearBtn      = document.getElementById('key-clear');
const mainContent   = document.getElementById('main-content');
const confettiBtn   = document.getElementById('confetti-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
const musicBtn      = document.getElementById('music-btn');
const eqBars        = document.getElementById('eq-bars');
const playIcon      = document.getElementById('play-icon');
const audio         = document.getElementById('bg-audio');

/* ═══════════════════════════════════════════════════════════
   SAFE — INPUT LOGIC
   ═══════════════════════════════════════════════════════════ */
let currentInput = '';
let safeLocked   = true;

function addDigit(d) {
  if (!safeLocked || currentInput.length >= 6) return;
  currentInput += d;
  updateDots();
  if (currentInput.length === 6) {
    setTimeout(checkCode, 80); // tiny delay for last dot animation
  }
}

function clearDigit() {
  if (!safeLocked) return;
  currentInput = currentInput.slice(0, -1);
  updateDots();
}

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < currentInput.length);
  });
}

async function checkCode() {
  const hash = await hashCode(currentInput);
  const message = CODES[hash];
  if (message) {
    openSafe(message);
  } else {
    wrongCode();
  }
}

function wrongCode() {
  // turn dots red
  dots.forEach(dot => {
    dot.classList.remove('filled');
    dot.classList.add('red');
  });
  // shake door
  safeDoor.classList.add('shake');
  setTimeout(() => {
    safeDoor.classList.remove('shake');
    dots.forEach(dot => dot.classList.remove('red'));
    currentInput = '';
    updateDots();
  }, 620);
}

/* ═══════════════════════════════════════════════════════════
   SAFE — OPEN ANIMATION (GSAP)
   ═══════════════════════════════════════════════════════════ */
function openSafe(message) {
  safeLocked = false; // prevent further input

  // Reveal the safe interior just before door swings open
  document.querySelector('.safe-body').classList.add('revealed');

  const tl = gsap.timeline();

  // 1. Dots turn green (stagger)
  tl.to(dots, {
    duration: .12,
    stagger: .06,
    onStart: () => {
      dots.forEach(d => { d.classList.remove('filled'); d.classList.add('green'); });
    },
  });

  // 2. Handle spins 360°
  tl.to(safeHandle, {
    rotation: 360,
    duration: .9,
    ease: 'power2.inOut',
  }, '+=.25');

  // 3. Bolts slide to corners
  tl.to('#bolt-tl', { x: -12, y: -12, duration: .35, ease: 'power2.in' }, '-=.2');
  tl.to('#bolt-tr', { x:  12, y: -12, duration: .35, ease: 'power2.in' }, '<');
  tl.to('#bolt-bl', { x: -12, y:  12, duration: .35, ease: 'power2.in' }, '<');
  tl.to('#bolt-br', { x:  12, y:  12, duration: .35, ease: 'power2.in' }, '<');

  // 4. Door swings open
  tl.to(safeDoor, {
    rotateY: -105,
    duration: 1.3,
    ease: 'power3.inOut',
    transformOrigin: 'left center',
  }, '+=.08');

  // 5. Show message inside safe
  tl.call(() => {
    safeInsideText.textContent = message;
    requestAnimationFrame(() => safeInsideText.classList.add('visible'));
  });

  // 6. After delay — show unlock overlay, then scroll
  tl.call(() => {
    showUnlockOverlay(message);
  }, null, '+=.5');
}

function showUnlockOverlay(message) {
  unlockMsg.textContent = message;
  unlockOverlay.classList.add('visible');

  setTimeout(() => {
    unlockOverlay.classList.remove('visible');
    setTimeout(unlockAndScroll, 500);
  }, 2200);
}

function unlockAndScroll() {
  // Reveal main content
  document.body.classList.remove('locked');
  mainContent.style.visibility = 'visible';
  document.querySelector('.music-player').style.visibility = 'visible';

  // Start music
  audio.play().then(() => {
    playing = true;
    eqBars.classList.add('active');
    playIcon.style.display = 'none';
  }).catch(() => {});

  // Fade out safe screen
  safeScreen.classList.add('fade-out');
  setTimeout(() => { safeScreen.style.display = 'none'; }, 950);

  // Init Lenis smooth scroll
  initLenis();

  // Init scroll animations
  initScrollAnimations();

  // Scroll to letter section
  setTimeout(() => {
    const letterSection = document.getElementById('s-letter');
    if (letterSection) {
      window.scrollTo({ top: letterSection.offsetTop, behavior: 'smooth' });
    }
  }, 800);
}

/* ═══════════════════════════════════════════════════════════
   LENIS — SMOOTH SCROLL
   ═══════════════════════════════════════════════════════════ */
let lenis;

function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  // GSAP ticker drives Lenis (time in seconds → ms)
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ═══════════════════════════════════════════════════════════
   GSAP — SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Set initial hidden state (gsap.set so content visible if GSAP fails)
  gsap.set('.reveal-up',       { opacity: 0, y: 48 });
  gsap.set('.reveal-fade',     { opacity: 0 });
  gsap.set('.reveal-left',     { opacity: 0, x: -60 });
  gsap.set('.reveal-right',    { opacity: 0, x: 60 });
  gsap.set('.reveal-scale',    { opacity: 0, scale: .88, y: 24 });
  gsap.set('.reveal-polaroid', { opacity: 0, y: 60 });

  function delayOf(el) {
    return el.classList.contains('delay-1') ? .12
         : el.classList.contains('delay-2') ? .24
         : el.classList.contains('delay-3') ? .36
         : el.classList.contains('delay-4') ? .48 : 0;
  }

  /* ── reveal up ── */
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 1, y: 0,
      duration: .85, delay: delayOf(el),
      ease: 'power3.out',
    });
  });

  /* ── reveal fade ── */
  gsap.utils.toArray('.reveal-fade').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 1, ease: 'power2.out',
    });
  });

  /* ── reveal left ── */
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1, x: 0,
      duration: .9, ease: 'power3.out',
    });
  });

  /* ── reveal right ── */
  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1, x: 0,
      duration: .9, ease: 'power3.out',
    });
  });

  /* ── reveal scale ── */
  gsap.utils.toArray('.reveal-scale').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--card-delay')) || 0;
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 1, scale: 1, y: 0,
      duration: .75, delay,
      ease: 'back.out(1.6)',
    });
  });

  /* ── polaroid cards ── */
  gsap.utils.toArray('.reveal-polaroid').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--delay')) || 0;
    const rot   = parseFloat(el.style.getPropertyValue('--rot'))   || 0;
    gsap.set(el, { rotation: rot * 3 });
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, rotation: rot,
      duration: .9, delay,
      ease: 'back.out(1.4)',
    });
  });

  /* ── stars stagger ── */
  const stars = document.querySelectorAll('.star');
  if (stars.length) {
    gsap.set(stars, { opacity: 0, scale: 0, rotation: -30 });
    gsap.to(stars, {
      scrollTrigger: { trigger: stars[0].parentElement, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1, scale: 1, rotation: 0,
      stagger: .1, duration: .5,
      ease: 'back.out(2)',
    });
  }

  /* letter title parallax removed — conflicted with reveal-up */

  /* Teddy tail — CSS animation inside assets/teddy.svg (no GSAP needed) */

  /* ── Confetti section trigger ── */
  ScrollTrigger.create({
    trigger: '#s-final',
    start: 'top 60%',
    once: true,
    onEnter: () => setTimeout(launchConfetti, 600),
  });
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI
   ═══════════════════════════════════════════════════════════ */
const COLORS = ['#e8a87c','#d4738a','#b8a9c9','#8fbc8f','#f5f0eb','#d4a847','#c47db5'];

function launchConfetti() {
  const canvas = confettiCanvas;
  const ctx    = canvas.getContext('2d');
  let   w      = canvas.offsetWidth;
  let   h      = canvas.offsetHeight;
  canvas.width  = w * devicePixelRatio;
  canvas.height = h * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const particles = Array.from({ length: 220 }, () => createParticle(w, h));
  let   frame     = 0;
  let   rafId;

  function step() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y  += p.vy;
      p.x  += p.vx;
      p.vy += .06; // softer gravity — floats longer
      p.vx *= .998; // gentle air drag
      p.rot += p.rotSpeed;
      p.life -= .002;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle   = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // wrap horizontally
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
    });

    frame++;
    if (frame < 700 && particles.some(p => p.life > 0)) {
      rafId = requestAnimationFrame(step);
    } else {
      ctx.clearRect(0, 0, w, h);
    }
  }
  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}

function createParticle(w, h) {
  return {
    x:        Math.random() * w,
    y:        -10 - Math.random() * h * .3,
    vx:       (Math.random() - .5) * 3,
    vy:       .8 + Math.random() * 2.2,
    rot:      Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - .5) * .15,
    size:     6 + Math.random() * 10,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    shape:    Math.random() > .4 ? 'rect' : 'circle',
    life:     .85 + Math.random() * .15,
  };
}

/* ═══════════════════════════════════════════════════════════
   MUSIC PLAYER
   ═══════════════════════════════════════════════════════════ */
let playing = false;

musicBtn.addEventListener('click', () => {
  if (playing) {
    audio.pause();
    playing = false;
    eqBars.classList.remove('active');
    playIcon.style.display = 'block';
  } else {
    audio.play().then(() => {
      playing = true;
      eqBars.classList.add('active');
      playIcon.style.display = 'none';
    }).catch(() => {
      // music file not found — fail silently
    });
  }
});

audio.addEventListener('ended', () => {
  playing = false;
  eqBars.classList.remove('active');
  playIcon.style.display = 'block';
});

/* ═══════════════════════════════════════════════════════════
   CONFETTI BUTTON
   ═══════════════════════════════════════════════════════════ */
confettiBtn.addEventListener('click', () => {
  launchConfetti();
  gsap.from(confettiBtn, {
    scale: .9, duration: .25, ease: 'back.out(2)',
  });
});

/* ═══════════════════════════════════════════════════════════
   KEYPAD — EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */
keys.forEach(key => {
  key.addEventListener('click', () => addDigit(key.dataset.digit));
});

clearBtn.addEventListener('click', clearDigit);

// Physical keyboard support
document.addEventListener('keydown', e => {
  if (!safeLocked) return;
  if (e.key >= '0' && e.key <= '9') addDigit(e.key);
  if (e.key === 'Backspace' || e.key === 'Delete') clearDigit();
});

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
// Ensure main content is hidden until unlock
mainContent.style.visibility = 'hidden';
document.querySelector('.music-player').style.visibility = 'hidden';
