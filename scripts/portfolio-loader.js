/**
 * Portfolio Loader
 * Charge et affiche dynamiquement les projets du portfolio
 */

(function () {
    'use strict';

    // Données des projets
    const projects = [
        // INTÉRIEUR
        {
            id: 1,
            title: "Rénovation Salon Haussmannien",
            category: "interieur",
            location: "Paris 16ème",
            year: "2025",
            description: "Transformation complète d'un salon classique en espace moderne et chaleureux.",
            image: "assets/images/portfolio/interior-1.jpg",
            tags: ["Décoration Intérieure", "Rénovation", "Style Moderne"]
        },
        {
            id: 2,
            title: "Cuisine Ouverte Scandinave",
            category: "interieur",
            location: "Boulogne-Billancourt",
            year: "2024",
            description: "Cuisine ouverte style scandinave épuré avec îlot central et finitions premium.",
            image: "assets/images/portfolio/interior-2.jpg",
            tags: ["Cuisine", "Scandinave", "Minimaliste"]
        },
        {
            id: 3,
            title: "Chambre Parentale Cosy",
            category: "interieur",
            location: "Levallois-Perret",
            year: "2024",
            description: "Suite parentale bohème chic avec dressing sur-mesure et ambiance cocooning.",
            image: "assets/images/portfolio/interior-3.jpg",
            tags: ["Chambre", "Bohème", "Cosy"]
        },

        // EXTÉRIEUR
        {
            id: 4,
            title: "Terrasse Zen Contemporaine",
            category: "exterieur",
            location: "Neuilly-sur-Seine",
            year: "2025",
            description: "Aménagement terrasse 50m² avec jardin zen et éclairage d'ambiance.",
            image: "assets/images/portfolio/exterior-1.jpg",
            tags: ["Terrasse", "Jardin Zen", "Contemporain"]
        },
        {
            id: 5,
            title: "Jardin Méditerranéen",
            category: "exterieur",
            location: "Saint-Tropez",
            year: "2024",
            description: "Jardin méditerranéen avec piscine, pergola et végétation luxuriante.",
            image: "assets/images/portfolio/exterior-2.jpg",
            tags: ["Jardin", "Méditerranéen", "Piscine"]
        },
        {
            id: 6,
            title: "Balcon Urbain Végétalisé",
            category: "exterieur",
            location: "Paris 11ème",
            year: "2024",
            description: "Transformation balcon 15m² en oasis urbaine avec mur végétal.",
            image: "assets/images/portfolio/exterior-3.jpg",
            tags: ["Balcon", "Urbain", "Végétal"]
        },

        // ÉVÉNEMENTS
        {
            id: 7,
            title: "Mariage Champêtre Chic",
            category: "evenement",
            location: "Château de Versailles",
            year: "2024",
            description: "Mariage 150 invités, thème champêtre chic avec touches dorées.",
            image: "assets/images/portfolio/event-1.jpg",
            tags: ["Mariage", "Champêtre", "Élégant"]
        },
        {
            id: 8,
            title: "Soirée Entreprise Luxury",
            category: "evenement",
            location: "Hôtel Le Meurice, Paris",
            year: "2024",
            description: "Gala d'entreprise 200 personnes, thème luxury or et noir.",
            image: "assets/images/portfolio/event-2.jpg",
            tags: ["Entreprise", "Gala", "Luxury"]
        },
        {
            id: 9,
            title: "Réception Mariage Oriental",
            category: "evenement",
            location: "Salle des Fêtes, Montreuil",
            year: "2023",
            description: "Mariage oriental 300 invités, thème mille et une nuits.",
            image: "assets/images/portfolio/event-3.jpg",
            tags: ["Mariage", "Oriental", "Luxe"]
        }
    ];

    let currentFilter = 'all';
    let filteredProjects = [...projects];

    /**
     * Crée le HTML d'un projet
     */
    function createProjectCard(project) {
        return `
      <article class="portfolio-item" data-category="${project.category}" data-id="${project.id}">
        <div class="portfolio-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="portfolio-overlay">
            <div class="portfolio-info">
              <span class="portfolio-category">${getCategoryLabel(project.category)}</span>
              <h3 class="portfolio-title">${project.title}</h3>
              <p class="portfolio-location">${project.location} • ${project.year}</p>
              <p class="portfolio-description">${project.description}</p>
              <div class="portfolio-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
    }

    /**
     * Retourne le label de catégorie
     */
    function getCategoryLabel(category) {
        const labels = {
            'interieur': 'Intérieur',
            'exterieur': 'Extérieur',
            'evenement': 'Événement'
        };
        return labels[category] || category;
    }

    /**
     * Affiche les projets filtrés
     */
    function displayProjects() {
        const grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        // Filtrer les projets
        if (currentFilter === 'all') {
            filteredProjects = [...projects];
        } else {
            filteredProjects = projects.filter(p => p.category === currentFilter);
        }

        // Animation de sortie
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Injecter le HTML
            grid.innerHTML = filteredProjects.map(createProjectCard).join('');

            // Animation d'entrée
            setTimeout(() => {
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';

                // Ajouter animation stagger aux cartes
                const items = grid.querySelectorAll('.portfolio-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
        }, 300);
    }

    /**
     * Gère les filtres
     */
    function handleFilter(filter) {
        currentFilter = filter;

        // Update active state des boutons
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Afficher les projets
        displayProjects();

        // Analytics
        trackFilter(filter);
    }

    /**
     * Track analytics
     */
    function trackFilter(filter) {
        if (typeof gtag === 'function') {
            gtag('event', 'portfolio_filter', {
                'filter': filter,
                'event_category': 'engagement'
            });
        }

        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'portfolio_filter',
                'filterType': filter
            });
        }

        console.log('Portfolio filtered:', filter);
    }

    /**
     * Initialisation
     */
    function init() {
        // Afficher les projets initiaux
        displayProjects();

        // Attacher les event listeners aux filtres
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                handleFilter(filter);
            });
        });

        console.log('✅ Portfolio loaded:', projects.length, 'projects');
    }

    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose pour debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.portfolioDebug = {
            projects: projects,
            currentFilter: () => currentFilter,
            filter: handleFilter,
            reload: displayProjects
        };
    }

})();
