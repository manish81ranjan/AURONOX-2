function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
});
