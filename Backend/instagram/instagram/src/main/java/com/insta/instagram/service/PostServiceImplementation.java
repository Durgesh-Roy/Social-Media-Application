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
        List<Post> posts=postRepository.findByUserId(userId);
        if(posts.size()==0){
            throw new UserException("this user does not have any post");
        }

        return posts;
    }

    @Override
    public List<Post> findAllPostsByUserIds(List<Integer> userIds) throws PostException {
        List<Post> allPosts = postRepository.findByUserIdIn(userIds);
        if (allPosts.isEmpty()) {
            throw new PostException("No posts found for the given users.");
        }
        return allPosts;
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
        return null;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post=findPostById(postId);
        User user=userService.findUserById(userId);

        UserDto userDto=new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUserName());

        post.getLikedByUsers().add(userDto);

        return postRepository.save(post);
    }

    @Override
    public Post unLikePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post=findPostById(postId);
        User user=userService.findUserById(userId);

        UserDto userDto=new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUserName());

        post.getLikedByUsers().remove(userDto);

        return postRepository.save(post);
    }

    @Override
    public List<Post> getPostsByUserId(Integer userId) throws UserException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found with ID: " + userId));

        return postRepository.findByUserId(userId);
    }
}
