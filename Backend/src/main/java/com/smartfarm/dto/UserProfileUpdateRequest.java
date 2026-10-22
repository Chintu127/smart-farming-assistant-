package com.smartfarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileUpdateRequest {

	
	private String firstname;
	private String lastname;
	private String address;
	private String phoneNumber;
	private String location;
}
