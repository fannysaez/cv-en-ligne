document.addEventListener('DOMContentLoaded', function () {
    const circles = document.querySelectorAll('.outer-circle');

    circles.forEach(circle => {
        let percentage = parseInt(circle.getAttribute('data-percentage'));
        let percentText = circle.querySelector('.inner-circle span');
        let initialValue = 0;

        // Réinitialiser les valeurs
        percentText.textContent = '0%';
        circle.style.background = `conic-gradient(var(--accent-color) 0deg, var(--progress-bg) 0deg)`;

        // Animation progressive avec ralentissement
        const animate = () => {
            if (initialValue < percentage) {
                // Ralentir progressivement à l'approche de la valeur finale
                let increment = 1;
                let remainingDistance = percentage - initialValue;

                // Plus on s'approche de la fin, plus l'incrément est petit
                if (remainingDistance < 10) {
                    increment = 0.5;
                }
                if (remainingDistance < 5) {
                    increment = 0.2;
                }

                initialValue += increment;

                // Mise à jour de l'affichage
                const degrees = Math.min(360, (initialValue / 100) * 360);
                circle.style.background = `conic-gradient(var(--accent-color) ${degrees}deg, var(--progress-bg) 0deg)`;
                percentText.textContent = Math.round(initialValue) + '%';

                // Ralentir le timing à l'approche de la valeur finale
                let delay = 15; // Vitesse de base
                if (remainingDistance < 20) {
                    delay = 25;
                }
                if (remainingDistance < 10) {
                    delay = 40;
                }
                if (remainingDistance < 5) {
                    delay = 60;
                }

                setTimeout(animate, delay);
            }
        };

        animate();
    });
});

// Fonction pour le toggle du thème (démo)
function toggleTheme() {
    document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'dark' ? '' : 'dark');
}

// Animation au scroll
window.addEventListener('scroll', function () {
    const skills = document.querySelector('.skills');
    if (!skills) return;

    const position = skills.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (position < screenPosition) {
        const circles = document.querySelectorAll('.outer-circle');
        circles.forEach(circle => {
            // Vérifier si l'animation a déjà été effectuée
            if (circle.getAttribute('data-animated') === 'true') return;

            let percentage = parseInt(circle.getAttribute('data-percentage'));
            let percentText = circle.querySelector('.inner-circle span');
            let initialValue = 0;

            // Marquer comme animé
            circle.setAttribute('data-animated', 'true');

            // Réinitialiser les valeurs
            percentText.textContent = '0%';
            circle.style.background = `conic-gradient(var(--accent-color) 0deg, var(--progress-bg) 0deg)`;

            // Animation progressive avec ralentissement
            const animate = () => {
                if (initialValue < percentage) {
                    // Ralentir progressivement à l'approche de la valeur finale
                    let increment = 1;
                    let remainingDistance = percentage - initialValue;

                    // Plus on s'approche de la fin, plus l'incrément est petit
                    if (remainingDistance < 10) {
                        increment = 0.5;
                    }
                    if (remainingDistance < 5) {
                        increment = 0.2;
                    }

                    initialValue += increment;

                    // Mise à jour de l'affichage
                    const degrees = Math.min(360, (initialValue / 100) * 360);
                    circle.style.background = `conic-gradient(var(--accent-color) ${degrees}deg, var(--progress-bg) 0deg)`;
                    percentText.textContent = Math.round(initialValue) + '%';

                    // Ralentir le timing à l'approche de la valeur finale
                    let delay = 15; // Vitesse de base
                    if (remainingDistance < 20) {
                        delay = 25;
                    }
                    if (remainingDistance < 10) {
                        delay = 40;
                    }
                    if (remainingDistance < 5) {
                        delay = 60;
                    }

                    setTimeout(animate, delay);
                }
            };

            animate();
        });
    }
});