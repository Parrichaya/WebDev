// console.log(printName);

// console.log(a);



// var a = 3;



// var printName = function (name) {

// console.log(name)

// }
//////////////////////////////////////////////////////////////////////////////////////
// function outerfunction() {

//     console.log(a);
    
//     var a = 10;
    
    
    
//     innerfunction();
    
    
    
//     function innerfunction() {
    
//     console.log(a);
    
//     // console.log(window.a);
    
//     console.log(this.a)
    
//     }
    
//     }
    
    
    
//     var a = 7;
    
//     var b =3
    
    
    
//     outerfunction();
//////////////////////////////////////////////////////////////////////////////////////////

// b = 9
// function a() {
//     let b = 1
//     function y() {
//     let b = 2
//     function x() {
//         let b = 5
//         console.log(this.b)
//     }
//     x()
// }
// y()
// }
// a()
////////////////////////////////////////////////////////////////////////

// const name = (arr)=>{
//     let i = 0
//         return () => {
//         if (i < arr.length) {
//         console.log('Hello '+arr[i]);
//         i++
//     }
// }
// }

// let fun = name(["Ram","Shyam"]);

// fun()// Print Hello Ram

// fun()//print Hello Shyam

let buyBike = (callback) => {
    setTimeout( () => {
      console.log("Bought Royal Enfield Himalayan");
      callback()
    },2000);
  };
  
  let planTrip = () => {
    setTimeout( () => {
      console.log("Trip to Ladakh planned");
    },1000);
  };
  
  buyBike(planTrip);


  console.log("Let's rock!")
  console.log("hello")
  