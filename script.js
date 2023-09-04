let expression = "";
const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const clearLastButton = document.getElementById("clearLast");
clearLastButton.addEventListener("click", clearLastInput);

function appendToExpression(value) {
    expression += value;
    expressionDisplay.textContent = expression;
}

function calculate() {
    try {
        const result = eval(expression);
        resultDisplay.textContent = result;
    } catch (error) {
        resultDisplay.textContent = "Error";
    }
}

function clearExpression() {
    expression = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "";
}
function updateClearLastButton() {
    clearLastButton.style.display = expression.length > 0 ? "block" : "none";
}

function clearLastInput() {
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
        expressionDisplay.textContent = expression;
        calculate(); // Recalculate the result after removing input
        updateClearLastButton();
    }
}

// Update the button visibility whenever the expression changes
appendToExpression(""); // Call this to initialize the button
