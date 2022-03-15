document.addEventListener("scroll", (e) => {
  const scrollY = window.scrollY;
  const nav = document.querySelector("nav");
  const navItemAs = document.querySelectorAll(".nav-item a");

  if (window.getComputedStyle(nav).position === "absolute") return;

  if (scrollY > 5) {
    nav.classList.add("nav-scrolled");

    for (const item of navItemAs) {
      item.style.color = "var(--dark)";
    }
  } else {
    nav.classList.remove("nav-scrolled");

    for (const item of navItemAs) {
      item.style.color = "var(--light)";
    }
  }
});
