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
  fetchExpenses(currentPage);
})

const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('previous-btn');
const pageNum = document.getElementById('page-num');
const expensesList = document.getElementById('expenses');
const pagination = document.getElementById('pagination-container');

let currentPage = 1; // Initialize current page

// Display expenses on screen
function displayExpensesOnScreen(expenseDetails) {
    expensesList.classList.add("list-group"); 

    // Create a list item for the current expense
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center"); 

    expenseItem.innerHTML = `
        <span>₹${expenseDetails.amount}</span>
        <span>${expenseDetails.description}</span>
        <span>${expenseDetails.category}</span>
        <button class="btn btn-secondary delete-btn">x</button>
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

    // Update the current page when displaying expenses
    currentPage = expenseDetails.currentPage;
    pagination.style.display = 'flex';
}

nextButton.addEventListener('click', () => {
    currentPage += 1;
    fetchExpenses(currentPage);
});

prevButton.addEventListener('click', () => {
    currentPage -= 1;
    fetchExpenses(currentPage);
});

// Function to fetch expenses for a specific page
function fetchExpenses(page) {
    const token = localStorage.getItem('token');
    axios
        .get(`http://localhost:5000/expense/get-expenses?page=${page}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            expensesList.innerHTML = '';
            response.data.allExpenses.forEach(displayExpensesOnScreen);
            const totalPages = response.data.totalPages;
            currentPage = response.data.currentPage;

            // Disable the "Previous" button if on the first page
            prevButton.disabled = currentPage === 1;
            // Disable the "Next" button if on the last page
            nextButton.disabled = currentPage === totalPages;

            const pageNum = document.getElementById('page-num');
            pageNum.textContent = `Page ${currentPage} of ${totalPages}`;
        })
        .catch((error) => console.log(error));
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
                  location.reload();
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

  const leaderboardBtn = document.getElementById("leaderboard-btn");
  leaderboardBtn.addEventListener("click", (event) => {
    axios
      .get("http://localhost:5000/premium/leaderboard", { headers: { "Authorization": localStorage.getItem("token") } })
      .then((response) => {
        const leaderboardData = response.data.leaderboard;

        const leaderboardContainer = document.getElementById("leaderboard-container");
        leaderboardContainer.innerHTML = '';
        leaderboardContainer.innerHTML += '<h5>Leaderboard</h5>';

        leaderboardData.forEach((user, index) => {
          leaderboardContainer.innerHTML += `<li>${index + 1}. ${user.username} - ₹${user.totalExpenses}</li>`;
        })          
      })
      .catch((error) => console.log(error));
    })

const downloadBtn = document.getElementById("download-file-btn");
downloadBtn.disabled = true;

function userPremiumStatus() {
  axios
      .get("http://localhost:5000/user/status", { headers: { "Authorization": localStorage.getItem("token") } })
      .then((response) => {
          const isPremiumUser = response.data.ispremiumuser;

          if (isPremiumUser) {
              buyPremiumBtn.style.display = "none";
              leaderboardBtn.style.display = "block";
              downloadBtn.disabled = false;

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

function download() {
  axios
    .get("http://localhost:5000/user/download", { headers: { "Authorization": localStorage.getItem("token") } })
    .then((response) => {
      if (response.status === 200) {
        let a = document.createElement("a");
        a.href = response.data.fileURL;
        a.download = 'MyExpense.csv';
        a.click();
      } else {
          throw new Error(response.data.message);
      }
    })
    .catch((error) => showError(error));
}