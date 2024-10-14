package org.youcode.smartbank.state.interfaces;

import org.youcode.smartbank.state.State;

public interface StateServiceI {
    State getStateByName(String state);
}
