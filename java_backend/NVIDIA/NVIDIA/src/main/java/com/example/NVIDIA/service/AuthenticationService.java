package com.example.NVIDIA.service;

import com.example.NVIDIA.dto.JwtAuthenticationResponse;
import com.example.NVIDIA.dto.RefreshTokenRequest;
import com.example.NVIDIA.dto.SignInRequest;
import com.example.NVIDIA.dto.SignUpRequest;
import com.example.NVIDIA.model.User;

public interface AuthenticationService {

	User signup(SignUpRequest signUpRequest);
	JwtAuthenticationResponse signin(SignInRequest signInRequest);
	JwtAuthenticationResponse refreshToken(RefreshTokenRequest requestTokenRequest);
	User getUserFromToken(String token);
}
