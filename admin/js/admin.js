/**
 * ADMIN CMS ENHANCED - Pro Ashburn Décor & Styling
 * Version 2.0 with Advanced Features
 */

class AdminCMSEnhanced {
  constructor() {
    this.currentSection = 'dashboard';
    this.isAuthenticated = false;
    this.contentData = {};
    this.history = [];
    this.maxHistory = 20;
    this.autoSaveInterval = null;
    this.isDirty = false;

    this.init();
  }

  init() {
    this.loadStoredData();
    this.setupEventListeners();
    this.checkAuthentication();
    this.startAutoSave();
  }

  // ============================================
  // AUTHENTICATION
  // ============================================

  checkAuthentication() {
    const token = localStorage.getItem('admin_token');
    if (token === 'authenticated') {
      this.showDashboard();
    } else {
      this.showLogin();
    }
  }

  setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Save button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveContent());
    }

    // Preview button
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => this.previewSite());
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportData());
    }

    // Import button
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
      importBtn.addEventListener('click', () => document.getElementById('importFile').click());
    }

    // Undo/Redo
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveContent();
      }
    });

    // Track changes
    document.addEventListener('input', () => {
      this.isDirty = true;
      this.updateSaveButton();
    });
  }

  handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check stored password or default
    const storedPassword = localStorage.getItem('admin_password') || 'admin123';

    if (username === 'admin' && password === storedPassword) {
      localStorage.setItem('admin_token', 'authenticated');
      localStorage.setItem('admin_last_login', new Date().toISOString());
      this.showToast('Connexion réussie !', 'success');
      setTimeout(() => this.showDashboard(), 500);
    } else {
      this.showToast('Identifiants incorrects', 'error');
    }
  }

  handleLogout() {
    if (this.isDirty) {
      if (!confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment vous déconnecter ?')) {
        return;
      }
    }

    localStorage.removeItem('admin_token');
    this.stopAutoSave();
    this.showToast('Déconnexion réussie', 'success');
    setTimeout(() => this.showLogin(), 500);
  }

  showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
  }

  showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'grid';
    this.loadSection(this.currentSection);
  }

  // ============================================
  // AUTO-SAVE
  // ============================================

  startAutoSave() {
    this.autoSaveInterval = setInterval(() => {
      if (this.isDirty && this.isAuthenticated) {
        this.autoSave();
      }
    }, 30000); // Auto-save every 30 seconds
  }

  stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  autoSave() {
    this.saveContent(true);
    this.showToast('Sauvegarde automatique effectuée', 'info', 2000);
  }

  updateSaveButton() {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      if (this.isDirty) {
        saveBtn.classList.add('unsaved');
        saveBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="10" r="3" fill="#F59E0B"/>
          </svg>
          Sauvegarder *
        `;
      } else {
        saveBtn.classList.remove('unsaved');
        saveBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
          </svg>
          Sauvegarder
        `;
      }
    }
  }

  // ============================================
  // HISTORY (UNDO/REDO)
  // ============================================

  addToHistory(action, data) {
    this.history.push({
      action,
      data: JSON.parse(JSON.stringify(data)),
      timestamp: Date.now()
    });

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  undo() {
    if (this.history.length > 0) {
      const lastAction = this.history.pop();
      this.contentData = lastAction.data;
      this.loadSection(this.currentSection);
      this.showToast('Annulation effectuée', 'info');
    } else {
      this.showToast('Rien à annuler', 'warning');
    }
  }

  redo() {
    // Simplified redo - would need separate redo stack for full implementation
    this.showToast('Fonction Refaire non disponible', 'info');
  }

  // ============================================
  // NAVIGATION
  // ============================================

  handleNavigation(e) {
    const button = e.currentTarget;
    const section = button.dataset.section;

    if (this.isDirty && section !== this.currentSection) {
      if (!confirm('Vous avez des modifications non sauvegardées. Continuer ?')) {
        return;
      }
    }

    // Update active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    button.classList.add('active');

    // Load section
    this.currentSection = section;
    this.loadSection(section);

    // Reset dirty flag after loading section
    this.isDirty = false;
    this.updateSaveButton();
  }

  loadSection(section) {
    const contentArea = document.getElementById('contentArea');
    const sectionTitle = document.getElementById('sectionTitle');

    const titles = {
      dashboard: 'Tableau de Bord',
      colors: 'Gestion des Couleurs',
      navigation: 'Gestion de la Navigation',
      seo: 'SEO & Meta Tags',
      hero: 'Hero Section',
      about: 'À Propos',
      services: 'Services',
      portfolio: 'Portfolio',
      testimonials: 'Témoignages',
      settings: 'Paramètres',
      analytics: 'Statistiques'
    };

    sectionTitle.textContent = titles[section] || section;

    // Load appropriate form
    switch (section) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'colors':
        this.loadColorsForm();
        break;
      case 'navigation':
        this.loadNavigationForm();
        break;
      case 'seo':
        this.loadSEOForm();
        break;
      case 'hero':
        this.loadHeroForm();
        break;
      case 'about':
        this.loadAboutForm();
        break;
      case 'services':
        this.loadServicesForm();
        break;
      case 'portfolio':
        this.loadPortfolioForm();
        break;
      case 'testimonials':
        this.loadTestimonialsForm();
        break;
      case 'settings':
        this.loadSettingsForm();
        break;
      case 'analytics':
        this.loadAnalytics();
        break;
    }
  }

  // ============================================
  // DASHBOARD
  // ============================================

  loadDashboard() {
    const stats = this.getStats();
    const lastLogin = localStorage.getItem('admin_last_login');
    const lastSave = localStorage.getItem('cms_last_save');

    const html = `
      <div class="dashboard-grid">
        <!-- Welcome Card -->
        <div class="dashboard-card welcome-card">
          <h2>👋 Bienvenue, Admin</h2>
          <p>Dernière connexion : ${lastLogin ? new Date(lastLogin).toLocaleString('fr-FR') : 'Première connexion'}</p>
          <p>Dernière sauvegarde : ${lastSave ? new Date(lastSave).toLocaleString('fr-FR') : 'Aucune sauvegarde'}</p>
        </div>
        
        <!-- Quick Stats -->
        <div class="dashboard-card stats-card">
          <h3>📊 Statistiques Rapides</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">${stats.services}</div>
              <div class="stat-label">Services</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${stats.portfolio}</div>
              <div class="stat-label">Projets Portfolio</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${stats.testimonials}</div>
              <div class="stat-label">Témoignages</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${stats.images}</div>
              <div class="stat-label">Images</div>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="dashboard-card actions-card">
          <h3>⚡ Actions Rapides</h3>
          <div class="quick-actions">
            <button class="action-btn" onclick="adminCMS.loadSection('hero')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>Modifier Hero</span>
            </button>
            
            <button class="action-btn" onclick="adminCMS.loadSection('portfolio')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Gérer Portfolio</span>
            </button>
            
            <button class="action-btn" onclick="adminCMS.exportData()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Exporter Données</span>
            </button>
            
            <button class="action-btn" onclick="adminCMS.previewSite()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span>Prévisualiser Site</span>
            </button>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="dashboard-card activity-card">
          <h3>📝 Activité Récente</h3>
          <div class="activity-list">
            ${this.getRecentActivity()}
          </div>
        </div>
        
        <!-- System Info -->
        <div class="dashboard-card system-card">
          <h3>💾 Informations Système</h3>
          <div class="system-info">
            <div class="info-row">
              <span>Stockage utilisé</span>
              <span>${this.getStorageSize()}</span>
            </div>
            <div class="info-row">
              <span>Version CMS</span>
              <span>2.0 Enhanced</span>
            </div>
            <div class="info-row">
              <span>Auto-save</span>
              <span class="status-active">✓ Activé (30s)</span>
            </div>
            <div class="info-row">
              <span>Historique</span>
              <span>${this.history.length}/${this.maxHistory} actions</span>
            </div>
          </div>
        </div>
        
        <!-- Tips -->
        <div class="dashboard-card tips-card">
          <h3>💡 Astuces</h3>
          <ul class="tips-list">
            <li><kbd>Ctrl</kbd> + <kbd>S</kbd> : Sauvegarder</li>
            <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> : Annuler</li>
            <li>Auto-save toutes les 30 secondes</li>
            <li>Exportez régulièrement vos données</li>
          </ul>
        </div>
      </div>
    `;

    document.getElementById('contentArea').innerHTML = html;
  }

  getStats() {
    return {
      services: this.contentData.services?.services?.length || 3,
      portfolio: this.contentData.portfolio?.items?.length || 0,
      testimonials: this.contentData.testimonials?.testimonials?.length || 3,
      images: this.countImages()
    };
  }

  countImages() {
    let count = 0;
    // Count images in content data
    const dataStr = JSON.stringify(this.contentData);
    const matches = dataStr.match(/\.(jpg|jpeg|png|gif|webp)/gi);
    return matches ? matches.length : 0;
  }

  getRecentActivity() {
    const activities = this.history.slice(-5).reverse();

    if (activities.length === 0) {
      return '<p class="no-activity">Aucune activité récente</p>';
    }

    return activities.map(activity => {
      const time = new Date(activity.timestamp).toLocaleTimeString('fr-FR');
      return `
        <div class="activity-item">
          <span class="activity-time">${time}</span>
          <span class="activity-action">${activity.action}</span>
        </div>
      `;
    }).join('');
  }

  getStorageSize() {
    const data = localStorage.getItem('cms_content') || '{}';
    const bytes = new Blob([data]).size;

    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  // ============================================
  // ANALYTICS
  // ============================================

  loadAnalytics() {
    const html = `
      <div class="analytics-container">
        <div class="analytics-card">
          <h3>📈 Statistiques de Contenu</h3>
          <canvas id="contentChart" width="400" height="200"></canvas>
        </div>
        
        <div class="analytics-card">
          <h3>📊 Répartition Portfolio</h3>
          <div id="portfolioBreakdown"></div>
        </div>
        
        <div class="analytics-card">
          <h3>⏱️ Historique des Modifications</h3>
          <div id="modificationHistory"></div>
        </div>
      </div>
    `;

    document.getElementById('contentArea').innerHTML = html;
    this.renderAnalytics();
  }

  renderAnalytics() {
    // Simple text-based analytics (could be enhanced with Chart.js)
    const stats = this.getStats();

    const breakdown = document.getElementById('portfolioBreakdown');
    if (breakdown && this.contentData.portfolio?.items) {
      const categories = {};
      this.contentData.portfolio.items.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
      });

      let html = '<div class="breakdown-list">';
      Object.entries(categories).forEach(([cat, count]) => {
        const percentage = (count / this.contentData.portfolio.items.length * 100).toFixed(0);
        html += `
          <div class="breakdown-item">
            <span>${cat}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <span>${count} (${percentage}%)</span>
          </div>
        `;
      });
      html += '</div>';
      breakdown.innerHTML = html;
    }

    const historyDiv = document.getElementById('modificationHistory');
    if (historyDiv) {
      historyDiv.innerHTML = this.getRecentActivity();
    }
  }

  // ============================================
  // EXPORT/IMPORT
  // ============================================

  exportData() {
    const data = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      content: this.contentData,
      settings: {
        siteName: this.contentData.settings?.siteName || 'Pro Ashburn Décor & Styling'
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast('Données exportées avec succès !', 'success');
  }

  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        if (confirm('Êtes-vous sûr de vouloir importer ces données ? Cela écrasera les données actuelles.')) {
          this.contentData = imported.content || imported;
          localStorage.setItem('cms_content', JSON.stringify(this.contentData));
          this.showToast('Données importées avec succès !', 'success');
          this.loadSection(this.currentSection);
        }
      } catch (error) {
        this.showToast('Erreur lors de l\'import : fichier invalide', 'error');
      }
    };
    reader.readAsText(file);
  }

  // ============================================
  // SAVE CONTENT (Enhanced)
  // ============================================

  saveContent(isAutoSave = false) {
    const section = this.currentSection;

    // Add to history before saving
    this.addToHistory(`Sauvegarde ${section}`, this.contentData);

    // Collect form data
    const formData = this.collectFormData(section);

    // Save to contentData
    this.contentData[section] = formData;

    // Save to localStorage
    localStorage.setItem('cms_content', JSON.stringify(this.contentData));
    localStorage.setItem('cms_last_save', new Date().toISOString());

    this.isDirty = false;
    this.updateSaveButton();

    if (!isAutoSave) {
      this.showToast('Modifications sauvegardées !', 'success');
    }
  }

  collectFormData(section) {
    const data = {};

    // Get all inputs in content area
    const inputs = document.querySelectorAll('#contentArea input, #contentArea textarea, #contentArea select');

    inputs.forEach(input => {
      const id = input.id;
      if (id) {
        data[id] = input.value;
      }
    });

    // Add temp images
    if (this.tempImages) {
      Object.assign(data, this.tempImages);
    }

    return data;
  }

  loadStoredData() {
    const stored = localStorage.getItem('cms_content');
    if (stored) {
      try {
        this.contentData = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading stored data:', e);
      }
    }
  }

  // ============================================
  // PREVIEW SITE
  // ============================================

  previewSite() {
    window.open('../index.html', '_blank');
  }

  // ============================================
  // TOAST NOTIFICATION (Enhanced)
  // ============================================

  showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span> ${message}`;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ============================================
  // FORM LOADERS (Keep existing + enhance)
  // ============================================

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

  loadSettingsForm() {
    // Enhanced with password change
    const data = this.contentData.settings || {
      siteName: 'Pro Ashburn Décor & Styling',
      email: 'contact@proashburndecor.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Avenue de la Décoration, 75001 Paris, France',
      facebook: '#',
      instagram: '#',
      pinterest: '#'
    };

    const html = `
      <div class="form-section">
        <h2 class="form-section-title">Informations Générales</h2>
        
        <div class="form-field">
          <label>Nom du Site</label>
          <input type="text" id="settings_siteName" value="${data.siteName}">
        </div>
        
        <div class="form-grid">
          <div class="form-field">
            <label>Email</label>
            <input type="email" id="settings_email" value="${data.email}">
          </div>
          
          <div class="form-field">
            <label>Téléphone</label>
            <input type="tel" id="settings_phone" value="${data.phone}">
          </div>
        </div>
        
        <div class="form-field">
          <label>Adresse</label>
          <textarea id="settings_address" rows="2">${data.address}</textarea>
        </div>
      </div>
      
      <div class="form-section">
        <h2 class="form-section-title">Réseaux Sociaux</h2>
        
        <div class="form-field">
          <label>Facebook URL</label>
          <input type="url" id="settings_facebook" value="${data.facebook}">
        </div>
        
        <div class="form-field">
          <label>Instagram URL</label>
          <input type="url" id="settings_instagram" value="${data.instagram}">
        </div>
        
        <div class="form-field">
          <label>Pinterest URL</label>
          <input type="url" id="settings_pinterest" value="${data.pinterest}">
        </div>
      </div>
      
      <div class="form-section">
        <h2 class="form-section-title">Sécurité</h2>
        
        <div class="form-field">
          <label>Mot de Passe Actuel</label>
          <input type="password" id="settings_currentPassword" placeholder="Entrez le mot de passe actuel">
        </div>
        
        <div class="form-field">
          <label>Nouveau Mot de Passe</label>
          <input type="password" id="settings_newPassword" placeholder="Laisser vide pour ne pas changer">
        </div>
        
        <div class="form-field">
          <label>Confirmer le Nouveau Mot de Passe</label>
          <input type="password" id="settings_confirmPassword" placeholder="Confirmer le nouveau mot de passe">
        </div>
        
        <button class="btn-secondary" onclick="adminCMS.changePassword()">
          Changer le Mot de Passe
        </button>
      </div>
      
      <div class="form-section">
        <h2 class="form-section-title">Sauvegarde & Restauration</h2>
        
        <div class="backup-actions">
          <button class="btn-primary" onclick="adminCMS.exportData()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
            </svg>
            Exporter les Données
          </button>
          
          <input type="file" id="importFile" accept=".json" style="display: none" onchange="adminCMS.importData(this.files[0])">
          <button class="btn-secondary" onclick="document.getElementById('importFile').click()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"/>
            </svg>
            Importer des Données
          </button>
        </div>
      </div>
    `;

    document.getElementById('contentArea').innerHTML = html;
  }

  changePassword() {
    const current = document.getElementById('settings_currentPassword').value;
    const newPass = document.getElementById('settings_newPassword').value;
    const confirm = document.getElementById('settings_confirmPassword').value;

    const storedPassword = localStorage.getItem('admin_password') || 'admin123';

    if (current !== storedPassword) {
      this.showToast('Mot de passe actuel incorrect', 'error');
      return;
    }

    if (!newPass) {
      this.showToast('Veuillez entrer un nouveau mot de passe', 'warning');
      return;
    }

    if (newPass !== confirm) {
      this.showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }

    if (newPass.length < 6) {
      this.showToast('Le mot de passe doit contenir au moins 6 caractères', 'warning');
      return;
    }

    localStorage.setItem('admin_password', newPass);
    this.showToast('Mot de passe changé avec succès !', 'success');

    // Clear password fields
    document.getElementById('settings_currentPassword').value = '';
    document.getElementById('settings_newPassword').value = '';
    document.getElementById('settings_confirmPassword').value = '';
  }

  // ============================================
  // IMAGE UPLOAD HANDLER
  // ============================================

  handleImageUpload(event, fieldId) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Image trop grande (max 5MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewId = fieldId + 'Preview';
      const preview = document.getElementById(previewId);

      if (preview) {
        preview.style.display = 'block';
        preview.querySelector('img').src = e.target.result;
      }

      // Store in temporary data
      if (!this.tempImages) this.tempImages = {};
      this.tempImages[fieldId] = e.target.result;

      this.isDirty = true;
      this.updateSaveButton();
      this.showToast('Image uploadée', 'success');
    };

    reader.readAsDataURL(file);
  }
}

// Initialize Enhanced CMS
const adminCMS = new AdminCMSEnhanced();
