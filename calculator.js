var firstNum, secNum, answer;
var pickedOperator;

var chosen = false;
var newEquation = false;
var decAdded = false;

//html initializations
const equalsbtn = document.getElementById('equalsbtn');

const clear = document.getElementById('clear');
const deletebtn = document.getElementById("delete");

const buttonList = document.getElementsByClassName('valbtn');
const operators = document.getElementsByClassName('opbtn');

const displayDiv = document.querySelector('div.display');
const secDisplay = document.querySelector('p.secondarydisplaytext');
const displayText = document.querySelector('p.displaytext');
//end of html initializations

function add(numOne, numTwo) {
    return numOne + numTwo;
}

function subtract(numOne, numTwo) {
    return numOne - numTwo;
}

function multiply(numOne, numTwo) {
    return numOne * numTwo;
}

function divide(numOne, numTwo) {
    return numOne / numTwo;
}

function operate(method, numOne, numTwo) {
    return method(numOne, numTwo);
}

for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].addEventListener('click', function(e) {
        if (buttonList[i].textContent == ".") {
            if (decAdded == false) {
                displayText.textContent += buttonList[i].textContent;
                decAdded = true;
            }
        } else {
            displayText.textContent += buttonList[i].textContent;
        }
    });
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function(e) {
        if (firstNum == undefined) {
            firstNum = displayText.textContent;
        }

        if (chosen == false) {
            pickedOperator = operators[i].textContent;
            chosen = true;
        }

        if (newEquation == true) {
            secDisplay.textContent = "";
            newEquation = false;
        }

        displayText.textContent = "";
        secDisplay.textContent += firstNum;
        secDisplay.textContent += " ";
        secDisplay.textContent += pickedOperator;
        secDisplay.textContent += " ";

        decAdded = false;

        console.log(firstNum);
        console.log(pickedOperator);
    });
}

equalsbtn.addEventListener('click', function(e) {
    if (firstNum != undefined && secNum == undefined && displayText != "") {
        secNum = displayText.textContent;
        secDisplay.textContent += secNum;
        secDisplay.textContent += " = ";
        
        if (pickedOperator == "+") {
            answer = operate(add, parseFloat(firstNum), parseFloat(secNum));
            displayText.textContent = Number(parseFloat(answer).toFixed(9));
            firstNum = undefined;
            secNum = undefined;
            chosen = false;
        } else if (pickedOperator == "-") {
            answer = operate(subtract, parseFloat(firstNum), parseFloat(secNum));
            displayText.textContent = Number(parseFloat(answer).toFixed(9));
            firstNum = undefined;
            secNum = undefined;
            chosen = false;
        } else if (pickedOperator == "*") {
            answer = operate(multiply, parseFloat(firstNum), parseFloat(secNum));
            displayText.textContent = Number(parseFloat(answer).toFixed(9));
            firstNum = undefined;
            secNum = undefined;
            chosen = false;
        } else if (pickedOperator == "/") {
            if (secNum == 0) {
                alert("You can't divide by 0, silly!");
                displayText.textContent = "";
                secDisplay.textContent = "";
                firstNum = undefined;
                secNum = undefined;
                chosen = false;
            } else {
                answer = operate(divide, parseFloat(firstNum), parseFloat(secNum));
                displayText.textContent = Number(parseFloat(answer).toFixed(9));
                firstNum = undefined;
                secNum = undefined;
                chosen = false;
            }
        }

        answer = undefined;
        newEquation = true;
        decAdded = false;
    }
});

clear.addEventListener('click', function(e) {
    displayText.textContent = "";
    secDisplay.textContent = "";
    firstNum = undefined;
    secNum = undefined;
    chosen = false;
});

deletebtn.addEventListener('click', function(e) {
    let temp = displayText.textContent.slice(0, -1);
    displayText.textContent = temp;
});