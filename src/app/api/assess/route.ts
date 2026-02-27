import { NextRequest, NextResponse } from "next/server";
import { findNearestAquifer, findNearestRainfall } from "@/lib/groundwater-data";
import { runFeasibilityAssessment, AssessmentInput } from "@/lib/feasibility-engine";

export async function POST(req: NextRequest) {
  try {
    const body: AssessmentInput = await req.json();

    if (!body.lat || !body.lon || !body.roofArea) {
      return NextResponse.json({ error: "lat, lon, and roofArea are required" }, { status: 400 });
    }

    const aquifer = findNearestAquifer(body.lat, body.lon);
    const rainfall = findNearestRainfall(body.lat, body.lon);

    const result = runFeasibilityAssessment(body, aquifer, rainfall);

    return NextResponse.json(result);
  } catch (e) {
    console.error("Assessment error:", e);
    return NextResponse.json({ error: "Assessment failed" }, { status: 500 });
  }
}
