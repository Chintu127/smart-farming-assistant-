package com.smartfarm.dto;
import com.smartfarm.entity.Role;

import lombok.*;

@Data
public class RegisterRequest {
	
	private String username;
	private String password;
	private Role role;

}
