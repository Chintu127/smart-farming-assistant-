package com.smartfarm.dto;

import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SoilTypeResponse {
	
	private Long id;
	
	private String name;
	
	private double minPh;
	private double maxPh;
	
	
	private String nutrients;
	
	private String texture;
	
	private String fertility;
	
	private List<String> recommendedCrops; 

}
