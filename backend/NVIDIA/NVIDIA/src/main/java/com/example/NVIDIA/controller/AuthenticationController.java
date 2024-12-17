package com.example.NVIDIA.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.NVIDIA.dto.JwtAuthenticationResponse;
import com.example.NVIDIA.dto.RefreshTokenRequest;
import com.example.NVIDIA.dto.SignInRequest;
import com.example.NVIDIA.dto.SignUpRequest;
import com.example.NVIDIA.model.User;
import com.example.NVIDIA.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
	
	private final AuthenticationService authenticationService;
	
//	@Autowired
//	private AuthenticationService authenticationService;
	
	@PostMapping("/signup")
	public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest){
		return ResponseEntity.ok(authenticationService.signup(signUpRequest));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest signInRequest){
		return ResponseEntity.ok(authenticationService.signin(signInRequest));
	}
	

	@PostMapping("/refresh")
	public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
		return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
	}
	
	 @GetMapping("/me")
	    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
	        String actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;
	        User user = authenticationService.getUserFromToken(actualToken);
	        return ResponseEntity.ok(user);
	    }
	
}
