///////////////////////
//  DOM VARIABLES
///////////////////////

const form = document.querySelector("form");
const gender = document.querySelector("select");
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const address = document.querySelector(".address");
const city = document.querySelector(".city");
const zip = document.querySelector(".zip");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const checkbox = document.querySelector("[type=checkbox]");
const submitBtn = document.querySelector("[type=submit]");

///////////////////////
//   FUNCTIONS
///////////////////////

const setError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add("fail");
  const errorMsg = formControl.querySelector(".errorMsg");
  errorMsg.innerHTML = message;
};

const setSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove("fail");
  formControl.classList.add("success");
};

const errorMessages = {
  firstName: "Veuillez entrer votre prénom",
  lastName: "Veuillez entrer votre nom de famille",
  address: "Veuillez entrer votre adresse",
  city: "Veuillez entrer votre ville",
  zip: "Votre code postal",
  zipRegex: "Votre code postal doit contenir 5 chiffres",
  email: "Veuillez entrer votre email",
  emailRegex: "Cet email n'est pas valide",
  phone: "Veuillez entrer votre téléphone",
  phoneRegex: "Votre numéro doit contenir 10 chiffres",
  checkbox: "Veuillez accepter les conditions générales",
};

const checkFormControls = (event) => {
  // checkbox
  if (checkbox.checked === false) {
    event.preventDefault();
    setError(checkbox, errorMessages.checkbox);
  } else {
    setSuccess(checkbox);
  }

  // STRINGS SIMPLES

  // nom de famille
  if (lastName.value.trim() === "") {
    event.preventDefault();
    setError(lastName, errorMessages.lastName);
  } else {
    setSuccess(lastName);
  }
  // prénom
  if (firstName.value.trim() === "") {
    event.preventDefault();
    setError(firstName, errorMessages.firstName);
  } else {
    setSuccess(firstName);
  }
  // adresse
  if (address.value.trim() === "") {
    event.preventDefault();
    setError(address, errorMessages.address);
  } else {
    setSuccess(address);
  }
  // ville
  if (city.value.trim() === "") {
    event.preventDefault();
    setError(city, errorMessages.city);
  } else {
    setSuccess(city);
  }

  // INTEGERS

  // code postal
  const zipRegex = /^[0-9]{5}$/;
  if (zip.value.trim() === "") {
    event.preventDefault();
    setError(zip, errorMessages.zip);
  } else if (!zipRegex.test(zip.value.trim())) {
    event.preventDefault();
    setError(zip, errorMessages.zipRegex);
  } else {
    setSuccess(zip);
  }
  // tel
  const phoneRegex = /^[0-9]{10}$/;
  if (phone.value.trim() === "") {
    event.preventDefault();
    setError(phone, errorMessages.phone);
  } else if (!phoneRegex.test(phone.value.trim())) {
    event.preventDefault();
    setError(phone, errorMessages.phoneRegex);
  } else {
    setSuccess(phone);
  }

  //  EMAIL FORMAT

  //  email
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email.value.trim() === "") {
    setError(email, errorMessages.email);
  } else if (!emailRegex.test(email.value.trim())) {
    setError(email, errorMessages.emailRegex);
  } else {
    setSuccess(email);
  }
};

const validationInit = (() => {
  form.addEventListener("submit", (e) => {
    checkFormControls(e);
  });
})();
