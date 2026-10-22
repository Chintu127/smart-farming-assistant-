package com.smartfarm.service;

import java.util.List;

import com.smartfarm.dto.SchemeRequest;
import com.smartfarm.dto.SchemeResponse;

public interface GovernmentSchemeService {

	SchemeResponse createScheme(SchemeRequest request);

	List <SchemeResponse> getAllScheme();

	List <SchemeResponse> getSchemeByRegion(String region);

}
