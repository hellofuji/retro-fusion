/* ==========================================================================
   main.js

   Vanilla JS, no dependencies, no build step.

   Everything here is an enhancement. With JS off the site still navigates, the
   carousel still scrolls, the FAQ still opens (<details>), and the counter
   still shows its server-rendered number. This file only makes those nicer.
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* ---------- 1. Nav and dropdowns ---------- */

  function initNav() {
    var nav = $('#rf-nav');
    if (!nav) return;

    var toggle = $('#rf-nav-toggle', nav);
    var drawer = $('#rf-nav-menu', nav);

    /* ---- Hamburger ---- */
    if (toggle && drawer) {
      toggle.addEventListener('click', function () {
        var open = drawer.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    /* ---- Sub-menu toggles (touch + keyboard users) ---- */
    $$('.rf-nav__sub-toggle', nav).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var li = btn.closest('.rf-nav__item');
        if (!li) return;

        var willOpen = !li.classList.contains('is-open');

        /* Close siblings at the same level so only one branch is open. */
        var parentList = li.parentElement;
        if (parentList) {
          $$(':scope > .rf-nav__item.is-open', parentList).forEach(function (sib) {
            if (sib !== li) {
              sib.classList.remove('is-open');
              var sb = $('.rf-nav__sub-toggle', sib);
              if (sb) sb.setAttribute('aria-expanded', 'false');
            }
          });
        }

        li.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    /* ---- Escape closes everything and returns focus ---- */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' && e.key !== 'Esc') return;

      var open = $$('.rf-nav__item.is-open', nav);
      if (!open.length) return;

      open.forEach(function (li) {
        li.classList.remove('is-open');
        var b = $('.rf-nav__sub-toggle', li);
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      var lastToggle = $('.rf-nav__sub-toggle[aria-expanded="true"]', nav);
      if (lastToggle) lastToggle.focus();
    });

    /* ---- Click outside closes any open dropdown (desktop hover menus) ---- */
    document.addEventListener('click', function (e) {
      if (nav.contains(e.target)) return;
      $$('.rf-nav__item.is-open', nav).forEach(function (li) {
        li.classList.remove('is-open');
        var b = $('.rf-nav__sub-toggle', li);
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });

    /* ---- Focus leaving a dropdown closes it (keyboard traversal) ---- */
    $$('.rf-nav__item--has-children', nav).forEach(function (li) {
      li.addEventListener('focusout', function (e) {
        if (!li.contains(e.relatedTarget)) {
          li.classList.remove('is-open');
          var b = $('.rf-nav__sub-toggle', li);
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---------- 2. Carousel ---------- */

  function initCarousels() {
    $$('[data-rf-carousel]').forEach(function (root) {
      var viewport = $('[data-rf-carousel-viewport]', root);
      var slides = $$('[data-rf-slide]', root);
      var dots = $$('[data-rf-carousel-dot]', root);
      var prev = $('[data-rf-carousel-prev]', root);
      var next = $('[data-rf-carousel-next]', root);

      if (!viewport || slides.length < 2) return;

      var index = 0;
      var timer = null;
      var autoplay = root.getAttribute('data-autoplay') === 'true';
      var interval = parseInt(root.getAttribute('data-interval'), 10) || 5000;

      function currentIndex() {
        var w = viewport.clientWidth || 1;
        return Math.round(viewport.scrollLeft / w);
      }

      function goTo(i, smooth) {
        index = (i + slides.length) % slides.length;
        viewport.scrollTo({
          left: index * viewport.clientWidth,
          behavior: (smooth === false || prefersReducedMotion.matches) ? 'auto' : 'smooth'
        });
        syncDots();
      }

      function syncDots() {
        dots.forEach(function (d, i) {
          var active = i === index;
          d.classList.toggle('is-active', active);
          d.setAttribute('aria-selected', active ? 'true' : 'false');
        });
      }

      /* Keep dots in sync when the user swipes/scrolls manually. */
      var scrollTick;
      viewport.addEventListener('scroll', function () {
        window.clearTimeout(scrollTick);
        scrollTick = window.setTimeout(function () {
          var i = currentIndex();
          if (i !== index) { index = i; syncDots(); }
        }, 90);
      }, { passive: true });

      if (prev) prev.addEventListener('click', function () { goTo(index - 1); restart(); });
      if (next) next.addEventListener('click', function () { goTo(index + 1); restart(); });

      dots.forEach(function (d) {
        d.addEventListener('click', function () {
          goTo(parseInt(d.getAttribute('data-rf-carousel-dot'), 10) || 0);
          restart();
        });
      });

      /* Keyboard support when the viewport has focus. */
      viewport.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); restart(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); restart(); }
      });

      /* Swipe (touch devices that also raise pointer events). */
      var startX = null;
      viewport.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 45) { goTo(index + (dx < 0 ? 1 : -1)); restart(); }
        startX = null;
      }, { passive: true });

      /* ---- Autoplay ---- */
      function start() {
        if (!autoplay || prefersReducedMotion.matches || timer) return;
        timer = window.setInterval(function () { goTo(index + 1); }, interval);
      }
      function stop() { window.clearInterval(timer); timer = null; }
      function restart() { stop(); start(); }

      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', start);
      root.addEventListener('focusin', stop);
      root.addEventListener('focusout', function (e) {
        if (!root.contains(e.relatedTarget)) start();
      });

      /* Don't burn cycles (or data) on a background tab. */
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
      });

      /* Re-align after a resize/orientation change. */
      var resizeTick;
      window.addEventListener('resize', function () {
        window.clearTimeout(resizeTick);
        resizeTick = window.setTimeout(function () {
          viewport.scrollTo({ left: index * viewport.clientWidth, behavior: 'auto' });
        }, 150);
      });

      syncDots();
      start();
    });
  }

  /* ---------- 3. FAQ accordion ---------- */

  function initFaq() {
    $$('[data-rf-faq]').forEach(function (group) {
      if (group.getAttribute('data-single') === 'false') return;

      var items = $$('details.rf-faq__item', group);

      items.forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item && other.open) other.open = false;
          });
        });
      });

      /* Deep links like #faq-3 open the matching panel and scroll to it. */
      if (window.location.hash) {
        var target = group.querySelector(window.location.hash);
        if (target && target.tagName === 'DETAILS') {
          items.forEach(function (o) { if (o !== target) o.open = false; });
          target.open = true;
        }
      }
    });
  }

  /* ---------- 4. Visitor counter ---------- */

  function initCounter() {
    var el = $('[data-rf-counter]');
    if (!el) return;

    var out = $('.rf-counter__digits', el) || el;
    var base = parseInt(el.getAttribute('data-base'), 10);
    if (isNaN(base)) return;

    var KEY = 'rf-counter-visits';
    var visits = 0;

    try {
      visits = parseInt(window.localStorage.getItem(KEY), 10) || 0;
      visits += 1;
      window.localStorage.setItem(KEY, String(visits));
    } catch (err) {
      /* Private mode or storage disabled. The server-rendered number stands. */
      return;
    }

    /* One extra "hit" per local visit, capped so it never looks absurd. */
    var total = base + Math.min(visits, 250);
    var padded = String(total);
    while (padded.length < 7) padded = '0' + padded;
    out.textContent = padded;
  }

  /* ---------- 5. Back to top ---------- */

  function initBackToTop() {
    var btn = $('#rf-back-to-top');
    if (!btn) return;

    var THRESHOLD = 420;
    var ticking = false;

    function update() {
      btn.hidden = window.scrollY < THRESHOLD;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    function toTop(e) {
      if (e) e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
      /* Send focus back to the top of the content. Not the skip link:
         focusing that slides it into view. */
      var target = document.getElementById('main') || document.body;
      if (target && target.focus) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }

    btn.addEventListener('click', toTop);
    $$('[data-rf-totop]').forEach(function (a) { a.addEventListener('click', toTop); });

    update();
  }

  /* ---------- 6. Share extras ---------- */

  function initShare() {
    $$('[data-rf-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-rf-copy');
        var done = function () {
          var original = btn.innerHTML;
          btn.innerHTML = '<span aria-hidden="true">✔</span> Copied!';
          window.setTimeout(function () { btn.innerHTML = original; }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (err) { /* noop */ }
          document.body.removeChild(ta);
        }
      });
    });

    $$('[data-rf-print]').forEach(function (btn) {
      btn.addEventListener('click', function () { window.print(); });
    });

    /* Mastodon has no single share endpoint, so ask for their instance. */
    $$('[data-rf-mastodon]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var instance = window.prompt('Which Mastodon instance? (e.g. mastodon.social)', 'mastodon.social');
        if (!instance) return;
        instance = instance.replace(/^https?:\/\//, '').replace(/\/+$/, '');
        var url = 'https://' + instance + '/share?url=' + link.getAttribute('data-rf-mastodon') +
                  '&text=' + encodeURIComponent(link.getAttribute('data-rf-title') || '');
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  /* ---------- 7. Retro flourishes ---------- */

  function initFlourishes() {
    /* Mark external links in prose so the reader knows they're leaving. */
    $$('.rf-prose a[href^="http"]').forEach(function (a) {
      if (a.hostname && a.hostname !== window.location.hostname) {
        a.setAttribute('rel', (a.getAttribute('rel') || '') + ' noopener noreferrer');
        a.setAttribute('target', '_blank');
        if (!a.querySelector('.rf-ext')) {
          var s = document.createElement('span');
          s.className = 'rf-ext';
          s.setAttribute('aria-hidden', 'true');
          s.textContent = ' ↗';
          a.appendChild(s);
        }
      }
    });
  }


  /* ---------- Boot ---------- */

  function boot() {
    initNav();
    initCarousels();
    initFaq();
    initCounter();
    initBackToTop();
    initShare();
    initFlourishes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
