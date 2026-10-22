package com.smartfarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class WeatherResponse {

	private String weather;
	private String description;
	private double temperature;
	private double feelsLike;
	private double windSpeed;
	private double humidity;
	private String city;
	
}
