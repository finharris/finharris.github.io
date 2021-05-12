const hamburgerIcon = document.querySelector('.hamburger-icon');

const closeIcon = document.querySelector('.close-icon');

const nav = document.querySelector('nav');

function toggleNav() {
  nav.classList.toggle('nav-shown');
}

hamburgerIcon.addEventListener('click', toggleNav);
closeIcon.addEventListener('click', toggleNav);
