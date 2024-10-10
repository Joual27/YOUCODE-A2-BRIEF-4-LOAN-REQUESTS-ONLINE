package org.youcode.smartbank.loanRequest;

import jakarta.enterprise.context.ApplicationScoped;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.shared.GenericDao;

@ApplicationScoped
public class LoanRequestDao extends GenericDao<LoanRequest> implements LoanRequestDaoI {
    public LoanRequestDao(){
        super(LoanRequest.class);
    }
}
