/**
 * Pro Ashburn Décor & Styling - Advanced TypeScript Features
 * Type-safe interactive components and utilities
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

interface PortfolioItem {
    id: number;
    title: string;
    category: 'interieur' | 'exterieur' | 'evenement';
    image: string;
    description: string;
    tags?: string[];
    date?: Date;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    text: string;
    service: string;
}

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
}

interface AnimationConfig {
    duration: number;
    easing: string;
    delay?: number;
}

interface ScrollRevealOptions {
    threshold: number;
    rootMargin: string;
    once: boolean;
}

// ============================================
// ADVANCED PORTFOLIO MANAGER
// ============================================

class PortfolioManager {
    private items: PortfolioItem[];
    private currentFilter: string;
    private gridElement: HTMLElement | null;

    constructor() {
        this.items = [];
        this.currentFilter = 'all';
        this.gridElement = document.getElementById('portfolioGrid');
        this.loadItems();
    }

    private loadItems(): void {
        // Load portfolio items from API or static data
        this.items = this.getPortfolioData();
        this.render();
    }

    private getPortfolioData(): PortfolioItem[] {
        return [
            {
                id: 1,
                title: 'Salon Moderne Minimaliste',
                category: 'interieur',
                image: '/assets/images/portfolio/interior-1.jpg',
                description: 'Design épuré et élégant pour un salon contemporain',
                tags: ['moderne', 'minimaliste', 'salon'],
                date: new Date('2024-01-15')
            },
            {
                id: 2,
                title: 'Chambre Cocooning',
                category: 'interieur',
                image: '/assets/images/portfolio/interior-2.jpg',
                description: 'Ambiance chaleureuse et apaisante',
                tags: ['cosy', 'chambre', 'relaxation'],
                date: new Date('2024-02-20')
            },
            {
                id: 3,
                title: 'Terrasse Zen',
                category: 'exterieur',
                image: '/assets/images/portfolio/exterior-1.jpg',
                description: 'Espace extérieur relaxant et harmonieux',
                tags: ['zen', 'terrasse', 'nature'],
                date: new Date('2024-03-10')
            },
            {
                id: 4,
                title: 'Jardin Paysager',
                category: 'exterieur',
                image: '/assets/images/portfolio/exterior-2.jpg',
                description: 'Aménagement paysager sophistiqué',
                tags: ['jardin', 'paysage', 'végétation'],
                date: new Date('2024-04-05')
            },
            {
                id: 5,
                title: 'Mariage Champêtre',
                category: 'evenement',
                image: '/assets/images/portfolio/event-1.jpg',
                description: 'Décoration romantique et naturelle',
                tags: ['mariage', 'champêtre', 'romantique'],
                date: new Date('2024-05-12')
            },
            {
                id: 6,
                title: 'Anniversaire Glamour',
                category: 'evenement',
                image: '/assets/images/portfolio/event-2.jpg',
                description: 'Fête élégante et festive',
                tags: ['anniversaire', 'glamour', 'fête'],
                date: new Date('2024-06-18')
            }
        ];
    }

    public filter(category: string): void {
        this.currentFilter = category;
        this.render();
    }

    private render(): void {
        if (!this.gridElement) return;

        const filteredItems = this.currentFilter === 'all'
            ? this.items
            : this.items.filter(item => item.category === this.currentFilter);

        this.gridElement.innerHTML = filteredItems.map(item => this.createItemHTML(item)).join('');
        this.addItemEventListeners();
    }

    private createItemHTML(item: PortfolioItem): string {
        return `
      <article class="portfolio-item reveal-on-scroll" data-id="${item.id}" data-category="${item.category}">
        <div class="portfolio-image hover-zoom">
          <img src="${item.image}" alt="${item.title}" loading="lazy" 
               onerror="this.src='/assets/images/placeholder.jpg'">
          <div class="portfolio-overlay">
            <div class="portfolio-info">
              <h3 class="portfolio-title">${item.title}</h3>
              <p class="portfolio-description">${item.description}</p>
              ${item.tags ? `
                <div class="portfolio-tags">
                  ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
    }

    private addItemEventListeners(): void {
        const items = this.gridElement?.querySelectorAll('.portfolio-item');
        items?.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id') || '0');
                this.openLightbox(id);
            });
        });
    }

    private openLightbox(id: number): void {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        // Create and show lightbox
        console.log('Opening lightbox for:', item.title);
        // Implementation would create a modal/lightbox
    }
}

// ============================================
// ADVANCED FORM VALIDATOR
// ============================================

class FormValidator {
    private form: HTMLFormElement;
    private rules: Map<string, ValidationRule[]>;

    constructor(formId: string) {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) {
            throw new Error(`Form with id "${formId}" not found`);
        }
        this.form = form;
        this.rules = new Map();
        this.setupDefaultRules();
    }

    private setupDefaultRules(): void {
        this.addRule('name', [
            { type: 'required', message: 'Le nom est requis' },
            { type: 'minLength', value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
        ]);

        this.addRule('email', [
            { type: 'required', message: 'L\'email est requis' },
            { type: 'email', message: 'Email invalide' }
        ]);

        this.addRule('message', [
            { type: 'required', message: 'Le message est requis' },
            { type: 'minLength', value: 10, message: 'Le message doit contenir au moins 10 caractères' }
        ]);
    }

    public addRule(fieldName: string, rules: ValidationRule[]): void {
        this.rules.set(fieldName, rules);
    }

    public validate(): ValidationResult {
        const errors: Record<string, string> = {};
        let isValid = true;

        this.rules.forEach((rules, fieldName) => {
            const field = this.form.elements.namedItem(fieldName) as HTMLInputElement;
            if (!field) return;

            for (const rule of rules) {
                const error = this.validateField(field, rule);
                if (error) {
                    errors[fieldName] = error;
                    isValid = false;
                    break;
                }
            }
        });

        return { isValid, errors };
    }

    private validateField(field: HTMLInputElement, rule: ValidationRule): string | null {
        const value = field.value.trim();

        switch (rule.type) {
            case 'required':
                return value ? null : rule.message;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? null : rule.message;

            case 'minLength':
                return value.length >= (rule.value || 0) ? null : rule.message;

            case 'maxLength':
                return value.length <= (rule.value || Infinity) ? null : rule.message;

            case 'pattern':
                const regex = new RegExp(rule.value as string);
                return regex.test(value) ? null : rule.message;

            default:
                return null;
        }
    }

    public showErrors(errors: Record<string, string>): void {
        Object.entries(errors).forEach(([fieldName, message]) => {
            const field = this.form.elements.namedItem(fieldName) as HTMLInputElement;
            if (field) {
                this.displayError(field, message);
            }
        });
    }

    private displayError(field: HTMLInputElement, message: string): void {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';

        field.style.borderColor = '#ef4444';
        field.parentElement?.appendChild(errorElement);
    }

    public clearErrors(): void {
        const errors = this.form.querySelectorAll('.form-error');
        errors.forEach(error => error.remove());

        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            (input as HTMLInputElement).style.borderColor = '';
        });
    }
}

interface ValidationRule {
    type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
    message: string;
    value?: number | string;
}

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

// ============================================
// SMOOTH SCROLL MANAGER
// ============================================

class SmoothScrollManager {
    private duration: number;
    private easing: (t: number) => number;

    constructor(duration: number = 800) {
        this.duration = duration;
        this.easing = this.easeInOutCubic;
    }

    private easeInOutCubic(t: number): number {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    public scrollTo(targetY: number): void {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        const scroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const eased = this.easing(progress);

            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    }

    public scrollToElement(element: HTMLElement, offset: number = 0): void {
        const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
        this.scrollTo(targetY);
    }
}

// ============================================
// PERFORMANCE MONITOR
// ============================================

class PerformanceMonitor {
    private metrics: PerformanceMetrics;

    constructor() {
        this.metrics = {
            loadTime: 0,
            domContentLoaded: 0,
            firstPaint: 0,
            firstContentfulPaint: 0
        };
        this.measure();
    }

    private measure(): void {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;

                this.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart;
                this.metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;

                // Get paint metrics
                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach(entry => {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = entry.startTime;
                    } else if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                    }
                });

                this.logMetrics();
            });
        }
    }

    private logMetrics(): void {
        console.group('📊 Performance Metrics');
        console.log(`⚡ Page Load Time: ${this.metrics.loadTime}ms`);
        console.log(`📄 DOM Content Loaded: ${this.metrics.domContentLoaded}ms`);
        console.log(`🎨 First Paint: ${this.metrics.firstPaint}ms`);
        console.log(`🖼️ First Contentful Paint: ${this.metrics.firstContentfulPaint}ms`);
        console.groupEnd();
    }

    public getMetrics(): PerformanceMetrics {
        return { ...this.metrics };
    }
}

interface PerformanceMetrics {
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
}

// ============================================
// ACCESSIBILITY MANAGER
// ============================================

class AccessibilityManager {
    private focusableElements: string;

    constructor() {
        this.focusableElements = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
        this.init();
    }

    private init(): void {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    private setupKeyboardNavigation(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            // Escape key closes modals/menus
            if (e.key === 'Escape') {
                this.closeAllModals();
            }

            // Tab key for focus management
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    private setupFocusManagement(): void {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
      *:focus-visible {
        outline: 2px solid #D4AF37;
        outline-offset: 2px;
      }
    `;
        document.head.appendChild(style);
    }

    private setupAriaLabels(): void {
        // Ensure all interactive elements have proper labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const text = button.textContent?.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });
    }

    private closeAllModals(): void {
        const modals = document.querySelectorAll('.modal.active, .nav-menu.active');
        modals.forEach(modal => modal.classList.remove('active'));
    }

    private handleTabNavigation(e: KeyboardEvent): void {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            this.trapFocus(modal as HTMLElement, e);
        }
    }

    private trapFocus(container: HTMLElement, e: KeyboardEvent): void {
        const focusable = container.querySelectorAll(this.focusableElements);
        const firstFocusable = focusable[0] as HTMLElement;
        const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
}

// ============================================
// EXPORT & INITIALIZATION
// ============================================

// Initialize TypeScript components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTypeScriptComponents);
} else {
    initializeTypeScriptComponents();
}

function initializeTypeScriptComponents(): void {
    try {
        new PerformanceMonitor();
        new AccessibilityManager();
        new SmoothScrollManager();

        console.log('✅ TypeScript components initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing TypeScript components:', error);
    }
}

// Export for use in other modules
export {
    PortfolioManager,
    FormValidator,
    SmoothScrollManager,
    PerformanceMonitor,
    AccessibilityManager
};
