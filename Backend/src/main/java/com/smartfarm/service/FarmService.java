package com.smartfarm.service;

import java.util.List;

import com.smartfarm.dto.FarmRequest;
import com.smartfarm.dto.FarmResponse;
import com.smartfarm.entity.Farm;

public interface FarmService {

	FarmResponse addFarm(FarmRequest request, String username);

    List<FarmResponse> getFarmsByUser(String username);

    FarmResponse updateFarm(Long id, FarmRequest request, String username);

	void deleteFarm(Long id, String username);

	List<Farm> getFarmsByUserId(Long userid);

	

}
