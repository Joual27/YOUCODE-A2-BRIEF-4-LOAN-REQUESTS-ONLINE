package org.youcode.smartbank.loanRequestState;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.loanRequestState.interfaces.LoanRequestStateDaoI;
import org.youcode.smartbank.shared.GenericDao;
import org.youcode.smartbank.utils.EntityManagerContext;

import java.util.List;


@ApplicationScoped
public class LoanRequestStateDao extends GenericDao<LoanRequestState> implements LoanRequestStateDaoI {
   public LoanRequestStateDao(){
       super(LoanRequestState.class);
   }

   @Override
    public List<LoanRequestState> findByLoanRequest(LoanRequest loanRequest){
        EntityManager em = EntityManagerContext.getEntityManager();
        TypedQuery<LoanRequestState> query = em.createQuery(
                "SELECT lrs FROM LoanRequestState lrs WHERE lrs.loanRequest = :loanRequest",
                LoanRequestState.class
        );
        query.setParameter("loanRequest", loanRequest);
        return query.getResultList();
    }
    
}
