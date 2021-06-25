const content = document.querySelector(".recap");
const storage = JSON.parse(localStorage.getItem("cartStorage"));
let number = storage;

const recap = storage
  ? `<div> <span class="quantité"></span> articles dans mon panier</div>
<div>vider mon panier</div>
<div>modifier la quantité
<button class="plus">+</button>
<button class="moins">-</button>
<button class="suppr">tout supprimer</button>
</div>`
  : "Panier vide";
content.insertAdjacentHTML("afterBegin", recap);

const displayQuantity = () => {
  document.querySelector(".quantité").innerHTML = storage;
};
displayQuantity();

const plus = () => {
  document.querySelector(".plus").addEventListener("click", () => {
    number++;
    localStorage.setItem("cartStorage", JSON.stringify(number));
    console.log(number);
    document.querySelector(".quantité").innerHTML = number;
  });
};
plus();

const moins = () => {
  document.querySelector(".moins").addEventListener("click", () => {
    number--;
    localStorage.setItem("cartStorage", JSON.stringify(number));
    console.log(number);
    document.querySelector(".quantité").innerHTML = number;
  });
};
moins();

const clear = () => {
  localStorage.clear();
  content.textContent = "Panier vide";
};
const suppr = () => {
  document.querySelector(".suppr").addEventListener("click", clear);
};
suppr();
