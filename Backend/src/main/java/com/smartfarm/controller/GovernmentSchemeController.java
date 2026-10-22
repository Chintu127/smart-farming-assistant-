package com.smartfarm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.SchemeRequest;
import com.smartfarm.dto.SchemeResponse;
import com.smartfarm.service.GovernmentSchemeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/scheme")
@RequiredArgsConstructor
public class GovernmentSchemeController {

	private final GovernmentSchemeService schemeService;
	
	//ADMIN Only
	@PostMapping
	public ResponseEntity <SchemeResponse> createScheme(@RequestBody SchemeRequest request)
	{
		return ResponseEntity.ok(schemeService.createScheme(request));
	}
	
	//Public Farmer
	@GetMapping
	public ResponseEntity<List<SchemeResponse>> getAllScheme()
	{
		return ResponseEntity.ok(schemeService.getAllScheme());
	}
	@GetMapping("/region/{region}")
	public ResponseEntity<List<SchemeResponse>> getSchemeByRegion(@PathVariable String region)
	{
		return ResponseEntity.ok(schemeService.getSchemeByRegion(region));
	}
}
