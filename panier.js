const content = document.querySelector(".recap");
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
let number = cartNumberStorage;

const recap = cartNumberStorage
  ? `<div> 
      <span class="quantité"></span> 
      <span class="msg-articles">articles</span> dans mon panier
      <button class="btn btn-sm btn-danger ms-3">vider le panier</button>
      </div>`
  : `<div>Panier vide</div>`;

const displayRecap = () => {
  if (!finalCartStorage) return;
  else {
    for (let i = 0; i < finalCartStorage.length; i++) {
      const recapTable =
        finalCartStorage &&
        `<tr class="modal-row align-middle border">
    <td><img class="img-fluid" width="150" src="${
      finalCartStorage[i][1].imageUrl
    }"/></td>
    <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${
      finalCartStorage[i][1].name
    }</span><br><span style="font-size:.9rem; text-align:left">Quantité : ${
          finalCartStorage[i][0]
        }</span>
    <div>
      <button class="btn btn-sm btn-dark moins">-</button>
      <button class="btn btn-sm btn-dark plus">+</button>
      <button class="btn btn-sm btn-dark suppr">supprimer</button>
    </div></td>
    <td style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${numeral(
      finalCartStorage[i][1].price
    )
      .divide(100)
      .format("0 0.00")}€</td>
   </tr>`;
      document
        .querySelector(".recap-content")
        .insertAdjacentHTML("afterbegin", recapTable);
    }
  }
};

const displayQuantity = () => {
  content.insertAdjacentHTML("beforeEnd", recap);
  document.querySelector(".quantité").innerHTML = cartNumberStorage;
  if (cartNumberStorage === 1) {
    document.querySelector(".msg-articles").textContent = "article";
  }
};

const plus = () => {
  document.querySelector(".plus").addEventListener("click", () => {
    number++;
    localStorage.setItem("cartNumberStorage", JSON.stringify(number));
    document.querySelector(".quantité").innerHTML = number;
  });
};

const moins = () => {
  document.querySelector(".moins").addEventListener("click", () => {
    if (number === 0) return;
    number--;
    localStorage.setItem("cartNumberStorage", JSON.stringify(number));
    console.log(number);
    document.querySelector(".quantité").innerHTML = number;
  });
};

const clear = () => {
  localStorage.clear();
  content.textContent = "Panier vide";
};
const suppr = () => {
  document.querySelector(".suppr").addEventListener("click", clear);
};

const initPage = (() => {
  displayQuantity();
  displayRecap();
  moins();
  plus();
  suppr();
})();
