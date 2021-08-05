// éléments DOM
const content = document.querySelector(".content");
const aside = document.querySelector("aside");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".btn-commander");
const cart = document.querySelector(".badge");
const breadcrumb = document.querySelector("[aria-current=page]");
const modal = document.querySelector(".modal-body");
// variables globales
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
let API_URL = "https://orinoco-shop.herokuapp.com/api/cameras";

// fonction globale
const initPage = () => {
  grabProductID();
  getProduct();
  displayProduct();
  displayCartNumberStorage();
  orderBtn.addEventListener("click", () => {
    saveToStorage();
    updateCartCount();
  });
};

// récupération de l'ID du produit dans l'url😉
const grabProductID = () => {
  const productId = location.search.split("").slice(1).join("");
  return productId;
};

// fetch produit depuis l'API
const getProduct = async () => {
  let selectedProduct;
  try {
    const productId = grabProductID();
    const fetchedData = await fetch(`${API_URL}/${productId}`);
    const productData = await fetchedData.json();
    selectedProduct = productData;
  } catch (error) {
    console.log(error);
  }
  return selectedProduct;
};

// affiche le produit
const displayProduct = async () => {
  const product = await getProduct();
  const priceFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  // 1. dynamic DOM elements (hydrated):
  const produit = `
  <div class="container px-0">
  <div
    class="d-flex align-items-start justify-content-between flex-md-colum pt-2 pb-3 titre"
  >
    <span class="h4 d-block text-nowrap my-0">${product.name}</span>
    <span class="prix d-block text-nowrap fw-bold">${numeral(product.price)
      .divide(100)
      .format("0 0.00")
      .replace(priceFormatRegex, "$1 ")}€</span>
  </div>
  <div class="container px-0 colonne-gauche">
    <img class="img-fluid border" height="350" width="500" src="${
      product.imageUrl
    }" alt="${product.name}">
  
    <p class="description pt-3 ps-1 mb-1">
      ${product.description}
    </p>
  </div>
</div>`;

  const selectOptions = product.lenses.map(
    (option) => `<option>${option}</option>`
  );

  const modalContent = `<table class="table table-borderless my-3">
 <tbody>
  <tr class="modal-row align-middle">
  <td><img class="img-fluid" width="150" src="${product.imageUrl}"/></td>
  <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${
    product.name
  }</span><br><span style="font-size:.75rem; text-align:left">vendu et exp&eacute;di&eacute; par Orinico</span></td>
  <td style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${numeral(
    product.price
  )
    .divide(100)
    .format("0 0.00")
    .replace(priceFormatRegex, "$1 ")}€</td>
  </tr>
 </tbody>
</table>`;
  // 2. append to the DOM
  content.insertAdjacentHTML("afterBegin", produit);
  select.insertAdjacentHTML("beforeEnd", selectOptions);
  // aside.insertAdjacentHTML("afterbegin", prix);
  breadcrumb.textContent = product.name;
  modal.insertAdjacentHTML("afterbegin", modalContent);
};

// sauvegarde du produit dans le storage du panier
const saveToStorage = async () => {
  // get product
  const product = await getProduct();
  // store it in as an array [quantity, item]
  let selectedProduct = [];
  selectedProduct.push(1, product);
  // create storage panier (finalCartStorage) s'il n'existe pas
  // !finalCartStorage &&
  //   localStorage.setItem("finalCartStorage", JSON.stringify(finalCartStorage));
  const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
  // création du CartStorage s'il n'existe pas
  if (!finalCartStorage) {
    localStorage.setItem("finalCartStorage", JSON.stringify([selectedProduct]));
  } else {
    // sinon création d'une copie locale du CartStorage
    let storageCopy = [...finalCartStorage];
    // vérifier si le produit n'est pas déjà dans le cartStorage:
    // 1. création d'une variable de stockage de l'index au cas où l'article est DÉJÀ dans le panier
    let idFound = null;
    for (let i = 0; i < storageCopy.length; i++) {
      // si les id matchent...
      if (selectedProduct[1]._id === storageCopy[i][1]._id) {
        // ...on donne à la variable la valeur de l'index
        idFound = i;
        break;
      }
    }
    // donc si la valeur de l'index existe déjà, on ajoute l'article à lui-même
    // ❌ idFound !== NULL ===> pour éviter l'index 0 qui renvoit une falsy value!
    if (idFound !== null) {
      storageCopy[idFound][0]++;
      localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
    } else {
      // sinon si la valeur de l'index n'existe pas, on ajoute l'article au cartStorage
      let storageCopy = [...finalCartStorage, selectedProduct];
      localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
    }
  }
};

// update cartNumberStorage (nb d'articles ajoutés dans le panier) + pastille
const updateCartCount = () => {
  const cartNumberStorage = JSON.parse(
    localStorage.getItem("cartNumberStorage")
  );
  let cartNumber = cartNumberStorage + 1;
  // cartNumber++;
  //ajouter au nombre total d'items dans le cart (localStorage + view)
  localStorage.setItem("cartNumberStorage", JSON.stringify(cartNumber));
  cart.innerHTML = cartNumber;
  cart.style.display = "block";
};

// update pastille panier au lancement/rafraichissemet de la page
const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

initPage();
