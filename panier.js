const content = document.querySelector(".recap");
const storage = JSON.parse(localStorage.getItem("cartNumberStorage"));
let number = storage;

const recap = storage
  ? `<div> <span class="quantité"></span> <span class="msg-articles">articles</span> dans mon panier<button class="btn btn-sm btn-danger ms-3">vider le panier</button></div>
      <div>modifier la quantité
      <button class="btn btn-sm btn-dark moins">-</button>
      <button class="btn btn-sm btn-dark plus">+</button>
      <button class="btn btn-sm btn-dark suppr">supprimer</button>
    </div>`
  : "Panier vide";

content.insertAdjacentHTML("beforeEnd", recap);

const displayQuantity = () => {
  document.querySelector(".quantité").innerHTML = storage;
  if (storage === 1) {
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
  moins();
  plus();
  suppr();
})();
