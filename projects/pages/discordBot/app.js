document.addEventListener('scroll', e => {
  const header = document.querySelector('header');

  const scrollY = window.scrollY;

  if (scrollY > 0) {
    if (header.classList.contains('header-shadow')) return;
    header.classList.toggle('header-shadow');
  } else if (scrollY == 0) {
    header.classList.toggle('header-shadow');
  }
});
