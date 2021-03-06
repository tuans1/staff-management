package com.h2q.staffManagement.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.h2q.staffManagement.config.jwt.CustomUserDetails;
import com.h2q.staffManagement.repository.UserRepository;
import com.h2q.staffManagement.repository.entity.Admin;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Kiểm tra xem user có tồn tại trong database không?
        Admin admin = userRepository.findByUserName(username);
        if (admin == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(admin);
    }

    // JWTAuthenticationFilter sẽ sử dụng hàm này
    @Transactional
    public UserDetails loadUserById(Long id) {
        Admin admin = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return new CustomUserDetails(admin);
    }


}
