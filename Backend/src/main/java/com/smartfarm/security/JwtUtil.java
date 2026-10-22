package com.smartfarm.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String generateToken(String username , String role)
    {
    	return Jwts.builder()
    			.setSubject(username)
    			.claim("role", role)
    			.setIssuedAt(new Date())
    			.setExpiration(new Date((new Date()).getTime()+jwtExpirationMs))
    			.signWith(getSecretKey(), SignatureAlgorithm.HS256)
    			.compact();
    	
    }
    
     public String extractUsername(String token)
     {
    	 return Jwts.parserBuilder()
    			 .setSigningKey(getSecretKey())
    			 .build()
    			 .parseClaimsJws(token)
    			 .getBody()
    			 .getSubject();
     }
     
     public boolean isTokenValid(String token , UserDetails userDetails)
     {
    	 final String username=extractUsername(token);
    	 return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
     }
     
     public boolean isTokenExpired(String token)
     {
    	 return Jwts.parserBuilder()
    			 .setSigningKey(getSecretKey())
    			 .build()
    			 .parseClaimsJws(token)
    			 .getBody()
    			 .getExpiration()
    			 .before(new Date());
     }
     

}