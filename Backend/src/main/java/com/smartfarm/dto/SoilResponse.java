package com.smartfarm.dto;
import lombok.*;

@Data
public class SoilResponse {
	
	private Long id;
	private String type;
	private double phLevel;
	private String nutrients;
	private Long farmid;

}
