const showButton = document.getElementById("dev-page-button");
const devPageLogin = document.getElementById("dev-page-login");
const cancelButton = document.getElementById("dev-page-cancel");
const submitButton = document.getElementById("dev-page-submit");
const passwordBox = document.getElementById("dev-page-password");

const correctPass =
  "60cf76dec6104281aa7ec6f5743492fe8c40e0977e6c45cdc44ae48a25ec02ca";

async function hashText(pass) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(pass);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

showButton.addEventListener("click", () => {
  devPageLogin.style.display = "block";
});

cancelButton.addEventListener("click", () => {
  devPageLogin.style.display = "none";
});

submitButton.addEventListener("click", () => {
  const password = passwordBox.value;
  hashText(password).then((hash) => {
    if (hash == correctPass) {
      devPageLogin.style.display = "none";
      window.location.href =
        "https://finharris.github.io/projects/pages/pageList.html";
    } else {
      alert("Incorrect");
    }
  });
});
