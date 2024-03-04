function handleFormSubmit(event) {
    event.preventDefault();
    const itemDetails = {
      itemname: event.target.itemname.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
    };
  
    // Save itemDetails to localStorage
    localStorage.setItem(itemDetails.itemname, JSON.stringify(itemDetails));
  
    displayItemOnScreen(itemDetails);
  
    event.target.reset();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    // Load items from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const itemDetails = JSON.parse(localStorage.getItem(key));
      displayItemOnScreen(itemDetails);
    }
  });
  
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
  
    buyOneBtn.addEventListener("click", function() {
      itemDetails.quantity -= 1;
      if (itemDetails.quantity < 0) {
        itemDetails.quantity = 0;
      }
      // Update the quantity in localStorage
      localStorage.setItem(itemDetails.itemname, JSON.stringify(itemDetails));
      // Update the quantity on the screen
      itemTextNode.nodeValue = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
    });
    item.appendChild(buyOneBtn);
  
  }
  