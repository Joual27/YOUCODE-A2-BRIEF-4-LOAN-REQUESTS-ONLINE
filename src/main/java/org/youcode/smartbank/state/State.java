package org.youcode.smartbank.state;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.youcode.smartbank.loanRequestState.LoanRequestState;
import org.youcode.smartbank.shared.BaseEntity;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "state")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class State extends BaseEntity {
    @Column(name = "state")
    private String state;
    
    @OneToMany(mappedBy = "state")
    private Set<LoanRequestState> requestStates;

    public String getState(){
        return state;
    }

    public void setState(String state){
        this.state = state;
    }

    public Set<LoanRequestState> getRequestStates(){
        return requestStates;
    }

    public void setRequestStates(Set<LoanRequestState> requestStates){
        this.requestStates = requestStates;
    }

}
