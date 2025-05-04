// Dark Mode Toggle
const toggle = document.getElementById('darkSwitch');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
});

// Lightbox functionality
let currentCollection = '';
let currentIndex = 0;
const collections = {
  street: ['images/street/streetphoto1.JPG', 'images/street/streetphoto2.JPG', 'images/street/streetphoto3.JPG', 'images/street/streetphoto4.JPG', 'images/street/streetphoto5.JPG', 'images/street/streetphoto6.JPG', 'images/street/streetphoto7.JPG', 'images/street/streetphoto8.JPG'],
  landscapes: ['images/landscapes/landscapesphoto1.JPG', 'images/landscapes/landscapesphoto2.JPG', 'images/landscapes/landscapesphoto3.JPG'],
  portraits: ['images/portraits/portraitsphoto1.JPG', 'images/portraits/portraitsphoto2.JPG', 'images/portraits/portraitsphoto3.JPG'],
  theatre: ['images/theatre/theatrephoto1.JPG', 'images/theatre/theatrephoto2.JPG', 'images/theatre/theatrephoto3.JPG']
};

function openLightbox(collection, index) {
  currentCollection = collection;
  currentIndex = index;
  const img = document.getElementById('lightbox-img');
  img.src = collections[collection][index];
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + collections[currentCollection].length) % collections[currentCollection].length;
  const img = document.getElementById('lightbox-img');
  img.src = collections[currentCollection][currentIndex];
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
});

// Close lightbox with the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
