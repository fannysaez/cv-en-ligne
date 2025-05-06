
// ============================================
// Section : Expériences (accordéon)
// ============================================
// JavaScript pour la fonctionnalité d'accordéon
document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Fermer tous les accordéons
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
            });

            // Ouvrir celui qui est cliqué (sauf s’il était déjà ouvert)
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
