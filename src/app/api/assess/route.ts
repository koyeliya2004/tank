import { NextRequest, NextResponse } from "next/server";
import { findNearestAquifer, findNearestRainfall } from "@/lib/groundwater-data";
import { runFeasibilityAssessment, AssessmentInput } from "@/lib/feasibility-engine";
import { loadTaDataset } from "@/data/loadTaDataset";
import { getCostRate, computeCost, EXPECTED_INDIA_DISTRICTS } from "@/lib/harvest-utils";

export async function POST(req: NextRequest) {
  try {
    const body: AssessmentInput = await req.json();

    if (!body.lat || !body.lon || !body.roofArea) {
      return NextResponse.json({ error: "lat, lon, and roofArea are required" }, { status: 400 });
    }

    const aquifer = findNearestAquifer(body.lat, body.lon);
    const rainfall = findNearestRainfall(body.lat, body.lon);

    // Load TA dataset and enrich aquifer data if district match found
    const taDataset = loadTaDataset();
    const districtKey = rainfall.district.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const taRecord = taDataset.data[districtKey] || null;
    if (taRecord) {
      // Override stage of extraction from real TA dataset if available
      aquifer.stageOfExtraction = taRecord.extractionPercent;
    } else {
      console.warn(`[assess] No TA dataset match for district: ${rainfall.district}`);
    }

    const result = runFeasibilityAssessment(body, aquifer, rainfall);

    // Dynamic cost based on roof area and configurable rate
    const costRate = getCostRate();
    const { cost: dynamicCost } = computeCost(body.roofArea, costRate);

    // Dataset coverage factor
    const datasetCoverage = Math.min(1, taDataset.count / EXPECTED_INDIA_DISTRICTS);

    return NextResponse.json({
      ...result,
      meta: {
        costRate,
        dynamicCost,
        taDatasetCount: taDataset.count,
        datasetCoverage,
        taRecordFound: taRecord !== null,
      },
    });
  } catch (e) {
    console.error("Assessment error:", e);
    return NextResponse.json({ error: "Assessment failed" }, { status: 500 });
  }
}


