package com.insta.instagram.repository;

import com.insta.instagram.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    // Corrected method name to match the entity field exactly (assumes `userName` exists in User entity)
    Optional<User> findByUserName(String userName);

    @Query("SELECT u FROM User u WHERE u.id IN :users")
    List<User> findAllUserByIds(@Param("users") List<Integer> users);
    // Corrected JPQL syntax: spacing, LIKE operator, and named parameters
    @Query("SELECT DISTINCT u FROM User u WHERE u.userName LIKE %:query% OR u.email LIKE %:query%")
    List<User> findByQuery(@Param("query") String query);

    // Optional method for custom ID type (already inherited from JpaRepository)
    Optional<User> findById(Long userId); // Changed Integer → Long to match JpaRepository<User, Long>

    Optional<User> findByResetToken(String token);

}
