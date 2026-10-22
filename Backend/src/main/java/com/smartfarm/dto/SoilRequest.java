package com.smartfarm.dto;
import lombok.*;

@Data
public class SoilRequest {
	
	private String type;
	private double phLevel;
	private String nutrients;
	private Long farmid;
	

}
