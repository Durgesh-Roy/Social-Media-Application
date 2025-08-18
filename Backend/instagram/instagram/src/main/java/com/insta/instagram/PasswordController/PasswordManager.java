package com.insta.instagram.PasswordController;

import com.insta.instagram.modal.User;
import com.insta.instagram.repository.UserRepository;
import com.insta.instagram.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class PasswordManager {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private EmailService emailService;

        @Autowired
        private PasswordEncoder passwordEncoder;

        // Step 1: Forgot Password Endpoint
        @PostMapping("/forgot-password")
        public ResponseEntity<String> forgotPassword(@RequestParam String email) {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            User user = optionalUser.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setTokenExpiration(LocalDateTime.now().plusMinutes(30));
            userRepository.save(user);

            String resetLink = "http://localhost:8080/auth/reset-password-form?token=" + token;
            emailService.sendEmail(user.getEmail(), "Reset Password",
                    "Click the link to reset your password: " + resetLink);

            return ResponseEntity.ok("Reset password email sent!");
        }

        // Step 2: Reset Password Endpoint
        @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
            Optional<User> optionalUser = userRepository.findByResetToken(token);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
            }

            User user = optionalUser.get();
            if (user.getTokenExpiration().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token expired");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setTokenExpiration(null);
            userRepository.save(user);

            return ResponseEntity.ok("Password reset successful!");
        }


}
