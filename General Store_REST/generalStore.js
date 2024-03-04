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
        "https://crudcrud.com/api/6c77d6978b5d4079905f54da35cef1a5/storeData",
        itemDetails
      )
      .then((response) => {
        itemDetails.id = response.data._id;
        displayItemOnScreen(itemDetails)
      })
      .catch((error) => console.log(error));
  
    event.target.reset();
  }
  
  // window.addEventListener("DOMContentLoaded", () => {
  //   axios
  //       .get("https://crudcrud.com/api/6c77d6978b5d4079905f54da35cef1a5/storeData")
  //       .then((response) => {
  //           for (var i = 0; i < response.data.length; i++) {
  //               displayItemOnScreen(response.data[i]);
  //           }
  //       })
  //       .catch((error) => console.log(error));
  // })

function displayItemOnScreen(itemDetails) {
  const item = document.createElement("li");
  const itemTextNode = document.createTextNode(
    `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`
  );
  item.appendChild(itemTextNode);

  const itemList = document.querySelector("ul");
  itemList.appendChild(item);

  const buyOneBtn = document.createElement("button");
  buyOneBtn.appendChild(document.createTextNode("Buy 1"));
  item.appendChild(buyOneBtn);

  buyOneBtn.addEventListener("click", function () {
    updateQuantity(itemDetails, 1,itemTextNode);
  });
}

function updateQuantity(itemDetails, quantity,itemTextNode) {

  itemDetails.quantity -= quantity;
  if (itemDetails.quantity < 0) {
    itemDetails.quantity = 0;
  }

  console.log("Updating quantity:", itemDetails, quantity);
  axios
    .put(
      "https://crudcrud.com/api/6c77d6978b5d4079905f54da35cef1a5/storeData/" + itemDetails.id,
      itemDetails
    )
    .then((response) => {
      console.log("PUT request successful:", response.data);
      // Update the quantity on the screen
      itemTextNode.nodeValue = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
    })
    .catch((error) => {
      console.log("PUT request failed:", error);
    });
}
   
  
