// Troncature des paragraphes de la bio sur mobile/tablette (≤768px),
// avec bouton "Lire la suite" ouvrant une modale contenant le texte complet.
document.addEventListener('DOMContentLoaded', function () {
  const MAX_LENGTH = 90;

  if (window.innerWidth > 768) return;

  const paragraphs = document.querySelectorAll('#aboutme .reveal-lines p');
  if (!paragraphs.length) return;

  let hasTruncated = false;

  paragraphs.forEach((p) => {
    const fullText = p.textContent.trim();
    p.setAttribute('data-full-text', fullText);
    if (fullText.length > MAX_LENGTH) {
      p.textContent = fullText.substring(0, MAX_LENGTH) + '…';
      hasTruncated = true;
    }
  });

  if (!hasTruncated) return;

  // Bouton "+" (icône seule) pour ouvrir la bio complète
  const readMoreBtn = document.createElement('button');
  readMoreBtn.type = 'button';
  readMoreBtn.className = 'btn bio-readmore-btn';
  readMoreBtn.setAttribute('aria-label', "Lire la bio complète");
  readMoreBtn.innerHTML = '<i class="fas fa-plus"></i>';

  const revealLines = document.querySelector('#aboutme .reveal-lines');
  revealLines.insertAdjacentElement('afterend', readMoreBtn);

  // Modale (construite dynamiquement, texte lu depuis data-full-text)
  const modal = document.createElement('div');
  modal.id = 'bio-modal';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-modal';
  closeBtn.id = 'closeBioModal';
  closeBtn.setAttribute('role', 'button');
  closeBtn.setAttribute('aria-label', 'Fermer');
  closeBtn.textContent = '×';

  const title = document.createElement('h3');
  title.textContent = 'Ma Bio';

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(title);

  paragraphs.forEach((p) => {
    const fullP = document.createElement('p');
    fullP.textContent = p.getAttribute('data-full-text');
    modalContent.appendChild(fullP);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  function openBioModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBioModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  readMoreBtn.addEventListener('click', openBioModal);
  closeBtn.addEventListener('click', closeBioModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeBioModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeBioModal();
    }
  });
});
