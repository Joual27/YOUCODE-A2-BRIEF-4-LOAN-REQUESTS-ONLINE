package org.youcode.smartbank.loanRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestServiceI;
import org.youcode.smartbank.loanRequestState.LoanRequestState;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateServiceI;
import org.youcode.smartbank.state.State;
import org.youcode.smartbank.utils.HibernateUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.cert.CRLException;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@WebServlet(name = "loanSimulation" , urlPatterns = {"/loan/request/create"})
public class LoanRequestController extends HttpServlet {

    @Inject
    LoanRequestServiceI loanRequestService;

    @Inject
    LoanRequestStateServiceI loanRequestStateService;
    @Override
    public void doGet(HttpServletRequest req  , HttpServletResponse res) throws ServletException , IOException {
        HibernateUtil.getInstance();
        req.getRequestDispatcher("/views/public/main.jsp").include(req , res);
    }


    @Override
    public void doPost(HttpServletRequest req , HttpServletResponse res) throws ServletException , IOException {
        res.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.registerModule(new JavaTimeModule());
        PrintWriter out = res.getWriter();
        try{
            LoanRequest loanRequestToCreate = objectMapper.readValue(req.getInputStream() , LoanRequest.class);
            if (!loanRequestService.isValidToPayPerMonth(loanRequestToCreate.getToPayPerMonth(),loanRequestToCreate.getAmount() , loanRequestToCreate.getDurationInMonths())){
                loanRequestToCreate.setToPayPerMonth(loanRequestService.calculateToPayPerMonth(loanRequestToCreate.getAmount() , loanRequestToCreate.getDurationInMonths()));
            }
            LoanRequest createdLoanRequest = loanRequestService.saveLoanRequest(loanRequestToCreate);
            State s = new State();
            s.setState("PENDING");
            s.setId(1L);
            LoanRequestState loanRequestStateToCreate = new LoanRequestState();
            loanRequestStateToCreate.setState(s);
            loanRequestStateToCreate.setLoanRequest(createdLoanRequest);
            loanRequestStateToCreate.setCreatedAt(LocalDateTime.now());

            Set<LoanRequestState> loanRequestStates = new LinkedHashSet<>();
            loanRequestStates.add(loanRequestStateToCreate);
            loanRequestToCreate.setRequestStates(loanRequestStates);
            LoanRequestState createdLoanRequestState = loanRequestStateService.save(loanRequestStateToCreate);
            res.setStatus(HttpServletResponse.SC_OK);
            String responseAsJson = objectMapper.writeValueAsString(createdLoanRequest);
            out.write(responseAsJson);
        } catch (Exception e){
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write("{\"message\":\"" + e.getMessage() +"\"}");
        } finally {
            out.flush();
            out.close();
        }
    }
}
