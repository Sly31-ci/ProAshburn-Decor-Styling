# 🔄 Portfolio Éditable - Guide de Rafraîchissement

## ⚠️ PROBLÈME : Ancienne Version Affichée

Vous voyez encore l'ancienne version du formulaire portfolio (page informative).

---

## ✅ SOLUTIONS

### Solution 1 : Vider le Cache (RECOMMANDÉ)

**Chrome/Edge** :
1. Ouvrir le CMS : `http://localhost:8000/admin/`
2. Appuyer sur **`Ctrl + Shift + R`** (Windows/Linux)
3. Ou **`Cmd + Shift + R`** (Mac)
4. Ou **F12** → Clic droit sur refresh → "Empty Cache and Hard Reload"

**Firefox** :
1. **`Ctrl + Shift + Delete`**
2. Cocher "Cache"
3. Cliquer "Effacer maintenant"
4. Rafraîchir la page

---

### Solution 2 : Mode Incognito

**Chrome** :
- **`Ctrl + Shift + N`**
- Aller sur `http://localhost:8000/admin/`
- Se connecter : admin / admin123
- Aller sur Portfolio

**Firefox** :
- **`Ctrl + Shift + P`**
- Même procédure

---

### Solution 3 : Redémarrer le Serveur Local

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis relancer :
cd /home/syzon/Documents/ProAshburnDecorAndStyling
python3 -m http.server 8000
```

Ensuite :
1. Ouvrir `http://localhost:8000/admin/`
2. Vider cache (**Ctrl + Shift + R**)
3. Se connecter
4. Aller sur Portfolio

---

### Solution 4 : Vérifier le Fichier Directement

**Vérifier que le fichier est bien à jour** :

```bash
grep -A 10 "loadPortfolioForm()" admin/js/admin.js | head -15
```

**Vous devriez voir** :
```javascript
loadPortfolioForm() {
  const data = this.contentData.portfolio || {
    items: [
      {
        id: 1,
        title: 'Salon Moderne Minimaliste',
        // ...
```

**Si vous voyez** :
```javascript
loadPortfolioForm() {
  const html = `
    <div class="form-section">
      <h2 class="form-section-title">Portfolio</h2>
      <p class="form-description">Le portfolio est géré...
```

→ Le fichier n'est pas à jour localement !

---

## 🔍 Diagnostic

### Vérifier la Version du Fichier

```bash
# Voir la date de modification
ls -lh admin/js/admin.js

# Voir les dernières lignes modifiées
tail -20 admin/js/admin.js
```

### Vérifier Git

```bash
# Vérifier que les changements sont bien commités
git status

# Voir le dernier commit
git log --oneline -1

# Devrait afficher :
# 0b1ce3f feat: Add enhanced styles and fully editable portfolio form
```

---

## ✅ CE QUE VOUS DEVRIEZ VOIR

### Nouveau Formulaire Portfolio

**Après rafraîchissement, vous devriez voir** :

1. **Titre** : "Gestion du Portfolio"
2. **Description** : "Modifiez les titres, descriptions..."
3. **Grille de 9 projets** avec :
   - Image preview
   - Badge catégorie coloré
   - Champ titre (input)
   - Select catégorie
   - Textarea description
   - Input chemin image
   - Bouton "Changer l'image" au hover

**PAS** :
- ❌ "Le portfolio est géré dynamiquement via..."
- ❌ Instructions pour éditer `main.js`
- ❌ Info boxes seulement

---

## 🚀 PROCÉDURE COMPLÈTE

### Étape par Étape

**1. Arrêter le serveur local** (si en cours)
```bash
# Dans le terminal où tourne le serveur
Ctrl + C
```

**2. Vérifier les fichiers**
```bash
cd /home/syzon/Documents/ProAshburnDecorAndStyling
git status
# Devrait dire "nothing to commit, working tree clean"
```

**3. Relancer le serveur**
```bash
python3 -m http.server 8000
```

**4. Ouvrir en mode incognito**
- Chrome : `Ctrl + Shift + N`
- Aller sur `http://localhost:8000/admin/`

**5. Se connecter**
- Username : `admin`
- Password : `admin123`

**6. Cliquer sur "Portfolio"**

**7. Vérifier**
- ✅ Grille de 9 projets visible ?
- ✅ Images affichées ?
- ✅ Champs éditables ?

---

## 🐛 Si Toujours Problème

### Vérifier le Fichier admin.js

```bash
# Compter les lignes
wc -l admin/js/admin.js
# Devrait afficher : 1625 admin/js/admin.js

# Chercher la nouvelle méthode
grep -n "getCategoryLabel" admin/js/admin.js
# Devrait trouver la ligne
```

### Forcer la Mise à Jour

```bash
# Supprimer le cache du navigateur manuellement
rm -rf ~/.cache/google-chrome/
# ou
rm -rf ~/.mozilla/firefox/

# Puis relancer le navigateur
```

---

## 📊 Comparaison Versions

### Ancienne Version (❌ Ce que vous voyez)
```html
<div class="info-box">
  <h3>📁 Images Portfolio</h3>
  <p>Les images du portfolio sont stockées dans...</p>
</div>
```

### Nouvelle Version (✅ Ce que vous devriez voir)
```html
<div class="portfolio-items-grid">
  <div class="portfolio-item-card">
    <div class="portfolio-image-container">
      <img src="assets/images/portfolio/interior-1.jpg">
      <div class="portfolio-image-overlay">
        <button class="image-change-btn">📷 Changer l'image</button>
      </div>
    </div>
    ...
  </div>
</div>
```

---

## ✅ SOLUTION RAPIDE

**La plus simple** :

1. **Ctrl + Shift + R** (vider cache)
2. Si ça ne marche pas → **Mode incognito**
3. Si toujours pas → **Redémarrer serveur**

---

## 🎯 Résultat Attendu

Après rafraîchissement correct, vous devriez voir :

- ✅ **9 cartes** de projets en grille
- ✅ **Images** avec preview
- ✅ **Badges** colorés (vert/bleu/orange)
- ✅ **4 champs** éditables par projet
- ✅ **Hover** sur image → bouton apparaît
- ✅ **Modifier** un champ → isDirty = true

---

**Créé le** : 16 janvier 2026  
**Status** : ✅ Fichiers à jour sur GitHub  
**Action** : Vider le cache navigateur
