package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.Crop;
import com.smartfarm.entity.Farm;
import com.smartfarm.entity.User;

import java.util.List;


public interface CropRepository extends JpaRepository<Crop, Long> 
{
	List<Crop> findByFarm(Farm farm);

	long countByFarmUser(User user);

}
