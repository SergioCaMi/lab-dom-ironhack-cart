// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector(".price span");
  const quantity = product.querySelector(".quantity input");
  const subtotalDisplay = product.querySelector(".subtotal");
  var subtotal = +price.textContent * (+quantity.value);
  subtotalDisplay.textContent = `$${subtotal}`;
}

function calculateAll() {
  const products = document.getElementsByClassName("product");
  for (product of products){
    updateSubtotal(product)
  };
  // ITERATION 2
  //... your code goes here

  // ITERATION 3
  //... your code goes here
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
}

// ITERATION 5

function createProduct() {
  //... your code goes here
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
