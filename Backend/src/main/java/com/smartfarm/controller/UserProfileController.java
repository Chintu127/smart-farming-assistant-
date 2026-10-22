package com.smartfarm.controller;



import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.UserProfileResponse;
import com.smartfarm.dto.UserProfileUpdateRequest;
import com.smartfarm.entity.User;
import com.smartfarm.repository.UserRepository;
import com.smartfarm.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {
	
	private final UserService userService;
	private final UserRepository userRepository;
	
	
	@GetMapping("/profile")
	public UserProfileResponse getProfile(Authentication authentication)
	{
		String username=authentication.getName();
		return userService.getUserprofile(username);
	}
	
	@PutMapping("/update")
	public UserProfileResponse updateProfile(@RequestBody UserProfileUpdateRequest updaterequest , Authentication authentication)
	{
		String username=authentication.getName();
		return userService.updateCurrentUserProfile(username , updaterequest);
	}
	
	@GetMapping("/role")
	public ResponseEntity<Map<String,String>> getRole(Authentication authentication)
	{
		String username= authentication.getName();
		
		User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("user nt found"));
		
		Map<String , String> response = new HashMap<>();
		response.put("role", user.getRole().toString());
		return ResponseEntity.ok(response);
		
	}

}
