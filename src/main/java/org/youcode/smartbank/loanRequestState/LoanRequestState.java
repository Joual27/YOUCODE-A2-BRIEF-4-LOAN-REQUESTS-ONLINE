package org.youcode.smartbank.loanRequestState;

import jakarta.persistence.*;
import org.youcode.smartbank.loanRequest.LoanRequest;
import org.youcode.smartbank.shared.BaseEntity;
import org.youcode.smartbank.state.State;
import java.time.LocalDateTime;


@Entity
public class LoanRequestState extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "LOAN_REQUEST_ID")
    private LoanRequest loanRequest;

    @ManyToOne
    @JoinColumn(name = "STATE_ID")
    private State state;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "EXPLANATION")
    private String explanation;

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public LoanRequest getLoanRequest() {
        return loanRequest;
    }

    public void setLoanRequest(LoanRequest loanRequest) {
        this.loanRequest = loanRequest;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
}
