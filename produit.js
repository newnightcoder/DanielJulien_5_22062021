import { storage, getCameras } from "/index.js";
const content = document.querySelector(".detail");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".order-btn");
const cart = document.querySelector(".cart-number");
const orderModal = document.querySelector(".modal");
const modalContinueBtn = document.querySelector(".btn-continuer");
let cartNumber = 0;

const displayDetail = async () => {
  const items = await getCameras();
  for (let i = 0; i < items.length; i++) {
    console.log(storage, i);
    if (storage === i) {
      console.log(`camera ${i} is selected`);
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
displayDetail();

const addToCart = () => {
  orderBtn.addEventListener("click", () => {
    cartNumber++;
    cart.innerHTML = cartNumber;
    cart.style.display = "flex";
    orderModal.style.display = "flex";
  });
};
addToCart();

modalContinueBtn.addEventListener("click", () => {
  orderModal.style.display = "none";
});
