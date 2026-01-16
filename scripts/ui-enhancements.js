/**
 * UI Enhancements - Premium UX Improvements
 * Includes: Number counters, Toast notifications, Dots sync
 */

class UIEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.initNumberCounters();
        this.initTestimonialsDots();
        this.initScrollIndicator();
        this.initToastSystem();
    }

    // ============================================
    // NUMBER COUNTERS ANIMATION
    // ============================================

    initNumberCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            const suffix = element.textContent.includes('%') ? '%' : '+';

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }, 16);
        };

        // Observer pour démarrer le compteur au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================
    // TESTIMONIALS DOTS SYNCHRONIZATION
    // ============================================

    initTestimonialsDots() {
        const dots = document.querySelectorAll('.testimonial-dot');
        if (!dots.length) return;

        // Sync dots with slider
        const updateDots = (index) => {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Click handler for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Trigger slider change (assumes TestimonialsSlider exists)
                if (window.testimonialsSlider) {
                    window.testimonialsSlider.currentIndex = index;
                    window.testimonialsSlider.updateSlider();
                }
                updateDots(index);
            });
        });

        // Listen for slider changes
        document.addEventListener('testimonialChanged', (e) => {
            updateDots(e.detail.index);
        });
    }

    // ============================================
    // SCROLL INDICATOR CLICK HANDLER
    // ============================================

    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#a-propos');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================

    initToastSystem() {
        // Create toast container if doesn't exist
        if (!document.getElementById('toastContainer')) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            document.body.appendChild(container);
        }

        // Expose global toast function
        window.showToast = (message, type = 'success', duration = 3000) => {
            const toast = this.createToast(message, type);
            document.body.appendChild(toast);

            // Show toast
            setTimeout(() => toast.classList.add('show'), 100);

            // Auto hide
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, duration);
        };
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast';

        const icons = {
            success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" fill="none"/>',
            error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" fill="none"/>',
            info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" fill="none"/>'
        };

        toast.innerHTML = `
      <svg class="toast-icon ${type}" width="24" height="24" viewBox="0 0 24 24">
        ${icons[type] || icons.info}
      </svg>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M6 6l8 8m0-8l-8 8" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    `;

        return toast;
    }
}

// ============================================
// TESTIMONIALS SLIDER ENHANCEMENT
// ============================================

// Hook into existing TestimonialsSlider to emit events
if (typeof TestimonialsSlider !== 'undefined') {
    const originalUpdateSlider = TestimonialsSlider.prototype.updateSlider;

    TestimonialsSlider.prototype.updateSlider = function () {
        originalUpdateSlider.call(this);

        // Emit custom event for dots sync
        const event = new CustomEvent('testimonialChanged', {
            detail: { index: this.currentIndex }
        });
        document.dispatchEvent(event);
    };
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiEnhancements = new UIEnhancements();
    });
} else {
    window.uiEnhancements = new UIEnhancements();
}
