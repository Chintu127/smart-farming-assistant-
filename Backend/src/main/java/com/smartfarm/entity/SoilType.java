package com.smartfarm.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SoilType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private double minPh;
	private double maxPh;
	
	@Column(length = 1000)
	private String nutrients;
	
	private String texture;
	
	private String fertility;
	
	@OneToMany(mappedBy = "soilType" , cascade = CascadeType.ALL)
	private List<CropSuggestion>cropSuggestions;
	
	

}
