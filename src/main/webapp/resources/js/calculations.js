
const loanAmountInput = document.getElementById("loan_amount");
const loanAmountHolder = document.getElementById("loan_amount_holder");
const loanDurationInput = document.getElementById("loan_duration");
const loanDurationHolder = document.getElementById("loan_duration_holder");
const toPayPerMonthInput = document.getElementById("to_pay_per_month");
const toPayPerMonthHolder = document.getElementById("to_pay_per_month_holder");

loanAmountInput.addEventListener("input", handleLoanAmountChange);
loanDurationInput.addEventListener("input", handleLoanDurationChange);
toPayPerMonthInput.addEventListener("input", handleMonthlyPaymentChange);

function handleLoanAmountChange() {
    const loanAmount = parseFloat(loanAmountInput.value);
    loanAmountHolder.value = loanAmount;
    updateMonthlyPayment();
}

function handleLoanDurationChange() {
    const loanDuration = parseInt(loanDurationInput.value);
    loanDurationHolder.value = loanDuration;

    updateMonthlyPayment();
}

function handleMonthlyPaymentChange() {
    const monthlyPayment = parseFloat(toPayPerMonthInput.value);
    toPayPerMonthHolder.value = monthlyPayment;
    updateLoanDuration(monthlyPayment);
}

function updateMonthlyPayment() {
    const loanAmount = parseFloat(loanAmountInput.value);
    const loanDuration = parseInt(loanDurationHolder.value);

    if (!isNaN(loanAmount) && !isNaN(loanDuration) && loanDuration > 0) {
        const monthlyPayment = calculateMonthlyPayment(loanAmount, loanDuration);

        const minPayment = calculateMonthlyPayment(loanAmount, 120);
        const maxPayment = calculateMonthlyPayment(loanAmount, 12);

        toPayPerMonthInput.setAttribute("min", minPayment.toFixed(2));
        toPayPerMonthInput.setAttribute("max", maxPayment.toFixed(2));

        if (monthlyPayment < minPayment) {
            toPayPerMonthInput.value = minPayment.toFixed(2);
        } else if (monthlyPayment > maxPayment) {
            toPayPerMonthInput.value = maxPayment.toFixed(2);
        } else {
            toPayPerMonthInput.value = monthlyPayment.toFixed(2);
        }

        toPayPerMonthHolder.value = toPayPerMonthInput.value;
    }
}

function updateLoanDuration(monthlyPayment) {
    const loanAmount = parseFloat(loanAmountInput.value);

    const minPayment = calculateMonthlyPayment(loanAmount, 120);
    const maxPayment = calculateMonthlyPayment(loanAmount, 12);

    if (monthlyPayment >= minPayment && monthlyPayment <= maxPayment) {
        let loanDuration = calculateLoanDuration(loanAmount, monthlyPayment, 5);
        console.log(loanDuration)

        if (loanDuration > 12 && loanDuration < 12.3){
            loanDuration = 12;
        } else if (loanDuration > 120) {
            loanDuration = 120;
        }

        loanDurationInput.value = loanDuration;
        loanDurationHolder.value = loanDuration;
    } else {
        toPayPerMonthInput.value = monthlyPayment < minPayment ? minPayment : maxPayment;
        toPayPerMonthHolder.value = toPayPerMonthInput.value;
    }
}

function calculateMonthlyPayment(loanAmount, loanDuration) {
    const monthlyInterestRate = 5 / 12 / 100;
    const monthlyPayment = (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -loanDuration));
    return parseFloat(monthlyPayment.toFixed(2));
}

function calculateLoanDuration(loanAmount, monthlyPayment, annualInterestRate) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numerator = Math.log(monthlyPayment / (monthlyPayment - loanAmount * monthlyInterestRate));
    const denominator = Math.log(1 + monthlyInterestRate);
    const loanDuration = numerator / denominator;
    if (loanDuration > 12.3){
        return Math.ceil(loanDuration)
    }
    else {
        return loanDuration
    }
}
