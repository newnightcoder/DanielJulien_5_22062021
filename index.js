// DOM ELEMENTS VARIABLES
const content = document.querySelector(".content");
const cart = document.querySelector(".badge");
// GLOBAL VARIABLES
let cameras = [];
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));

export const API_URL = "http://localhost:3000/api/cameras";

// REQUÊTE GET LISTE DES PRODUITS + SAUVEGARDE DANS UN ARRAY "CAMERAS"
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

// AFFICHE LES PRODUITS À L'ÉCRAN
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
          <div class="text-end">
          <a href="/shop/produit/produit.html?${
            item._id
          }" class="btn btn-sm btn-voir" type="button">Voir ce produit</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    content.insertAdjacentHTML("beforeend", product);
  });
};

// AFFICHE LE BADGE NOMBRE D'ARTICLES DANS LE PANIER (AU CAS OÙ LE PANIER CONTIENT DES ARTICLES)
const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

// FONCTION GLOBALE - IIFE
const initPage = (async () => {
  cameras = await getCameras();
  console.log("init cameras", cameras);
  displayProducts();
  // selectProduct();
  displayCartNumberStorage();
})();
