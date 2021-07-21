// DOM ELEMENTS
const formSection = document.querySelector("#form-section");
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
const validateCartBtn = document.querySelector(".btn-valider-panier");
const openFormBtn = document.querySelector(".open-form");
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const orderStorage = JSON.parse(localStorage.getItem("orderStorage"));

// VARIABLES REQUETE POST
const POST_URL = "http://localhost:3000/api/cameras/order";
let JSON_REQUEST = {
  contact: orderStorage && orderStorage[0],
  products: orderStorage && orderStorage[1],
};

// requete POST
const requete = {
  method: "POST", // *GET, POST, PUT, DELETE...
  headers: {
    "Content-Type": "application/json", // application/x-www-form-urlencoded
  },
  mode: "cors", // no-cors, *cors, same-origin
  body: JSON.stringify(JSON_REQUEST),
  // credentials: "include", // include, *same-origin, omit
  // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
  // redirect: "follow", // manual, *follow, error
  // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

// CONFIRMATION PANIER
const validateCart = () => {
  // ouvre le formulaire
  openFormBtn.addEventListener("click", () => {
    formSection.style.display = "block";
    scroll(0, window.innerHeight - 200);
  });
};

///////////////////////////////////
//          FORMULAIRE
//////////////////////////////////

// ERROR MESSAGES
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

let isValid;
// VALIDATION HELPER FUNCTIONS
const setError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add("fail");
  const errorMsg = formControl.querySelector(".errorMsg");
  errorMsg.innerHTML = message;
  return (isValid = false);
};

const setSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove("fail");
  formControl.classList.add("success");
  return (isValid = true);
};

// VÉRIFICATION FORMULAIRE
const checkFormControls = () => {
  form.addEventListener("submit", (e) => {
    // checkbox
    if (!checkbox.checked) {
      e.preventDefault();
      setError(checkbox, errorMessages.checkbox);
    } else {
      setSuccess(checkbox);
    }
    // STRINGS SIMPLES
    // nom de famille
    if (lastName.value.trim() === "") {
      e.preventDefault();
      setError(lastName, errorMessages.lastName);
    } else {
      setSuccess(lastName);
    }
    // prénom
    if (firstName.value.trim() === "") {
      e.preventDefault();
      setError(firstName, errorMessages.firstName);
    } else {
      setSuccess(firstName);
    }
    // adresse
    if (address.value.trim() === "") {
      e.preventDefault();
      setError(address, errorMessages.address);
    } else {
      setSuccess(address);
    }
    // ville
    if (city.value.trim() === "") {
      e.preventDefault();
      setError(city, errorMessages.city);
    } else {
      setSuccess(city);
    }
    // INTEGERS
    // code postal
    const zipRegex = /^[0-9]{5}$/;
    if (zip.value.trim() === "") {
      e.preventDefault();
      setError(zip, errorMessages.zip);
    } else if (!zipRegex.test(zip.value.trim())) {
      e.preventDefault();
      setError(zip, errorMessages.zipRegex);
    } else {
      setSuccess(zip);
    }
    // tel
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.value.trim() === "") {
      e.preventDefault();
      setError(phone, errorMessages.phone);
    } else if (!phoneRegex.test(phone.value.trim())) {
      e.preventDefault();
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
  });
};

// CONSTRUIT ET SAUVEGARDE L'OBJET JSON_REQUEST
const saveRequestObject = () => {
  // 1. ajoute l'array "produits" à JSON_REQUEST (l'objet à envoyer au serveur)
  finalCartStorage &&
    validateCartBtn.addEventListener("click", () => {
      let productsArray = [];
      if (finalCartStorage !== null) {
        finalCartStorage.map((product) => productsArray.push(product[1]._id));
      }
      localStorage.setItem("orderStorage", JSON.stringify([productsArray]));
    });
  // 2. ajoute l'objet "contact" à JSON_REQUEST (l'objet à envoyer au serveur)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const contactObject = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    // seulement si le formulaire est validé:
    console.log(isValid);
    if (isValid) {
      const orderStorage = JSON.parse(localStorage.getItem("orderStorage"));
      let orderStorageCopy = [...orderStorage];
      orderStorageCopy.unshift(contactObject);
      localStorage.setItem("orderStorage", JSON.stringify(orderStorageCopy));
      JSON_REQUEST = {
        contact: orderStorage[0],
        products: orderStorage[1],
      };
      console.log(JSON_REQUEST);
      postOrder();
    }
  });
};

// POST REQUEST A L'API POUR VALIDER LA COMMANDE CÔTÉ SERVEUR + RECEVOIR L'ORDER ID
const postOrder = async () => {
  // const orderStorage = JSON.parse(localStorage.getItem("orderStorage"));
  try {
    const response = await fetch(POST_URL, requete);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// VALIDATION PANIER + FORMULAIRE
const validateOrder = () => {
  // 1. si formulaire n'est pas bien rempli, empêcher de submit:
  form.addEventListener("submit", (e) => {
    // postOrder();
    // if (condition) {
    //   e.preventDefault();
    // }
    // // 2. sinon submit la requete:
    // else {
    // }
  });
};

const validationInit = (() => {
  validateCart();
  checkFormControls();
  saveRequestObject();
  validateOrder();
})();
