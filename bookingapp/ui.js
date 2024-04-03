function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "http://localhost:5000/user/add-user", userDetails)
      .then((response) => {
        console.log(response)
        displayUserOnScreen(response.data.newUserDetail)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("http://localhost:5000/user/get-users")
        .then((response) => {
            for (var i = 0; i < response.data.allUsers.length; i++) {
                displayUserOnScreen(response.data.allUsers[i]);
            }
        })
        .catch((error) => console.log(error));
  })

  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", (event) => {
      axios
        .delete(`http://localhost:5000/user/delete-user/${userDetails.id}`)
        .then(() => userItem.remove())
        .catch((error) => console.log(error));
    })
}