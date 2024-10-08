package org.youcode.smartbank.loanRequest;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.youcode.smartbank.utils.HibernateUtil;

import java.io.IOException;

@WebServlet(name = "loanSimulation" , urlPatterns = "/requests/loan")
public class LoanRequestController extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req  , HttpServletResponse res) throws ServletException , IOException {
        HibernateUtil.getInstance();
        req.getRequestDispatcher("/views/public/main.jsp").include(req , res);
    }
}
