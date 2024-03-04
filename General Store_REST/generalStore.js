const url = "https://crudcrud.com/api/1a20f6a1c7d341efaab1bb1a68ae7e34/storeData"

function handleFormSubmit(event) {
    event.preventDefault();
    const itemDetails = {
      itemname: event.target.itemname.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
    };
    axios
      .post(url, itemDetails)
      .then((response) => {
        displayItemOnScreen(response.data)
      })
      .catch((error) => console.log(error));
  
    event.target.reset();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(url)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displayItemOnScreen(response.data[i]);
            }
        })
        .catch((error) => console.log(error));
  })

function displayItemOnScreen(itemDetails) {
  const item = document.createElement("li");
  const itemTextNode = document.createTextNode(
    `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity} `
  );
  item.appendChild(itemTextNode);

  const itemList = document.querySelector("ul");
  itemList.appendChild(item);

  const buyOneBtn = document.createElement("button");
  buyOneBtn.className = "btn btn-sm btn-outline-success";
  buyOneBtn.appendChild(document.createTextNode("Buy 1"));
  item.appendChild(buyOneBtn);

  buyOneBtn.addEventListener("click", function () {
    updateQuantity(itemDetails, 1, itemTextNode);
  });

  const buyTwoBtn = document.createElement("button");
  buyTwoBtn.className = "btn btn-sm btn-outline-success";
  buyTwoBtn.appendChild(document.createTextNode("Buy 2"));
  item.appendChild(buyTwoBtn);

  buyTwoBtn.addEventListener("click", function () {
    updateQuantity(itemDetails, 2, itemTextNode);
  });

  const buyThreeBtn = document.createElement("button");
  buyThreeBtn.className = "btn btn-sm btn-outline-success";
  buyThreeBtn.appendChild(document.createTextNode("Buy 3"));
  item.appendChild(buyThreeBtn);

  buyThreeBtn.addEventListener("click", function () {
    updateQuantity(itemDetails, 3, itemTextNode);
  });
}

function updateQuantity(itemDetails, quantity, itemTextNode) {
  itemDetails.quantity -= quantity;
  if (itemDetails.quantity < 0) {
    itemDetails.quantity = 0;
  }

  console.log("Updating quantity:", itemDetails, quantity);
  axios
    .put(`${url}/${itemDetails._id}`,
      {
        itemname: itemDetails.itemname,
        description: itemDetails.description,
        price: itemDetails.price,
        quantity: itemDetails.quantity,
      }
    )
    .then((response) => {
      console.log("PUT request successful:", response.data);     
      itemTextNode.nodeValue = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
    })
    .catch((error) => {
      console.log("PUT request failed:", error);
    });
}
   
  
