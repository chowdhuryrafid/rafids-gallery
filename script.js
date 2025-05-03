document.addEventListener('DOMContentLoaded', () => {
    // Lightbox logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery img');
    let currentIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close lightbox on outside click
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close or navigate with keyboard
    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'flex') {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            } else if (event.key === 'ArrowLeft') {
                changeImage(-1);
            }
        }
    });

    function changeImage(direction) {
        currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    // Theme toggle logic
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const footer = document.querySelector('footer');
    const modeLabel = document.querySelector('.slider-text');

    function applyTheme(isDark) {
        body.classList.toggle('dark-mode', isDark);
        body.classList.toggle('light-mode', !isDark);
        modeLabel.style.color = isDark ? 'white' : 'black';
        footer.style.color = isDark ? 'white' : 'black';
    }

    modeToggle.addEventListener('change', () => {
        applyTheme(modeToggle.checked);
    });

    // Apply the initial theme
    applyTheme(modeToggle.checked);
});
