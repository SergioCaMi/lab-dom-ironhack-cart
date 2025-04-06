// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector(".price span");
  const quantity = product.querySelector(".quantity input");
  const subtotalDisplay = product.querySelector(".subtotal");
  var subtotal = +price.textContent * +quantity.value;
  subtotalDisplay.textContent = `$${subtotal}`;
  return subtotal;
}

function calculateAll() {
  const products = document.getElementsByClassName("product");
  const totalCountPrice = document.querySelector("#total-value span");
  var totalPrice = 0;
  for (product of products) {
    totalPrice += updateSubtotal(product);
  }
  totalCountPrice.textContent = totalPrice;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  target.parentNode.parentNode.parentNode.removeChild(
    target.parentNode.parentNode
  );
  calculateAll();
}

// ITERATION 5

function createProduct(event) {
  const newProductName = document.querySelector(
    ".create-product input[type='text']"
  );
  const newProductPrice = document.querySelector(
    ".create-product input[type='number']"
  );
  console.log(newProductName + " - " + newProductPrice);
  const newProductRow = document.createElement("tr");
  newProductRow.className = "product";
  newProductRow.innerHTML = `
    <td class="name"><span>${newProductName.value}</span></td>
    <td class="price">$<span>${newProductPrice.value}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;
  newProductName.value = "";
  newProductPrice.value = "";
  document.querySelector("tbody").appendChild(newProductRow);
  const btnRemove = document.querySelectorAll(".btn-remove");
  btnRemove.forEach((removed) => {
    removed.addEventListener("click", removeProduct);
  });
  calculateAll();
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  const btnRemove = document.querySelectorAll(".btn-remove");
  btnRemove.forEach((removed) => {
    removed.addEventListener("click", removeProduct);
  });

  const btnCreate = document.getElementById("create");
  btnCreate.addEventListener("click", createProduct);
});
