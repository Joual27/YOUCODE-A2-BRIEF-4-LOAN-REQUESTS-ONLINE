package org.youcode.smartbank.exceptions;

public class LoanRequestNotFoundException extends RuntimeException{
    public LoanRequestNotFoundException(String message){
        super(message);
    }
}
