"use client";
import { useEffect, useState } from "react";
import { Trophy, Droplets, Users, TrendingUp } from "lucide-react";
import { useLang } from "./lang-context";

interface LeaderboardEntry {
  id: string;
  name: string;
  location: string;
  state: string;
  waterCredits: number;
  annualHarvestLiters: number;
  roofArea: number;
  structureType: string;
  rank: number;
}

interface Stats {
  totalMembers: number;
  totalCommunityLiters: number;
  totalWaterCredits: number;
  olympicPoolsEquivalent: string;
  co2SavedKg: string;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.leaderboard || []);
        setStats(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-blue-400";
  };

  const rankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        {t("leaderboard")} — Water Credit Rankings
      </h2>

      {/* Community stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-900/30 border border-blue-600/20 rounded-xl p-3 text-center">
            <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">{stats.totalMembers}</div>
            <div className="text-xs text-blue-300">Community Members</div>
          </div>
          <div className="bg-cyan-900/30 border border-cyan-600/20 rounded-xl p-3 text-center">
            <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">{(stats.totalCommunityLiters / 1000).toFixed(0)}kL</div>
            <div className="text-xs text-cyan-300">Total Recharged</div>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-600/20 rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">{stats.olympicPoolsEquivalent}</div>
            <div className="text-xs text-emerald-300">Olympic Pools</div>
          </div>
          <div className="bg-purple-900/30 border border-purple-600/20 rounded-xl p-3 text-center">
            <div className="text-2xl mb-0.5">🌱</div>
            <div className="text-xl font-bold text-white">{Number(stats.co2SavedKg).toLocaleString()}kg</div>
            <div className="text-xs text-purple-300">CO₂ Saved</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-blue-300 py-8">Loading leaderboard...</div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-3 bg-blue-900/20 border rounded-xl p-3 transition hover:bg-blue-900/30 ${
                entry.rank <= 3 ? "border-yellow-500/30" : "border-blue-600/20"
              }`}
            >
              <div className={`text-lg font-bold w-8 text-center ${rankColor(entry.rank)}`}>
                {rankIcon(entry.rank)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm truncate">{entry.name}</div>
                <div className="text-xs text-blue-300">{entry.location}, {entry.state}</div>
                <div className="text-xs text-blue-400 mt-0.5">{entry.structureType} • {entry.roofArea} sqm</div>
              </div>
              <div className="text-right">
                <div className="text-blue-300 font-bold text-sm">
                  💧 {entry.waterCredits.toLocaleString()}
                </div>
                <div className="text-xs text-blue-400">credits</div>
                <div className="text-xs text-emerald-400">
                  {(entry.annualHarvestLiters / 1000).toFixed(0)} kL/yr
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-blue-400 text-center">
        1 Water Credit = 100 liters recharged. Complete an assessment to join the leaderboard.
      </p>
    </div>
  );
}
