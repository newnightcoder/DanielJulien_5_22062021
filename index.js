// DOM ELEMENTS
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
  const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  cameras.map((item) => {
    const product = `
    <div class="product container-fluid ps-0 rounded mb-3 shadow pe-0">
      <div class="container d-flex flex-row ps-0 pe-3">
        <div class="col-6 pe-3">
          <img 
          src="${item.imageUrl}" class="rounded-start border-0 p-0" alt="${
      item.name
    }"> 
        </div>
        <div class="col-6 d-flex flex-column justify-content-start align-items-start position-relative pt-2">
          <div class="d-flex flex-column justify-content-start align-items-start">
          <h3 class="fs-5 text-nowrap mb-1">${item.name}</h3>
          <span class="">${numeral(item.price)
            .divide(100)
            .format("0 0.00")
            .replace(priceFormatRegex, "$1 ")}€ </span>
           </div>
          <div class="container position-absolute bottom-0 mb-1 px-0 mx-0">
            <a class="btn btn-sm text-white btn-voir d-block" href="/shop/produit/produit.html?${
              item._id
            }">Voir ce produit</a>
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
  displayProducts();
  displayCartNumberStorage();
})();
