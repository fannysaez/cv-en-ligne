// JavaScript pour l'accordéon des formations
document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.timeline-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle active class on the header
            this.classList.toggle('active');

            // Get the corresponding content
            const content = this.nextElementSibling;

            // Toggle active class on the content
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
});

// JavaScript pour le changement de thème
document.getElementById('theme-toggle').addEventListener('change', function () {
    document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
});

// Bouton au click pour afficher mes projets via GitHub
