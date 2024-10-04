const submitSecondPhaseBtn = document.getElementById('second-phase-submit')
const submitFirstPhaseBtn = document.getElementById('first-phase-submit')
const submitThirdPhaseBtn = document.getElementById('third-phase-submit')
const firstPhaseInterface = document.getElementById('first-phase')
const secondPhaseInterface = document.getElementById('second-phase')
const thirdPhaseInterface = document.getElementById('third-phase')
const project = document.getElementById('project');
const projectHolder = document.getElementById('projectHolder');
const requesterField = document.getElementById('requesterField');
const firstStep = document.getElementById('step1')
const secondStep = document.getElementById('step2')
const thirdStep = document.getElementById('step3')

const pronounValue = document.querySelector('input[name="civilite"]:checked').value;
const firstNameInput = document.getElementById('firstNameInput')
const familyNameInput = document.getElementById('familyNameInput')
const CINInput = document.getElementById('CINInput')
const birthdayInput = document.getElementById('birthdayInput')
const dateOfWorkInput = document.getElementById('dateOfWorkInput')
const salaryPerMonthInput = document.getElementById('salaryPerMonthInput')
const termsInput = document.getElementById('termsInput')

const firstPhaseDataHolder = document.getElementById('first-phase-data-holder');

const loanRequestData = {
    project : '',
    requesterField : '',
    amount : 0,
    numberOfMonths : 0 ,
    toPayPerMonth : 0,
    tax : 0 ,
    email : '',
    phoneNumber : '',
    pronoun : '',
    firstName : '',
    lastName : '',
    CIN : '',
    birthday : '',
    dateOfWork : '',
    salaryPerMonth : 0
}


const clearRequestData = () => {
    loanRequestData.project = '';
    loanRequestData.requesterField = '';
    loanRequestData.amount = 0;
    loanRequestData.numberOfMonths = 0;
    loanRequestData.toPayPerMonth = 0;
    loanRequestData.tax = 0;
    loanRequestData.email = '';
    loanRequestData.phoneNumber = '';
    loanRequestData.pronoun = '';
    loanRequestData.firstName = '';
    loanRequestData.lastName = '';
    loanRequestData.CIN = '';
    loanRequestData.birthday = '';
    loanRequestData.dateOfWork = '';
    loanRequestData.salaryPerMonth = 0;
};

const clearSecondStepData = () => {
    loanRequestData.email = '';
    loanRequestData.phoneNumber = '';
};


let phase = 1;

submitSecondPhaseBtn.addEventListener('click' , (e) => {
    let errors = [];
    e.preventDefault();

    if (emailInput.value.trim() === '' || phoneInput.value.trim() === ''){
        errors.push('All Fields Are Required !')
    }

    else{
        if (!validateInput(emailInput.value , 'email') == ""){
            errors.push(validateInput(emailInput , 'email'))
        }

        if (!validateInput(phoneInput.value , 'phone') == ""){
            errors.push(validateInput(phoneInput , 'phone'))
        }
    }

    if (errors.length > 0){
        fetchValidationErrors(errors);
    }
    else{
        loanRequestData.email = emailInput.value;
        loanRequestData.phoneNumber = phoneInput.value;
        handleActiveStep(3)
        phase = 3;
        appendSecondPhaseDataToEstimate();
        handlePhases();
    }
})


submitFirstPhaseBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    loanRequestData.project = project.value;
    loanRequestData.requesterField = requesterField.value;
    loanRequestData.amount = loanAmountHolder.value;
    loanRequestData.numberOfMonths = loanDurationInput.value;
    loanRequestData.toPayPerMonth = toPayPerMonthHolder.value;
    loanRequestData.tax = loanRequestData.amount * 0.022;
    phase = 2 ;
    handleActiveStep(2)
    handlePhases();
    appendFirstPhaseDataToEstimate();

})



const handlePhases = () => {
    const toggleClass = (element, className, shouldAdd) => {
        if (shouldAdd && !element.classList.contains(className)) {
            element.classList.add(className);
        } else if (!shouldAdd && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    };

    if (phase === 2) {
        toggleClass(firstPhaseInterface, 'hiddenPhase', true);
        toggleClass(secondPhaseInterface, 'hiddenPhase', false);
        toggleClass(thirdPhaseInterface, 'hiddenPhase', true);
    }
    else if (phase === 1) {
        toggleClass(firstPhaseInterface, 'hiddenPhase', false);
        toggleClass(secondPhaseInterface, 'hiddenPhase', true);
        toggleClass(thirdPhaseInterface, 'hiddenPhase', true);
    }
    else if (phase === 3) {
        toggleClass(firstPhaseInterface, 'hiddenPhase', true);
        toggleClass(secondPhaseInterface, 'hiddenPhase', true);
        toggleClass(thirdPhaseInterface, 'hiddenPhase', false);
    }
};



project.addEventListener('change' , (e) => {
    let newProjectValue = e.target.value;
    switch (newProjectValue){
        case 'personal' :
            projectHolder.textContent = 'Personal Loan'
            break;
        case 'used_vehicle' :
            projectHolder.textContent = 'Financing used vehicle'
            break;
        case 'personal_expenses' :
            projectHolder.textContent = 'Personal expenses'
            break;
        case 'new_vehicle' :
            projectHolder.textContent = 'New Vehicle'
            break;
        case 'home_equipment' :
            projectHolder.textContent = 'Buying home equipment'
            break;
    }
})


const appendFirstPhaseDataToEstimate = () => {
    const rows = `
        <tr id="loan_details_title" class="estimate-section-title">
            <td colspan="2">My Loan Details</td>
        </tr>
        <tr>
            <td class="estimate-keys">You Are:</td>
            <td class="estimate-values"><strong>${convertRequesterField(loanRequestData.requesterField)}</strong></td>
        </tr>
        <tr>
            <td class="estimate-keys">Amount:</td>
            <td class="estimate-values"><strong>${loanRequestData.amount} DH</strong></td>
        </tr>
        <tr>
            <td class="estimate-keys">Duration:</td>
            <td class="estimate-values"><strong>${loanRequestData.numberOfMonths} Months</strong></td>
        </tr>
        <tr>
            <td class="estimate-keys">To Pay Per Month:</td>
            <td class="estimate-values"><strong>${loanRequestData.toPayPerMonth} DH</strong></td>
        </tr>
        <tr id="no-border">
            <td class="estimate-keys">Taxes:</td>
            <td class="estimate-values"><strong>${loanRequestData.tax} DH</strong></td>
        </tr>
    `;

    const estimateTable = document.querySelector('.estimate-table');

    estimateTable.insertAdjacentHTML('beforeend', rows);
};

const appendSecondPhaseDataToEstimate = () => {
    const { email, phoneNumber } = loanRequestData;

    const projectHolderRow = document.getElementById('projectHolder').parentNode;

    const infosSectionTitle = document.createElement('tr');
    const title = document.createElement('td');
    title.colSpan = 2;
    title.classList.add('estimate-section-title');
    infosSectionTitle.setAttribute('id' , 'contact_infos_title')
    title.textContent = 'Contact Infos';
    infosSectionTitle.appendChild(title);

    const emailData = document.createElement('tr');
    const emailTitle = document.createElement('td');
    const emailValue = document.createElement('td');
    emailTitle.classList.add('estimate-keys');
    emailTitle.textContent = 'Email:';
    emailValue.classList.add('estimate-values');
    emailValue.innerHTML = `<strong>${email}</strong>`;

    emailData.appendChild(emailTitle);
    emailData.appendChild(emailValue);


    const phoneData = document.createElement('tr');
    const phoneTitle = document.createElement('td');
    const phoneValue = document.createElement('td');
    phoneTitle.classList.add('estimate-keys');
    phoneTitle.textContent = 'Phone:';
    phoneValue.classList.add('estimate-values');
    phoneValue.innerHTML = `<strong>${phoneNumber}</strong>`;

    phoneData.appendChild(phoneTitle);
    phoneData.appendChild(phoneValue);

    projectHolderRow.after(phoneData);
    projectHolderRow.after(emailData);
    projectHolderRow.after(infosSectionTitle);
};



const convertRequesterField = (field) => {
    switch ( field) {
        case 'private_employee':
            return 'Private Employee'
        case 'civil_servant':
            return 'Civil Servant'
        case 'merchant':
            return 'Merchant'
        case 'artisan':
            return 'Artisan'
        case 'liberal_profession':
            return 'Liberal Profession'
        case 'retiree':
            return 'Retiree'
    }
}

const fetchValidationErrors = (errors) => {
    const errorsContainer = document.querySelector('.errors-container');
    const errorsView = document.querySelector('.errors-bg')
    errors.map(e => {
        errorsContainer.innerHTML += `
              <div class="error">
                     <div class="point"></div>
                     <p>${e}</p>
              </div>
        `
    })
    errorsView.classList.remove('hidden');

    setTimeout(() => {
        errorsView.classList.add('hidden')
        errorsContainer.innerHTML = '';
    } , 2500)
}


submitThirdPhaseBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    let errs = [];

    if (firstNameInput.value.trim() === '' || familyNameInput.value.trim() === '' || CINInput.value.trim() === '' || birthdayInput.value.trim() === '' || dateOfWorkInput.value.trim() === '' || salaryPerMonthInput.value.trim() === ''){
        errs.push('All Fields Are required ')
    }
    else{
        if (validateInput(CINInput.value , 'CIN') !== ''){
            errs.push('INVALID CIN FORMAT (XX - 123456)')
        }
        if (validateInput(birthdayInput.value , 'date') !== ''){
            errs.push('INVALID BIRTHDAY FORMAT !')
        }
        else if(!validateBirthdayDate(birthdayInput.value)){
            errs.push('Minimum required age is 18')
        }
        if (validateInput(dateOfWorkInput.value , 'date') !== ''){
            errs.push('INVALID DATE OF WORK FORMAT !')
        }
        if (salaryPerMonthInput.value < 0){
            errs.push("SALARY CAN'T BE NEGATIVE VALUE !")
        }
        if (!termsInput.checked){
            errs.push("PLEASE AGREE ON TERMS TO PROCEED !")
        }
    }

    if (errs.length > 0){
        fetchValidationErrors(errs);
    }
    else{
        loanRequestData.pronoun = pronounValue;
        loanRequestData.firstName = firstNameInput.value;
        loanRequestData.lastName = familyNameInput.value;
        loanRequestData.birthday = convertToDate(birthdayInput.value)
        loanRequestData.dateOfWork = convertToDate(dateOfWork.value)
        loanRequestData.CIN  = CINInput.value;
        loanRequestData.salaryPerMonth = salaryPerMonthInput.value;
        console.log('clean data' + Object.values(loanRequestData))
    }
})



const validateBirthdayDate = (birthday) => {
    let enteredDate = convertToDate(birthday)
    let currentDate = new Date()

    currentDate.setHours(0, 0, 0, 0);
    enteredDate.setHours(0, 0, 0, 0);

    let diffInMs = currentDate - enteredDate;

    let diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);

    return diffInYears >= 18;
}


const convertToDate = (target) => {
    let [d , m , y] = target.split('-').map(Number)

    return new Date(y , m-1 , d)
}


const handleActiveStep = (currentStep) => {

    if (currentStep === 1){
        firstStep.classList.add('active-step')
        if (firstStep.classList.contains('previous-step')){
            firstStep.classList.remove('previous-step')
        }
        if (secondStep.classList.contains('previous-step')){
            secondStep.classList.remove('previous-step')
        }
        if (secondStep.classList.contains('clickable-step')){
            secondStep.classList.remove('clickable-step')
        }
        if (secondStep.classList.contains('active-step')){
            secondStep.classList.remove('active-step')
        }
        if (thirdStep.classList.contains('clickable-step')){
            thirdStep.classList.remove('clickable-step')
        }
        if (thirdStep.classList.contains('active-step')){
            thirdStep.classList.remove('active-step')
        }
    }
    else if (currentStep === 2){
        secondStep.classList.add('active-step')
        if (secondStep.classList.contains('previous-step')){
            secondStep.classList.remove('previous-step')
        }
        if (firstStep.classList.contains('active-step')){
            firstStep.classList.remove('active-step')
        }
        if (thirdStep.classList.contains('active-step')){
            thirdStep.classList.remove('active-step')
        }
        if (thirdStep.classList.contains('clickable-step')){
            thirdStep.classList.remove('clickable-step')
        }
        firstStep.classList.add('previous-step')
    }
    else if (currentStep === 3){
        thirdStep.classList.add('active-step')
        if (firstStep.classList.contains('active-step')){
            firstStep.classList.remove('active-step')
        }
        if (secondStep.classList.contains('active-step')){
            secondStep.classList.remove('active-step')
        }
        secondStep.classList.add('clickable-step')
        firstStep.classList.add('previous-step')
        secondStep.classList.add('previous-step')
    }
}




firstStep.addEventListener('click' , () => {
    phase = 1;
    handlePhases()
    removeFirstPhaseDataFromEstimate()
    removeSecondPhaseDataFromEstimate()
    handleActiveStep(1)
})

secondStep.addEventListener('click' , () => {
    if (phase === 3){
        phase = 2;
        handlePhases()
        handleActiveStep(2)
        removeSecondPhaseDataFromEstimate();
        clearSecondStepData()
    }
})

const removeFirstPhaseDataFromEstimate = () => {
    const estimate = document.querySelector('.estimate');
    const sectionTitle = estimate.querySelector('#loan_details_title');

    if (sectionTitle) {
        let elementToDelete = sectionTitle;
        for (let i = 0; i < 6; i++) {
            const nextElement = elementToDelete.nextElementSibling;
            elementToDelete.remove();
            elementToDelete = nextElement;
        }
    }
}

const removeSecondPhaseDataFromEstimate = () => {
    const estimate = document.querySelector('.estimate');
    const sectionTitle = estimate.querySelector('#contact_infos_title');

    if (sectionTitle) {
        let elementToDelete = sectionTitle;
        for (let i = 0; i < 3; i++) {
            const nextElement = elementToDelete.nextElementSibling;
            elementToDelete.remove();
            elementToDelete = nextElement;
        }
    }
};

