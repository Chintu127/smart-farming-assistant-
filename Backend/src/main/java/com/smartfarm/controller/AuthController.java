package com.smartfarm.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.AuthResponse;
import com.smartfarm.dto.LoginRequest;
import com.smartfarm.dto.RegisterRequest;
import com.smartfarm.service.AuthService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	
	@PostMapping("/register")
	public AuthResponse register(@RequestBody RegisterRequest request)
	{
		return authService.register(request);
	}
	
	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request)
	{
		return authService.login(request);
	}

}
