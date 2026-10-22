package com.smartfarm.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class FarmResponse {

	
	private Long id;
	private String farmName;
	private String location;
	private double sizeInAcres;
	private Double latitude;
	private Double longitude;
}
