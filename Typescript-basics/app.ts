const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const btnElement = document.querySelector('button')!;

const numResults: Array<number> = []
const strResults: string[] = []

type NumOrStr = number | string
type Result = {val: number; timestamp: Date}

function add(a: NumOrStr, b: NumOrStr) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a + ' ' + b
    }
    else if (typeof a === 'number' && typeof b === 'number') {
        return a + b
    }
    return +a + +b;
}

function printResult(resultObj: Result) {
    console.log(resultObj.val)
}

btnElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const numresult = add(+num1, +num2);
    const strresult = add(num1, num2);
    numResults.push(numresult as number);
    strResults.push(strresult as string);
    printResult({val: numresult as number, timestamp: new Date()})
    console.log(numResults, strResults);
    
})

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('It worked')
    }, 1000)
})

myPromise.then((result) => {
    console.log(result)
    console.log(result.split('w'))
})
