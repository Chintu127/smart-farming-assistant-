package com.smartfarm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.FarmRequest;
import com.smartfarm.dto.FarmResponse;
import com.smartfarm.entity.Farm;
import com.smartfarm.service.FarmService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/farms")
@RequiredArgsConstructor
public class FarmController 
{
	
	private final FarmService farmService;
	
	@PostMapping("/create")
	public ResponseEntity<FarmResponse> createFarm(@RequestBody FarmRequest request , Authentication auth)
	{
		String username=auth.getName();
		return ResponseEntity.ok(farmService.addFarm(request , username));			
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<FarmResponse>> getUserFarms(Authentication auth)
	{
		String username=auth.getName();
		return ResponseEntity.ok(farmService.getFarmsByUser(username));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<FarmResponse> updateFarm(@PathVariable Long id , @RequestBody FarmRequest request , Authentication auth)
	{
		String username=auth.getName();
		return ResponseEntity.ok(farmService.updateFarm(id , request , username));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFarm(@PathVariable Long id , Authentication auth)
	{
		String username=auth.getName();
		farmService.deleteFarm(id , username);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/user/{userid}")
	public List<Farm> getFarmsByUserId(@PathVariable Long userid)
	{
		return farmService.getFarmsByUserId(userid);
	}

	
	
	

}
