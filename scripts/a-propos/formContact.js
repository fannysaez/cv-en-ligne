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
        // Empêche le défilement du body quand la modale est ouverte
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour fermer la modale
    function closeModalFunc() {
        modal.classList.remove('active');
        // Rétablit le défilement du body
        document.body.style.overflow = '';
    }
    
    // Ajouter des écouteurs d'événements pour ouvrir/fermer la modale
    if (modalOpenBtn) {
        modalOpenBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            openModal();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Fermer la modale si on clique en dehors du contenu
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Fermer la modale avec la touche Echap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Empêcher le comportement par défaut (rechargement de la page)
            event.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simuler l'envoi du formulaire (à remplacer par votre logique d'envoi réelle)
            formStatus.innerHTML = "Envoi en cours...";
            formStatus.className = "form-status";
            formStatus.style.display = "block";
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                // Simuler une réponse réussie
                // Note: Dans une implémentation réelle, vous vérifieriez la réponse du serveur
                const success = true;
                
                if (success) {
                    formStatus.innerHTML = "Message envoyé avec succès !";
                    formStatus.className = "form-status success-message";
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Fermer la modale après un délai
                    setTimeout(function() {
                        closeModalFunc();
                        // Réinitialiser l'état du message après fermeture
                        setTimeout(function() {
                            formStatus.style.display = "none";
                        }, 300);
                    }, 2000);
                } else {
                    formStatus.innerHTML = "Une erreur s'est produite. Veuillez réessayer.";
                    formStatus.className = "form-status error-message";
                }
            }, 1500);
            
            // Pour une implémentation réelle avec un service comme FormSubmit ou Formspree:
            
            fetch("https://formsubmit.co/fanny.saez.0486@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                formStatus.innerHTML = "Message envoyé avec succès !";
                formStatus.className = "form-status success-message";
                contactForm.reset();
                
                // Fermer la modale après un délai
                setTimeout(function() {
                    closeModalFunc();
                }, 2000);
            })
            .catch(error => {
                formStatus.innerHTML = "Une erreur s'est produite. Veuillez réessayer.";
                formStatus.className = "form-status error-message";
            });
            
        });
    }
});