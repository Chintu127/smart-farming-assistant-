package com.smartfarm.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropResponse {
	
	private Long id;
	private String cropName;
	private String cropType;
	private String season;
	private double yeild;
	private Long farmid;
	

}
