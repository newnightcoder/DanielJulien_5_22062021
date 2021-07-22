// localStorage
const storage = JSON.parse(localStorage.getItem("orderStorage"));
// affiche le prénom de l'utilisateur
const userName = `<span class="user-name">${storage.name}, <span/>`;
const title = document
  .querySelector("h1")
  .insertAdjacentHTML("afterbegin", userName);
// affiche les détails de la commande:
const orderInfo = `
<div class="order-info text-left py-3 px-5">
<h4 class="text-center order-title">R&eacute;sum&eacute; de votre commande</h4>
    <span class="order-info__text">Identifiant de votre commande&colon; </span><span class="order-id">${
      storage.id
    }</span><br />
    <span class="order-info__text">Date de votre achat: </span><span>${new Date(
      storage.date
    )}</span>
</div>`;
const confirmationMsg = document
  .querySelector(".info")
  .insertAdjacentHTML("beforeend", orderInfo);
