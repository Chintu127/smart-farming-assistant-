package com.smartfarm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.smartfarm.dto.SoilRequest;
import com.smartfarm.dto.SoilResponse;
import com.smartfarm.entity.Farm;
import com.smartfarm.entity.Soil;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.repository.SoilRepository;
import com.smartfarm.service.SoilService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SoilServiceImpl implements SoilService 
{
    private final SoilRepository  soilRepository;
    private final FarmRepositorty farmRepository;
    

	@Override
	public SoilResponse addSoil(SoilRequest request) 
	{
		
		Farm farm= farmRepository.findById(request.getFarmid()).orElseThrow(()-> new RuntimeException("Farm not found"));
		
		Soil soil= new Soil();
		soil.setType(request.getType());
		soil.setPhLevel(request.getPhLevel());
		soil.setNutrients(request.getNutrients());
		soil.setFarm(farm);
		
		Soil saved=soilRepository.save(soil);
		// TODO Auto-generated method stub
		return mapToResponse(saved);
	}

	@Override
	public List<SoilResponse> getAllSoils() 
	{
		return soilRepository.findAll().stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<SoilResponse> getSoilsByFarmId(Long farmid) 
	{
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Farm farm = farmRepository.findById(farmid).orElseThrow(()-> new RuntimeException ("Farm not found"));
		
		if(!farm.getUser().getUsername().equals(username)) {
			throw new RuntimeException("Access Denied : This farm does not belong to you");
		}
				return soilRepository.findByFarmId(farmid).stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
		// TODO Auto-generated method stub
	
	}

	@Override
	public SoilResponse updateSoil(Long id, SoilRequest request) 
	{
		Soil soil= soilRepository.findById(id).orElseThrow(()-> new RuntimeException("Farm not found"));
		
		Farm farm= farmRepository.findById(request.getFarmid()).orElseThrow(()-> new RuntimeException("Farm not found"));
		
		soil.setType(request.getType());
		soil.setPhLevel(request.getPhLevel());
		soil.setNutrients(request.getNutrients());
		soil.setFarm(farm);
		
		Soil saved= soilRepository.save(soil);
		// TODO Auto-generated method stub
		return mapToResponse(saved);
	}

	@Override
	public void deleteSoil(Long id)
	{
		soilRepository.deleteById(id);
		
	}
	
	private SoilResponse mapToResponse(Soil soil)
	{
		SoilResponse response= new SoilResponse();
		
		response.setId(soil.getId());
		response.setType(soil.getType());
		response.setPhLevel(soil.getPhLevel());
		response.setNutrients(soil.getNutrients());
		response.setFarmid(soil.getFarm().getId());
		return response;
	}
}
