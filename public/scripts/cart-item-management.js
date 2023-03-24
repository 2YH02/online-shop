const cartItemUpdatedFormElements = document.querySelectorAll(
  ".cart-item-management"
);

async function updateCartItem(e) {
  e.preventDefault();

  const form = e.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/item", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      header: {
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
}

for (const formElement of cartItemUpdatedFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
