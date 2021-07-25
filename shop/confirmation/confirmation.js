// localStorage
const storage = JSON.parse(localStorage.getItem("orderStorage"));
const priceStorage = JSON.parse(localStorage.getItem("finalPriceStorage"));
const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;

// affiche le prénom de l'utilisateur
const userName = `<span class="user-name">${storage.name}, <span/>`;
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
<div class="container order-info text-left py-3 ps-4 d-flex flex-column align-items-start">
   <p class="h4 text-center order-title">R&eacute;sum&eacute; de votre commande</p>
    <div class="d-flex flex-column">
      <span class="order-info__text text-nowrap">Identifiant de votre commande</span>
      <span class="order-id">${storage.id}</span>
    </div>
    <div class="d-flex flex-column">
      <span class="order-info__text text-nowrap">Date de votre achat</span>
      <span class="date-capitalize">${new Date(storage.date).toLocaleDateString(
        "fr-FR",
        dateOptions
      )}</span>
    </div>
    <div class="d-flex flex-column">
      <span class="order-info__text text-nowrap">Montant de votre achat</span>
      <span>${JSON.stringify(priceStorage).replace(
        priceFormatRegex,
        "$1 "
      )}€</span>    
    </div>

</div>`;
const confirmationMsg = document
  .querySelector(".info")
  .insertAdjacentHTML("beforeend", orderInfo);
