let currentCollection = [];
let currentIndex = 0;

function openCollection(folder) {
  let count = 0;
  switch (folder) {
    case 'street': count = 8; break;
    case 'portraits':
    case 'landscapes':
    case 'theatre': count = 3; break;
  }

  currentCollection = [];
  for (let i = 1; i <= count; i++) {
    currentCollection.push(`images/${folder}/${folder}photo${i}.JPG`);
  }
  openLightbox(0);
}

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = currentCollection[currentIndex];
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function navigateLightbox(direction) {
  currentIndex = (currentIndex + direction + currentCollection.length) % currentCollection.length;
  document.getElementById('lightbox-img').src = currentCollection[currentIndex];
}

function clickOutsideLightbox(e) {
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
}

document.addEventListener('keydown', function (e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  }
});

document.getElementById('mode-switch').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', this.checked);
  document.body.classList.toggle('light-mode', !this.checked);
});
