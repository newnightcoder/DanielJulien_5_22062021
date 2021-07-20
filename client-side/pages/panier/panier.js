const content = document.querySelector(".recap");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const recapContent = document.querySelector(".recap-content");
let number = cartNumberStorage;

const recap = `
    <th class="bg-dark text-white text-center" scope="row">TOTAL</th>
<tr class="modal-row align-middle border text-center">
<td>
</td>
<td>
<div>
<span class="quantité">${cartNumberStorage}</span> 
<span class="msg-articles">article${
  cartNumberStorage === 1 ? "" : "s"
}</span> dans mon panier
                </div>
                <button class="btn btn-sm btn-dark my-1">vider le panier</button>

                </td>
<td>
                  <span style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">TOTAL: ???</span>
                  </td>
                  </tr>
    <tr  class=" align-middle border-0 text-center mt-1 ms-auto modal-row">
    <td class="border-0"></td>  
    <td class="border-0"></td>  
    <td class="border-0 text-end">
        <button  class="btn btn-sm btn-primary mb-3">valider</button>
      </td>
    </tr>`;

const displayRecap = () => {
  if (!finalCartStorage) return;
  else {
    for (let i = 0; i < finalCartStorage.length; i++) {
      const recapRow =
        finalCartStorage &&
        `<tr class="modal-row align-middle border text-center">
            <td class="d-flex align-items-center justify-content-start ps-5" style="width:40%"><img class="img-fluid" width="150" src="${
              finalCartStorage[i][1].imageUrl
            }"/><span style="display:block; padding-left:1rem; white-space:nowrap; text-transform:uppercase; font-weight:600">${
          finalCartStorage[i][1].name
        }</span>
            </td>
            <td style="width:40%">
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
            <td class="price" style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red; width:20%">${
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
    ? recapContent.insertAdjacentHTML("afterbegin", recap)
    : // content.insertAdjacentHTML("beforeEnd", recap)
      (recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`);
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
            // document.querySelector(".recap-line").innerHTML = "";
            recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
          } else if (storageCopy[i][0] === 0) {
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
      if (storageCopy[i][0] === 0 && storageCopy.length === 1) {
        // document.querySelector(".recap-line").innerHTML = "";
        recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
      } else if (storageCopy[i][0] === 0) {
        storageCopy.splice(i, 1);
        btn.parentElement.parentElement.parentElement.innerHTML = "";
      }
    });
  });
};

const vider = () => {
  cartNumberStorage &&
    document.querySelector(".btn-dark").addEventListener("click", () => {
      localStorage.clear();
      recapContent.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" style="border:1px solid lightgray; min-height:calc(100vh - 300px); text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`;
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
