/* ============================================================================
   cudy-study · SLIDE ENGINE  (vanilla JS, no dependencies)
   ----------------------------------------------------------------------------
   Shows exactly one .slide at a time inside .deck. Handles:
     · keyboard navigation (arrows, space, PageUp/Down, Home/End)
     · `f` fullscreen · `o` overview/grid mode
     · fixed counter "n / N" + top progress bar
     · URL hash sync (#5) — updates on navigate, restores on load/refresh
     · subtle entrance animation (respects prefers-reduced-motion)
     · Mermaid: renders ALL diagrams on load so hidden (display:none) slides
       still have rendered SVG when shown.

   Pair with assets/slides.css. Markup contract:
     <div class="deck">
       <section class="slide …"> … </section>
       …
     </div>
   The engine injects chrome (progress bar, counter, hint, overview bar) and a
   .deck-stage wrapper used by overview mode.
============================================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var deck = document.querySelector('.deck');
    if (!deck) return;

    var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
    if (!slides.length) return;

    var total = slides.length;
    var current = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- tag slides with 1-based index (used by overview ::after) -----------
    slides.forEach(function (s, i) { s.setAttribute('data-index', i + 1); });

    // --- build chrome --------------------------------------------------------
    var progress = el('div', 'deck-progress');
    var counter = el('div', 'deck-counter');
    counter.innerHTML = '<span class="cur">1</span><span class="sep">/</span><span class="total">' + total + '</span>';
    var hint = el('div', 'deck-hint');
    hint.innerHTML = '<kbd>←</kbd><kbd>→</kbd> 이동 · <kbd>F</kbd> 전체화면 · <kbd>O</kbd> 개요';
    var overviewBar = el('div', 'overview-bar');
    overviewBar.textContent = 'Overview — 슬라이드를 클릭해 이동 · Esc/O 닫기';

    document.body.appendChild(progress);
    document.body.appendChild(counter);
    document.body.appendChild(hint);
    document.body.appendChild(overviewBar);

    var curEl = counter.querySelector('.cur');

    // --- initialize Mermaid (render all, even hidden) ------------------------
    initMermaid();

    // --- starting slide from hash (#n, 1-based) ------------------------------
    var fromHash = parseHash();
    if (fromHash != null) current = clamp(fromHash, 0, total - 1);

    show(current, /*animate*/ false);

    // --- events --------------------------------------------------------------
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHashChange);

    // overview: click a thumbnail to jump
    deck.addEventListener('click', function (e) {
      if (!deck.classList.contains('is-overview')) return;
      var slide = e.target.closest('.slide');
      if (!slide) return;
      var idx = slides.indexOf(slide);
      if (idx >= 0) { exitOverview(); go(idx); }
    });

    // ---------------------------------------------------------------- helpers
    function el(tag, cls) { var n = document.createElement(tag); n.className = cls; return n; }

    function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

    function parseHash() {
      var m = /^#(\d+)$/.exec(window.location.hash || '');
      if (!m) return null;
      return parseInt(m[1], 10) - 1; // hash is 1-based
    }

    function setHash(i) {
      var target = '#' + (i + 1);
      if (window.location.hash !== target) {
        // replaceState avoids bloating history on every arrow press
        if (history.replaceState) history.replaceState(null, '', target);
        else window.location.hash = target;
      }
    }

    function show(i, animate) {
      slides.forEach(function (s) { s.classList.remove('is-active', 'animate-in'); });
      var slide = slides[i];
      slide.classList.add('is-active');
      // force reflow so the animation restarts each navigation
      if (animate && !reduceMotion) {
        // eslint-disable-next-line no-unused-expressions
        slide.offsetWidth;
        slide.classList.add('animate-in');
      }
      current = i;
      curEl.textContent = i + 1;
      progress.style.width = (total === 1 ? 100 : (i / (total - 1)) * 100) + '%';
      setHash(i);
    }

    function go(i) {
      i = clamp(i, 0, total - 1);
      if (i === current && deck.classList.contains('has-navigated')) return;
      deck.classList.add('has-navigated');
      show(i, true);
    }

    function next() { go(current + 1); }
    function prev() { go(current - 1); }

    function onHashChange() {
      var h = parseHash();
      if (h != null && h !== current) show(clamp(h, 0, total - 1), true);
    }

    function onKey(e) {
      // ignore when typing in a field
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;

      // overview mode: limited keys
      if (deck.classList.contains('is-overview')) {
        if (e.key === 'Escape' || e.key === 'o' || e.key === 'O') { e.preventDefault(); exitOverview(); }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault(); prev(); break;
        case ' ': // Space (next) / Shift+Space (prev)
          e.preventDefault(); e.shiftKey ? prev() : next(); break;
        case 'Home':
          e.preventDefault(); go(0); break;
        case 'End':
          e.preventDefault(); go(total - 1); break;
        case 'f':
        case 'F':
          e.preventDefault(); toggleFullscreen(); break;
        case 'o':
        case 'O':
          e.preventDefault(); enterOverview(); break;
        default: break;
      }
    }

    // ---------------------------------------------------------- fullscreen
    function toggleFullscreen() {
      var d = document.documentElement;
      if (!document.fullscreenElement) {
        (d.requestFullscreen || d.webkitRequestFullscreen || function () {}).call(d);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
      }
    }

    // ---------------------------------------------------------- overview mode
    function enterOverview() {
      deck.classList.add('is-overview');
      // ensure the active slide is visible-marked; scroll into view
      var act = slides[current];
      if (act && act.scrollIntoView) act.scrollIntoView({ block: 'center' });
    }
    function exitOverview() {
      deck.classList.remove('is-overview');
      show(current, true);
    }

    // ---------------------------------------------------------- mermaid
    function initMermaid() {
      if (typeof window.mermaid === 'undefined') return;
      try {
        window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
        // Render every diagram now, while we can read their text, so that
        // slides hidden via display:none already contain SVG when revealed.
        var nodes = Array.prototype.slice.call(document.querySelectorAll('pre.mermaid'));
        if (typeof window.mermaid.run === 'function') {
          window.mermaid.run({ nodes: nodes });
        } else if (typeof window.mermaid.init === 'function') {
          window.mermaid.init(undefined, nodes);
        }
      } catch (err) {
        // mermaid offline / failed — leave raw text; deck still works
        if (window.console) console.warn('[slides] mermaid render skipped:', err);
      }
    }
  }
})();
