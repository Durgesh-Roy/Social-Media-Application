package com.insta.instagram.service;

import com.insta.instagram.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class userDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<com.insta.instagram.modal.User>opt=userRepository.findByEmail(username);

        if(opt.isPresent()){
            com.insta.instagram.modal.User user=opt.get();
            List<GrantedAuthority>authorities=new ArrayList<>();
            return new User(user.getEmail(),user.getPassword(),authorities );
        }
        throw new BadCredentialsException("user not found with username  "+ username);
    }
}
