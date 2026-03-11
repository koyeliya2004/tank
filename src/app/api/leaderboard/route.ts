import { NextRequest, NextResponse } from "next/server";

const KVDB_BUCKET = process.env.KVDB_BUCKET_ID || "jalnet_leaderboard_v1";
const KVDB_BASE = `https://kvdb.io/${KVDB_BUCKET}`;

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

// Seeded fallback entries (used if KVdb is unavailable)
const SEED_ENTRIES: LeaderboardEntry[] = [
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

async function fetchAllEntries(): Promise<LeaderboardEntry[]> {
  try {
    // KVdb stores all entries under key "entries" as a JSON array
    const res = await fetch(`${KVDB_BASE}/entries`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 0 },
    });
    if (!res.ok) return SEED_ENTRIES;
    const text = await res.text();
    if (!text || text.trim() === "") return SEED_ENTRIES;
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_ENTRIES;
    return parsed as LeaderboardEntry[];
  } catch {
    return SEED_ENTRIES;
  }
}

async function saveAllEntries(entries: LeaderboardEntry[]): Promise<void> {
  try {
    await fetch(`${KVDB_BASE}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    });
  } catch {
    // Silently fail — data will be lost on restart but app won't crash
    console.warn("[leaderboard] KVdb write failed");
  }
}

export async function GET() {
  const entries = await fetchAllEntries();
  const sorted = [...entries]
    .sort((a, b) => b.waterCredits - a.waterCredits)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const totalCommunityLiters = entries.reduce((s, e) => s + e.annualHarvestLiters, 0);
  const olympicPool = 2500000;

  return NextResponse.json({
    leaderboard: sorted,
    stats: {
      totalMembers: entries.length,
      totalCommunityLiters,
      totalWaterCredits: entries.reduce((s, e) => s + e.waterCredits, 0),
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

    const current = await fetchAllEntries();
    const updated = [...current, entry];
    await saveAllEntries(updated);

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}
