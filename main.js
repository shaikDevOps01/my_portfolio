/* ═══════════════════════════════════════════════════════
   SHAIK DASTHAGIRI — PORTFOLIO JAVASCRIPT
   File: js/main.js
   ═══════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   CONFIG — easy to change values
   ───────────────────────────────────────── */
const CONFIG = {
  // Scroll threshold before nav darkens (px)
  navScrollThreshold: 40,

  // IntersectionObserver threshold for fade-in
  fadeThreshold: 0.1,

  // Typewriter phrases — add/remove as you like
  typewriterPhrases: [
    'Cloud Infrastructure Engineer',
    'Platform Engineering Learner',
    'GitOps Practitioner',
    'AI-Augmented Builder',
    'DevSecOps Explorer',
    'Continuously Learning & Shipping'
  ],
  typewriterSpeed:   78,   // ms per character (typing)
  typewriterDelete:  45,   // ms per character (deleting)
  typewriterPause:   2200, // ms pause at end of phrase
};


/* ─────────────────────────────────────────
   DOM READY
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollFade();
  initNavScroll();
  initMobileMenu();
  initTypewriter();
  initActiveNavLink();
});


/* ─────────────────────────────────────────
   SCROLL FADE-IN ANIMATIONS
   ───────────────────────────────────────── */
function initScrollFade() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        // Unobserve after triggering (better performance)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: CONFIG.fadeThreshold });

  document.querySelectorAll('.fu').forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────
   NAV BACKGROUND ON SCROLL
   ───────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > CONFIG.navScrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}


/* ─────────────────────────────────────────
   MOBILE HAMBURGER MENU
   ───────────────────────────────────────── */
function initMobileMenu() {
  const ham    = document.getElementById('nav-ham');
  const drawer = document.getElementById('nav-drawer');
  if (!ham || !drawer) return;

  ham.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', false);
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (!ham.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      ham.classList.remove('open');
    }
  });
}


/* ─────────────────────────────────────────
   TYPEWRITER EFFECT (hero sub-role)
   ───────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;

  function tick() {
    const phrase = CONFIG.typewriterPhrases[phraseIndex];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, CONFIG.typewriterPause);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % CONFIG.typewriterPhrases.length;
      }
    }

    setTimeout(tick, deleting ? CONFIG.typewriterDelete : CONFIG.typewriterSpeed);
  }

  tick();
}


/* ─────────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
   ───────────────────────────────────────── */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--txt)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}


/* ─────────────────────────────────────────
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   (fallback for browsers that don't support
   CSS scroll-behavior: smooth)
   ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
