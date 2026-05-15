package com.insta.instagram.config;

import com.insta.instagram.modal.User;
import com.insta.instagram.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * After data.sql runs, walk every user row and re-hash any password that
 * isn't already a bcrypt hash (anything not starting with "$2"). This lets
 * data.sql carry plaintext passwords ("password", "1234567890", etc.) for
 * easy authoring without breaking login.
 *
 * Idempotent: bcrypt-encoded passwords are left untouched.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        for (User user : userRepository.findAll()) {
            String pw = user.getPassword();
            if (pw == null || pw.isEmpty()) continue;
            if (pw.startsWith("$2")) continue; // already bcrypt
            user.setPassword(passwordEncoder.encode(pw));
            userRepository.save(user);
        }
    }
}
