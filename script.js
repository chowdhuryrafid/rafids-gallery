const toggle = document.getElementById('toggle');
const body = document.body;
const collections = document.querySelectorAll('.collection');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentCollection = '';
let currentIndex = 0;
let photoCounts = {
  street: 8,
  portraits: 3,
  landscapes: 3,
  theatre: 3
};

toggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});

collections.forEach(collection => {
  collection.addEventListener('click', () => {
    currentCollection = collection.dataset.name;
    currentIndex = 1;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = 'flex';
  updateLightboxImage();
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function updateLightboxImage() {
  const path = `images/${currentCollection}/${currentCollection}photo${currentIndex}.JPG`;
  lightboxImg.src = path;
}

prevBtn.addEventListener('click', () => {
  currentIndex =
    currentIndex === 1
      ? photoCounts[currentCollection]
      : currentIndex - 1;
  updateLightboxImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex =
    currentIndex === photoCounts[currentCollection]
      ? 1
      : currentIndex + 1;
  updateLightboxImage();
});

closeBtn.addEventListener('click', closeLightbox);

window.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  }
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
