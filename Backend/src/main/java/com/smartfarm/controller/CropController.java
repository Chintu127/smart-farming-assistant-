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

import com.smartfarm.dto.CropRequest;
import com.smartfarm.dto.CropResponse;
import com.smartfarm.service.CropService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
public class CropController {
	
	private final CropService cropService;
	
	@PostMapping("/add")
	public ResponseEntity<CropResponse> addCrop(@RequestBody CropRequest request)
	{
		return ResponseEntity.ok(cropService.addCrop(request));
	}
	
	@GetMapping("/farm/{farmid}")
	public ResponseEntity<List<CropResponse>> getCropByFarm(@PathVariable Long farmid)
	{
		return ResponseEntity.ok(cropService.getCropsByFarm(farmid));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<CropResponse>> getAllCrops()
	{
		return ResponseEntity.ok(cropService.getAllCrops());
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<CropResponse> updateCrop(@PathVariable Long id , @RequestBody CropRequest request)
	{
		return ResponseEntity.ok(cropService.updateCrop(id , request));
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCrop (@PathVariable Long id)
	{
		cropService.deleteCrop(id);
		return ResponseEntity.noContent().build();

	
}

}
