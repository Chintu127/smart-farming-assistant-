package com.smartfarm.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartfarm.dto.AuthResponse;
import com.smartfarm.dto.LoginRequest;
import com.smartfarm.dto.RegisterRequest;
import com.smartfarm.entity.User;
import com.smartfarm.repository.UserRepository;
import com.smartfarm.security.JwtUtil;
import com.smartfarm.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService
{
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	@Override
	public AuthResponse register(RegisterRequest request) {


		if(userRepository.existsByUsername(request.getUsername()))
		{
			throw new RuntimeException("Username already exists");
		}
		
		User user=new User();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole());
		
		userRepository.save(user);
		
		//
		String token= jwtUtil.generateToken(user.getUsername(), user.getRole().name());
		return AuthResponse.builder()
				.token(token)
				.username(user.getUsername())
				.userId(user.getId())
				.role(user.getRole().name())
				.build();
	}

	@Override
	public AuthResponse login(LoginRequest request) {
		authenticationManager.authenticate(
				new
				UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
				);
		
		User user=userRepository.findByUsername(request.getUsername()).orElseThrow(()->
		new RuntimeException("User not found"));
		
		//
		String token= jwtUtil.generateToken(user.getUsername(), user.getRole().name());
		return AuthResponse.builder()
				.token(token)
				.username(user.getUsername())
				.userId(user.getId())
				.role(user.getRole().name())
				.build();
		
	}

}
