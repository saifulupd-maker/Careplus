// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => { if (e.target.closest('a')) links.classList.remove('open'); });

// Active nav link on scroll
const navAnchors = [...document.querySelectorAll('.nav-links a')];
const sections = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spy.observe(s));

// FAQ: one open at a time
const items = document.querySelectorAll('.faq-item');
items.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) items.forEach(o => { if (o !== item) o.open = false; });
}));

// Reveal on scroll
const revealEls = document.querySelectorAll('.card, .feature, .plan, .faq-item, .cta, .section-head');
revealEls.forEach(el => el.classList.add('reveal'));
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => reveal.observe(el));

// Count-up numbers
const counters = document.querySelectorAll('[data-count]');
const counter = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, start = performance.now(), dur = 1000;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counter.observe(c));

// Demo button placeholder
document.getElementById('demo-btn').addEventListener('click', e => {
  e.preventDefault();
  alert('Thanks for your interest! Hook this button up to your booking form or calendar link.');
});
document.getElementById('year').textContent = new Date().getFullYear();
