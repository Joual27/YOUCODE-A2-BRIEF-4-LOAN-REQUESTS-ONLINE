package org.youcode.smartbank.loanRequest.interfaces;

import org.youcode.smartbank.loanRequest.LoanRequest;

import java.time.LocalDate;
import java.util.List;

public interface LoanRequestServiceI {
    List<LoanRequest> getAllLoanRequests();
    LoanRequest saveLoanRequest(LoanRequest loanRequest);

    boolean isValidToPayPerMonth(double initialMonthlyPayment, double overallAmount, int months);
    double calculateToPayPerMonth(double overallAmount , int months);

    List<LoanRequest> appendStatesOfLoanRequests(List<LoanRequest> loanRequests);
    List<LoanRequest> getLoanRequestsByState(String state);

    List<LoanRequest> getLoanRequestsByDate(LocalDate date);
}
