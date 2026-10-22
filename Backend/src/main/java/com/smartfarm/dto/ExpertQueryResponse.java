package com.smartfarm.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExpertQueryResponse {
	
	
	private Long id;
	private String question;
	private String answer;
	private String farmerUsername;
	private Long farmid;
	private LocalDateTime createdAt;
	private LocalDateTime answeredAt;
	
	

}
