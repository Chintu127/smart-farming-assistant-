package com.smartfarm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smartfarm.dto.FarmRequest;
import com.smartfarm.dto.FarmResponse;
import com.smartfarm.entity.Farm;
import com.smartfarm.entity.User;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.repository.UserRepository;
import com.smartfarm.service.FarmService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmServiceImpl implements FarmService
{
	
	private final FarmRepositorty farmRepository;
	private final UserRepository userRepository;
	private final GeocodingServiceImp geocodingService;
	
	
	@Override
	public FarmResponse addFarm(FarmRequest request, String username) {
	    User user = userRepository.findByUsername(username)
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    // Handle null latitude/longitude from request
	    Double reqLat = request.getLatitude();
	    Double reqLon = request.getLongitude();
	    double lat, lon;

	    if (reqLat == null || reqLon == null) {
	        System.out.println("Coordinates not provided in request, using geocoding...");
	        double[] coordinates = geocodingService.getCoordinates(request.getLocation());
	        lat = coordinates[0];
	        lon = coordinates[1];
	    } else {
	        lat = reqLat;
	        lon = reqLon;
	    }

	    Farm farm = Farm.builder()
	            .farmName(request.getFarmName())
	            .location(request.getLocation())
	            .sizeInAcres(request.getSizeInAcres())
	            .latitude(lat)
	            .longitude(lon)
	            .user(user)
	            .build();

	    farmRepository.save(farm);
	    System.out.println("Saved farm: " + farm);
	    System.out.println("Saved farm with lat: " + lat + ", lon: " + lon);

	    return new FarmResponse(farm.getId(), farm.getFarmName(), farm.getLocation(),
	            farm.getSizeInAcres(), farm.getLatitude(), farm.getLongitude());
	}
	
	@Override
	public List<FarmResponse> getFarmsByUser(String username) 
	{
		 User user=userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
		 
		 return farmRepository.findByUser(user).stream()
		     .map(farm -> new FarmResponse(farm.getId() , farm.getFarmName() , farm.getLocation() , farm.getSizeInAcres() , farm.getLatitude() , farm.getLongitude()))
		     .collect(Collectors.toList());
	}

	@Override
	public FarmResponse updateFarm(Long id, FarmRequest request, String username) 
	{
		Farm farm=farmRepository.findById(id).orElseThrow(()-> new RuntimeException ("Farm not found"));
		
		if(!farm.getUser().getUsername().equals(username))
		{
			throw new RuntimeException("Unauthorized");
		}
		
		double latitude = request.getLatitude();
		double longitude = request.getLongitude();
		
		if(latitude == 0.0 || longitude == 0.0)
		{
			System.out.println("Latitude and longitude not provided , fetching from opencage...");
			double[]coordinates =
					geocodingService.getCoordinates(request.getLocation());
			latitude = coordinates[0];
			longitude = coordinates[1];
			System.out.println("Fetched coordinates:" + latitude + "," + longitude);
		}
		
		farm.setFarmName(request.getFarmName());
		farm.setLocation(request.getLocation());
		farm.setSizeInAcres(request.getSizeInAcres());
		farm.setLatitude(request.getLatitude());
		farm.setLongitude(request.getLongitude());
		
		farmRepository.save(farm);
			
		return new FarmResponse(farm.getId() , farm.getFarmName() , farm.getLocation() , farm.getSizeInAcres() , farm.getLatitude() , farm.getLongitude());
	}

	@Override
	public void deleteFarm(Long id, String username) 
	{
		Farm farm = farmRepository.findById(id).orElseThrow(()-> new RuntimeException ("Farm not found"));
		
		if(!farm.getUser().getUsername().equals(username))
		{
			throw new RuntimeException("unauthorized");
		}
		
		farmRepository.delete(farm);
		
	}

	@Override
	public List<Farm> getFarmsByUserId(Long userid) 
	{
        User user = userRepository.findById(userid).orElseThrow(()-> new RuntimeException ("user not found"));
		return farmRepository.findByUser(user);
	}

              

}
