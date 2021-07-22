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
<div class="order-info text-left py-3 px-5">
<h4 class="text-center order-title">R&eacute;sum&eacute; de votre commande</h4>
    <span class="order-info__text">Identifiant de votre commande</span>&colon;&nbsp;<span class="order-id">${
      storage.id
    }</span><br />
    <span class="order-info__text">Date de votre achat</span><span class="date-capitalize">&colon;&nbsp;${new Date(
      storage.date
    ).toLocaleDateString("fr-FR", dateOptions)}</span><br />
    <span class="order-info__text">Montant de votre achat</span>&colon;&nbsp;<span>${JSON.stringify(
      priceStorage
    ).replace(priceFormatRegex, "$1 ")}€</span>
</div>`;
const confirmationMsg = document
  .querySelector(".info")
  .insertAdjacentHTML("beforeend", orderInfo);
