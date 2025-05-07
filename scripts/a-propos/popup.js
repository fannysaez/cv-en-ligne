// Fonction qui s'exécute quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function () {
    // Récupère tous les boutons qui déclenchent les popups
    const popupTriggers = document.querySelectorAll('.popup-trigger');

    // Pour chaque bouton, ajoute un écouteur d'événement
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            // Récupère l'ID du projet depuis l'attribut data-project
            const projectId = this.getAttribute('data-project');
            // Trouve la modal correspondante
            const modal = document.getElementById('popup-' + projectId);

            // Ouvre la modal
            if (modal) {
                modal.classList.add('show');
                // Empêche le défilement de la page en arrière-plan
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fermeture des modals lorsqu'on clique sur le X
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Trouve la modal parent
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                // Réactive le défilement de la page
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Fermeture des modals lorsqu'on clique en dehors de la modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function (event) {
            // Si on clique sur la modal (pas sur son contenu)
            if (event.target === this) {
                modal.classList.remove('show');
                // Réactive le défilement de la page
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Fermeture de la modal avec la touche Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                openModal.classList.remove('show');
                // Réactive le défilement de la page
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// JavaScript pour le fonctionnement du popup de projets avec débogage
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded déclenché');
    
    // Récupération des éléments avec vérification
    const openButton = document.getElementById('openProjectsPopup');
    const closeButton = document.getElementById('closeProjectsPopup');
    const popupOverlay = document.getElementById('projectsPopupOverlay');
    
    // Vérification des éléments
    console.log('Bouton ouverture trouvé:', !!openButton);
    console.log('Bouton fermeture trouvé:', !!closeButton);
    console.log('Overlay trouvé:', !!popupOverlay);

    // Ouvrir la popup avec gestion tactile améliorée
    if (openButton) {
        // Ajout de plusieurs types d'événements pour assurer la compatibilité mobile
        ['click', 'touchend'].forEach(function(eventType) {
            openButton.addEventListener(eventType, function(e) {
                console.log('Événement déclenché sur le bouton d\'ouverture:', eventType);
                e.preventDefault(); // Empêche le comportement par défaut
                popupOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    } else {
        console.error('Le bouton pour ouvrir la popup n\'a pas été trouvé');
    }

    // Fermer la popup avec le bouton de fermeture
    if (closeButton) {
        ['click', 'touchend'].forEach(function(eventType) {
            closeButton.addEventListener(eventType, function(e) {
                console.log('Événement de fermeture déclenché:', eventType);
                e.preventDefault();
                popupOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Fermer en cliquant en dehors du contenu de la popup
    if (popupOverlay) {
        ['click', 'touchend'].forEach(function(eventType) {
            popupOverlay.addEventListener(eventType, function(e) {
                if (e.target === popupOverlay) {
                    console.log('Fermeture via clic sur l\'overlay');
                    popupOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Ajout d'un gestionnaire global pour la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
            console.log('Fermeture via touche Escape');
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('Initialisation du popup terminée');
});