package org.youcode.smartbank.loanRequestState;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateDaoI;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateServiceI;


@ApplicationScoped
public class LoanRequestStateService implements LoanRequestStateServiceI {

    @Inject
    LoanRequestStateDaoI loanRequestStateDao;

    public LoanRequestState save(LoanRequestState loanRequestState){
        loanRequestStateDao.save(loanRequestState);
        return loanRequestState;
    }
}
