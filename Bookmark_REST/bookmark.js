const crudcrud = "https://crudcrud.com/api/bde0cd7e854b44c9b852e53e5fd291d4/storeData"
function handleFormSubmit(event) {
    event.preventDefault();
    const siteDetails = {
      title: event.target.title.value,      
      url: event.target.url.value
    };
    axios
      .post(crudcrud,siteDetails)
      .then((response) => displaySiteOnScreen(response.data))
      .catch((error) => console.log(error));
    
    event.target.reset();
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(crudcrud)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displaySiteOnScreen(response.data[i]);
            }
        })
        .catch((error) => console.log(error));
  })

  function displaySiteOnScreen(siteDetails) {
    const listItem = document.createElement("li");
    listItem.appendChild(
      document.createTextNode(
        `${siteDetails.title} -> `
      )
    );
    
    const siteLink = document.createElement("a");
    siteLink.className = "link"
    siteLink.href = siteDetails.url;
    siteLink.textContent = siteDetails.url;
    listItem.appendChild(siteLink);
    
    const siteList = document.querySelector("ul");
    siteList.appendChild(listItem); 
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    listItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-outline-secondary";
    editBtn.appendChild(document.createTextNode("Edit"));
    listItem.appendChild(editBtn);    
  
    deleteBtn.addEventListener("click", function (event) {
        axios 
            .delete(`${crudcrud}/${siteDetails._id}`)
            .then(() => siteList.removeChild(event.target.parentElement))
            .catch((error) => console.log(error));
    });
  
    editBtn.addEventListener("click", function (event) {
        axios 
            .delete(`${crudcrud}/${siteDetails._id}`)
            .then(() => siteList.removeChild(event.target.parentElement))
            .catch((error) => console.log(error));   
      
        document.getElementById("title").value = siteDetails.title;
        document.getElementById("url").value = siteDetails.url;
    });
  }