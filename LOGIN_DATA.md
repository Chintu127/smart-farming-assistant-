# 🌾 SMART FARMER ASSISTANT
### Digital India Innovation • Viksit Bharat 2047
**Batch No.:** 2B15  
**Academic Year:** 2026–2027  
**Degree / Course:** B.Tech / BE Final Year Project  

---

## 🔐 1. Default Demonstration Login Credentials

The database has been pre-seeded with verified test accounts across all three stakeholder roles. You can either type these credentials or click the **1-Click Quick Demo Login** buttons on the login page:

| Role | Username | Password | Full Name / Profile | Location / Department | Key Features to Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **👨‍🌾 Farmer (Primary)** | `farmer1` | `password123` | Ramesh Patel | Guntur, Andhra Pradesh | Dashboard, Farms, Crop Recommender, Soil/Fertilizer, Pest Doctor, Mandi Prices, Ask Expert |
| **👨‍🌾 Farmer (Secondary)**| `farmer2` | `password123` | Suresh Reddy | Warangal, Telangana | Multi-farmer query submission, Land registration |
| **🧑‍🔬 Agri Expert** | `expert1` | `password123` | Dr. K. Swaminathan | Agri Research Centre, Hyderabad | Answer farmer queries, validate crop advice, review crop guides |
| **🛡️ Admin** | `admin1` | `password123` | Viksit Bharat Admin | Krishi Bhavan, New Delhi | System analytics, Broadcast alerts, Publish Government Schemes |

> 💡 **Self-Registration:** New users can also register freely on `/register` as a Farmer, Expert, or Admin.

---

## 📊 2. Pre-Seeded Sample Data in Database

### A. Pre-Seeded Farmer Profile & Farm (`farmer1`)
- **Farmer Name:** Ramesh Patel
- **Phone:** `+91 98765 43210`
- **Address:** Plot 12, Krishi Marg, Guntur Rural
- **Farm Name:** Krishna River Green Valley
- **Size:** 6.5 Acres
- **Soil Type:** Black Cotton Soil (pH: 6.8, High Potassium, Moderate Phosphorus)
- **Current Crops:** Bt Cotton (Kharif 2026) & Guntur Red Chilli (Rabi 2026)

### B. Pre-Seeded Government Schemes
1. **Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)**: ₹6,000/year direct bank transfer.
2. **Pradhan Mantri Fasal Bima Yojana (PMFBY)**: Low-premium crop insurance protection.
3. **National Mission for Sustainable Agriculture (NMSA) - Micro Irrigation**: Up to 90% drip/sprinkler subsidy.
4. **Soil Health Card Scheme**: Free biennial soil nutrient audits.
5. **Sub-Mission on Agricultural Mechanization (SMAM)**: Subsidies on modern farm implements.

### C. Pre-Seeded Crop Guides
- **Paddy (Rice):** Kharif (June - Nov), 20x15 cm spacing, Zinc Sulphate guidance.
- **Wheat:** Rabi (Oct - April), CRI stage irrigation timing.
- **Bt Cotton:** Kharif (May - Dec), Pheromone trap protocols for pink bollworm.
- **Groundnut:** Summer/Zaid, Gypsum dosage at peg formation.
- **Maize:** Kharif/Rabi, Split nitrogen application schedule.

### D. Pre-Seeded Expert Q&A
- **Q:** *"My tomato plants developed dark brown concentric rings on lower leaves. What should I spray?"*
  - **A (by Dr. Swaminathan):** *"Early Blight (Alternaria solani). Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin @ 1 ml/L. Avoid overhead watering."*
- **Q:** *"What is the recommended fertilizer schedule for cotton at 45 DAS?"*
  - **A (by Dr. Swaminathan):** *"Apply 25 kg Urea + 10 kg MOP per acre as side dressing followed by light irrigation."*
- **Pending Query:** *"Which bio-pesticide works best against stem borer in paddy without harming beneficial insects?"* (Ready for live demo answering by `expert1`).

### E. Pre-Seeded Agricultural Notifications & Alerts
- 🌧️ *IMD Weather Alert: Moderate to Heavy Rainfall in Andhra Pradesh & Telangana.*
- 📢 *New Subsidy Announcement: 90% Drip Irrigation Assistance on DBT Portal.*
- 🌱 *Free Soil Health Testing Drive by KVK Mobile Vans.*

---

## 🚀 3. How to Start the Application

### Option A: One-Click Startup Script (Recommended)
In your terminal, run:
```bash
cd /Users/praneethkumar/Downloads/smartFarm-main
./start.sh
```

### Option B: Run in Separate Terminals
1. **Backend (Java Spring Boot):**
   ```bash
   cd /Users/praneethkumar/Downloads/smartFarm-main/Backend
   export JAVA_HOME=$(/usr/libexec/java_home -v 21 2>/dev/null || /usr/libexec/java_home)
   ./mvnw spring-boot:run
   ```
   *Runs on:* `http://localhost:8080`

2. **Frontend (React):**
   ```bash
   cd /Users/praneethkumar/Downloads/smartFarm-main/frontend
   npm start
   ```
   *Runs on:* `http://localhost:3000`

---

## 🖥️ 4. Active Application URLs

- **Web Application Portal:** [http://localhost:3000](http://localhost:3000)
- **Backend REST API:** [http://localhost:8080](http://localhost:8080)
- **H2 Database Web Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - *JDBC URL:* `jdbc:h2:file:./data/smartfarm`
  - *Username:* `sa`
  - *Password:* *(empty)*

---

## 🎯 5. Step-by-Step Viva / College Project Demo Flow

1. **Homepage & Login (`/`)**:
   - Showcase the **Digital India Innovation & Viksit Bharat 2047** theme branding and Batch 2B15 tags.
   - Click **"🧑‍🌾 Farmer: farmer1 / password123"** to auto-login.
2. **Farmer Dashboard (`/dashboard`)**:
   - Observe personalized greeting for Ramesh Patel.
   - Inspect live local weather widget with telemetry.
   - Demonstrate English / Telugu (**తెలుగు**) language switch in the top ribbon.
3. **Smart Crop Recommendation (`/crop-recommendation`)**:
   - Select Soil Type: *Black Soil*, Season: *Kharif*, Irrigation: *Moderate*.
   - Click *Generate Smart Recommendations*. Observe the rule-based suitability index (e.g., Bt Cotton 95% Match) with agronomic reasons, water needs, and cultivation tips.
4. **Soil & Fertilizer Guidance (`/soil-fertilizer`)**:
   - Enter soil test parameters (Low Nitrogen, Medium Phosphorus, High Potassium, pH 7.2).
   - Click *Calculate Scientific Fertilizer Schedule* to view balanced Urea, DAP, and MOP dosages.
5. **Pest & Disease Doctor (`/pest-disease`)**:
   - Select crop *Tomato*, upload a leaf photo, and enter observed symptoms.
   - Run diagnostic scanner to view the disease match (*Early Blight*), confidence rating, organic remedies, and chemical controls.
6. **Mandi Market Prices (`/market-prices`)**:
   - Search by commodity (*Cotton*, *Chilli*, *Paddy*) and filter by state (*Andhra Pradesh*, *Telangana*).
   - View modal spot prices, min/max ranges, and market trend indicators.
7. **Consult Agri Expert (`/farmerqueries`)**:
   - View previously answered questions.
   - Submit a new question as a farmer.
8. **Expert Answering Flow**:
   - Logout and login as `expert1`.
   - Go to **Expert Panel (`/expert`)**.
   - Review pending queries and submit an expert scientific answer.
9. **Admin Analytics & Alerts Flow**:
   - Logout and login as `admin1`.
   - Visit **Admin Analytics (`/adminDashboard`)** to view user role breakdown and platform activity.
   - Visit **Broadcast Alerts (`/adminNotificationManager`)** to push emergency rainfall alerts to all farmers.
