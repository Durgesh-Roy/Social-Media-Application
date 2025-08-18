package com.insta.instagram.repository;

import com.insta.instagram.modal.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comment,Integer> {

}
