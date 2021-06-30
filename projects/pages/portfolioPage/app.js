// IMAHE ENLARGING
const images = document.querySelectorAll('.resizable-image');

for (const image of images) {
  image.addEventListener('click', e => {
    if (e.target.width <= 0.75 * window.innerWidth) {
      e.target.parentNode.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      e.target.classList.toggle('enlarge-image');
    } else {
      e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      e.target.classList.remove('enlarge-image');
    }
  });

  image.addEventListener('contextmenu', e => e.preventDefault());
}

// HAMBURGER MENU
const hamburgerIcon = document.querySelector('.open');
const closeIcon = document.querySelector('.close');
const nav = document.querySelector('.ham-menu');

function toggleNav() {
  nav.classList.toggle('nav-shown');
  console.log(true);
}

hamburgerIcon.addEventListener('click', toggleNav);
closeIcon.addEventListener('click', toggleNav);

// SCROLL DOWN ICON
const scrollDownIcon = document.querySelector('.scroll-down');
const container = document.querySelector('.container');

scrollDownIcon.addEventListener('click', e => {
  container.scrollBy({
    behavior: 'smooth',
    left: 0,
    top: window.innerHeight,
  });
  console.log(window.innerHeight);
});

// BACK TO TOP
const backToTop = document.querySelector('.back-to-top');

backToTop.addEventListener('click', e => {
  container.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });

  console.log('test');
});
