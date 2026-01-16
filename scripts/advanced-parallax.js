/**
 * Advanced Parallax Manager - Multi-Layer Parallax Effects
 */

class AdvancedParallax {
    constructor() {
        this.layers = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        // Check if user prefers reduced motion
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!this.prefersReducedMotion) {
            this.init();
        }
    }

    init() {
        this.findLayers();
        if (this.layers.length > 0) {
            this.bindEvents();
            this.animate();
        }
    }

    findLayers() {
        // Find all elements with parallax data attributes
        const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
            const direction = element.getAttribute('data-parallax-direction') || 'vertical';
            const mouseEffect = element.hasAttribute('data-mouse-parallax');
            const mouseDepth = parseFloat(element.getAttribute('data-mouse-parallax')) || 1;

            this.layers.push({
                element,
                speed,
                direction,
                mouseEffect,
                mouseDepth,
                baseY: 0,
                baseX: 0
            });
        });
    }

    bindEvents() {
        // Scroll parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScrollParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mouse parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            hero.addEventListener('mouseleave', () => {
                this.mouseX = this.windowWidth / 2;
                this.mouseY = this.windowHeight / 2;
            });
        }

        // Update dimensions on resize
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        });
    }

    updateScrollParallax() {
        const scrolled = window.pageYOffset;

        this.layers.forEach(layer => {
            if (!layer.mouseEffect) {
                const { element, speed, direction } = layer;

                // Calculate parallax offset
                let yPos = 0;
                let xPos = 0;

                if (direction === 'vertical' || direction === 'up') {
                    yPos = -(scrolled * speed);
                } else if (direction === 'down') {
                    yPos = (scrolled * speed);
                } else if (direction === 'horizontal') {
                    xPos = (scrolled * speed);
                }

                element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }
        });
    }

    animate() {
        // Mouse parallax animation
        this.layers.forEach(layer => {
            if (layer.mouseEffect) {
                const { element, mouseDepth } = layer;

                // Calculate offset from center
                const moveX = (this.mouseX - this.windowWidth / 2) * mouseDepth * 0.02;
                const moveY = (this.mouseY - this.windowHeight / 2) * mouseDepth * 0.02;

                // Smooth transition to target
                const currentTransform = element.style.transform;
                const match = currentTransform.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/);

                let currentX = 0;
                let currentY = 0;

                if (match) {
                    currentX = parseFloat(match[1]);
                    currentY = parseFloat(match[2]);
                }

                // Ease to target
                const ease = 0.1;
                const newX = currentX + (moveX - currentX) * ease;
                const newY = currentY + (moveY - currentY) * ease;

                element.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AdvancedParallax();
    });
} else {
    new AdvancedParallax();
}
