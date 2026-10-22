package com.smartfarm.service;

import com.smartfarm.dto.WeatherResponse;

public interface WeatherService {

	WeatherResponse getWeatherForFarm(Long farmid, String username);

	WeatherResponse getWeatherByCity(String city);

}
