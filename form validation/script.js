"use strict";

const form = document.getElementById("registrationForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword")
};
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", validateForm);

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    clearError(field.name);
    successMessage.textContent = "";
  });
});

function validateForm(event) {
  event.preventDefault();
  clearAllErrors();
  successMessage.textContent = "";

  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const confirmPassword = fields.confirmPassword.value;
  let isValid = true;

  if (!name) {
    setError("name", "Name is required.");
    isValid = false;
  }
  if (!email) {
    setError("email", "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Enter a valid email address.");
    isValid = false;
  }
  if (!password) {
    setError("password", "Password is required.");
    isValid = false;
  } else if (!isStrongPassword(password)) {
    setError("password", "Use 8+ characters, one uppercase letter, and one number.");
    isValid = false;
  }
  if (!confirmPassword) {
    setError("confirmPassword", "Please confirm your password.");
    isValid = false;
  } else if (password !== confirmPassword) {
    setError("confirmPassword", "Passwords do not match.");
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = "Registration successful!";
    form.reset();
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

function setError(fieldName, message) {
  document.getElementById(`${fieldName}Error`).textContent = message;
  fields[fieldName].classList.add("invalid");
}

function clearError(fieldName) {
  document.getElementById(`${fieldName}Error`).textContent = "";
  fields[fieldName].classList.remove("invalid");
}

function clearAllErrors() {
  Object.keys(fields).forEach(clearError);
}
