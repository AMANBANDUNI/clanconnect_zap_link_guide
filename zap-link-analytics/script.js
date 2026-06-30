// ===== Scroll progress bar =====
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100) + '%';
  toTop.classList.toggle('show', h.scrollTop > 600);
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Active section highlight in nav =====
const navLinks = [...document.querySelectorAll('.topnav a')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = '#' + e.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const topnav = document.getElementById('topnav');
navToggle.addEventListener('click', () => topnav.classList.toggle('show'));
topnav.addEventListener('click', e => {
  if (e.target.tagName === 'A') topnav.classList.remove('show');
});

// ===== Lightbox for screenshots =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

document.querySelectorAll('.shot .phone img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target !== lbImg) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== Reveal on scroll =====
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'none';
      reveal.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.flow-step,.split,.type-card,.note,.shot,.recap-list li,.callout').forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity .5s ease ${(i % 6) * 40}ms, transform .5s ease ${(i % 6) * 40}ms`;
  reveal.observe(el);
});
