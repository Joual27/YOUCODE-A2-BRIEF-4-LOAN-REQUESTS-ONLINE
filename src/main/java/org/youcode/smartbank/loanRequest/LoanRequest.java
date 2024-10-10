package org.youcode.smartbank.loanRequest;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.youcode.smartbank.loanRequestState.LoanRequestState;
import org.youcode.smartbank.shared.BaseEntity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "LOAN_REQUEST")
public class LoanRequest extends BaseEntity {
    @Column(name = "PROJECT")
    private String project;

    @Column(name = "CURRENT_POSITION")
    private String currentPosition;

    @Column(name = "AMOUNT")
    private double amount;

    @Column(name = "DURATION_IN_MONTHS")
    private int durationInMonths ;

    @Column(name = "TO_PAY_PER_MONTH")
    private double toPayPerMonth;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;


    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name="FAMILY_NAME")
    private String familyName;

    @Column(name="ID_CARD_NUMBER")
    private String idCardNumber;

    @Column(name = "BIRTHDAY")
    private LocalDate birthday;

    @Column(name = "DATE_OF_WORK")
    private LocalDate dateOfWork;

    @Column(name = "SALARY_PER_MONTH")
    private  double salaryPerMonth;

    @Column(name = "TAX")
    private double tax;

    @Column(name = "PRONOUN")
    private String pronoun;

    @JsonManagedReference
    @OneToMany(mappedBy = "loanRequest")
    private Set<LoanRequestState> requestStates;


    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getDurationInMonths() {
        return durationInMonths;
    }

    public void setDurationInMonths(int durationInMonths) {
        this.durationInMonths = durationInMonths;
    }

    public double getToPayPerMonth() {
        return toPayPerMonth;
    }

    public void setToPayPerMonth(double toPayPerMonth) {
        this.toPayPerMonth = toPayPerMonth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public LocalDate getDateOfWork() {
        return dateOfWork;
    }

    public void setDateOfWork(LocalDate dateOfWork) {
        this.dateOfWork = dateOfWork;
    }

    public double getSalaryPerMonth() {
        return salaryPerMonth;
    }

    public void setSalaryPerMonth(double salaryPerMonth) {
        this.salaryPerMonth = salaryPerMonth;
    }

    public double getTax(){
        return tax;
    }

    public void setTax(double tax){
        this.tax = tax;
    }

    public String getPronoun(){
        return pronoun;
    }

    public void setPronoun(String pronoun){
        this.pronoun = pronoun;
    }

    public Set<LoanRequestState> getRequestStates() {
        return requestStates;
    }

    public void setRequestStates(Set<LoanRequestState> requestStates) {
        this.requestStates = requestStates;
    }
}
