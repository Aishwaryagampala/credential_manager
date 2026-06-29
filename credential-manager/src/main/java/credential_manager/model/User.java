package credential_manager.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_registration")
public class User {

    @Id
    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "question1", nullable = false, length = 255)
    private String question1;

    @Column(name = "answer1", nullable = false, length = 255)
    private String answer1;

    @Column(name = "question2", nullable = false, length = 255)
    private String question2;

    @Column(name = "answer2", nullable = false, length = 255)
    private String answer2;

    @Column(name = "password_change_date", nullable = false)
    private LocalDate passwordChangeDate;

    // Default Constructor
    public User() {}

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getQuestion1() { return question1; }
    public void setQuestion1(String question1) { this.question1 = question1; }

    public String getAnswer1() { return answer1; }
    public void setAnswer1(String answer1) { this.answer1 = answer1; }

    public String getQuestion2() { return question2; }
    public void setQuestion2(String question2) { this.question2 = question2; }

    public String getAnswer2() { return answer2; }
    public void setAnswer2(String answer2) { this.answer2 = answer2; }

    public LocalDate getPasswordChangeDate() { return passwordChangeDate; }
    public void setPasswordChangeDate(LocalDate passwordChangeDate) { this.passwordChangeDate = passwordChangeDate; }
}