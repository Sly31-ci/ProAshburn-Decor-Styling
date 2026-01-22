/**
 * Exit-Intent Popup
 * Capture les visiteurs qui s'apprêtent à quitter le site
 * 
 * ⚠️ TEMPORAIREMENT DÉSACTIVÉ
 * Pour réactiver, décommenter le code ci-dessous
 */

/* POPUP EXIT-INTENT DÉSACTIVÉ - DÉBUT DU COMMENTAIRE

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        enabled: false, // DÉSACTIVÉ pour les tests HERO V2
        showDelay: 5000,              // Attendre 5s avant d'activer
        exitVelocity: 20,              // Vitesse de sortie minimum
        cookieDays: 7,                 // Ne pas redemander pendant 7 jours
        mobileEnabled: false           // Désactivé sur mobile (pas d'exit intent)
    };

    // État
    let popupShown = false;
    let exitIntentActive = false;

    /**
     * Vérifie si le popup a déjà été affiché (cookie)
     */
function hasSeenPopup() {
    return document.cookie.indexOf('exit_popup_shown=true') !== -1;
}

/**
 * Enregistre que le popup a été affiché
 */
function setPopupCookie() {
    const expires = new Date();
    expires.setDate(expires.getDate() + CONFIG.cookieDays);
    document.cookie = `exit_popup_shown=true; expires=${expires.toUTCString()}; path=/`;
}

/**
 * Crée le HTML du popup
 */
function createPopup() {
    const popupHTML = `
      <div class="exit-popup-overlay" id="exitPopupOverlay">
        <div class="exit-popup">
          <button class="exit-popup-close" id="exitPopupClose" aria-label="Fermer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6L18 18"/>
            </svg>
          </button>
          
          <div class="exit-popup-content">
            <div class="exit-popup-icon">
              🎁
            </div>
            <h3 class="exit-popup-title">Attendez !</h3>
            <p class="exit-popup-subtitle">Ne partez pas sans votre cadeau...</p>
            
            <div class="exit-popup-offer">
              <h4>Guide Gratuit</h4>
              <p>"10 Erreurs à Éviter en Décoration d'Intérieur"</p>
            </div>
            
            <form class="exit-popup-form" id="exitPopupForm">
              <input 
                type="email" 
                class="exit-popup-input" 
                placeholder="Votre email" 
                required 
                aria-label="Adresse email"
              >
              <button type="submit" class="exit-popup-submit">
                Télécharger Gratuitement
              </button>
            </form>
            
            <p class="exit-popup-footer">
              ✓ Sans spam • ✓ Désabonnement en 1 clic
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

/**
 * Affiche le popup
 */
function showPopup() {
    if (popupShown || hasSeenPopup()) return;

    const overlay = document.getElementById('exitPopupOverlay');
    if (!overlay) {
        createPopup();
    }

    const popup = document.getElementById('exitPopupOverlay');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
        popupShown = true;

        // Analytics
        trackEvent('exit_popup_shown');

        // Ajouter les event listeners
        attachPopupEventListeners();
    }
}

/**
 * Ferme le popup
 */
function closePopup() {
    const popup = document.getElementById('exitPopupOverlay');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restaurer le scroll
        setPopupCookie();

        // Analytics
        trackEvent('exit_popup_closed');
    }
}

/**
 * Gère la soumission du formulaire
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    // Ici, vous pouvez envoyer l'email à votre service d'emailing
    console.log('Email captured:', email);

    // Analytics
    trackEvent('exit_popup_email_submitted', email);

    // Afficher message de succès
    const popup = document.querySelector('.exit-popup-content');
    if (popup) {
        popup.innerHTML = `
        <div class="exit-popup-success">
          <div class="success-icon">✓</div>
          <h3>Merci !</h3>
          <p>Votre guide vous a été envoyé par email.</p>
          <p class="success-subtitle">À très bientôt !</p>
        </div>
      `;
    }

    // Fermer après 2 secondes
    setTimeout(closePopup, 2000);
    setPopupCookie();
}

/**
 * Attache les event listeners au popup
 */
function attachPopupEventListeners() {
    // Bouton fermer
    const closeBtn = document.getElementById('exitPopupClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Click sur overlay
    const overlay = document.getElementById('exitPopupOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });
    }

    // Formulaire
    const form = document.getElementById('exitPopupForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupShown) {
            closePopup();
        }
    });
}

/**
 * Détecte l'intention de sortie (mouse leave vers le haut)
 */
function handleMouseLeave(e) {
    // Vérifier si la souris sort vers le haut (barre d'adresse/tabs)
    if (e.clientY <= 0 && e.relatedTarget === null) {
        if (exitIntentActive && !popupShown) {
            showPopup();
        }
    }
}

/**
 * Track analytics events
 */
function trackEvent(eventName, value = null) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
        gtag('event', eventName, {
            'event_category': 'exit_intent',
            'value': value
        });
    }

    // Google Tag Manager
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': eventName,
            'eventCategory': 'exit_intent',
            'eventValue': value
        });
    }

    console.log('Exit Intent Event:', eventName, value);
}

/**
 * Vérifie si l'appareil est mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
}

/**
 * Initialisation
 */
function init() {
    // Ne pas activer si désactivé ou déjà vu
    if (!CONFIG.enabled || hasSeenPopup()) {
        console.log('Exit Intent Popup: Disabled or already shown');
        return;
    }

    // Ne pas activer sur mobile si désactivé
    if (!CONFIG.mobileEnabled && isMobileDevice()) {
        console.log('Exit Intent Popup: Disabled on mobile');
        return;
    }

    // Activer après le délai
    setTimeout(() => {
        exitIntentActive = true;
        console.log('✅ Exit Intent Popup: Activated');

        // Ajouter l'event listener
        document.addEventListener('mouseleave', handleMouseLeave);

    }, CONFIG.showDelay);
}

// Lancer l'initialisation quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expose pour debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.exitIntentDebug = {
        show: showPopup,
        close: closePopup,
        config: CONFIG,
        hasSeenPopup: hasSeenPopup,
        clearCookie: () => {
            document.cookie = 'exit_popup_shown=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            console.log('Cookie cleared');
        }
    };
}

}) ();
