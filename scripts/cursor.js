/**
 * Custom Luxury Cursor - Premium Interactive Experience
 */

class CustomCursor {
    constructor() {
        // Only initialize on desktop with fine pointer
        if (!this.isDesktop()) return;

        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;

        this.init();
    }

    isDesktop() {
        return window.matchMedia('(pointer: fine)').matches;
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursorDot.className = 'cursor-dot';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        // Set initial position
        this.cursor.style.left = '0px';
        this.cursor.style.top = '0px';
        this.cursorDot.style.left = '0px';
        this.cursorDot.style.top = '0px';

        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        // Mouse move with smooth following
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects on interactive elements
        const interactiveElements = 'a, button, input, textarea, select, .service-card, .portfolio-item, .testimonial-card, .filter-btn';

        document.querySelectorAll(interactiveElements).forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorDot.classList.add('hover');

                // Specific states for different elements
                if (el.tagName === 'A') {
                    this.cursor.classList.add('link');
                }
                if (el.tagName === 'BUTTON' || el.classList.contains('btn')) {
                    this.cursor.classList.add('button');
                }
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover', 'link', 'button');
                this.cursorDot.classList.remove('hover');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorDot.style.opacity = '1';
        });
    }

    animate() {
        // Smooth cursor following with easing
        const ease = 0.15;
        const dotEase = 0.3;

        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;

        this.dotX += (this.mouseX - this.dotX) * dotEase;
        this.dotY += (this.mouseY - this.dotY) * dotEase;

        // Update positions
        this.cursor.style.left = `${this.cursorX}px`;
        this.cursor.style.top = `${this.cursorY}px`;

        this.cursorDot.style.left = `${this.dotX}px`;
        this.cursorDot.style.top = `${this.dotY}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CustomCursor();
    });
} else {
    new CustomCursor();
}
