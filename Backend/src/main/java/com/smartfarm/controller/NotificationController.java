package com.smartfarm.controller;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.entity.Notification;
import com.smartfarm.entity.Role;
import com.smartfarm.service.NotificationService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
	
	private final NotificationService notificationService;
	
    @PostMapping("/send")
	public ResponseEntity<Notification> sendNotification(@RequestBody Map<String , String> payload)
	{
		String title = payload.get("title");
		String message = payload.get("message");
		Role role=Role.valueOf(payload.get("role"));
		
		Notification notification = notificationService.sendNotifications(title, message , role);
		return ResponseEntity.ok(notification);
	}
	
	@GetMapping("/farmer")
	public ResponseEntity<List<Notification>> getFarmerNotification()
	{
		return ResponseEntity.ok(notificationService.getFarmernotifications());
	}
	
	@GetMapping("/{role}unread-count")
	public ResponseEntity<Long> getUnreadCOunt(@PathVariable Role role)
	{
		return ResponseEntity.ok(notificationService.getUnreadCount(role));
	}
	
	@PutMapping("{role}/mark-read")
	public ResponseEntity<Void> markAllAsRead(@PathVariable Role role)
	{
		notificationService.markAllAsRead(role);
		return ResponseEntity.ok().build();
	}
	


}
