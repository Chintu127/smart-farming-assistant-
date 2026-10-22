package com.smartfarm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.CropRequest;
import com.smartfarm.dto.CropResponse;
import com.smartfarm.entity.Crop;
import com.smartfarm.entity.Farm;
import com.smartfarm.repository.CropRepository;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.service.CropService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CropServiceImpl implements CropService {
	
	private final CropRepository cropRepository;
	private final FarmRepositorty farmRepository;
	@Override
	public CropResponse addCrop(CropRequest request) 
	{
		Farm farm=farmRepository.findById(request.getFarmid()).orElseThrow(()-> new RuntimeException("Farm not found"));
		
		Crop crop= Crop.builder()
				.cropName(request.getCropName())
				.cropType(request.getCropType())
				.season(request.getSeason())
				.yeild(request.getYeild())
				.farm(farm)
				.build();
		
		Crop saved= cropRepository.save(crop);
		
		return mapToResponse(saved);
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<CropResponse> getCropsByFarm(Long farmid) 
	{
		Farm farm=farmRepository.findById(farmid).orElseThrow(()-> new RuntimeException ("Farm not found"));
		// TODO Auto-generated method stub
		return cropRepository.findByFarm(farm)
				.stream()
				.map(this:: mapToResponse)
				.collect(Collectors.toList());
	
	}
	@Override
	public List<CropResponse> getAllCrops() 
	{
		return cropRepository.findAll()
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
		// TODO Auto-generated method stub
		
	}
	
	private CropResponse mapToResponse(Crop crop)
	{
		return CropResponse.builder()
				.id(crop.getId())
				.cropName(crop.getCropName())
				.cropType(crop.getCropType())
				.season(crop.getSeason())
				.yeild(crop.getYeild())
				.farmid(crop.getFarm().getId())
				.build();
	}
	@Override
	public CropResponse updateCrop(Long id, CropRequest request) 
	{
		 Crop crop= cropRepository.findById(id).orElseThrow(() -> new RuntimeException ("Crop not found"));
		 
		 crop.setCropName(request.getCropName());
		 crop.setCropType(request.getCropType());
		 crop.setSeason(request.getSeason());
		 crop.setYeild(request.getYeild());
		 
		 Farm farm = farmRepository.findById(request.getFarmid())
				 .orElseThrow(()-> new RuntimeException("Farm not found"));
		 crop.setFarm(farm);
		 
		 Crop updated = cropRepository.save(crop);
		 
		return mapToResponse(updated);
	}
	@Override
	public void deleteCrop(Long id) 
	{
		cropRepository.deleteById(id);
		// TODO Auto-generated method stub
		
	}
	
	

}
