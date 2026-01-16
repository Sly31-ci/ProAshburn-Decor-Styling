/**
 * Preloader Manager - Elegant Loading Experience
 */

class PreloaderManager {
    constructor() {
        this.preloader = null;
        this.progressBar = null;
        this.minDisplayTime = 2000; // 2 seconds minimum
        this.startTime = Date.now();
        this.init();
    }

    init() {
        // Create preloader if it doesn't exist
        if (!document.getElementById('preloader')) {
            this.createPreloader();
        } else {
            this.preloader = document.getElementById('preloader');
            this.progressBar = this.preloader.querySelector('.progress-bar');
        }

        // Handle page load
        if (document.readyState === 'complete') {
            this.handleLoad();
        } else {
            window.addEventListener('load', () => this.handleLoad());
        }
    }

    createPreloader() {
        this.preloader = document.createElement('div');
        this.preloader.id = 'preloader';
        this.preloader.className = 'preloader';
        this.preloader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-logo">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Elegant Logo Symbol -->
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M50 20 L60 40 L50 35 L40 40 Z" fill="currentColor"/>
            <circle cx="50" cy="50" r="15" fill="currentColor"/>
            <path d="M35 70 L50 65 L65 70 L50 75 Z" fill="currentColor" opacity="0.7"/>
          </svg>
        </div>
        <div class="preloader-text">Pro Ashburn Décor & Styling</div>
        <div class="preloader-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;

        document.body.prepend(this.preloader);
        this.progressBar = this.preloader.querySelector('.progress-bar');
    }

    handleLoad() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);

        // Ensure minimum display time for smooth experience
        setTimeout(() => {
            this.hide();
        }, remainingTime);
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('loaded');

            // Remove from DOM after transition
            setTimeout(() => {
                if (this.preloader && this.preloader.parentNode) {
                    this.preloader.remove();
                }
            }, 800);
        }
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PreloaderManager();
    });
} else {
    new PreloaderManager();
}
