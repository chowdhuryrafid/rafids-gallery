const collections = document.querySelectorAll('.collection');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const leftArrow = document.querySelector('.lightbox-arrow.left');
const rightArrow = document.querySelector('.lightbox-arrow.right');

let currentImages = [];
let currentIndex = 0;

collections.forEach(collection => {
  collection.addEventListener('click', () => {
    const folder = collection.dataset.folder;
    let count;

    switch (folder) {
      case 'street': count = 8; break;
      case 'portraits':
      case 'landscapes':
      case 'theatre': count = 3; break;
      default: count = 0;
    }

    currentImages = [];
    for (let i = 1; i <= count; i++) {
      currentImages.push(`images/${folder}/${folder}photo${i}.JPG`);
    }

    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = currentImages[currentIndex];
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

rightArrow.addEventListener('click', showNextImage);
leftArrow.addEventListener('click', showPrevImage);

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  }
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
