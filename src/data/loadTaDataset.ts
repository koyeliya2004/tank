// TA dataset loader
// Reads the district-wise ground water resources CSV from thearchive/ta
// Source: CGWB Dynamic Ground Water Resources of India 2013 (via thearchive/ta)

import fs from "fs";
import path from "path";

export interface TaDistrictRecord {
  state: string;
  district: string;
  districtKey: string; // normalized: trimmed, lowercased, no diacritics
  recharge: number; // Annual Replenishable resources (Ham)
  draft: number; // Total annual Draft (Ham)
  extractionPercent: number; // Stage of Ground Water Development (%)
}

export interface TaDatasetResult {
  data: Record<string, TaDistrictRecord>;
  count: number;
  rawRows: number;
}

function normalizeKey(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

let _cached: TaDatasetResult | null = null;

export function loadTaDataset(): TaDatasetResult {
  if (_cached) return _cached;

  const csvPath = path.join(process.cwd(), "thearchive", "ta", "dt_wise_resources_2013_csv_1_1.csv");

  if (!fs.existsSync(csvPath)) {
    console.warn("[loadTaDataset] CSV file not found at", csvPath, "— returning empty dataset");
    _cached = { data: {}, count: 0, rawRows: 0 };
    return _cached;
  }

  const raw = fs.readFileSync(csvPath, "utf-8");
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  // First line is header
  const dataLines = lines.slice(1);

  const data: Record<string, TaDistrictRecord> = {};
  let rawRows = 0;

  for (const line of dataLines) {
    rawRows++;
    // CSV column indices (0-based), verified against actual header:
    // 0:  Sl.No
    // 1:  STATE
    // 2:  District
    // 3:  Recharge from Rainfall during Monsoon season(Ham)
    // 4:  Recharge From Other Sources during monsoon season(Ham)
    // 5:  Recharge from Rainfall during non-monsoon season(Ham)
    // 6:  Recharge From Other Sources during non-monsoon season(Ham)
    // 7:  Annual Replenishable resources(Ham)      <- recharge
    // 8:  Annual Natural Discharge (Ham)
    // 9:  Net Annual Ground Water Availability (Ham)
    // 10: Draft due to Irrigation Needs(Ham)
    // 11: Draft due to Domestic & Industrial Water Supply Needs(Ham)
    // 12: Total annual Draft(Ham)                  <- draft
    // 13: Projected demand for Domestic and Industrial uses upto 2025 (Ham)
    // 14: Ground Water Availability for Future Irrigation use (Ham)
    // 15: Stage of Ground Water Development (%)    <- extractionPercent
    const cols = line.split(",");
    if (cols.length < 16) {
      // Need at least 16 columns (indices 0-15) to read all required fields
      console.warn("[loadTaDataset] Skipping row with insufficient columns:", line.slice(0, 80));
      continue;
    }

    const state = cols[1]?.trim();
    const district = cols[2]?.trim();
    const recharge = parseFloat(cols[7]);
    const draft = parseFloat(cols[12]);
    const extractionPercent = parseFloat(cols[15]);

    if (!state || !district) {
      console.warn("[loadTaDataset] Missing state/district in row:", line.slice(0, 80));
      continue;
    }

    if (isNaN(recharge) || isNaN(draft) || isNaN(extractionPercent)) {
      console.warn(`[loadTaDataset] Invalid numeric fields for ${state}/${district}`);
      continue;
    }

    const districtKey = normalizeKey(district);
    data[districtKey] = { state, district, districtKey, recharge, draft, extractionPercent };
  }

  _cached = { data, count: Object.keys(data).length, rawRows };
  console.log(`[loadTaDataset] Loaded ${_cached.count} districts from ${rawRows} rows`);
  return _cached;
}
