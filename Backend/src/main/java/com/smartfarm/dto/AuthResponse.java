package com.smartfarm.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
	
	private String token;
	private Long userId;
	private String role;
	private String username;


}
