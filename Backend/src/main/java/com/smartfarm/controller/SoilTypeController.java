package com.smartfarm.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.SoilTypeResponse;
import com.smartfarm.entity.CropSuggestion;
import com.smartfarm.entity.SoilType;
import com.smartfarm.repository.SoilTypeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/soil-types")
@RequiredArgsConstructor
public class SoilTypeController {
	
	
	private final SoilTypeRepository soilTypeRepository;
	
	@GetMapping
	public List<SoilTypeResponse> getAllTypeSoil()
	{
		return soilTypeRepository.findAll().stream()
				.map(this::mapToDto)
				.collect(Collectors.toList());
	}
	
	@GetMapping("/{id}/crops")
	public List<String> getCropsBySoilType(@PathVariable Long id)
	{
		SoilType soil= soilTypeRepository.findById(id).orElseThrow(()-> new RuntimeException ("Soil not found"));
		
		return soil.getCropSuggestions().stream()
				.map(CropSuggestion::getCropName)
				.collect(Collectors.toList());
	}
	
	
	private SoilTypeResponse mapToDto(SoilType soil)
	{
		return SoilTypeResponse.builder()
				.id(soil.getId())
				.name(soil.getName())
				.minPh(soil.getMinPh())
				.maxPh(soil.getMaxPh())
				.nutrients(soil.getNutrients())
				.texture(soil.getTexture())
				.fertility(soil.getFertility())
				.recommendedCrops(
						soil.getCropSuggestions().stream()
						.map(CropSuggestion::getCropName)
						.collect(Collectors.toList())
						)
				.build();
	}

}
