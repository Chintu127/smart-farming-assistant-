package com.smartfarm.dto;
import lombok.*;

@Data
public class CropRequest {
	
	private String cropName;
	private String cropType;
	private String season;
	private double yeild;
	private Long farmid;
	

}
