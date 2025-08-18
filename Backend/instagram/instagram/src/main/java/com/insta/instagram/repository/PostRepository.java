package com.insta.instagram.repository;

import com.insta.instagram.modal.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer> {

    @Query("select p from Post p where p.user.id = ?1")
    List<Post> findByUserId(Integer userId);

//    @Query("select p from post p where p.user.id IN : users ORDER BY p.createdAt DESC")
//    public List<Post>findAllPostByUserIds(List<Integer>userIds);

    List<Post> findByUserIdIn(List<Integer> userIds);



}
