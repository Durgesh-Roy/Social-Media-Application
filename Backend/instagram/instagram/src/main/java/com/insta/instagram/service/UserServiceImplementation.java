package com.insta.instagram.service;

import com.insta.instagram.dto.UserDto;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.UserRepository;
import com.insta.instagram.security.JwtTokenClaims;
import com.insta.instagram.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Override
    public User registerUser(User user) throws UserException {
        if (user.getEmail() == null || user.getPassword() == null || user.getUserName() == null || user.getName() == null) {
            throw new UserException("All fields are mandatory");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserException("Email already exists");
        }

        if (userRepository.findByUserName(user.getUserName()).isPresent()) {
            throw new UserException("Username is already taken");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUserName(user.getUserName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());

        return userRepository.save(newUser);
    }

    @Override
    public User findUserById(Integer userId) throws UserException {
        return userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new UserException("User not found with id: " + userId));
    }

    @Override
    public User findUserProfile(String token) throws UserException {
        token=token.substring(7);
        JwtTokenClaims jwtTokenClaims= jwtTokenProvider.getClaimsFromToken(token);
        String email=jwtTokenClaims.getUsername();
        Optional<User>opt=userRepository.findByEmail(email);

        if(opt.isPresent()){
            return opt.get();
        }
        throw new UserException("Invalid token..");
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new UserException("User not found with username: " + username));
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        User reqUser = findUserById(reqUserId);
        User followUser = findUserById(followUserId);

//        UserDto follower = mapToDto(reqUser);
//        UserDto following = mapToDto(followUser);

        reqUser.getFollowing().add(followUserId);
        followUser.getFollower().add(reqUserId);
        userRepository.save(followUser);
        userRepository.save(reqUser);

        return "You are following " + followUser.getUserName();
    }

    @Override
    public String unFollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException {
        User reqUser = findUserById(reqUserId);
        User followUser = findUserById(unfollowUserId);

//        UserDto follower = mapToDto(reqUser);
//        UserDto following = mapToDto(followUser);

        reqUser.getFollowing().remove(unfollowUserId);
        followUser.getFollower().remove(reqUserId);

        userRepository.save(followUser);
        userRepository.save(reqUser);

        return "You have unfollowed " + followUser.getUserName();
    }

    @Override
    public List<User> findUserByIds(List<Integer> userIds) throws UserException {
        return userRepository.findAllUserByIds(userIds);
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        List<User> users = userRepository.findByQuery(query);
        if (users.isEmpty()) {
            throw new UserException("No users found matching the query.");
        }
        return users;
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
        if (!updatedUser.getId().equals(existingUser.getId())) {
            throw new UserException("You can only update your own profile");
        }
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getBio() != null) existingUser.setBio(updatedUser.getBio());
        if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
        if (updatedUser.getUserName() != null) existingUser.setUserName(updatedUser.getUserName());
        if (updatedUser.getMobile() != null) existingUser.setMobile(updatedUser.getMobile());
        if (updatedUser.getGender() != null) existingUser.setGender(updatedUser.getGender());
        if (updatedUser.getWebsite() != null) existingUser.setWebsite(updatedUser.getWebsite());
        if (updatedUser.getImage() != null) existingUser.setImage(updatedUser.getImage());

        return userRepository.save(existingUser);
    }

    // Reusable mapper
    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setUsername(user.getUserName());
        dto.setUserImage(user.getImage());
        return dto;
    }
}
