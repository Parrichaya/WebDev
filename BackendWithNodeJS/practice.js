const arr = ['apple','orange','','banana','','grape']
let newArr = arr.map(fruit => {
    return fruit == '' ? fruit + 'empty string': fruit
})
console.log(arr)
console.log(newArr)