// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments nécessaires
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const modal = document.getElementById('contact-modal');
    const modalOpenBtn = document.getElementById('contact-modal-open');
    const closeModal = document.querySelector('.close-modal');
    
    // Fonction pour ouvrir la modale
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour fermer la modale
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Ouvrir la modale
    if (modalOpenBtn) {
        modalOpenBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openModal();
        });
    }
    
    // Fermer la modale
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Fermer la modale en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Gérer l'envoi du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formStatus.textContent = "Envoi en cours...";
            formStatus.className = "form-status";
            formStatus.style.display = "block";

            // Envoi des données via FormSubmit
            fetch(contactForm.action, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(new FormData(contactForm))
            })
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                return response.text();
            })
            .then(() => {
                formStatus.textContent = "Message envoyé avec succès !";
                formStatus.className = "form-status success-message";
                contactForm.reset();
                setTimeout(() => {
                    closeModalFunc();
                    setTimeout(() => {
                        formStatus.style.display = "none";
                    }, 300);
                }, 2000);
            })
            .catch(() => {
                formStatus.textContent = "Une erreur s'est produite. Veuillez réessayer.";
                formStatus.className = "form-status error-message";
            });
        });
    }
});
