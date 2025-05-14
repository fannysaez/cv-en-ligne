// Fonction pour gérer le zoom sur les images
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer toutes les images zoomables
    const zoomableImages = document.querySelectorAll('.zoomable-img');

    zoomableImages.forEach(img => {
        let scale = 1;
        let translateX = 0;
        let translateY = 0;
        let isDragging = false;
        let startX, startY, lastX, lastY;

        // Récupérer les boutons de zoom pour cette image
        const container = img.closest('.zoomable-container');
        const zoomInBtn = container.querySelector('.zoom-in');
        const zoomOutBtn = container.querySelector('.zoom-out');
        const zoomResetBtn = container.querySelector('.zoom-reset');

        // Fonction pour appliquer la transformation
        function applyTransform() {
            img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }

        // Fonction pour zoomer
        function zoomIn() {
            scale = Math.min(scale + 0.2, 3); // Limite le zoom à 3x
            applyTransform();
        }

        // Fonction pour dézoomer
        function zoomOut() {
            scale = Math.max(scale - 0.2, 1); // Ne pas zoomer en dessous de 1x
            if (scale === 1) {
                translateX = 0;
                translateY = 0;
            }
            applyTransform();
        }

        // Fonction pour réinitialiser le zoom
        function resetZoom() {
            scale = 1;
            translateX = 0;
            translateY = 0;
            applyTransform();
        }

        // Événements des boutons
        zoomInBtn.addEventListener('click', zoomIn);
        zoomOutBtn.addEventListener('click', zoomOut);
        zoomResetBtn.addEventListener('click', resetZoom);

        // Gérer le déplacement avec la souris
        img.addEventListener('mousedown', function (e) {
            if (scale > 1) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                lastX = translateX;
                lastY = translateY;
                img.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                // Limiter le déplacement en fonction du zoom
                const maxTranslateX = container.offsetWidth * (scale - 1);
                const maxTranslateY = container.offsetHeight * (scale - 1);

                translateX = Math.min(Math.max(lastX + dx, -maxTranslateX / 2), maxTranslateX / 2);
                translateY = Math.min(Math.max(lastY + dy, -maxTranslateY / 2), maxTranslateY / 2);

                applyTransform();
            }
        });

        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                img.style.cursor = 'move';
            }
        });

        // Prise en charge du zoom avec la molette de la souris
        img.addEventListener('wheel', function (e) {
            e.preventDefault();

            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });

        // Support tactile pour les appareils mobiles
        let touchStartX, touchStartY;
        let initialDistance = 0;

        img.addEventListener('touchstart', function (e) {
            if (e.touches.length === 1) {
                // Mode déplacement
                isDragging = true;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                lastX = translateX;
                lastY = translateY;
            } else if (e.touches.length === 2) {
                // Mode pincement pour zoomer
                initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
            e.preventDefault();
        });

        img.addEventListener('touchmove', function (e) {
            if (isDragging && e.touches.length === 1) {
                // Déplacement
                const dx = e.touches[0].clientX - touchStartX;
                const dy = e.touches[0].clientY - touchStartY;

                // Limiter le déplacement en fonction du zoom
                const maxTranslateX = container.offsetWidth * (scale - 1);
                const maxTranslateY = container.offsetHeight * (scale - 1);

                translateX = Math.min(Math.max(lastX + dx, -maxTranslateX / 2), maxTranslateX / 2);
                translateY = Math.min(Math.max(lastY + dy, -maxTranslateY / 2), maxTranslateY / 2);

                applyTransform();
            } else if (e.touches.length === 2) {
                // Zoom par pincement
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );

                if (initialDistance > 0) {
                    const delta = currentDistance - initialDistance;
                    if (Math.abs(delta) > 10) { // Éviter les petits mouvements accidentels
                        if (delta > 0) {
                            zoomIn();
                        } else {
                            zoomOut();
                        }
                        initialDistance = currentDistance;
                    }
                }
            }
            e.preventDefault();
        });

        img.addEventListener('touchend', function () {
            isDragging = false;
            initialDistance = 0;
        });

        // Double-clic pour zoomer/réinitialiser
        img.addEventListener('dblclick', function () {
            if (scale === 1) {
                scale = 2;
                // Centre le zoom sur le point cliqué
                applyTransform();
            } else {
                resetZoom();
            }
        });
    });
});