package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.CropSuggestion;

public interface CropSuggestionRepository extends JpaRepository<CropSuggestion, Long> {

}
