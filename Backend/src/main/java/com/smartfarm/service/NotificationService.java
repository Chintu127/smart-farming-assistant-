package com.smartfarm.service;

import java.util.List;



import com.smartfarm.entity.Notification;
import com.smartfarm.entity.Role;


public interface NotificationService {

	

	public Notification sendNotifications(String title, String message, Role role);
	
	public List<Notification> getFarmernotifications();

	public long getUnreadCount(Role role);

	public void markAllAsRead(Role role);



	


}
