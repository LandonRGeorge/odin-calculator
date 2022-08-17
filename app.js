"use strict";

// TODO: Round decimals to nearest hundreds place
// TODO: Add keyboard support
// TODO: Review decimal logic


const nbrElements = document.querySelectorAll('.nbr');
const operatorElements = document.querySelectorAll('.operator');
const primaryDisplay = document.querySelector('#primary-display');
const secondaryDisplay = document.querySelector('#secondary-display');
const clear = document.querySelector('#clear');
const equal = document.querySelector('#equal');

const currentValues = {
  nbr1: '',
  nbr2: '',
  operator: '',
}

const add = (nbr1, nbr2) => nbr1 + nbr2;
const subtract = (nbr1, nbr2) => nbr1 - nbr2;
const multiply = (nbr1, nbr2) => nbr1 * nbr2;
const divide = (nbr1, nbr2) => {
  if (nbr2 === 0) {
    throw new Error('Div/0')
  }
  return nbr1 / nbr2
}


const operators = {
  '+': add,
  '-': subtract,
  'x': multiply,
  '/': divide,
}

function operate(nbr1, nbr2, operator) {
  const operation = operators[operator];
  return operation(+nbr1, +nbr2);
}


function updatePrimaryDisplay() {
  let CurrentNbr = currentValues.nbr2 ? currentValues.nbr2 : "";
  let valueAsString = CurrentNbr + this.textContent;
  console.log(valueAsString)
  let valueAsNumber = Number(valueAsString);
  if (valueAsNumber) {
    primaryDisplay.textContent = valueAsString.replace(/^0+/, '');
    currentValues.nbr2 = valueAsString;
    console.log(currentValues);
  }
}

function clearPrimaryDisplay() {
  primaryDisplay.textContent = "0";
  currentValues.nbr1 = '';
  currentValues.nbr2 = '';
  currentValues.operator = '';
  console.log(currentValues);
}

function registerOperatorPress() {
  if (currentValues.nbr1 && currentValues.nbr2) {
    registerEqualPress();
  }
  currentValues.nbr1 = currentValues.nbr2;
  currentValues.nbr2 = '';
  currentValues.operator = this.textContent;
}

function registerEqualPress() {
  let value
  try {
    value = operate(currentValues.nbr1, currentValues.nbr2, currentValues.operator);
  } catch (e) {
    if (e.message === "Div/0") {
      primaryDisplay.textContent = "Div/0";
      currentValues.nbr1 = '';
      currentValues.nbr2 = '';
      return
    }
  }
  let stringValue = value.toString();
  primaryDisplay.textContent = stringValue;
  currentValues.nbr1 = '';
  currentValues.nbr2 = stringValue;
}

for (let nbrElement of nbrElements) {
  nbrElement.addEventListener('click', updatePrimaryDisplay)
}

for (let operatorElement of operatorElements) {
  operatorElement.addEventListener('click', registerOperatorPress)
}

clear.addEventListener('click', clearPrimaryDisplay)
equal.addEventListener('click', registerEqualPress)



