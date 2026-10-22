package com.smartfarm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class Crop {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String cropType;
	private String cropName;
	private String season;
	private double yeild;
	
	@ManyToOne
	@JoinColumn( name = "farm_id")
	private Farm farm;

}
