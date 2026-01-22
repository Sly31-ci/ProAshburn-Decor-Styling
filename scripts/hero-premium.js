/**
 * HERO SECTION V2.1 - PREMIUM INTERACTIONS
 * Effets interactifs avancés pour la HERO section
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        magneticStrength: 0.3,      // Force de l'effet magnétique (0-1)
        parallaxStrength: 0.02,     // Force du parallax (0-1)
        counterDuration: 2000,      // Durée animation compteur (ms)
        enableParticles: true,      // Activer particules
        enableMagnetic: true,       // Activer effet magnétique
        enableCounter: true         // Activer compteurs animés
    };

    /**
     * EFFET MAGNÉTIQUE SUR LES CTAs
     * Les boutons suivent légèrement le curseur
     */
    function initMagneticEffect() {
        if (!CONFIG.enableMagnetic) return;

        const magneticElements = document.querySelectorAll('.btn-hero');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = x * CONFIG.magneticStrength;
                const moveY = y * CONFIG.magneticStrength;

                el.style.setProperty('--mouse-x', `${moveX}px`);
                el.style.setProperty('--mouse-y', `${moveY}px`);
                el.classList.add('magnetic-active');
            });

            el.addEventListener('mouseleave', () => {
                el.style.setProperty('--mouse-x', '0px');
                el.style.setProperty('--mouse-y', '0px');
                el.classList.remove('magnetic-active');
            });
        });

        console.log('✨ Magnetic effect initialized');
    }

    /**
     * PARALLAX AMÉLIORÉ
     * Effet de profondeur sur le background
     */
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');

        if (!hero || !heroBackground) return;

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            const moveX = x * CONFIG.parallaxStrength * 100;
            const moveY = y * CONFIG.parallaxStrength * 100;

            heroBackground.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });

        // Parallax au scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
        });

        console.log('✨ Parallax effect initialized');
    }

    /**
     * COMPTEURS ANIMÉS
     * Animation des chiffres dans les badges de réassurance
     */
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Formater le nombre
            const formatted = Math.floor(current);
            element.textContent = formatted >= 100 ? formatted : `${formatted}`;
        }, 16);
    }

    function initCounters() {
        if (!CONFIG.enableCounter) return;

        const counters = [
            { selector: '.trust-badge:nth-child(1) strong', value: 500, prefix: '+' },
            { selector: '.trust-badge:nth-child(2) strong', value: 98, suffix: '%' }
        ];

        // Observer pour démarrer l'animation quand visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const element = document.querySelector(counter.selector);
                        if (element && !element.dataset.animated) {
                            element.dataset.animated = 'true';
                            const originalText = element.textContent;

                            // Extraire le nombre
                            const match = originalText.match(/\d+/);
                            if (match) {
                                const targetValue = parseInt(match[0]);
                                element.textContent = '0';

                                setTimeout(() => {
                                    animateCounter(element, targetValue, CONFIG.counterDuration);

                                    // Ajouter le préfixe/suffixe après l'animation
                                    setTimeout(() => {
                                        if (counter.prefix) {
                                            element.textContent = counter.prefix + element.textContent;
                                        }
                                        if (counter.suffix) {
                                            element.textContent = element.textContent + counter.suffix;
                                        }
                                    }, CONFIG.counterDuration);
                                }, 200);
                            }
                        }
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const trustBadges = document.querySelector('.hero-trust-badges');
        if (trustBadges) {
            observer.observe(trustBadges);
            console.log('✨ Counter animations initialized');
        }
    }

    /**
     * EFFET DE TYPING (optionnel)
     * Animation de machine à écrire sur le titre
     */
    function initTypingEffect() {
        const title = document.querySelector('.hero-title');
        if (!title || title.classList.contains('typing-initialized')) return;

        // Désactivé par défaut - décommenter pour activer
        // title.classList.add('typing-effect', 'typing-initialized');
        // console.log('✨ Typing effect initialized');
    }

    /**
     * AMÉLIORATION DES ANIMATIONS D'ENTRÉE
     * Ajoute la classe premium-entrance pour des animations plus fluides
     */
    function enhanceEntranceAnimations() {
        const elements = [
            '.hero-badge-top',
            '.hero-title',
            '.hero-subtitle',
            '.hero-cta',
            '.hero-trust-badges'
        ];

        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('premium-entrance');
            }
        });

        console.log('✨ Premium entrance animations applied');
    }

    /**
     * EFFET DE GLOW INTERACTIF
     * Le gradient du titre réagit au mouvement de la souris
     */
    function initInteractiveGlow() {
        const gradientText = document.querySelector('.hero-title .gradient-text');
        if (!gradientText) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            gradientText.style.background = `
                linear-gradient(
                    ${135 + (x - 50) * 0.5}deg,
                    #C9A55A 0%,
                    #D4AF37 ${50 + (y - 50) * 0.3}%,
                    #E8C968 100%
                )
            `;
            gradientText.style.webkitBackgroundClip = 'text';
            gradientText.style.backgroundClip = 'text';
        });

        console.log('✨ Interactive glow initialized');
    }

    /**
     * OPTIMISATION PERFORMANCE
     * Utilise requestAnimationFrame pour les animations fluides
     */
    function optimizeAnimations() {
        // Désactiver les animations lourdes sur mobile
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-optimized');
            CONFIG.enableParticles = false;
            CONFIG.parallaxStrength = 0.01;
            console.log('📱 Mobile optimizations applied');
        }

        // Désactiver animations si prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            CONFIG.enableMagnetic = false;
            CONFIG.enableCounter = false;
            console.log('♿ Reduced motion mode active');
        }
    }

    /**
     * ANALYTICS - Tracking des interactions
     */
    function trackHeroInteractions() {
        // Track CTA clicks
        document.querySelectorAll('.btn-hero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ctaText = btn.textContent.trim();
                const ctaType = btn.classList.contains('btn-primary') ? 'primary' : 'secondary';

                // Google Analytics 4
                if (typeof gtag === 'function') {
                    gtag('event', 'hero_cta_click', {
                        'cta_text': ctaText,
                        'cta_type': ctaType,
                        'event_category': 'engagement'
                    });
                }

                console.log('📊 CTA clicked:', ctaText, ctaType);
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = Math.floor(scrollPercent / 25) * 25; // Par tranches de 25%

                if (typeof gtag === 'function' && maxScroll > 0) {
                    gtag('event', 'scroll_depth', {
                        'scroll_percent': maxScroll,
                        'event_category': 'engagement'
                    });
                }
            }
        });

        console.log('📊 Analytics tracking initialized');
    }

    /**
     * INITIALISATION
     */
    function init() {
        console.log('🚀 Initializing HERO Premium Effects...');

        // Optimisations
        optimizeAnimations();

        // Effets visuels
        enhanceEntranceAnimations();
        initMagneticEffect();
        initParallaxEffect();
        initCounters();
        initInteractiveGlow();
        initTypingEffect();

        // Analytics
        trackHeroInteractions();

        console.log('✅ HERO Premium Effects initialized successfully');
    }

    // Lancer quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exposer pour debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.heroPremiumDebug = {
            config: CONFIG,
            reinit: init,
            toggleMagnetic: () => {
                CONFIG.enableMagnetic = !CONFIG.enableMagnetic;
                console.log('Magnetic effect:', CONFIG.enableMagnetic ? 'ON' : 'OFF');
            },
            toggleCounters: () => {
                CONFIG.enableCounter = !CONFIG.enableCounter;
                console.log('Counter animations:', CONFIG.enableCounter ? 'ON' : 'OFF');
            }
        };
        console.log('🔧 Debug mode active. Use window.heroPremiumDebug');
    }

})();
