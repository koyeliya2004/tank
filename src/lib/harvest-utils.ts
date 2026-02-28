// Harvest and cost utilities
// Unit-safe calculations for rainwater harvesting

// Default cost rate (INR per m²) — configurable via COST_RATE or REACT_APP_COST_RATE env var
export const DEFAULT_COST_RATE = 120; // INR/m²

/**
 * Compute harvestable water in liters from rainfall and roof area.
 * 1 mm over 1 m² = 1 liter.
 * Returns 0 for any invalid/zero inputs.
 */
export function computeHarvestFromRainfall(
  rainfallMm: number,
  roofAreaM2: number,
  runoffCoefficient = 0.8,
  firstFlushFactor = 0.95
): number {
  if (!rainfallMm || rainfallMm <= 0) return 0;
  if (!roofAreaM2 || roofAreaM2 <= 0) return 0;
  return rainfallMm * roofAreaM2 * runoffCoefficient * firstFlushFactor;
}

/**
 * Compute installation cost based on roof area and rate.
 * @param roofAreaM2 Roof area in square meters
 * @param rate INR per m² (defaults to env var or DEFAULT_COST_RATE)
 */
export function computeCost(
  roofAreaM2: number,
  rate: number = DEFAULT_COST_RATE
): { cost: number; rate: number } {
  const effectiveRate = rate > 0 ? rate : DEFAULT_COST_RATE;
  return { cost: roofAreaM2 * effectiveRate, rate: effectiveRate };
}

/**
 * Get configured cost rate from environment variables.
 * Server-side only (reads process.env).
 */
export function getCostRate(): number {
  const envRate =
    (typeof process !== "undefined" &&
      (process.env.REACT_APP_COST_RATE || process.env.COST_RATE)) ||
    "";
  const parsed = parseFloat(envRate);
  return parsed > 0 ? parsed : DEFAULT_COST_RATE;
}

export interface ConfidenceFactors {
  /** 1.0 = live API, 0.5 = fallback/estimated */
  apiFreshness: number;
  /** Fraction: loaded district count / expected total India districts (644) */
  datasetCoverage: number;
  /** 1.0 = no fallbacks used, 0.0 = fallback used */
  noFallbackUsed: number;
}

/**
 * Compute Data Accuracy / Confidence score (0–100).
 * Weights: apiFreshness 0.5, datasetCoverage 0.3, noFallbackUsed 0.2
 */
export function computeConfidenceScore(factors: ConfidenceFactors): number {
  const score =
    factors.apiFreshness * 0.5 +
    factors.datasetCoverage * 0.3 +
    factors.noFallbackUsed * 0.2;
  return Math.round(Math.min(1, Math.max(0, score)) * 100);
}

export const EXPECTED_INDIA_DISTRICTS = 644;
