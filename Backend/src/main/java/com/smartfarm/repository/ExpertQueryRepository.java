package com.smartfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.ExpertQuery;

public interface ExpertQueryRepository extends JpaRepository<ExpertQuery, Long> {
	
	List<ExpertQuery> findByAnswerIsNull();
	
	List<ExpertQuery> findByFarmerUsername(String username);
}
