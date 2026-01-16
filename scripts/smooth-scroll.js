/**
 * Smooth Scroll Manager - Ultra-Fluid Scrolling Experience
 */

class SmoothScrollManager {
    constructor() {
        this.scrollSpeed = 0.08; // Lower = smoother but slower
        this.currentScroll = 0;
        this.targetScroll = 0;
        this.isScrolling = false;

        // Check if user prefers reduced motion
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!this.prefersReducedMotion && !this.isMobile()) {
            this.init();
        }
    }

    isMobile() {
        return window.innerWidth < 768 || 'ontouchstart' in window;
    }

    init() {
        // Set up smooth scroll container
        document.body.style.height = document.documentElement.scrollHeight + 'px';
        document.documentElement.style.overflow = 'hidden';

        // Create smooth scroll wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'smooth-scroll-wrapper';
        this.wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      will-change: transform;
    `;

        // Move all body content into wrapper
        while (document.body.firstChild) {
            this.wrapper.appendChild(document.body.firstChild);
        }
        document.body.appendChild(this.wrapper);

        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        // Update target scroll on user scroll
        window.addEventListener('scroll', () => {
            this.targetScroll = window.pageYOffset;
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto' // We handle smooth ourselves
                    });
                }
            });
        });

        // Update on resize
        window.addEventListener('resize', () => {
            document.body.style.height = document.documentElement.scrollHeight + 'px';
        });
    }

    animate() {
        // Smooth scroll easing
        this.currentScroll += (this.targetScroll - this.currentScroll) * this.scrollSpeed;

        // Round to avoid sub-pixel rendering
        const roundedScroll = Math.round(this.currentScroll * 100) / 100;

        // Apply transform
        this.wrapper.style.transform = `translate3d(0, -${roundedScroll}px, 0)`;

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    // Method to scroll to position programmatically
    scrollTo(position, duration = 1000) {
        const start = this.targetScroll;
        const distance = position - start;
        const startTime = performance.now();

        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);

            window.scrollTo(0, start + (distance * eased));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    }
}

// Initialize after DOM is ready
// TEMPORARILY DISABLED - causing scroll blocking issue
// Uncomment below to re-enable smooth scroll
/*
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.smoothScroll = new SmoothScrollManager();
  });
} else {
  window.smoothScroll = new SmoothScrollManager();
}
*/

// Smooth scroll for anchor links only (native browser smooth scroll)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
