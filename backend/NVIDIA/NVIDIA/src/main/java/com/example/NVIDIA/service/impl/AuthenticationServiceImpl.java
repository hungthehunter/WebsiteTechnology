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
import com.example.NVIDIA.repository.DecentralizationRepository;
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
		
	private final DecentralizationRepository decentralizationRepository;
	
	public User signup(SignUpRequest signUpRequest) {
		User user=new User();
		user.setEmail(signUpRequest.getEmail());
		user.setFullname(signUpRequest.getFullname());
		user.setMobile(signUpRequest.getMobile());
		user.setRole(Role.User);
		user.setStatus(true);
		user.setDateofbirth(signUpRequest.getDateofbirth());
		user.setSalary(0.0);
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		user.setDecentralization(decentralizationRepository.findById(2L).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng")));
		return userRepository.save(user);
	}
	
	
	public JwtAuthenticationResponse signin(SignInRequest signInRequest) {
	    // Xác thực thông tin đăng nhập
	    authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
	    );

	    // Tìm người dùng theo email và kiểm tra status
	    var user = userRepository.findByEmail(signInRequest.getEmail())
	        .filter(u -> u.isStatus() == true)  // Kiểm tra user có status = true không
	        .orElseThrow(() -> new IllegalArgumentException("Invalid Email, Password, or User is inactive"));

	    // Tạo JWT và Refresh Token
	    var jwt = jwtService.generateToken(user);
	    var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

	    // Trả về thông tin đăng nhập
	    JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
	    jwtAuthenticationResponse.setToken(jwt);
	    jwtAuthenticationResponse.setRefreshToken(refreshToken);

	    return jwtAuthenticationResponse;
	}

	
	
	public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
	    // Lấy email của người dùng từ token
	    String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
	    
	    // Kiểm tra nếu người dùng tồn tại và có status = true
	    User user = userRepository.findByEmail(userEmail)
	        .filter(u -> u.isStatus() == true)  // Kiểm tra status = true
	        .orElseThrow(() -> new IllegalArgumentException("User not found or inactive"));

	    // Kiểm tra xem token có hợp lệ không
	    if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
	        var jwt = jwtService.generateToken(user);
	        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
	        
	        jwtAuthenticationResponse.setToken(jwt);
	        jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
	        return jwtAuthenticationResponse;
	    }
	    return null;
	}

	
	
	public User getUserFromToken(String token) {
	    // Lấy email của người dùng từ token
	    String userEmail = jwtService.extractUserName(token);
	    
	    // Tìm người dùng và kiểm tra status = true
	    return userRepository.findByEmail(userEmail)
	        .filter(u -> u.isStatus() == true)  // Kiểm tra status = true
	        .orElseThrow(() -> new IllegalArgumentException("User not found or inactive"));
	}

}
