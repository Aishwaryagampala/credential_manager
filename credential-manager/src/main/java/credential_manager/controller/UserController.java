package credential_manager.controller;

import credential_manager.model.User;
import credential_manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Connects directly to your React Vite server!
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ==========================================
    // 1. USER REGISTRATION
    // ==========================================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Ensure User ID uniqueness
        if (userRepository.existsById(user.getUserId())) {
            response.put("error", "User ID already exists! It must be unique.");
            return ResponseEntity.badRequest().body(response);
        }

        // Strict Password Regex: 8-12 characters, alphanumeric, min 1 uppercase, min 1 special char
        String passwordPattern = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\",.<>/?])(?=.*[0-9])(?=.*[a-z]).{8,12}$";
        
        if (user.getPassword() == null || !user.getPassword().matches(passwordPattern)) {
            response.put("error", "Password must be 8-12 characters, alphanumeric, with at least 1 uppercase letter and 1 special character.");
            return ResponseEntity.badRequest().body(response);
        }

        // Set password change date to current system date upon signup
        user.setPasswordChangeDate(LocalDate.now());

        userRepository.save(user);
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    // ==========================================
    // 2. USER LOGIN WITH EXPIRY CHECK
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String password = credentials.get("password");
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            response.put("message", "Login successful!");
            response.put("username", user.getUsername());

            // Check if password age is > 1 month (30 days)
            long monthsBetween = ChronoUnit.MONTHS.between(user.getPasswordChangeDate(), LocalDate.now());
            if (monthsBetween >= 1) {
                response.put("alert", "Your Password is Expired. Please Change");
            } else {
                response.put("alert", "none");
            }

            return ResponseEntity.ok(response);
        }

        response.put("error", "Invalid User ID or Password!");
        return ResponseEntity.status(401).body(response);
    }

    // ==========================================
    // 3. FETCH SECURITY QUESTIONS FOR FORGOT PASSWORD
    // ==========================================
    @GetMapping("/forgot-password/questions/{userId}")
    public ResponseEntity<?> getSecurityQuestions(@PathVariable String userId) {
        Map<String, String> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            response.put("question1", user.getQuestion1());
            response.put("question2", user.getQuestion2());
            return ResponseEntity.ok(response);
        }

        response.put("error", "User ID not found!");
        return ResponseEntity.status(404).body(response);
    }

    // ==========================================
    // 4. VERIFY SECURITY ANSWERS AND REVEAL PASSWORD
    // ==========================================
    @PostMapping("/forgot-password/verify")
    public ResponseEntity<?> verifySecurityAnswers(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String answer1 = request.get("answer1");
        String answer2 = request.get("answer2");
        Map<String, String> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check if both answers match exactly what was typed during registration
            if (user.getAnswer1().equalsIgnoreCase(answer1) && user.getAnswer2().equalsIgnoreCase(answer2)) {
                response.put("password", user.getPassword());
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "your inputs are wrong.");
                return ResponseEntity.badRequest().body(response);
            }
        }

        response.put("error", "User ID not found!");
        return ResponseEntity.status(404).body(response);
    }

    // ==========================================
    // 5. CHANGE PASSWORD
    // ==========================================
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");
        Map<String, String> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findById(userId);

        if (!userOpt.isPresent()) {
            response.put("error", "User ID not found!");
            return ResponseEntity.status(404).body(response);
        }

        User user = userOpt.get();

        // Verify old password
        if (!user.getPassword().equals(oldPassword)) {
            response.put("error", "Old password is incorrect!");
            return ResponseEntity.badRequest().body(response);
        }

        // Verify new password and confirm password match exactly
        if (!newPassword.equals(confirmPassword)) {
            response.put("error", "The data entered in New Password and Confirm Password should be same.");
            return ResponseEntity.badRequest().body(response);
        }

        // Validate new password complexity rules
        String passwordPattern = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\",.<>/?])(?=.*[0-9])(?=.*[a-z]).{8,12}$";
        if (!newPassword.matches(passwordPattern)) {
            response.put("error", "New password does not meet complexity requirements.");
            return ResponseEntity.badRequest().body(response);
        }

        // Update password and reset change timestamp to today
        user.setPassword(newPassword);
        user.setPasswordChangeDate(LocalDate.now());
        userRepository.save(user);

        response.put("message", "Password changed successfully!");
        return ResponseEntity.ok(response);
    }
}
