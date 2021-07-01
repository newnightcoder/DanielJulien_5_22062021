const content = document.querySelector(".content");
const cart = document.querySelector(".badge");

const API_URL = "http://localhost:3000/api/cameras";
let cameras = [];

const storage = JSON.parse(localStorage.getItem("selectedProduct"));
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
console.log(typeof storage);
const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

// let's get the cameras from the API and store the data in the cameras array.
const getCameras = async () => {
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
  let productIndex;
  let selectedProduct;
  document.querySelectorAll(".btn-voir").forEach((item, i) => {
    console.log(item, i);
    item.addEventListener("click", () => {
      // e.preventDefault();
      productIndex = i;
      // pour changer un peu des for loop! (for of loop avec recherche de l'index)
      for (const [i, item] of cameras.entries()) {
        if (productIndex === i) {
          selectedProduct = [1, item];
        }
      }
      console.log(selectedProduct);
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    });
  });
};

//let's display the data once it is fetched
const displayProducts = () => {
  cameras.map((item) => {
    const product = `
  <div class="product card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img 
        src="${item.imageUrl}" class=" img img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body text-dark ">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text text-end" style="font-weight:700">${numeral(
            item.price
          )
            .divide(100)
            .format("0 0.00")}€ </p>
          <p class="card-text">${item.description}</p>
          <div class="text-end"><a href="produit.html" class="btn btn-sm btn-voir" type="button">Voir ce produit</a></div>
        </div>
      </div>
    </div>
  </div>
`;

    content.insertAdjacentHTML("beforeend", product);
  });
};

const initPage = (async () => {
  cameras = await getCameras();
  console.log("init cameras", cameras);
  displayProducts();
  selectProduct();
  displayCartNumberStorage();
})();
