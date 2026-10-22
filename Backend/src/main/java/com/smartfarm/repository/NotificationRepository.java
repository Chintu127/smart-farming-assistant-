package com.smartfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartfarm.entity.Notification;
import com.smartfarm.entity.Role;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
	List<Notification> findByRecipientRoleOrderByTimestampDesc(Role role);
	
	List<Notification> findByRecipientRoleAndIsReadFalse(Role role);
	
	long countByRecipientRoleAndIsReadFalse(Role role);

}
