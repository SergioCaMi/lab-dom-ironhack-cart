// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector(".price span");
  const quantity = product.querySelector(".quantity input");
  const subtotalDisplay = product.querySelector(".subtotal");
  var subtotal = +price.textContent * (+quantity.value);
  subtotalDisplay.textContent = `$${subtotal}`;
  return subtotal;
}

function calculateAll() {
  const products = document.getElementsByClassName("product");
  const totalCountPrice = document.querySelector("#total-value span");
  var totalPrice = 0;
  for (product of products){
    totalPrice += updateSubtotal(product)
  };
  totalCountPrice.textContent = totalPrice;

  // ITERATION 2
  //... your code goes here

  // ITERATION 3
  //... your code goes here
}

// ITERATION 4

const btnRemove = document.querySelector(".btn-remove");
btnRemove.addEventListener("click", removeProduct);

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  ((target.parentNode).parentNode).parentNode.removeChild((target.parentNode).parentNode);
  calculateAll();
 
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
