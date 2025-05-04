let currentIndex = 0;
let images = [];

// Get all images in each collection and store them in an array
const collections = ['street', 'portraits', 'landscapes', 'theatre'];
collections.forEach((collection) => {
    const collectionImages = Array.from(document.querySelectorAll(`.${collection} img`));
    images.push(...collectionImages);
});

// Open lightbox when clicking an image
function openLightbox(imageElement) {
    currentIndex = images.indexOf(imageElement);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageElement.src;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";  // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
    document.body.style.overflow = "auto";  // Enable scrolling again
}

// Keyboard navigation: Left and Right arrows
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === "block") {
        if (event.key === "ArrowLeft") {
            navigateLightbox('prev');
        } else if (event.key === "ArrowRight") {
            navigateLightbox('next');
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});

// Click navigation
document.querySelector('.lightbox-arrow.left').addEventListener('click', function() {
    navigateLightbox('prev');
});

document.querySelector('.lightbox-arrow.right').addEventListener('click', function() {
    navigateLightbox('next');
});

// Function to navigate lightbox images
function navigateLightbox(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length;  // Loop back to the first image
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;  // Loop back to the last image
    }
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentIndex].src;
}
