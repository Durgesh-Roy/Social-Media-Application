package com.insta.instagram.controller;

import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import com.insta.instagram.response.MessageResponse;
import com.insta.instagram.service.PostService;
import com.insta.instagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {
    @Autowired
    PostService postService;
    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Post>createPostHandler(@RequestBody Post post,
                                                 @RequestHeader("Authorization") String token) throws UserException {
        User user=userService.findUserProfile(token);
        Post createdPost=postService.createPost(post,user.getId());
        return new ResponseEntity<>(createdPost, HttpStatus.OK);
    }
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Post>>findPostByUserIdHandler(@PathVariable Integer userId) throws PostException, UserException {

        List<Post>posts=postService.findPostsByUserId(userId);
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }
    @GetMapping("/all/{userIds}")
    public ResponseEntity<List<Post>>findAllPostsByUserIdsHandler(@PathVariable List<Integer> userIds) throws PostException, UserException {

        List<Post>posts=postService.findAllPostsByUserIds(userIds);
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post>findPostByIdHandler(@PathVariable Integer postId) throws PostException, UserException {
        Post post=postService.findPostById(postId);
        return new ResponseEntity<>(post,HttpStatus.OK);
    }
    @PutMapping("/like/{postId}")
    public ResponseEntity<Post>likePostHandler(@PathVariable Integer postId,
            @RequestHeader("Authorization") String token)
            throws UserException, PostException {

        User user=userService.findUserProfile(token);
        Post likedpost=postService.likePost(postId,user.getId());
        return new ResponseEntity<Post>(likedpost,HttpStatus.OK);
    }
    @PutMapping("/unlike/{postId}")
    public ResponseEntity<Post>unLikePostHandler(@PathVariable Integer postId
            ,@RequestHeader("Authorization")String token)
            throws UserException, PostException {

        User user=userService.findUserProfile(token);
        Post likedpost=postService.unLikePost(postId,user.getId());
        return new ResponseEntity<Post>(likedpost,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<MessageResponse>deletePostHandler
            (@PathVariable Integer postId
                    ,@RequestHeader("Authorization")String token) throws UserException, PostException {

        User user=userService.findUserProfile(token);
        String message=postService.deletePost(postId,user.getId());
        MessageResponse res=new MessageResponse(message);
        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }
    @PutMapping("/save_post/{postId}")
    public ResponseEntity<MessageResponse>savePostHandler(@PathVariable Integer postId
            ,@RequestHeader("Authorization") String token)
            throws UserException, PostException {
        User user=userService.findUserProfile(token);
        String message=postService.savePost(postId,user.getId());
        MessageResponse res=new MessageResponse(message);
        return new ResponseEntity<MessageResponse>(res,HttpStatus.ACCEPTED);
    }

    @PutMapping("/unSave_post/{postId}")
    public ResponseEntity<MessageResponse>unSavePostHandler(@PathVariable Integer postId
            ,@RequestHeader("Authorization") String token)
            throws UserException, PostException {
        User user=userService.findUserProfile(token);
        String message=postService.unSavePost(postId,user.getId());
        MessageResponse res=new MessageResponse(message);
        return new ResponseEntity<MessageResponse>(res,HttpStatus.ACCEPTED);
    }
    @GetMapping("savedPost")
    public ResponseEntity<List<Post>>savedPost(@RequestHeader("Authorization") String token) throws UserException {
        User user=userService.findUserProfile(token);
        List<Post> posts=user.getSavedPost();
        return new ResponseEntity<>(posts,HttpStatus.OK);
    }
}
