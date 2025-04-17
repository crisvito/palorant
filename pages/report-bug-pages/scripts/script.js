const form = document.getElementById("reportForm");

const errorMessages = document.querySelectorAll(".error-message");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const descriptionError = document.getElementById("descriptionError");
const serverError = document.getElementById("serverError");
const emailConsentError = document.getElementById("emailConsentError");
const imageError = document.getElementById("imageError");

const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxSize = 5 * 1024 * 1024;

function setErrorState(inputId, errorId, message) {
  const input = form[inputId];
  const label = document.querySelector(`label[for="${inputId}"]`);
  document.getElementById(errorId).textContent = message;
  if (message) {
    input.classList.add("error-input");
    if (label) label.classList.add("error-label");
  } else {
    input.classList.remove("error-input");
    if (label) label.classList.remove("error-label");
  }
}

function validateUsername() {
  const username = form.username.value.trim();
  if (!username) {
    setErrorState("username", "usernameError", "Username is required.");
    return false;
  }
  setErrorState("username", "usernameError", "");
  return true;
}

function validateEmail() {
  const email = form.email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regex untuk email

  if (!email) {
    setErrorState("email", "emailError", "Email is required.");
    return false;
  }

  if (!emailRegex.test(email)) {
    setErrorState("email", "emailError", "Please enter a valid email address.");
    return false;
  }

  setErrorState("email", "emailError", "");
  return true;
}

function validateDescription() {
  const description = form.message.value.trim();
  if (!description) {
    setErrorState("message", "descriptionError", "Description is required.");
    return false;
  } else if (description.length < 20 || description.length > 50) {
    setErrorState(
      "message",
      "descriptionError",
      "Description length must be 20 - 50 characters"
    );
    return false;
  }
  setErrorState("message", "descriptionError", "");
  return true;
}

function validateServer() {
  const server = form.server.value;
  if (!server) {
    setErrorState("server", "serverError", "Please select a Palorant server.");
    return false;
  }
  setErrorState("server", "serverError", "");
  return true;
}

function validateEmailConsent() {
  const checkbox = form.emailConsent;
  const label = document.querySelector('label[for="emailConsent"]');
  if (!checkbox.checked) {
    emailConsentError.textContent =
      "Please check the box to receive email notifications.";
    return false;
  } else {
    emailConsentError.textContent = "";
    return true;
  }
}

function validateImage() {
  const files = form.screenshot.files;
  const input = form.screenshot;
  const label = document.querySelector('label[for="screenshot"]');
  imageError.textContent = "";
  input.classList.remove("error-input");
  if (label) label.classList.remove("error-label");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!validTypes.includes(file.type)) {
      imageError.textContent =
        "Only image files are allowed (jpg, png, gif, webp).";
      input.classList.add("error-input");
      if (label) label.classList.add("error-label");
      return false;
    }
    if (file.size > maxSize) {
      imageError.textContent = "Each image must be less than 5MB.";
      input.classList.add("error-input");
      if (label) label.classList.add("error-label");
      return false;
    }
  }

  return true;
}

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

form.username.addEventListener("input", validateUsername);
form.email.addEventListener("input", validateEmail);
form.message.addEventListener("input", validateDescription);
form.server.addEventListener("change", validateServer);
form.emailConsent.addEventListener("change", validateEmailConsent);
form.screenshot.addEventListener("change", validateImage);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorMessages.forEach((el) => (el.textContent = ""));

  const isValid =
    validateUsername() &
    validateEmail() &
    validateDescription() &
    validateServer() &
    validateEmailConsent() &
    validateImage();

  if (!isValid) return;

  showSuccessPopup();
  form.reset();
});
