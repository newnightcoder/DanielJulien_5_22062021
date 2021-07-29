// éléments DOM
const content = document.querySelector(".content");
const cart = document.querySelector(".badge");
const loader = document.querySelector(".loader");
const link = document.querySelector(".loader-link");

// variables globales
let cameras = [];
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const API_URL = "http://localhost:3000/api/cameras";

// fetch liste des produits depuis l'API + sauvegarde dans un tableau global [cameras]
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

// affiche les produits à l'écran
const displayProducts = () => {
  const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  cameras.map((item) => {
    const product = `
    <div class="product col-lg-6 px-0 rounded shadow border">
      <div class="container d-flex flex-row ps-0">
        <div class="col-6 pe-3">
          <img 
          src="${
            item.imageUrl
          }" class="img-fluid rounded-start border-0 p-0" alt="${item.name}"> 
        </div>
        <div class="col-6 d-flex flex-column justify-content-start justify-content-md-center align-items-start position-relative pt-2">
          <div class="d-flex flex-column ms-auto justify-content-end align-items-end mb-md-5">
            <h3 class="fs-5 text-nowrap mb-1">${item.name}</h3>
            <span class="">${numeral(item.price)
              .divide(100)
              .format("0 0.00")
              .replace(priceFormatRegex, "$1 ")}€ </span>
           </div>
          <div class="container position-absolute bottom-0 mb-1 mb-md-4 px-0 mx-0">
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

// affiche la pastille cart (si le panier contient des articles)
const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

// fonction globale - IIFE
const initPage = (async () => {
  link.addEventListener("click", () => {
    loader.style.animation = "fade 200ms forwards";
  });
  cameras = await getCameras();
  displayProducts();
  displayCartNumberStorage();
})();
