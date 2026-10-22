package com.smartfarm.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.ExpertAnswerRequest;
import com.smartfarm.dto.ExpertQueryRequest;
import com.smartfarm.dto.ExpertQueryResponse;
import com.smartfarm.entity.ExpertQuery;
import com.smartfarm.entity.Farm;
import com.smartfarm.entity.User;
import com.smartfarm.repository.ExpertQueryRepository;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.repository.UserRepository;
import com.smartfarm.service.ExpertQueryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpertQueryServiceImpl implements ExpertQueryService {

    private final ExpertQueryRepository expertQueryRepository;
    private final FarmRepositorty farmRepository;
    private final UserRepository userRepository;

    @Override
    public ExpertQueryResponse submitQuery(ExpertQueryRequest request, String farmerUsername) {
        User farmer = userRepository.findByUsername(farmerUsername)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        Farm farm = farmRepository.findById(request.getFarmid())
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        ExpertQuery query = ExpertQuery.builder()
                .question(request.getQuestion())
                .farm(farm)
                .farmer(farmer)
                .createdAt(LocalDateTime.now())
                .build();

        expertQueryRepository.save(query);
        return mapToResponse(query);
    }

    @Override
    public List<ExpertQueryResponse> getPendingQueries() {
        return expertQueryRepository.findByAnswerIsNull()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ExpertQueryResponse answerQuery(ExpertAnswerRequest request, String expertUsername) {
        ExpertQuery query = expertQueryRepository.findById(request.getQueryId())
                .orElseThrow(() -> new RuntimeException("Query not found"));

        query.setAnswer(request.getAnswer());
        query.setAnsweredAt(LocalDateTime.now());

        expertQueryRepository.save(query);
        return mapToResponse(query);
    }

    @Override
    public List<ExpertQueryResponse> getFarmerQueries(String farmerUsername) {
        return expertQueryRepository.findByFarmerUsername(farmerUsername)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ExpertQueryResponse mapToResponse(ExpertQuery query) {
        return ExpertQueryResponse.builder()
                .id(query.getId())
                .question(query.getQuestion())
                .answer(query.getAnswer())
                .farmid(query.getFarm().getId())
                .farmerUsername(query.getFarmer().getUsername())
                .createdAt(query.getCreatedAt())
                .answeredAt(query.getAnsweredAt())
                .build();
    }
}


