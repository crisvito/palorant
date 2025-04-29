const form = document.getElementById("reportForm");
const errorMessages = document.querySelectorAll(".error-message");
const successPopup = document.getElementById("successPopup");

const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxImageSize = 5 * 1024 * 1024; // 5MB

const fields = {
  username: {
    input: form.elements.username,
    error: document.getElementById("usernameError"),
    validate: () => {
      const value = fields.username.input.value.trim();
      if (!value) return "Username is required";
      if (value.includes(" ")) return "Username cannot contain spaces";
      return "";
    },
  },
  email: {
    input: form.elements.email,
    error: document.getElementById("emailError"),
    validate: () => {
      const value = fields.email.input.value.trim();
      if (!value) return "Email is required";

      if (value.startsWith(".")) return "Email cannot start with '.'";

      if (value.includes(" ")) return "Email cannot contain spaces";

      if (value.indexOf("@") !== value.lastIndexOf("@")) {
        return "Email cannot contain more than one '@'";
      }

      const atIndex = value.indexOf("@");
      if (atIndex <= 0 || atIndex === value.length - 1) {
        return "Email must contain '@' and not at the start or end";
      }

      const domain = value.slice(atIndex + 1);
      if (!domain || !domain.includes(".") || domain.startsWith(".")) {
        return "Email domain must be valid and contain a '.'";
      }

      const tld = domain.slice(domain.lastIndexOf(".") + 1);
      if (!tld) return "Email domain must contain a valid domain";

      return "";
    },
  },
  message: {
    input: form.elements.message,
    error: document.getElementById("descriptionError"),
    validate: () => {
      const value = fields.message.input.value.trim();
      if (!value) return "Description is required";
      if (value.length < 20 || value.length > 50) {
        return "Description length must be 20 - 50 characters";
      }
      return "";
    },
  },
  server: {
    input: form.elements.server,
    error: document.getElementById("serverError"),
    validate: () => {
      if (!fields.server.input.value) return "Please select a Palorant server";
      return "";
    },
  },
  emailConsent: {
    input: form.elements.emailConsent,
    error: document.getElementById("emailConsentError"),
    validate: () => {
      if (!fields.emailConsent.input.checked) {
        return "Please check the box to receive email notifications";
      }
      return "";
    },
  },
  screenshot: {
    input: form.elements.screenshot,
    error: document.getElementById("imageError"),
    validate: () => {
      const files = fields.screenshot.input.files;
      for (const file of files) {
        if (!validImageTypes.includes(file.type))
          return "Only image files are allowed (jpg, png, gif, webp)";
        if (file.size > maxImageSize) return "Each image must be less than 5MB";
      }
      return "";
    },
  },
};

function setErrorState(fieldKey, message) {
  const field = fields[fieldKey];

  field.error.textContent = message;
  if (message) {
    field.input.classList.add("error-input");
  } else {
    field.input.classList.remove("error-input");
  }
}

function validateField(fieldKey) {
  const message = fields[fieldKey].validate();
  setErrorState(fieldKey, message);
  return !message;
}

function validateAll() {
  return Object.keys(fields).map(validateField).every(Boolean);
}

function showSuccessPopup() {
  successPopup.classList.add("show");
  setTimeout(() => {
    successPopup.classList.remove("show");
  }, 5000);
}

function attachValidationEvents() {
  ["username", "email", "message"].forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => validateField(key));
  });

  fields.server.input.addEventListener("change", () => validateField("server"));
  fields.emailConsent.input.addEventListener("change", () =>
    validateField("emailConsent")
  );
  fields.screenshot.input.addEventListener("change", () =>
    validateField("screenshot")
  );
}
attachValidationEvents();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateAll()) return;

  showSuccessPopup();
  form.reset();
});
