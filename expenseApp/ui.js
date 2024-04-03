function handleFormSubmit(event) {
    event.preventDefault();
    const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
      }
    axios
      .post(
        "http://localhost:5000/expense/add-expense", expenseDetails)
      .then((response) => {
        console.log(response)
        displayUserOnScreen(response.data.newExpenseDetail)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("http://localhost:5000/expense/get-expenses")
        .then((response) => {
            for (var i = 0; i < response.data.allExpenses.length; i++) {
                displayUserOnScreen(response.data.allExpenses[i]);
            }
        })
        .catch((error) => console.log(error));
  })

  function displayUserOnScreen(expenseDetails) {
    const expenseItem = document.createElement("li");
    expenseItem.appendChild(
      document.createTextNode(
        `${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    expenseItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    expenseItem.appendChild(editBtn);
  
    const expenseList = document.querySelector("ul");
    expenseList.appendChild(expenseItem);

    deleteBtn.addEventListener("click", (event) => {
      axios
        .delete(`http://localhost:5000/expense/delete-expense/${expenseDetails.id}`)
        .then(() => expenseItem.remove())
        .catch((error) => console.log(error));
    })

    editBtn.addEventListener("click", (event) => {
      axios
        .delete(`http://localhost:5000/expense/delete-expense/${expenseDetails.id}`)
        .then(() => expenseItem.remove())
        .catch((error) => console.log(error));

      document.getElementById("amount").value = expenseDetails.amount;
      document.getElementById("description").value = expenseDetails.description;
      document.getElementById("category").value = expenseDetails.category;
    })
}