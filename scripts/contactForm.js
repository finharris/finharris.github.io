const submitButton = document.querySelector(".contact-form-submit");

submitButton.addEventListener("click", (e) => {
  // e.preventDefault();
  const fname = document.querySelector("#fname").value;
  const lname = document.querySelector("#lname").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;
});
