const inputValidationRules = {
    emailInput: 'email',
    phoneInput: 'phone',
    firstNameInput: 'text',
    familyNameInput: 'text',
    CINInput: 'CIN',
    birthdayInput: 'date',
    dateOfWorkInput: 'date',
    salaryPerMonthInput: 'number'
};


const dateInput = document.getElementById("birthdayInput");
const dateOfWork = document.getElementById("dateOfWorkInput");

const validateInput = (inputVal, type) => {
    let isValid;
    let errMessage = "";
    switch (type) {
        case 'email':
            isValid = isValidData(inputVal, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!isValid) errMessage = "Invalid Email Format!";
            break;
        case 'phone':
            isValid = isValidData(inputVal, /^(06|07)\d{8}$/);
            if (!isValid) errMessage = "Invalid Phone Format!";
            break;
        case 'date':
            isValid = isValidData(inputVal, /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/);
            if (!isValid) errMessage = "Invalid Date Format!";
            break;
        case 'CIN':
            isValid = isValidData(inputVal, /^[A-Za-z]{1,2}\s?\d{1,7}$/);
            if (!isValid) errMessage = "Invalid CIN Format!";
            break;
        case 'number':
            isValid = isValidData(inputVal, /^\d+$/);
            if (!isValid) errMessage = "Invalid Number Format!";
            break;
        case 'text':
            isValid = inputVal.trim() !== '';
            if (!isValid) errMessage = "Names can't be empty !";
            break;
    }
    return errMessage;
}

const isValidData = (value, pattern) => {
    return pattern.test(value);
}

const handleValidation = (input) => {
    const inputType = inputValidationRules[input.id];
    if (validateInput(input.value.trim(), inputType) === '') {
        input.classList.replace('invalidInput', 'validInput');
    } else {
        input.classList.remove('validInput');
        input.classList.add('invalidInput');
    }
};


document.querySelectorAll('.inputs').forEach(input => {
    input.addEventListener('input', (e) => {
        handleValidation(e.target);
    });
});


dateInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 6) value = value.substring(0, 8);

    if (value.length >= 3) {
        value = value.slice(0, 2) + "-" + value.slice(2, 4) + (value.length > 4 ? "-" + value.slice(4, 8) : '');
    } else if (value.length >= 2) {
        value = value.slice(0, 2) + "-" + value.slice(2);
    }
    e.target.value = value;

    if (value.length === 10) {
        e.target.setAttribute("maxlength", "10");
    } else {
        e.target.removeAttribute("maxlength");
    }
});

dateOfWork.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 6) value = value.substring(0, 8);

    if (value.length >= 3) {
        value = value.slice(0, 2) + "-" + value.slice(2, 4) + (value.length > 4 ? "-" + value.slice(4, 8) : '');
    } else if (value.length >= 2) {
        value = value.slice(0, 2) + "-" + value.slice(2);
    }
    e.target.value = value;

    if (value.length === 10) {
        e.target.setAttribute("maxlength", "10");
    } else {
        e.target.removeAttribute("maxlength");
    }
});