const submitSecondPhaseBtn = document.getElementById('second-phase-submit')
const submitFirstPhaseBtn = document.getElementById('first-phase-submit')
const firstPhaseInterface = document.getElementById('first-phase')
const secondPhaseInterface = document.getElementById('second-phase')
const thirdPhaseInterface = document.getElementById('third-phase')
const project = document.getElementById('project');
const projectHolder = document.getElementById('projectHolder');
const requesterField = document.getElementById('requesterField');
const estimateTable = document.querySelector('estimate-table')

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
    handlePhases();
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
        appendFirstPhaseDataToEstimate();
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
        <tr class="estimate-section-title">
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
    title.textContent = 'My project';
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