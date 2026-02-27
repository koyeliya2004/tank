import { NextRequest, NextResponse } from "next/server";
import { SUBSIDY_DATA, findSubsidy } from "@/lib/groundwater-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");

  if (state) {
    const subsidy = findSubsidy(state);
    return NextResponse.json({ subsidy, all: SUBSIDY_DATA });
  }

  return NextResponse.json({ all: SUBSIDY_DATA });
}
