package org.youcode.smartbank.loanRequest;

import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.shared.GenericDao;

public class LoanRequestDao extends GenericDao<LoanRequest> implements LoanRequestDaoI {
    public LoanRequestDao(){
        super(LoanRequest.class);
    }
}
