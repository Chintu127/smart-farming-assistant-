package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.CropGuide;

public interface CropGuideRepository extends JpaRepository<CropGuide, Long>{
	

}
