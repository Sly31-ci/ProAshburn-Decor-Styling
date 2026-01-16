# 🎛️ Back-Office CMS - Guide d'Utilisation

## 📋 Vue d'ensemble

Le **Back-Office CMS** vous permet de gérer tout le contenu de votre site web **sans toucher au code** !

---

## 🔐 Connexion

### Accès au Back-Office

**URL** : `http://localhost:8000/admin/`

**Identifiants par défaut** :
- **Utilisateur** : `admin`
- **Mot de passe** : `admin123`

⚠️ **Important** : Changez le mot de passe dans les Paramètres après la première connexion !

---

## 🎨 Sections Gérables

### 1. **Hero Section** 🏠

Gérez la première section visible de votre site :

**Ce que vous pouvez modifier** :
- ✏️ Titre principal
- ✨ Titre surligné (avec gradient doré)
- 📝 Description
- 🔘 Texte des boutons CTA
- 📊 Statistiques (3 chiffres + labels)
- 🖼️ Image de fond

**Format image recommandé** : 1920x1080px, JPG ou PNG

---

### 2. **À Propos** 👥

Personnalisez votre présentation :

**Champs modifiables** :
- 🏷️ Tag (petit texte au-dessus)
- 📌 Titre principal
- 📝 Sous-titre
- 📄 Description complète
- 🖼️ Image de l'équipe

**Astuce** : Utilisez une description engageante qui raconte votre histoire !

---

### 3. **Services** 💼

Gérez vos 3 services principaux :

**Pour chaque service** :
- 📌 Titre du service
- 📝 Description
- ✅ Liste de caractéristiques (une par ligne)
- 🖼️ Image illustrative

**Format image** : 800x600px minimum

---

### 4. **Portfolio** 🎨

Ajoutez et gérez vos projets :

**Fonctionnalités** :
- ➕ Ajouter un nouveau projet
- ✏️ Modifier un projet existant
- 🗑️ Supprimer un projet
- 🏷️ Catégoriser (Intérieur, Extérieur, Événement)
- 🔖 Ajouter des tags

**Pour chaque projet** :
- Titre
- Catégorie
- Description
- Tags (séparés par des virgules)
- Image

---

### 5. **Témoignages** 💬

Gérez les avis clients :

**Champs** :
- 👤 Nom du client
- 💼 Service utilisé
- 💭 Témoignage complet
- ⭐ Note (1 à 5 étoiles)
- 🖼️ Photo du client (optionnel)

---

### 6. **Paramètres** ⚙️

Configuration générale du site :

**Informations générales** :
- 🏢 Nom du site
- 📧 Email de contact
- 📞 Téléphone
- 📍 Adresse

**Réseaux sociaux** :
- Facebook URL
- Instagram URL
- Pinterest URL

**Sécurité** :
- 🔒 Changer le mot de passe admin

---

## 💾 Sauvegarde des Modifications

### Comment sauvegarder ?

1. **Modifier** les champs souhaités
2. **Cliquer** sur le bouton "Sauvegarder" (en haut à droite)
3. **Confirmation** : Un message "Modifications sauvegardées !" apparaît

### Où sont stockées les données ?

Les données sont sauvegardées dans le **localStorage** du navigateur sous forme JSON.

**Fichier** : `cms_content` (localStorage)

⚠️ **Attention** : Si vous videz le cache du navigateur, les données seront perdues. Pensez à faire des exports réguliers !

---

## 👁️ Prévisualisation

### Voir les modifications en temps réel

**Bouton "Prévisualiser"** (en haut à droite) :
- Ouvre le site principal dans un nouvel onglet
- Affiche les modifications sauvegardées
- Permet de vérifier le rendu avant publication

---

## 📤 Upload d'Images

### Comment uploader une image ?

1. **Cliquer** sur la zone "Cliquez ou glissez une image ici"
2. **Sélectionner** votre image (JPG, PNG)
3. **Aperçu** : L'image s'affiche immédiatement
4. **Sauvegarder** pour appliquer

### Formats recommandés

| Section | Taille Recommandée | Format |
|---------|-------------------|--------|
| Hero Background | 1920x1080px | JPG |
| Services | 800x600px | JPG/PNG |
| Portfolio | 1200x800px | JPG |
| About | 1000x800px | JPG |
| Testimonials | 200x200px | JPG/PNG |

---

## 🔄 Workflow Recommandé

### Processus de mise à jour

1. **Connexion** au back-office
2. **Navigation** vers la section à modifier
3. **Modification** des contenus
4. **Upload** des images si nécessaire
5. **Sauvegarde** des modifications
6. **Prévisualisation** pour vérifier
7. **Déconnexion** sécurisée

---

## 🛡️ Sécurité

### Bonnes Pratiques

✅ **À FAIRE** :
- Changer le mot de passe par défaut
- Se déconnecter après chaque session
- Faire des sauvegardes régulières
- Utiliser un mot de passe fort

❌ **À NE PAS FAIRE** :
- Partager vos identifiants
- Laisser la session ouverte
- Utiliser le mot de passe par défaut
- Vider le cache sans backup

---

## 🐛 Dépannage

### Problèmes Courants

**1. "Impossible de se connecter"**
- Vérifier les identifiants (admin / admin123)
- Vider le cache et réessayer
- Vérifier que JavaScript est activé

**2. "Les modifications ne s'affichent pas"**
- Cliquer sur "Sauvegarder"
- Rafraîchir la page de prévisualisation (Ctrl+F5)
- Vérifier que les données sont dans localStorage

**3. "L'image ne s'upload pas"**
- Vérifier le format (JPG, PNG uniquement)
- Vérifier la taille (< 5MB recommandé)
- Essayer avec une autre image

**4. "Données perdues après fermeture"**
- Toujours cliquer sur "Sauvegarder"
- Ne pas vider le cache navigateur
- Faire des exports réguliers

---

## 📊 Export/Import de Données

### Export manuel

Pour sauvegarder vos données :

1. Ouvrir la **Console Développeur** (F12)
2. Taper : `localStorage.getItem('cms_content')`
3. Copier le résultat
4. Sauvegarder dans un fichier `.json`

### Import manuel

Pour restaurer des données :

1. Ouvrir la **Console Développeur** (F12)
2. Taper : `localStorage.setItem('cms_content', 'VOTRE_JSON_ICI')`
3. Rafraîchir la page

---

## 🚀 Fonctionnalités Avancées

### Ordre d'Affichage

**Portfolio** :
- Les projets s'affichent dans l'ordre d'ajout
- Pour réorganiser : supprimer et recréer dans l'ordre souhaité

**Services** :
- Ordre fixe (3 services)
- Modifier le contenu mais pas l'ordre

**Témoignages** :
- Ordre d'affichage = ordre dans le CMS
- Slider automatique sur le site

---

## 📞 Support

### Besoin d'aide ?

**Documentation** :
- Ce guide
- `TECHNICAL_DOC.md` pour détails techniques

**Contact Développeur** :
- Pour questions techniques
- Pour personnalisations avancées
- Pour formation supplémentaire

---

## ✅ Checklist de Démarrage

Avant de commencer à utiliser le CMS :

- [ ] Accéder au back-office (`/admin/`)
- [ ] Se connecter avec identifiants par défaut
- [ ] Changer le mot de passe (Paramètres)
- [ ] Tester la modification d'une section
- [ ] Sauvegarder et prévisualiser
- [ ] Faire un export de sauvegarde
- [ ] Se déconnecter

---

## 🎯 Résumé

Le **Back-Office CMS** vous permet de :

✅ Modifier **tous les textes** du site  
✅ Uploader et gérer **toutes les images**  
✅ Ajouter/Supprimer des **projets portfolio**  
✅ Gérer les **témoignages clients**  
✅ Configurer les **informations de contact**  
✅ **Prévisualiser** avant publication  
✅ **Sauvegarder** facilement  

**Sans jamais toucher au code !** 🎉

---

**Version** : 1.0.0  
**Date** : 16 janvier 2026  
**Développé par** : Antigravity AI
