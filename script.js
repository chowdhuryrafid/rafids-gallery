// Dark Mode Toggle
const darkModeToggle = document.getElementById("toggle");
darkModeToggle.addEventListener("change", toggleDarkMode);

function toggleDarkMode() {
    if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Lightbox and Navigation
let currentImageIndex = 0;
let images = [];

function openCollection(collectionName) {
    const imageFolder = `images/${collectionName}/`;
    images = [];

    // Clear any previously opened images
    const collectionImages = document.querySelectorAll(`.${collectionName} img`);
    collectionImages.forEach((image, index) => {
        images.push(image.src);
    });

    openLightbox(images[0]);
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";
    lightboxImg.src = imageSrc;

    // Set the current image index
    currentImageIndex = images.indexOf(imageSrc);

    document.addEventListener("keydown", handleArrowKeys);
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";

    document.removeEventListener("keydown", handleArrowKeys);
}

function handleArrowKeys(event) {
    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        navigate
