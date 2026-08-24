//package com.insta.instagram.modal;
//
//
//import jakarta.persistence.Id;
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.data.elasticsearch.annotations.Document;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//
//@Document(indexName = "users")
//@Getter
//@Setter
//public class UserDocument {
//
//    @Id
//    private Integer id;
//
//    @Field(type = FieldType.Text)
//    private String userName;
//
//    @Field(type = FieldType.Text)
//    private String name;
//
//    @Field(type = FieldType.Text)
//    private String bio;
//
//    private String image;
//
//    // getters/setters
//}