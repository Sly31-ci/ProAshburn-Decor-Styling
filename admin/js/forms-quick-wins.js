// ============================================
// QUICK WINS FORMS
// ============================================

loadColorsForm() {
    const colors = this.contentData.colors || {
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
    };

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Palette de Couleurs</h2>
      <p class="form-description">Personnalisez les couleurs de votre site. Les changements seront appliqués en temps réel.</p>
      
      <div class="color-grid">
        <div class="color-item">
          <label>Couleur Primaire (Noir)</label>
          <input type="color" name="colors_primary" value="${colors.primary}" class="color-picker">
          <span class="color-code">${colors.primary}</span>
        </div>
        
        <div class="color-item">
          <label>Couleur Secondaire (Or)</label>
          <input type="color" name="colors_secondary" value="${colors.secondary}" class="color-picker">
          <span class="color-code">${colors.secondary}</span>
        </div>
        
        <div class="color-item">
          <label>Or Clair</label>
          <input type="color" name="colors_secondaryLight" value="${colors.secondaryLight}" class="color-picker">
          <span class="color-code">${colors.secondaryLight}</span>
        </div>
        
        <div class="color-item">
          <label>Or Foncé</label>
          <input type="color" name="colors_secondaryDark" value="${colors.secondaryDark}" class="color-picker">
          <span class="color-code">${colors.secondaryDark}</span>
        </div>
        
        <div class="color-item">
          <label>Accent Émeraude</label>
          <input type="color" name="colors_accentEmerald" value="${colors.accentEmerald}" class="color-picker">
          <span class="color-code">${colors.accentEmerald}</span>
        </div>
        
        <div class="color-item">
          <label>Accent Bronze</label>
          <input type="color" name="colors_accentBronze" value="${colors.accentBronze}" class="color-picker">
          <span class="color-code">${colors.accentBronze}</span>
        </div>
        
        <div class="color-item">
          <label>Accent Or Rose</label>
          <input type="color" name="colors_accentRoseGold" value="${colors.accentRoseGold}" class="color-picker">
          <span class="color-code">${colors.accentRoseGold}</span>
        </div>
        
        <div class="color-item">
          <label>Gris Clair</label>
          <input type="color" name="colors_lightGray" value="${colors.lightGray}" class="color-picker">
          <span class="color-code">${colors.lightGray}</span>
        </div>
        
        <div class="color-item">
          <label>Gris Moyen</label>
          <input type="color" name="colors_mediumGray" value="${colors.mediumGray}" class="color-picker">
          <span class="color-code">${colors.mediumGray}</span>
        </div>
        
        <div class="color-item">
          <label>Gris Foncé</label>
          <input type="color" name="colors_darkGray" value="${colors.darkGray}" class="color-picker">
          <span class="color-code">${colors.darkGray}</span>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-secondary" onclick="adminCMS.resetColors()">Réinitialiser</button>
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;

    // Update color codes on change
    document.querySelectorAll('.color-picker').forEach(picker => {
        picker.addEventListener('input', (e) => {
            const codeSpan = e.target.nextElementSibling;
            codeSpan.textContent = e.target.value;
        });
    });
}

resetColors() {
    if (confirm('Réinitialiser toutes les couleurs aux valeurs par défaut ?')) {
        this.contentData.colors = {
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
        };
        this.loadColorsForm();
        this.isDirty = true;
        this.updateSaveButton();
    }
}

loadNavigationForm() {
    const nav = this.contentData.navigation || {
        items: [
            { label: 'Accueil', link: '#accueil', enabled: true, order: 1, isCTA: false },
            { label: 'À Propos', link: '#a-propos', enabled: true, order: 2, isCTA: false },
            { label: 'Services', link: '#services', enabled: true, order: 3, isCTA: false },
            { label: 'Réalisations', link: '#realisations', enabled: true, order: 4, isCTA: false },
            { label: 'Témoignages', link: '#temoignages', enabled: true, order: 5, isCTA: false },
            { label: 'Contact', link: '#contact', enabled: true, order: 6, isCTA: true }
        ]
    };

    const itemsHtml = nav.items
        .sort((a, b) => a.order - b.order)
        .map((item, index) => `
      <div class="nav-item-card" data-index="${index}">
        <div class="nav-item-header">
          <input type="checkbox" ${item.enabled ? 'checked' : ''} 
                 onchange="adminCMS.toggleNavItem(${index})" class="nav-item-toggle">
          <input type="text" value="${item.label}" 
                 onchange="adminCMS.updateNavItem(${index}, 'label', this.value)" 
                 class="nav-item-input" placeholder="Label">
        </div>
        <div class="nav-item-body">
          <input type="text" value="${item.link}" 
                 onchange="adminCMS.updateNavItem(${index}, 'link', this.value)" 
                 class="nav-item-input" placeholder="Lien (ex: #section)">
          <label class="nav-item-cta">
            <input type="checkbox" ${item.isCTA ? 'checked' : ''} 
                   onchange="adminCMS.updateNavItem(${index}, 'isCTA', this.checked)">
            <span>Bouton CTA</span>
          </label>
        </div>
        <div class="nav-item-actions">
          <button type="button" onclick="adminCMS.moveNavItem(${index}, -1)" 
                  ${index === 0 ? 'disabled' : ''} class="btn-icon">↑</button>
          <button type="button" onclick="adminCMS.moveNavItem(${index}, 1)" 
                  ${index === nav.items.length - 1 ? 'disabled' : ''} class="btn-icon">↓</button>
          <button type="button" onclick="adminCMS.deleteNavItem(${index})" 
                  class="btn-icon btn-danger">🗑️</button>
        </div>
      </div>
    `).join('');

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">Gestion de la Navigation</h2>
      <p class="form-description">Gérez les items du menu principal. Vous pouvez ajouter, supprimer et réorganiser les items.</p>
      
      <div class="nav-items-container">
        ${itemsHtml}
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-secondary" onclick="adminCMS.addNavItem()">+ Ajouter un Item</button>
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

addNavItem() {
    if (!this.contentData.navigation) {
        this.contentData.navigation = { items: [] };
    }

    this.contentData.navigation.items.push({
        label: 'Nouveau Item',
        link: '#nouvelle-section',
        enabled: true,
        order: this.contentData.navigation.items.length + 1,
        isCTA: false
    });

    this.loadNavigationForm();
    this.isDirty = true;
    this.updateSaveButton();
}

deleteNavItem(index) {
    if (confirm('Supprimer cet item de navigation ?')) {
        this.contentData.navigation.items.splice(index, 1);
        // Reorder
        this.contentData.navigation.items.forEach((item, i) => {
            item.order = i + 1;
        });
        this.loadNavigationForm();
        this.isDirty = true;
        this.updateSaveButton();
    }
}

moveNavItem(index, direction) {
    const items = this.contentData.navigation.items;
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < items.length) {
        [items[index], items[newIndex]] = [items[newIndex], items[index]];
        items.forEach((item, i) => {
            item.order = i + 1;
        });
        this.loadNavigationForm();
        this.isDirty = true;
        this.updateSaveButton();
    }
}

updateNavItem(index, field, value) {
    this.contentData.navigation.items[index][field] = value;
    this.isDirty = true;
    this.updateSaveButton();
}

toggleNavItem(index) {
    this.contentData.navigation.items[index].enabled = !this.contentData.navigation.items[index].enabled;
    this.isDirty = true;
    this.updateSaveButton();
}

loadSEOForm() {
    const seo = this.contentData.seo || {
        title: 'Pro Ashburn Décor & Styling - Décoration Intérieure, Extérieure & Événementielle',
        description: 'Transformez vos espaces avec Pro Ashburn. Décoration intérieure, extérieure et événementielle haut de gamme.',
        keywords: 'décoration, intérieur, extérieur, événementiel, design, styling',
        author: 'Pro Ashburn',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterCard: 'summary_large_image'
    };

    const html = `
    <div class="form-section">
      <h2 class="form-section-title">SEO & Meta Tags</h2>
      <p class="form-description">Optimisez votre référencement et le partage sur les réseaux sociaux.</p>
      
      <div class="form-group">
        <label>Title Tag <span class="char-count" id="titleCount">${seo.title.length}/60</span></label>
        <input type="text" name="seo_title" value="${seo.title}" 
               maxlength="60" oninput="adminCMS.updateCharCount('titleCount', this.value.length, 60)">
        <small>Optimal: 50-60 caractères</small>
      </div>
      
      <div class="form-group">
        <label>Meta Description <span class="char-count" id="descCount">${seo.description.length}/160</span></label>
        <textarea name="seo_description" rows="3" maxlength="160" 
                  oninput="adminCMS.updateCharCount('descCount', this.value.length, 160)">${seo.description}</textarea>
        <small>Optimal: 150-160 caractères</small>
      </div>
      
      <div class="form-group">
        <label>Keywords</label>
        <input type="text" name="seo_keywords" value="${seo.keywords}">
        <small>Séparez par des virgules</small>
      </div>
      
      <div class="form-group">
        <label>Author</label>
        <input type="text" name="seo_author" value="${seo.author}">
      </div>
      
      <h3 class="form-subsection-title">Open Graph (Facebook, LinkedIn)</h3>
      
      <div class="form-group">
        <label>OG Title</label>
        <input type="text" name="seo_ogTitle" value="${seo.ogTitle || seo.title}">
      </div>
      
      <div class="form-group">
        <label>OG Description</label>
        <textarea name="seo_ogDescription" rows="2">${seo.ogDescription || seo.description}</textarea>
      </div>
      
      <div class="form-group">
        <label>OG Image URL</label>
        <input type="url" name="seo_ogImage" value="${seo.ogImage}" placeholder="https://...">
        <small>Recommandé: 1200x630px</small>
      </div>
      
      <h3 class="form-subsection-title">Twitter Card</h3>
      
      <div class="form-group">
        <label>Card Type</label>
        <select name="seo_twitterCard">
          <option value="summary" ${seo.twitterCard === 'summary' ? 'selected' : ''}>Summary</option>
          <option value="summary_large_image" ${seo.twitterCard === 'summary_large_image' ? 'selected' : ''}>Summary Large Image</option>
        </select>
      </div>
      
      <div class="seo-preview">
        <h4>Preview Google</h4>
        <div class="google-preview">
          <div class="preview-title">${seo.title}</div>
          <div class="preview-url">https://proashburndecor.com</div>
          <div class="preview-description">${seo.description}</div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('contentArea').innerHTML = html;
}

updateCharCount(elementId, current, max) {
    const element = document.getElementById(elementId);
    element.textContent = `${current}/${max}`;
    element.style.color = current > max * 0.9 ? '#ef4444' : current > max * 0.7 ? '#f59e0b' : '#10b981';
}
