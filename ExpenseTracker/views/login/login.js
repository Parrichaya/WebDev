// Login Post Request
function login(event) {
    event.preventDefault();
    const loginDetails = {
        email: event.target.email.value,
        password: event.target.password.value
      }
    axios
      .post(
        "http://localhost:5000/user/login", loginDetails)
      .then((response) => {
        console.log(response)
        if (response.data.message === "Login Successful!") {
          alert("User logged in successfully!");
          window.location.href = "C:/Users/parri/OneDrive/Documents/GitHub/WebDev/ExpenseTracker/views/expense/expense.html";
        }
      })
      .catch((err) => {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = '';
        errorMessage.textContent = err.response.data.message;
      })
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}