package com.smartfarm.service;

import java.util.List;

import com.smartfarm.dto.SoilRequest;
import com.smartfarm.dto.SoilResponse;

public interface SoilService {

	

	SoilResponse addSoil(SoilRequest request);
	
	List<SoilResponse> getAllSoils();

	List<SoilResponse> getSoilsByFarmId(Long farmid);

	SoilResponse updateSoil(Long id, SoilRequest request);

	void deleteSoil(Long id);

}
