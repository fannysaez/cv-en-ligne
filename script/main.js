
// script.js
document.getElementById('transition-btn').addEventListener('click', function () {
    const overlay = document.querySelector('.transition-overlay');
    overlay.style.transform = 'translateX(-100%)'; // Lance le slide vers la gauche
  
    // Attendre la fin de l'animation avant de rediriger vers la nouvelle page
    setTimeout(() => {
      window.location.href = 'a-propos.html'; // Redirige vers la page À Propos
    }, 800); // La durée doit correspondre au `transition` dans le CSS
  });
  