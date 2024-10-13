package org.youcode.smartbank.loanRequest.interfaces;

import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.shared.interfaces.GenericDaoI;

import java.time.LocalDate;
import java.util.List;

public interface LoanRequestDaoI extends GenericDaoI<LoanRequest> {

    List<LoanRequest> findLoanRequestsByState(String state);
    List<LoanRequest> findLoanRequestsByDate(LocalDate date);
}
