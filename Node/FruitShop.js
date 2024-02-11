const header = document.getElementById("header")
header.style.backgroundColor = "green"
header.style.color = "orange"
header.style.borderBottom = "3px solid orange"

const mainHeading = document.getElementById("main-heading")
mainHeading.textContent = "Fruit World"

const basketHeading = document.getElementById("basket-heading")
basketHeading.style.color = "green"

const thanks = document.getElementById("thanks")
thanks.innerHTML = "<p>Please visit us again</p>"
thanks.style.fontWeight = "bold"

const fruit = document.getElementsByClassName("fruit")
fruit[2].style.backgroundColor = "yellow"
for (let i = 0; i < fruit.length; i++) {
    fruit[i].style.fontWeight = "bold"
}

const listItems = document.getElementsByTagName("li")
listItems[3].style.color = "blue"
for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.fontStyle = "italic"
}