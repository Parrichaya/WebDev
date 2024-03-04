function handleFormSubmit(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;  
    
    const ExpenseDetails = {
    amount: amount,
    description: description,
    category: category
  }
  
  let expenses = JSON.parse(localStorage.getItem("ExpenseDetails"));
    if (expenses) {
      expenses.push(ExpenseDetails);
    } else {
      expenses = [ExpenseDetails];
    }
  
    localStorage.setItem("ExpenseDetails", JSON.stringify(expenses));
    const expenseList = document.getElementById("expenseList");
    const Li = document.createElement("li");
    Li.innerText = `${amount} - ${description} - ${category}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    Li.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    Li.appendChild(editButton);
    expenseList.appendChild(Li);
    event.target.reset();
    
    deleteButton.addEventListener("click", function () {
      let expenses = JSON.parse(localStorage.getItem("ExpenseDetails"));
      const index = expenses.findIndex((expense) => expense.amount === amount && expense.description === description && expense.category === category);
      expenses.splice(index, 1);
      localStorage.setItem("ExpenseDetails", JSON.stringify(expenses));
      expenseList.removeChild(Li);
  })
    
    editButton.addEventListener("click", function () {
      let expenses = JSON.parse(localStorage.getItem("ExpenseDetails"));
      const index = expenses.findIndex((expense) => expense.amount === amount && expense.description === description && expense.category === category);
      expenses.splice(index, 1);
      localStorage.setItem("ExpenseDetails", JSON.stringify(expenses));
      expenseList.removeChild(Li);
      event.target.amount.value = amount
      event.target.description.value = description   
      event.target.category.value = category
    })
  }
  
  