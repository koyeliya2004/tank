import { NextRequest, NextResponse } from "next/server";

// In-memory leaderboard (production: use a database)
interface LeaderboardEntry {
  id: string;
  name: string;
  location: string;
  state: string;
  waterCredits: number;
  annualHarvestLiters: number;
  roofArea: number;
  structureType: string;
  timestamp: number;
  rank?: number;
}

// Seeded with realistic community entries from various Indian cities
const leaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Ramesh Sharma", location: "Jaipur", state: "Rajasthan", waterCredits: 4820, annualHarvestLiters: 482000, roofArea: 120, structureType: "Recharge Shaft", timestamp: Date.now() - 86400000 * 5 },
  { id: "2", name: "Priya Menon", location: "Kochi", state: "Kerala", waterCredits: 8650, annualHarvestLiters: 865000, roofArea: 200, structureType: "Percolation Tank", timestamp: Date.now() - 86400000 * 3 },
  { id: "3", name: "Arjun Patel", location: "Ahmedabad", state: "Gujarat", waterCredits: 3240, annualHarvestLiters: 324000, roofArea: 90, structureType: "Recharge Pit", timestamp: Date.now() - 86400000 * 7 },
  { id: "4", name: "Sunita Devi", location: "Patna", state: "Bihar", waterCredits: 6800, annualHarvestLiters: 680000, roofArea: 150, structureType: "Recharge Trench", timestamp: Date.now() - 86400000 * 2 },
  { id: "5", name: "Mohammed Hussain", location: "Hyderabad", state: "Telangana", waterCredits: 2900, annualHarvestLiters: 290000, roofArea: 80, structureType: "Recharge Shaft", timestamp: Date.now() - 86400000 * 1 },
  { id: "6", name: "Kavita Iyer", location: "Chennai", state: "Tamil Nadu", waterCredits: 5600, annualHarvestLiters: 560000, roofArea: 130, structureType: "Recharge Pit + Trench", timestamp: Date.now() - 86400000 * 6 },
  { id: "7", name: "Harpreet Singh", location: "Ludhiana", state: "Punjab", waterCredits: 2100, annualHarvestLiters: 210000, roofArea: 75, structureType: "Recharge Pit", timestamp: Date.now() - 86400000 * 4 },
  { id: "8", name: "Anjali Kulkarni", location: "Pune", state: "Maharashtra", waterCredits: 3800, annualHarvestLiters: 380000, roofArea: 110, structureType: "Recharge Trench", timestamp: Date.now() - 86400000 * 8 },
  { id: "9", name: "Ravi Kumar", location: "Bengaluru", state: "Karnataka", waterCredits: 4200, annualHarvestLiters: 420000, roofArea: 100, structureType: "Recharge Shaft", timestamp: Date.now() - 86400000 * 9 },
  { id: "10", name: "Meena Sharma", location: "Delhi", state: "Delhi", waterCredits: 1800, annualHarvestLiters: 180000, roofArea: 60, structureType: "Recharge Pit", timestamp: Date.now() - 86400000 * 10 },
];

let totalCommunityLiters = leaderboard.reduce((s, e) => s + e.annualHarvestLiters, 0);
let totalMembers = leaderboard.length;

export async function GET() {
  const sorted = [...leaderboard]
    .sort((a, b) => b.waterCredits - a.waterCredits)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const olympicPool = 2500000;
  return NextResponse.json({
    leaderboard: sorted,
    stats: {
      totalMembers,
      totalCommunityLiters,
      totalWaterCredits: leaderboard.reduce((s, e) => s + e.waterCredits, 0),
      olympicPoolsEquivalent: (totalCommunityLiters / olympicPool).toFixed(2),
      co2SavedKg: (totalCommunityLiters / 1000 * 0.344).toFixed(0),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: body.name || "Anonymous",
      location: body.location || "India",
      state: body.state || "India",
      waterCredits: body.waterCredits || 0,
      annualHarvestLiters: body.annualHarvestLiters || 0,
      roofArea: body.roofArea || 0,
      structureType: body.structureType || "Recharge Pit",
      timestamp: Date.now(),
    };

    leaderboard.push(entry);
    totalCommunityLiters += entry.annualHarvestLiters;
    totalMembers++;

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}
