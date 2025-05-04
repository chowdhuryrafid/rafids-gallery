document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleInput = document.getElementById("modeToggle");
  const modeLabel = document.getElementById("modeLabel");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const leftArrow = document.querySelector(".lightbox-arrow.left");
  const rightArrow = document.querySelector(".lightbox-arrow.right");
  const toggleContainer = document.querySelector(".mode-toggle");

  let currentCollection = "";
  let currentIndex = 0;
  let images = [];

  // Dark mode toggle
  toggleInput.addEventListener("change", () => {
    body.classList.toggle("dark");
    updateModeLabel();
  });

  function updateModeLabel() {
    modeLabel.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
    modeLabel.style.color = body.classList.contains("dark") ? "#fff" : "#000";
  }

  updateModeLabel();

  // Thumbnail click logic
  const collectionDivs = document.querySelectorAll(".collection");

  collectionDivs.forEach((div) => {
    div.addEventListener("click", () => {
      currentCollection = div.dataset.collection;
      loadImages(currentCollection);
      showImage(0);
    });
  });

  function loadImages(folder) {
    images = [];
    let count = 0;
    let max = folder === "street" ? 8 : 3;
    for (let i = 1; i <= max; i++) {
      images.push(`images/${folder}/${folder}photo${i}.JPG`);
    }
  }

  function showImage(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex];
    toggleContainer.style.display = "none";
  }

  function hideLightbox() {
    lightbox.style.display = "none";
    toggleContainer.style.display = "flex";
  }

  // Navigation arrows
  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  });

  // Close lightbox on outside click or Escape key
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      hideLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") {
        hideLightbox();
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      }
    }
  });
});
