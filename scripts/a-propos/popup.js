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