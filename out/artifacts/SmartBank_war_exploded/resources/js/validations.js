const emailInput = document.getElementById("emailInput")
const phoneInput = document.getElementById("phoneInput")

const validateInput = (inputVal , type) => {
    let isValid;
    let errMessage  = "";
    switch (type){
        case 'email' :
            isValid = isValidData(inputVal , /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!isValid){
                errMessage = "Invalid Email Format !"
            }
            break;
        case 'phone' :
            isValid = isValidData(inputVal , /^(06|07)\d{8}$/)
            if (!isValid){
                errMessage = "Invalid Phone Format !"
            }
            break;
        case 'date' :
            isValid = isValidData(inputVal , /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/)
            if (!isValid){
                errMessage = "Invalid date Format !"
            }
            break ;
        case 'CIN' :
            isValid = isValidData(inputVal , /^[A-Z]{1,2}\s?\d{1,7}$/)
            if (!isValid){
                errMessage = "Invalid CIN Format !"
            }
            break;
    }
    return errMessage;
}

const isValidData = (value , pattern) => {
    return pattern.test(value);
}


phoneInput.addEventListener('input' , (e) => {
    let phoneValue = e.target.value;
    if (validateInput(phoneValue.trim() , 'phone') === ''){
        phoneInput.classList.replace('invalidInput' , 'validInput');
    }
    else {
        if (phoneInput.classList.contains('validInput')){
            phoneInput.classList.remove('validInput')
        }
        phoneInput.classList.add('invalidInput')
    }
})
emailInput.addEventListener('input' , (e) => {
    let emailValue = e.target.value;
    if (validateInput(emailValue , 'email') === ''){
        emailInput.classList.replace('invalidInput' , 'validInput');
    }
    else {
        if (emailInput.classList.contains('validInput')){
            emailInput.classList.remove('validInput')
        }
        emailInput.classList.add('invalidInput')
    }
})



