// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery img');
let currentIndex = 0;

// Open lightbox with clicked image
function openLightbox(imgElement) {
    lightbox.style.display = 'flex';
    lightboxImg.src = imgElement.src;
    currentIndex = Array.from(galleryImages).indexOf(imgElement);
    document.body.style.overflow = 'hidden'; // prevent scrolling
}

// Close lightbox
function closeLightbox(event) {
    if (event.target === lightbox || event.key === 'Escape') {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Navigate through images
function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;

    lightboxImg.src = galleryImages[currentIndex].src;
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    if (lightbox.style.display === 'flex') {
        if (event.key === 'Escape') {
            closeLightbox(event);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        }
    }
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const footer = document.querySelector('footer');
const modeLabel = document.querySelector('.slider-text');

modeToggle.addEventListener('change', () => {
    const isDark = modeToggle.checked;
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);

    // Update label text color
    modeLabel.style.color = isDark ? 'white' : 'black';

    // Update footer text color
    footer.style.color = isDark ? 'white' : 'black';
});