// Fonction pour tronquer les paragraphes à un nombre spécifique de caractères
function truncateProjectDescriptions(maxLength = 150) {
    // Sélectionner tous les paragraphes dans les cartes de projet
    const projectParagraphs = document.querySelectorAll('.project-card p');

    // Parcourir chaque paragraphe
    projectParagraphs.forEach(paragraph => {
        const originalText = paragraph.textContent;

        // Si le texte est plus long que la limite
        if (originalText.length > maxLength) {
            // Tronquer le texte et ajouter "..."
            const truncatedText = originalText.substring(0, maxLength) + '...';

            // Mettre à jour le contenu du paragraphe
            paragraph.textContent = truncatedText;

            // Optionnel : Ajouter l'attribut title pour afficher le texte complet au survol
            paragraph.setAttribute('title', originalText);
        }
    });
}

// Appeler la fonction lorsque le document est chargé
document.addEventListener('DOMContentLoaded', function () {
    // Vous pouvez ajuster la valeur selon vos besoins (ici 188 caractères)
    truncateProjectDescriptions(188);
});