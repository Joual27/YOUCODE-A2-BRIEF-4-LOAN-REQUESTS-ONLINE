let data = [];
const requestsTable = document.getElementById("requests-table");
const requestDataHolder = document.getElementById("loan-request-data-container");
const requestStatesHistoryHolder = document.getElementById("loan-request-state-history-container");
const dateInput = document.getElementById('date-filter');
const stateFilter = document.getElementById("state-filter");
const currentStateValue = document.getElementById("update-state-options");
const updateStateForm = document.getElementById("update-loan-request-state");
const closeUpdateStateForm = document.getElementById("close-update-loan-request-state");
const explanation = document.getElementById("explanation");
const updateStateBtn = document.getElementById("update-state");
const submitUpdateStateHolder = document.getElementById("submit-update-state-holder");
const updateSuccess = document.getElementById("update-success");

let loanRequestToUpdate = 0;
const fetchAllLoanRequests = (response) => {
     requestsTable.innerHTML = "";
     response.forEach(item => {
         let row = document.createElement('tr');
         row.innerHTML = `
            <td>${item.pronoun + " . "+ item.firstName + " " + item.familyName }</td>
            <td>${handleOccupation(item.currentPosition)}</td>
            <td>${handleProject(item.project)}</td>
            <td>${item.amount}</td>
            <td>${item.durationInMonths}</td>
            <td>${item.toPayPerMonth}</td>
            <th>${handleState(item.requestStates)}</th>
            <td class="admin-actions">
                <img data-id="${item.id}" class="show-more" src="${window.contextPath}/resources/imgs/more.png" alt="">
                <img data-id="${item.id}" class="show-state-history" src="${window.contextPath}/resources/imgs/history.png" alt="">
                <img data-id="${item.id}" class="edit-state" src="${window.contextPath}/resources/imgs/edit.png" alt="">
            </td>
        `;
         requestsTable.appendChild(row);
     })

    data = response;
}

const getAllLoanRequests = () => {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/smart-bank/admin/dashboard?action=fetchAllRequests";

    xhr.open('GET' , url , true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                fetchAllLoanRequests(response);
            }
            else{
                console.error("error" , xhr.status , xhr.statusText);
            }
        }
    }
    xhr.send();
}

const handleOccupation = (occupation) => {
    switch (occupation){
        case "private_employee":
            return "Private Employee"
        case "civil_servant":
            return "Civil Servant"
        case "liberal_profession":
            return "Liberal Profession"
        case "merchant":
            return "Merchant"
        case "retiree":
            return "Retiree"
        case "artisan":
            return "Artisan"
    }
}

const handleProject = (project) => {
    switch (project){
        case "used_vehicle":
            return "Used Vehicle"
        case "personal_expenses":
            return "Personal expenses"
        case "home_equipment":
            return "Home equipment"
        case "new_vehicle":
            return "New Vehicle"
        case "project":
            return "Project"
    }
}

const handleState = (allRequestStates) =>{
    if (allRequestStates.length ===  1){
        return "<div class='status pending'><p>Pending</p></div>"
    }
    else{
        switch (allRequestStates[0].state.state){
            case "PENDING":
                return "<div class='status pending'><p>Pending</p></div>"
            case "ACCEPTED":
                return "<div class='status accepted'><p>Accepted</p></div>"
            case "REJECTED":
                return "<div class='status rejected'><p>Rejected</p></div>"
            case "REJECTED_BY_CUSTOMER":
                return "<div class='status rejected'><p>Rejected By Customer</p></div>"
        }
    }

}


const handleFetchingRequestStatesHistory = (id) => {
    const loanRequest = data.find(item => item.id == id);
    if (loanRequest){
        if (loanRequest.requestStates.length === 1){
            requestStatesHistoryHolder.innerHTML = `
            <div class="loan-request-state-history">
                <div class="loan-request-state-history-header">
                    <img class="close-request-state-history-holder" src="${window.contextPath}/resources/imgs/close.png" alt="">
                    <p>State History : Request ${loanRequest.id}</p>
                </div>
                <div class="no-state-updates">
                     <p>The admin didn't change the initial state yet : <span>Pending</span></p>
                </div>
            </div>
            `
        }
        else{
            let historyHtml = '';
            for (let i = 0 ; i < loanRequest.requestStates.length-1 ; i++){

                let currentState = loanRequest.requestStates[i];
                let previousState = loanRequest.requestStates[i+1];
                historyHtml += ` 
                    <div class="loan-request-state-history-item">
                                <p>${ i === loanRequest.requestStates.length-2 ? handleRequestState("PENDING") : handleRequestState(previousState.state.state)}<span class="arrow"> <img src="${window.contextPath}/resources/imgs/arrow.png" alt=""></span> ${handleRequestState(currentState.state.state)}</p>
                                <p class="state-update-date"><span class="key">Updated On : </span><span class="value">${formatDate(currentState.createdAt)}</span></p>
                                <p class="state-update-reason"><span class="key">Reason : </span><span class="value">${currentState.explanation === null ? "NO explanation given by admin" : currentState.explanation} </span></p>
                    </div>
                `
                requestStatesHistoryHolder.innerHTML = `
                    <div class="loan-request-state-history">
                        <div class="loan-request-state-history-header">
                            <img class="close-request-state-history-holder" src="${window.contextPath}/resources/imgs/close.png" alt="">
                            <p>State History : Request 15</p>
                        </div>
                        <div class="loan-request-state-history-items">
                            ${historyHtml}
                        </div>
                    </div>
                `
            }
        }
        requestStatesHistoryHolder.classList.remove("hidden")
    }
}

const fetchFullRequestData = (id) => {
    const loanRequest = data.find(item => item.id == id);
    if (loanRequest){
        requestDataHolder.innerHTML = `
           <div class="loan-request-data">
            <div class="loan-request-data-header">
                <img class="close-request-data-holder" src="${window.contextPath}/resources/imgs/close.png" alt="">
                <p>Request ${loanRequest.id}</p>
            </div>
            <div class="loan-request-data-items">
                <div class="loan-request-data-item">
                    <p class="key">Made By :</p>
                    <p class="value">${loanRequest.pronoun + ". "+loanRequest.familyName + " " + loanRequest.firstName}</p>
                </div>
                <div class="loan-request-data-item">
                    <p class="key">With National Id Card Number :</p>
                    <p class="value">${loanRequest.idCardNumber}<p>  
                </div>
                <div class="loan-request-data-item">
                    <p class="key">Email :</p>
                    <p class="value">${loanRequest.email}</p>
                </div>
                <div class="loan-request-data-item">
                    <p class="key">Phone Number :</p>
                    <p class="value">${loanRequest.phoneNumber}</p>
                </div>
                <div class="loan-request-data-item">
                    <p class="key">Tax :</p>
                    <p class="value">${loanRequest.tax}</p>
                </div>
            </div>
        </div>
        `
        requestDataHolder.classList.remove("hidden");
    }

}

requestsTable.addEventListener("click" ,(e) => {
    if (e.target.classList.contains("show-more")){
        let id = e.target.dataset.id;
        fetchFullRequestData(id);
    }
});

document.addEventListener("click" ,(e) => {
    if (e.target.classList.contains("close-request-data-holder")){
        requestDataHolder.classList.add("hidden");
    }
});


requestsTable.addEventListener("click" , (e) =>{
    if (e.target.classList.contains("show-state-history")){
        let id = e.target.dataset.id;
        handleFetchingRequestStatesHistory(id);
    }
    else if(e.target.classList.contains("edit-state")){
        updateSuccess.textContent = "";
        explanation.value = "";
        let id = e.target.dataset.id;
        loanRequestToUpdate = id;
        handleShowingUpdateStateForm(id);
    }
})

document.addEventListener("click" ,(e) => {
    if (e.target.classList.contains("close-request-state-history-holder")){
        requestStatesHistoryHolder.classList.add("hidden");
    }
});

stateFilter.addEventListener("change" , (e) => {
    if (e.target.value !== ""){
        const req = {
            state : e.target.value
        }
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/smart-bank/loan/request/filter/by/state"
        xhr.open("POST" , url , true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    fetchAllLoanRequests(response);
                }
                else{
                    console.log("Err :" , xhr.status , xhr.statusText)
                }
            }
        }
        xhr.send(JSON.stringify(req));
    }
    else{
        getAllLoanRequests();
    }
})

dateInput.addEventListener("change", (e) => {
    if (e.target.value !== "") {
        const req = {
            date: e.target.value
        }
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:8080/smart-bank/loan/request/filter/by/date";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    fetchAllLoanRequests(response);
                } else {
                    console.log("Err:", xhr.status, xhr.statusText);
                }
            }
        };
        xhr.send(JSON.stringify(req));
    } else {
        getAllLoanRequests();
    }
})


const handleRequestState = (state) => {
    switch (state) {
        case "PENDING":
            return "<span class='state-pending'>Pending</span>"
        case "ACCEPTED":
            return "<span class='state-accepted'>Accepted</span>"
        case "REJECTED" :
            return '<span class="state-rejected">Rejected</span>'
        case "REJECTED_BY_CUSTOMER" :
            return '<span class="state-rejected">Rejected By Customer</span>'
    }
}

const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return `${day}-${month}-${year}`;
};

let initialState = '';
const handleShowingUpdateStateForm = (id) => {
    let currentLoanRequest = data.find(item => item.id == id);
    let currentState = currentLoanRequest.requestStates[0].state.state;
    initialState = currentState;
    currentStateValue.value = currentState;
    updateStateForm.classList.remove("hidden");

}

closeUpdateStateForm.addEventListener("click" , () => {
    updateStateForm.classList.add("hidden");
})

currentStateValue.addEventListener("change", (e) => {
    if (e.target.value !== initialState){
        explanation.classList.remove("hidden");
        submitUpdateStateHolder.classList.remove("hidden")
    }
    else{
        explanation.classList.add("hidden");
        submitUpdateStateHolder.classList.add("hidden")
    }
})

updateStateBtn.addEventListener("click", () => {
    let state = currentStateValue.value;
    let updateExplanation = explanation.value;
    let loanRequestId = loanRequestToUpdate;

    let url = "http://localhost:8080/smart-bank/loan/request/update/state";

    const data = {
        state: state,
        explanation: updateExplanation,
        id: loanRequestId
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                console.log(res);
                updateSuccess.textContent = "Loan Request " + res.id + " updated successfully!";
                setTimeout(() => {
                    updateStateForm.classList.add("hidden");
                    updateSuccess.textContent = "";
                    explanation.value = "";
                }, 2500);
                getAllLoanRequests();
            } else {
                console.log("Err", xhr.status, xhr.statusText);
                console.log(res);
            }
        }
    };

    xhr.send(JSON.stringify(data));
});

getAllLoanRequests();






