document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const modeToggle = document.getElementById("modeToggle");

    // Set initial mode
    body.classList.add("light-mode");

    modeToggle.addEventListener("change", () => {
        if (modeToggle.checked) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const galleryImages = document.querySelectorAll(".gallery img");
    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            index = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            index = 0;
        }
        lightboxImg.src = galleryImages[index].src;
        currentIndex = index;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            showImage(index);
        });
    });

    document.getElementById("prev").addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    document.getElementById("next").addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") {
                lightbox.style.display = "none";
            } else if (e.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                showImage(currentIndex + 1);
            }
        }
    });
});
