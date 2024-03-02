function handleFormSubmit(event) {
    event.preventDefault();
    const itemDetails = {
      itemname: event.target.itemname.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData",
        itemDetails
      )
      .then((response) => displayItemOnScreen(response.data))
      .catch((error) => console.log(error));
  
    event.target.reset();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displayItemOnScreen(response.data[i]);
            }
        })
        .catch((error) => console.log(error));
  })


  
 function displayItemOnScreen(itemDetails) {
  const item = document.createElement("li");
  item.appendChild(
    document.createTextNode(
      `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`
    )
  );

  const itemList = document.querySelector("ul");
  itemList.appendChild(item);

  const buyOneBtn = document.createElement("button");
  buyOneBtn.appendChild(document.createTextNode("Buy 1"));
   buyOneBtn.addEventListener("click", function() {
    itemDetails.quantity -= 1;
    if (itemDetails.quantity < 0) {
      itemDetails.quantity = 0;
    }
    axios
      .put(
        "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData/" + itemDetails._id,
        itemDetails
      )
      .then((response) => {
        // Update the quantity on the screen
        item.textContent = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
      })
      .catch((error) => console.log(error));
  });
  item.appendChild(buyOneBtn);

  const buyTwoBtn = document.createElement("button");
  buyTwoBtn.appendChild(document.createTextNode("Buy 2"));
   buyTwoBtn.addEventListener("click", function() {
    itemDetails.quantity -= 2;
    if (itemDetails.quantity < 0) {
      itemDetails.quantity = 0;
    }
    axios
      .put(
        "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData/" + itemDetails._id,
        itemDetails
      )
      .then((response) => {
        // Update the quantity on the screen
        item.textContent = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
      })
      .catch((error) => console.log(error));
  });
  item.appendChild(buyTwoBtn);

  const buyThreeBtn = document.createElement("button");
  buyThreeBtn.appendChild(document.createTextNode("Buy 3"));
   buyThreeBtn.addEventListener("click", function() {
    itemDetails.quantity -= 3;
    if (itemDetails.quantity < 0) {
      itemDetails.quantity = 0;
    }
    axios
      .put(
        "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData/" + itemDetails._id,
        itemDetails
      )
      .then((response) => {
        // Update the quantity on the screen
        item.textContent = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
      })
      .catch((error) => console.log(error));
  });
  item.appendChild(buyThreeBtn);
}

function updateQuantity(itemDetails, quantity,ite) {
  itemDetails.quantity -= quantity;
  if (itemDetails.quantity < 0) {
    itemDetails.quantity = 0;
  }

  axios
    .put(
      "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData/" + itemDetails._id,
      itemDetails
    )
    .then((response) => {
      // Update the quantity on the screen
      item.textContent = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
    })
    .catch((error) => console.log(error));
}
   
  
