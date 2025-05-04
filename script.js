let currentImages = [];
let currentIndex = 0;

function openGallery(collection) {
  const imageCount = collection === 'street' ? 8 : 3;
  currentImages = Array.from({ length: imageCount }, (_, i) => `images/${collection}/${collection}photo${i + 1}.JPG`);
  currentIndex = 0;
  openLightbox();
}

function openLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = currentImages[currentIndex];
  lightbox.style.display = 'flex';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  document.getElementById('lightbox-img').src = currentImages[currentIndex];
}

function outsideClick(e) {
  const img = document.getElementById('lightbox-img');
  if (!img.contains(e.target)) {
    closeLightbox();
  }
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'Escape') closeLightbox();
  }
});

document.getElementById('modeSwitch').addEventListener('change', toggleMode);

function toggleMode() {
  document.body.classList.toggle('dark');
  const label = document.querySelector('.mode-label');
  label.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
}
