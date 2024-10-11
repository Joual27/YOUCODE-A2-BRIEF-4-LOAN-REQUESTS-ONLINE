package org.youcode.smartbank.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestServiceI;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@WebServlet("/admin/dashboard")
public class AdminController extends HttpServlet {

    @Inject
    LoanRequestServiceI loanRequestService;

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException , IOException{
        res.setContentType("text/html");

        String action = req.getParameter("action");
        if (action == null || action.isEmpty()){
            req.getRequestDispatcher("/views/admin/main.jsp").forward(req , res);
        }
        else if (action.equals("fetchAllRequests")){
            res.setContentType("application/json");
           handleFetchAllRequests(req,res);
        }
    }

    private void handleFetchAllRequests(HttpServletRequest req , HttpServletResponse res) throws ServletException , IOException{
        PrintWriter out = res.getWriter();
        res.setContentType("application/json");
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            List<LoanRequest> loanRequests = loanRequestService.getAllLoanRequests();
            List<LoanRequest> loanRequestsWithStates = loanRequestService.appendStatesOfLoanRequests(loanRequests);
            String loanRequestsWithStatesAsJson = objectMapper.writeValueAsString(loanRequestsWithStates);
            System.out.println(loanRequestsWithStates);
            out.write(loanRequestsWithStatesAsJson);
        }
        catch (Exception e){
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write(e.getMessage());
        } finally {
            out.flush();
            out.close();
        }
    }

}
