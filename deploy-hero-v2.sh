#!/bin/bash

# ============================================
# DÉPLOIEMENT HERO V2 - GitHub Pages
# Pro Ashburn Décor & Styling
# ============================================

echo "🎨 Pro Ashburn Décor & Styling - Déploiement HERO V2"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérification du répertoire Git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce n'est pas un dépôt Git"
    echo "   Veuillez exécuter ce script depuis le dossier du projet"
    exit 1
fi

echo "📊 Vérification des fichiers modifiés..."
echo ""

# Afficher le statut Git
git status

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Fichiers qui seront déployés:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ index.html                    - Structure HERO V2"
echo "✅ styles/hero-v2.css            - Nouveaux styles HERO"
echo "✅ HERO_REDESIGN_UX_UI.md        - Documentation UX/UI"
echo "✅ HERO_V2_IMPLEMENTATION.md     - Guide implémentation"
echo "✅ HERO_REFONTE_RESUME.md        - Résumé exécutif"
echo ""

read -p "🚀 Voulez-vous continuer le déploiement? (o/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[OoYy]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 0
fi

echo ""
echo "📦 Ajout des fichiers au staging..."
git add index.html
git add styles/hero-v2.css
git add HERO_REDESIGN_UX_UI.md
git add HERO_V2_IMPLEMENTATION.md
git add HERO_REFONTE_RESUME.md
git add deploy-hero-v2.sh

echo "✅ Fichiers ajoutés"
echo ""

echo "💬 Création du commit..."
git commit -m "feat(hero): nouvelle HERO section V2 - UX/UI optimisée conversion

🎯 Objectif: Clarté immédiate (<3 secondes) des services offerts

✨ Nouveautés:
- Badge supérieur établissant crédibilité (Décorateurs pros, 10 ans)
- Titre H1 reformulé orienté bénéfice client
- Sous-titre mentionnant explicitement les 3 services (intérieur/extérieur/thème)
- CTAs optimisés (devis gratuit + réalisations) avec icônes
- Badges de réassurance visibles immédiatement (+500 projets, 98% satisfaits, sur mesure)

🎨 Design:
- Hiérarchie visuelle optimisée
- Animations fluides et légères
- Glassmorphism premium sur badges
- Responsive design complet (desktop/tablet/mobile)

♿ Accessibilité:
- Contraste WCAG AA respecté
- ARIA labels sur CTAs
- Support prefers-reduced-motion
- Navigation clavier optimisée

🔍 SEO:
- H1 unique avec mots-clés ciblés
- Structure sémantique HTML5
- Mots-clés: décoration intérieure, extérieure, à thème

📊 KPIs attendus:
- Taux de rebond: -20%
- Temps sur page: +30%
- Clics CTA primaire: +40%
- Conversion formulaire: +35%

📚 Documentation incluse:
- HERO_REDESIGN_UX_UI.md (analyse complète 9000 mots)
- HERO_V2_IMPLEMENTATION.md (guide technique 7000 mots)
- HERO_REFONTE_RESUME.md (résumé exécutif)

🚀 Prêt pour production"

if [ $? -eq 0 ]; then
    echo "✅ Commit créé avec succès"
else
    echo "❌ Erreur lors de la création du commit"
    exit 1
fi

echo ""
echo "🌐 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ DÉPLOIEMENT RÉUSSI!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌍 Votre site sera mis à jour dans 2-3 minutes sur:"
    echo "   https://sly31-ci.github.io/ProAshburn-Decor-Styling/"
    echo ""
    echo "🔍 Vérifications recommandées après déploiement:"
    echo "   1. Vider le cache du navigateur (Ctrl+Shift+R)"
    echo "   2. Vérifier que le badge supérieur s'affiche"
    echo "   3. Vérifier le nouveau titre H1"
    echo "   4. Tester les CTAs (clics)"
    echo "   5. Vérifier responsive (mobile/tablet/desktop)"
    echo "   6. Tester accessibilité (navigation clavier)"
    echo ""
    echo "📊 Prochaines étapes:"
    echo "   - Faire le test des 5 secondes avec 5 personnes"
    echo "   - Configurer Google Analytics si pas déjà fait"
    echo "   - Surveiller les KPIs (taux de rebond, conversion)"
    echo "   - Lancer des tests A/B sur variantes du titre"
    echo ""
    echo "📚 Documentation complète disponible dans:"
    echo "   - HERO_REDESIGN_UX_UI.md"
    echo "   - HERO_V2_IMPLEMENTATION.md"
    echo "   - HERO_REFONTE_RESUME.md"
    echo ""
    echo "🎉 Félicitations! La HERO section V2 est maintenant en ligne!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo ""
    echo "❌ Erreur lors du push"
    echo "   Vérifiez votre connexion internet et vos permissions GitHub"
    exit 1
fi

echo ""
