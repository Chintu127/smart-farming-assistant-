package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.Farm;
import com.smartfarm.entity.User;

import java.util.List;


public interface FarmRepositorty extends JpaRepository<Farm, Long> 
{
    List<Farm> findByUser(User user);

	long countByUser(User user);
}
