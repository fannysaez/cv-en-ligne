document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les thumbnails
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const mainImg = document.querySelector('.gallery-main-img');

    // Ajouter des écouteurs d'événements à chaque thumbnail
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Mettre à jour l'image principale
            mainImg.src = this.getAttribute('data-src');
            mainImg.alt = this.alt;

            // Mettre à jour la classe active
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});