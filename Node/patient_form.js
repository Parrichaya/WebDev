function printform(event) {
    event.preventDefault()
    console.log(event.target.name.value)
    console.log(event.target.email.value)
    console.log(event.target.phone.value)
    console.log(event.target.date.value)
    console.log(event.target.time.value)
  }