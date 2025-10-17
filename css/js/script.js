// script.js — shared behavior for all pages

// ▶ Global small utilities
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

// set current year in footer(s)
['#year','#year-2','#year-3','#year-4'].forEach(id => {
  const el = document.querySelector(id);
  if (el) el.textContent = new Date().getFullYear();
});

// ▶ Mobile nav toggles (supports multiple pages with different ids)
function setupNav(toggleId, navId) {
  const t = document.getElementById(toggleId);
  const n = document.getElementById(navId);
  if (!t || !n) return;
  t.addEventListener('click', () => n.classList.toggle('open'));
}
setupNav('nav-toggle','site-nav');
setupNav('nav-toggle-2','site-nav-2');
setupNav('nav-toggle-3','site-nav-3');
setupNav('nav-toggle-4','site-nav-4');

// ▶ Lightbox for project view (index.html)
(function lightbox() {
  const lightbox = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbClose = $('#lb-close');
  if (!lightbox) return;

  // open when user clicks view buttons
  $$('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      lbImg.src = src;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden','false');
      lbClose.focus();
    });
  });

  const close = () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  };

  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ▶ Service card toggle details (services.html)
(function serviceToggle() {
  $$('.toggle-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (!details) return;
      const isHidden = details.hidden;
      details.hidden = !isHidden;
      btn.textContent = isHidden ? 'Less' : 'More';
      // for accessibility
      btn.setAttribute('aria-expanded', String(isHidden));
    });
  });
})();

// ▶ Contact form validation (contact.html)
// simple client-side validation and simulated send (no backend)
(function contactForm() {
  const form = $('#contact-form');
  if (!form) return;
  const feedback = $('#form-feedback');

  function validEmail(email) {
    // simple email regex; fine for client-side check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) { feedback.textContent = 'Please enter your name (2+ chars).'; form.name.focus(); return; }
    if (!validEmail(email)) { feedback.textContent = 'Please enter a valid email.'; form.email.focus(); return; }
    if (message.length < 10) { feedback.textContent = 'Message must be at least 10 characters.'; form.message.focus(); return; }

    // Simulate network send (replace with real endpoint e.g. Formspree)
    feedback.textContent = 'Sending...';
    setTimeout(() => {
      feedback.textContent = 'Thanks — your message was sent (simulated).';
      form.reset();
    }, 800);
  });
})();

// ▶ Small accessibility: focus outlines for keyboard users
document.addEventListener('keyup', (e) => {
  if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
});
