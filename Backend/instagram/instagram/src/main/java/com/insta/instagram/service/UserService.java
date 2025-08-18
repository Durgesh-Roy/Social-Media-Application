package com.insta.instagram.service;

import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {
    public User registerUser(User user) throws UserException;
    public User findUserById(Integer userId) throws UserException;
    public User findUserProfile(String token) throws UserException;
    public User findUserByUsername(String username)throws UserException;
    public String followUser(Integer regUserId, Integer followUserId) throws UserException;
    public String unFollowUser(Integer regUserId, Integer followUserId) throws UserException;
    public List<User> findUserByIds(List<Integer>userIds)throws UserException;
    public List<User> searchUser(String query) throws UserException;
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException;
}
