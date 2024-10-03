const submitSecondPhaseBtn = document.getElementById('second-phase-submit')
const submitFirstPhaseBtn = document.getElementById('first-phase-submit')
const firstPhaseInterface = document.getElementById('first-phase')
const secondPhaseInterface = document.getElementById('second-phase')
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
        errors.map(e => {
            console.log(e)
        })
    }
    else{
        phase = 2;
        console.log(phase)
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
    if (phase == 2){
        firstPhaseInterface.classList.add('hiddenPhase')
        secondPhaseInterface.classList.remove('hiddenPhase')
        appendFirstPhaseDataToEstimate();
    }
    else if(phase == 1){
        secondPhaseInterface.classList.add('hiddenPhase')
        firstPhaseInterface.classList.remove('hiddenPhase')
    }
}


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



