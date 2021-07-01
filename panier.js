const content = document.querySelector(".recap");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
const recapContent = document.querySelector(".recap-content");
let number = cartNumberStorage;

const recap = `<div class="recap-line container mt-2 mb-5 text-end"> 
                <span class="quantité"></span> 
                <span class="msg-articles">articles</span> dans mon panier
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
            }"/></td>
            <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${
              finalCartStorage[i][1].name
            }</span><br><span style="font-size:.9rem">Quantité : ${
          finalCartStorage[i][0]
        }</span>
            <div class="mt-1">
              <button class="btn btn-sm btn-outline-dark moins">-</button>
              <button class="btn btn-sm btn-outline-dark plus">+</button>
              <button class="btn btn-sm btn-outline-dark suppr">supprimer</button>
            </div></td>
            <td style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${
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
    ? (content.insertAdjacentHTML("beforeEnd", recap),
      (document.querySelector(".quantité").innerHTML = cartNumberStorage))
    : recapContent.insertAdjacentHTML(
        "afterBegin",
        `<div style="text-transform:uppercase; font-weight:bold; text-align:center">Panier vide...</div>`
      );
  // if (cartNumberStorage === 1) {
  //   document.querySelector(".msg-articles").textContent = "article";
  // }
};

const plus = () => {
  cartNumberStorage &&
    document.querySelector(".plus").addEventListener("click", () => {
      number++;
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      document.querySelector(".quantité").innerHTML = number;
    });
};

const moins = () => {
  cartNumberStorage &&
    document.querySelector(".moins").addEventListener("click", () => {
      if (number === 0) return;
      number--;
      localStorage.setItem("cartNumberStorage", JSON.stringify(number));
      console.log(number);
      document.querySelector(".quantité").innerHTML = number;
    });
};

const suppr = () => {
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
  moins();
  plus();
  suppr();
})();
