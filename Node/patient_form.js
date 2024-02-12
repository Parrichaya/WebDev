// function printform(event) {
//     event.preventDefault()
//     console.log(event.target.name.value)
//     console.log(event.target.email.value)
//     console.log(event.target.phone.value)
//     console.log(event.target.date.value)
//     console.log(event.target.time.value)
//   }
function printform(event) {
  event.preventDefault()
  
  const name = event.target.name.value
  const email = event.target.email.value
  const phone = event.target.phone.value

  localStorage.setItem('name', name)
  localStorage.setItem('email', email)
  localStorage.setItem('phone', phone)
}