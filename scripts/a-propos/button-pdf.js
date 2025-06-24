// Ouvre la modal PDF
document.getElementById('openPdfViewer').onclick = function () {
    document.getElementById('pdfModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
};
// Ferme la modal PDF
document.getElementById('closePdfModal').onclick = function () {
    document.getElementById('pdfModal').style.display = 'none';
    document.body.style.overflow = '';
};
// Imprimer le PDF
document.getElementById('print-pdf').onclick = function () {
    const iframe = document.getElementById('pdf-viewer');
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
};
// Plein écran
document.getElementById('fullscreen-pdf').onclick = function () {
    const iframe = document.getElementById('pdf-viewer');
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
};
