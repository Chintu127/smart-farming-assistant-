package com.smartfarm.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Farm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String farmName;
	private String location;
	private double sizeInAcres;
	
	 private Double latitude;
	 private Double longitude;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

}
