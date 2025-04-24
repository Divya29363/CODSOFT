document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '0';
    let currentOperator = null;
    let previousInput = null;
    let resetInput = false;
    
    // Update the display
    function updateDisplay() {
        display.textContent = currentInput;
    }
    
    // Handle number button clicks
    function handleNumber(number) {
        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }
    
    // Handle operator button clicks
    function handleOperator(operator) {
        if (currentOperator !== null) {
            calculate();
        }
        
        previousInput = currentInput;
        currentOperator = operator;
        resetInput = true;
    }
    
    // Handle decimal point
    function handleDecimal() {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }
    
    // Clear all inputs
    function handleClear() {
        currentInput = '0';
        currentOperator = null;
        previousInput = null;
        resetInput = false;
        updateDisplay();
    }
    
    // Perform calculation
    function calculate() {
        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        currentOperator = null;
        updateDisplay();
    }
    
    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                handleNumber(button.textContent);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                handleClear();
            } else if (button.textContent === '.') {
                handleDecimal();
            }
        });
    });
});