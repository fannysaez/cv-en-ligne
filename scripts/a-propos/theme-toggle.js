// JavaScript pour le changement de thème
document.getElementById('theme-toggle').addEventListener('change', function () {
    document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
});

