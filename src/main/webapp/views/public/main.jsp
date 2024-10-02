
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Smart Bank Loan Simulator</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main.css">
</head>
<body>
    <main>
        <div class="page-title">
            <h2>Request A Loan Online</h2>
        </div>
        <div class="wrapper">
            <div class="loan-process">
                <div class="steps">
                    <div class="step active-step">
                        <h1>1</h1>
                        <h4>Do a Simulation</h4>
                    </div>
                    <div class="step">
                        <h1>2</h1>
                        <h4>My Credentials</h4>
                    </div>
                    <div class="step">
                        <h1>3</h1>
                        <h4>My Personal Infos</h4>
                    </div>
                </div>
                <div class="forms">
                    <form class="first-step">
                        <div class="form-element">
                            <label>My Project</label>
                            <select>
                                <option value="">I need money</option>
                                <option value="">I am financing my used vehicle</option>
                                <option value="">I am managing my unforeseen expenses</option>
                                <option value="">I am financing my new vehicle</option>
                                <option value="">I am equipping my home</option>
                            </select>
                        </div>
                        <div class="form-element">
                            <label>I am a :</label>
                            <select>
                                <option value="">Private sector employee</option>
                                <option value="">Civil servant</option>
                                <option value="">Merchant</option>
                                <option value="">Artisan</option>
                                <option value="">Liberal Profession</option>
                                <option value="">Retiree</option>
                                <option value="">None of the above</option>
                            </select>
                        </div>
                        <div class="form-element">
                            <label>Amount (IN DH)</label>
                            <input id="loan_amount_holder" type="text" value="5000" readonly class="result-handler">
                            <input id="loan_amount" type="range" value="5000" min="5000" max="600000">
                        </div>

                        <div class="form-element">
                            <label>Duration (IN MONTHS)</label>
                            <input id="loan_duration_holder" type="text" value="12" readonly class="result-handler" id="duration-result-handler">
                            <input id="loan_duration" type="range" value="12" min="12" max="120">
                        </div>

                        <div class="form-element">
                            <label>To Pay Per Month : (IN DH)</label>
                            <input id="to_pay_per_month_holder" type="text" value="70.91" readonly class="result-handler">
                            <input id="to_pay_per_month" type="range" value="70.91" min="70.91" max="52384.67" >
                        </div>

                        <div class="btn-container">
                            <button class="submit-btn">Continue <span>(no engagements)</span></button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="estimate">
                <div class="estimate-title">
                    <h2>Summary</h2>
                </div>
                <table class="estimate-table">
                    <tr class="estimate-section-title">
                        <td colspan="2">My project</td>
                    </tr>

                    <tr style="border-bottom: none !important">
                        <td colspan="2" class="project-type" ><strong> Personnal Loan </strong></td>
                    </tr>
                    <tr class="estimate-section-title">
                        <td colspan="2">My Loan Details</td>
                    </tr>
                    <tr>
                        <td class="estimate-keys">You are :</td>
                        <td class="estimate-values"><strong>Fonctionnaire</strong></td>
                    </tr>
                    <tr>
                        <td class="estimate-keys">Amount :</td>
                        <td class="estimate-values"><strong>10 000 DH</strong></td>
                    </tr>
                    <tr>
                        <td class="estimate-keys">Duration :</td>
                        <td class="estimate-values"><strong>24 mois</strong></td>
                    </tr>
                    <tr>
                        <td class="estimate-keys">To Pay Per Month:</td>
                        <td class="estimate-values"><strong>469,40 DH</strong></td>
                    </tr>
                    <tr id="no-border">
                        <td class="estimate-keys">Taxes:</td>
                        <td class="estimate-values"><strong>271,50 DH</strong></td>
                    </tr>
                    <img src="${pageContext.request.contextPath}/resources/imgs/shape.png" id="shape" alt="">
                </table>
            </div>
        </div>
    </main>

    <script src="${pageContext.request.contextPath}/resources/js/calculations.js"></script>

</body>
</html>
