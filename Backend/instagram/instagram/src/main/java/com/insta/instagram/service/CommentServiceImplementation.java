package com.insta.instagram.service;

import com.insta.instagram.dto.UserDto;
import com.insta.instagram.exceptions.CommentException;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Comment;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.CommentsRepository;
import com.insta.instagram.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class CommentServiceImplementation implements CommentService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException {
        User user=userService.findUserById(userId);

        Post post=postService.findPostById(postId);
        UserDto userDto=new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getName());

        comment.setUser(userDto);
        comment.setCreatedAt(LocalDateTime.now());
        Comment createdComment= commentsRepository.save(comment);
        post.getComments().add(createdComment);
        postRepository.save(post);
        return createdComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws CommentException {
        Optional<Comment>opt=commentsRepository.findById(commentId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new CommentException("comment not exist with id : " + commentId);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException,UserException{
        User user=userService.findUserById(userId);
        Comment comment=findCommentById(commentId);

        UserDto userDto=new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUserName());

        comment.getLikedByUsers().add(userDto);
        return commentsRepository.save(comment);
    }

    @Override
    public Comment unLikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        User user=userService.findUserById(userId);
        Comment comment=findCommentById(commentId);

        UserDto userDto=new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUserName());

        comment.getLikedByUsers().remove(userDto);
        return commentsRepository.save(comment);
    }
}
