document.addEventListener('DOMContentLoaded', () => {
    // LIGHTBOX FUNCTIONALITY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery img');
    let currentIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

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

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function changeImage(direction) {
        currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    // DARK/LIGHT MODE FUNCTIONALITY
    const modeToggle = document.getElementById('modeToggle');

    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    });

    // Start in light mode
    document.body.classList.add('light-mode');
});
