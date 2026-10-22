package com.smartfarm.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.smartfarm.entity.*;
import com.smartfarm.repository.*;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

	private final SoilTypeRepository soilRepository;
	private final CropSuggestionRepository cropRepository;
	private final UserRepository userRepository;
	private final FarmRepositorty farmRepository;
	private final SoilRepository farmSoilRepository;
	private final CropRepository farmCropRepository;
	private final CropGuideRepository cropGuideRepository;
	private final GovernmentSchemeRepository schemeRepository;
	private final ExpertQueryRepository expertQueryRepository;
	private final NotificationRepository notificationRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		// 1. Seed Soil Types and Crop Suggestions
		if (soilRepository.count() == 0) {
			SoilType loamy = soilRepository.save(SoilType.builder()
					.name("Loamy Soil")
					.minPh(6.0)
					.maxPh(7.5)
					.nutrients("Nitrogen, Phosphorus, Potassium")
					.texture("Balanced sand, silt, and clay")
					.fertility("High")
					.build());

			SoilType sandy = soilRepository.save(SoilType.builder()
					.name("Sandy Soil")
					.minPh(5.5)
					.maxPh(6.5)
					.nutrients("Low organic matter, fast draining")
					.texture("Loose and gritty")
					.fertility("Low")
					.build());

			SoilType clay = soilRepository.save(SoilType.builder()
					.name("Clay Soil")
					.minPh(5.0)
					.maxPh(6.0)
					.nutrients("Rich in minerals, slow draining")
					.texture("Heavy and sticky")
					.fertility("Medium")
					.build());

			SoilType black = soilRepository.save(SoilType.builder()
					.name("Black Soil")
					.minPh(6.0)
					.maxPh(8.0)
					.nutrients("Rich in minerals, High in iron, magnesium, lime")
					.texture("Clayey, high water retention")
					.fertility("High")
					.build());

			cropRepository.saveAll(List.of(
					// Loamy
					CropSuggestion.builder().cropName("Wheat").soilType(loamy).build(),
					CropSuggestion.builder().cropName("Sugarcane").soilType(loamy).build(),
					CropSuggestion.builder().cropName("Maize").soilType(loamy).build(),
					CropSuggestion.builder().cropName("Tomato").soilType(loamy).build(),

					// Sandy
					CropSuggestion.builder().cropName("Groundnut").soilType(sandy).build(),
					CropSuggestion.builder().cropName("Potato").soilType(sandy).build(),
					CropSuggestion.builder().cropName("Watermelon").soilType(sandy).build(),

					// Clay
					CropSuggestion.builder().cropName("Paddy (Rice)").soilType(clay).build(),
					CropSuggestion.builder().cropName("Mustard").soilType(clay).build(),
					CropSuggestion.builder().cropName("Jute").soilType(clay).build(),

					// Black
					CropSuggestion.builder().cropName("Cotton").soilType(black).build(),
					CropSuggestion.builder().cropName("Soybean").soilType(black).build(),
					CropSuggestion.builder().cropName("Sorghum (Jowar)").soilType(black).build(),
					CropSuggestion.builder().cropName("Chilli").soilType(black).build()
			));

			System.out.println("✅ Soil and Crop suggestions seeded!");
		}

		// 2. Seed Default Accounts (Farmer, Expert, Admin)
		User farmer1 = null;
		if (userRepository.findByUsername("farmer1").isEmpty()) {
			farmer1 = userRepository.save(User.builder()
					.username("farmer1")
					.password(passwordEncoder.encode("password123"))
					.role(Role.FARMER)
					.firstname("Ramesh")
					.lastname("Patel")
					.address("Plot 12, Krishi Marg, Guntur Rural")
					.phoneNumber("9876543210")
					.location("Guntur, Andhra Pradesh")
					.build());

			userRepository.save(User.builder()
					.username("farmer2")
					.password(passwordEncoder.encode("password123"))
					.role(Role.FARMER)
					.firstname("Suresh")
					.lastname("Reddy")
					.address("Village Narsampet, Warangal")
					.phoneNumber("9848012345")
					.location("Warangal, Telangana")
					.build());

			userRepository.save(User.builder()
					.username("expert1")
					.password(passwordEncoder.encode("password123"))
					.role(Role.EXPERT)
					.firstname("Dr. K.")
					.lastname("Swaminathan")
					.address("Central Agricultural Research Centre")
					.phoneNumber("9123456789")
					.location("Hyderabad, Telangana")
					.build());

			userRepository.save(User.builder()
					.username("admin1")
					.password(passwordEncoder.encode("password123"))
					.role(Role.ADMIN)
					.firstname("Viksit Bharat")
					.lastname("Administrator")
					.address("Ministry of Agriculture & Farmers Welfare, Krishi Bhavan")
					.phoneNumber("9000011122")
					.location("New Delhi, India")
					.build());

			System.out.println("✅ Default Users (farmer1, farmer2, expert1, admin1) seeded!");
		} else {
			farmer1 = userRepository.findByUsername("farmer1").orElse(null);
		}

		// 3. Seed Farms, Soils, and Crops for farmer1
		Farm farm1 = null;
		if (farmer1 != null && farmRepository.findByUser(farmer1).isEmpty()) {
			farm1 = farmRepository.save(Farm.builder()
					.farmName("Krishna River Green Valley")
					.location("Guntur, Andhra Pradesh")
					.sizeInAcres(6.5)
					.latitude(16.3067)
					.longitude(80.4365)
					.user(farmer1)
					.build());

			farmSoilRepository.save(Soil.builder()
					.type("Black Cotton Soil")
					.phLevel(6.8)
					.nutrients("Available N: 240 kg/ha, P2O5: 45 kg/ha, K2O: 310 kg/ha")
					.farm(farm1)
					.build());

			farmCropRepository.save(Crop.builder()
					.cropType("Cash Crop")
					.cropName("Bt Cotton")
					.season("Kharif 2026")
					.yeild(18.5)
					.farm(farm1)
					.build());

			farmCropRepository.save(Crop.builder()
					.cropType("Spice Crop")
					.cropName("Guntur Red Chilli")
					.season("Rabi 2026")
					.yeild(12.0)
					.farm(farm1)
					.build());

			System.out.println("✅ Sample Farm, Soil, and Crops seeded for farmer1!");
		}

		// 4. Seed Government Schemes
		if (schemeRepository.count() == 0) {
			schemeRepository.saveAll(List.of(
					GovernmentScheme.builder()
							.title("Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)")
							.description("Direct income support of ₹6,000 per year transferred directly into the bank accounts of eligible landholder farmer families across India in three equal 4-monthly installments.")
							.startDate(LocalDate.of(2026, 1, 1))
							.endDate(LocalDate.of(2027, 12, 31))
							.eligibility("All small and marginal landholding farmer families with cultivable land up to 2 hectares.")
							.region("National (All India)")
							.build(),

					GovernmentScheme.builder()
							.title("Pradhan Mantri Fasal Bima Yojana (PMFBY)")
							.description("Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest. Premium: 2% for Kharif, 1.5% for Rabi, and 5% for horticultural crops.")
							.startDate(LocalDate.of(2026, 4, 1))
							.endDate(LocalDate.of(2027, 3, 31))
							.eligibility("All farmers growing notified crops in notified areas including sharecroppers and tenant farmers.")
							.region("National (All India)")
							.build(),

					GovernmentScheme.builder()
							.title("National Mission for Sustainable Agriculture (NMSA) - Micro Irrigation")
							.description("Financial subsidy up to 90% for drip irrigation and sprinkler systems to improve water-use efficiency and promote sustainable farming.")
							.startDate(LocalDate.of(2026, 2, 1))
							.endDate(LocalDate.of(2027, 6, 30))
							.eligibility("Farmers possessing operational agricultural land with access to water source.")
							.region("All States & UTs")
							.build(),

					GovernmentScheme.builder()
							.title("Soil Health Card Scheme")
							.description("Free cycle soil health cards issued every two years with customized dosage guidance for 12 essential nutrients and crop-specific fertilizer recommendations.")
							.startDate(LocalDate.of(2026, 1, 1))
							.endDate(LocalDate.of(2027, 12, 31))
							.eligibility("Open to all registered agricultural farmers.")
							.region("Pan India")
							.build(),

					GovernmentScheme.builder()
							.title("Sub-Mission on Agricultural Mechanization (SMAM)")
							.description("Subsidies ranging from 40% to 50% for purchasing tractors, power tillers, rotavators, and laser land levelers for modern mechanized farming.")
							.startDate(LocalDate.of(2026, 3, 1))
							.endDate(LocalDate.of(2027, 3, 31))
							.eligibility("Small & marginal farmers, women farmers, and farmer producer organizations (FPOs).")
							.region("Pan India")
							.build()
			));
			System.out.println("✅ Government Schemes seeded!");
		}

		// 5. Seed Crop Guides
		if (cropGuideRepository.count() == 0) {
			cropGuideRepository.saveAll(List.of(
					CropGuide.builder()
							.crop("Paddy (Rice)")
							.Season("Kharif (June - Nov)")
							.planting("Nursery in June, Transplanting in July at 20x15 cm spacing")
							.harvesting("October - November when 80% grains turn golden")
							.tip("Maintain 2-3 cm standing water during tillering stage. Apply Zinc Sulphate 25 kg/ha at basal.")
							.build(),

					CropGuide.builder()
							.crop("Wheat")
							.Season("Rabi (Oct - April)")
							.planting("Mid-November with seed drill at 20-22 cm row distance")
							.harvesting("Late March - April when straw turns dry and yellow")
							.tip("Irrigation at Crown Root Initiation (CRI) 21 days after sowing is mandatory for bumper yield.")
							.build(),

					CropGuide.builder()
							.crop("Bt Cotton")
							.Season("Kharif (May - Dec)")
							.planting("May - June with onset of monsoon; spacing 90x60 cm")
							.harvesting("October - December in 3 to 4 pickings")
							.tip("Monitor for sucking pests and pink bollworm. Install pheromone traps @ 5 per acre.")
							.build(),

					CropGuide.builder()
							.crop("Groundnut (Peanut)")
							.Season("Zaid / Summer (Jan - May)")
							.planting("January - February; seed treatment with Trichoderma viride")
							.harvesting("April - May when inner shell displays dark veins")
							.tip("Apply Gypsum @ 400 kg/ha at peg formation stage (40-45 DAS) for superior pod filling.")
							.build(),

					CropGuide.builder()
							.crop("Maize (Corn)")
							.Season("Kharif / Rabi")
							.planting("June - July or October; spacing 60x20 cm")
							.harvesting("90-105 days after sowing when husk leaves dry")
							.tip("Ensure soil does not stay waterlogged. Apply Nitrogen in 3 splits (basal, knee-high, tasseling).")
							.build()
			));
			System.out.println("✅ Crop Guides seeded!");
		}

		// 6. Seed Expert Queries
		if (expertQueryRepository.count() == 0 && farmer1 != null) {
			expertQueryRepository.save(ExpertQuery.builder()
					.farmer(farmer1)
					.farm(farm1)
					.question("My tomato plants have developed dark brown concentric rings on lower leaves. What fungicide should I spray?")
					.answer("This is Early Blight caused by Alternaria solani. Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L. Remove affected lower leaves and avoid overhead sprinkler watering.")
					.createdAt(LocalDateTime.now().minusDays(2))
					.answeredAt(LocalDateTime.now().minusDays(1))
					.build());

			expertQueryRepository.save(ExpertQuery.builder()
					.farmer(farmer1)
					.farm(farm1)
					.question("What is the recommended fertilizer schedule for cotton at 45 days after sowing?")
					.answer("Apply 25 kg Urea + 10 kg Muriate of Potash (MOP) per acre as side dressing followed by light irrigation. Also spray 19:19:19 @ 5 g/L during peak vegetative growth.")
					.createdAt(LocalDateTime.now().minusDays(3))
					.answeredAt(LocalDateTime.now().minusHours(12))
					.build());

			expertQueryRepository.save(ExpertQuery.builder()
					.farmer(farmer1)
					.farm(farm1)
					.question("Which bio-pesticide works best against stem borer in paddy without harming beneficial insects?")
					.answer(null) // Pending query for expert to answer!
					.createdAt(LocalDateTime.now().minusHours(4))
					.build());

			System.out.println("✅ Expert Queries seeded!");
		}

		// 7. Seed Notifications / Alerts
		if (notificationRepository.count() == 0) {
			notificationRepository.saveAll(List.of(
					Notification.builder()
							.title("🌧️ IMD Weather Alert: Moderate to Heavy Rainfall")
							.message("Meteorological department has issued an alert for moderate to heavy rainfall in Andhra Pradesh & Telangana regions over next 48 hours. Ensure field drainage to protect seedling crops.")
							.recipientRole(Role.FARMER)
							.isRead(false)
							.build(),

					Notification.builder()
							.title("📢 New Subsidy: 90% Drip Irrigation Assistance")
							.message("Registrations are now open under the Viksit Bharat Micro Irrigation scheme on the DBT portal. Small & marginal farmers receive up to 90% direct subsidy.")
							.recipientRole(Role.FARMER)
							.isRead(false)
							.build(),

					Notification.builder()
							.title("🌱 Soil Health Testing Drive")
							.message("Free mobile soil testing vans will visit Guntur and Warangal district mandals this week. Farmers are advised to submit dry core soil samples.")
							.recipientRole(Role.FARMER)
							.isRead(false)
							.build()
			));
			System.out.println("✅ Farmer Notifications seeded!");
		}
	}
}
