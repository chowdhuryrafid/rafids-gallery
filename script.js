// Global variable to keep track of the current photo index
let currentImageIndex = 0;
let images = [];

function openLightbox(imageElement) {
    // Set up the lightbox and make it visible
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";
    lightboxImage.src = imageElement.src;
    lightboxImage.alt = imageElement.alt;

    // Store the images for navigation purposes
    images = Array.from(document.querySelectorAll(".collection img"));
    currentImageIndex = images.indexOf(imageElement);

    // Add event listeners for left/right arrow keys
    document.addEventListener("keydown", handleArrowKeys);
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";

    // Remove event listener for keyboard navigation
    document.removeEventListener("keydown", handleArrowKeys);
}

function handleArrowKeys(event) {
    if (event.key === "Escape") {
        closeLightbox(); // Exit lightbox on Escape key
    }

    if (event.key === "ArrowLeft") {
        navigateImage(-1); // Navigate to previous image on left arrow
    }

    if (event.key === "ArrowRight") {
        navigateImage(1); // Navigate to next image on right arrow
    }
}

function navigateImage(direction) {
    // Update current image index based on direction
    currentImageIndex += direction;

    // Loop around if we reach the end or start of the image array
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const lightboxImage = document.getElementById("lightbox-img");
    const newImage = images[currentImageIndex];
    lightboxImage.src = newImage.src;
    lightboxImage.alt = newImage.alt;
}

// Close the lightbox when clicking outside the image
const lightbox = document.getElementById("lightbox");
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});
