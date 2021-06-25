// import { displayCartStorage } from "/produit.js";

const content = document.querySelector(".content");
const cart = document.querySelector(".cart-number");

const API_URL = "http://localhost:3000/api/cameras";
let cameras = [];

export const storage = JSON.parse(localStorage.getItem("selectedProduct"));
const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));

const displayCartStorage = () => {
  cartStorage
    ? ((cart.innerHTML = cartStorage), (cart.style.display = "flex"))
    : (cart.style.display = "none");
};

// let's get the cameras from the API and store the data in the cameras array.
export const getCameras = async () => {
  try {
    const results = await fetch(API_URL);
    const data = await results.json();
    cameras = [...data];
  } catch (error) {
    console.log(error);
  }
  return cameras;
};

const selectProduct = () => {
  let selectedProduct;
  content.childNodes.forEach((item, i) => {
    item.addEventListener("click", () => {
      selectedProduct = i;
      console.log(selectedProduct);
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    });
  });
};

//let's display the data once it is fetched
const displayProducts = () => {
  cameras.map((item) => {
    const product = `<a href="produit.html" class="product">
      <div class="product__img">
      <img height="200"  width="300" src="${item.imageUrl}"/>
      </div>
      <div class="product__info">
        <h3 class="product__info--name">${item.name}</h3>
        <span class="product__info--price">${item.price} </span>
        <p class="product__info--description">${item.description} </p>
      </div>
    </a>`;
    content.insertAdjacentHTML("beforeEnd", product);
  });
};

//launch
const init = (async () => {
  cameras = await getCameras();
  console.log("init cameras", cameras);
  displayProducts();
  selectProduct();
  displayCartStorage();
})();
