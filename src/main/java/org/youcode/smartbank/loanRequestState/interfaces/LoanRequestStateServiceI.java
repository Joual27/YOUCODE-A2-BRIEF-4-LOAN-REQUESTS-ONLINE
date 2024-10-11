package org.youcode.smartbank.loanRequestState.interfaces;

import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.loanRequestState.LoanRequestState;

import java.util.List;

public interface LoanRequestStateServiceI {
    LoanRequestState save(LoanRequestState loanRequestState);
    List<LoanRequestState> getStatesOfLoanRequest(LoanRequest loanRequest);
}
