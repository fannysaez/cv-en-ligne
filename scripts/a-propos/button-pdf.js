// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script PDF chargé');
    
    // Ouvre la modal PDF
    const openPdfBtn = document.getElementById('openPdfViewer');
    const pdfModal = document.getElementById('pdfModal');
    const closePdfBtn = document.getElementById('closePdfModal');
    
    console.log('Éléments trouvés:', { openPdfBtn, pdfModal, closePdfBtn });
    
    if (openPdfBtn && pdfModal) {
        openPdfBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Ouverture de la modal PDF');
            pdfModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    } else {
        console.error('Éléments manquants pour la modal PDF');
    }
    
    // Test du chemin PDF
    const iframe = document.getElementById('pdf-viewer');
    if (iframe) {
        iframe.onload = function() {
            console.log('PDF chargé avec succès');
        };
        iframe.onerror = function() {
            console.error('Erreur lors du chargement du PDF');
        };
        console.log('Chemin du PDF:', iframe.src);
    }
    
    // Ferme la modal PDF
    if (closePdfBtn && pdfModal) {
        closePdfBtn.onclick = function() {
            console.log('Fermeture de la modal PDF');
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
        };
    }
    
    // Fermer la modal en cliquant à l'extérieur
    if (pdfModal) {
        pdfModal.onclick = function(e) {
            if (e.target === pdfModal) {
                console.log('Fermeture de la modal PDF (clic extérieur)');
                pdfModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
    }
    
    // Imprimer le PDF
    const printPdfBtn = document.getElementById('print-pdf');
    if (printPdfBtn) {
        printPdfBtn.onclick = function() {
            console.log('Tentative d\'impression du PDF');
            const iframe = document.getElementById('pdf-viewer');
            if (iframe) {
                try {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                } catch (error) {
                    console.error('Erreur lors de l\'impression:', error);
                    // Fallback : ouvrir le PDF dans un nouvel onglet pour impression
                    window.open(iframe.src, '_blank');
                }
            }
        };
    }
    
    // Plein écran
    const fullscreenPdfBtn = document.getElementById('fullscreen-pdf');
    if (fullscreenPdfBtn) {
        fullscreenPdfBtn.onclick = function() {
            console.log('Tentative de plein écran');
            const iframe = document.getElementById('pdf-viewer');
            if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            }
        };
    }
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfModal && pdfModal.style.display === 'flex') {
            console.log('Fermeture de la modal PDF (touche Échap)');
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});