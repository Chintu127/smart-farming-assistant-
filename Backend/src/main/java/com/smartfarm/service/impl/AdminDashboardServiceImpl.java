package com.smartfarm.service.impl;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.AdminDashboardStats;
import com.smartfarm.entity.Role;
import com.smartfarm.repository.CropRepository;
import com.smartfarm.repository.ExpertQueryRepository;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.repository.GovernmentSchemeRepository;
import com.smartfarm.repository.SoilRepository;
import com.smartfarm.repository.UserRepository;
import com.smartfarm.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {
	
	private final UserRepository userRepository;
    private final FarmRepositorty farmRepository;
    private final CropRepository cropRepository;
    private final SoilRepository soilRepository;
    private final ExpertQueryRepository expertQueryRepository;
    private final GovernmentSchemeRepository schemeRepository;
    
    
	
    @Override
	public AdminDashboardStats getStats() 
    {
		long totalUsers = userRepository.count();
		long totalFarmers = userRepository.countByRole(Role.FARMER);
		long totalExperts = userRepository.countByRole(Role.EXPERT);
		long totalAdmins = userRepository.countByRole(Role.ADMIN);
		
		
		return new AdminDashboardStats(
				 totalUsers,
				 totalFarmers,
				 totalExperts,
				 totalAdmins,
			     farmRepository.count(),
			     cropRepository.count(),
			     soilRepository.count(),
			     expertQueryRepository.count(),
			     schemeRepository.count()
				
				);
	}
	
	
	

}
