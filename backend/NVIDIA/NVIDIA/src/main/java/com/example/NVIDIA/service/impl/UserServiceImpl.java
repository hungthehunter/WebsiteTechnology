package com.example.NVIDIA.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.UserService;



@Service
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	
	 @Autowired
	    public UserServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
	
	@Override
	public UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			
			@Override
			public UserDetails loadUserByUsername(String username) {
				return userRepository.findByEmail(username)
						.orElseThrow(() -> new UsernameNotFoundException("User not found"));
			}
		
	
		};
	}
	
}
