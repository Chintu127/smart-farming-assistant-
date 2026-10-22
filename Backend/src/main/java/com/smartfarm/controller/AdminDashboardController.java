package com.smartfarm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.AdminDashboardStats;
import com.smartfarm.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
	
	private final AdminDashboardService adminDashboardService;
	
	@GetMapping("/stats")
	public AdminDashboardStats getDashboardStats()
	{
		return adminDashboardService.getStats();
	}
	

}
