const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector("nav");

hamburgerIcon.addEventListener("click", () => {
  document.body.style.overflow = nav.classList.contains("nav-shown")
    ? "visible"
    : "hidden";
  nav.classList.toggle("nav-shown");
});

const navItems = document.querySelectorAll(".nav-item > a");

for (const item of navItems) {
  item.addEventListener("click", () => {
    nav.classList.remove("nav-shown");
    document.body.style.overflow = "visible";
  });
}
