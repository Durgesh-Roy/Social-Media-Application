package com.insta.instagram.service;

import com.insta.instagram.dto.UserDto;
import com.insta.instagram.exceptions.PostException;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.Post;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.PostRepository;
import com.insta.instagram.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    public Post findPostById(Integer postId) throws PostException,UserException {
        Optional<Post> opt = postRepository.findById(postId);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw  new PostException("Post not found with id " + postId);
    }

    @Override
    public Post createPost(Post post, Integer userId) throws UserException {
        User user=userService.findUserById(userId);
        UserDto userDto=new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUserName());

        post.setUser(userDto);

        Post createdPost=postRepository.save(post);
        return createdPost;
    }

    @Override
    public Post getPostById(Integer postId) throws PostException {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostException("Post not found with ID: " + postId));
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public String deletePost(Integer postId,Integer userId) throws PostException, UserException {
        Post post = getPostById(postId);
        User user=userService.findUserById(userId);
        if(post.getUser().getId().equals(user.getId())) {
            postRepository.deleteById(post.getId());
            return "Post Deleted SuccessFully";
        }
        throw new PostException("You can't delete other users post");
    }

    @Override
    public List<Post> findPostsByUserId(Integer userId) throws PostException, UserException {
        return postRepository.findByUserId(userId);
    }

    @Override
    public List<Post> findAllPostsByUserIds(List<Integer> userIds) throws PostException {
        if (userIds == null || userIds.isEmpty()) {
            return java.util.Collections.emptyList();
        }
        return postRepository.findByUserIdIn(userIds);
    }




    @Override
    public String savePost(Integer postId, Integer userId) throws PostException, UserException {
        User user = userService.findUserById(userId);
        Post post = findPostById(postId);
        user.getSavedPost().add(post);
        userRepository.save(user);
        return "saved successfully";
    }
    @Override
    public String unSavePost(Integer postId, Integer userId) throws PostException, UserException {
        User user = userService.findUserById(userId);
        Post post = findPostById(postId);
        user.getSavedPost().removeIf(p -> p.getId().equals(post.getId()));
        userRepository.save(user);
        return "unsaved successfully";
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        // Dedupe by user id, not by full UserDto equality. If this user has
        // already liked the post we leave the set unchanged so the like count
        // never double-counts.
        boolean alreadyLiked = post.getLikedByUsers().stream()
                .anyMatch(u -> u.getId() != null && u.getId().equals(user.getId()));
        if (!alreadyLiked) {
            UserDto userDto = new UserDto();
            userDto.setEmail(user.getEmail());
            userDto.setId(user.getId());
            userDto.setName(user.getName());
            userDto.setUserImage(user.getImage());
            userDto.setUsername(user.getUserName());
            post.getLikedByUsers().add(userDto);
        }

        return postRepository.save(post);
    }

    @Override
    public Post unLikePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        // Remove by user id — stale UserDto fields would otherwise prevent the
        // remove() call from matching the stored entry.
        post.getLikedByUsers().removeIf(u -> u.getId() != null && u.getId().equals(user.getId()));

        return postRepository.save(post);
    }

    @Override
    public List<Post> getPostsByUserId(Integer userId) throws UserException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found with ID: " + userId));

        return postRepository.findByUserId(userId);
    }
}
