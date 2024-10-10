package org.youcode.smartbank.loanRequestState;

import jakarta.enterprise.context.ApplicationScoped;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateDaoI;
import org.youcode.smartbank.shared.GenericDao;


@ApplicationScoped
public class LoanRequestStateDao extends GenericDao<LoanRequestState> implements LoanRequestStateDaoI {
   public LoanRequestStateDao(){
       super(LoanRequestState.class);
   }
}
