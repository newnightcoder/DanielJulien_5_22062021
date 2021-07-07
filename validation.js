const form = document.querySelector("form");
const gender = document.querySelector("select");
const firstName = document.querySelector(".firstname");
const lastName = document.querySelector(".lastname");
const address = document.querySelector(".address");
const city = document.querySelector(".city");
const zip = document.querySelector(".zip");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const checkbox = document.querySelector("[type=checkbox]");
const submitBtn = document.querySelector("[type=submit]");

form.addEventListener("submit", (e) => {
  if (firstName.value.trim() === "") {
    e.preventDefault();
    firstName.nextElementSibling.style.display = "block";
    firstName.nextElementSibling.innerHTML = "Veuillez entrer votre prénom";
  }
  if (lastName.value.trim() === "") {
    e.preventDefault();
    lastName.nextElementSibling.style.display = "block";
    lastName.nextElementSibling.innerHTML =
      "Veuillez entrer votre nom de famille";
  }
  if (address.value.trim() === "") {
    e.preventDefault();
    address.nextElementSibling.style.display = "block";
    address.nextElementSibling.innerHTML = "Veuillez entrer votre adresse";
  }
  if (city.value.trim() === "") {
    e.preventDefault();
    city.nextElementSibling.style.display = "block";
    city.nextElementSibling.innerHTML = "Veuillez entrer votre ville";
  }
  if (zip.value.trim() === "") {
    e.preventDefault();
    zip.nextElementSibling.style.display = "block";
    zip.nextElementSibling.innerHTML = "Votre code postal";
  }
  if (email.value.trim() === "") {
    e.preventDefault();
    email.parentElement.nextElementSibling.style.display = "block";
    email.parentElement.nextElementSibling.innerHTML =
      "Veuillez entrer votre email";
  }
  if (phone.value.trim() === "") {
    e.preventDefault();
    phone.parentElement.nextElementSibling.style.display = "block";
    phone.parentElement.nextElementSibling.innerHTML =
      "Veuillez entrer votre téléphone";
  }
  if (checkbox.checked === false) {
    e.preventDefault();
    checkbox.parentElement.nextElementSibling.style.display = "block";
    checkbox.parentElement.nextElementSibling.innerHTML =
      "Veuillez accepter les conditions générales";
  }
});
