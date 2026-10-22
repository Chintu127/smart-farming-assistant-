package com.smartfarm.dto;
import java.time.LocalDate;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class SchemeResponse {
	
	private Long id;
	private String title;
	private String description;
	private LocalDate startDate;
	private LocalDate endDate;
	private String eligibility;
	private String region;
	

}
