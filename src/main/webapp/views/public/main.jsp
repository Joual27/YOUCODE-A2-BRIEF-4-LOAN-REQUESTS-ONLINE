
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
                    <form>
                        <div id="first-phase" class="phase">
                            <div class="form-element">
                                <label>My Project</label>
                                <select id="project">
                                    <option value="personal">I need money</option>
                                    <option value="used_vehicle">I am financing my used vehicle</option>
                                    <option value="personal_expenses">I am managing my unforeseen expenses</option>
                                    <option value="new_vehicle">I am financing my new vehicle</option>
                                    <option value="home_equipment">I am equipping my home</option>
                                </select>
                            </div>
                            <div class="form-element">
                                <label>I am a :</label>
                                <select id="requesterField">
                                    <option value="private_employee">Private sector employee</option>
                                    <option value="civil_servant">Civil servant</option>
                                    <option value="merchant">Merchant</option>
                                    <option value="artisan">Artisan</option>
                                    <option value="liberal_profession">Liberal Profession</option>
                                    <option value="retiree">Retiree</option>
<%--                                    <option value="">None of the above</option>--%>
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
                                <button id="first-phase-submit" class="submit-btn">Continue <span>(no engagements)</span></button>
                            </div>
                        </div>
                        <div id="second-phase" class="phase hiddenPhase">
                            <div class="form-element">
                                <label>Email*</label>
                                <input id="emailInput" class="inputs" type="text">
                            </div>
                            <div class="form-element">
                                <label >Phone Number*</label>
                                <input id="phoneInput" class="inputs" type="text">
                            </div>
                            <div class="btn-container">
                                <button id="second-phase-submit" class="submit-btn">Continue <span>(no engagements)</span></button>
                            </div>
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
                        <td colspan="2" class="project-type" id="projectHolder"><strong> Personnal Loan </strong></td>
                    </tr>
<%--                    <div id="second-phase-data-holder"></div>--%>
<%--                    <div id="first-phase-data-holder">--%>
<%--                 --%>
<%--                    </div>--%>
                    <img src="${pageContext.request.contextPath}/resources/imgs/shape.png" id="shape" alt="">
                </table>
            </div>
        </div>
    </main>

    <script src="${pageContext.request.contextPath}/resources/js/calculations.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/validations.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/phasesHandling.js"></script>

</body>
</html>
