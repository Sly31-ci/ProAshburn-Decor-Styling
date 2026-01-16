// ============================================
// CONTENT SECTION FORMS
// ============================================

loadHeroForm() {
    const data = this.contentData.hero || {
        title: 'Transformez Vos Espaces en Œuvres d\'Art',
        subtitle: 'Décoration Intérieure & Extérieure Premium',
        description: 'Créez des environnements exceptionnels qui reflètent votre style unique avec nos services de décoration haut de gamme.',
        ctaPrimary: 'Découvrir Nos Services',
        ctaSecondary: 'Voir Nos Réalisations',
        stats: [
            { number: '500', label: 'Projets Réalisés' },
            { number: '15', label: 'Années d\'Expérience' },
            { number: '98', label: 'Clients Satisfaits' }
        ]
    };

    const statsHtml = data.stats.map((stat, index) => `
    <div class="stat-item">
      <input type="text" name="hero_stat_${index}_number" value="${stat.number}" placeholder="Nombre">
      <input type="text" name="hero_stat_${index}_label" value="${stat.label}" placeholder="Label">
    </div>
  `).join('');

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Hero Section</h2>
      
      <div class="form-group">
        <label>Titre Principal</label>
        <input type="text" name="hero_title" value="${data.title}" class="form-input">
      </div>
      
      <div class="form-group">
        <label>Sous-titre</label>
        <input type="text" name="hero_subtitle" value="${data.subtitle}" class="form-input">
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea name="hero_description" rows="3" class="form-input">${data.description}</textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Bouton Principal</label>
          <input type="text" name="hero_ctaPrimary" value="${data.ctaPrimary}" class="form-input">
        </div>
        
        <div class="form-group">
          <label>Bouton Secondaire</label>
          <input type="text" name="hero_ctaSecondary" value="${data.ctaSecondary}" class="form-input">
        </div>
      </div>
      
      <h3 class="form-subsection-title">Statistiques</h3>
      <div class="stats-grid">
        ${statsHtml}
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

loadAboutForm() {
    const data = this.contentData.about || {
        tag: 'À Propos de Nous',
        title: 'Votre Vision, Notre Expertise',
        description: 'Depuis plus de 15 ans, nous transformons les espaces en lieux d\'exception. Notre équipe de décorateurs passionnés met son expertise au service de vos projets les plus ambitieux.',
        features: [
            'Expertise reconnue depuis 2008',
            'Équipe de designers professionnels',
            'Matériaux haut de gamme',
            'Service personnalisé'
        ]
    };

    const featuresHtml = data.features.map((feature, index) => `
    <div class="feature-item">
      <input type="text" name="about_feature_${index}" value="${feature}" class="form-input">
      <button type="button" onclick="adminCMS.deleteAboutFeature(${index})" class="btn-icon btn-danger">×</button>
    </div>
  `).join('');

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Section À Propos</h2>
      
      <div class="form-group">
        <label>Tag</label>
        <input type="text" name="about_tag" value="${data.tag}" class="form-input">
      </div>
      
      <div class="form-group">
        <label>Titre</label>
        <input type="text" name="about_title" value="${data.title}" class="form-input">
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea name="about_description" rows="4" class="form-input">${data.description}</textarea>
      </div>
      
      <h3 class="form-subsection-title">Points Forts</h3>
      <div class="features-list">
        ${featuresHtml}
      </div>
      
      <button type="button" onclick="adminCMS.addAboutFeature()" class="btn-secondary">+ Ajouter un Point Fort</button>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

addAboutFeature() {
    if (!this.contentData.about) this.contentData.about = { features: [] };
    if (!this.contentData.about.features) this.contentData.about.features = [];

    this.contentData.about.features.push('Nouveau point fort');
    this.loadAboutForm();
    this.isDirty = true;
    this.updateSaveButton();
}

deleteAboutFeature(index) {
    this.contentData.about.features.splice(index, 1);
    this.loadAboutForm();
    this.isDirty = true;
    this.updateSaveButton();
}

loadServicesForm() {
    const data = this.contentData.services || {
        items: [
            {
                title: 'Décoration Intérieure',
                description: 'Transformez votre intérieur en un espace qui vous ressemble',
                features: ['Design personnalisé', 'Mobilier sur mesure', 'Éclairage d\'ambiance']
            },
            {
                title: 'Décoration Extérieure',
                description: 'Créez un espace extérieur harmonieux et accueillant',
                features: ['Aménagement paysager', 'Mobilier d\'extérieur', 'Éclairage extérieur']
            },
            {
                title: 'Décoration Événementielle',
                description: 'Rendez vos événements inoubliables',
                features: ['Mariages et réceptions', 'Événements d\'entreprise', 'Décoration saisonnière']
            }
        ]
    };

    const servicesHtml = data.items.map((service, index) => `
    <div class="service-card">
      <h4>Service ${index + 1}</h4>
      <div class="form-group">
        <label>Titre</label>
        <input type="text" name="service_${index}_title" value="${service.title}" class="form-input">
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea name="service_${index}_description" rows="2" class="form-input">${service.description}</textarea>
      </div>
      
      <div class="form-group">
        <label>Caractéristiques (une par ligne)</label>
        <textarea name="service_${index}_features" rows="3" class="form-input">${service.features.join('\n')}</textarea>
      </div>
    </div>
  `).join('');

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Services</h2>
      <p class="form-description">Gérez vos services (actuellement limité à 3 services).</p>
      
      <div class="services-grid">
        ${servicesHtml}
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

loadPortfolioForm() {
    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Portfolio</h2>
      <p class="form-description">Le portfolio est géré dynamiquement via le fichier <code>scripts/main.js</code>.</p>
      
      <div class="info-box">
        <h3>📁 Images Portfolio</h3>
        <p>Les images du portfolio sont stockées dans <code>assets/images/portfolio/</code></p>
        <ul>
          <li>✅ 9 images présentes</li>
          <li>✅ 3 catégories : Intérieur, Extérieur, Événements</li>
          <li>✅ Filtres fonctionnels</li>
        </ul>
      </div>
      
      <div class="info-box">
        <h3>🔧 Modification</h3>
        <p>Pour modifier le portfolio :</p>
        <ol>
          <li>Ajouter/remplacer images dans <code>assets/images/portfolio/</code></li>
          <li>Éditer <code>scripts/main.js</code> ligne 246-310</li>
          <li>Mettre à jour les données du tableau <code>portfolioItems</code></li>
        </ol>
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

loadTestimonialsForm() {
    const data = this.contentData.testimonials || {
        items: [
            {
                name: 'Sophie Martin',
                role: 'Propriétaire',
                text: 'Une équipe exceptionnelle qui a transformé notre maison en un véritable havre de paix.',
                rating: 5
            },
            {
                name: 'Marie et Thomas Dubois',
                role: 'Couple',
                text: 'Professionnalisme, créativité et écoute. Nous recommandons vivement !',
                rating: 5
            },
            {
                name: 'Pierre Lefebvre',
                role: 'Chef d\'Entreprise',
                text: 'Nos bureaux sont maintenant un espace inspirant grâce à leur talent.',
                rating: 5
            }
        ]
    };

    const testimonialsHtml = data.items.map((testimonial, index) => `
    <div class="testimonial-card">
      <h4>Témoignage ${index + 1}</h4>
      
      <div class="form-row">
        <div class="form-group">
          <label>Nom</label>
          <input type="text" name="testimonial_${index}_name" value="${testimonial.name}" class="form-input">
        </div>
        
        <div class="form-group">
          <label>Rôle/Titre</label>
          <input type="text" name="testimonial_${index}_role" value="${testimonial.role}" class="form-input">
        </div>
      </div>
      
      <div class="form-group">
        <label>Témoignage</label>
        <textarea name="testimonial_${index}_text" rows="3" class="form-input">${testimonial.text}</textarea>
      </div>
      
      <div class="form-group">
        <label>Note (1-5)</label>
        <input type="number" name="testimonial_${index}_rating" value="${testimonial.rating}" 
               min="1" max="5" class="form-input">
      </div>
    </div>
  `).join('');

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Témoignages</h2>
      <p class="form-description">Gérez vos témoignages clients (actuellement limité à 3 témoignages).</p>
      
      <div class="testimonials-grid">
        ${testimonialsHtml}
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}
