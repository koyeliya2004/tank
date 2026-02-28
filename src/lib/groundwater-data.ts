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

// CGWB District-wise groundwater data
// Source: CGWB Dynamic Ground Water Resources of India 2013
// Real district-level data from official CGWB dataset
export const CGWB_AQUIFER_DATA: AquiferData[] = [
  {
    state: "Andhra Pradesh", region: "Srikakulam", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.231,
    groundwaterExtraction: 0.428, stageOfExtraction: 38.0, category: "Safe",
    lat: 18.3, lon: 83.9
  },
  {
    state: "Andhra Pradesh", region: "Vizianagaram", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.005,
    groundwaterExtraction: 0.178, stageOfExtraction: 19.0, category: "Safe",
    lat: 18.11, lon: 83.41
  },
  {
    state: "Andhra Pradesh", region: "Visakhapatnam", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.981,
    groundwaterExtraction: 0.179, stageOfExtraction: 20.0, category: "Safe",
    lat: 17.69, lon: 83.22
  },
  {
    state: "Andhra Pradesh", region: "East Godavari", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.7,
    groundwaterExtraction: 0.43, stageOfExtraction: 28.0, category: "Safe",
    lat: 17.0, lon: 82.0
  },
  {
    state: "Andhra Pradesh", region: "West Godavari", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.704,
    groundwaterExtraction: 0.608, stageOfExtraction: 39.0, category: "Safe",
    lat: 16.75, lon: 81.25
  },
  {
    state: "Andhra Pradesh", region: "Krishna", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.508,
    groundwaterExtraction: 0.548, stageOfExtraction: 40.0, category: "Safe",
    lat: 16.6, lon: 80.83
  },
  {
    state: "Andhra Pradesh", region: "Guntur", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.635,
    groundwaterExtraction: 0.474, stageOfExtraction: 32.0, category: "Safe",
    lat: 16.31, lon: 80.44
  },
  {
    state: "Andhra Pradesh", region: "Prakasam", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.722,
    groundwaterExtraction: 0.527, stageOfExtraction: 34.0, category: "Safe",
    lat: 15.34, lon: 79.6
  },
  {
    state: "Andhra Pradesh", region: "Nellore", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 2.824,
    groundwaterExtraction: 0.803, stageOfExtraction: 31.0, category: "Safe",
    lat: 14.44, lon: 79.99
  },
  {
    state: "Andhra Pradesh", region: "Chittoor", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.826,
    groundwaterExtraction: 1.177, stageOfExtraction: 71.0, category: "Semi-Critical",
    lat: 13.21, lon: 79.1
  },
  {
    state: "Andhra Pradesh", region: "Kadapa", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.098,
    groundwaterExtraction: 0.698, stageOfExtraction: 70.0, category: "Semi-Critical",
    lat: 14.47, lon: 78.82
  },
  {
    state: "Andhra Pradesh", region: "Anantapur", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.648,
    groundwaterExtraction: 1.404, stageOfExtraction: 94.0, category: "Critical",
    lat: 14.68, lon: 77.6
  },
  {
    state: "Andhra Pradesh", region: "Kurnool", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.514,
    groundwaterExtraction: 0.65, stageOfExtraction: 47.0, category: "Safe",
    lat: 15.83, lon: 78.04
  },
  {
    state: "Assam", region: "Dibrugarh", aquiferType: "Brahmaputra Alluvial",
    depthToWater: 5.0, depthRange: "1-20m", aquiferThickness: 50,
    specificYield: 0.2, hydraulicConductivity: 30.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.763,
    groundwaterExtraction: 0.107, stageOfExtraction: 7.0, category: "Safe",
    lat: 27.49, lon: 94.91
  },
  {
    state: "Assam", region: "Jorhat", aquiferType: "Brahmaputra Alluvial",
    depthToWater: 5.0, depthRange: "1-20m", aquiferThickness: 50,
    specificYield: 0.2, hydraulicConductivity: 30.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.357,
    groundwaterExtraction: 0.069, stageOfExtraction: 6.0, category: "Safe",
    lat: 26.76, lon: 94.21
  },
  {
    state: "Assam", region: "Kamrup", aquiferType: "Brahmaputra Alluvial",
    depthToWater: 5.0, depthRange: "1-20m", aquiferThickness: 50,
    specificYield: 0.2, hydraulicConductivity: 30.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.306,
    groundwaterExtraction: 0.386, stageOfExtraction: 33.0, category: "Safe",
    lat: 26.14, lon: 91.74
  },
  {
    state: "Assam", region: "Lakhimpur", aquiferType: "Brahmaputra Alluvial",
    depthToWater: 5.0, depthRange: "1-20m", aquiferThickness: 50,
    specificYield: 0.2, hydraulicConductivity: 30.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.187,
    groundwaterExtraction: 0.172, stageOfExtraction: 16.0, category: "Safe",
    lat: 27.24, lon: 94.11
  },
  {
    state: "Bihar", region: "Araria", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.884,
    groundwaterExtraction: 0.226, stageOfExtraction: 28.4, category: "Safe",
    lat: 26.15, lon: 87.47
  },
  {
    state: "Bihar", region: "Bhagalpur", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.804,
    groundwaterExtraction: 0.228, stageOfExtraction: 31.4, category: "Safe",
    lat: 25.25, lon: 86.98
  },
  {
    state: "Bihar", region: "Darbhanga", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.668,
    groundwaterExtraction: 0.318, stageOfExtraction: 51.1, category: "Safe",
    lat: 26.17, lon: 85.9
  },
  {
    state: "Bihar", region: "East Champaran", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.443,
    groundwaterExtraction: 0.591, stageOfExtraction: 44.9, category: "Safe",
    lat: 26.65, lon: 84.92
  },
  {
    state: "Bihar", region: "Gaya", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.212,
    groundwaterExtraction: 0.665, stageOfExtraction: 59.7, category: "Safe",
    lat: 24.8, lon: 85.01
  },
  {
    state: "Bihar", region: "Muzaffarpur", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.151,
    groundwaterExtraction: 0.626, stageOfExtraction: 59.6, category: "Safe",
    lat: 26.12, lon: 85.39
  },
  {
    state: "Bihar", region: "Patna", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.158,
    groundwaterExtraction: 0.497, stageOfExtraction: 47.6, category: "Safe",
    lat: 25.6, lon: 85.14
  },
  {
    state: "Bihar", region: "Purnia", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.267,
    groundwaterExtraction: 0.569, stageOfExtraction: 49.4, category: "Safe",
    lat: 25.79, lon: 87.47
  },
  {
    state: "Bihar", region: "Saran", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.952,
    groundwaterExtraction: 0.57, stageOfExtraction: 65.9, category: "Safe",
    lat: 25.92, lon: 84.97
  },
  {
    state: "Bihar", region: "Vaishali", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 7.0, depthRange: "1-22m", aquiferThickness: 180,
    specificYield: 0.22, hydraulicConductivity: 40.0, waterQuality: "Arsenic affected in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.769,
    groundwaterExtraction: 0.403, stageOfExtraction: 58.0, category: "Safe",
    lat: 25.72, lon: 85.22
  },
  {
    state: "Chhattisgarh", region: "Bilaspur", aquiferType: "Hard Rock",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.437,
    groundwaterExtraction: 0.187, stageOfExtraction: 46.0, category: "Safe",
    lat: 22.09, lon: 82.15
  },
  {
    state: "Chhattisgarh", region: "Durg", aquiferType: "Hard Rock",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.282,
    groundwaterExtraction: 0.214, stageOfExtraction: 81.0, category: "Semi-Critical",
    lat: 21.19, lon: 81.28
  },
  {
    state: "Chhattisgarh", region: "Raipur", aquiferType: "Hard Rock",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.405,
    groundwaterExtraction: 0.21, stageOfExtraction: 56.0, category: "Safe",
    lat: 21.25, lon: 81.63
  },
  {
    state: "Gujarat", region: "Ahmedabad", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.583,
    groundwaterExtraction: 0.425, stageOfExtraction: 77.0, category: "Semi-Critical",
    lat: 23.02, lon: 72.57
  },
  {
    state: "Gujarat", region: "Bhavnagar", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.134,
    groundwaterExtraction: 0.71, stageOfExtraction: 66.0, category: "Safe",
    lat: 21.76, lon: 72.15
  },
  {
    state: "Gujarat", region: "Gandhinagar", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.436,
    groundwaterExtraction: 0.602, stageOfExtraction: 145.0, category: "Over-Exploited",
    lat: 23.22, lon: 72.64
  },
  {
    state: "Gujarat", region: "Jamnagar", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.998,
    groundwaterExtraction: 0.623, stageOfExtraction: 66.0, category: "Safe",
    lat: 22.47, lon: 70.07
  },
  {
    state: "Gujarat", region: "Junagadh", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.459,
    groundwaterExtraction: 0.918, stageOfExtraction: 66.0, category: "Safe",
    lat: 21.52, lon: 70.46
  },
  {
    state: "Gujarat", region: "Rajkot", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.617,
    groundwaterExtraction: 1.036, stageOfExtraction: 67.0, category: "Safe",
    lat: 22.3, lon: 70.8
  },
  {
    state: "Gujarat", region: "Surat", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.663,
    groundwaterExtraction: 0.52, stageOfExtraction: 33.0, category: "Safe",
    lat: 21.17, lon: 72.83
  },
  {
    state: "Gujarat", region: "Vadodara", aquiferType: "Alluvial",
    depthToWater: 28.0, depthRange: "20-43m", aquiferThickness: 60,
    specificYield: 0.12, hydraulicConductivity: 18.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.28,
    groundwaterExtraction: 0.73, stageOfExtraction: 60.0, category: "Safe",
    lat: 22.31, lon: 73.18
  },
  {
    state: "Haryana", region: "Ambala", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.0, depthRange: "24-47m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30.0, waterQuality: "High TDS",
    rechargePotential: "High", annualGroundwaterRecharge: 0.614,
    groundwaterExtraction: 0.575, stageOfExtraction: 102.0, category: "Over-Exploited",
    lat: 30.38, lon: 76.78
  },
  {
    state: "Haryana", region: "Faridabad", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.0, depthRange: "24-47m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30.0, waterQuality: "High TDS",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.186,
    groundwaterExtraction: 0.17, stageOfExtraction: 99.0, category: "Critical",
    lat: 28.41, lon: 77.31
  },
  {
    state: "Haryana", region: "Karnal", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.0, depthRange: "24-47m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30.0, waterQuality: "High TDS",
    rechargePotential: "High", annualGroundwaterRecharge: 0.781,
    groundwaterExtraction: 0.872, stageOfExtraction: 121.0, category: "Over-Exploited",
    lat: 29.69, lon: 76.99
  },
  {
    state: "Haryana", region: "Panipat", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.0, depthRange: "24-47m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30.0, waterQuality: "High TDS",
    rechargePotential: "High", annualGroundwaterRecharge: 0.37,
    groundwaterExtraction: 0.542, stageOfExtraction: 163.0, category: "Over-Exploited",
    lat: 29.39, lon: 76.97
  },
  {
    state: "Haryana", region: "Rohtak", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 32.0, depthRange: "24-47m", aquiferThickness: 100,
    specificYield: 0.18, hydraulicConductivity: 30.0, waterQuality: "High TDS",
    rechargePotential: "High", annualGroundwaterRecharge: 0.531,
    groundwaterExtraction: 0.334, stageOfExtraction: 70.0, category: "Semi-Critical",
    lat: 28.89, lon: 76.6
  },
  {
    state: "Himachal Pradesh", region: "Yamunanagar", aquiferType: "Hard Rock/Valley Fill",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 30,
    specificYield: 0.05, hydraulicConductivity: 5.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.56,
    groundwaterExtraction: 0.689, stageOfExtraction: 135.0, category: "Over-Exploited",
    lat: 30.13, lon: 77.3
  },
  {
    state: "Jammu & Kashmir", region: "Jammu", aquiferType: "Hard Rock/Valley Fill",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 30,
    specificYield: 0.05, hydraulicConductivity: 5.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.992,
    groundwaterExtraction: 0.229, stageOfExtraction: 26.0, category: "Safe",
    lat: 32.73, lon: 74.87
  },
  {
    state: "Jammu & Kashmir", region: "Srinagar", aquiferType: "Hard Rock/Valley Fill",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 30,
    specificYield: 0.05, hydraulicConductivity: 5.0, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.132,
    groundwaterExtraction: 0.082, stageOfExtraction: 66.0, category: "Safe",
    lat: 34.08, lon: 74.8
  },
  {
    state: "Jharkhand", region: "Bokaro", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.267,
    groundwaterExtraction: 0.115, stageOfExtraction: 46.0, category: "Safe",
    lat: 23.67, lon: 85.98
  },
  {
    state: "Jharkhand", region: "Dhanbad", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.219,
    groundwaterExtraction: 0.153, stageOfExtraction: 77.0, category: "Semi-Critical",
    lat: 23.8, lon: 86.43
  },
  {
    state: "Jharkhand", region: "Ranchi", aquiferType: "Crystalline Hard Rock",
    depthToWater: 15.0, depthRange: "7-30m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.439,
    groundwaterExtraction: 0.107, stageOfExtraction: 27.0, category: "Safe",
    lat: 23.36, lon: 85.33
  },
  {
    state: "Karnataka", region: "Bagalkote", aquiferType: "Peninsular Gneiss/Hard Rock",
    depthToWater: 22.0, depthRange: "14-37m", aquiferThickness: 18,
    specificYield: 0.02, hydraulicConductivity: 2.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.443,
    groundwaterExtraction: 0.37, stageOfExtraction: 91.0, category: "Critical",
    lat: 16.19, lon: 75.7
  },
  {
    state: "Karnataka", region: "Dharwad", aquiferType: "Peninsular Gneiss/Hard Rock",
    depthToWater: 22.0, depthRange: "14-37m", aquiferThickness: 18,
    specificYield: 0.02, hydraulicConductivity: 2.0, waterQuality: "Moderate",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.297,
    groundwaterExtraction: 0.148, stageOfExtraction: 62.0, category: "Safe",
    lat: 15.46, lon: 75.01
  },
  {
    state: "Karnataka", region: "Raichur", aquiferType: "Peninsular Gneiss/Hard Rock",
    depthToWater: 22.0, depthRange: "14-37m", aquiferThickness: 18,
    specificYield: 0.02, hydraulicConductivity: 2.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.918,
    groundwaterExtraction: 0.265, stageOfExtraction: 32.0, category: "Safe",
    lat: 16.21, lon: 77.36
  },
  {
    state: "Karnataka", region: "Tumkur", aquiferType: "Peninsular Gneiss/Hard Rock",
    depthToWater: 22.0, depthRange: "14-37m", aquiferThickness: 18,
    specificYield: 0.02, hydraulicConductivity: 2.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.872,
    groundwaterExtraction: 0.796, stageOfExtraction: 98.0, category: "Critical",
    lat: 13.34, lon: 77.1
  },
  {
    state: "Kerala", region: "Alappuzha", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.467,
    groundwaterExtraction: 0.137, stageOfExtraction: 32.0, category: "Safe",
    lat: 9.49, lon: 76.33
  },
  {
    state: "Kerala", region: "Ernakulam", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.599,
    groundwaterExtraction: 0.199, stageOfExtraction: 37.0, category: "Safe",
    lat: 9.93, lon: 76.27
  },
  {
    state: "Kerala", region: "Kozhikode", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.368,
    groundwaterExtraction: 0.178, stageOfExtraction: 54.0, category: "Safe",
    lat: 11.25, lon: 75.78
  },
  {
    state: "Kerala", region: "Malappuram", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.574,
    groundwaterExtraction: 0.302, stageOfExtraction: 58.0, category: "Safe",
    lat: 11.07, lon: 76.07
  },
  {
    state: "Kerala", region: "Palakkad", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.709,
    groundwaterExtraction: 0.353, stageOfExtraction: 55.0, category: "Safe",
    lat: 10.78, lon: 76.65
  },
  {
    state: "Kerala", region: "Thrissur", aquiferType: "Laterite/Alluvial",
    depthToWater: 5.8, depthRange: "1-21m", aquiferThickness: 15,
    specificYield: 0.12, hydraulicConductivity: 8.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.643,
    groundwaterExtraction: 0.328, stageOfExtraction: 56.0, category: "Safe",
    lat: 10.52, lon: 76.21
  },
  {
    state: "Madhya Pradesh", region: "Bhopal", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.396,
    groundwaterExtraction: 0.278, stageOfExtraction: 74.0, category: "Semi-Critical",
    lat: 23.26, lon: 77.41
  },
  {
    state: "Madhya Pradesh", region: "Gwalior", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.589,
    groundwaterExtraction: 0.213, stageOfExtraction: 38.0, category: "Safe",
    lat: 26.23, lon: 78.17
  },
  {
    state: "Madhya Pradesh", region: "Indore", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.618,
    groundwaterExtraction: 0.689, stageOfExtraction: 117.0, category: "Over-Exploited",
    lat: 22.72, lon: 75.86
  },
  {
    state: "Madhya Pradesh", region: "Jabalpur", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.634,
    groundwaterExtraction: 0.295, stageOfExtraction: 49.0, category: "Safe",
    lat: 23.18, lon: 79.94
  },
  {
    state: "Madhya Pradesh", region: "Rewa", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.65,
    groundwaterExtraction: 0.312, stageOfExtraction: 50.0, category: "Safe",
    lat: 24.53, lon: 81.3
  },
  {
    state: "Madhya Pradesh", region: "Sagar", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.277,
    groundwaterExtraction: 0.736, stageOfExtraction: 61.0, category: "Safe",
    lat: 23.83, lon: 78.74
  },
  {
    state: "Madhya Pradesh", region: "Ujjain", aquiferType: "Deccan Basalt/Hard Rock",
    depthToWater: 14.5, depthRange: "6-30m", aquiferThickness: 28,
    specificYield: 0.018, hydraulicConductivity: 2.2, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.013,
    groundwaterExtraction: 0.902, stageOfExtraction: 94.0, category: "Critical",
    lat: 23.18, lon: 75.78
  },
  {
    state: "Maharashtra", region: "Ahmednagar", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.884,
    groundwaterExtraction: 1.384, stageOfExtraction: 78.0, category: "Semi-Critical",
    lat: 19.1, lon: 74.74
  },
  {
    state: "Maharashtra", region: "Aurangabad", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.118,
    groundwaterExtraction: 0.806, stageOfExtraction: 76.0, category: "Semi-Critical",
    lat: 19.88, lon: 75.34
  },
  {
    state: "Maharashtra", region: "Kolhapur", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.319,
    groundwaterExtraction: 0.501, stageOfExtraction: 40.0, category: "Safe",
    lat: 16.71, lon: 74.24
  },
  {
    state: "Maharashtra", region: "Nagpur", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.158,
    groundwaterExtraction: 0.617, stageOfExtraction: 56.0, category: "Safe",
    lat: 21.15, lon: 79.08
  },
  {
    state: "Maharashtra", region: "Nashik", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 2.024,
    groundwaterExtraction: 1.099, stageOfExtraction: 57.0, category: "Safe",
    lat: 19.99, lon: 73.79
  },
  {
    state: "Maharashtra", region: "Pune", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.837,
    groundwaterExtraction: 1.285, stageOfExtraction: 74.0, category: "Semi-Critical",
    lat: 18.52, lon: 73.86
  },
  {
    state: "Maharashtra", region: "Solapur", aquiferType: "Deccan Basalt",
    depthToWater: 12.0, depthRange: "4-27m", aquiferThickness: 25,
    specificYield: 0.018, hydraulicConductivity: 2.5, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.669,
    groundwaterExtraction: 1.196, stageOfExtraction: 75.0, category: "Semi-Critical",
    lat: 17.68, lon: 75.9
  },
  {
    state: "Odisha", region: "Balasore", aquiferType: "Crystalline Hard Rock",
    depthToWater: 10.0, depthRange: "2-25m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 1.165,
    groundwaterExtraction: 0.587, stageOfExtraction: 53.0, category: "Safe",
    lat: 21.49, lon: 86.93
  },
  {
    state: "Odisha", region: "Cuttack", aquiferType: "Crystalline Hard Rock",
    depthToWater: 10.0, depthRange: "2-25m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.757,
    groundwaterExtraction: 0.281, stageOfExtraction: 40.0, category: "Safe",
    lat: 20.46, lon: 85.88
  },
  {
    state: "Odisha", region: "Sambalpur", aquiferType: "Crystalline Hard Rock",
    depthToWater: 10.0, depthRange: "2-25m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.565,
    groundwaterExtraction: 0.096, stageOfExtraction: 18.0, category: "Safe",
    lat: 21.47, lon: 83.97
  },
  {
    state: "Punjab", region: "Amritsar", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.948,
    groundwaterExtraction: 2.206, stageOfExtraction: 126.0, category: "Over-Exploited",
    lat: 31.63, lon: 74.87
  },
  {
    state: "Punjab", region: "Bathinda", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.58,
    groundwaterExtraction: 1.334, stageOfExtraction: 93.0, category: "Critical",
    lat: 30.21, lon: 74.95
  },
  {
    state: "Punjab", region: "Gurdaspur", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.816,
    groundwaterExtraction: 2.034, stageOfExtraction: 124.0, category: "Over-Exploited",
    lat: 32.04, lon: 75.4
  },
  {
    state: "Punjab", region: "Jalandhar", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.449,
    groundwaterExtraction: 2.719, stageOfExtraction: 209.0, category: "Over-Exploited",
    lat: 31.33, lon: 75.58
  },
  {
    state: "Punjab", region: "Ludhiana", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 2.363,
    groundwaterExtraction: 3.438, stageOfExtraction: 162.0, category: "Over-Exploited",
    lat: 30.9, lon: 75.86
  },
  {
    state: "Punjab", region: "Patiala", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 28.5, depthRange: "20-44m", aquiferThickness: 200,
    specificYield: 0.22, hydraulicConductivity: 45.0, waterQuality: "High TDS/Nitrate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.701,
    groundwaterExtraction: 2.899, stageOfExtraction: 189.0, category: "Over-Exploited",
    lat: 30.34, lon: 76.39
  },
  {
    state: "Rajasthan", region: "Ajmer", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.354,
    groundwaterExtraction: 0.471, stageOfExtraction: 147.0, category: "Over-Exploited",
    lat: 26.45, lon: 74.64
  },
  {
    state: "Rajasthan", region: "Alwar", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.939,
    groundwaterExtraction: 1.489, stageOfExtraction: 174.0, category: "Over-Exploited",
    lat: 27.56, lon: 76.61
  },
  {
    state: "Rajasthan", region: "Barmer", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.278,
    groundwaterExtraction: 0.312, stageOfExtraction: 124.0, category: "Over-Exploited",
    lat: 25.75, lon: 71.39
  },
  {
    state: "Rajasthan", region: "Bharatpur", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.506,
    groundwaterExtraction: 0.543, stageOfExtraction: 119.0, category: "Over-Exploited",
    lat: 27.22, lon: 77.49
  },
  {
    state: "Rajasthan", region: "Bikaner", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "Medium", annualGroundwaterRecharge: 0.255,
    groundwaterExtraction: 0.359, stageOfExtraction: 148.0, category: "Over-Exploited",
    lat: 28.02, lon: 73.31
  },
  {
    state: "Rajasthan", region: "Jaipur", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.721,
    groundwaterExtraction: 1.495, stageOfExtraction: 230.0, category: "Over-Exploited",
    lat: 26.91, lon: 75.79
  },
  {
    state: "Rajasthan", region: "Jaisalmer", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.07,
    groundwaterExtraction: 0.158, stageOfExtraction: 249.0, category: "Over-Exploited",
    lat: 26.92, lon: 70.91
  },
  {
    state: "Rajasthan", region: "Jodhpur", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.439,
    groundwaterExtraction: 0.908, stageOfExtraction: 229.0, category: "Over-Exploited",
    lat: 26.29, lon: 73.01
  },
  {
    state: "Rajasthan", region: "Kota", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.577,
    groundwaterExtraction: 0.547, stageOfExtraction: 105.0, category: "Over-Exploited",
    lat: 25.18, lon: 75.83
  },
  {
    state: "Rajasthan", region: "Udaipur", aquiferType: "Hard Rock/Alluvial",
    depthToWater: 40.0, depthRange: "32-55m", aquiferThickness: 45,
    specificYield: 0.07, hydraulicConductivity: 4.0, waterQuality: "Brackish/Fluoride",
    rechargePotential: "High", annualGroundwaterRecharge: 0.321,
    groundwaterExtraction: 0.273, stageOfExtraction: 96.0, category: "Critical",
    lat: 24.58, lon: 73.69
  },
  {
    state: "Tamil Nadu", region: "Ariyalur", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.392,
    groundwaterExtraction: 0.155, stageOfExtraction: 44.0, category: "Safe",
    lat: 11.14, lon: 79.08
  },
  {
    state: "Tamil Nadu", region: "Chennai", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "Low", annualGroundwaterRecharge: 0.017,
    groundwaterExtraction: 0.028, stageOfExtraction: 185.0, category: "Over-Exploited",
    lat: 13.08, lon: 80.27
  },
  {
    state: "Tamil Nadu", region: "Coimbatore", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.499,
    groundwaterExtraction: 0.429, stageOfExtraction: 95.0, category: "Critical",
    lat: 11.02, lon: 76.97
  },
  {
    state: "Tamil Nadu", region: "Madurai", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.709,
    groundwaterExtraction: 0.431, stageOfExtraction: 67.0, category: "Safe",
    lat: 9.93, lon: 78.12
  },
  {
    state: "Tamil Nadu", region: "Salem", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.607,
    groundwaterExtraction: 0.637, stageOfExtraction: 117.0, category: "Over-Exploited",
    lat: 11.65, lon: 78.16
  },
  {
    state: "Tamil Nadu", region: "Vellore", aquiferType: "Crystalline Hard Rock",
    depthToWater: 18.0, depthRange: "10-33m", aquiferThickness: 20,
    specificYield: 0.025, hydraulicConductivity: 3.5, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.655,
    groundwaterExtraction: 0.608, stageOfExtraction: 103.0, category: "Over-Exploited",
    lat: 12.92, lon: 79.13
  },
  {
    state: "Telangana", region: "Adilabad", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 2.062,
    groundwaterExtraction: 0.717, stageOfExtraction: 38.0, category: "Safe",
    lat: 19.67, lon: 78.53
  },
  {
    state: "Telangana", region: "Karimnagar", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.98,
    groundwaterExtraction: 1.369, stageOfExtraction: 76.0, category: "Semi-Critical",
    lat: 18.44, lon: 79.13
  },
  {
    state: "Telangana", region: "Khammam", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.74,
    groundwaterExtraction: 0.606, stageOfExtraction: 38.0, category: "Safe",
    lat: 17.25, lon: 80.15
  },
  {
    state: "Telangana", region: "Medak", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.133,
    groundwaterExtraction: 0.763, stageOfExtraction: 74.0, category: "Semi-Critical",
    lat: 18.05, lon: 78.26
  },
  {
    state: "Telangana", region: "Nalgonda", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.855,
    groundwaterExtraction: 1.09, stageOfExtraction: 65.0, category: "Safe",
    lat: 17.06, lon: 79.27
  },
  {
    state: "Telangana", region: "Nizamabad", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.445,
    groundwaterExtraction: 0.839, stageOfExtraction: 64.0, category: "Safe",
    lat: 18.67, lon: 78.1
  },
  {
    state: "Telangana", region: "Warangal", aquiferType: "Granitic Hard Rock",
    depthToWater: 19.6, depthRange: "12-35m", aquiferThickness: 22,
    specificYield: 0.025, hydraulicConductivity: 3.0, waterQuality: "Fluoride affected",
    rechargePotential: "High", annualGroundwaterRecharge: 1.932,
    groundwaterExtraction: 1.089, stageOfExtraction: 62.0, category: "Safe",
    lat: 17.98, lon: 79.6
  },
  {
    state: "Uttar Pradesh", region: "Agra", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.925,
    groundwaterExtraction: 0.95, stageOfExtraction: 114.0, category: "Over-Exploited",
    lat: 27.18, lon: 78.01
  },
  {
    state: "Uttar Pradesh", region: "Aligarh", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.868,
    groundwaterExtraction: 0.666, stageOfExtraction: 84.0, category: "Semi-Critical",
    lat: 27.88, lon: 78.08
  },
  {
    state: "Uttar Pradesh", region: "Allahabad", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.421,
    groundwaterExtraction: 1.017, stageOfExtraction: 75.0, category: "Semi-Critical",
    lat: 25.45, lon: 81.84
  },
  {
    state: "Uttar Pradesh", region: "Bareilly", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.653,
    groundwaterExtraction: 1.191, stageOfExtraction: 76.0, category: "Semi-Critical",
    lat: 28.35, lon: 79.43
  },
  {
    state: "Uttar Pradesh", region: "Ghaziabad", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.308,
    groundwaterExtraction: 0.313, stageOfExtraction: 107.0, category: "Over-Exploited",
    lat: 28.67, lon: 77.45
  },
  {
    state: "Uttar Pradesh", region: "Gorakhpur", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.855,
    groundwaterExtraction: 0.953, stageOfExtraction: 54.0, category: "Safe",
    lat: 26.76, lon: 83.37
  },
  {
    state: "Uttar Pradesh", region: "Lucknow", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.743,
    groundwaterExtraction: 0.558, stageOfExtraction: 80.0, category: "Semi-Critical",
    lat: 26.85, lon: 80.95
  },
  {
    state: "Uttar Pradesh", region: "Mathura", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.165,
    groundwaterExtraction: 0.964, stageOfExtraction: 92.0, category: "Critical",
    lat: 27.49, lon: 77.67
  },
  {
    state: "Uttar Pradesh", region: "Meerut", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 1.24,
    groundwaterExtraction: 0.858, stageOfExtraction: 75.0, category: "Semi-Critical",
    lat: 28.98, lon: 77.71
  },
  {
    state: "Uttar Pradesh", region: "Varanasi", aquiferType: "Indo-Gangetic Alluvial",
    depthToWater: 16.0, depthRange: "8-31m", aquiferThickness: 150,
    specificYield: 0.2, hydraulicConductivity: 35.0, waterQuality: "Moderate",
    rechargePotential: "High", annualGroundwaterRecharge: 0.512,
    groundwaterExtraction: 0.452, stageOfExtraction: 93.0, category: "Critical",
    lat: 25.32, lon: 82.97
  },
  {
    state: "Uttarakhand", region: "Dehradun", aquiferType: "Alluvial/Hard Rock",
    depthToWater: 10.0, depthRange: "2-25m", aquiferThickness: 35,
    specificYield: 0.08, hydraulicConductivity: 6.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.366,
    groundwaterExtraction: 0.049, stageOfExtraction: 14.0, category: "Safe",
    lat: 30.32, lon: 78.03
  },
  {
    state: "Uttarakhand", region: "Haridwar", aquiferType: "Alluvial/Hard Rock",
    depthToWater: 10.0, depthRange: "2-25m", aquiferThickness: 35,
    specificYield: 0.08, hydraulicConductivity: 6.0, waterQuality: "Potable",
    rechargePotential: "High", annualGroundwaterRecharge: 0.885,
    groundwaterExtraction: 0.486, stageOfExtraction: 56.0, category: "Safe",
    lat: 29.96, lon: 78.16
  },
  {
    state: "West Bengal", region: "Murshidabad", aquiferType: "Bengal Delta Alluvial",
    depthToWater: 8.2, depthRange: "1-23m", aquiferThickness: 200,
    specificYield: 0.25, hydraulicConductivity: 50.0, waterQuality: "Arsenic in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 2.491,
    groundwaterExtraction: 1.965, stageOfExtraction: 87.0, category: "Semi-Critical",
    lat: 24.18, lon: 88.27
  },
  {
    state: "West Bengal", region: "Nadia", aquiferType: "Bengal Delta Alluvial",
    depthToWater: 8.2, depthRange: "1-23m", aquiferThickness: 200,
    specificYield: 0.25, hydraulicConductivity: 50.0, waterQuality: "Arsenic in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 2.235,
    groundwaterExtraction: 1.873, stageOfExtraction: 92.0, category: "Critical",
    lat: 23.47, lon: 88.58
  },
  {
    state: "West Bengal", region: "Howrah", aquiferType: "Bengal Delta Alluvial",
    depthToWater: 8.2, depthRange: "1-23m", aquiferThickness: 200,
    specificYield: 0.25, hydraulicConductivity: 50.0, waterQuality: "Arsenic in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 0.33,
    groundwaterExtraction: 0.073, stageOfExtraction: 25.0, category: "Safe",
    lat: 22.59, lon: 88.26
  },
  {
    state: "West Bengal", region: "Hooghly", aquiferType: "Bengal Delta Alluvial",
    depthToWater: 8.2, depthRange: "1-23m", aquiferThickness: 200,
    specificYield: 0.25, hydraulicConductivity: 50.0, waterQuality: "Arsenic in parts",
    rechargePotential: "High", annualGroundwaterRecharge: 1.39,
    groundwaterExtraction: 0.618, stageOfExtraction: 49.0, category: "Safe",
    lat: 22.9, lon: 88.4
  },
];

// Annual Rainfall data - IMD (India Meteorological Department)
export const IMD_RAINFALL_DATA: RainfallData[] = [
  // Maharashtra
  { state: "Maharashtra", district: "Mumbai", annualRainfall: 2422, monsoonRainfall: 2100, preMonsooonRainfall: 150, postMonsoonRainfall: 172, rainyDays: 96, lat: 19.076, lon: 72.877 },
  { state: "Maharashtra", district: "Pune", annualRainfall: 722, monsoonRainfall: 610, preMonsooonRainfall: 55, postMonsoonRainfall: 57, rainyDays: 52, lat: 18.520, lon: 73.856 },
  { state: "Maharashtra", district: "Nashik", annualRainfall: 920, monsoonRainfall: 780, preMonsooonRainfall: 65, postMonsoonRainfall: 75, rainyDays: 60, lat: 19.99, lon: 73.79 },
  { state: "Maharashtra", district: "Nagpur", annualRainfall: 1205, monsoonRainfall: 1000, preMonsooonRainfall: 90, postMonsoonRainfall: 115, rainyDays: 64, lat: 21.15, lon: 79.08 },
  { state: "Maharashtra", district: "Aurangabad", annualRainfall: 726, monsoonRainfall: 620, preMonsooonRainfall: 50, postMonsoonRainfall: 56, rainyDays: 48, lat: 19.88, lon: 75.34 },
  { state: "Maharashtra", district: "Ahmednagar", annualRainfall: 650, monsoonRainfall: 550, preMonsooonRainfall: 45, postMonsoonRainfall: 55, rainyDays: 42, lat: 19.10, lon: 74.74 },
  { state: "Maharashtra", district: "Solapur", annualRainfall: 548, monsoonRainfall: 465, preMonsooonRainfall: 38, postMonsoonRainfall: 45, rainyDays: 35, lat: 17.68, lon: 75.90 },
  { state: "Maharashtra", district: "Kolhapur", annualRainfall: 1950, monsoonRainfall: 1650, preMonsooonRainfall: 150, postMonsoonRainfall: 150, rainyDays: 85, lat: 16.71, lon: 74.24 },
  // Delhi
  { state: "Delhi", district: "New Delhi", annualRainfall: 714, monsoonRainfall: 598, preMonsooonRainfall: 55, postMonsoonRainfall: 61, rainyDays: 43, lat: 28.613, lon: 77.209 },
  // Rajasthan
  { state: "Rajasthan", district: "Jaipur", annualRainfall: 650, monsoonRainfall: 560, preMonsooonRainfall: 40, postMonsoonRainfall: 50, rainyDays: 35, lat: 26.912, lon: 75.787 },
  { state: "Rajasthan", district: "Jodhpur", annualRainfall: 362, monsoonRainfall: 300, preMonsooonRainfall: 28, postMonsoonRainfall: 34, rainyDays: 22, lat: 26.292, lon: 73.014 },
  { state: "Rajasthan", district: "Udaipur", annualRainfall: 638, monsoonRainfall: 545, preMonsooonRainfall: 40, postMonsoonRainfall: 53, rainyDays: 38, lat: 24.58, lon: 73.69 },
  { state: "Rajasthan", district: "Kota", annualRainfall: 770, monsoonRainfall: 660, preMonsooonRainfall: 50, postMonsoonRainfall: 60, rainyDays: 40, lat: 25.18, lon: 75.83 },
  { state: "Rajasthan", district: "Ajmer", annualRainfall: 534, monsoonRainfall: 455, preMonsooonRainfall: 38, postMonsoonRainfall: 41, rainyDays: 32, lat: 26.45, lon: 74.64 },
  { state: "Rajasthan", district: "Bikaner", annualRainfall: 295, monsoonRainfall: 245, preMonsooonRainfall: 22, postMonsoonRainfall: 28, rainyDays: 18, lat: 28.02, lon: 73.31 },
  { state: "Rajasthan", district: "Barmer", annualRainfall: 235, monsoonRainfall: 195, preMonsooonRainfall: 18, postMonsoonRainfall: 22, rainyDays: 14, lat: 25.75, lon: 71.39 },
  { state: "Rajasthan", district: "Jaisalmer", annualRainfall: 165, monsoonRainfall: 140, preMonsooonRainfall: 12, postMonsoonRainfall: 13, rainyDays: 10, lat: 26.92, lon: 70.91 },
  { state: "Rajasthan", district: "Alwar", annualRainfall: 710, monsoonRainfall: 610, preMonsooonRainfall: 45, postMonsoonRainfall: 55, rainyDays: 38, lat: 27.56, lon: 76.61 },
  { state: "Rajasthan", district: "Bharatpur", annualRainfall: 680, monsoonRainfall: 575, preMonsooonRainfall: 52, postMonsoonRainfall: 53, rainyDays: 37, lat: 27.22, lon: 77.49 },
  // Tamil Nadu
  { state: "Tamil Nadu", district: "Chennai", annualRainfall: 1400, monsoonRainfall: 800, preMonsooonRainfall: 100, postMonsoonRainfall: 500, rainyDays: 58, lat: 13.083, lon: 80.270 },
  { state: "Tamil Nadu", district: "Coimbatore", annualRainfall: 650, monsoonRainfall: 420, preMonsooonRainfall: 80, postMonsoonRainfall: 150, rainyDays: 45, lat: 11.017, lon: 76.966 },
  { state: "Tamil Nadu", district: "Madurai", annualRainfall: 890, monsoonRainfall: 480, preMonsooonRainfall: 110, postMonsoonRainfall: 300, rainyDays: 52, lat: 9.93, lon: 78.12 },
  { state: "Tamil Nadu", district: "Tiruchirappalli", annualRainfall: 842, monsoonRainfall: 500, preMonsooonRainfall: 95, postMonsoonRainfall: 247, rainyDays: 50, lat: 10.80, lon: 78.69 },
  { state: "Tamil Nadu", district: "Salem", annualRainfall: 900, monsoonRainfall: 580, preMonsooonRainfall: 100, postMonsoonRainfall: 220, rainyDays: 55, lat: 11.65, lon: 78.16 },
  { state: "Tamil Nadu", district: "Tirunelveli", annualRainfall: 680, monsoonRainfall: 420, preMonsooonRainfall: 90, postMonsoonRainfall: 170, rainyDays: 48, lat: 8.73, lon: 77.70 },
  { state: "Tamil Nadu", district: "Vellore", annualRainfall: 975, monsoonRainfall: 550, preMonsooonRainfall: 115, postMonsoonRainfall: 310, rainyDays: 55, lat: 12.92, lon: 79.13 },
  { state: "Tamil Nadu", district: "Ariyalur", annualRainfall: 985, monsoonRainfall: 600, preMonsooonRainfall: 110, postMonsoonRainfall: 275, rainyDays: 56, lat: 11.14, lon: 79.08 },
  // Karnataka
  { state: "Karnataka", district: "Bengaluru", annualRainfall: 970, monsoonRainfall: 720, preMonsooonRainfall: 120, postMonsoonRainfall: 130, rainyDays: 60, lat: 12.972, lon: 77.594 },
  { state: "Karnataka", district: "Mysuru", annualRainfall: 790, monsoonRainfall: 600, preMonsooonRainfall: 95, postMonsoonRainfall: 95, rainyDays: 55, lat: 12.30, lon: 76.65 },
  { state: "Karnataka", district: "Dharwad", annualRainfall: 840, monsoonRainfall: 680, preMonsooonRainfall: 75, postMonsoonRainfall: 85, rainyDays: 58, lat: 15.46, lon: 75.01 },
  { state: "Karnataka", district: "Ballari", annualRainfall: 620, monsoonRainfall: 490, preMonsooonRainfall: 60, postMonsoonRainfall: 70, rainyDays: 40, lat: 15.15, lon: 76.94 },
  { state: "Karnataka", district: "Bagalkote", annualRainfall: 620, monsoonRainfall: 495, preMonsooonRainfall: 55, postMonsoonRainfall: 70, rainyDays: 40, lat: 16.19, lon: 75.70 },
  { state: "Karnataka", district: "Tumkur", annualRainfall: 790, monsoonRainfall: 610, preMonsooonRainfall: 95, postMonsoonRainfall: 85, rainyDays: 52, lat: 13.34, lon: 77.10 },
  { state: "Karnataka", district: "Raichur", annualRainfall: 590, monsoonRainfall: 470, preMonsooonRainfall: 55, postMonsoonRainfall: 65, rainyDays: 38, lat: 16.21, lon: 77.36 },
  // Gujarat
  { state: "Gujarat", district: "Ahmedabad", annualRainfall: 782, monsoonRainfall: 680, preMonsooonRainfall: 52, postMonsoonRainfall: 50, rainyDays: 38, lat: 23.023, lon: 72.572 },
  { state: "Gujarat", district: "Surat", annualRainfall: 1143, monsoonRainfall: 960, preMonsooonRainfall: 80, postMonsoonRainfall: 103, rainyDays: 55, lat: 21.170, lon: 72.831 },
  { state: "Gujarat", district: "Vadodara", annualRainfall: 900, monsoonRainfall: 775, preMonsooonRainfall: 62, postMonsoonRainfall: 63, rainyDays: 48, lat: 22.31, lon: 73.18 },
  { state: "Gujarat", district: "Rajkot", annualRainfall: 620, monsoonRainfall: 530, preMonsooonRainfall: 45, postMonsoonRainfall: 45, rainyDays: 35, lat: 22.30, lon: 70.80 },
  { state: "Gujarat", district: "Gandhinagar", annualRainfall: 792, monsoonRainfall: 685, preMonsooonRainfall: 55, postMonsoonRainfall: 52, rainyDays: 40, lat: 23.22, lon: 72.64 },
  { state: "Gujarat", district: "Bhavnagar", annualRainfall: 580, monsoonRainfall: 490, preMonsooonRainfall: 42, postMonsoonRainfall: 48, rainyDays: 33, lat: 21.76, lon: 72.15 },
  { state: "Gujarat", district: "Jamnagar", annualRainfall: 520, monsoonRainfall: 445, preMonsooonRainfall: 38, postMonsoonRainfall: 37, rainyDays: 30, lat: 22.47, lon: 70.07 },
  { state: "Gujarat", district: "Junagadh", annualRainfall: 1120, monsoonRainfall: 960, preMonsooonRainfall: 75, postMonsoonRainfall: 85, rainyDays: 52, lat: 21.52, lon: 70.46 },
  // Uttar Pradesh
  { state: "Uttar Pradesh", district: "Lucknow", annualRainfall: 1027, monsoonRainfall: 820, preMonsooonRainfall: 80, postMonsoonRainfall: 127, rainyDays: 54, lat: 26.846, lon: 80.946 },
  { state: "Uttar Pradesh", district: "Agra", annualRainfall: 685, monsoonRainfall: 580, preMonsooonRainfall: 50, postMonsoonRainfall: 55, rainyDays: 38, lat: 27.177, lon: 78.008 },
  { state: "Uttar Pradesh", district: "Kanpur", annualRainfall: 875, monsoonRainfall: 720, preMonsooonRainfall: 65, postMonsoonRainfall: 90, rainyDays: 48, lat: 26.47, lon: 80.33 },
  { state: "Uttar Pradesh", district: "Varanasi", annualRainfall: 1095, monsoonRainfall: 880, preMonsooonRainfall: 85, postMonsoonRainfall: 130, rainyDays: 58, lat: 25.32, lon: 82.97 },
  { state: "Uttar Pradesh", district: "Allahabad", annualRainfall: 1030, monsoonRainfall: 820, preMonsooonRainfall: 80, postMonsoonRainfall: 130, rainyDays: 55, lat: 25.45, lon: 81.84 },
  { state: "Uttar Pradesh", district: "Meerut", annualRainfall: 865, monsoonRainfall: 720, preMonsooonRainfall: 68, postMonsoonRainfall: 77, rainyDays: 45, lat: 28.98, lon: 77.71 },
  { state: "Uttar Pradesh", district: "Ghaziabad", annualRainfall: 840, monsoonRainfall: 695, preMonsooonRainfall: 68, postMonsoonRainfall: 77, rainyDays: 44, lat: 28.67, lon: 77.45 },
  { state: "Uttar Pradesh", district: "Bareilly", annualRainfall: 1020, monsoonRainfall: 820, preMonsooonRainfall: 82, postMonsoonRainfall: 118, rainyDays: 52, lat: 28.35, lon: 79.43 },
  { state: "Uttar Pradesh", district: "Mathura", annualRainfall: 650, monsoonRainfall: 545, preMonsooonRainfall: 50, postMonsoonRainfall: 55, rainyDays: 36, lat: 27.49, lon: 77.67 },
  { state: "Uttar Pradesh", district: "Aligarh", annualRainfall: 745, monsoonRainfall: 625, preMonsooonRainfall: 58, postMonsoonRainfall: 62, rainyDays: 40, lat: 27.88, lon: 78.08 },
  { state: "Uttar Pradesh", district: "Muzaffarnagar", annualRainfall: 920, monsoonRainfall: 755, preMonsooonRainfall: 72, postMonsoonRainfall: 93, rainyDays: 48, lat: 29.47, lon: 77.70 },
  { state: "Uttar Pradesh", district: "Gorakhpur", annualRainfall: 1240, monsoonRainfall: 1000, preMonsooonRainfall: 95, postMonsoonRainfall: 145, rainyDays: 62, lat: 26.76, lon: 83.37 },
  // Punjab
  { state: "Punjab", district: "Ludhiana", annualRainfall: 678, monsoonRainfall: 520, preMonsooonRainfall: 68, postMonsoonRainfall: 90, rainyDays: 40, lat: 30.901, lon: 75.857 },
  { state: "Punjab", district: "Amritsar", annualRainfall: 662, monsoonRainfall: 495, preMonsooonRainfall: 75, postMonsoonRainfall: 92, rainyDays: 38, lat: 31.63, lon: 74.87 },
  { state: "Punjab", district: "Jalandhar", annualRainfall: 650, monsoonRainfall: 490, preMonsooonRainfall: 72, postMonsoonRainfall: 88, rainyDays: 38, lat: 31.33, lon: 75.58 },
  { state: "Punjab", district: "Patiala", annualRainfall: 690, monsoonRainfall: 545, preMonsooonRainfall: 62, postMonsoonRainfall: 83, rainyDays: 40, lat: 30.34, lon: 76.39 },
  { state: "Punjab", district: "Bathinda", annualRainfall: 430, monsoonRainfall: 330, preMonsooonRainfall: 42, postMonsoonRainfall: 58, rainyDays: 28, lat: 30.21, lon: 74.95 },
  { state: "Punjab", district: "Gurdaspur", annualRainfall: 892, monsoonRainfall: 680, preMonsooonRainfall: 95, postMonsoonRainfall: 117, rainyDays: 48, lat: 32.04, lon: 75.40 },
  // Telangana
  { state: "Telangana", district: "Hyderabad", annualRainfall: 812, monsoonRainfall: 660, preMonsooonRainfall: 65, postMonsoonRainfall: 87, rainyDays: 48, lat: 17.385, lon: 78.487 },
  { state: "Telangana", district: "Adilabad", annualRainfall: 1120, monsoonRainfall: 920, preMonsooonRainfall: 90, postMonsoonRainfall: 110, rainyDays: 58, lat: 19.67, lon: 78.53 },
  { state: "Telangana", district: "Karimnagar", annualRainfall: 1060, monsoonRainfall: 870, preMonsooonRainfall: 85, postMonsoonRainfall: 105, rainyDays: 56, lat: 18.44, lon: 79.13 },
  { state: "Telangana", district: "Warangal", annualRainfall: 1000, monsoonRainfall: 820, preMonsooonRainfall: 80, postMonsoonRainfall: 100, rainyDays: 54, lat: 17.98, lon: 79.60 },
  { state: "Telangana", district: "Nizamabad", annualRainfall: 1050, monsoonRainfall: 860, preMonsooonRainfall: 85, postMonsoonRainfall: 105, rainyDays: 56, lat: 18.67, lon: 78.10 },
  { state: "Telangana", district: "Nalgonda", annualRainfall: 820, monsoonRainfall: 670, preMonsooonRainfall: 65, postMonsoonRainfall: 85, rainyDays: 50, lat: 17.06, lon: 79.27 },
  { state: "Telangana", district: "Mahabubnagar", annualRainfall: 780, monsoonRainfall: 630, preMonsooonRainfall: 62, postMonsoonRainfall: 88, rainyDays: 48, lat: 16.74, lon: 78.00 },
  { state: "Telangana", district: "Medak", annualRainfall: 870, monsoonRainfall: 710, preMonsooonRainfall: 68, postMonsoonRainfall: 92, rainyDays: 52, lat: 18.05, lon: 78.26 },
  { state: "Telangana", district: "Khammam", annualRainfall: 1100, monsoonRainfall: 900, preMonsooonRainfall: 88, postMonsoonRainfall: 112, rainyDays: 58, lat: 17.25, lon: 80.15 },
  // West Bengal
  { state: "West Bengal", district: "Kolkata", annualRainfall: 1800, monsoonRainfall: 1400, preMonsooonRainfall: 150, postMonsoonRainfall: 250, rainyDays: 75, lat: 22.573, lon: 88.364 },
  { state: "West Bengal", district: "Hooghly", annualRainfall: 1750, monsoonRainfall: 1360, preMonsooonRainfall: 145, postMonsoonRainfall: 245, rainyDays: 73, lat: 22.90, lon: 88.40 },
  { state: "West Bengal", district: "Howrah", annualRainfall: 1800, monsoonRainfall: 1400, preMonsooonRainfall: 148, postMonsoonRainfall: 252, rainyDays: 74, lat: 22.59, lon: 88.26 },
  { state: "West Bengal", district: "Bardhaman", annualRainfall: 1420, monsoonRainfall: 1110, preMonsooonRainfall: 120, postMonsoonRainfall: 190, rainyDays: 65, lat: 23.23, lon: 87.85 },
  { state: "West Bengal", district: "Murshidabad", annualRainfall: 1620, monsoonRainfall: 1280, preMonsooonRainfall: 135, postMonsoonRainfall: 205, rainyDays: 68, lat: 24.18, lon: 88.27 },
  { state: "West Bengal", district: "Nadia", annualRainfall: 1680, monsoonRainfall: 1320, preMonsooonRainfall: 140, postMonsoonRainfall: 220, rainyDays: 70, lat: 23.47, lon: 88.58 },
  // Madhya Pradesh
  { state: "Madhya Pradesh", district: "Bhopal", annualRainfall: 1146, monsoonRainfall: 920, preMonsooonRainfall: 88, postMonsoonRainfall: 138, rainyDays: 62, lat: 23.259, lon: 77.413 },
  { state: "Madhya Pradesh", district: "Indore", annualRainfall: 1065, monsoonRainfall: 878, preMonsooonRainfall: 82, postMonsoonRainfall: 105, rainyDays: 58, lat: 22.72, lon: 75.86 },
  { state: "Madhya Pradesh", district: "Jabalpur", annualRainfall: 1410, monsoonRainfall: 1160, preMonsooonRainfall: 110, postMonsoonRainfall: 140, rainyDays: 68, lat: 23.18, lon: 79.94 },
  { state: "Madhya Pradesh", district: "Gwalior", annualRainfall: 795, monsoonRainfall: 668, preMonsooonRainfall: 60, postMonsoonRainfall: 67, rainyDays: 44, lat: 26.23, lon: 78.17 },
  { state: "Madhya Pradesh", district: "Ujjain", annualRainfall: 980, monsoonRainfall: 820, preMonsooonRainfall: 75, postMonsoonRainfall: 85, rainyDays: 54, lat: 23.18, lon: 75.78 },
  { state: "Madhya Pradesh", district: "Sagar", annualRainfall: 1200, monsoonRainfall: 995, preMonsooonRainfall: 92, postMonsoonRainfall: 113, rainyDays: 60, lat: 23.83, lon: 78.74 },
  { state: "Madhya Pradesh", district: "Rewa", annualRainfall: 1125, monsoonRainfall: 920, preMonsooonRainfall: 88, postMonsoonRainfall: 117, rainyDays: 58, lat: 24.53, lon: 81.30 },
  // Haryana
  { state: "Haryana", district: "Gurugram", annualRainfall: 714, monsoonRainfall: 590, preMonsooonRainfall: 60, postMonsoonRainfall: 64, rainyDays: 36, lat: 28.459, lon: 77.026 },
  { state: "Haryana", district: "Faridabad", annualRainfall: 700, monsoonRainfall: 580, preMonsooonRainfall: 58, postMonsoonRainfall: 62, rainyDays: 35, lat: 28.41, lon: 77.31 },
  { state: "Haryana", district: "Ambala", annualRainfall: 1000, monsoonRainfall: 800, preMonsooonRainfall: 90, postMonsoonRainfall: 110, rainyDays: 50, lat: 30.38, lon: 76.78 },
  { state: "Haryana", district: "Karnal", annualRainfall: 765, monsoonRainfall: 625, preMonsooonRainfall: 68, postMonsoonRainfall: 72, rainyDays: 40, lat: 29.69, lon: 76.99 },
  { state: "Haryana", district: "Hisar", annualRainfall: 415, monsoonRainfall: 335, preMonsooonRainfall: 38, postMonsoonRainfall: 42, rainyDays: 25, lat: 29.16, lon: 75.72 },
  { state: "Haryana", district: "Rohtak", annualRainfall: 570, monsoonRainfall: 470, preMonsooonRainfall: 48, postMonsoonRainfall: 52, rainyDays: 32, lat: 28.89, lon: 76.60 },
  { state: "Haryana", district: "Panipat", annualRainfall: 700, monsoonRainfall: 580, preMonsooonRainfall: 58, postMonsoonRainfall: 62, rainyDays: 36, lat: 29.39, lon: 76.97 },
  // Kerala
  { state: "Kerala", district: "Kochi", annualRainfall: 3100, monsoonRainfall: 2200, preMonsooonRainfall: 350, postMonsoonRainfall: 550, rainyDays: 120, lat: 9.932, lon: 76.267 },
  { state: "Kerala", district: "Ernakulam", annualRainfall: 3100, monsoonRainfall: 2200, preMonsooonRainfall: 350, postMonsoonRainfall: 550, rainyDays: 120, lat: 9.93, lon: 76.27 },
  { state: "Kerala", district: "Alappuzha", annualRainfall: 2800, monsoonRainfall: 2000, preMonsooonRainfall: 320, postMonsoonRainfall: 480, rainyDays: 115, lat: 9.49, lon: 76.33 },
  { state: "Kerala", district: "Kozhikode", annualRainfall: 3500, monsoonRainfall: 2700, preMonsooonRainfall: 380, postMonsoonRainfall: 420, rainyDays: 130, lat: 11.25, lon: 75.78 },
  { state: "Kerala", district: "Thiruvananthapuram", annualRainfall: 1750, monsoonRainfall: 1350, preMonsooonRainfall: 200, postMonsoonRainfall: 200, rainyDays: 96, lat: 8.52, lon: 76.94 },
  { state: "Kerala", district: "Thrissur", annualRainfall: 3200, monsoonRainfall: 2350, preMonsooonRainfall: 360, postMonsoonRainfall: 490, rainyDays: 122, lat: 10.52, lon: 76.21 },
  { state: "Kerala", district: "Palakkad", annualRainfall: 2400, monsoonRainfall: 1800, preMonsooonRainfall: 280, postMonsoonRainfall: 320, rainyDays: 110, lat: 10.78, lon: 76.65 },
  { state: "Kerala", district: "Malappuram", annualRainfall: 3200, monsoonRainfall: 2500, preMonsooonRainfall: 350, postMonsoonRainfall: 350, rainyDays: 125, lat: 11.07, lon: 76.07 },
  // Bihar
  { state: "Bihar", district: "Patna", annualRainfall: 1085, monsoonRainfall: 880, preMonsooonRainfall: 88, postMonsoonRainfall: 117, rainyDays: 58, lat: 25.595, lon: 85.137 },
  { state: "Bihar", district: "Muzaffarpur", annualRainfall: 1215, monsoonRainfall: 985, preMonsooonRainfall: 98, postMonsoonRainfall: 132, rainyDays: 62, lat: 26.12, lon: 85.39 },
  { state: "Bihar", district: "Gaya", annualRainfall: 1010, monsoonRainfall: 820, preMonsooonRainfall: 82, postMonsoonRainfall: 108, rainyDays: 55, lat: 24.80, lon: 85.01 },
  { state: "Bihar", district: "Bhagalpur", annualRainfall: 1225, monsoonRainfall: 1000, preMonsooonRainfall: 95, postMonsoonRainfall: 130, rainyDays: 62, lat: 25.25, lon: 86.98 },
  { state: "Bihar", district: "Darbhanga", annualRainfall: 1285, monsoonRainfall: 1040, preMonsooonRainfall: 102, postMonsoonRainfall: 143, rainyDays: 64, lat: 26.17, lon: 85.90 },
  { state: "Bihar", district: "Purnia", annualRainfall: 1460, monsoonRainfall: 1180, preMonsooonRainfall: 118, postMonsoonRainfall: 162, rainyDays: 68, lat: 25.79, lon: 87.47 },
  // Andhra Pradesh
  { state: "Andhra Pradesh", district: "Visakhapatnam", annualRainfall: 1110, monsoonRainfall: 780, preMonsooonRainfall: 120, postMonsoonRainfall: 210, rainyDays: 58, lat: 17.69, lon: 83.22 },
  { state: "Andhra Pradesh", district: "Guntur", annualRainfall: 900, monsoonRainfall: 640, preMonsooonRainfall: 100, postMonsoonRainfall: 160, rainyDays: 52, lat: 16.31, lon: 80.44 },
  { state: "Andhra Pradesh", district: "Kurnool", annualRainfall: 650, monsoonRainfall: 490, preMonsooonRainfall: 75, postMonsoonRainfall: 85, rainyDays: 42, lat: 15.83, lon: 78.04 },
  { state: "Andhra Pradesh", district: "Anantapur", annualRainfall: 560, monsoonRainfall: 415, preMonsooonRainfall: 68, postMonsoonRainfall: 77, rainyDays: 38, lat: 14.68, lon: 77.60 },
  { state: "Andhra Pradesh", district: "Chittoor", annualRainfall: 820, monsoonRainfall: 580, preMonsooonRainfall: 95, postMonsoonRainfall: 145, rainyDays: 52, lat: 13.21, lon: 79.10 },
  // Assam
  { state: "Assam", district: "Kamrup", annualRainfall: 1700, monsoonRainfall: 1350, preMonsooonRainfall: 180, postMonsoonRainfall: 170, rainyDays: 90, lat: 26.14, lon: 91.74 },
  { state: "Assam", district: "Dibrugarh", annualRainfall: 2780, monsoonRainfall: 2200, preMonsooonRainfall: 280, postMonsoonRainfall: 300, rainyDays: 120, lat: 27.49, lon: 94.91 },
  // Chhattisgarh
  { state: "Chhattisgarh", district: "Raipur", annualRainfall: 1300, monsoonRainfall: 1080, preMonsooonRainfall: 105, postMonsoonRainfall: 115, rainyDays: 65, lat: 21.25, lon: 81.63 },
  { state: "Chhattisgarh", district: "Durg", annualRainfall: 1240, monsoonRainfall: 1025, preMonsooonRainfall: 100, postMonsoonRainfall: 115, rainyDays: 63, lat: 21.19, lon: 81.28 },
  { state: "Chhattisgarh", district: "Bilaspur", annualRainfall: 1200, monsoonRainfall: 985, preMonsooonRainfall: 95, postMonsoonRainfall: 120, rainyDays: 62, lat: 22.09, lon: 82.15 },
  // Jharkhand
  { state: "Jharkhand", district: "Ranchi", annualRainfall: 1460, monsoonRainfall: 1200, preMonsooonRainfall: 120, postMonsoonRainfall: 140, rainyDays: 70, lat: 23.36, lon: 85.33 },
  { state: "Jharkhand", district: "Dhanbad", annualRainfall: 1380, monsoonRainfall: 1130, preMonsooonRainfall: 112, postMonsoonRainfall: 138, rainyDays: 68, lat: 23.80, lon: 86.43 },
  // Odisha
  { state: "Odisha", district: "Khordha", annualRainfall: 1620, monsoonRainfall: 1300, preMonsooonRainfall: 130, postMonsoonRainfall: 190, rainyDays: 72, lat: 20.18, lon: 85.73 },
  { state: "Odisha", district: "Cuttack", annualRainfall: 1520, monsoonRainfall: 1220, preMonsooonRainfall: 120, postMonsoonRainfall: 180, rainyDays: 70, lat: 20.46, lon: 85.88 },
  { state: "Odisha", district: "Sambalpur", annualRainfall: 1450, monsoonRainfall: 1180, preMonsooonRainfall: 115, postMonsoonRainfall: 155, rainyDays: 68, lat: 21.47, lon: 83.97 },
  // Uttarakhand
  { state: "Uttarakhand", district: "Dehradun", annualRainfall: 2158, monsoonRainfall: 1580, preMonsooonRainfall: 290, postMonsoonRainfall: 288, rainyDays: 90, lat: 30.32, lon: 78.03 },
  { state: "Uttarakhand", district: "Haridwar", annualRainfall: 1210, monsoonRainfall: 950, preMonsooonRainfall: 140, postMonsoonRainfall: 120, rainyDays: 65, lat: 29.96, lon: 78.16 },
  // Himachal Pradesh
  { state: "Himachal Pradesh", district: "Kangra", annualRainfall: 2030, monsoonRainfall: 1450, preMonsooonRainfall: 260, postMonsoonRainfall: 320, rainyDays: 88, lat: 32.10, lon: 76.27 },
  // Jammu & Kashmir
  { state: "Jammu & Kashmir", district: "Srinagar", annualRainfall: 760, monsoonRainfall: 460, preMonsooonRainfall: 180, postMonsoonRainfall: 120, rainyDays: 55, lat: 34.08, lon: 74.80 },
  { state: "Jammu & Kashmir", district: "Jammu", annualRainfall: 1100, monsoonRainfall: 760, preMonsooonRainfall: 185, postMonsoonRainfall: 155, rainyDays: 60, lat: 32.73, lon: 74.87 },
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
