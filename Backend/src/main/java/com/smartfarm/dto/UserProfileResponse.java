package com.smartfarm.dto;
import com.smartfarm.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserProfileResponse {
	
	private String username;
	private Role role;
	
	private String firstname;
	private String lastname;
	private String address;
	private String phoneNumber;
	private String location;
	

}
