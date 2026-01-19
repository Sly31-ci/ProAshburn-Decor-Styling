/**
 * Sticky Floating CTA Controller
 * Gère l'affichage du bouton CTA flottant au scroll
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        scrollThreshold: 800, // Pixels de scroll avant apparition
        hideOnContactSection: true, // Masquer quand section contact visible
        smoothScroll: true, // Activer le smooth scroll au clic
        debounceDelay: 100 // Délai pour optimisation performance
    };

    // Récupération des éléments
    const stickyCta = document.getElementById('stickyCta');
    const contactSection = document.getElementById('contact');

    if (!stickyCta) {
        console.warn('Sticky CTA element not found');
        return;
    }

    /**
     * Debounce function pour optimiser les performances
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Vérifie si un élément est visible dans le viewport
     */
    function isElementInViewport(el) {
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight * 0.75 && // 75% du viewport
            rect.bottom >= 0
        );
    }

    /**
     * Gère l'affichage/masquage du CTA sticky
     */
    function handleStickyCtaVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const contactVisible = CONFIG.hideOnContactSection && isElementInViewport(contactSection);

        // Conditions d'affichage
        const shouldShow = scrollPosition > CONFIG.scrollThreshold && !contactVisible;

        // Toggle classe visible
        if (shouldShow) {
            if (!stickyCta.classList.contains('visible')) {
                stickyCta.classList.add('visible');
                stickyCta.setAttribute('aria-hidden', 'false');
            }
        } else {
            if (stickyCta.classList.contains('visible')) {
                stickyCta.classList.remove('visible');
                stickyCta.setAttribute('aria-hidden', 'true');
            }
        }
    }

    /**
     * Smooth scroll vers la section contact
     */
    function smoothScrollToContact(e) {
        if (!CONFIG.smoothScroll) return;

        e.preventDefault();

        if (contactSection) {
            // Calculer la position avec offset pour le header fixe
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = contactSection.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Focus sur le premier champ du formulaire pour accessibilité
            setTimeout(() => {
                const firstInput = contactSection.querySelector('input, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 500);
        }
    }

    /**
     * Track analytics event (si GA4 ou autre configuré)
     */
    function trackCtaClick() {
        // Google Analytics 4
        if (typeof gtag === 'function') {
            gtag('event', 'click_sticky_cta', {
                'event_category': 'engagement',
                'event_label': 'Sticky CTA - Devis Gratuit',
                'value': 1
            });
        }

        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'sticky_cta_click',
                'cta_type': 'floating',
                'cta_text': 'Devis Gratuit'
            });
        }

        // Console log pour debug
        console.log('Sticky CTA clicked');
    }

    /**
     * Initialisation
     */
    function init() {
        // État initial
        stickyCta.setAttribute('aria-hidden', 'true');

        // Event listeners avec debounce pour performance
        const debouncedHandler = debounce(handleStickyCtaVisibility, CONFIG.debounceDelay);

        window.addEventListener('scroll', debouncedHandler, { passive: true });
        window.addEventListener('resize', debouncedHandler, { passive: true });

        // Click handler
        stickyCta.addEventListener('click', (e) => {
            smoothScrollToContact(e);
            trackCtaClick();
        });

        // Check initial state
        handleStickyCtaVisibility();

        // Intersection Observer pour contact section (plus performant)
        if ('IntersectionObserver' in window && CONFIG.hideOnContactSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stickyCta.classList.remove('visible');
                        stickyCta.setAttribute('aria-hidden', 'true');
                    } else {
                        handleStickyCtaVisibility();
                    }
                });
            }, {
                threshold: 0.2 // 20% de la section visible
            });

            if (contactSection) {
                observer.observe(contactSection);
            }
        }

        console.log('✅ Sticky CTA initialized');
    }

    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose pour debugging (environnement dev)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.stickyCtaDebug = {
            show: () => stickyCta.classList.add('visible'),
            hide: () => stickyCta.classList.remove('visible'),
            config: CONFIG
        };
    }

})();
