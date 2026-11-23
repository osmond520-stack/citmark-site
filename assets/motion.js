/* CitMark motion v1 — 《CitMark 动效标准 v1》.
   Adds html.mjs (the gate for every hidden start state in motion.css),
   plays reveals / radar choreography on view (once), counts numbers up
   over 600ms with fixed decimals, swaps the burger glyph, closes the
   menu on Esc, and marks lead forms busy on submit. With reduced motion
   or no IntersectionObserver everything is simply shown. */
(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('mjs');

  function show(el) { el.classList.add('in'); el.classList.add('play'); }

  /* ---- count-up (3.2): 600ms ease-out, fixed decimals ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var node = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) { node = el.childNodes[i]; break; }
    }
    if (!node) return;
    if (reduced || !window.requestAnimationFrame) { node.textContent = target.toFixed(dec); return; }
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 600, 1);
      var e = 1 - Math.pow(1 - p, 3);
      node.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step); else node.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(step);
  }

  /* ---- observers: reveal groups, radars, counters — each once ---- */
  var watched = [];
  function watch(el, fn) { watched.push([el, fn]); }
  document.querySelectorAll('[data-rv]').forEach(function (el) { watch(el, show); });
  document.querySelectorAll('.radar-svg').forEach(function (el) { watch(el, show); });
  document.querySelectorAll('[data-count]').forEach(function (el) { watch(el, countUp); });

  if (reduced || !('IntersectionObserver' in window)) {
    watched.forEach(function (pair) { pair[1](pair[0]); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        watched.forEach(function (pair) { if (pair[0] === en.target) pair[1](pair[0]); });
      });
    }, { threshold: 0.25 });
    watched.forEach(function (pair) { io.observe(pair[0]); });
  }

  /* ---- burger: glyph swap + Esc (the shell JS owns the toggle) ---- */
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  if (burger && mmenu) {
    var icon = burger.querySelector('svg');
    if (icon) {
      icon.classList.add('bic');
      var xx = document.createElement('span');
      xx.className = 'bxx';
      xx.textContent = '✕';
      xx.style.display = 'none';
      xx.style.fontSize = '17px';
      xx.style.lineHeight = '1';
      burger.appendChild(xx);
      new MutationObserver(function () {
        var open = mmenu.classList.contains('open');
        icon.style.opacity = open ? '0' : '1';
        icon.style.transform = open ? 'rotate(90deg)' : 'none';
        xx.style.display = open ? 'inline-block' : 'none';
        xx.style.opacity = open ? '1' : '0';
      }).observe(mmenu, { attributes: true, attributeFilter: ['class'] });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mmenu.classList.contains('open')) burger.click();
    });
  }

  /* ---- lead forms: busy state + no double submit (2.6) ---- */
  document.querySelectorAll('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type=submit]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    });
  });
})();
