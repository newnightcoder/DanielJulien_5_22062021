// import { displayCartStorage } from "/produit.js";

const content = document.querySelector(".content");
const cart = document.querySelector(".badge");

const API_URL = "http://localhost:3000/api/cameras";
let cameras = [];

export const storage = JSON.parse(localStorage.getItem("selectedProduct"));
const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));

const displayCartStorage = () => {
  cartStorage
    ? ((cart.innerHTML = cartStorage), (cart.style.display = "block"))
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
  document.querySelectorAll(".product").forEach((item, i) => {
    console.log(item, i);
    item.addEventListener("click", (e) => {
      selectedProduct = i;
      console.log("fonction select product", selectedProduct);
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    });
  });
};

//let's display the data once it is fetched
const displayProducts = () => {
  cameras.map((item) => {
    const product = `
    <div class="product card mb-3">
      <a class="link-dark link-product" href="produit.html" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${
              item.imageUrl
            }" class=" img img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body text-dark ">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text text-end" style="font-weight:700">${numeral(
                item.price
              )
                .divide(100)
                .format("0,0.00")}€ </p>
              <p class="card-text">${item.description}</p>
              <div class="text-end"><button class="btn btn-sm btn-info justify-right" type="button">Voir ce produit</button></div>
            </div>
          </div>
        </div>
      </a>
    </div>
`;

    content.insertAdjacentHTML("beforeend", product);
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
