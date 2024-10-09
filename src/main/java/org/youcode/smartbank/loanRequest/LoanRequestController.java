package org.youcode.smartbank.loanRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.youcode.smartbank.utils.HibernateUtil;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "loanSimulation" , urlPatterns = {"/loan/request/create"})
public class LoanRequestController extends HttpServlet {

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
            res.setStatus(HttpServletResponse.SC_OK);
            out.write(objectMapper.writeValueAsString(loanRequestToCreate));
        } catch (Exception e){
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.write("{\"message\":\"" + e.getMessage() +"\"}");
        } finally {
            out.flush();
            out.close();
        }
    }
}
