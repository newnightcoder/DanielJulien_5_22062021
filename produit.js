import { getCameras } from "/index.js";

const content = document.querySelector(".detail");
const aside = document.querySelector("aside");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".order-btn");
const cart = document.querySelector(".badge");
// const orderModal = document.querySelector(".modal");
// const modalContinueBtn = document.querySelector(".btn-continuer");
const breadcrumb = document.querySelector("[aria-current=page]");

const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
let models = [];
let modelStorage = JSON.parse(localStorage.getItem("modelStorage"));

const displayProductPage = async () => {
  const items = await getCameras();
  for (let i = 0; i < items.length; i++) {
    console.log(selectedProduct, i);
    if (selectedProduct === i) {
      console.log(`camera ${i} is selected`);
      models.push(items[i]);
      localStorage.setItem("modelStorage", JSON.stringify(models));
      const detail = `<div class="col-8">
      <h3 class="">${items[i].name}</h3>
      <div class="">
      <img height="350"  width="500" src="${items[i].imageUrl}"/>
      </div>
      <div class="">
        <p style="width:80%" class="py-4">${items[i].description} </p>
      </div>
    </div>`;
      const prix = `<div class="row align-items-center">
                      <span class="price col-4" style="color:red;font-size:1.75rem">
                      ${numeral(items[i].price).divide(100).format("0,0.00")}€
                      </span> 
                      <span class="dispo col-4"> <i class="bi bi-check2"></i>disponible</span>
                    </div>`;
      aside.insertAdjacentHTML("afterbegin", prix);

      const selectOptions = items[i].lenses.map(
        (lens) => `<option>${lens}</option>`
      );
      content.insertAdjacentHTML("afterBegin", detail);
      select.insertAdjacentHTML("beforeEnd", selectOptions);
      breadcrumb.textContent = `${items[i].name}`;
    }
  }
};

const addToCart = () => {
  let cartNumber = cartStorage;
  orderBtn.addEventListener("click", () => {
    cartNumber++;
    localStorage.setItem("cartStorage", JSON.stringify(cartNumber));
    cart.innerHTML = cartNumber;
    cart.style.display = "block";
  });
};

export const displayCartStorage = () => {
  console.log("cart storage", cartStorage);
  cartStorage
    ? ((cart.innerHTML = cartStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

const init = (() => {
  displayProductPage();
  addToCart();
  displayCartStorage();
})();
