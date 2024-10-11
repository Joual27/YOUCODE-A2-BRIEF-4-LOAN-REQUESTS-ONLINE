let data = [];
const contextPath = "${pageContext.request.contextPath}";



const fetchAllLoanRequests = (response) => {
     const requestsTable = document.getElementById("requests-table")
     response.forEach(item => {
         let row = document.createElement('tr'); 
         row.innerHTML = `
            <td>${item.pronoun + " . "+ item.firstName + " " + item.familyName }</td>
            <td>${handleOccupation(item.currentPosition)}</td>
            <td>${item.project}</td>
            <td>${item.amount}</td>
            <td>${item.durationInMonths}</td>
            <td>${item.toPayPerMonth}</td>
            <th>${handleState(item.requestStates)}</th>
            <td class="admin-actions">
                <img data-id="${item.id}" src="${window.contextPath}/resources/imgs/more.png" alt="">
                <img data-id="${item.id}" src="${window.contextPath}/resources/imgs/history.png" alt="">
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

const handleState = (allRequestStates) =>{

    if (allRequestStates.length ===  1){
        switch (allRequestStates[0].state){
            case 1:
                return "<div class='status pending'><p>Pending</p></div>"
            case 2:
                return "<div class='status accepted'><p>Accepted</p></div>"
            case 3:
                return "<div class='status rejected'><p>Rejected</p></div>"
            case 4:
                return "<div class='status rejected'><p>Rejected By Customer</p></div>"
        }
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

getAllLoanRequests();


