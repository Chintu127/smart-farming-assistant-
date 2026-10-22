package com.smartfarm.service.impl;


import java.util.List;

import org.springframework.stereotype.Service;

import com.smartfarm.entity.Notification;
import com.smartfarm.entity.Role;
import com.smartfarm.repository.NotificationRepository;
import com.smartfarm.service.NotificationService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	
	
	private final NotificationRepository notificationRepositroy;

	@Override
	public Notification sendNotifications(String title, String message, Role role) 
	{
		 Notification notification = Notification.builder()
				 .title(title)
				 .message(message)
				 .recipientRole(role)
				 .isRead(false)
				 .build();
		return notificationRepositroy.save(notification);
	}

	@Override
	public List<Notification> getFarmernotifications() 
	{
		return notificationRepositroy.findByRecipientRoleOrderByTimestampDesc(Role.FARMER);
		
	}

	@Override
	public long getUnreadCount(Role role) 
	{
		return notificationRepositroy.countByRecipientRoleAndIsReadFalse(role);
		
	}

	@Override
	public void markAllAsRead(Role role) 
	{
	 List<Notification> unread = notificationRepositroy.findByRecipientRoleAndIsReadFalse(role);
	 
	 for(Notification n : unread)
	 {
		 n.setRead(true);
	 }
	 
	 notificationRepositroy.saveAll(unread);
		
	}




}



