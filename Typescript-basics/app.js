"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const btnElement = document.querySelector('button');
const numResults = [];
const strResults = [];
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a + ' ' + b;
    }
    else if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return +a + +b;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
btnElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const numresult = add(+num1, +num2);
    const strresult = add(num1, num2);
    numResults.push(numresult);
    strResults.push(strresult);
    printResult({ val: numresult, timestamp: new Date() });
    console.log(numResults, strResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked');
    }, 1000);
});
myPromise.then((result) => {
    console.log(result);
    console.log(result.split('w'));
});
