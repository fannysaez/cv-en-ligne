// ============================================
// Header : bouton de bascule pour le menu
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const menuOverlay = document.getElementById('menu-overlay');
const menuClose = document.getElementById('menu-close');

function openMenu() {
  menu.classList.add('active');
  menuOverlay.classList.add('active');
}

function closeMenu() {
  menu.classList.remove('active');
  menuOverlay.classList.remove('active');
}

// Afficher/masquer le panneau au clic sur le bouton burger
menuToggle.addEventListener('click', () => {
  if (menu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Masquer le panneau au clic sur le bouton "✕"
menuClose.addEventListener('click', closeMenu);

// Masquer le panneau au clic sur le calque assombri
menuOverlay.addEventListener('click', closeMenu);

// Masquer le panneau avec la touche Échap
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('active')) {
    closeMenu();
  }
});

// Masquer le panneau lorsqu'on clique sur un lien de navigation
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// ============================================
// Header : bouton mode sombre et clair
// ============================================
const toggleSwitch = document.getElementById('theme-toggle');
const body = document.body;

// Charger le thème depuis localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
  toggleSwitch.checked = currentTheme === 'dark-mode';
}

// Écouteur pour changer le mode
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
});