package com.smartfarm.service.impl;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.UserProfileResponse;
import com.smartfarm.dto.UserProfileUpdateRequest;
import com.smartfarm.entity.User;
import com.smartfarm.repository.UserRepository;

import com.smartfarm.service.UserService;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;

	@Override
	public UserProfileResponse getUserprofile(String username) 
	{
		User user=userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
		return mapToResponse(user);
	}
	@Override
	public UserProfileResponse updateCurrentUserProfile(String username, UserProfileUpdateRequest updaterequest) 
	{
		User user=userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
		
		user.setFirstname(updaterequest.getFirstname());
		user.setLastname(updaterequest.getLastname());
		user.setLocation(updaterequest.getLocation());
		user.setPhoneNumber(updaterequest.getPhoneNumber());
		user.setAddress(updaterequest.getAddress());
		
		User updatedrequest= userRepository.save(user);
		return mapToResponse(updatedrequest);
		
	}
	
	private UserProfileResponse mapToResponse(User user)
	{
	    return UserProfileResponse.builder()
	    		.username(user.getUsername())
	    		.firstname(user.getFirstname())
	    		.lastname(user.getLastname())
	    		.address(user.getAddress())
	    		.location(user.getLocation())
	    		.phoneNumber(user.getPhoneNumber())
	    		.build();
	}

	
	

}
