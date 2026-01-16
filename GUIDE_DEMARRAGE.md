# 🚀 Guide de Démarrage Rapide
## Pro Ashburn Décor & Styling

Ce guide vous aidera à mettre en ligne votre site web professionnel en quelques étapes simples.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Un éditeur de code (VS Code, Sublime Text, etc.)
- ✅ Un navigateur web moderne
- ✅ Vos images de décoration (photos de projets, équipe, etc.)
- ✅ Vos informations de contact

---

## 🎯 Étape 1 : Personnaliser le Contenu

### 1.1 Informations de Base

Ouvrez `index.html` et modifiez :

**Titre et Description (lignes 8-10)**
```html
<title>Votre Nom d'Entreprise - Décoration Professionnelle</title>
<meta name="description" content="Votre description unique...">
```

**Logo et Nom (lignes 45-48)**
```html
<span class="logo-text">Votre Nom</span>
<span class="logo-subtitle">Votre Slogan</span>
```

### 1.2 Hero Section

**Titre Principal (lignes 65-68)**
```html
<h1 class="hero-title">
    Votre Message Principal
    <span class="gradient-text">Votre Accroche</span>
</h1>
```

**Statistiques (lignes 80-92)**
Modifiez les valeurs `data-target` :
```html
<span class="stat-number" data-target="500">0</span> <!-- Vos chiffres -->
```

### 1.3 Section À Propos

**Texte de Présentation (lignes 120-135)**
Remplacez par votre histoire et vos valeurs.

### 1.4 Informations de Contact

**Email, Téléphone, Adresse (lignes 450-480)**
```html
<a href="mailto:votre@email.com">votre@email.com</a>
<a href="tel:+33123456789">+33 1 23 45 67 89</a>
<p>Votre Adresse Complète</p>
```

---

## 🖼️ Étape 2 : Ajouter Vos Images

### 2.1 Structure des Dossiers

Créez la structure suivante :
```
assets/
└── images/
    ├── hero-bg.jpg              (1920x1080px)
    ├── about-team.jpg           (800x600px)
    ├── og-image.jpg             (1200x630px)
    ├── favicon.svg
    ├── service-interior.jpg     (600x400px)
    ├── service-exterior.jpg     (600x400px)
    ├── service-events.jpg       (600x400px)
    ├── client-1.jpg             (200x200px)
    ├── client-2.jpg             (200x200px)
    ├── client-3.jpg             (200x200px)
    └── portfolio/
        ├── interior-1.jpg       (800x600px)
        ├── interior-2.jpg
        ├── interior-3.jpg
        ├── exterior-1.jpg
        ├── exterior-2.jpg
        ├── exterior-3.jpg
        ├── event-1.jpg
        ├── event-2.jpg
        └── event-3.jpg
```

### 2.2 Optimisation des Images

**Recommandations :**
- Format JPG pour les photos
- Format PNG pour les logos avec transparence
- Format SVG pour les icônes
- Compression : 70-85% de qualité
- Outils : TinyPNG, ImageOptim, Squoosh

**Tailles Recommandées :**
- Hero Background : 1920x1080px (max 500KB)
- Photos Portfolio : 800x600px (max 200KB)
- Photos Services : 600x400px (max 150KB)
- Avatars Clients : 200x200px (max 50KB)

---

## 🎨 Étape 3 : Personnaliser les Couleurs

### 3.1 Modifier la Palette

Ouvrez `styles/main.css` et modifiez les variables (lignes 10-30) :

```css
:root {
  /* Vos couleurs principales */
  --color-primary: #2C5F2D;        /* Couleur principale */
  --color-secondary: #D4AF37;      /* Couleur secondaire */
  --color-accent: #8B4513;         /* Couleur d'accent */
}
```

### 3.2 Générateur de Palette

Utilisez ces outils pour créer votre palette :
- [Coolors.co](https://coolors.co)
- [Adobe Color](https://color.adobe.com)
- [Paletton](https://paletton.com)

---

## 📝 Étape 4 : Configurer le Portfolio

### 4.1 Ajouter Vos Projets

Ouvrez `scripts/main.js` et trouvez la fonction `loadPortfolioItems()` (ligne ~180) :

```javascript
const portfolioItems = [
  {
    id: 1,
    title: 'Nom de Votre Projet',
    category: 'interieur', // ou 'exterieur' ou 'evenement'
    image: '/assets/images/portfolio/votre-image.jpg',
    description: 'Description de votre projet'
  },
  // Ajoutez vos autres projets...
];
```

### 4.2 Catégories Disponibles
- `interieur` : Décoration intérieure
- `exterieur` : Décoration extérieure
- `evenement` : Décoration événementielle

---

## 💬 Étape 5 : Personnaliser les Témoignages

Ouvrez `index.html` et modifiez les témoignages (lignes 350-420) :

```html
<article class="testimonial-card">
  <div class="testimonial-rating">
    <!-- 5 étoiles -->
  </div>
  <p class="testimonial-text">
    "Votre témoignage client ici..."
  </p>
  <div class="testimonial-author">
    <div class="author-avatar">
      <img src="/assets/images/client-1.jpg" alt="Nom Client">
    </div>
    <div class="author-info">
      <h4 class="author-name">Nom du Client</h4>
      <p class="author-role">Type de Service</p>
    </div>
  </div>
</article>
```

---

## 🌐 Étape 6 : Tester Localement

### Option 1 : Python (Recommandé)

```bash
# Dans le dossier du projet
python -m http.server 8000

# Ou avec Python 2
python -m SimpleHTTPServer 8000
```

Ouvrez : `http://localhost:8000`

### Option 2 : VS Code Live Server

1. Installer l'extension "Live Server"
2. Clic droit sur `index.html`
3. Sélectionner "Open with Live Server"

### Option 3 : Node.js

```bash
npx http-server -p 8000
```

---

## ✅ Étape 7 : Checklist Avant Mise en Ligne

### Contenu
- [ ] Tous les textes sont personnalisés
- [ ] Toutes les images sont ajoutées et optimisées
- [ ] Les informations de contact sont correctes
- [ ] Les témoignages sont réels et vérifiés
- [ ] Le portfolio est complet

### SEO
- [ ] Titre de page unique et descriptif
- [ ] Meta description engageante
- [ ] Toutes les images ont un attribut `alt`
- [ ] Sitemap.xml est à jour
- [ ] Robots.txt est configuré

### Performance
- [ ] Images optimisées (< 500KB chacune)
- [ ] CSS et JS fonctionnent correctement
- [ ] Site testé sur mobile
- [ ] Site testé sur différents navigateurs

### Fonctionnalités
- [ ] Navigation fonctionne
- [ ] Formulaire de contact validé
- [ ] Filtres portfolio fonctionnent
- [ ] Slider témoignages fonctionne
- [ ] Tous les liens sont valides

---

## 🚀 Étape 8 : Mise en Ligne

### Option 1 : Hébergement Simple (Netlify - Gratuit)

1. Créer un compte sur [Netlify](https://netlify.com)
2. Glisser-déposer le dossier du projet
3. Votre site est en ligne !

### Option 2 : GitHub Pages (Gratuit)

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit"

# Créer un repo sur GitHub
# Puis :
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main

# Activer GitHub Pages dans les paramètres du repo
```

### Option 3 : Hébergement Classique (OVH, O2Switch, etc.)

1. Se connecter via FTP (FileZilla)
2. Uploader tous les fichiers dans `public_html` ou `www`
3. Configurer le nom de domaine

---

## 🔧 Étape 9 : Configuration du Formulaire de Contact

### Option 1 : Formspree (Simple et Gratuit)

1. Créer un compte sur [Formspree](https://formspree.io)
2. Créer un nouveau formulaire
3. Remplacer dans `scripts/main.js` :

```javascript
async handleSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(this.form);
  
  const response = await fetch('https://formspree.io/f/VOTRE_ID', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (response.ok) {
    this.showNotification('Message envoyé !', 'success');
    this.form.reset();
  }
}
```

### Option 2 : EmailJS

1. Créer un compte sur [EmailJS](https://emailjs.com)
2. Configurer un service email
3. Suivre leur documentation d'intégration

---

## 📊 Étape 10 : Analytics & Suivi

### Google Analytics

Ajoutez avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console

1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter votre propriété
3. Vérifier la propriété
4. Soumettre le sitemap : `https://votresite.com/sitemap.xml`

---

## 🆘 Dépannage

### Le site ne s'affiche pas correctement

1. Vérifier la console du navigateur (F12)
2. Vérifier que tous les fichiers CSS/JS sont chargés
3. Vérifier les chemins des images

### Les animations ne fonctionnent pas

1. Vérifier que `animations.css` est bien lié
2. Vérifier que JavaScript est activé
3. Tester sur un autre navigateur

### Le formulaire ne s'envoie pas

1. Vérifier la console pour les erreurs
2. Configurer un service d'envoi (Formspree, EmailJS)
3. Tester la validation des champs

---

## 📞 Support

Pour toute question :
- 📧 Email : support@votresite.com
- 📱 Téléphone : +33 1 23 45 67 89

---

## 🎉 Félicitations !

Votre site web professionnel est maintenant en ligne ! 

N'oubliez pas de :
- ✅ Mettre à jour régulièrement le portfolio
- ✅ Ajouter de nouveaux témoignages
- ✅ Optimiser le SEO en continu
- ✅ Analyser les statistiques de visite

**Bon succès avec votre entreprise de décoration ! 🎨✨**
