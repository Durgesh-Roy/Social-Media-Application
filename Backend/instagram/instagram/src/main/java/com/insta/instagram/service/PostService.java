package com.insta.instagram.service;

import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface PostService {
    public Post findPostById(Integer postId) throws PostException, UserException;

    Post createPost(Post post, Integer userId) throws UserException;

    Post getPostById(Integer postId) throws PostException;

    List<Post> getAllPosts();

    String deletePost(Integer postId,Integer userId) throws UserException,PostException;

    List<Post> findPostsByUserId(Integer userId) throws PostException,UserException;
    List<Post> findAllPostsByUserIds(List<Integer> userIds) throws PostException,UserException;


    public String savePost(Integer postId,Integer userId) throws PostException,UserException;

    public String unSavePost(Integer postId,Integer userId)throws PostException,UserException;

    public Post likePost(Integer postId, Integer userId) throws UserException,PostException;

    public Post unLikePost(Integer postId,Integer userId) throws UserException,PostException;

    List<Post> getPostsByUserId(Integer userId) throws UserException;
}
