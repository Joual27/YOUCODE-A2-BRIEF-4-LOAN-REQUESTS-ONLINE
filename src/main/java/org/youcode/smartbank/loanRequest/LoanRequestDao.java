package org.youcode.smartbank.loanRequest;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.youcode.smartbank.loanRequest.interfaces.LoanRequestDaoI;
import org.youcode.smartbank.shared.GenericDao;
import org.youcode.smartbank.utils.EntityManagerContext;

import java.time.LocalDate;

import java.util.List;

@ApplicationScoped
public class LoanRequestDao extends GenericDao<LoanRequest> implements LoanRequestDaoI {
    public LoanRequestDao(){
        super(LoanRequest.class);
    }

    @Override
    public List<LoanRequest> findLoanRequestsByState(String state) {
        EntityManager em = EntityManagerContext.getEntityManager();
        String query = "SELECT lr FROM LoanRequest lr " +
                "JOIN lr.requestStates lrs " +
                "WHERE lrs.createdAt = (SELECT MAX(lrsSub.createdAt) " +
                "                        FROM LoanRequestState lrsSub " +
                "                        WHERE lrsSub.loanRequest.id = lr.id) " +
                "AND lrs.state.state = :state";

        TypedQuery<LoanRequest> typedQuery = em.createQuery(query, LoanRequest.class);
        typedQuery.setParameter("state", state);
        return typedQuery.getResultList();
    }

    @Override
    public List<LoanRequest> findLoanRequestsByDate(LocalDate date) {
        EntityManager em = EntityManagerContext.getEntityManager();

        String query = "SELECT lr FROM LoanRequest lr WHERE lr.createdAt = :date";
        TypedQuery<LoanRequest> typedQuery = em.createQuery(query, LoanRequest.class);
        typedQuery.setParameter("date", date);

        return typedQuery.getResultList();
    }

}
