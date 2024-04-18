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

