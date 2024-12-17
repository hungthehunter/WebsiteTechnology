package com.example.NVIDIA.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.NVIDIA.service.JWTService;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTServiceImpl implements JWTService{

	 private SecretKey getSigningKey() {
	       
		 
		 byte[] key=Decoders.BASE64.decode("413F4428472B4B6250655368566D5970337336763979244226452948404D6351");
		 return Keys.hmacShaKeyFor(key);

	    }
	
	public String generateToken(UserDetails userDetails) {
    
 // Token expiration set to 24 hours from now

        return Jwts.builder().setSubject(userDetails.getUsername()) // Setting the username as the subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Issue time set to current time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Expiration time set to 24 hours from the issue time
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Signing the token with HS256 and the secret key
                .compact(); // Building the token string
    }
	
	public String generateRefreshToken(Map<String , Object> extractClaims,UserDetails userDetails) {
        return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername()) // Setting the username as the subject
                .setIssuedAt(new Date(System.currentTimeMillis())) // Issue time set to current time
                .setExpiration(new Date(System.currentTimeMillis() + 640800000)) // Expiration time set to 24 hours from the issue time
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Signing the token with HS256 and the secret key
                .compact(); // Building the token string
    }
	
	
	// Method is already included in the above code block within the JwtUtil class.
	private Claims extractAllClaims(String token) {
	    return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
	}
	  public <T> T extractClaim(String token, Function< Claims , T > claimResolvers) {
	        final Claims claims = extractAllClaims(token);
	        return claimResolvers.apply(claims);
	    }

	  public String extractUserName(String token) {
		  return extractClaim(token, Claims::getSubject);
	  }
	  
	  
	  public boolean isTokenValid(String token,UserDetails userDetails) {
		  final String username=extractUserName(token);
		  return (username.equals(userDetails.getUsername()) && !isTokenExpire(token));
	  }
	  
	  private boolean isTokenExpire(String token) {
		  return extractClaim(token, Claims::getExpiration).before(new Date());
	  }
}
