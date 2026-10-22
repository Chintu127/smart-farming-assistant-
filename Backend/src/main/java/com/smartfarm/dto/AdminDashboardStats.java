package com.smartfarm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardStats {
	
	
	private long totalUsers;
	private long totolFarmers;
	private long totalExperts;
	private long totalAdmins;
	private long totalFarms;
	private long totalCrops;
	private long totalSoils;
	private long totalQueries;
	private long totalSchemes;
	
	

}
