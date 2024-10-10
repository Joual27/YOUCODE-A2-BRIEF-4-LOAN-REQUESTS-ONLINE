package org.youcode.smartbank.loanRequestState;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateDaoI;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateServiceI;

import java.util.List;


@ApplicationScoped
public class LoanRequestStateService implements LoanRequestStateServiceI {
    @Inject
    LoanRequestStateDaoI loanRequestStateDao;

    public LoanRequestState save(LoanRequestState loanRequestState){
        loanRequestStateDao.save(loanRequestState);
        return loanRequestState;
    }

    public List<LoanRequestState> getStatesOfLoanRequest(LoanRequest loanRequest){
        return loanRequestStateDao.findByLoanRequest(loanRequest);
    }
}
