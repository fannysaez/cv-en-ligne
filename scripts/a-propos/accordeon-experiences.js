
// ============================================
// Section : Expériences (accordéon)
// ============================================
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isVisible = content.style.display === 'block';

        // Cacher tous les autres contenus
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.style.display = 'none';
            }
        });

        // Afficher ou cacher le contenu courant
        content.style.display = isVisible ? 'none' : 'block';
    });
});