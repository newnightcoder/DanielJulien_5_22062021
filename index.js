const content = document.querySelector(".content");
const API_URL = "http://localhost:3000/api/cameras";
let cameras = [];

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

const toPageProduct = (e) => {
  const link = e;
  console.log(link);
};

//let's display the data once it is fetched
displayProducts = () => {
  cameras.map((item) => {
    const product = `<a  class="product" onClick="toPageProduct()">
      <div class="product__img">
      <img height="200"  width="300" src="${item.imageUrl}"/>
      </div>
      <div class="product__info">
        <h3 class="product__info--name">${item.name}</h3>
        <span class="product__info--price">${item.price} </span>
        <p class="product__info--description">${item.description} </p>
      </div>
    </a>`;
    content.insertAdjacentHTML("afterBegin", product);
  });
};

//launch
const init = (async () => {
  cameras = await getCameras();
  console.log("init cameras", cameras);
  displayProducts();
})();
