
const loan_amount = document.getElementById("loan_amount");
const loan_amount_holder = document.getElementById("loan_amount_holder");
const loan_duration = document.getElementById("loan_duration");
const loan_duration_holder = document.getElementById("loan_duration_holder");
const to_pay_per_month = document.getElementById("to_pay_per_month");
const to_pay_per_month_holder = document.getElementById("to_pay_per_month_holder");

loan_amount.addEventListener("input" , (e) => {
    loan_amount_holder.value = e.target.value;
    updateToPayPerMonthValues();
})

loan_duration.addEventListener("input" , (e) => {
    loan_duration_holder.value = e.target.value;
    loan_amount.value = e.target.value;
    updateToPayPerMonthValues();
})

to_pay_per_month.addEventListener("input" , (e) => {
    updateLoanDuration();
    updateToPayPerMonthValues();
})


const updateToPayPerMonthValues = () => {
    let amount_to_pay_per_month  = calculateToPayPerMonth(loan_amount.value , loan_duration_holder.value);
    to_pay_per_month.value = amount_to_pay_per_month;
    to_pay_per_month_holder.value = amount_to_pay_per_month;
    to_pay_per_month.setAttribute("max",amount_to_pay_per_month.toString())
    to_pay_per_month.setAttribute("min" , (calculateToPayPerMonth(loan_amount.value , 120).toString()))
}

const updateLoanDuration = () => {
    loan_duration.value = calculateLoanDuration(loan_amount.value , to_pay_per_month.value , 5)
    loan_duration_holder.value = calculateLoanDuration(loan_amount.value , to_pay_per_month.value , 5)
}

const calculateToPayPerMonth = (loan_amount , loan_duration) => {
    let monthly_interest_rate = 5 / 12 / 100;
    let res = (loan_amount * monthly_interest_rate) /
        (1 - Math.pow(1 + monthly_interest_rate, -loan_duration));
    return parseFloat(res.toFixed(2));
}

const calculateLoanDuration = (loan_amount, monthly_payment, annual_interest_rate) => {
    let monthly_interest_rate = annual_interest_rate / 12 / 100;

    let numerator = Math.log(monthly_payment / (monthly_payment - loan_amount * monthly_interest_rate));
    let denominator = Math.log(1 + monthly_interest_rate);

    let loan_duration = numerator / denominator;

    return Math.ceil(loan_duration);
}



