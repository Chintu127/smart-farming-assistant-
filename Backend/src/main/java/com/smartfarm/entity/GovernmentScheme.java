package com.smartfarm.entity;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class GovernmentScheme {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	
	@Column(length = 1000)
	private String description;
	private LocalDate startDate;
	private LocalDate endDate;
	private String eligibility;
	private String region;
	

}
