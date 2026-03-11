import { NextResponse } from "next/server";

const KVDB_BUCKET = process.env.KVDB_BUCKET_ID || "jalnet_leaderboard_v1";
const KVDB_BASE = `https://kvdb.io/${KVDB_BUCKET}`;

const SEED_ENTRIES = [
  { id: "1", name: "Ramesh Sharma", location: "Jaipur", state: "Rajasthan", waterCredits: 4820, annualHarvestLiters: 482000 },
  { id: "2", name: "Priya Menon", location: "Kochi", state: "Kerala", waterCredits: 8650, annualHarvestLiters: 865000 },
  { id: "3", name: "Arjun Patel", location: "Ahmedabad", state: "Gujarat", waterCredits: 3240, annualHarvestLiters: 324000 },
  { id: "4", name: "Sunita Devi", location: "Patna", state: "Bihar", waterCredits: 6800, annualHarvestLiters: 680000 },
  { id: "5", name: "Mohammed Hussain", location: "Hyderabad", state: "Telangana", waterCredits: 2900, annualHarvestLiters: 290000 },
  { id: "6", name: "Kavita Iyer", location: "Chennai", state: "Tamil Nadu", waterCredits: 5600, annualHarvestLiters: 560000 },
  { id: "7", name: "Harpreet Singh", location: "Ludhiana", state: "Punjab", waterCredits: 2100, annualHarvestLiters: 210000 },
  { id: "8", name: "Anjali Kulkarni", location: "Pune", state: "Maharashtra", waterCredits: 3800, annualHarvestLiters: 380000 },
  { id: "9", name: "Ravi Kumar", location: "Bengaluru", state: "Karnataka", waterCredits: 4200, annualHarvestLiters: 420000 },
  { id: "10", name: "Meena Sharma", location: "Delhi", state: "Delhi", waterCredits: 1800, annualHarvestLiters: 180000 },
];

export async function GET() {
  let entries = SEED_ENTRIES;
  try {
    const res = await fetch(`${KVDB_BASE}/entries`, { next: { revalidate: 0 } });
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim() !== "") {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) entries = parsed;
      }
    }
  } catch { /* use seed */ }

  // Group by state
  const stateMap: Record<string, { state: string; members: number; totalCredits: number; totalLiters: number; topContributor: string }> = {};
  for (const e of entries) {
    const key = e.state || "Other";
    if (!stateMap[key]) {
      stateMap[key] = { state: key, members: 0, totalCredits: 0, totalLiters: 0, topContributor: e.name };
    }
    stateMap[key].members++;
    stateMap[key].totalCredits += e.waterCredits;
    stateMap[key].totalLiters += e.annualHarvestLiters;
    if (e.waterCredits > (stateMap[key].totalCredits - e.waterCredits)) {
      stateMap[key].topContributor = e.name;
    }
  }

  const ranked = Object.values(stateMap)
    .sort((a, b) => b.totalCredits - a.totalCredits)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  return NextResponse.json({ districts: ranked });
}
