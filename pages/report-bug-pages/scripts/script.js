const form = document.getElementById("reportForm");
const successMsg = document.getElementById("successMsg");

const errorMessages = document.querySelectorAll(".error-message");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const descriptionError = document.getElementById("descriptionError");
const serverError = document.getElementById("serverError");
const emailConsentError = document.getElementById("emailConsentError");

const imageError = document.getElementById("imageError");
const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxSize = 5 * 1024 * 1024;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  errorMessages.forEach((el) => {
    el.textContent = "";
  });

  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const emailConsent = form.emailConsent.checked;
  const description = form.message.value.trim();
  const server = form.server.value;
  const image = form.screenshot;

  let isValid = true;
  if (!username) {
    usernameError.textContent = "Username is required.";
    isValid = false;
  }
  if (!server) {
    serverError.textContent = "Please select a Palorant server.";
    isValid = false;
  }

  if (!description) {
    descriptionError.textContent = "Description is required.";
    isValid = false;
  } else if (description.length < 20 || description.length > 50) {
    descriptionError.textContent =
      "Description length must be 20 - 50 characters";
    isValid = false;
  }

  if (!email) {
    emailError.textContent = "Email is required.";
    isValid = false;
  }

  if (!emailConsent) {
    emailConsentError.textContent =
      "Please check the box to receive email notifications.";
    isValid = false;
  }

  const files = image.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!validTypes.includes(file.type)) {
      imageError.textContent =
        "Only image files are allowed (jpg, png, gif, webp).";
      isValid = false;
      break;
    }

    if (file.size > maxSize) {
      imageError.textContent = "Each image must be less than 5MB.";
      isValid = false;
      break;
    }
  }

  if (!isValid) return;
  showSuccessPopup();
  form.reset();
});

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.classList.add("show");

  // Auto-close dalam 3 detik
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
