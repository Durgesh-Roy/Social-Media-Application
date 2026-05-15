package com.insta.instagram.controller;

import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.UserRepository;
import com.insta.instagram.response.MessageResponse;
import com.insta.instagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/id/{id}")
    public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id) throws UserException {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> findUserByUsernameHandler(@PathVariable String username) throws UserException {
        User user = userService.findUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/follow/{followUserId}")
    public ResponseEntity<MessageResponse> followUserHandler(
            @PathVariable Integer followUserId,
            @RequestHeader("Authorization") String token) throws UserException {
        User reqUser = userService.findUserProfile(token);
        String message = userService.followUser(reqUser.getId(), followUserId);
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }

    @PutMapping("/unfollow/{userId}")
    public ResponseEntity<MessageResponse> unFollowUserHandler(
            @PathVariable Integer userId,
            @RequestHeader("Authorization") String token) throws UserException {
        User reqUser = userService.findUserProfile(token);
        String message = userService.unFollowUser(reqUser.getId(), userId);
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }

    @GetMapping("/req")
    public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/m/{userIds}")
    public ResponseEntity<List<User>> findUserByUserIdsHandler(@PathVariable List<Integer> userIds) throws UserException {
        List<User> users = userService.findUserByIds(userIds);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUserHandler(@RequestParam("q") String query) {
        try {
            List<User> users = userService.searchUser(query);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (UserException e) {
            return new ResponseEntity<>(List.of(), HttpStatus.OK);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> findAllUsersHandler(@RequestHeader("Authorization") String token) throws UserException {
        User reqUser = userService.findUserProfile(token);
        List<User> users = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(reqUser.getId()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUserHandler(
            @RequestHeader("Authorization") String token,
            @RequestBody User user) throws UserException {
        User existing = userService.findUserProfile(token);
        user.setId(existing.getId());
        User updated = userService.updateUserDetails(user, existing);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
