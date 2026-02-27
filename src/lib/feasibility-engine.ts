// RTRWH Feasibility Engine
// Based on CGWB Technical Manual on Artificial Recharge to Ground Water

import {
  AquiferData,
  RainfallData,
  RUNOFF_COEFFICIENTS,
  RECHARGE_STRUCTURE_PARAMS,
} from "./groundwater-data";

export interface AssessmentInput {
  name: string;
  location: string;
  lat: number;
  lon: number;
  state: string;
  dwellers: number;
  roofArea: number; // sqm
  roofMaterial: string;
  openSpaceArea: number; // sqm
  storageAvailable: boolean;
  existingBorewell: boolean;
}

export interface StructureRecommendation {
  type: string;
  name: string;
  length?: number;
  width?: number;
  depth: number;
  diameter?: number;
  volume: number; // cubic meters
  estimatedCost: number; // INR
  filter_media: string;
  reason: string;
  suitability: "Highly Recommended" | "Recommended" | "Optional";
}

export interface AssessmentResult {
  input: AssessmentInput;
  aquifer: AquiferData;
  rainfall: RainfallData;
  feasibility: {
    score: number; // 0-100
    status: "Highly Feasible" | "Feasible" | "Moderately Feasible" | "Low Feasibility";
    reasons: string[];
  };
  waterHarvest: {
    runoffCoefficient: number;
    annualHarvestable: number; // liters/year
    dailyAverage: number; // liters/day
    monsoonHarvest: number; // liters
    perPersonPerDay: number; // liters
    predictiveWeeklyForecast: number; // liters (based on forecast)
  };
  structures: StructureRecommendation[];
  costBenefit: {
    totalInstallationCost: number;
    annualMaintenanceCost: number;
    annualWaterValueINR: number;
    paybackPeriodYears: number;
    waterSavedPerYear: number; // kL
    co2SavedKg: number;
  };
  aquiferInfo: {
    name: string;
    type: string;
    depthToWater: number;
    thickness: number;
    quality: string;
    category: string;
    rechargePotential: string;
    stageOfExtraction: number;
  };
  waterCredits: number;
  impactEquivalent: string;
}

export function runFeasibilityAssessment(
  input: AssessmentInput,
  aquifer: AquiferData,
  rainfall: RainfallData
): AssessmentResult {
  const runoffCoeff = RUNOFF_COEFFICIENTS[input.roofMaterial] || 0.80;

  // Annual harvestable volume = Roof Area × Annual Rainfall × Runoff Coefficient × First Flush Deduction
  const firstFlushDeduction = 0.95; // lose ~5% for first flush
  const annualHarvestable = input.roofArea * (rainfall.annualRainfall / 1000) * runoffCoeff * firstFlushDeduction * 1000; // liters
  const monsoonHarvest = input.roofArea * (rainfall.monsoonRainfall / 1000) * runoffCoeff * firstFlushDeduction * 1000;
  const dailyAverage = annualHarvestable / 365;
  const perPersonPerDay = dailyAverage / input.dwellers;

  // Predictive weekly forecast - using next 7 days average rainfall (simulated; real: from OpenWeather)
  const avgDailyRainfall = rainfall.annualRainfall / 365;
  const predictiveWeeklyForecast = input.roofArea * (avgDailyRainfall * 7 / 1000) * runoffCoeff * firstFlushDeduction * 1000;

  // Feasibility score
  let score = 50;
  const reasons: string[] = [];

  if (rainfall.annualRainfall > 1000) { score += 20; reasons.push("High annual rainfall (>1000mm) - excellent harvesting potential"); }
  else if (rainfall.annualRainfall > 600) { score += 10; reasons.push("Moderate annual rainfall (600-1000mm) - good harvesting potential"); }
  else { score -= 10; reasons.push("Low annual rainfall (<600mm) - limited harvesting, recharge focus recommended"); }

  if (input.roofArea > 100) { score += 15; reasons.push(`Large roof area (${input.roofArea} sqm) provides substantial collection surface`); }
  else if (input.roofArea > 50) { score += 8; reasons.push(`Medium roof area (${input.roofArea} sqm) suitable for basic RTRWH`); }
  else { reasons.push(`Small roof area (${input.roofArea} sqm) - limited collection capacity`); }

  if (aquifer.rechargePotential === "High") { score += 15; reasons.push("High aquifer recharge potential in this area"); }
  else if (aquifer.rechargePotential === "Medium") { score += 8; reasons.push("Moderate aquifer recharge potential"); }
  else { reasons.push("Low aquifer recharge potential - pre-treatment required"); }

  if (aquifer.category === "Over-Exploited" || aquifer.category === "Critical") {
    score += 10; reasons.push(`Groundwater in ${aquifer.category} stage - artificial recharge is CRITICAL`);
  }

  if (input.openSpaceArea > 50) { score += 5; reasons.push("Available open space suitable for percolation/recharge structures"); }
  if (input.existingBorewell) { score += 5; reasons.push("Existing borewell can be used for direct recharge injection"); }

  score = Math.min(100, Math.max(0, score));
  const status = score >= 75 ? "Highly Feasible" : score >= 55 ? "Feasible" : score >= 35 ? "Moderately Feasible" : "Low Feasibility";

  // Structure recommendations
  const structures: StructureRecommendation[] = [];

  // Recharge Pit (for smaller areas or alongside main system)
  if (input.roofArea <= 150 || input.openSpaceArea < 50) {
    const pitCount = Math.ceil(input.roofArea / 80);
    const pit = RECHARGE_STRUCTURE_PARAMS.recharge_pit;
    structures.push({
      type: "recharge_pit",
      name: pit.name,
      length: pit.typical_length * pitCount,
      width: pit.typical_width,
      depth: pit.typical_depth,
      volume: pit.typical_length * pit.typical_width * pit.typical_depth * pitCount,
      estimatedCost: pit.cost_per_unit_inr * pitCount,
      filter_media: pit.filter_media,
      reason: `${pitCount} pit(s) recommended for ${input.roofArea} sqm roof. Ideal for ${input.location}.`,
      suitability: "Highly Recommended",
    });
  }

  // Recharge Trench
  if (input.roofArea >= 50 && input.openSpaceArea >= 20) {
    const trench = RECHARGE_STRUCTURE_PARAMS.recharge_trench;
    const trenchLength = Math.max(3, Math.ceil(input.roofArea / 30));
    structures.push({
      type: "recharge_trench",
      name: trench.name,
      length: trenchLength,
      width: trench.typical_width,
      depth: trench.typical_depth,
      volume: trenchLength * trench.typical_width * trench.typical_depth,
      estimatedCost: trench.cost_per_meter_inr * trenchLength,
      filter_media: trench.filter_media,
      reason: `${trenchLength}m trench for ${input.roofArea} sqm roof. Suitable for open space of ${input.openSpaceArea} sqm.`,
      suitability: input.roofArea >= 100 ? "Highly Recommended" : "Recommended",
    });
  }

  // Recharge shaft if water table is deep
  if (aquifer.depthToWater > 15 || input.existingBorewell) {
    const shaft = RECHARGE_STRUCTURE_PARAMS.recharge_shaft;
    structures.push({
      type: "recharge_shaft",
      name: shaft.name,
      depth: shaft.typical_depth,
      diameter: shaft.typical_diameter,
      volume: Math.PI * Math.pow(shaft.typical_diameter / 2, 2) * shaft.typical_depth,
      estimatedCost: shaft.cost_per_unit_inr,
      filter_media: shaft.filter_media,
      reason: `Water table at ${aquifer.depthToWater}m BGL. Shaft/borewell injection needed to reach aquifer.`,
      suitability: aquifer.depthToWater > 20 ? "Highly Recommended" : "Recommended",
    });
  }

  // Percolation tank for large open spaces
  if (input.openSpaceArea >= 100) {
    const tank = RECHARGE_STRUCTURE_PARAMS.percolation_tank;
    structures.push({
      type: "percolation_tank",
      name: tank.name,
      depth: 2,
      volume: tank.typical_capacity_liters / 1000,
      estimatedCost: tank.cost_per_unit_inr,
      filter_media: "Natural soil filter",
      reason: `Large open space (${input.openSpaceArea} sqm) available for percolation tank construction.`,
      suitability: "Recommended",
    });
  }

  // Cost-benefit analysis
  const totalInstallationCost = structures.reduce((s, r) => s + r.estimatedCost, 0);
  const annualMaintenanceCost = totalInstallationCost * 0.05; // 5% of installation
  const waterCostPerLiter = 0.005; // INR per liter (municipal water @ ₹5/kL)
  const annualWaterValueINR = annualHarvestable * waterCostPerLiter;
  const paybackPeriodYears = annualWaterValueINR > 0
    ? (totalInstallationCost + annualMaintenanceCost) / annualWaterValueINR
    : 999;
  const waterSavedPerYear = annualHarvestable / 1000; // kL
  const co2SavedKg = waterSavedPerYear * 0.344; // 0.344 kg CO2 per kL water treated

  // Water credits (1 credit = 100 liters recharged)
  const waterCredits = Math.floor(annualHarvestable / 100);

  // Impact equivalent
  const olympicPoolLiters = 2500000;
  const pools = annualHarvestable / olympicPoolLiters;
  const impactEquivalent = pools >= 1
    ? `Equivalent to filling ${pools.toFixed(2)} Olympic swimming pools per year`
    : `Equivalent to filling ${(annualHarvestable / 1000).toFixed(0)} water tanks (1000L each) per year`;

  return {
    input,
    aquifer,
    rainfall,
    feasibility: { score, status, reasons },
    waterHarvest: {
      runoffCoefficient: runoffCoeff,
      annualHarvestable,
      dailyAverage,
      monsoonHarvest,
      perPersonPerDay,
      predictiveWeeklyForecast,
    },
    structures,
    costBenefit: {
      totalInstallationCost,
      annualMaintenanceCost,
      annualWaterValueINR,
      paybackPeriodYears,
      waterSavedPerYear,
      co2SavedKg,
    },
    aquiferInfo: {
      name: `${aquifer.region} ${aquifer.aquiferType} Aquifer`,
      type: aquifer.aquiferType,
      depthToWater: aquifer.depthToWater,
      thickness: aquifer.aquiferThickness,
      quality: aquifer.waterQuality,
      category: aquifer.category,
      rechargePotential: aquifer.rechargePotential,
      stageOfExtraction: aquifer.stageOfExtraction,
    },
    waterCredits,
    impactEquivalent,
  };
}
