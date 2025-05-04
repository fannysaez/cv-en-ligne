document.addEventListener('DOMContentLoaded', function () {
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
  loadingMessage.textContent = 'Chargement du cv en ligne';

  progressContainer.appendChild(progressCircle);
  progressContainer.appendChild(loadingMessage);

  loaderContent.appendChild(logoContainer);
  loaderContent.appendChild(progressContainer);

  loaderWrapper.appendChild(canvas);
  loaderWrapper.appendChild(loaderContent);
  document.body.appendChild(loaderWrapper);

  const style = document.createElement('style');
  style.textContent = `
      .particles-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--background-color);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          transition: opacity 0.8s ease;
      }
      #particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
      }
      .loader-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
      }
      .loader-logo-container {
          margin-bottom: 30px;
          transform-origin: center;
          animation: float 3s ease-in-out infinite;
      }
      .loader-logo {
          width: 120px;
          height: 120px;
          object-fit: contain;
          filter: drop-shadow(0 0 10px var(--accent-color));
      }
      @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
      }
      .loader-progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      .progress-circle {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .progress-circle svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
      }
      .progress-background {
          fill: none;
          stroke: var(--progress-bg);
          stroke-width: 5;
      }
      .progress-indicator {
          fill: none;
          stroke: var(--accent-color);
          stroke-width: 5;
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.3s ease;
      }
      .progress-text {
          position: absolute;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          color: var(--text-color);
      }
      .loading-message {
          margin-top: 15px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          color: var(--text-color);
          letter-spacing: 1px;
          position: relative;
      }
      .loading-message::after {
          content: '...';
          position: absolute;
          animation: dots 1.5s infinite;
          width: 24px;
          text-align: left;
      }
      @keyframes dots {
          0% { content: '.'; }
          33% { content: '..'; }
          66% { content: '...'; }
          100% { content: '.'; }
      }
      .animatezoom { opacity: 0; }
      @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
      }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }

  function createParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 9000), 100);
      for (let i = 0; i < particleCount; i++) {
          particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 2 + 1,
              color: getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#5ce5f4',
              speed: Math.random() * 0.5 + 0.2,
              direction: Math.random() * Math.PI * 2,
              opacity: Math.random() * 0.5 + 0.3
          });
      }
  }

  function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

          particles.forEach(other => {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 100) {
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.strokeStyle = particle.color;
                  ctx.globalAlpha = (1 - dist / 100) * 0.2;
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
