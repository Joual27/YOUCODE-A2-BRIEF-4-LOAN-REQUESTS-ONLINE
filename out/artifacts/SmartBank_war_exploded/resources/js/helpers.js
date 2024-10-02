export const calculateToPayPerMonth = (loan_amount , loan_duration) => {
    return (loan_amount * 5/12) / (1 - Math.pow(1 + 5/12 , loan_duration * -1))
}
