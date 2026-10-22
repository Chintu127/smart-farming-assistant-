package com.smartfarm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.dto.ExpertAnswerRequest;
import com.smartfarm.dto.ExpertQueryRequest;
import com.smartfarm.dto.ExpertQueryResponse;
import com.smartfarm.service.ExpertQueryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expert-query")
@RequiredArgsConstructor
public class ExpertQueryController {

    private final ExpertQueryService expertQueryService;

    @PostMapping("/submit")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ExpertQueryResponse> submitQuery(@RequestBody ExpertQueryRequest request,
                                                           @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(expertQueryService.submitQuery(request, user.getUsername()));
    }

    @GetMapping("/pending")
  @PreAuthorize("hasRole('EXPERT')")
    public ResponseEntity<List<ExpertQueryResponse>> getPendingQueries() {
        return ResponseEntity.ok(expertQueryService.getPendingQueries());
    }

    @PostMapping("/answer")
   @PreAuthorize("hasRole('EXPERT')")
    public ResponseEntity<ExpertQueryResponse> answerQuery(@RequestBody ExpertAnswerRequest request,
                                                           @AuthenticationPrincipal UserDetails expert) {
        return ResponseEntity.ok(expertQueryService.answerQuery(request, expert.getUsername()));
    }

    @GetMapping("/my-queries")
  @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<List<ExpertQueryResponse>> getMyQueries(@AuthenticationPrincipal UserDetails farmer) {
        return ResponseEntity.ok(expertQueryService.getFarmerQueries(farmer.getUsername()));
    }
}
