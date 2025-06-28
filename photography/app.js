// IMAGE ENLARGING REMINDER
const enlargePopup = document.getElementById("enlarge-popup");
const enlargePopupClose = document.getElementById("enlarge-popup-close");

let imageEnlarged;

function setImageEnlarged() {
  imageEnlarged = true;
  localStorage.setItem("enlarge-popup", true);
  checkImageEnlarged();
}

function checkImageEnlarged() {
  imageEnlarged =
    localStorage.getItem("enlarge-popup") == "true" ? true : false;

  if (!imageEnlarged) {
    // enlargePopup.style.display = "block";
    enlargePopup.classList.toggle("enlarge-popup-invisible");
  } else {
    // enlargePopup.style.display = "none";
    enlargePopup.classList.toggle("enlarge-popup-invisible");
  }
}
checkImageEnlarged();

enlargePopupClose.addEventListener("click", () => {
  setImageEnlarged();
});

// IMAGE ENLARGING
const images = document.querySelectorAll(".resizable-image");

for (const image of images) {
  image.addEventListener("click", (e) => {
    setImageEnlarged();

    if (e.target.width <= 0.75 * window.innerWidth) {
      e.target.parentNode.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      e.target.classList.toggle("enlarge-image");
    } else {
      e.target.scrollIntoView({ block: "center", behavior: "smooth" });
      e.target.classList.remove("enlarge-image");
    }
  });

  image.addEventListener("contextmenu", (e) => e.preventDefault());
}

// HAMBURGER MENU
const hamburgerIcon = document.querySelector(".open");
const closeIcon = document.querySelector(".close");
const nav = document.querySelector(".ham-menu");

function toggleNav() {
  nav.classList.toggle("nav-shown");
}

hamburgerIcon.addEventListener("click", toggleNav);
closeIcon.addEventListener("click", toggleNav);

// SCROLL DOWN ICON
const scrollDownIcon = document.querySelector(".scroll-down");
const container = document.querySelector(".container");

scrollDownIcon.addEventListener("click", (e) => {
  container.scrollBy({
    behavior: "smooth",
    left: 0,
    top: window.innerHeight,
  });
});

// BACK TO TOP
const backToTop = document.querySelector(".back-to-top");

backToTop.addEventListener("click", (e) => {
  container.scrollTo({
    behavior: "smooth",
    left: 0,
    top: 0,
  });
});
