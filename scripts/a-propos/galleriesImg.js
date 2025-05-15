document.addEventListener('DOMContentLoaded', function () {
    // ----- Gestion de la galerie existante -----
    // Sélectionner tous les ensembles de thumbnails (pour supporter plusieurs galeries)
    document.querySelectorAll('.project-gallery').forEach(gallery => {
        const thumbs = gallery.querySelectorAll('.gallery-thumb');
        const mainImg = gallery.querySelector('.gallery-main-img');

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

    // ----- Configuration pour la lightbox (zoom) -----
    // Vérifier si la lightbox existe déjà dans le document
    let lightbox = document.getElementById('image-lightbox');

    // Si la lightbox n'existe pas, la créer et l'ajouter au document
    if (!lightbox) {
        const lightboxHTML = `
        <div id="image-lightbox" class="lightbox">
            <span class="close-lightbox">&times;</span>
            <div class="lightbox-content">
                <img src="" alt="" id="lightbox-img" class="lightbox-img">
                <div class="lightbox-caption"></div>
                <div class="lightbox-controls">
                    <button class="lightbox-prev">&lt;</button>
                    <button class="lightbox-next">&gt;</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        lightbox = document.getElementById('image-lightbox');
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const nextBtn = document.querySelector('.lightbox-next');
    const prevBtn = document.querySelector('.lightbox-prev');
    
    // Index de l'image courante dans la lightbox et référence à la galerie active
    let currentIndex = 0;
    let activeGalleryImages = [];
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(src, alt, gallery, index) {
        // Mettre à jour la référence à la galerie active
        activeGalleryImages = Array.from(gallery.querySelectorAll('.gallery-thumb'));
        
        lightbox.classList.add('show');
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = alt;
        currentIndex = index;
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
    }
    
    // Fonction pour fermer la lightbox
    function closeLightboxFn() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Restaurer le défilement
    }
    
    // Fonction pour naviguer vers l'image suivante
    function showNextImage() {
        currentIndex = (currentIndex + 1) % activeGalleryImages.length;
        const nextThumb = activeGalleryImages[currentIndex];
        lightboxImg.src = nextThumb.getAttribute('data-src');
        lightboxImg.alt = nextThumb.alt;
        lightboxCaption.textContent = nextThumb.alt;
    }
    
    // Fonction pour naviguer vers l'image précédente
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
        const prevThumb = activeGalleryImages[currentIndex];
        lightboxImg.src = prevThumb.getAttribute('data-src');
        lightboxImg.alt = prevThumb.alt;
        lightboxCaption.textContent = prevThumb.alt;
    }
    
    // Ajouter des écouteurs d'événements pour toutes les galeries
    document.querySelectorAll('.project-gallery').forEach(gallery => {
        // Ouvrir la lightbox en cliquant sur l'image principale
        const galleryMainImg = gallery.querySelector('.gallery-main-img');
        if (galleryMainImg) {
            galleryMainImg.addEventListener('click', function() {
                const activeThumb = gallery.querySelector('.gallery-thumb.active') || gallery.querySelector('.gallery-thumb');
                const galleryThumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
                const index = galleryThumbs.indexOf(activeThumb);
                openLightbox(this.src, this.alt, gallery, index);
            });
        }
        
        // Ouvrir la lightbox en double-cliquant sur les thumbnails
        const galleryThumbs = gallery.querySelectorAll('.gallery-thumb');
        galleryThumbs.forEach((thumb, index) => {
            thumb.addEventListener('dblclick', function() {
                openLightbox(this.getAttribute('data-src'), this.alt, gallery, index);
            });
        });
    });
    
    // Fermer la lightbox avec le bouton de fermeture
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFn);
    }
    
    // Fermer la lightbox en cliquant en dehors de l'image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFn();
        }
    });
    
    // Navigation avec les boutons
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
    }
    
    // Navigation avec le clavier
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeLightboxFn();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });
});

//Galleries images pour l'atelier du bois - bouton voir plus de projets
