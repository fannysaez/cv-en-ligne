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
            <p>${data.bio || "Voici les différents projets que j'ai pu réaliser. <br>Actuellement en formation chez Simplon !"}</p><br>
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

// Chargement initial du profil
fetchGitHubProfile(username);

// ===== GESTION DU PDF =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script PDF chargé dans button-github.js');
    
    // Éléments pour la modal PDF
    const openPdfBtn = document.getElementById('openPdfViewer');
    const pdfModal = document.getElementById('pdfModal');
    const closePdfBtn = document.getElementById('closePdfModal');
    
    console.log('Éléments PDF trouvés:', { openPdfBtn, pdfModal, closePdfBtn });
    
    // Ouvrir la modal PDF
    if (openPdfBtn && pdfModal) {
        openPdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Ouverture de la modal PDF');
            pdfModal.style.display = 'flex';
            pdfModal.style.visibility = 'visible';
            pdfModal.style.opacity = '1';
            document.body.style.overflow = 'hidden';
        });
    } else {
        console.error('Éléments manquants pour la modal PDF');
    }
    
    // Fermer la modal PDF
    if (closePdfBtn && pdfModal) {
        closePdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Fermeture de la modal PDF');
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Fermer en cliquant à l'extérieur
    if (pdfModal) {
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                console.log('Fermeture de la modal PDF (clic extérieur)');
                pdfModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Boutons de contrôle PDF
    const printPdfBtn = document.getElementById('print-pdf');
    const fullscreenPdfBtn = document.getElementById('fullscreen-pdf');
    
    // Imprimer le PDF
    if (printPdfBtn) {
        printPdfBtn.addEventListener('click', function() {
            console.log('Tentative d\'impression du PDF');
            const iframe = document.getElementById('pdf-viewer');
            if (iframe) {
                try {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                } catch (error) {
                    console.error('Erreur lors de l\'impression:', error);
                    window.open(iframe.src, '_blank');
                }
            }
        });
    }
    
    // Plein écran
    if (fullscreenPdfBtn) {
        fullscreenPdfBtn.addEventListener('click', function() {
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
        });
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