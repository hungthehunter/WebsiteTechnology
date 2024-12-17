package com.example.NVIDIA.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.NVIDIA.service.JWTService;
import com.example.NVIDIA.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter{
	
	private final JWTService jwtService;
private final UserService userService;

@Autowired
public JWTAuthenticationFilter(JWTService jwtService, UserService userService) {
    this.jwtService = jwtService;
    this.userService = userService;
}

@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		final String authHeader=request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		
		
		
		
		
		if(StringUtils.isEmpty(authHeader) || !org.apache.commons.lang3.StringUtils.startsWith(authHeader,"Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}
		jwt=authHeader.substring(7);
		userEmail= jwtService.extractUserName(jwt);
		if(!StringUtils.isEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
		UserDetails userDetails= userService.userDetailsService().loadUserByUsername(userEmail);
		
		if(jwtService.isTokenValid(jwt,userDetails)) {
			SecurityContext securityContext=SecurityContextHolder.createEmptyContext();
			UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(
			userDetails,null,userDetails.getAuthorities()
			);
			
token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
securityContext.setAuthentication(token);
SecurityContextHolder.setContext(securityContext);
		}
		}
		filterChain.doFilter(request, response);
		
		}
	}


