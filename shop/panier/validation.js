// DOM ELEMENTS
const form = document.querySelector("form");
const formSection = document.querySelector("#form-section");
const validateCartBtn = document.querySelector(".btn-valider-panier");
const openFormBtn = document.querySelector(".open-form-btn");
// LOCALSTORAGE
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
let orderStorage = JSON.parse(localStorage.getItem("orderStorage"));

// modal
const toInfoForm = () => {
  // 1. ouvre le formulaire:
  formSection.style.display = "block";
  scroll(0, window.innerHeight - 215);
  // 2. update rendu de la progress-bar
  setTimeout(() => {
    document.querySelector(".progres").children[0].classList = "progres-done";
    document
      .querySelector(".progres")
      .children[1].classList.add("progres-active");
  }, 300);
};
// formulaire
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
// validateForm() helpers
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
const validateForm = () => {
  const firstName = form.querySelector(".first-name");
  const lastName = form.querySelector(".last-name");
  const address = form.querySelector(".address");
  const city = form.querySelector(".city");
  const zip = form.querySelector(".zip");
  const email = form.querySelector(".email");
  const phone = form.querySelector(".phone");
  const checkbox = form.querySelector("[type=checkbox]");

  let isValid = true;
  // checkbox
  if (!checkbox.checked) {
    setError(checkbox, errorMessages.checkbox);
    isValid = false;
  } else {
    setSuccess(checkbox);
  }
  // STRINGS SIMPLES
  if (lastName.value.trim() === "") {
    setError(lastName, errorMessages.lastName);
    isValid = false;
  } else {
    setSuccess(lastName);
  }
  if (firstName.value.trim() === "") {
    setError(firstName, errorMessages.firstName);
    isValid = false;
  } else {
    setSuccess(firstName);
  }
  if (address.value.trim() === "") {
    setError(address, errorMessages.address);
    isValid = false;
  } else {
    setSuccess(address);
  }
  if (city.value.trim() === "") {
    setError(city, errorMessages.city);
    isValid = false;
  } else {
    setSuccess(city);
  }
  // INTEGERS / EMAIL
  const zipRegex = /^[0-9]{5}$/;
  if (zip.value.trim() === "") {
    setError(zip, errorMessages.zip);
    isValid = false;
  } else if (!zipRegex.test(zip.value.trim())) {
    setError(zip, errorMessages.zipRegex);
  } else {
    setSuccess(zip);
  }
  const phoneRegex = /^[0-9]{10}$/;
  if (phone.value.trim() === "") {
    setError(phone, errorMessages.phone);
    isValid = false;
  } else if (!phoneRegex.test(phone.value.trim())) {
    setError(phone, errorMessages.phoneRegex);
    isValid = false;
  } else {
    setSuccess(phone);
  }
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email.value.trim() === "") {
    setError(email, errorMessages.email);
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    setError(email, errorMessages.emailRegex);
    isValid = false;
  } else {
    setSuccess(email);
  }

  return isValid;
};

// POST REQUEST
const POST_URL = "http://localhost:3000/api/cameras/order";
// 1. construction + sauvegarde de l'objet requete
const saveProductsObject = () => {
  // 1. crée + sauvegarde l'objet "products" de la requete POST à envoyer plus tard:
  if (finalCartStorage && finalCartStorage == null) return;
  let productsArray = [];
  finalCartStorage.map((product) => productsArray.push(product[1]._id));
  localStorage.setItem("orderStorage", JSON.stringify([productsArray]));
};
const saveContactObject = () => {
  // fonctionne seulement si le formulaire est validé
  if (!validateForm()) return;
  // ajoute l'objet "contact" à POST_BODY:
  const contactObject = {
    firstName: form.querySelector(".first-name").value,
    lastName: form.querySelector(".last-name").value,
    address: form.querySelector(".address").value,
    city: form.querySelector(".city").value,
    email: form.querySelector(".email").value,
  };
  const orderStorage = JSON.parse(localStorage.getItem("orderStorage"));
  let orderStorageCopy = [...orderStorage];
  orderStorageCopy.unshift(contactObject);
  localStorage.setItem("orderStorage", JSON.stringify(orderStorageCopy));
  let storage = JSON.parse(localStorage.getItem("orderStorage"));
  console.log(storage);
};
const saveOrderConfirmation = (data) => {
  const orderConfirmation = {
    name: data.contact.firstName,
    id: data.orderId,
    date: new Date(),
  };
  console.log("orderConfirmation", orderConfirmation);
  localStorage.setItem("orderStorage", JSON.stringify(orderConfirmation));
  let storage = JSON.parse(localStorage.getItem("orderStorage"));
  console.log("orderConfirmation sauvegardée dans le storage ✌🏾", storage);
};
// 2. envoi requête à L'API (pour valider la commande + get l'order ID)
const sendOrder = async (e) => {
  // fonctionne uniquement si le formulaire est validé
  if (!validateForm()) {
    e.preventDefault();
    return;
  }
  let orderStorage = JSON.parse(localStorage.getItem("orderStorage"));
  const POST_BODY = {
    contact: orderStorage[0],
    products: orderStorage[1],
  };
  const requete = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(POST_BODY),
  };
  try {
    const response = await fetch(POST_URL, requete);
    const data = await response.json();
    saveOrderConfirmation(data);
  } catch (error) {
    console.log(error);
  }
};

// FONCTION GLOBALE - IIFE
const validationInit = (() => {
  validateCartBtn.addEventListener("click", saveProductsObject);
  openFormBtn.addEventListener("click", toInfoForm);
  form.addEventListener("submit", (e) => {
    validateForm();
    saveContactObject();
    sendOrder(e);
  });
})();
