// ============================================
// Header : bouton de bascule pour le menu
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Afficher/masquer le menu au clic sur le bouton
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Masquer le menu lorsqu'on clique en dehors
document.addEventListener('click', (event) => {
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    menu.classList.remove('active');
  }
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