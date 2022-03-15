const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector("nav");

hamburgerIcon.addEventListener("click", (e) => {
  nav.classList.toggle("hide-nav");
});
