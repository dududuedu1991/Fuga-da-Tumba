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

// ---- Dado D6 3D ao clicar em área livre ----
var dadoRots = {
  1: [1080, 1080],
  2: [1080,  990],
  3: [1170, 1080],
  4: [ 990, 1080],
  5: [1080, 1170],
  6: [1080, 1260]
};

document.addEventListener('click', function (e) {
  if (e.target.closest('a, button, input, select, textarea, [role="button"], .tab-btn')) return;

  var face = Math.floor(Math.random() * 6) + 1;
  var rot  = dadoRots[face];

  var container = document.createElement('div');
  container.className = 'dado-container';

  var cubo = document.createElement('div');
  cubo.className = 'dado-cubo';

  for (var f = 1; f <= 6; f++) {
    var faceEl = document.createElement('div');
    faceEl.className = 'dado-face dado-face-' + f;
    for (var p = 0; p < f; p++) {
      var pip = document.createElement('span');
      pip.className = 'pip';
      faceEl.appendChild(pip);
    }
    cubo.appendChild(faceEl);
  }

  container.appendChild(cubo);

  var x = Math.min(e.clientX - 35, window.innerWidth  - 90);
  var y = Math.min(e.clientY - 35, window.innerHeight - 90);
  container.style.left = x + 'px';
  container.style.top  = y + 'px';

  document.body.appendChild(container);

  cubo.offsetHeight;

  cubo.style.transition = 'transform 1.3s cubic-bezier(0.17, 0.67, 0.25, 1.0)';
  cubo.style.transform  = 'rotateX(' + rot[0] + 'deg) rotateY(' + rot[1] + 'deg)';

  setTimeout(function () {
    container.style.transition = 'opacity 0.4s ease';
    container.style.opacity    = '0';
    setTimeout(function () { container.remove(); }, 450);
  }, 2100);
});
