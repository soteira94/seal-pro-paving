/* ============================================================
   Seal Pro Paving — Lógica del sitio (bilingüe + UI)
   ============================================================ */
(function () {
  'use strict';
  var I18N = window.SEALPRO_I18N || { es: {}, en: {} };
  var STORE_KEY = 'seal-pro-lang-v2';
  var DEFAULT_LANG = 'en';

  /* ---------- Idioma ---------- */
  function getLang() {
    var saved = localStorage.getItem(STORE_KEY);
    return (saved === 'en' || saved === 'es') ? saved : DEFAULT_LANG;
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.es;
    document.documentElement.setAttribute('lang', lang);

    // Texto
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    // HTML permitido
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    // Atributos: data-i18n-attr="placeholder:clave;aria-label:clave2"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2 && dict[parts[1]] != null) {
          el.setAttribute(parts[0].trim(), dict[parts[1].trim()]);
        }
      });
    });

    // Botones del selector
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    localStorage.setItem(STORE_KEY, lang);
  }

  function initLang() {
    applyLang(getLang());
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
    });
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var burger = document.querySelector('.hamburger');
    var nav = document.querySelector('.nav');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !nav) return;
    function close() { burger.classList.remove('open'); nav.classList.remove('open'); if (overlay) overlay.classList.remove('open'); document.body.style.overflow = ''; }
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      if (overlay) overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (overlay) overlay.addEventListener('click', close);
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  /* ---------- FAQ acordeón ---------- */
  function initFaq() {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var q = item.querySelector('.faq__q');
      var a = item.querySelector('.faq__a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var open = item.classList.toggle('open');
        a.style.maxHeight = open ? (a.scrollHeight + 'px') : '0px';
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ---------- Reveal al hacer scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Contador animado ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1400, start = 0, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.floor(p * (target - start) + start) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { nums.forEach(animate); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  /* ---------- Slideshow de fondos (banners y servicios) ---------- */
  function initSlideshow() {
    document.querySelectorAll('[data-slideshow]').forEach(function (el) {
      var imgs = el.getAttribute('data-slideshow').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!imgs.length) return;
      var ss = document.createElement('div'); ss.className = 'slideshow';
      imgs.forEach(function (src, i) {
        var s = document.createElement('div');
        s.className = 'slide' + (i === 0 ? ' is-active' : '');
        s.style.backgroundImage = "url('" + src + "')";
        ss.appendChild(s);
      });
      var ov = document.createElement('div'); ov.className = 'ss-overlay';
      ss.appendChild(ov);
      el.insertBefore(ss, el.firstChild);
      if (imgs.length > 1) {
        var slides = ss.querySelectorAll('.slide'), idx = 0;
        var delay = parseInt(el.getAttribute('data-ss-delay'), 10) || 3000;
        setInterval(function () {
          slides[idx].classList.remove('is-active');
          idx = (idx + 1) % slides.length;
          slides[idx].classList.add('is-active');
        }, delay);
      }
    });
  }

  /* ---------- Año dinámico ---------- */
  function initYear() {
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initMenu();
    initFaq();
    initReveal();
    initCounters();
    initSlideshow();
    initYear();
  });
})();
