package com.smartfarm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.WeatherResponse;
import com.smartfarm.service.WeatherService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {
	
	private final WeatherService weatherService;
	
	@GetMapping("/{farmid:[0-9]+}")
	public ResponseEntity<WeatherResponse> getWeather(@PathVariable Long farmid, @AuthenticationPrincipal UserDetails userDetails) {
		String username = userDetails.getUsername();
		return ResponseEntity.ok(weatherService.getWeatherForFarm(farmid, username));
	}
	
	@GetMapping("/city/{city}")
	public ResponseEntity<WeatherResponse> getWeatherByCity(@PathVariable String city) {
		return ResponseEntity.ok(weatherService.getWeatherByCity(city));
	}
}
