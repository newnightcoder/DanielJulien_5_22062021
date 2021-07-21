// DOM ELEMENTS
const content = document.querySelector(".detail");
const aside = document.querySelector("aside");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".order-btn");
const cart = document.querySelector(".badge");
const breadcrumb = document.querySelector("[aria-current=page]");
const modal = document.querySelector(".modal-body");
// GLOBAL VARIABLES
const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
let API_URL = "http://localhost:3000/api/cameras";

// GET THE ID PART OF THE URL😉
const grabProductID = () => {
  const productId = location.search.split("").slice(1).join("");
  return productId;
};

// FETCH THE PRODUCT FROM SERVER API
const getProduct = async () => {
  let selectedProduct;
  try {
    const productId = grabProductID();
    console.log(productId);
    const fetchedData = await fetch(`${API_URL}/${productId}`);
    const productData = await fetchedData.json();
    selectedProduct = productData;
  } catch (error) {
    console.log(error);
  }
  return selectedProduct;
};

// DISPLAY PRODUCT
const displayProduct = async () => {
  const product = await getProduct();
  console.log(product);
  // 1. dynamic DOM elements (hydrated):
  const produit = `<div class="col-lg-8">
<h3 class="">${product.name}</h3>
<div class="">
<img height="350"  width="500" src="${product.imageUrl}"/>
</div>
<div class="">
<p style="width:80%" class="py-4">${product.description} </p>
</div>
</div>`;

  const prix = `<div class="row align-items-center justify-content-between">
<span class="price col-4" style="color:red;font-size:1.75rem">
${numeral(product.price).divide(100).format("0 0.00")}€
</span>
<span class="dispo col-4" style="white-space:nowrap"> <i class="bi bi-check2"></i>disponible</span>
</div>`;

  const selectOptions = product.lenses.map(
    (option) => `<option>${option}</option>`
  );

  const modalContent = `<table class="table table-borderless my-3">
 <tbody>
  <tr class="modal-row align-middle">
  <td><img class="img-fluid" width="150" src="${product.imageUrl}"/></td>
  <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${product.name}</span><br><span style="font-size:.75rem; text-align:left">vendu et exp&eacute;di&eacute; par Orinico</span></td>
  <td style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${product.price}€</td>
  </tr>
 </tbody>
</table>`;
  // 2. append to the DOM
  content.insertAdjacentHTML("afterBegin", produit);
  select.insertAdjacentHTML("beforeEnd", selectOptions);
  aside.insertAdjacentHTML("afterbegin", prix);
  breadcrumb.textContent = product.name;
  modal.insertAdjacentHTML("afterbegin", modalContent);
};

// SAUVEGARDE DU PRODUIT DANS LE STORAGE DU PANIER
const saveToStorage = async () => {
  // get product
  const product = await getProduct();
  // store it in a cartStorage ready format
  let selectedProduct = [];
  selectedProduct.push(1, product);
  console.log(selectedProduct);
  // create CartStorage s'il n'existe pas
  !finalCartStorage &&
    localStorage.setItem("finalCartStorage", JSON.stringify(finalCartStorage));

  orderBtn.addEventListener("click", () => {
    const finalCartStorage = JSON.parse(
      localStorage.getItem("finalCartStorage")
    );
    // création du CartStorage s'il n'existe pas
    if (!finalCartStorage) {
      localStorage.setItem(
        "finalCartStorage",
        JSON.stringify([selectedProduct])
      );
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
  });
};

// UPDATE VIEW PASTILLE PANIER + SAUVEGARDE DANS LE LOCALSTORAGE (NOMBRE D'ARTICLES AJOUTÉS PANIER)
const updateCartCount = () => {
  let cartNumber = cartNumberStorage;
  orderBtn.addEventListener("click", () => {
    cartNumber++;
    //ajouter au nombre total d'items dans le cart (localStorage + view)
    localStorage.setItem("cartNumberStorage", JSON.stringify(cartNumber));
    cart.innerHTML = cartNumber;
    cart.style.display = "block";
  });
};

// UPDATE VIEW PASTILLE PANIER AU LANCEMENT/RAFRAICHISSEMENT DE LA PAGE
const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

// FONCTION GLOBALE - IIFE
const initPage = (() => {
  grabProductID();
  getProduct();
  displayProduct();
  updateCartCount();
  saveToStorage();
  displayCartNumberStorage();
})();
