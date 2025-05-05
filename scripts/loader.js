document.addEventListener('DOMContentLoaded', function () {
  // Définition directe des couleurs au lieu d'utiliser des variables CSS
  const accentColor = '#24daf2';
  const backgroundColor = '#000000';
  const textColor = '#ffffff';
  const progressBgColor = '#333333';

  const loaderWrapper = document.createElement('div');
  loaderWrapper.className = 'particles-loader';

  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';

  const loaderContent = document.createElement('div');
  loaderContent.className = 'loader-content';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'loader-logo-container';
  logoContainer.innerHTML = '<img src="./assets/Accueil/logo-initiale.png" alt="logo initiale" class="loader-logo">';

  const progressContainer = document.createElement('div');
  progressContainer.className = 'loader-progress-container';

  const progressCircle = document.createElement('div');
  progressCircle.className = 'progress-circle';
  progressCircle.innerHTML = `
      <svg viewBox="0 0 100 100">
          <circle class="progress-background" cx="50" cy="50" r="45"></circle>
          <circle class="progress-indicator" cx="50" cy="50" r="45"></circle>
      </svg>
      <div class="progress-text">0%</div>
  `;

  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'loading-message';
  loadingMessage.textContent = 'Chargement en cours ';

  progressContainer.appendChild(progressCircle);
  progressContainer.appendChild(loadingMessage);

  loaderContent.appendChild(logoContainer);
  loaderContent.appendChild(progressContainer);

  loaderWrapper.appendChild(canvas);
  loaderWrapper.appendChild(loaderContent);
  document.body.appendChild(loaderWrapper);

  // Cacher initialement le contenu qui sera animé après le chargement
  const animateZoom = document.querySelector('.animatezoom');
  if (animateZoom) {
    animateZoom.style.opacity = '0';
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    // Réduire le nombre de particules sur mobile
    const particleCount = Math.min(
      Math.floor(window.innerWidth * window.innerHeight / (window.innerWidth < 768 ? 18000 : 9000)), 
      window.innerWidth < 768 ? 50 : 100
    );
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: accentColor,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Optimisation pour mobile - réduire la distance de connexion
    const connectionDistance = window.innerWidth < 768 ? 60 : 100;
    
    particles.forEach(particle => {
      particle.x += Math.cos(particle.direction) * particle.speed;
      particle.y += Math.sin(particle.direction) * particle.speed;

      if (particle.x < 0 || particle.x > canvas.width) particle.direction = Math.PI - particle.direction;
      if (particle.y < 0 || particle.y > canvas.height) particle.direction = -particle.direction;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      // Optimisation pour mobile - limiter le nombre de connexions
      if (window.innerWidth < 320) return; // Pas de connexions sur mobile pour optimiser
      
      particles.forEach(other => {
        if (particle === other) return;
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = (1 - dist / connectionDistance) * 0.2;
          ctx.stroke();
        }
      });
    });
    animationFrameId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  let progress = 0;
  const progressIndicator = document.querySelector('.progress-indicator');
  const progressText = document.querySelector('.progress-text');
  const circumference = 2 * Math.PI * 45;

  function updateProgress(value) {
    const offset = circumference - (value / 100) * circumference;
    progressIndicator.style.strokeDashoffset = offset;
    progressText.textContent = value + '%';
  }

  // Nouvel intervalle progressif
  let lastTarget = 100;
  const loadingStart = Date.now();

  const loadingInterval = setInterval(() => {
    if (progress < lastTarget) {
      progress = Math.min(progress + 5, lastTarget);
      updateProgress(progress);
    }

    if (progress >= 100) {
      clearInterval(loadingInterval);
      const elapsed = Date.now() - loadingStart;
      const wait = Math.max(0, 2000 - elapsed); // attendre au moins 2s
      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(loaderWrapper)) {
            document.body.removeChild(loaderWrapper);
            const animateZoom = document.querySelector('.animatezoom');
            if (animateZoom) {
              animateZoom.style.animation = 'zoomIn 0.8s forwards';
            }
          }
        }, 800);
      }, wait);
    }
  }, 200);

  window.addEventListener('load', () => {
    lastTarget = 100; // activer la fin à 100%
  });
});