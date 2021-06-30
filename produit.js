const content = document.querySelector(".detail");
const aside = document.querySelector("aside");
const select = document.querySelector("select");
const orderBtn = document.querySelector(".order-btn");
const cart = document.querySelector(".badge");
const breadcrumb = document.querySelector("[aria-current=page]");
const modal = document.querySelector(".modal-body");

const cartNumberStorage = JSON.parse(localStorage.getItem("cartNumberStorage"));
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
const finalCartStorage = JSON.parse(localStorage.getItem("finalCartStorage"));
// console.log(finalCartStorage[0]);

const detail =
  selectedProduct &&
  `<div class="col-lg-8">
    <h3 class="">${selectedProduct[1].name}</h3>
    <div class="">
    <img height="350"  width="500" src="${selectedProduct[1].imageUrl}"/>
    </div>
    <div class="">
    <p style="width:80%" class="py-4">${selectedProduct[1].description} </p>
    </div>
   </div>`;

const prix =
  selectedProduct &&
  `<div class="row align-items-center justify-content-between">
    <span class="price col-4" style="color:red;font-size:1.75rem">
    ${numeral(selectedProduct[1].price).divide(100).format("0 0.00")}€
    </span> 
    <span class="dispo col-4" style="white-space:nowrap"> <i class="bi bi-check2"></i>disponible</span>
   </div>`;

const modalContent =
  selectedProduct &&
  `<table class="table table-borderless my-3">
     <tbody>
      <tr class="modal-row align-middle">
      <td><img class="img-fluid" width="150" src="${
        selectedProduct[1].imageUrl
      }"/></td>
      <td><span style="white-space:nowrap; text-transform:uppercase; font-weight:600">${
        selectedProduct[1].name
      }</span><br><span style="font-size:.75rem; text-align:left">vendu et exp&eacute;di&eacute; par Orinico</span></td>
      <td style="white-space:nowrap; text-transform:uppercase; font-weight:600; color:red">${numeral(
        selectedProduct[1].price
      )
        .divide(100)
        .format("0 0.00")}€</td>
      </tr>
     </tbody>
   </table>`;

const displayProductPage = () => {
  const selectOptions =
    selectedProduct &&
    selectedProduct[1].lenses.map((lens) => `<option>${lens}</option>`);
  content.insertAdjacentHTML("afterBegin", detail);
  select.insertAdjacentHTML("beforeEnd", selectOptions);
  aside.insertAdjacentHTML("afterbegin", prix);
  breadcrumb.textContent = selectedProduct && `${selectedProduct[1].name}`;
  modal.insertAdjacentHTML("afterbegin", modalContent);
};

let finalCart = [...selectedProduct];

const addToCart = () => {
  //ajouter au nombre total d'items dans le cart (storage + view)
  let cartNumber = cartNumberStorage;
  orderBtn.addEventListener("click", () => {
    cartNumber++;
    localStorage.setItem("cartNumberStorage", JSON.stringify(cartNumber));
    cart.innerHTML = cartNumber;
    cart.style.display = "block";
  });
};

const addToStorage = () => {
  orderBtn.addEventListener("click", () => {
    //ajouter au storage détaillé (item + quantité)
    if (!finalCartStorage)
      localStorage.setItem("finalCartStorage", JSON.stringify([finalCart]));
    else {
      let storageCopy = [...finalCartStorage];
      for (let i = 0; i < storageCopy.length; i++) {
        if (selectedProduct[1]._id === storageCopy[i][1]._id) {
          storageCopy[i][0]++;
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
          console.log("yay");
          return;
        } else {
          let storageCopy = [...finalCartStorage, selectedProduct];
          localStorage.setItem("finalCartStorage", JSON.stringify(storageCopy));
        }
      }
    }
  });
};

const displayCartNumberStorage = () => {
  cartNumberStorage
    ? ((cart.innerHTML = cartNumberStorage), (cart.style.display = "block"))
    : (cart.style.display = "none");
};

const initPage = (() => {
  displayProductPage();
  addToCart();
  addToStorage();
  displayCartNumberStorage();
})();
