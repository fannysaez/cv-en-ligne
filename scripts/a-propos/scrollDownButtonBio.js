document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner le bouton de défilement
    const scrollDownBtn = document.querySelector('.scroll-down-btn');

    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function () {
            // Trouver la section suivante
            const currentSection = document.getElementById('aboutme');
            const nextSection = currentSection.nextElementSibling;

            if (nextSection) {
                // Faire défiler jusqu'à la section suivante avec une animation fluide
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});