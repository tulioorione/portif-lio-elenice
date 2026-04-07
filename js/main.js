// ============ HEADER SCROLL ============
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ MENU MOBILE ============
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('active');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('active');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}));

// ============ REVEAL ON SCROLL ============
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ============ PARALLAX AMBIENTE (HERO) ============
const ambientShapes = document.querySelectorAll('.ambient-shape');
if (ambientShapes.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let mouseX = 0, mouseY = 0, currX = 0, currY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  const tick = () => {
    currX += (mouseX - currX) * 0.05;
    currY += (mouseY - currY) * 0.05;
    ambientShapes.forEach((s, i) => {
      const depth = (i + 1) * 12;
      s.style.translate = `${currX * depth}px ${currY * depth}px`;
    });
    requestAnimationFrame(tick);
  };
  tick();
}

// ============ CARROSSEL DEPOIMENTOS ============
const carousel = document.getElementById('carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel__track');
  const slides = track.children;
  const total = slides.length;
  const dotsWrap = document.getElementById('carouselDots');
  let current = 0;

  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Depoimento ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  }
  const dots = dotsWrap.children;

  function go(i) {
    current = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    Array.from(dots).forEach((d, idx) => d.classList.toggle('active', idx === i));
  }
  go(0);
  setInterval(() => go((current + 1) % total), 6000);
}
