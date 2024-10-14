<%--
  Created by IntelliJ IDEA.
  User: atm
  Date: 10/10/24
  Time: 10:55 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Smart-Bank Admin Dashboard</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/admin.css">
</head>
<body>
    <div class="filters">
        <div class="filter-item">
            <label>Filter By Date :</label>
            <input type="date" id="date-filter">
        </div>
        <div class="filter-item">
            <label>Filter By State :</label>
            <select id="state-filter">
                <option value="">Select a state</option>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="REJECTED_BY_CUSTOMER">Rejected By Customer</option>
            </select>
        </div>

    </div>
    <div class="table-container">
        <table class="order-table">
            <thead>
            <tr class="table-header">
                <th>Holder</th>
                <th>Current Occupation</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Months</th>
                <th>Monthly Payment</th>
                <th>State</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody id="requests-table">

            </tbody>
        </table>
    </div>

    <div id="loan-request-data-container" class="loan-request-data-container hidden">

    </div>

    <div id="loan-request-state-history-container" class="loan-request-state-history-container hidden">

    </div>

    <div class="update-loan-request-state hidden" id="update-loan-request-state">
         <div class="update-loan-request-state-form">
             <div class="update-loan-request-state-header">
                 <p>Update state</p>
                 <img id="close-update-loan-request-state" src="${pageContext.request.contextPath}/resources/imgs/close.png" alt="">
             </div>
             <p>Please choose the new State :</p>
             <select id="update-state-options">
                 <option value="ACCEPTED">Accepted</option>
                 <option value="PENDING">Pending</option>
                 <option value="REJECTED">Rejected</option>
                 <option value="REJECTED_BY_CUSTOMER">Rejected By Customer</option>
             </select>
             <input type="text" placeholder="Explanation :" class="hidden" id="explanation">
             <p id="update-success"></p>
             <div class="submit-update-state hidden" id="submit-update-state-holder">
                 <button id="update-state">Update</button>
             </div>
         </div>
    </div>
    <script>
        window.contextPath = "${pageContext.request.contextPath}";
    </script>
    <script src="${pageContext.request.contextPath}/resources/js/admin.js"></script>
</body>
</html>
