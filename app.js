
const showOnDisplay = document.querySelector('.input')
const operation = document.querySelector('.operation')
const num = document.querySelectorAll('.num')
const operator = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equal')
const noqta = document.querySelector('#noqta')
const deleteBtn = document.querySelector('.delete')
const percentage = document.querySelector('.percentage')
const positive_negative = document.querySelector('.positive_negative')
let storedNums = '';
let currentNum = '';
let oprSymbol = ''
let firstNum = '';
let res = ''

function add (...nums) {
    let result = 0;
    for (let i=0; i<nums.length; i++) {
    result += nums[i] 
    }   
    return result;
}

function multiply (...nums) {
    let result = 1;
    for (let i=0; i<nums.length; i++) {
        result *= nums[i] 
    }   
    return result;
}

function subtract (a, ...nums) {
    let result = a;
    for (let i=0; i<nums.length; i++) {
        result -= nums[i] 
    }   
    return result;
}

function divide (a, ...nums) {
    let result = a;
    for (let i=0; i<nums.length; i++) {
        if (nums[i] === 0) {
            return `Retard :)`
        }else 
        result /= nums[i]
    }   
    return result;
}

function operate (operator, ...nums) {
    return operator === '+'
    ? add(...nums)
    : operator === '-'
    ? subtract(...nums)
    : operator === '*'
    ? multiply(...nums)
    : operator === '/'
    ? divide(...nums)
    : `something's missing`
}

window.addEventListener('keydown', function(e){
    
    if (e.key === '.') noqta.click() 
    if (e.key === 'Backspace') deleteBtn.click()
    if (e.key === 'o') positive_negative.click()
    if (e.key === '%') percentage.click()
    if (e.key === 'c' || e.key === 'Escape') clear.click()

    // if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' ) { 
    //     operate.forEach(e => {
    //         e.key
    //     })
    // }

//     if (e.key >= '0' && e.key <= '9') {
//         num.forEach(e => {
//             if (e.textContent === e.key) {
//                 e.click()
//             }
//         })
//     }
});

num.forEach((e) => {
    e.addEventListener('click', function () { 
        if (e.textContent === '0' && storedNums === '0' && !storedNums.includes('.')) {
            return
        }
        storedNums += e.textContent 
        currentNum = storedNums
        showOnDisplay.textContent = currentNum    
    })
})

operator.forEach(e => {
    e.addEventListener('click', function() {
        equalCalc()
        firstNum = storedNums
        oprSymbol = e.textContent
        operation.textContent = +firstNum + oprSymbol
        storedNums = ''
    })
})

function result() {
    res = operate(oprSymbol, parseFloat(firstNum), parseFloat(currentNum))
    showOnDisplay.textContent = res
    operation.textContent = firstNum + oprSymbol + storedNums
    storedNums = res
}

equal.addEventListener('click', function (e) {
    equalCalc()
})

function equalCalc () {
    if (firstNum && storedNums) {
        result()
        operation.textContent = res
    }
    else showOnDisplay.textContent = ''
}

function clearCalc () {
    showOnDisplay.textContent = '0';
    operation.textContent = '';
    storedNums = '';
    firstNum = '';
    currentNum = '';
    res = '';
}

clear.addEventListener('click', function (e) {
    clearCalc()
})

function negativePositive () {
    storedNums = (storedNums * -1).toString()
    currentNum = storedNums
    showOnDisplay.textContent = currentNum
}

positive_negative.addEventListener('click', function(e) {
    negativePositive()
})

function deleteButton () {
    if (storedNums.length>1) {
        if (storedNums) {
            storedNums = (storedNums.slice(0, -1))
            currentNum = storedNums.toString()
        }
        else {
            storedNums = storedNums.slice(0, -1)
            currentNum = +storedNums
        }
        showOnDisplay.textContent = currentNum
    }
    else {
        clearCalc()
    }
}

deleteBtn.addEventListener('click', function() {
    deleteButton()

})

function decimal() {
    if (storedNums === '') {
        storedNums = '0' + noqta.textContent 
    }
    else if (!storedNums.includes('.')) {
        storedNums += noqta.textContent
    }
    currentNum = storedNums
    showOnDisplay.textContent = currentNum
}

noqta.addEventListener('click', function() {
    decimal()
})

function percentageFun () {
    storedNums = (storedNums / 100).toString()
    currentNum = storedNums
    showOnDisplay.textContent = currentNum

}
percentage.addEventListener('click', function(e) {
    percentageFun()
})



