// ============================================
//  FUGA DA TUMBA — script.js
// ============================================

// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// ---- Barra de progresso de scroll ----
var progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', function () {
  var scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
}, { passive: true });

// ---- Menu hamburger mobile ----
var hamburger = document.getElementById('hamburger');
var navMobile = document.getElementById('nav-mobile');

hamburger.addEventListener('click', function () {
  var isOpen = navMobile.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

function closeMobileNav() {
  navMobile.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

navMobile.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', closeMobileNav);
});

document.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
    closeMobileNav();
  }
});

// ---- Animações de entrada por scroll (IntersectionObserver) ----
var revealEls = document.querySelectorAll('.reveal');
var observer  = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
    var idx = siblings.indexOf(entry.target);
    setTimeout(function () {
      entry.target.classList.add('visible');
    }, Math.min(idx * 90, 360));
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(function (el) { observer.observe(el); });

// ---- Abas das cartas ----
var tabBtns = document.querySelectorAll('.tab-btn');
var panels  = document.querySelectorAll('.cards-panel');

tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var cat = btn.dataset.cat;
    tabBtns.forEach(function (b) { b.classList.remove('active'); });
    panels.forEach(function (p)  { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('panel-' + cat).classList.add('active');
  });
});

// ---- Smooth scroll em links âncora ----
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var headerH = document.querySelector('header').offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
