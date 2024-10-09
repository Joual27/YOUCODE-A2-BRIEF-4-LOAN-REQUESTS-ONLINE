package org.youcode.smartbank.loanRequest.interfaces;

import org.youcode.smartbank.loanRequest.LoanRequest;

import java.util.List;

public interface LoanRequestServiceI {
    List<LoanRequest> getAllLoanRequests();
    LoanRequest saveLoanRequest(LoanRequest loanRequest);
//    LoanRequest updateLoanRequest(LoanRequest loanRequest);
//    LoanRequest deleteLoanRequest()
    boolean isValidToPayPerMonth(LoanRequest loanRequest, double overallAmount, int months);
    double calculateToPayPerMonth(double overallAmount , int months);
}
