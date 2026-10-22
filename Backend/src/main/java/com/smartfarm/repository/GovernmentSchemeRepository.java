package com.smartfarm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartfarm.entity.GovernmentScheme;
@Repository
public interface GovernmentSchemeRepository extends JpaRepository<GovernmentScheme, Long> 
{
      List<GovernmentScheme> findByRegion(String region);
}
