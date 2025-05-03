// JavaScript pour l'accordéon des formations
document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.timeline-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle active class on the header
            this.classList.toggle('active');

            // Get the corresponding content
            const content = this.nextElementSibling;

            // Toggle active class on the content
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
});

// JavaScript pour le changement de thème
document.getElementById('theme-toggle').addEventListener('change', function () {
    document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
});

// Bouton au click pour afficher/masquer mes projets via GitHub

// Sélectionner les éléments HTML
const profileDiv = document.getElementById("profile");
const reposDiv = document.getElementById("repos");
const display = document.querySelector("#bouton2");

// Utilisateur GitHub public
const username = "fannysaez";

// Fonction pour récupérer et afficher le profil GitHub
async function fetchGitHubProfile(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`GitHub user not found: ${response.statusText}`);
        }
        const data = await response.json();

        const profileHTML = `
            <img src="${data.avatar_url}" alt="${data.login}'s avatar" style="width: 150px; border-radius: 50%; margin-bottom: 10px;">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "Voici les différents projets que j'ai pu réaliser. <br>Acutellement en formation chez Simplon!"}</p><br>
            <p>Public Repositories: ${data.public_repos}</p>
        `;
        profileDiv.innerHTML = profileHTML;
    } catch (error) {
        profileDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
}

// Fonction pour récupérer et afficher les dépôts GitHub
async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`GitHub repos not found: ${response.statusText}`);
        }
        const repos = await response.json();

        // Trier les dépôts par date de mise à jour dans l'ordre décroissant
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Limiter l'affichage à 6 dépôts
        const limitedRepos = repos.slice(0, 6);

        const reposHTML = limitedRepos.map(repo => `
            <div style="margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: var(--accordion-bg); color: var(--text-color); box-shadow: var(--card-shadow);">
                <h3 style="margin: 0;"><a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: var(--accent-color);">${repo.name}</a></h3>
                <p style="margin: 5px 0;">${repo.description || "Aucune description."}</p>
                <p style="font-size: 12px; color: var(--text-color);">Dernière mise à jour : ${new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
        `).join("");

        // Afficher les dépôts limités
        reposDiv.innerHTML = reposHTML;

        // Ajouter un lien pour afficher plus de dépôts
        if (repos.length > 6) {
            reposDiv.innerHTML += `
                <div style="margin-top: 15px; text-align: center;">
                    <a href="${repos[0].owner.html_url}/repos" target="_blank" style="text-decoration: none; color: var(--accent-color);">Voir plus de projets</a>
                </div>
            `;
        }
    } catch (error) {
        reposDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
}

// Gestion du clic pour afficher / masquer les dépôts
let isVisible = false;

display.addEventListener("click", async () => {
    if (!isVisible) {
        display.textContent = "Masquer les projets";
        await fetchGitHubRepos(username);
        isVisible = true;
    } else {
        reposDiv.innerHTML = "";
        display.textContent = "Afficher mes projets";
        isVisible = false;
    }
});

// Chargement initial du profil
fetchGitHubProfile(username);
