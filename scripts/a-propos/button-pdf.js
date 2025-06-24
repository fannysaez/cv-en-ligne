// ...existing code...

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Ouvre la modal PDF
    const openPdfBtn = document.getElementById('openPdfViewer');
    const pdfModal = document.getElementById('pdfModal');
    const closePdfBtn = document.getElementById('closePdfModal');
    
    if (openPdfBtn && pdfModal) {
        openPdfBtn.onclick = function(e) {
            e.preventDefault();
            pdfModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    }
    
    // Ferme la modal PDF
    if (closePdfBtn && pdfModal) {
        closePdfBtn.onclick = function() {
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
        };
    }
    
    // Fermer la modal en cliquant à l'extérieur
    if (pdfModal) {
        pdfModal.onclick = function(e) {
            if (e.target === pdfModal) {
                pdfModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
    }
    
    // Imprimer le PDF
    const printPdfBtn = document.getElementById('print-pdf');
    if (printPdfBtn) {
        printPdfBtn.onclick = function() {
            const iframe = document.getElementById('pdf-viewer');
            if (iframe) {
                try {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                } catch (error) {
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
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});