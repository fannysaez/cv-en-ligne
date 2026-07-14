## 🛠️ Fichiers JavaScript et fonctionnalités

### Pour la page d'accueil
- **loader.js** : Gère l'animation de chargement
- **slideLeftDegradeColors.js** : Crée l'effet de dégradé de couleurs

#### 🖼️ Capture d'écran
![Page détaillée](../assets/Accueil/Page%20accueil.png)


### Pour la page détaillée
- **header-buttonToggle.js** : Gère le menu hamburger
- **accordeon-experiences.js** : Implémente l'accordéon des expériences (section "Expériences")
- **accordeon-formations.js** : Implémente l'accordéon de la timeline "Formations & Certifications"
- **theme-toggle.js** : Permet de passer du thème clair au thème sombre
- **skills-animation.js** : Anime les barres de progression des compétences
- **button-github.js** : Connexion à l'API GitHub pour lister mes dépôts, et gestion de la visionneuse du CV en PDF (ouverture/fermeture de la modale, impression, plein écran). Tant que le CV n'est pas encore en ligne, le flag `CV_DISPONIBLE` (en haut du fichier) est à `false` et le bouton "Voir mon CV PDF" affiche un message d'attente à la place ; le repasser à `true` une fois le PDF déposé dans `assets/docs-print/`.
- **popup.js** : Gère l'ouverture/fermeture des popups de détails pour chaque réalisation
- **zoomImg.js** : Permet de zoomer/déplacer les images à l'intérieur des popups de réalisations
- **formContact.js** : Gère l'envoi du formulaire de contact
- **truncateText.js** : Tronque les textes trop longs dans les descriptions ou les parcours pour un affichage compact.
- **scrollDownButtonBio.js** : Ajoute un bouton pour faire défiler jusqu'à la bio
- **galleriesImg.js** : Galerie d'images avec fonction zoom

---

<p align="center">
<a href="../README.md">Suivant</a>
</p>