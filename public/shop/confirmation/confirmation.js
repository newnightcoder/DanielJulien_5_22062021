// localStorage
const storage = JSON.parse(localStorage.getItem("orderStorage"));
const priceStorage = JSON.parse(localStorage.getItem("finalPriceStorage"));
const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;

// affiche le prénom de l'utilisateur
const userName = `<span class="user-name">${storage.name}, <span/><br>`;
const title = document
  .querySelector("h1")
  .insertAdjacentHTML("afterbegin", userName);

// affiche les détails de la commande:
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  // hourCycle: "h24",
  hour: "2-digit",
  minute: "numeric",
};
const orderInfo = `
<div class="order-info container d-flex flex-column align-items-center ps-4 py-3">
    <p class="h4 order-title">R&eacute;sum&eacute; de votre commande</p>
    <div><div class="d-flex flex-column flex-md-row">
      <span class="order-info__text text-nowrap"><u>Identifiant de votre commande</u>&colon;&nbsp;</span>
      <span class="order-id">${storage.id}</span>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <span class="order-info__text text-nowrap"><u>Date de votre achat</u>&colon;&nbsp;</span>
      <span class="date">${new Date(storage.date).toLocaleDateString(
        "fr-FR",
        dateOptions
      )}</span>
    </div>
    <div class="d-flex flex-column flex-md-row">
      <span class="order-info__text text-nowrap"><u>Montant de votre achat</u>&colon;&nbsp;</span>
      <span>${JSON.stringify(priceStorage).replace(
        priceFormatRegex,
        "$1 "
      )}€</span>    
    </div>
    </div>

</div>`;
const confirmationMsg = document
  .querySelector(".info")
  .insertAdjacentHTML("beforeend", orderInfo);

localStorage.removeItem("finalCartStorage");
localStorage.removeItem("cartNumberStorage");
