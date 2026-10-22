package com.smartfarm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.SoilRequest;
import com.smartfarm.dto.SoilResponse;
import com.smartfarm.service.SoilService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/soils")
@RequiredArgsConstructor
public class SoilController {
	
	private final SoilService soilService;
	
	@PostMapping("/add")
	public ResponseEntity<SoilResponse> addSoil(@RequestBody SoilRequest request)
	{
		return ResponseEntity.ok(soilService.addSoil(request));
	}
	
	@GetMapping("/Get")
	public ResponseEntity<List<SoilResponse>> getAllSoils()
	{
		return ResponseEntity.ok(soilService.getAllSoils());
	}
	
	@GetMapping("/farm/{farmid}")
	public ResponseEntity<List<SoilResponse>> getSoilsByFarm(@PathVariable Long farmid)
	{
		return ResponseEntity.ok(soilService.getSoilsByFarmId(farmid));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<SoilResponse> updateSoil(@PathVariable Long id , @RequestBody SoilRequest request)
	{
		return ResponseEntity.ok(soilService.updateSoil(id , request));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSoil(@PathVariable Long id)
	{
		soilService.deleteSoil(id);
		return ResponseEntity.ok("Soil seleted Successfully");
		
	}

}
