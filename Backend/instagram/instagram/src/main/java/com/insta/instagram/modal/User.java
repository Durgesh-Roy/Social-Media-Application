package com.insta.instagram.modal;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String userName;
    private String name;
    private String email;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;
    private String password;
    @ElementCollection
    private Set<Integer> follower= new HashSet<>();
    @ElementCollection
    private Set<Integer> following = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Story>stories=new ArrayList<>();
    @ManyToMany
    private List<Post>savedPost=new ArrayList<>();
    @Column(name = "reset_token")
    private String resetToken;

    public User(Integer id, String userName, String name, String email, String mobile,
                String website, String bio, String gender, String image, String password,
                Set<Integer> follower, Set<Integer> following, List<Story> stories,
                List<Post> savedPost, String resetToken, LocalDateTime tokenExpiration) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.website = website;
        this.bio = bio;
        this.gender = gender;
        this.image = image;
        this.password = password;
        this.follower = follower;
        this.following = following;
        this.stories = stories;
        this.savedPost = savedPost;
        this.resetToken = resetToken;
        this.tokenExpiration = tokenExpiration;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getTokenExpiration() {
        return tokenExpiration;
    }

    public void setTokenExpiration(LocalDateTime tokenExpiration) {
        this.tokenExpiration = tokenExpiration;
    }

    @Column(name = "token_expiration")
    private LocalDateTime tokenExpiration;


    public User(Integer id, String userName, String name, String email,
                String mobile, String website, String bio, String gender,
                String image, String password, HashSet<Integer> follower,
                HashSet<Integer> following, List<Story> stories, List<Post> savedPost) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.website = website;
        this.bio = bio;
        this.gender = gender;
        this.image = image;
        this.password = password;
        this.follower = follower;
        this.following = following;
        this.stories = stories;
        this.savedPost = savedPost;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Integer> getFollower() {
        return follower;
    }

    public void setFollower(Set<Integer> follower) {
        this.follower = new HashSet<>(follower);
    }

    public void setFollowing(Set<Integer> following) {
        this.following = new HashSet<>(following);
    }


    public Set<Integer> getFollowing() {
        return following;
    }

    public List<Story> getStories() {
        return stories;
    }

    public void setStories(List<Story> stories) {
        this.stories = stories;
    }

    public List<Post> getSavedPost() {
        return savedPost;
    }

    public void setSavedPost(List<Post> savedPost) {
        this.savedPost = savedPost;
    }
    public User(){

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", website='" + website + '\'' +
                ", bio='" + bio + '\'' +
                ", gender='" + gender + '\'' +
                ", image='" + image + '\'' +
                ", password='" + password + '\'' +
                ", follower=" + follower +
                ", following=" + following +
                ", stories=" + stories +
                ", savedPost=" + savedPost +
                '}';
    }
}
