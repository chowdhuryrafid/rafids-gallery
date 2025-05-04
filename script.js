let currentCollection = '';
let currentIndex = 0;
let photos = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modeSwitch').addEventListener('change', toggleMode);
    document.addEventListener('keydown', handleKey);
});

function toggleMode() {
    document.body.classList.toggle('dark');
    const toggleText = document.querySelector('.toggle-text');
    toggleText.textContent = document.body.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
}

function openCollection(name) {
    currentCollection = name;
    photos = [];
    let count = name === 'street' ? 8 : 3;

    for (let i = 1; i <= count; i++) {
        photos.push(`images/${name}/${name}photo${i}.JPG`);
    }

    currentIndex = 0;
    showLightbox();
}

function showLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = photos[currentIndex];
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    document.getElementById('lightbox-img').src = photos[currentIndex];
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    document.getElementById('lightbox-img').src = photos[currentIndex];
}

function handleKey(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    }
}

function handleLightboxClick(e) {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
}
