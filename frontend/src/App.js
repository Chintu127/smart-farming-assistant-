import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile";
import Farm from "./components/Farm";
import Crop from "./components/Crop";
import Soil from "./components/Soil";
import GovernmentScheme from "./components/GovernmentScheme";
import AddScheme from "./components/AddScheme";
import WeatherViewer from "./components/WeatherViewer";
import WeatherPage from "./components/WeatherPage";
import FarmerQueries from "./components/FarmerQueries";
import Expert from "./components/Expert";
import CropGuideManager from "./components/CropGuideManager";
import CropGuideView from "./components/CropGuideView";
import AdminNotificationManager from "./components/AdminNotificationManager";
import FarmerNotificationViewer from "./components/FarmerNotificationViewer";
import AdminDashboard from "./components/AdminDashboard";
import CropRecommendation from "./components/CropRecommendation";
import SoilFertilizerGuidance from "./components/SoilFertilizerGuidance";
import PestDiseaseAssistance from "./components/PestDiseaseAssistance";
import MarketPrices from "./components/MarketPrices";
import FarmingTips from "./components/FarmingTips";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Layout with Navbar */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/farms" element={<Farm />} />
        <Route path="/crops" element={<Crop />} />
        <Route path="/soil/:farmId" element={<Soil />} />
        <Route path="/schemes" element={<GovernmentScheme />} />
        <Route path="/schemes/add" element={<AddScheme />} />
        <Route path="/weather/:farmId" element={<WeatherViewer />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/farmerqueries" element={<FarmerQueries />} />
        <Route path="/expert" element={<Expert />} />
        <Route path="/cropguide" element={<CropGuideManager />} />
        <Route path="/cropguideview" element={<CropGuideView />} />
        <Route path="/adminNotificationManager" element={<AdminNotificationManager />} />
        <Route path="/farmernotificationViewer" element={<FarmerNotificationViewer />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        {/* Smart Farmer Assistant New Features */}
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/soil-fertilizer" element={<SoilFertilizerGuidance />} />
        <Route path="/pest-disease" element={<PestDiseaseAssistance />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/farming-tips" element={<FarmingTips />} />
      </Route>
    </Routes>
  );
}

export default App;
