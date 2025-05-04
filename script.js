const collections = {
  street: 8,
  portraits: 3,
  landscapes: 3,
  theatre: 3
};

let currentCollection = '';
let currentIndex = 0;

function openCollection(name) {
  currentCollection = name;
  currentIndex = 1;
  showImage();
  document.getElementById('lightbox').style.display = 'flex';
}

function showImage() {
  const img = document.getElementById('lightbox-img');
  img.src = `images/${currentCollection}/${currentCollection}photo${currentIndex}.JPG`;
}

function navigate(direction, event) {
  event.stopPropagation();
  const max = collections[currentCollection];
  currentIndex += direction;
  if (currentIndex > max) currentIndex = 1;
  if (currentIndex < 1) currentIndex = max;
  showImage();
}

function closeLightbox(event) {
  const img = document.getElementById('lightbox-img');
  if (event.target === img) return;
  document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display !== 'flex') return;

  if (e.key === 'Escape') {
    lightbox.style.display = 'none';
  } else if (e.key === 'ArrowRight') {
    navigate(1, e);
  } else if (e.key === 'ArrowLeft') {
    navigate(-1, e);
  }
});
