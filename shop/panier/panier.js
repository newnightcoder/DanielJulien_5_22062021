// DOM ELEMENTS
const recapContainer = document.querySelector(".content");
const recapContent = document.querySelector(".recap");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const finalPriceStorage = JSON.parse(localStorage.getItem("finalPriceStorage"));
let storageCopy = finalCartStorage && [...finalCartStorage];
let number = cartNumberStorage;
const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;
const panierVide = `<div class="d-flex flex-column justify-content-center align-items-center fw-bold text-uppercase border panier-vide" >Panier vide...</div>`;

// REDUCE METHOD TO CALCULATE TOTAL PRICE😎✌🏾
const totalPrice =
  finalCartStorage &&
  storageCopy.reduce((acc, current) => {
    return acc + (current[1].price / 100) * current[0];
  }, 0);

// AFFICHE TABLEAU RECAP
const displayRecapRow = () => {
  if (!finalCartStorage) return;
  else {
    for (let i = 0; i < finalCartStorage.length; i++) {
      const recapRow =
        finalCartStorage &&
        `<div class="container-fluid  d-flex rounded px-0 px-md-5 mb-4 pb-3 border-bottom">
          <div class="col-6 pe-2">
            <img width="250" height="180"
            src="${
              finalCartStorage[i][1].imageUrl
            }" class="rounded-start border-0 p-0"> 
          </div> 
          <div class="col-6 d-flex flex-column justify-content-evenly align-items-center position-relative pt-2">
            <div class="container d-flex flex-column align-items-start justify-content-between pe-0">
             <h3 class="fs-5 text-nowrap mb-1 item-name">${
               finalCartStorage[i][1].name
             }</h3>
              <div class="container d-flex align-items-center justify-content-between px-0">
                <span class="d-block pb-1">${numeral(
                  finalCartStorage[i][1].price
                )
                  .divide(100)
                  .format("0 0.00")
                  .replace(priceFormatRegex, "$1 ")}€</span>
                <button class="btn btn-sm btn-secondary text-white btn-suppr" ><i class="bi bi-trash" style="font-size:1.25rem"></i></button>
              </div>
            </div>
            <div class="container  d-flex flex-column align-items-start px-0">
              <span class="container-fluid text-start d-block pt-1 ">Quantité: <span class="item-quantity">${
                finalCartStorage[i][0]
              }</span></span>
              <div class="container-fluid d-flex align-items-center justify-content-start gap-3 mt-1 mb-2">
                <button class="btn btn-sm text-white btn-moins">-</button>
                <button class="btn btn-sm text-white btn-plus">+</button>
              </div>
            </div>
            <div class="container d-flex justify-content-between pt-1"><span >Total:&nbsp;</span><span class="item-price">${numeral(
              finalCartStorage[i][1].price * finalCartStorage[i][0]
            )
              .divide(100)
              .format("0 0.00")
              .replace(priceFormatRegex, "$1 ")}€</span></div>
          </div>
      </div>`;
      recapContent.insertAdjacentHTML("beforeend", recapRow);
    }
  }
};
const displayRecapTotal = () => {
  const recapTotal = `  
<div class="px-md-5">
  <button class="btn btn-sm btn-secondary d-block ms-auto me-2 mb-3 btn-vider">vider le panier</button>   
  <div class="container d-flex justify-content-between border-top pt-2">
    <div class="col-9 ">Nombre d'articles&colon;</div>
    <div class="col-3 text-end total-quantity">${cartNumberStorage}</div>
  </div>
  <div class="container d-flex justify-content-between pt-1">
    <div class="col-9">Montant de la commande&colon;</div>
    <div class="col-3 text-end text-nowrap prix-total">${numeral(totalPrice)
      .format("0 0.00")
      .replace(priceFormatRegex, "$1 ")}€</div>
  </div>
  <div class="container d-flex justify-content-between py-1">
    <div class="col-9">Livraison&colon;</div>
    <div class="col-3 text-end">offerte</div>
  </div>
  <div class="container d-flex justify-content-between fw-bold border-top py-1 total-row">
    <div class="col-9">TOTAL</div>
    <div class="col-3 text-end text-nowrap prix-total-2">${numeral(totalPrice)
      .format("0 0.00")
      .replace(priceFormatRegex, "$1 ")}€</div>
  </div>
</div>`;

  const btnValider = ` <div class="container text-center">
  <button data-bs-toggle="modal" data-bs-target="#modal" class="btn btn-md mt-3 mb-4 btn-valider-panier shadow">valider mon panier
  </button>
</div>`;

  if (cartNumberStorage > 0) {
    recapContainer.insertAdjacentHTML("beforeend", recapTotal);
    recapContainer.insertAdjacentHTML("beforeend", btnValider);
  } else {
    recapContainer.innerHTML = panierVide;
  }
};

// CART BUTTONS USER
const plus = () => {
  const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));

  document.querySelectorAll(".btn-plus").forEach((btn) => {
    const item = btn.parentNode.parentNode.parentNode;
    let itemName = item.querySelector(".item-name").innerHTML;
    let itemQuantity = item.querySelector(".item-quantity");
    let itemPrice = item.querySelector(".item-price");

    btn.addEventListener("click", () => {
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (finalCartStorage[i][1].name === itemName) {
          // augmente la quantité du produit concerné dans storageCopy:
          storageCopy[i][0]++;
          // update du DOM:
          itemQuantity.innerHTML = storageCopy[i][0];
          itemPrice.innerHTML =
            numeral(storageCopy[i][1].price * storageCopy[i][0])
              .divide(100)
              .format("0 0.00")
              .replace(priceFormatRegex, "$1 ") + "€";
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
        }
      }
      //augmente le chiffre du cart global
      cartNumberStorage !== null && number++;
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      // update quantité globale à l'écran
      document.querySelector(".total-quantity").innerHTML = number;
      // update le prix global:
      const totalPrice = storageCopy.reduce((acc, current) => {
        return acc + (current[1].price / 100) * current[0];
      }, 0);
      // sauvegarde du prix global dans le localstorage
      localStorage.setItem("finalPriceStorage", JSON.stringify(totalPrice));
      document.querySelector(".prix-total").innerHTML = `${numeral(totalPrice)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")}€`;
      document.querySelector(".prix-total-2").innerHTML = `${numeral(totalPrice)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")}€`;
    });
  });
};
const moins = () => {
  const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));

  document.querySelectorAll(".btn-moins").forEach((btn) => {
    let item = btn.parentNode.parentNode.parentNode;
    let itemName = item.querySelector(".item-name").innerHTML;
    let itemQuantity = item.querySelector(".item-quantity");
    let itemPrice = item.querySelector(".item-price");

    btn.addEventListener("click", () => {
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (finalCartStorage[i][1].name === itemName) {
          // ne pas descendre en dessous de zéro
          if (storageCopy[i][0] === 0) return;
          // diminuer la quantité du produit concerné dans le storageCopy:
          storageCopy[i][0]--;
          // update du DOM
          itemQuantity.innerHTML = storageCopy[i][0];
          itemPrice.innerHTML =
            numeral(storageCopy[i][1].price * storageCopy[i][0])
              .divide(100)
              .format("0 0.00")
              .replace(priceFormatRegex, "$1 ") + " €";
        }
      }
      // update du cartStorage:
      localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
      // update du storage quantité totale:
      cartNumberStorage && number--;
      if (number === null) {
        return;
      }
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      // update DOM quantité totale:
      document.querySelector(".total-quantity").innerHTML = number;
      const totalPrice = storageCopy.reduce((acc, current) => {
        return acc + (current[1].price / 100) * current[0];
      }, 0);
      localStorage.setItem("finalPriceStorage", JSON.stringify(totalPrice));
      document.querySelector(".prix-total").innerHTML = `${numeral(totalPrice)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")} €`;
      document.querySelector(".prix-total-2").innerHTML = `${numeral(totalPrice)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")} €`;
    });
  });
};
const suppr = () => {
  document.querySelectorAll(".btn-suppr").forEach((btn) => {
    let item = btn.parentNode.parentNode.parentNode.parentNode;
    let itemName = item.querySelector(".item-name").innerHTML;

    btn.addEventListener("click", () => {
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (finalCartStorage[i][1].name === itemName) {
          // supprime l'élément du DOM
          item.innerHTML = "";
          // supprime l'élément du storage
          storageCopy.splice(i, 1);
          if (storageCopy[i] == null && storageCopy.length < 1) {
            console.log("yay nullll!!");
            recapContainer.innerHTML = panierVide;
            document.querySelector(".btn-valider-panier").style.display =
              "none";
          }
          //retrancher du cartNumberStorage
          number = number - finalCartStorage[i][0];
          localStorage.setItem("cartNumberStorage", JSON.stringify(number));

          //supprimer l'élément du finalCartStorage
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
        }
      }
    });
  });
};
const vider = () => {
  cartNumberStorage !== null &&
    document.querySelector(".btn-vider").addEventListener("click", () => {
      localStorage.clear();
      recapContainer.innerHTML = panierVide;
      // recapHeader.style.display = "none";
      // document.querySelector(".btn-valider-panier").style.display = "none";
    });
};

// FONCTION GLOBALE - IIFE
const initPage = (() => {
  displayRecapTotal();
  displayRecapRow();
  plus();
  moins();
  suppr();
  vider();
})();
