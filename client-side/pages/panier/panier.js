const content = document.querySelector(".recap");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const recapContent = document.querySelector(".recap-content");
let number = cartNumberStorage;

const recap = `<div class="recap-line container mt-2 mb-5 text-end"> 
                <span class="quantité">${cartNumberStorage}</span> 
                <span class="msg-articles">article${
                  cartNumberStorage === 1 ? "" : "s"
                }</span> dans mon panier
                <button class="btn btn-sm btn-dark ms-3">vider le panier</button>
               </div>`;

const displayRecap = () => {
  if (!finalCartStorage) return;
  else {
    for (let i = 0; i < finalCartStorage.length; i++) {
      const recapRow =
        finalCartStorage &&
        `<tr class="modal-row align-middle border">
            <td><img class="img-fluid" width="150" src="${
              finalCartStorage[i][1].imageUrl
            }"/>
            </td>
            <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${
              finalCartStorage[i][1].name
            }</span><br>
            <div style="font-size:.9rem">Quantité : <span class="item-quantity">${
              finalCartStorage[i][0]
            }</span>
              </div>
              <div class="mt-1">
                <button class="btn btn-sm btn-outline-dark moins">-</button>
                <button class="btn btn-sm btn-outline-dark plus">+</button>
                <button class="btn btn-sm btn-outline-dark suppr">supprimer</button>
              </div>
            </td>
            <td class="price" style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${
              numeral(finalCartStorage[i][1].price)
                .divide(100)
                .format("0 0.00") * finalCartStorage[i][0]
            }€</td>
         </tr>`;
      recapContent.insertAdjacentHTML("afterbegin", recapRow);
    }
  }
};

const displayQuantity = () => {
  cartNumberStorage
    ? content.insertAdjacentHTML("beforeEnd", recap)
    : recapContent.insertAdjacentHTML(
        "afterBegin",
        `<div style="text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`
      );
};

let storageCopy = finalCartStorage && [...finalCartStorage];

const plus = () => {
  const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      //augmente la quantité du produit concerné
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (
          finalCartStorage[i][1].name ===
          btn.parentElement.parentElement.firstChild.textContent
        ) {
          storageCopy[i][0]++;
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
          btn.parentElement.previousElementSibling.firstChild.nextSibling.innerHTML =
            storageCopy[i][0];
          btn.parentElement.parentElement.nextElementSibling.innerHTML =
            numeral(storageCopy[i][1].price).divide(100).format("0 0.00") *
              storageCopy[i][0] +
            "€";
        }
      }
      //augmente le chiffre du cart global
      cartNumberStorage && number++;
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      document.querySelector(".quantité").innerHTML = number;
    });
  });
};

const moins = () => {
  const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
  // let storageCopy = [...finalCartStorage];
  document.querySelectorAll(".moins").forEach((btn) => {
    btn.addEventListener("click", () => {
      //diminue la quantité du produit concerné
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (
          finalCartStorage[i][1].name ===
          btn.parentElement.parentElement.firstChild.textContent
        ) {
          if (storageCopy[i][0] === 0) return;

          storageCopy[i][0]--;
          btn.parentElement.previousElementSibling.firstChild.nextSibling.innerHTML =
            storageCopy[i][0];
          btn.parentElement.parentElement.nextElementSibling.innerHTML =
            numeral(storageCopy[i][1].price).divide(100).format("0 0.00") *
              storageCopy[i][0] +
            "€";
          // au cas où on arrive à 0 :
          if (storageCopy[i][0] === 0 && storageCopy.length === 1) {
            document.querySelector(".recap-line").innerHTML = "";
            recapContent.innerHTML = `<div style="text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
          }
          if (storageCopy[i][0] === 0) {
            storageCopy.splice(i, 1);
            btn.parentElement.parentElement.parentElement.innerHTML = "";
          }
        }
      }
      localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
      //diminue le chiffre du cart global
      cartNumberStorage && number--;
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      document.querySelector(".quantité").innerHTML = number;
    });
  });
};

const suppr = () => {
  document.querySelectorAll(".suppr").forEach((btn) => {
    btn.addEventListener("click", () => {
      for (let i = 0; i < finalCartStorage.length; i++) {
        if (
          finalCartStorage[i][1].name ===
          btn.parentElement.parentElement.firstChild.textContent
        ) {
          //retrancher du cartNumberStorage
          number = number - finalCartStorage[i][0];
          localStorage.setItem("cartNumberStorage", JSON.stringify(number));
          document.querySelector(".quantité").innerHTML = number;

          //supprimer l'élément du finalCartStorage
          storageCopy.splice(i, 1);
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
        }
      }
      //supprime l'élément du DOM
      btn.parentElement.parentElement.parentElement.innerHTML = "";
    });
  });
};

const vider = () => {
  cartNumberStorage &&
    document.querySelector(".btn-dark").addEventListener("click", () => {
      localStorage.clear();
      recapContent.innerHTML = `<div style="text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
      document.querySelector(".recap-line").innerHTML = "";
    });
};

const initPage = (() => {
  displayQuantity();
  displayRecap();
  plus();
  moins();
  suppr();
  vider();
})();
