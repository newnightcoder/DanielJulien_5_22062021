// DOM ELEMENTS
const recapContainer = document.querySelector(".recap");
const recapContent = document.querySelector(".recap-content");
const recapHeader = document.querySelector("thead");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const finalPriceStorage = JSON.parse(localStorage.getItem("finalPriceStorage"));
let storageCopy = finalCartStorage && [...finalCartStorage];
let number = cartNumberStorage;
const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;

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
        `<tr class="modal-row align-middle border text-center">
      <td class="d-flex align-items-center border-0 justify-content-start ms-5" style="width:40%"><img class="img" width="150" src="${
        finalCartStorage[i][1].imageUrl
      }"/><span class="item-name" style="display:block; padding-left:1rem; white-space:nowrap; text-transform:uppercase; font-weight:600">${
          finalCartStorage[i][1].name
        }</span>
      </td>
      <td style="width:40%">
      <div style="font-size:.9rem">Quantité : <span class="item-quantity">${
        finalCartStorage[i][0]
      }</span>
      </div>
      <div class="mt-1 d-flex justify-content-center align-items-center" >
      <button class="btn btn-sm btn-dark btn-moins mx-2" style="font-size:1.25rem; width:40px; height:40px">-</button>
      <button class="btn btn-sm btn-dark btn-plus mx-2" style="font-size:1.25rem; width:40px; height:40px">+</button>
      <button class="btn btn-sm btn-dark btn-suppr mx-2 style="width:40px; height:40px"><i class="bi bi-trash" style="font-size:1.25rem"></i></button>
      </div>
      </td>
      <td class="item-price" style="white-space:nowrap; text-transform:uppercase; font-weight:600; width:20%">${numeral(
        finalCartStorage[i][1].price * finalCartStorage[i][0]
      )
        .divide(100)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")}€</td>
      </tr>`;
      recapContent.insertAdjacentHTML("afterbegin", recapRow);
    }
  }
};
const displayRecapTotal = () => {
  const recapTotal = `
  <tr class="modal-row align-middle border-0 text-center bg-dark text-white">
  <td class="border-0">
  <div class="recap-panier" style="font-size:1.25rem">Le panier contient 
  <span class="total-quantity">${cartNumberStorage}</span> 
          <span class="msg-articles"> article${
            cartNumberStorage <= 1 ? "" : "s"
          }</span>
      </div>
    </td>
    <td class="border-0">
        <button class="btn btn-sm btn-secondary my-1 btn-vider">vider le panier</button>
    </td>
    <td class="border-0">
        <span class="prix-total" style="white-space:nowrap; text-transform:uppercase; text-decoration:underline; font-size:1.15rem; font-weight:700; color:white">TOTAL :&nbsp;&nbsp;${numeral(
          totalPrice
        )
          .format("0 0.00")
          .replace(priceFormatRegex, "$1 ")}€</span>
    </td>
</tr>
<tr  class=" align-middle border-0 text-center mt-1 ms-auto modal-row">
    <td class="border-0"></td>  
    <td class="border-0"></td>  
</tr>`;
  const btnValider = `<div class="container text-center">
  <button data-bs-toggle="modal" data-bs-target="#modal" class="btn btn-md btn-primary mb-3 btn-valider-panier">valider mon panier
  </button></div>`;

  if (cartNumberStorage > 0) {
    recapContent.insertAdjacentHTML("afterbegin", recapTotal);
    recapContainer.insertAdjacentHTML("beforeend", btnValider);
  } else {
    recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
    recapHeader.style.display = "none";
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
      document.querySelector(".msg-articles").innerHTML = `article${
        number <= 1 ? "" : "s"
      }`;
      // update le prix global:
      const totalPrice = storageCopy.reduce((acc, current) => {
        return acc + (current[1].price / 100) * current[0];
      }, 0);
      localStorage.setItem("finalPriceStorage", JSON.stringify(totalPrice));
      document.querySelector(
        ".prix-total"
      ).innerHTML = `TOTAL :&nbsp;&nbsp;${numeral(totalPrice)
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
      document.querySelector(".msg-articles").innerHTML = `article${
        number <= 1 ? "" : "s"
      }`;
      const totalPrice = storageCopy.reduce((acc, current) => {
        return acc + (current[1].price / 100) * current[0];
      }, 0);
      localStorage.setItem("finalPriceStorage", JSON.stringify(totalPrice));
      document.querySelector(
        ".prix-total"
      ).innerHTML = `TOTAL :&nbsp;&nbsp;${numeral(totalPrice)
        .format("0 0.00")
        .replace(priceFormatRegex, "$1 ")} €`;
    });
  });
};
const suppr = () => {
  document.querySelectorAll(".btn-suppr").forEach((btn) => {
    let item = btn.parentNode.parentNode.parentNode;
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
            recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
            recapHeader.style.display = "none";
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
      recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
      recapHeader.style.display = "none";
      document.querySelector(".btn-valider-panier").style.display = "none";
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
