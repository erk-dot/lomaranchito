/* Loma Ranchito — shared interactions
   Scroll-reveal, nav elevation. No dependencies. */
(function () {
    'use strict';

    function init() {
        // Scroll-reveal: tag content blocks and stagger them in
        var selectors = '.card, .split > *, .stats .stat, table.info, .callout, section.band .kicker, section.band h2.sec, section.band .rule, .prose h3';
        var els = document.querySelectorAll(selectors);

        if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            els.forEach(function (el, i) {
                el.classList.add('rv');
                el.style.transitionDelay = (Math.min((i % 5) * 70, 280)) + 'ms';
                io.observe(el);
            });
        }

        // Nav: lives inside the banner/hero art by default; pins to the
        // top of the viewport once you've scrolled past that art.
        var nav = document.querySelector('nav.site-nav');
        var navHost = nav && nav.closest('.banner-band, .page-hero');
        if (nav && navHost) {
            var pinThreshold = 0;
            var measure = function () {
                pinThreshold = navHost.getBoundingClientRect().bottom + window.scrollY - nav.offsetHeight;
            };
            var onScroll = function () {
                nav.classList.toggle('pinned', window.scrollY > pinThreshold);
            };
            measure();
            onScroll();
            window.addEventListener('resize', measure, { passive: true });
            window.addEventListener('scroll', onScroll, { passive: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
