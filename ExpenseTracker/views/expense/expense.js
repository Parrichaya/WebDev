// Add Expense Post Request
function expenseform(event) {
    event.preventDefault();
    const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
      }
    axios
      .post(
        "http://localhost:5000/expense/add-expense", expenseDetails, { headers: { "Authorization": localStorage.getItem("token") } })
      .then((response) => {
        console.log(response)
        displayExpensesOnScreen(response.data.newExpenseDetail)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("amount").value = '';
    document.getElementById("description").value = '';
    document.getElementById("category").value = '';
  }
  
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
      .get("http://localhost:5000/expense/get-expenses", { headers: { "Authorization": token } })
      .then((response) => {
          for (var i = 0; i < response.data.allExpenses.length; i++) {
              displayExpensesOnScreen(response.data.allExpenses[i]);
          }
      })
      .catch((error) => console.log(error));
})

// Display expenses on screen
function displayExpensesOnScreen(expenseDetails) {
    const expensesList = document.getElementById("expenses")
    expensesList.classList.add("list-group"); 

    // Create a list item for the current expense
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center"); 

    expenseItem.innerHTML = `
        <span>₹${expenseDetails.amount}</span>
        <span>${expenseDetails.description}</span>
        <span>${expenseDetails.category}</span>
        <button class="btn btn-secondary delete-btn">Delete</button>
    `;

    expensesList.appendChild(expenseItem);

    const deleteBtn = expenseItem.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", (event) => {
        axios
          .delete(`http://localhost:5000/expense/delete-expense/${expenseDetails.id}`, { headers: { "Authorization": localStorage.getItem("token") } })
          .then(() => {
              expenseItem.remove(); 
          })
          .catch((error) => console.log(error));
    });
}

const buyPremiumBtn = document.getElementById("rzp-button");
buyPremiumBtn.addEventListener("click", (event) => {
  axios
    .get("http://localhost:5000/purchase/premiummembership", { headers: { "Authorization": localStorage.getItem("token") } })
    .then((response) => {
        const options = {
          "key": response.data.key_id,
          "order_id": response.data.order.id,
          "handler": function (response) {
            axios
              .post("http://localhost:5000/purchase/updatetransactionstatus", {
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id
              }, { headers: { "Authorization": localStorage.getItem("token") } })
              .then(() => {
                  alert("You are a Premium User!");
              })
              .catch((error) => {
                  console.log(error);
              })
            }
          };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        event.preventDefault();

        rzp1.on("payment.failed", function (response) {
            console.log(response);
            axios
              .post("http://localhost:5000/purchase/updatetransactionstatus", {
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                  error: response.error
              }, { headers: { "Authorization": localStorage.getItem("token") } })
              .then(() => {
                  alert("Something went wrong");
              })
              .catch((error) => {
                  console.log(error);
              })
        })
    })
    .catch((error) => console.log(error));
  })

function userPremiumStatus() {
  axios
      .get("http://localhost:5000/user/status", { headers: { "Authorization": localStorage.getItem("token") } })
      .then((response) => {
          const isPremiumUser = response.data.ispremiumuser;

          if (isPremiumUser) {
              buyPremiumBtn.style.display = "none";

          const premiumMsg = document.createElement("div");
          premiumMsg.classList.add("mb-1", "premium-user-msg");
          premiumMsg.textContent = "You are a Premium User!";
          document.body.appendChild(premiumMsg);
          } else {
              buyPremiumBtn.style.display = "block";
          }
      })
      .catch((error) => console.log(error));
}

userPremiumStatus();