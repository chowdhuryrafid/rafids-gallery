const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const spinner = document.getElementById('spinner');
const modeSwitch = document.getElementById('modeSwitch');
const modeLabel = document.getElementById('modeLabel');

const collections = {
  street: 9,
  portraits: 4,
  theatre: 3,
  landscapes: 8,
  nature: 5,
  photoproject: 4
};

let currentIndex = 0;
let currentCollection = '';
let photos = [];

function openGallery(folder) {
  currentCollection = folder;
  photos = Array.from({ length: collections[folder] }, (_, i) => `images/${folder}/${folder}photo${i + 1}.JPG`);
  currentIndex = 0;
  preloadImages();
  openLightbox();
}

function preloadImages() {
  photos.forEach(photo => {
    const img = new Image();
    img.src = photo;
  });
}

function openLightbox() {
  updateLightboxImage();
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function updateLightboxImage() {
  spinner.style.display = 'block';
  lightboxImg.onload = () => {
    spinner.style.display = 'none';
  };
  lightboxImg.src = photos[currentIndex];
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
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'Escape') closeLightbox();
  }
});

modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', modeSwitch.checked);
  modeLabel.textContent = modeSwitch.checked ? 'Light Mode' : 'Dark Mode';
});

// Swipe navigation with vertical tolerance
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

lightbox.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent page scroll during swipe
}, { passive: false });

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});

function handleGesture() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  const horizontalSwipe = Math.abs(deltaX) > 50;
  const verticalTolerance = Math.abs(deltaY) < 50;

  if (horizontalSwipe && verticalTolerance) {
    if (deltaX < 0) {
      navigate(1); // Swipe left → next
    } else {
      navigate(-1); // Swipe right → previous
    }
  }
}
