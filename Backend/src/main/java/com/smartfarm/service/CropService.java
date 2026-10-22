package com.smartfarm.service;

import java.util.List;

import com.smartfarm.dto.CropRequest;
import com.smartfarm.dto.CropResponse;

public interface CropService {

	

	CropResponse addCrop(CropRequest request);

	List<CropResponse> getCropsByFarm(Long farmid);
	
	List<CropResponse> getAllCrops();

	CropResponse updateCrop(Long id, CropRequest request);

	void deleteCrop(Long id);

}
