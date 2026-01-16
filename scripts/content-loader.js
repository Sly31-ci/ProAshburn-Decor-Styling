/**
 * CONTENT LOADER - Dynamic Site Content Manager
 * Loads content from CMS and injects into HTML
 */

class ContentLoader {
    constructor() {
        this.content = {};
        this.defaultContent = this.getDefaultContent();
    }

    async init() {
        await this.loadContent();
        this.injectColors();
        this.injectTypography();
        this.injectNavigation();
        this.injectSEO();
        this.injectBranding();
        console.log('✅ Content loaded successfully');
    }

    // ============================================
    // LOAD CONTENT
    // ============================================

    async loadContent() {
        // Try to load from localStorage (CMS)
        const stored = localStorage.getItem('cms_content');

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                this.content = { ...this.defaultContent, ...parsed };
            } catch (e) {
                console.error('Error parsing stored content:', e);
                this.content = this.defaultContent;
            }
        } else {
            this.content = this.defaultContent;
        }
    }

    getDefaultContent() {
        return {
            branding: {
                logoType: 'text',
                logoText: 'Pro Ashburn',
                logoSubtitle: 'Décor & Styling',
                logoImage: null,
                favicon: '/assets/images/favicon.svg'
            },

            colors: {
                primary: '#0A0A0A',
                secondary: '#C9A55A',
                secondaryLight: '#D4B76A',
                secondaryDark: '#A67C00',
                accentEmerald: '#50C878',
                accentBronze: '#CD7F32',
                accentRoseGold: '#B76E79',
                lightGray: '#F5F5F5',
                mediumGray: '#999999',
                darkGray: '#333333'
            },

            typography: {
                displayFont: 'Cormorant Garamond',
                primaryFont: 'Montserrat',
                fontSizes: {
                    hero: '6rem',
                    display: '4.5rem',
                    h1: '3.5rem',
                    h2: '2.5rem',
                    h3: '1.75rem',
                    lg: '1.25rem',
                    base: '1rem',
                    sm: '0.875rem',
                    xs: '0.75rem'
                }
            },

            navigation: {
                items: [
                    { id: 1, label: 'Accueil', link: '#accueil', order: 1, enabled: true, isCTA: false },
                    { id: 2, label: 'À Propos', link: '#a-propos', order: 2, enabled: true, isCTA: false },
                    { id: 3, label: 'Services', link: '#services', order: 3, enabled: true, isCTA: false },
                    { id: 4, label: 'Réalisations', link: '#realisations', order: 4, enabled: true, isCTA: false },
                    { id: 5, label: 'Témoignages', link: '#temoignages', order: 5, enabled: true, isCTA: false },
                    { id: 6, label: 'Contact', link: '#contact', order: 6, enabled: true, isCTA: true }
                ]
            },

            seo: {
                title: 'Pro Ashburn Décor & Styling - Décoration Intérieure, Extérieure & Événementielle',
                description: 'Spécialistes en décoration d\'intérieur, d\'extérieur et décoration à thème pour vos événements. Transformez vos espaces avec élégance et professionnalisme.',
                keywords: 'décoration intérieure, décoration extérieure, décoration événementielle, décoration mariage, décoration anniversaire, styling professionnel',
                author: 'Pro Ashburn Décor & Styling',
                ogTitle: 'Pro Ashburn Décor & Styling - Experts en Décoration',
                ogDescription: 'Transformez vos espaces avec nos services de décoration professionnelle.',
                ogImage: '/assets/images/og-image.jpg',
                twitterCard: 'summary_large_image'
            }
        };
    }

    // ============================================
    // INJECT COLORS
    // ============================================

    injectColors() {
        const colors = this.content.colors || this.defaultContent.colors;
        const root = document.documentElement;

        // Inject CSS variables
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-secondary-light', colors.secondaryLight);
        root.style.setProperty('--color-secondary-dark', colors.secondaryDark);
        root.style.setProperty('--color-accent-emerald', colors.accentEmerald);
        root.style.setProperty('--color-accent-bronze', colors.accentBronze);
        root.style.setProperty('--color-accent-rose-gold', colors.accentRoseGold);
        root.style.setProperty('--color-light-gray', colors.lightGray);
        root.style.setProperty('--color-medium-gray', colors.mediumGray);
        root.style.setProperty('--color-dark-gray', colors.darkGray);

        console.log('✅ Colors injected');
    }

    // ============================================
    // INJECT TYPOGRAPHY
    // ============================================

    injectTypography() {
        const typo = this.content.typography || this.defaultContent.typography;
        const root = document.documentElement;

        // Load Google Fonts dynamically
        const existingLink = document.querySelector('link[data-fonts="dynamic"]');
        if (existingLink) {
            existingLink.remove();
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.dataset.fonts = 'dynamic';
        link.href = `https://fonts.googleapis.com/css2?family=${typo.displayFont.replace(' ', '+')}:wght@300;400;500;600;700&family=${typo.primaryFont.replace(' ', '+')}:wght@300;400;500;600;700;800&display=swap`;
        document.head.appendChild(link);

        // Inject font variables
        root.style.setProperty('--font-display', `"${typo.displayFont}", serif`);
        root.style.setProperty('--font-primary', `"${typo.primaryFont}", sans-serif`);

        // Inject font sizes
        if (typo.fontSizes) {
            Object.entries(typo.fontSizes).forEach(([key, value]) => {
                root.style.setProperty(`--font-size-${key}`, value);
            });
        }

        console.log('✅ Typography injected');
    }

    // ============================================
    // INJECT NAVIGATION
    // ============================================

    injectNavigation() {
        const nav = this.content.navigation || this.defaultContent.navigation;
        const navMenu = document.getElementById('navMenu');

        if (!navMenu) return;

        // Clear existing
        navMenu.innerHTML = '';

        // Sort by order and filter enabled
        const items = nav.items
            .filter(item => item.enabled !== false)
            .sort((a, b) => a.order - b.order);

        // Generate menu items
        items.forEach((item, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = item.link;
            a.className = item.isCTA ? 'nav-link cta-nav' : 'nav-link';
            if (index === 0) a.classList.add('active');
            a.textContent = item.label;

            li.appendChild(a);
            navMenu.appendChild(li);
        });

        console.log('✅ Navigation injected');
    }

    // ============================================
    // INJECT SEO
    // ============================================

    injectSEO() {
        const seo = this.content.seo || this.defaultContent.seo;

        // Title
        document.title = seo.title;

        // Meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = seo.description;

        // Meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = seo.keywords;

        // Meta author
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (!metaAuthor) {
            metaAuthor = document.createElement('meta');
            metaAuthor.name = 'author';
            document.head.appendChild(metaAuthor);
        }
        metaAuthor.content = seo.author;

        // Open Graph
        this.setMetaProperty('og:title', seo.ogTitle);
        this.setMetaProperty('og:description', seo.ogDescription);
        this.setMetaProperty('og:image', seo.ogImage);

        // Twitter
        this.setMetaProperty('twitter:card', seo.twitterCard);
        this.setMetaProperty('twitter:title', seo.ogTitle);
        this.setMetaProperty('twitter:description', seo.ogDescription);
        this.setMetaProperty('twitter:image', seo.ogImage);

        console.log('✅ SEO meta tags injected');
    }

    setMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    // ============================================
    // INJECT BRANDING
    // ============================================

    injectBranding() {
        const branding = this.content.branding || this.defaultContent.branding;
        const logoElement = document.querySelector('.logo');

        if (!logoElement) return;

        if (branding.logoType === 'image' && branding.logoImage) {
            // Image logo
            logoElement.innerHTML = `<img src="${branding.logoImage}" alt="${branding.logoText}" class="logo-image">`;
        } else {
            // Text logo (default)
            logoElement.innerHTML = `
        <span class="logo-text">${branding.logoText}</span>
        <span class="logo-subtitle">${branding.logoSubtitle}</span>
      `;
        }

        // Update favicon if provided
        if (branding.favicon) {
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = branding.favicon;
        }

        console.log('✅ Branding injected');
    }

    // ============================================
    // UTILITY: RELOAD CONTENT
    // ============================================

    async reload() {
        await this.init();
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contentLoader = new ContentLoader();
        window.contentLoader.init();
    });
} else {
    window.contentLoader = new ContentLoader();
    window.contentLoader.init();
}
