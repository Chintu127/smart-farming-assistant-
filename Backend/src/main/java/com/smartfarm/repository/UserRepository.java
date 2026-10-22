package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.Role;
import com.smartfarm.entity.User;
import java.util.Optional;
import java.util.List;




public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User>findByUsername(String username);
	boolean existsByUsername(String username);
	List<User>findByRole(Role farmer);
	long countByRole(Role role);

}
