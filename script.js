const themeToggle = document.getElementById("theme-toggle");
const themeCheckbox = document.getElementById("theme-switch");
const themeLabel = document.getElementById("theme-label");

themeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  themeLabel.textContent = themeCheckbox.checked ? "Light Mode" : "Dark Mode";
});

// Lightbox logic
let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  updateLightboxImage();
  document.getElementById("lightbox").classList.add("active");
  document.body.classList.add("lightbox-active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.classList.remove("lightbox-active");
}

function updateLightboxImage() {
  const img = document.querySelector("#lightbox img");
  img.src = currentImages[currentIndex];
}

// Navigate with arrows
function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightboxImage();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
}

// Attach to global for use in HTML
window.openLightbox = openLightbox;

document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") {
    closeLightbox();
  }
});

document.getElementById("prev-arrow").addEventListener("click", (e) => {
  e.stopPropagation();
  showPrevImage();
});

document.getElementById("next-arrow").addEventListener("click", (e) => {
  e.stopPropagation();
  showNextImage();
});

document.addEventListener("keydown", (e) => {
  if (document.getElementById("lightbox").classList.contains("active")) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  }
});
