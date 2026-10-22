package com.smartfarm.service;

import java.util.List;

import com.smartfarm.dto.ExpertAnswerRequest;
import com.smartfarm.dto.ExpertQueryRequest;
import com.smartfarm.dto.ExpertQueryResponse;

public interface ExpertQueryService {

	

	ExpertQueryResponse submitQuery(ExpertQueryRequest request, String username);

	List<ExpertQueryResponse> getPendingQueries();

	ExpertQueryResponse answerQuery(ExpertAnswerRequest request, String username);

	List<ExpertQueryResponse> getFarmerQueries(String username);

	

}
