package com.insta.instagram.controller;

import com.insta.instagram.exceptions.CommentException;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Comment;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import com.insta.instagram.service.CommentService;
import com.insta.instagram.service.PostService;
import com.insta.instagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping("/create/{postId}")
    public ResponseEntity<Comment> createCommentHandler(
            @RequestBody Comment comment,
            @PathVariable Integer postId,
            @RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token);
        Comment createdComment = commentService.createComment(comment, postId, user.getId());
        return new ResponseEntity<>(createdComment, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsForPostHandler(@PathVariable Integer postId)
            throws PostException, UserException {
        Post post = postService.findPostById(postId);
        return new ResponseEntity<>(post.getComments(), HttpStatus.OK);
    }

    @PutMapping("/like/{commentId}")
    public ResponseEntity<Comment> likeCommentHandler(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer commentId) throws UserException, CommentException {
        User user = userService.findUserProfile(token);
        Comment comment = commentService.likeComment(commentId, user.getId());
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @PutMapping("/unlike/{commentId}")
    public ResponseEntity<Comment> unLikeCommentHandler(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer commentId) throws UserException, CommentException {
        User user = userService.findUserProfile(token);
        Comment comment = commentService.unLikeComment(commentId, user.getId());
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }
}
