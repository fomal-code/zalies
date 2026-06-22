/* ============================================
   ZALIELS — script.js
   Scroll reveal · Parallax · Nav · WhatsApp · Toast
   ============================================ */

(function () {
  'use strict';

  /* ---- NAV SCROLL STATE ---- */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---- MOBILE MENU ---- */
  const burger     = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ---- HERO PARALLAX ---- */
  const heroBg = document.getElementById('heroBg');

  function onScroll() {
    if (!heroBg) return;
    const scrolled = window.scrollY;
    const rate     = scrolled * 0.35;
    heroBg.style.transform = `translateY(${rate}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-up-delay'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- SMOOTH NAV LINK SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = window.scrollY + target.getBoundingClientRect().top - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ---- WHATSAPP ORDER ---- */
  window.orderOnWhatsApp = function (btn) {
    const card  = btn.closest('.product-card');
    const name  = card.dataset.name  || 'this item';
    const price = card.dataset.price || 'the listed price';

    const message =
      `Hello, I want to order *${name}* for *${price}* from Zaliels. Please provide details.`;

    const encoded = encodeURIComponent(message);

    // Replace XXXXXXXXXX with your actual WhatsApp number (international format, no +)
    const waNumber = '9134567890'; // Example: '1234567890' for +1 234 567 890
    const url = `https://wa.me/${waNumber}?text=${encoded}`;

    showToast('Redirecting to WhatsApp…');

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  /* ---- TOAST ---- */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('contactName').value.trim();
      const email   = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Build WhatsApp message from form
      const waText = `Hello Zaliels,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'General Inquiry'}\n\n${message}`;
      const waNumber = '9138947809'; // replace with your number
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

      // Show success state
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');

      // Open WhatsApp after short delay
      setTimeout(() => window.open(waUrl, '_blank', 'noopener,noreferrer'), 600);
    });
  }


  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- LOOKBOOK HOVER IMAGE SWAP (optional) ---- */
  // Assign hover alternate images if data-hover attr is present
  document.querySelectorAll('.lookbook-item').forEach(item => {
    const img   = item.querySelector('img');
    const alt   = item.dataset.hover;
    if (!img || !alt) return;

    const original = img.src;

    item.addEventListener('mouseenter', () => { img.src = alt; });
    item.addEventListener('mouseleave', () => { img.src = original; });
  });

  /* ---- SUBTLE CURSOR GLOW (desktop only) ---- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(107,33,168,0.07) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: left 0.8s cubic-bezier(0.22,1,0.36,1), top 0.8s cubic-bezier(0.22,1,0.36,1);
      z-index: 0;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

})();
