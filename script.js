// Dark/Light Mode Toggle
const modeSwitch = document.getElementById('mode-switch');
const modeText = document.getElementById('mode-text');
const body = document.body;

modeSwitch.addEventListener('change', function() {
    if (modeSwitch.checked) {
        body.classList.add('dark-mode');
        modeText.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        modeText.textContent = 'Dark Mode';
    }
});

// Lightbox functionality
let currentPhotoIndex = 0;
const images = {
    street: [
        "images/street/streetphoto1.JPG",
        "images/street/streetphoto2.JPG",
        "images/street/streetphoto3.JPG",
        "images/street/streetphoto4.JPG",
        "images/street/streetphoto5.JPG",
        "images/street/streetphoto6.JPG",
        "images/street/streetphoto7.JPG",
        "images/street/streetphoto8.JPG"
    ],
    portraits: [
        "images/portraits/portraitsphoto1.JPG",
        "images/portraits/portraitsphoto2.JPG",
        "images/portraits/portraitsphoto3.JPG"
    ],
    landscapes: [
        "images/landscapes/landscapesphoto1.JPG",
        "images/landscapes/landscapesphoto2.JPG",
        "images/landscapes/landscapesphoto3.JPG"
    ],
    theatre: [
        "images/theatre/theatrephoto1.JPG",
        "images/theatre/theatrephoto2.JPG",
        "images/theatre/theatrephoto3.JPG"
    ]
};

// Open gallery function
function openGallery(collectionName) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Set the first image in the collection
    currentPhotoIndex = 0;
    lightboxImg.src = images[collectionName][currentPhotoIndex];
    
    lightbox.style.display = 'flex';

    // Add event listeners for left and right arrow keys
    document.addEventListener('keydown', handleArrowNavigation);
}

// Navigate through the photos in the lightbox
function handleArrowNavigation(e) {
    const lightboxImg = document.getElementById('lightbox-img');
    const collection = Object.keys(images);
    
    if (e.key === 'ArrowRight') {
        currentPhotoIndex = (currentPhotoIndex + 1) % images[collection].length;
    } else if (e.key === 'ArrowLeft') {
        currentPhotoIndex = (currentPhotoIndex - 1 + images[collection].length) % images[collection].length;
    }

    lightboxImg.src = images[collection][currentPhotoIndex];
}

// Close lightbox function
function closeLightbox(e) {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').style.display = 'none';
        document.removeEventListener('keydown', handleArrowNavigation);
    }
}
