document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("toggleSwitch");
  const body = document.body;
  const label = document.getElementById("darkModeLabel");

  // Load and apply saved mode
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
    label.textContent = "Dark";
  } else {
    label.textContent = "Light";
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      body.classList.add("dark-mode");
      label.textContent = "Dark";
      localStorage.setItem("dark-mode", "enabled");
    } else {
      body.classList.remove("dark-mode");
      label.textContent = "Light";
      localStorage.setItem("dark-mode", "disabled");
    }
  });

  // Lightbox logic
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  document.body.appendChild(lightbox);

  const lightboxContent = document.createElement("div");
  lightboxContent.className = "lightbox-content";
  lightbox.appendChild(lightboxContent);

  const lightboxImage = document.createElement("img");
  lightboxContent.appendChild(lightboxImage);

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";
  lightboxContent.appendChild(closeBtn);

  const prevBtn = document.createElement("span");
  prevBtn.className = "prev";
  prevBtn.innerHTML = "&#10094;";
  lightboxContent.appendChild(prevBtn);

  const nextBtn = document.createElement("span");
  nextBtn.className = "next";
  nextBtn.innerHTML = "&#10095;";
  lightboxContent.appendChild(nextBtn);

  let currentCollection = '';
  let currentIndex = 0;
  const collections = {
    street: 8,
    portraits: 3,
    theatre: 3,
    landscapes: 3
  };

  // Add click events to thumbnails
  document.querySelectorAll(".collection").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const folder = thumb.dataset.collection;
      currentCollection = folder;
      currentIndex = 1;
      showImage();
      lightbox.style.display = "flex";
    });
  });

  function showImage() {
    const total = collections[currentCollection];
    const fileName = `${currentCollection}photo${currentIndex}.JPG`;
    lightboxImage.src = `images/${currentCollection}/${fileName}`;
  }

  function nextImage() {
    const total = collections[currentCollection];
    currentIndex = currentIndex >= total ? 1 : currentIndex + 1;
    showImage();
  }

  function prevImage() {
    const total = collections[currentCollection];
    currentIndex = currentIndex <= 1 ? total : currentIndex - 1;
    showImage();
  }

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);
  closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));

  // Close on click outside image
  lightbox.addEventListener("click", (e) => {
    if (!lightboxContent.contains(e.target)) {
      lightbox.style.display = "none";
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    }
  });
});
