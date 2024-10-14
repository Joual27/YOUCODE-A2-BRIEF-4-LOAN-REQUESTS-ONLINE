package org.youcode.smartbank.state;

import jakarta.enterprise.context.ApplicationScoped;
import org.youcode.smartbank.state.interfaces.StateServiceI;

@ApplicationScoped
public class StateService implements StateServiceI {
    public State getStateByName(String state){
        State s = new State();
        switch (state){
            case "PENDING":
                s.setState("PENDING");
                s.setId(1L);
                break;
            case "ACCEPTED":
                s.setState("ACCEPTED");
                s.setId(2L);
                break;

            case "REJECTED":
                s.setState("REJECTED");
                s.setId(3L);
                break;

            case "REJECTED_BY_CUSTOMER":
                s.setState("REJECTED_BY_CUSTOMER");
                s.setId(4L);
                break;
        }
        return s;
    }

}
