// CGWB-based groundwater data for India
// Source: Central Ground Water Board (CGWB) - India
// Data based on CGWB Ground Water Year Book and Dynamic Ground Water Resources reports

export interface AquiferData {
  state: string;
  region: string;
  aquiferType: string;
  depthToWater: number; // meters bgl (below ground level)
  depthRange: string;
  aquiferThickness: number; // meters
  specificYield: number; // fraction
  hydraulicConductivity: number; // m/day
  waterQuality: string;
  rechargePotential: "High" | "Medium" | "Low";
  annualGroundwaterRecharge: number; // BCM (Billion Cubic Meters)
  groundwaterExtraction: number; // BCM
  stageOfExtraction: number; // percentage
  category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  lat: number;
  lon: number;
}

export interface RainfallData {
  state: string;
  district: string;
  annualRainfall: number; // mm
  monsoonRainfall: number; // mm
  preMonsooonRainfall: number; // mm
  postMonsoonRainfall: number; // mm
  rainyDays: number;
  lat: number;
  lon: number;
}

// CGWB District-wise groundwater data (representative values from CGWB reports)
export const CGWB_AQUIFER_DATA: AquiferData[] = [
  // Maharashtra
  {
    state: "Maharashtra", region: "Mumbai", aquiferType: "Basaltic Fractured Rock",
    depthToWater: 8.5, depthRange: "5-15m", aquiferThickness: 25,
    specificYield: 0.02, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.12,
    groundwaterExtraction: 0.09, stageOfExtraction: 75, category: "Safe",
    lat: 19.076, lon: 72.877
  },
  {
    state: "Maharashtra", region: "Pune", aquiferType: "Deccan Basalt",
    depthToWater: 12.3, depthRange: "8-20m", aquiferThickness: 30,
    specificYield: 0.015, hydraulicConductivity: 1.8, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.18,
    groundwaterExtraction: 0.15, stageOfExtraction: 83, category: "Semi-Critical",
    lat: 18.520, lon: 73.856
  },
  // Delhi
  {
    state: "Delhi", region: "New Delhi", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 25.6, depthRange: "20-35m", aquiferThickness: 80,
    specificYield: 0.18, hydraulicConductivity: 25, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.29,
    groundwaterExtraction: 0.52, stageOfExtraction: 179, category: "Over-Exploited",
    lat: 28.613, lon: 77.209
  },
  // Rajasthan
  {
    state: "Rajasthan", region: "Jaipur", aquiferType: "Alluvial + Hard Rock",
    depthToWater: 35.2, depthRange: "25-50m", aquiferThickness: 45,
    specificYield: 0.08, hydraulicConductivity: 5, waterQuality: "Brackish in parts",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.08,
    groundwaterExtraction: 0.12, stageOfExtraction: 150, category: "Over-Exploited",
    lat: 26.912, lon: 75.787
  },
  {
    state: "Rajasthan", region: "Jodhpur", aquiferType: "Hard Rock Fractured",
    depthToWater: 48.5, depthRange: "35-70m", aquiferThickness: 35,
    specificYield: 0.05, hydraulicConductivity: 3, waterQuality: "High Fluoride",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.04,
    groundwaterExtraction: 0.07, stageOfExtraction: 175, category: "Over-Exploited",
    lat: 26.292, lon: 73.014
  },
  // Tamil Nadu
  {
    state: "Tamil Nadu", region: "Chennai", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.4, depthRange: "10-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Saline near coast",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.15,
    groundwaterExtraction: 0.18, stageOfExtraction: 120, category: "Over-Exploited",
    lat: 13.083, lon: 80.270
  },
  {
    state: "Tamil Nadu", region: "Coimbatore", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.2, depthRange: "10-25m", aquiferThickness: 22,
    specificYield: 0.03, hydraulicConductivity: 4, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.22,
    groundwaterExtraction: 0.19, stageOfExtraction: 86, category: "Semi-Critical",
    lat: 11.017, lon: 76.966
  },
  // Karnataka
  {
    state: "Karnataka", region: "Bengaluru", aquiferType: "Peninsular Gneiss",
    depthToWater: 22.8, depthRange: "15-35m", aquiferThickness: 18,
    specificYield: 0.02, hydraulicConductivity: 2, waterQuality: "Moderate",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.12,
    groundwaterExtraction: 0.14, stageOfExtraction: 116, category: "Over-Exploited",
    lat: 12.972, lon: 77.594
  },
  // Gujarat
  {
    state: "Gujarat", region: "Ahmedabad", aquiferType: "Alluvial",
    depthToWater: 30.5, depthRange: "20-45m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.25,
    groundwaterExtraction: 0.22, stageOfExtraction: 88, category: "Semi-Critical",
    lat: 23.023, lon: 72.572
  },
  {
    state: "Gujarat", region: "Surat", aquiferType: "Alluvial/Coastal",
    depthToWater: 12.3, depthRange: "8-20m", aquiferThickness: 40,
    specificYield: 0.15, hydraulicConductivity: 22, waterQuality: "Slightly Saline",
    rechargePotential: "High", annualGroundwaterRecharge: 0.32,
    groundwaterExtraction: 0.18, stageOfExtraction: 56, category: "Safe",
    lat: 21.170, lon: 72.831
  },
  // UP
  {
    state: "Uttar Pradesh", region: "Lucknow", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 15.8, depthRange: "10-25m", aquiferThickness: 150,
    specificYield: 0.20, hydraulicConductivity: 35, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.65,
    groundwaterExtraction: 0.48, stageOfExtraction: 73, category: "Safe",
    lat: 26.846, lon: 80.946
  },
  {
    state: "Uttar Pradesh", region: "Agra", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 20.4, depthRange: "15-30m", aquiferThickness: 120,
    specificYield: 0.18, hydraulicConductivity: 28, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.42,
    groundwaterExtraction: 0.38, stageOfExtraction: 90, category: "Semi-Critical",
    lat: 27.177, lon: 78.008
  },
  // Punjab
  {
    state: "Punjab", region: "Ludhiana", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-40m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.18,
    groundwaterExtraction: 0.32, stageOfExtraction: 178, category: "Over-Exploited",
    lat: 30.901, lon: 75.857
  },
  // Telangana
  {
    state: "Telangana", region: "Hyderabad", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-30m", aquiferThickness: 25,
    specificYield: 0.025, hydraulicConductivity: 3, waterQuality: "Fluoride affected",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.14,
    groundwaterExtraction: 0.12, stageOfExtraction: 85, category: "Semi-Critical",
    lat: 17.385, lon: 78.487
  },
  // West Bengal
  {
    state: "West Bengal", region: "Kolkata", aquiferType: "Bengal Delta Alluvial",
    depthToWater: 8.2, depthRange: "5-15m", aquiferThickness: 200,
    specificYield: 0.25, hydraulicConductivity: 50, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.95,
    groundwaterExtraction: 0.52, stageOfExtraction: 54, category: "Safe",
    lat: 22.573, lon: 88.364
  },
  // Madhya Pradesh
  {
    state: "Madhya Pradesh", region: "Bhopal", aquiferType: "Deccan Basalt",
    depthToWater: 14.5, depthRange: "10-22m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.20,
    groundwaterExtraction: 0.14, stageOfExtraction: 70, category: "Safe",
    lat: 23.259, lon: 77.413
  },
  // Haryana
  {
    state: "Haryana", region: "Gurugram", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.5, depthRange: "25-45m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30, waterQuality: "High TDS",
    rechargePotential: "High", annualGroundwaterRecharge: 0.15,
    groundwaterExtraction: 0.28, stageOfExtraction: 187, category: "Over-Exploited",
    lat: 28.459, lon: 77.026
  },
  // Kerala
  {
    state: "Kerala", region: "Kochi", aquiferType: "Laterite/Coastal Alluvial",
    depthToWater: 5.8, depthRange: "3-12m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.48,
    groundwaterExtraction: 0.22, stageOfExtraction: 45, category: "Safe",
    lat: 9.932, lon: 76.267
  },
  // Bihar
  {
    state: "Bihar", region: "Patna", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 6.5, depthRange: "4-12m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40, waterQuality: "Arsenic affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.20,
    groundwaterExtraction: 0.58, stageOfExtraction: 48, category: "Safe",
    lat: 25.595, lon: 85.137
  },
];

// Annual Rainfall data - IMD (India Meteorological Department)
export const IMD_RAINFALL_DATA: RainfallData[] = [
  { state: "Maharashtra", district: "Mumbai", annualRainfall: 2422, monsoonRainfall: 2100, preMonsooonRainfall: 150, postMonsoonRainfall: 172, rainyDays: 96, lat: 19.076, lon: 72.877 },
  { state: "Maharashtra", district: "Pune", annualRainfall: 722, monsoonRainfall: 610, preMonsooonRainfall: 55, postMonsoonRainfall: 57, rainyDays: 52, lat: 18.520, lon: 73.856 },
  { state: "Delhi", district: "New Delhi", annualRainfall: 714, monsoonRainfall: 598, preMonsooonRainfall: 55, postMonsoonRainfall: 61, rainyDays: 43, lat: 28.613, lon: 77.209 },
  { state: "Rajasthan", district: "Jaipur", annualRainfall: 650, monsoonRainfall: 560, preMonsooonRainfall: 40, postMonsoonRainfall: 50, rainyDays: 35, lat: 26.912, lon: 75.787 },
  { state: "Rajasthan", district: "Jodhpur", annualRainfall: 362, monsoonRainfall: 300, preMonsooonRainfall: 28, postMonsoonRainfall: 34, rainyDays: 22, lat: 26.292, lon: 73.014 },
  { state: "Tamil Nadu", district: "Chennai", annualRainfall: 1400, monsoonRainfall: 800, preMonsooonRainfall: 100, postMonsoonRainfall: 500, rainyDays: 58, lat: 13.083, lon: 80.270 },
  { state: "Tamil Nadu", district: "Coimbatore", annualRainfall: 650, monsoonRainfall: 420, preMonsooonRainfall: 80, postMonsoonRainfall: 150, rainyDays: 45, lat: 11.017, lon: 76.966 },
  { state: "Karnataka", district: "Bengaluru", annualRainfall: 970, monsoonRainfall: 720, preMonsooonRainfall: 120, postMonsoonRainfall: 130, rainyDays: 60, lat: 12.972, lon: 77.594 },
  { state: "Gujarat", district: "Ahmedabad", annualRainfall: 782, monsoonRainfall: 680, preMonsooonRainfall: 52, postMonsoonRainfall: 50, rainyDays: 38, lat: 23.023, lon: 72.572 },
  { state: "Gujarat", district: "Surat", annualRainfall: 1143, monsoonRainfall: 960, preMonsooonRainfall: 80, postMonsoonRainfall: 103, rainyDays: 55, lat: 21.170, lon: 72.831 },
  { state: "Uttar Pradesh", district: "Lucknow", annualRainfall: 1027, monsoonRainfall: 820, preMonsooonRainfall: 80, postMonsoonRainfall: 127, rainyDays: 54, lat: 26.846, lon: 80.946 },
  { state: "Uttar Pradesh", district: "Agra", annualRainfall: 685, monsoonRainfall: 580, preMonsooonRainfall: 50, postMonsoonRainfall: 55, rainyDays: 38, lat: 27.177, lon: 78.008 },
  { state: "Punjab", district: "Ludhiana", annualRainfall: 678, monsoonRainfall: 520, preMonsooonRainfall: 68, postMonsoonRainfall: 90, rainyDays: 40, lat: 30.901, lon: 75.857 },
  { state: "Telangana", district: "Hyderabad", annualRainfall: 812, monsoonRainfall: 660, preMonsooonRainfall: 65, postMonsoonRainfall: 87, rainyDays: 48, lat: 17.385, lon: 78.487 },
  { state: "West Bengal", district: "Kolkata", annualRainfall: 1800, monsoonRainfall: 1400, preMonsooonRainfall: 150, postMonsoonRainfall: 250, rainyDays: 75, lat: 22.573, lon: 88.364 },
  { state: "Madhya Pradesh", district: "Bhopal", annualRainfall: 1146, monsoonRainfall: 920, preMonsooonRainfall: 88, postMonsoonRainfall: 138, rainyDays: 62, lat: 23.259, lon: 77.413 },
  { state: "Haryana", district: "Gurugram", annualRainfall: 714, monsoonRainfall: 590, preMonsooonRainfall: 60, postMonsoonRainfall: 64, rainyDays: 36, lat: 28.459, lon: 77.026 },
  { state: "Kerala", district: "Kochi", annualRainfall: 3100, monsoonRainfall: 2200, preMonsooonRainfall: 350, postMonsoonRainfall: 550, rainyDays: 120, lat: 9.932, lon: 76.267 },
  { state: "Bihar", district: "Patna", annualRainfall: 1085, monsoonRainfall: 880, preMonsooonRainfall: 88, postMonsoonRainfall: 117, rainyDays: 58, lat: 25.595, lon: 85.137 },
];

// Runoff coefficients by roof material (CGWB standards)
export const RUNOFF_COEFFICIENTS: Record<string, number> = {
  "RCC/Concrete Flat": 0.85,
  "Tiled/Sloped": 0.80,
  "Metal/Galvanized Iron": 0.90,
  "Asphalt/Bitumen": 0.82,
  "Grass/Green Roof": 0.30,
  "Gravel": 0.45,
};

// Recharge pit/trench design parameters (based on CGWB technical manual)
export const RECHARGE_STRUCTURE_PARAMS = {
  recharge_pit: {
    name: "Recharge Pit",
    suitable_for: "Small rooftop areas < 100 sqm",
    typical_depth: 1.5, // meters
    typical_width: 1.5,
    typical_length: 1.5,
    cost_per_unit_inr: 8000,
    filter_media: "Gravel, Sand, Charcoal",
    lifespan_years: 15,
  },
  recharge_trench: {
    name: "Recharge Trench",
    suitable_for: "Medium areas 100-500 sqm",
    typical_depth: 1.5,
    typical_width: 0.6,
    cost_per_meter_inr: 1500,
    filter_media: "Boulder, Gravel, Sand",
    lifespan_years: 20,
  },
  recharge_shaft: {
    name: "Recharge Shaft/Borewell",
    suitable_for: "Areas with deep water table > 20m",
    typical_diameter: 0.3,
    typical_depth: 30,
    cost_per_unit_inr: 35000,
    filter_media: "Sand Filter + Silt Chamber",
    lifespan_years: 25,
  },
  percolation_tank: {
    name: "Percolation Tank",
    suitable_for: "Open spaces > 500 sqm",
    typical_capacity_liters: 50000,
    cost_per_unit_inr: 150000,
    lifespan_years: 30,
  },
};

// Government subsidies data - National Water Mission / State Governments
export const SUBSIDY_DATA = [
  { state: "Delhi", scheme: "Rainwater Harvesting Incentive", discount_percent: 10, details: "10% rebate on property tax for buildings with functional RTRWH", authority: "Delhi Jal Board", url: "https://delhijalboard.delhi.gov.in" },
  { state: "Maharashtra", scheme: "Jal Yukta Shivar / RTRWH Subsidy", discount_percent: 30, details: "Subsidy up to ₹10,000 for construction of RTRWH structures", authority: "GSDA Maharashtra", url: "https://gsda.maharashtra.gov.in" },
  { state: "Tamil Nadu", scheme: "RTRWH Mandatory + Subsidy", discount_percent: 25, details: "Subsidy for rooftop structures; mandatory for plots > 2400 sqft", authority: "TWAD Board", url: "https://www.twadboard.gov.in" },
  { state: "Karnataka", scheme: "BBMP RTRWH Scheme", discount_percent: 20, details: "₹5000 subsidy + free technical assistance for RTRWH installation", authority: "BBMP / BWSSB", url: "https://bwssb.gov.in" },
  { state: "Gujarat", scheme: "Sujalam Sufalam Jal Abhiyan", discount_percent: 35, details: "Up to 35% subsidy under state water conservation scheme", authority: "Gujarat Water Supply Board", url: "https://gwssb.guj.nic.in" },
  { state: "Rajasthan", scheme: "Mukhyamantri Jal Swavlamban Abhiyan", discount_percent: 40, details: "50-60% subsidy for structures in notified blocks", authority: "PHED Rajasthan", url: "https://phed.rajasthan.gov.in" },
  { state: "Kerala", scheme: "Jalasree Programme", discount_percent: 25, details: "Subsidy for rooftop collection in drought-prone areas", authority: "Kerala Water Authority", url: "https://www.kwa.kerala.gov.in" },
  { state: "Punjab", scheme: "Water Conservation Fund Scheme", discount_percent: 20, details: "Subsidy under national groundwater conservation", authority: "Punjab Water Supply Dept", url: "https://waterresources.punjab.gov.in" },
  { state: "Other", scheme: "National Water Mission", discount_percent: 15, details: "Central Government 15% subsidy on approved RTRWH systems", authority: "Ministry of Jal Shakti", url: "https://jalshakti-dowr.gov.in" },
];

// Find nearest data point by coordinates
export function findNearestAquifer(lat: number, lon: number): AquiferData {
  let nearest = CGWB_AQUIFER_DATA[0];
  let minDist = Infinity;
  for (const d of CGWB_AQUIFER_DATA) {
    const dist = Math.sqrt(Math.pow(d.lat - lat, 2) + Math.pow(d.lon - lon, 2));
    if (dist < minDist) { minDist = dist; nearest = d; }
  }
  return nearest;
}

export function findNearestRainfall(lat: number, lon: number): RainfallData {
  let nearest = IMD_RAINFALL_DATA[0];
  let minDist = Infinity;
  for (const d of IMD_RAINFALL_DATA) {
    const dist = Math.sqrt(Math.pow(d.lat - lat, 2) + Math.pow(d.lon - lon, 2));
    if (dist < minDist) { minDist = dist; nearest = d; }
  }
  return nearest;
}

export function findSubsidy(state: string) {
  return SUBSIDY_DATA.find(s => s.state === state) || SUBSIDY_DATA.find(s => s.state === "Other")!;
}
