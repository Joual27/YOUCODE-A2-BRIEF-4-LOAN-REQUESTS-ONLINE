package org.youcode.smartbank.loanRequest;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestServiceI;
import org.youcode.smartbank.loanRequestState.LoanRequestState;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateServiceI;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@ApplicationScoped
public class LoanRequestService implements LoanRequestServiceI {

    @Inject
    LoanRequestDaoI loanRequestDao;
    @Inject
    LoanRequestStateServiceI loanRequestStateService;

    public LoanRequest saveLoanRequest(LoanRequest loanRequest){
        loanRequestDao.save(loanRequest);
        return loanRequest;
    }

    @Override
    public List<LoanRequest> getAllLoanRequests(){
        return loanRequestDao.findAll();
    }

    @Override
    public double calculateToPayPerMonth(double overallAmount , int months){
        double monthlyInterestRate = 5.0 / 12 / 100;
        double monthlyPayment = (overallAmount * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -months));
        return Math.round(monthlyPayment * 100.0) / 100.0;
    }

    @Override
    public boolean isValidToPayPerMonth(double initialMonthlyPayment, double overallAmount, int months){
        return calculateToPayPerMonth(overallAmount,months) == initialMonthlyPayment;
    }

    @Override
    public List<LoanRequest> appendStatesOfLoanRequests(List<LoanRequest> loanRequests){
       return loanRequests.stream()
                .map(loanRequest -> {
                    List<LoanRequestState> states = loanRequestStateService.getStatesOfLoanRequest(loanRequest);
                    Set<LoanRequestState> statesOfLoanRequest = states.stream()
                            .sorted(Comparator.comparing(LoanRequestState::getCreatedAt).reversed())
                            .collect(Collectors.toCollection(LinkedHashSet::new));
                    loanRequest.setRequestStates(statesOfLoanRequest);
                    return loanRequest;
                }).collect(Collectors.toList());
    }

}
