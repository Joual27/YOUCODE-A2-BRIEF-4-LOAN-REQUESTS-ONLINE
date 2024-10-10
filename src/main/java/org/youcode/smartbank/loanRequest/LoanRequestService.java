package org.youcode.smartbank.loanRequest;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestServiceI;

import java.util.List;


@ApplicationScoped
public class LoanRequestService implements LoanRequestServiceI {

    @Inject
    LoanRequestDaoI loanRequestDao;

    public LoanRequest saveLoanRequest(LoanRequest loanRequest){
        loanRequestDao.save(loanRequest);
        return loanRequest;
    }

    public double calculateToPayPerMonth(double overallAmount , int months){
        double monthlyInterestRate = 5.0 / 12 / 100;
        double monthlyPayment = (overallAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -months));
        return Math.round(monthlyPayment * 100.0) / 100.0;
    }

    public boolean isValidToPayPerMonth(double initialMonthlyPayment, double overallAmount, int months){
        return calculateToPayPerMonth(overallAmount,months) == initialMonthlyPayment;
    }

}
