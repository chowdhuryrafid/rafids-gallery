let currentImages = [];
let currentIndex = 0;

document.getElementById('modeToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', this.checked);
});

function openCollection(folderName) {
  const countMap = {
    landscapes: 3,
    portraits: 3,
    theatre: 3,
    street: 8
  };
  currentImages = [];
  const count = countMap[folderName] || 0;
  for (let i = 1; i <= count; i++) {
    currentImages.push(`images/${folderName}/${folderName}photo${i}.JPG`);
  }
  openLightbox(0);
}

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox').style.display = 'flex';
  document.getElementById('lightbox-img').src = currentImages[index];
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.key === 'Escape') {
    document.getElementById('lightbox').style.display = 'none';
  }
}

function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById('lightbox-img').src = currentImages[currentIndex];
}

function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % currentImages.length;
  document.getElementById('lightbox-img').src = currentImages[currentIndex];
}

document.addEventListener('keydown', function (e) {
  if (document.getElementById('lightbox').style.display === 'flex') {
    if (e.key === 'ArrowLeft') prevImage(e);
    else if (e.key === 'ArrowRight') nextImage(e);
    else if (e.key === 'Escape') closeLightbox(e);
  }
});
