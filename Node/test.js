// console.log(printName);

// console.log(a);



// var a = 3;



// var printName = function (name) {

// console.log(name)

// }
//////////////////////////////////////////////////////////////////////////////////////
// function outerfunction() {

//     console.log(a);
    
//     var a = 10;
    
    
    
//     innerfunction();
    
    
    
//     function innerfunction() {
    
//     console.log(a);
    
//     // console.log(window.a);
    
//     console.log(this.a)
    
//     }
    
//     }
    
    
    
//     var a = 7;
    
//     var b =3
    
    
    
//     outerfunction();
//////////////////////////////////////////////////////////////////////////////////////////

// b = 9
// function a() {
//     let b = 1
//     function y() {
//     let b = 2
//     function x() {
//         let b = 5
//         console.log(this.b)
//     }
//     x()
// }
// y()
// }
// a()
////////////////////////////////////////////////////////////////////////

// const name = (arr)=>{
//     let i = 0
//         return () => {
//         if (i < arr.length) {
//         console.log('Hello '+arr[i]);
//         i++
//     }
// }
// }

// let fun = name(["Ram","Shyam"]);

// fun()// Print Hello Ram

// fun()//print Hello Shyam

// let buyBike = (callback) => {
//     setTimeout( () => {
//       console.log("Bought Royal Enfield Himalayan");
//       callback()
//     },2000);
//   };
  
//   let planTrip = () => {
//     setTimeout( () => {
//       console.log("Trip to Ladakh planned");
//     },1000);
//   };
  
//   buyBike(planTrip);


//   console.log("Let's rock!")
//   console.log("hello")
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleFormSubmit(event) {
    event.preventDefault();
    const itemDetails = {
      itemname: event.target.itemname.value,
      description: event.target.description.value,
      price: event.target.phone.value,
      quantity: event.target.quantity.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/storeData",
        itemDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    event.target.reset();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/appointmentData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displayUserOnScreen(response.data[i]);
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
    item.appendChild(buyOneBtn);
  
    const buyTwoBtn = document.createElement("button");
    buyTwoBtn.appendChild(document.createTextNode("Buy 2"));
    item.appendChild(buyTwoBtn);
    
    const buyThreeBtn = document.createElement("button");
    buyThreeBtn.appendChild(document.createTextNode("Buy 3"));
    item.appendChild(buyThreeBtn);
    
    buyOneBtn.addEventListener("click", function () {
        itemQuantity(itemDetails,1);
    });
    
    buyTwoBtn.addEventListener("click", function () {
        itemQuantity(itemDetails,2);
    });
    
    buyThreeBtn.addEventListener("click", function () {
        itemQuantity(itemDetails,3);
    });
    
    let itemQuantity(itemDetails,quantity) => {
      itemDetails.quantity -= quantity;
      if (itemDetails.quantity <= 0) {
        itemDetails.quantity = 0;
      }
      
      axios
        .put(
          "https://crudcrud.com/api/4607c921805b4e2fbf0272b89751ea27/appointmentData/" + itemDetails._id,
          itemDetails
        )
        .then((response) => {      
      item.textContent = `${itemDetails.itemname} - ${itemDetails.description} - ${itemDetails.price} - ${itemDetails.quantity}`;
    })
        .catch((error) => console.log(error));
    }
  }