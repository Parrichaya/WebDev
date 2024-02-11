const header = document.getElementById("header")
header.style.backgroundColor = "green"
header.style.color = "orange"
header.style.borderBottom = "3px solid orange"

// const mainHeading = document.getElementById("main-heading")
// mainHeading.textContent = "Fruit World"

// const basketHeading = document.getElementById("basket-heading")
// basketHeading.style.color = "green"

const thanks = document.getElementById("thanks")
thanks.innerHTML = "<p>Please visit us again</p>"
thanks.style.fontWeight = "bold"

// const fruit = document.getElementsByClassName("fruit")
// fruit[2].style.backgroundColor = "yellow"
// for (let i = 0; i < fruit.length; i++) {
//     fruit[i].style.fontWeight = "bold"
// }

const listItems = document.getElementsByTagName("li")
listItems[3].style.color = "blue"
for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.fontStyle = "italic"
}

const basket_heading = document.querySelector("#basket-heading")
basket_heading.style.color = "brown"

const oddfruit = document.querySelectorAll('.fruit:nth-child(odd)')
for (let i = 0; i < oddfruit.length; i++) {
    oddfruit[i].style.backgroundColor = "lightgray"
} 

const evenfruit = document.querySelectorAll('.fruit:nth-child(even)')
for (let i = 0; i < evenfruit.length; i++) {
    evenfruit[i].style.backgroundColor = "brown"
    evenfruit[i].style.color = "white"
} 

const mainHeading = document.querySelector("#main-heading")
mainHeading.style.textAlign = "right"

const fruitss = document.querySelector(".fruits")
fruitss.style.backgroundColor = "gray"
fruitss.style.padding = "30px"
fruitss.style.margin = "30px"
fruitss.style.width = "50%"
fruitss.style.borderadRadius = "5px"
fruitss.style.listStyleType = "none"

const fruitItems = document.querySelectorAll(".fruit")
for (let i = 0; i < fruitItems.length; i++) {
    fruitItems[i].style.padding = "10px"
    fruitItems[i].style.margin = "10px"
    fruitItems[i].style.borderadRadius = "5px"
}

const paraH3 = document.createElement('h3')
const paraTextH3 = document.createTextNode('Buy high quality organic fruits online')
paraH3.appendChild(paraTextH3)

const paraP = document.createElement('p')
const paraTextP = document.createTextNode('Total fruits: 4')
paraP.appendChild(paraTextP)

const divs = document.getElementsByTagName('div')
const firstDiv = divs[0]
const secondDiv = divs[1]
firstDiv.appendChild(paraH3).style.fontStyle = 'italic'

const fruits = document.querySelector('.fruits')
secondDiv.insertBefore(paraP,fruits)

paraP.id = 'fruits-total'

// Parent,child & siblings
const ul = document.querySelector('.fruits')
ul.style.backgroundColor = 'magenta'

ul.parentElement.style.backgroundColor = 'yellow'           // parent
ul.children[2].style.color = 'blue'                         // child
ul.previousElementSibling.style.color = 'red'               // sibling