# 🛠️ Documentation Technique
## Pro Ashburn Décor & Styling

Guide technique complet pour les développeurs et mainteneurs du site.

---

## 📁 Architecture du Projet

```
ProAshburnDecorAndStyling/
├── index.html                    # Page principale (SPA)
├── styles/
│   ├── main.css                 # Design system & styles principaux
│   ├── animations.css           # Bibliothèque d'animations
│   └── portfolio.css            # Styles spécifiques portfolio
├── scripts/
│   ├── main.js                  # JavaScript principal
│   ├── animations.js            # Gestionnaire d'animations scroll
│   └── advanced.ts              # Fonctionnalités TypeScript
├── assets/
│   ├── images/                  # Images du site
│   │   ├── favicon.svg
│   │   ├── placeholder.jpg
│   │   └── portfolio/
│   └── fonts/                   # Polices personnalisées (optionnel)
├── README.md                     # Documentation générale
├── GUIDE_DEMARRAGE.md           # Guide de démarrage rapide
├── SEO_GUIDE.md                 # Guide SEO complet
├── TECHNICAL_DOC.md             # Ce fichier
├── package.json                 # Configuration npm
├── tsconfig.json                # Configuration TypeScript
├── .gitignore                   # Fichiers ignorés par Git
├── robots.txt                   # Instructions pour robots
└── sitemap.xml                  # Plan du site
```

---

## 🎨 Design System

### Variables CSS

Toutes les variables de design sont centralisées dans `:root` (`styles/main.css`) :

```css
:root {
  /* Couleurs */
  --color-primary: #2C5F2D;
  --color-secondary: #D4AF37;
  --color-accent: #8B4513;
  
  /* Typographie */
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  
  /* Espacements */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Ombres */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Modification des Couleurs

Pour changer la palette de couleurs :

1. Modifier les variables dans `styles/main.css`
2. Les changements se propagent automatiquement
3. Vérifier les contrastes (WCAG AAA)

---

## 🔧 JavaScript Architecture

### Classes Principales

#### 1. Navigation
**Fichier :** `scripts/main.js`

```javascript
class Navigation {
  constructor()
  init()
  handleScroll()
  toggleMenu()
  smoothScroll(e)
  updateActiveLink()
}
```

**Responsabilités :**
- Gestion du menu mobile
- Scroll smooth vers sections
- Mise à jour du lien actif
- Effet de scroll sur navbar

#### 2. ScrollReveal
**Fichier :** `scripts/main.js`

```javascript
class ScrollReveal {
  constructor()
  init()
  revealElements()
}
```

**Responsabilités :**
- Révélation des éléments au scroll
- Utilise Intersection Observer
- Performance optimisée

#### 3. PortfolioFilter
**Fichier :** `scripts/main.js`

```javascript
class PortfolioFilter {
  constructor()
  init()
  loadPortfolioItems()
  renderPortfolio(items)
  filterPortfolio(e)
}
```

**Responsabilités :**
- Chargement des projets
- Filtrage par catégorie
- Rendu dynamique

#### 4. TestimonialsSlider
**Fichier :** `scripts/main.js`

```javascript
class TestimonialsSlider {
  constructor()
  init()
  next()
  prev()
  updateSlider()
  startAutoPlay()
  addSwipeSupport()
}
```

**Responsabilités :**
- Navigation du slider
- Auto-play
- Support tactile

#### 5. ContactForm
**Fichier :** `scripts/main.js`

```javascript
class ContactForm {
  constructor()
  init()
  validateField(field)
  handleSubmit(e)
  showNotification(message, type)
}
```

**Responsabilités :**
- Validation des champs
- Soumission du formulaire
- Feedback utilisateur

---

## 📊 TypeScript

### Configuration

**Fichier :** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "strict": true,
    "outDir": "./scripts"
  }
}
```

### Compilation

```bash
# Compiler une fois
npm run build:ts

# Mode watch
npm run watch:ts
```

### Types Principaux

```typescript
interface PortfolioItem {
  id: number;
  title: string;
  category: 'interieur' | 'exterieur' | 'evenement';
  image: string;
  description: string;
  tags?: string[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}
```

---

## 🎭 Animations

### Classes d'Animation Disponibles

**Fichier :** `styles/animations.css`

```css
/* Entrées */
.fade-in-up        /* Apparition du bas */
.fade-in           /* Apparition simple */
.slide-in-left     /* Glissement gauche */
.slide-in-right    /* Glissement droite */
.scale-in          /* Zoom */

/* Scroll */
.reveal-on-scroll  /* Révélation automatique */

/* Hover */
.hover-lift        /* Élévation au survol */
.hover-zoom        /* Zoom d'image */
.hover-glow        /* Effet lumineux */
```

### Utilisation

```html
<!-- Animation immédiate -->
<div class="fade-in-up">Contenu</div>

<!-- Animation au scroll -->
<div class="reveal-on-scroll">Contenu</div>

<!-- Avec délai -->
<div class="fade-in-up" style="animation-delay: 0.2s;">Contenu</div>
```

### Personnalisation

```css
/* Modifier la durée */
.fade-in-up {
  animation-duration: 1s; /* Par défaut: 0.8s */
}

/* Modifier l'easing */
.fade-in-up {
  animation-timing-function: ease-out;
}
```

---

## 🔌 API & Intégrations

### Formulaire de Contact

#### Option 1 : Formspree

```javascript
async handleSubmit(e) {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    body: new FormData(this.form),
    headers: { 'Accept': 'application/json' }
  });
  
  if (response.ok) {
    this.showNotification('Message envoyé !', 'success');
  }
}
```

#### Option 2 : EmailJS

```javascript
emailjs.sendForm('service_id', 'template_id', this.form, 'user_id')
  .then(() => {
    this.showNotification('Message envoyé !', 'success');
  });
```

#### Option 3 : Backend Custom

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
/* Base: < 480px */

@media (min-width: 481px) {
  /* Tablet */
}

@media (min-width: 769px) {
  /* Desktop */
}

@media (min-width: 1281px) {
  /* Large Desktop */
}
```

### Approche

1. Design mobile par défaut
2. Amélioration progressive pour écrans plus grands
3. Utilisation de `clamp()` pour typographie fluide
4. Grid et Flexbox pour layouts adaptatifs

---

## ⚡ Performance

### Optimisations Implémentées

#### 1. Images
```html
<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Fallback -->
<img src="image.jpg" onerror="this.src='/assets/images/placeholder.jpg'">
```

#### 2. JavaScript
```javascript
// Debounce pour événements fréquents
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle pour scroll
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

#### 3. CSS
```css
/* GPU Acceleration */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}

/* Réduction des repaints */
.hover-effect {
  transition: transform 0.3s, opacity 0.3s;
  /* Éviter: transition: all */
}
```

### Métriques Cibles

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3.5s

---

## ♿ Accessibilité

### Implémentations

#### 1. Navigation Clavier
```javascript
// Trap focus dans modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

#### 2. ARIA Labels
```html
<button aria-label="Ouvrir le menu" aria-expanded="false">
  <span class="hamburger"></span>
</button>

<nav role="navigation" aria-label="Navigation principale">
  <!-- ... -->
</nav>
```

#### 3. Focus Visible
```css
*:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
}
```

#### 4. Contrastes
- Texte normal : ratio 4.5:1 minimum
- Texte large : ratio 3:1 minimum
- Éléments interactifs : ratio 3:1 minimum

---

## 🧪 Tests

### Tests Manuels

#### Checklist Fonctionnelle
- [ ] Navigation fonctionne sur mobile
- [ ] Tous les liens sont valides
- [ ] Formulaire valide correctement
- [ ] Filtres portfolio fonctionnent
- [ ] Slider témoignages fonctionne
- [ ] Animations se déclenchent

#### Checklist Navigateurs
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Tests Automatisés (Recommandé)

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Validation HTML
npm install -g html-validator-cli
html-validator --file=index.html

# Validation CSS
npm install -g css-validator
css-validator styles/main.css
```

---

## 🐛 Debugging

### Console Logs

Le site inclut des logs utiles :

```javascript
console.log('✨ Pro Ashburn Décor & Styling - Site initialized');
console.log('⚡ Page loaded in Xms');
```

### Outils de Debug

```javascript
// Activer le mode debug
localStorage.setItem('debug', 'true');

// Voir les événements
window.addEventListener('scroll', (e) => {
  if (localStorage.getItem('debug')) {
    console.log('Scroll position:', window.pageYOffset);
  }
});
```

---

## 🔄 Workflow de Développement

### 1. Setup Initial

```bash
cd ProAshburnDecorAndStyling
npm install
```

### 2. Développement

```bash
# Lancer le serveur local
npm start

# Compiler TypeScript en mode watch
npm run watch:ts
```

### 3. Build Production

```bash
# Compiler TypeScript
npm run build:ts

# Minifier CSS (optionnel)
npx cssnano styles/main.css styles/main.min.css

# Minifier JS (optionnel)
npx terser scripts/main.js -o scripts/main.min.js
```

### 4. Déploiement

```bash
# Netlify
netlify deploy --prod

# GitHub Pages
git push origin main

# FTP
# Utiliser FileZilla ou équivalent
```

---

## 📝 Conventions de Code

### HTML
- Indentation : 2 espaces
- Attributs : guillemets doubles
- Sémantique : utiliser les balises appropriées

### CSS
- BEM naming (optionnel)
- Mobile-first
- Variables pour valeurs réutilisables

### JavaScript
- camelCase pour variables et fonctions
- PascalCase pour classes
- Commentaires JSDoc pour fonctions publiques

```javascript
/**
 * Valide un champ de formulaire
 * @param {HTMLInputElement} field - Le champ à valider
 * @returns {boolean} True si valide
 */
validateField(field) {
  // ...
}
```

---

## 🔐 Sécurité

### Bonnes Pratiques

1. **Validation côté client ET serveur**
2. **Sanitization des inputs**
3. **HTTPS obligatoire en production**
4. **CSP (Content Security Policy)**

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

---

## 📞 Support Technique

Pour toute question technique :
- 📧 Email : dev@proashburndecor.com
- 📚 Documentation : Ce fichier
- 🐛 Issues : GitHub Issues (si applicable)

---

**Dernière mise à jour : 15 janvier 2026**
**Version : 1.0.0**
