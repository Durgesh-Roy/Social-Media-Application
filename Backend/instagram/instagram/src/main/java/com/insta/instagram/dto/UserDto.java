package com.insta.instagram.dto;

import jakarta.persistence.Embeddable;

import java.util.Objects;
@Embeddable
public class UserDto {
    private Integer id;
    private String username;
    private String email;
    private String name;
    private String userImage;
public UserDto(){

}
    public UserDto(Integer id, String username, String email, String name, String userImage) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.userImage = userImage;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDto userDto)) return false;
        return Objects.equals(getId(), userDto.getId()) && Objects.equals(getUsername(), userDto.getUsername()) && Objects.equals(getEmail(), userDto.getEmail()) && Objects.equals(getName(), userDto.getName()) && Objects.equals(getUserImage(), userDto.getUserImage());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getEmail(), getName(), getUserImage());
    }
}
