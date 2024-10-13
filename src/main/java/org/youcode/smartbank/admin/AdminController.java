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
import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@WebServlet(name = "adminServlet" , urlPatterns = {
        "/admin/dashboard",
        "/loan/request/filter/by/state",
        "/loan/request/filter/by/date",
        "/loan/request/update/state"
})
public class AdminController extends HttpServlet {

    @Inject
    LoanRequestServiceI loanRequestService;

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException , IOException{
        String path = req.getServletPath();
        if (path.equals("/admin/dashboard")){
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
    }

    @Override
    public void doPost(HttpServletRequest req , HttpServletResponse res ) throws ServletException, IOException{
        String path = req.getServletPath();
        switch (path){
            case "/loan/request/filter/by/state":
                handleFilteringByState(req , res);
                break;
            case "/loan/request/filter/by/date":
                handleFilteringByDate(req, res);
                break;

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

    private void handleFilteringByState(HttpServletRequest req , HttpServletResponse res) throws ServletException , IOException{
        res.setContentType("application/json");
        PrintWriter out = res.getWriter();
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Map<String, String> body = objectMapper.readValue(req.getInputStream(), Map.class);
            String state = body.get("state");
            List<LoanRequest> filteredLoanRequests = loanRequestService.getLoanRequestsByState(state);
            List<LoanRequest> filteredLoanRequestsWithStates = loanRequestService.appendStatesOfLoanRequests(filteredLoanRequests);
            String filteredLoanRequestsWithStatesAsJson = objectMapper.writeValueAsString(filteredLoanRequestsWithStates);
            out.write(filteredLoanRequestsWithStatesAsJson);
        }
        catch (Exception e){
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write(e.getMessage());
        }
        finally {
            out.flush();
            out.close();
        }
    }
    private void handleFilteringByDate(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("application/json");
        PrintWriter out = res.getWriter();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            Map<String, String> body = objectMapper.readValue(req.getInputStream(), Map.class);
            LocalDate date = LocalDate.parse(body.get("date"));
            List<LoanRequest> filteredLoanRequests = loanRequestService.getLoanRequestsByDate(date);
            List<LoanRequest> loanRequestsWithStates = loanRequestService.appendStatesOfLoanRequests(filteredLoanRequests);
            String loanRequestsWithStatesAsJson = objectMapper.writeValueAsString(loanRequestsWithStates);
            out.write(loanRequestsWithStatesAsJson);
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write(e.getMessage());
        } finally {
            out.flush();
            out.close();
        }
    }

}
