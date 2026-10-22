package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.smartfarm.entity.Soil;
import com.smartfarm.entity.User;

import java.util.List;


public interface SoilRepository extends JpaRepository<Soil, Long> 
{
      List<Soil> findByFarmId( Long farmid);

	long countByFarmUser(User user);
}
