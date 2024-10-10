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

    <script src="${pageContext.request.contextPath}/resources/js/admin.js"></script>
</body>
</html>
