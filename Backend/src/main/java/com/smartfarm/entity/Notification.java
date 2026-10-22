package com.smartfarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Notification {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	@Column(length = 1000)
	private String message;
	
	private LocalDateTime timestamp;
	
	@Enumerated(EnumType.STRING)
	private Role recipientRole;
	
    
	@Column(name = "is_read" ,nullable = false)
	private boolean isRead = false;
	
	@PrePersist
	public void onCreate() {
		timestamp = LocalDateTime.now();
	}
	
	

}
