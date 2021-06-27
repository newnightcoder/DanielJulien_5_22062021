import { getCameras } from "/index.js";

const content = document.querySelector(".detail");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".order-btn");
const cart = document.querySelector(".cart-number");
const orderModal = document.querySelector(".modal");
const modalContinueBtn = document.querySelector(".btn-continuer");
const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
let models = [];
let modelStorage = JSON.parse(localStorage.getItem("modelStorage"));

const displayProductDetail = async () => {
  const items = await getCameras();
  for (let i = 0; i < items.length; i++) {
    // console.log(storage, i);
    if (selectedProduct === i) {
      console.log(`camera ${i} is selected`);
      models.push(items[i]);
      localStorage.setItem("modelStorage", JSON.stringify(models));
      const detail = `<div class="product">
      <div class="product__img">
      <img height="350"  width="500" src="${items[i].imageUrl}"/>
      </div>
      <div class="product__info">
        <h3 class="product__info--name">${items[i].name}</h3>
        <span class="product__info--price">${items[i].price} </span>
        <p class="product__info--description">${items[i].description} </p>
      </div>
    </div>`;
      const selectOptions = items[i].lenses.map(
        (lens) => `<option>${lens}</option>`
      );
      content.insertAdjacentHTML("beforeEnd", detail);
      select.insertAdjacentHTML("beforeEnd", selectOptions);
    }
  }
};

const addToCart = () => {
  let cartNumber = cartStorage;
  orderBtn.addEventListener("click", () => {
    cartNumber++;
    localStorage.setItem("cartStorage", JSON.stringify(cartNumber));
    orderModal.style.display = "flex";
    cart.innerHTML = cartNumber;
    cart.style.display = "flex";
  });
};

export const displayCartStorage = () => {
  console.log("cart storage", cartStorage);
  cartStorage
    ? ((cart.innerHTML = cartStorage), (cart.style.display = "flex"))
    : (cart.style.display = "none");
};

const continueAchats = () => {
  modalContinueBtn.addEventListener("click", () => {
    orderModal.style.display = "none";
  });
};

const init = (() => {
  displayProductDetail();
  addToCart();
  continueAchats();
  displayCartStorage();
})();
