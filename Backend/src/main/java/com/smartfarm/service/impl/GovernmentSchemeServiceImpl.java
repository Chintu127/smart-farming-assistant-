package com.smartfarm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.SchemeRequest;
import com.smartfarm.dto.SchemeResponse;
import com.smartfarm.entity.GovernmentScheme;
import com.smartfarm.repository.GovernmentSchemeRepository;
import com.smartfarm.service.GovernmentSchemeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GovernmentSchemeServiceImpl implements GovernmentSchemeService {
	
	private final GovernmentSchemeRepository schemeRepository;

	@Override
	public SchemeResponse createScheme(SchemeRequest request) 
	{
		
		GovernmentScheme scheme = GovernmentScheme.builder()
				.title(request.getTitle())
				.description(request.getDescription())
				.startDate(request.getStartDate())
				.endDate(request.getEndDate())
				.eligibility(request.getEligibility())
				.region(request.getRegion())
				.build();
		schemeRepository.save(scheme);
		
		return mapToResponse(scheme);
	}

	@Override
	public List<SchemeResponse> getAllScheme() 
	{
		
		return schemeRepository.findAll()
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
	}

	@Override
	public List<SchemeResponse> getSchemeByRegion(String region) 
	{
		
		return schemeRepository.findByRegion(region)
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
	}
	
	private SchemeResponse mapToResponse(GovernmentScheme scheme)
	{
		return new SchemeResponse(
				scheme.getId(),
				scheme.getTitle(),
				scheme.getDescription(),
				scheme.getStartDate(),
				scheme.getEndDate(),
				scheme.getEligibility(),
				scheme.getRegion()
				);
	}
	
	

}
