document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');
  let currentInput = '';
  let hasDecimal = false;
  let operator = null;
  let previousOperatorButton = null;

  function updateDisplay(value) {
      display.value = value;
  }

  function clearDisplay() {
      currentInput = '';
      hasDecimal = false;
      operator = null;
      if (previousOperatorButton) {
          previousOperatorButton.style.background = '';
      }
      previousOperatorButton = null;
      updateDisplay(currentInput);
  }

  function toggleSign() {
      if (currentInput) {
          if (currentInput.charAt(0) === '-') {
              currentInput = currentInput.slice(1);
          } else {
              currentInput = '-' + currentInput;
          }
          updateDisplay(currentInput);
      }
  }

  function handlePercentage() {
      if (currentInput) {
          currentInput = (parseFloat(currentInput) / 100).toString();
          updateDisplay(currentInput);
      }
  }

  function handleButtonClick(value, button = null) {
      if (value === 'C') {
          clearDisplay();
      } else if (value === '=') {
          if (operator && currentInput) {
              try {
                  currentInput = eval(currentInput.replace(/x/g, '*')).toString();
              } catch (e) {
                  currentInput = 'Error';
              }
              hasDecimal = currentInput.includes('.');
              if (previousOperatorButton) {
                  previousOperatorButton.style.background = '';
              }
              previousOperatorButton = null;
              operator = null;
              updateDisplay(currentInput);
          }
      } else if (value === '+/-') {
          toggleSign();
      } else if (value === '%') {
          handlePercentage();
      } else if (['+', '-', 'x', '/'].includes(value)) {
          if (!currentInput || isNaN(currentInput.slice(-1))) return;
          if (previousOperatorButton) {
              previousOperatorButton.style.background = '';
          }
          operator = value;
          if (button) {
              previousOperatorButton = button;
              previousOperatorButton.style.background = '#ccc';
          }
          currentInput += ` ${value} `;
          hasDecimal = false; // Reset decimal flag for new number
          updateDisplay(currentInput);
      } else {
          if (value === '.') {
              if (hasDecimal) return;
              if (currentInput === '' || isNaN(currentInput.slice(-1))) {
                  currentInput += '0';
              }
              hasDecimal = true;
          } else if (value === '0') {
              if (currentInput === '' || isNaN(currentInput.slice(-1))) {
                  currentInput += '0.';
                  hasDecimal = true;
                  updateDisplay(currentInput);
                  return;
              }
          } else {
              if (isNaN(value) && isNaN(currentInput.slice(-1))) return;
          }

          currentInput += value;
          updateDisplay(currentInput);
      }
  }

  buttons.forEach(button => {
      button.addEventListener('click', (event) => handleButtonClick(button.textContent, button));
  });

  document.addEventListener('keydown', (event) => {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Delete', 'Escape', '%'];
      if (!allowedKeys.includes(event.key)) return;

      if (event.key === 'Enter') {
          handleButtonClick('=');
      } else if (event.key === 'Escape') {
          clearDisplay();
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
          clearDisplay();
      } else if (event.key === '*') {
          handleButtonClick('x');
      } else {
          handleButtonClick(event.key);
      }
  });
});
