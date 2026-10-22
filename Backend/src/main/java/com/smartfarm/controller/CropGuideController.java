package com.smartfarm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartfarm.entity.CropGuide;
import com.smartfarm.repository.CropGuideRepository;

@RestController
@RequestMapping("/api/cropguide")
public class CropGuideController {
	
	@Autowired
	private CropGuideRepository cropGuideRepository;
	
	   // ✅ Public - all users (farmer, expert, guest) can view crop guide
    @GetMapping("/all")
    public List<CropGuide> getAllGuides() {
        return cropGuideRepository.findAll();
    }

    // ✅ Admin - Add a new crop guide entry
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public CropGuide addGuide(@RequestBody CropGuide guide) {
        return cropGuideRepository.save(guide);
    }

    // ✅ Admin - Update crop guide
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CropGuide> updateGuide(@PathVariable Long id, @RequestBody CropGuide updated) {
        Optional<CropGuide> optional =cropGuideRepository.findById(id);
        if (optional.isPresent()) {
            CropGuide guide = optional.get();
            guide.setCrop(updated.getCrop());
            guide.setSeason(updated.getSeason());
            guide.setPlanting(updated.getPlanting());
            guide.setHarvesting(updated.getHarvesting());
            guide.setTip(updated.getTip());
            return ResponseEntity.ok(cropGuideRepository.save(guide));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Admin - Delete
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
      public ResponseEntity<?> deleteGuide(@PathVariable Long id)
      {
    	  cropGuideRepository.deleteById(id);
    	  return ResponseEntity.ok("Deleted successfully!");
      }
}
