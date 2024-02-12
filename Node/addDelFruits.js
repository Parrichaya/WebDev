const fruitList = document.querySelectorAll('.fruit');
for (let i = 0; i < fruitList.length; i++) {
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  fruitList[i].appendChild(editBtn);
}
const form = document.querySelector('form')
const fruits = document.querySelector('.fruits')

form.addEventListener('submit', function(event){
    event.preventDefault()
    const fruitsToAdd = document.getElementById('fruit-to-add')

    const newLi = document.createElement('li')
    newLi.innerHTML = fruitsToAdd.value + '<button class="delete-btn">x</button>' + '<button class="edit-btn">Edit</button>' 
    fruits.appendChild(newLi)
})

fruits.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn')){
        const fruitToDelete = event.target.parentElement
        fruits.removeChild(fruitToDelete)
    }
})