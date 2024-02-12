const fruitList = document.querySelectorAll('.fruit');
for (let i = 0; i < fruitList.length; i++) {
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  fruitList[i].appendChild(editBtn);
}
const form = document.querySelector('form')
const fruits = document.querySelector('.fruits')

const fruitDescription = document.createElement('input')
fruitDescription.type = 'text'
fruitDescription.id = 'description'
form.insertBefore(fruitDescription,form.querySelector('button'))

form.addEventListener('submit', function(event){
    event.preventDefault()
    const fruitToAdd = document.getElementById('fruit-to-add')
    const descToAdd = document.getElementById('description') 

    const newLi = document.createElement('li')
    newLi.innerHTML = fruitToAdd.value + '<button class="delete-btn">x</button>' + '<button class="edit-btn">Edit</button>'
    
    const newP = document.createElement('p')
    newP.innerHTML = descToAdd.value
    newLi.appendChild(newP).style.fontStyle = 'italic'

    fruits.appendChild(newLi)
})


fruits.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn')){
        const fruitToDelete = event.target.parentElement
        fruits.removeChild(fruitToDelete)
    }
})

// filter functionality
const filter = document.getElementById('filter')

filter.addEventListener('keyup',function(event) {
    const textEntered = event.target.value.toLowerCase()
    const fruitItems = document.getElementsByClassName('fruit')
    for (let i = 0; i < fruitItems.length; i++) {
        const currentFruitText = fruitItems[i].firstChild.textContent.toLowerCase()
        const currentFruitDescription = fruitItems[i].getElementsByTagName('p')[0].textContent.toLowerCase()
        if (currentFruitText.indexOf(textEntered) === -1 && currentFruitDescription.indexOf(textEntered) === -1) {
            fruitItems[i].style.display = "none"
        }
        else {
            fruitItems[i].style.display = "flex"
        }
    }
})


