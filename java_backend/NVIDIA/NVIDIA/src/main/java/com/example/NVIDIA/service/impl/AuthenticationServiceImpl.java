package com.example.NVIDIA.service.impl;


import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.dto.JwtAuthenticationResponse;
import com.example.NVIDIA.dto.RefreshTokenRequest;
import com.example.NVIDIA.dto.SignInRequest;
import com.example.NVIDIA.dto.SignUpRequest;
import com.example.NVIDIA.model.Role;
import com.example.NVIDIA.model.User;
import com.example.NVIDIA.repository.UserRepository;
import com.example.NVIDIA.service.AuthenticationService;
import com.example.NVIDIA.service.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JWTService jwtService;
	public User signup(SignUpRequest signUpRequest) {
		User user=new User();
		user.setEmail(signUpRequest.getEmail());
		user.setFullname(signUpRequest.getFullname());
		user.setMobile(signUpRequest.getMobile());
		user.setRole(Role.User);
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		return userRepository.save(user);
	}
	
	
	public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
	
		var user=userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(()-> new IllegalArgumentException("Invalid Email or Password"));
	var jwt=jwtService.generateToken(user);
	var refreshToken=jwtService.generateRefreshToken(new HashMap<>(),user);
	
	JwtAuthenticationResponse jwtAuthenticationResponse=new JwtAuthenticationResponse();
	jwtAuthenticationResponse.setToken(jwt);
	jwtAuthenticationResponse.setRefreshToken(refreshToken);
	return jwtAuthenticationResponse;
	}
	
	
	public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
		String userEmail=jwtService.extractUserName(refreshTokenRequest.getToken());
		User user=userRepository.findByEmail(userEmail).orElseThrow();
		if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
			var jwt=jwtService.generateToken(user);
			JwtAuthenticationResponse jwtAuthenticationResponse=new JwtAuthenticationResponse();
			
			jwtAuthenticationResponse.setToken(jwt);
			jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
			return jwtAuthenticationResponse;
		}
		return null;
	}
	
	
	public User getUserFromToken(String token) {
		String userEmail = jwtService.extractUserName(token);
		return userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("User not found"));
	}
}
