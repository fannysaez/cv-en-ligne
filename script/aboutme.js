// Header : bouton mode sombre et clair
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

//Section : Expériences (accordéon)
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isVisible = content.style.display === 'block';

      // Cacher tous les autres contenus
      document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');

      // Afficher ou cacher le contenu courant
      content.style.display = isVisible ? 'none' : 'block';
    });
  });

  
//Timeline Progress Bar
