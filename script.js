const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const modeSwitch = document.getElementById('modeSwitch');
const modeLabel = document.getElementById('modeLabel');
const collections = {
  street: 9,
  portraits: 4,
  theatre: 3,
  landscapes: 3,
  nature: 5
};

let currentIndex = 0;
let currentCollection = '';
let photos = [];

function openGallery(folder) {
  currentCollection = folder;
  photos = Array.from({ length: collections[folder] }, (_, i) => `images/${folder}/${folder}photo${i + 1}.JPG`);
  currentIndex = 0;
  openLightbox();
}

function openLightbox() {
  updateLightboxImage();
  lightbox.style.display = 'flex';
}

function updateLightboxImage() {
  lightboxImg.src = photos[currentIndex];
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + photos.length) % photos.length;
  updateLightboxImage();
}

function outsideClick(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
}

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'Escape') closeLightbox();
  }
});

modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', modeSwitch.checked);
  modeLabel.textContent = modeSwitch.checked ? 'Light Mode' : 'Dark Mode';
});
