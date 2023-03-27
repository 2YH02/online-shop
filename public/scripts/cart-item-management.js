const cartItemUpdatedFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadge = document.querySelector(".nav-items .badge");

async function updateCartItem(e) {
  e.preventDefault();

  const form = e.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement =
      form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPriceElement.textContent =
      responseData.updatedCartData.updatedItemPrice;
  }

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice;

  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdatedFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
