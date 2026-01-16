/**
 * Pro Ashburn Décor & Styling - Main JavaScript
 * Interactive Features & Functionality
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
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
 * Throttle function to limit function execution rate
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= offset
    );
}

// ============================================
// NAVIGATION
// ============================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll effect on navbar
        this.handleScroll();
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));

        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.closeMenuOutside(e));

        // Update active link on scroll
        window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 100));
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        const isExpanded = this.navMenu.classList.contains('active');
        this.menuToggle.setAttribute('aria-expanded', isExpanded);
    }

    closeMenuOutside(e) {
        if (!this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
            this.navMenu.classList.remove('active');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = this.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                this.navMenu.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = this.navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-on-scroll');
        this.init();
    }

    init() {
        this.revealElements();
        window.addEventListener('scroll', throttle(() => this.revealElements(), 100));
    }

    revealElements() {
        this.elements.forEach(element => {
            if (isInViewport(element, 100)) {
                element.classList.add('revealed');
            }
        });
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = new Set();
        this.init();
    }

    init() {
        this.checkCounters();
        window.addEventListener('scroll', throttle(() => this.checkCounters(), 200));
    }

    checkCounters() {
        this.counters.forEach(counter => {
            if (isInViewport(counter, 100) && !this.animated.has(counter)) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }
}

// ============================================
// PORTFOLIO FILTER
// ============================================

class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        // Load portfolio items
        this.loadPortfolioItems();

        // Add click handlers to filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.filterPortfolio(e));
        });
    }

    loadPortfolioItems() {
        // Portfolio data
        const portfolioItems = [
            {
                id: 1,
                title: 'Salon Moderne Minimaliste',
                category: 'interieur',
                image: 'assets/images/portfolio/interior-1.jpg',
                description: 'Design épuré et élégant pour un salon contemporain'
            },
            {
                id: 2,
                title: 'Chambre Cocooning',
                category: 'interieur',
                image: 'assets/images/portfolio/interior-2.jpg',
                description: 'Ambiance chaleureuse et apaisante'
            },
            {
                id: 3,
                title: 'Terrasse Zen',
                category: 'exterieur',
                image: 'assets/images/portfolio/exterior-1.jpg',
                description: 'Espace extérieur relaxant et harmonieux'
            },
            {
                id: 4,
                title: 'Jardin Paysager',
                category: 'exterieur',
                image: 'assets/images/portfolio/exterior-2.jpg',
                description: 'Aménagement paysager sophistiqué'
            },
            {
                id: 5,
                title: 'Mariage Champêtre',
                category: 'evenement',
                image: 'assets/images/portfolio/event-1.jpg',
                description: 'Décoration romantique et naturelle'
            },
            {
                id: 6,
                title: 'Anniversaire Glamour',
                category: 'evenement',
                image: 'assets/images/portfolio/event-2.jpg',
                description: 'Fête élégante et festive'
            },
            {
                id: 7,
                title: 'Cuisine Contemporaine',
                category: 'interieur',
                image: 'assets/images/portfolio/interior-3.jpg',
                description: 'Design fonctionnel et esthétique'
            },
            {
                id: 8,
                title: 'Patio Méditerranéen',
                category: 'exterieur',
                image: 'assets/images/portfolio/exterior-3.jpg',
                description: 'Ambiance vacances au quotidien'
            },
            {
                id: 9,
                title: 'Réception Corporate',
                category: 'evenement',
                image: 'assets/images/portfolio/event-3.jpg',
                description: 'Événement professionnel haut de gamme'
            }
        ];

        this.renderPortfolio(portfolioItems);
    }

    renderPortfolio(items) {
        this.portfolioGrid.innerHTML = items.map(item => `
      <article class="portfolio-item reveal-on-scroll" data-category="${item.category}">
        <div class="portfolio-image hover-zoom">
          <img src="${item.image}" alt="${item.title}" loading="lazy" 
               onerror="this.src='/assets/images/placeholder.jpg'">
          <div class="portfolio-overlay">
            <div class="portfolio-info">
              <h3 class="portfolio-title">${item.title}</h3>
              <p class="portfolio-description">${item.description}</p>
            </div>
          </div>
        </div>
      </article>
    `).join('');

        // Re-initialize scroll reveal for new items
        new ScrollReveal();
    }

    filterPortfolio(e) {
        const filter = e.target.getAttribute('data-filter');
        this.currentFilter = filter;

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter items
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================

class TestimonialsSlider {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.prevBtn = document.getElementById('prevTestimonial');
        this.nextBtn = document.getElementById('nextTestimonial');
        this.currentIndex = 0;
        this.cards = document.querySelectorAll('.testimonial-card');

        if (this.track && this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        // Button click handlers
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Auto-play
        this.startAutoPlay();

        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        this.addSwipeSupport();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateSlider();
    }

    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    addSwipeSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            isDragging = false;
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        if (isRequired && !value) {
            this.showError(field, 'Ce champ est requis');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Email invalide');
                return false;
            }
        }

        this.clearError(field);
        return true;
    }

    showError(field, message) {
        this.clearError(field);

        field.style.borderColor = '#ef4444';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;

        field.parentElement.appendChild(errorDiv);
    }

    clearError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentElement.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('.form-input');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <div class="loading-spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>
    `;

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateSubmit(data);

            // Show success message
            this.showNotification('Merci ! Votre message a été envoyé avec succès.', 'success');
            this.form.reset();

        } catch (error) {
            this.showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    simulateSubmit(data) {
        return new Promise((resolve) => {
            console.log('Form data:', data);
            setTimeout(resolve, 1500);
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} notification-enter`;
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#2C5F2D' : '#ef4444'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      max-width: 400px;
    `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('notification-enter');
            notification.classList.add('notification-exit');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[class*="parallax-"]');

        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        this.elements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 :
                element.classList.contains('parallax-medium') ? 0.3 :
                    element.classList.contains('parallax-fast') ? 0.1 : 0.2;

            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Trigger load
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollReveal();
    new CounterAnimation();
    new PortfolioFilter();
    new TestimonialsSlider();
    new ContactForm();
    new ParallaxEffect();
    new LazyLoader();

    console.log('✨ Pro Ashburn Décor & Styling - Site initialized successfully!');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

window.addEventListener('load', () => {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});
