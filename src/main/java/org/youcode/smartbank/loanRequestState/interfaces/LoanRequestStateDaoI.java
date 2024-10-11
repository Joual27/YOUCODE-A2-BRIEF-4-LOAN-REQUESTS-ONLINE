package org.youcode.smartbank.loanRequestState.interfaces;

import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.loanRequestState.LoanRequestState;
import org.youcode.smartbank.shared.interfaces.GenericDaoI;

import java.util.List;

public interface LoanRequestStateDaoI extends GenericDaoI<LoanRequestState>{
    List<LoanRequestState> findByLoanRequest(LoanRequest loanRequest);
}
