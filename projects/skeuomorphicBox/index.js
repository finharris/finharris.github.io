const button = document.querySelector(".button");

document.addEventListener("keypress", (e) => {
  if (e.code === "Space") {
    button.classList.toggle("button-pressed");
  }
});

button.addEventListener("click", () => {
  button.classList.toggle("button-pressed");
});
