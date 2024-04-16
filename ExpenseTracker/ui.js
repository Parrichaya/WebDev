function handleFormSubmit(event) {
    event.preventDefault();
    const expenseDetails = {
        username: event.target.username.value,
        email: event.target.email.value
      }
    axios
      .post(
        "http://localhost:5000/user/signup", expenseDetails)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
  }