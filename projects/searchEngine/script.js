const searchBox = document.querySelector("#searchBox");
const searchButton = document.querySelector("#searchButton");
const title = document.querySelector("h1");

function searchGoogle(query) {
  searchBox.blur();
  return window.open("https://www.google.com/search?q=" + query);
}

searchButton.addEventListener("click", () => {
  return searchBox.value ? searchGoogle(searchBox.value) : false;
});

window.onkeydown = (k) => {
  if (k.key === "Alt" || k.key === "Control" || k.key === "Shift") return;

  k.keyCode === 46 && searchBox.value && document.activeElement !== searchBox
    ? (searchBox.value = "")
    : false;

  document.activeElement !== searchBox ? searchBox.focus() : false;

  k.keyCode === 13 && searchBox.value ? searchGoogle(searchBox.value) : false;
};

searchBox.addEventListener("focus", () => {
  title.style.fontSize = "3em";
});

searchBox.addEventListener("blur", () => {
  title.style.fontSize = "2.6em";
});

// dropdown

const dropdownButton = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", () => {
  dropdownContent.classList.toggle("hidden");
});
