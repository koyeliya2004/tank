"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/lang-context";
import { MapPicker } from "@/components/map-picker";
import { ResultsDashboard } from "@/components/results-dashboard";
import { GeologicalTwin } from "@/components/geological-twin";
import { ARVisualization } from "@/components/ar-visualization";
import { Leaderboard } from "@/components/leaderboard";
import { Marketplace } from "@/components/marketplace";
import { SubsidyTracker } from "@/components/subsidy-tracker";
import { BlueprintGenerator } from "@/components/blueprint-generator";
import { AssessmentResult } from "@/lib/feasibility-engine";
import { RUNOFF_COEFFICIENTS, CGWB_AQUIFER_DATA } from "@/lib/groundwater-data";
import { ChevronRight, Droplets, Home, Loader2 } from "lucide-react";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

type Tab = "assess" | "results" | "leaderboard" | "marketplace" | "subsidy" | "blueprint";

export default function AssessmentPage() {
  const { t } = useLang();

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState<Tab>(() => {
    if (tabParam === "leaderboard" || tabParam === "assess") {
      return tabParam;
    }
    return "assess";
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [weatherData, setWeatherData] = useState<null | {
    weeklyRainfallMm: number;
    current: { temp: number; humidity: number; rainfall_mm: number; description: string; city: string };
    source: string;
  }>(null);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [dwellers, setDwellers] = useState(4);
  const [roofArea, setRoofArea] = useState(80);
  const [roofMaterial, setRoofMaterial] = useState("RCC/Concrete Flat");
  const [openSpaceArea, setOpenSpaceArea] = useState(30);
  const [storageAvailable, setStorageAvailable] = useState(false);
  const [existingBorewell, setExistingBorewell] = useState(false);

  useEffect(() => {
    if (tabParam === "leaderboard" || tabParam === "assess") {
      setTab(tabParam);
    }
  }, [tabParam]);

  const handleLocationSelect = (newLat: number, newLon: number, addr: string, detectedArea?: number) => {
    setLat(newLat);
    setLon(newLon);
    setLocation(addr.split(",").slice(0, 3).join(","));
    if (detectedArea) setRoofArea(detectedArea);

    // Auto-detect state from coordinates
    const nearest = CGWB_AQUIFER_DATA.reduce((prev, curr) => {
      const dPrev = Math.sqrt(Math.pow(prev.lat - newLat, 2) + Math.pow(prev.lon - newLon, 2));
      const dCurr = Math.sqrt(Math.pow(curr.lat - newLat, 2) + Math.pow(curr.lon - newLon, 2));
      return dCurr < dPrev ? curr : prev;
    });
    setState(nearest.state);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lon) {
      setError("Please drop a pin on the map to select your location.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Run assessment
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, location, lat, lon, state,
          dwellers, roofArea, roofMaterial,
          openSpaceArea, storageAvailable, existingBorewell,
        }),
      });
      const data: AssessmentResult = await res.json();
      setResult(data);

      // Fetch weather
      const weatherRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const wData = await weatherRes.json();
      setWeatherData(wData);

      // Submit to leaderboard
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location: location.split(",")[0]?.trim() || location,
          state,
          waterCredits: data.waterCredits,
          annualHarvestLiters: data.waterHarvest.annualHarvestable,
          roofArea,
          structureType: data.structures[0]?.name || "Recharge Pit",
        }),
      });

      setTab("results");
    } catch (err) {
      setError("Assessment failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; emoji: string; needsResult?: boolean }[] = [
    { id: "assess", label: "Assess", emoji: "📋" },
    { id: "results", label: "Results", emoji: "📊", needsResult: true },
    { id: "leaderboard", label: "Leaderboard", emoji: "🏆" },
    { id: "marketplace", label: "Vendors", emoji: "🏪", needsResult: true },
    { id: "subsidy", label: "Subsidies", emoji: "🏛️", needsResult: true },
    { id: "blueprint", label: "Blueprint", emoji: "📄", needsResult: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950/50 to-gray-950 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed833,transparent_60%)]" />
        <div
          className="absolute -right-24 top-24 h-72 w-72 opacity-25"
          style={{
            backgroundImage: "url('/globe.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </div>
      <div className="relative z-10">
      {/* Tab navigation */}
      <div className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-blue-800/20">
        <div className="max-w-3xl mx-auto px-3 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-300 blur-sm opacity-70" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/20">
                <Droplets className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-sm font-semibold">JalSetu</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-blue-200 bg-blue-900/30 border border-blue-700/30 px-3 py-1.5 rounded-full hover:bg-blue-900/50 transition"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
        <div className="max-w-3xl mx-auto px-3">
          <div className="flex gap-1.5 overflow-x-auto pb-2.5 scrollbar-hide">
            {tabs.map((tab_) => (
              <button
                key={tab_.id}
                onClick={() => {
                  if (tab_.needsResult && !result) return;
                  setTab(tab_.id);
                }}
                disabled={!!(tab_.needsResult && !result)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  tab === tab_.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20"
                    : tab_.needsResult && !result
                      ? "text-blue-800 cursor-not-allowed"
                      : "text-blue-300 hover:bg-blue-900/30 hover:text-white"
                }`}
              >
                <span>{tab_.emoji}</span>
                {tab_.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Assessment Tab */}
        {tab === "assess" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-white">RTRWH Feasibility Assessment</h1>
              <p className="text-blue-300/80 text-sm mt-2">
                Enter your details to assess rooftop rainwater harvesting potential
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-300 text-sm p-3.5 rounded-2xl flex items-center gap-2">
                <span className="text-red-400">⚠</span> {error}
              </div>
            )}

            {/* Personal Info */}
            <div className="glow-card bg-blue-950/30 border border-blue-700/20 rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center text-xs">👤</span>
                Personal Details
              </h2>
              <div>
                <label className="text-sm text-blue-200">{t("nameLabel")} *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1.5 bg-blue-900/30 border border-blue-600/30 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all placeholder:text-blue-500/50"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm text-blue-200">{t("dwellersLabel")} *</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={dwellers}
                  onChange={(e) => setDwellers(parseInt(e.target.value) || 1)}
                  className="w-full mt-1.5 bg-blue-900/30 border border-blue-600/30 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-blue-200">State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full mt-1.5 bg-blue-900/30 border border-blue-600/30 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                >
                  <option value="">Select or auto-detected from map</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Map + Roof */}
            <div className="glow-card bg-blue-950/30 border border-blue-700/20 rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center text-xs">📍</span>
                Location & Roof Details
              </h2>
              <p className="text-xs text-blue-400/80">
                Drop a pin on the map to auto-detect your aquifer, rainfall data and location.
                Use the CV button to detect roof area from satellite imagery.
              </p>
              <MapPicker
                onLocationSelect={handleLocationSelect}
                roofArea={roofArea}
                onRoofAreaChange={setRoofArea}
              />

              <div>
                <label className="text-sm text-blue-200">{t("roofMaterialLabel")}</label>
                <select
                  value={roofMaterial}
                  onChange={(e) => setRoofMaterial(e.target.value)}
                  className="w-full mt-1.5 bg-blue-900/30 border border-blue-600/30 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                >
                  {Object.keys(RUNOFF_COEFFICIENTS).map((m) => (
                    <option key={m} value={m}>{m} (coeff: {RUNOFF_COEFFICIENTS[m]})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Open Space + Options */}
            <div className="glow-card bg-blue-950/30 border border-blue-700/20 rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center text-xs">🏗️</span>
                Site Details
              </h2>
              <div>
                <label className="text-sm text-blue-200">{t("openSpaceLabel")}</label>
                <p className="text-xs text-blue-400/80 mt-0.5 mb-1.5">
                  Garden, courtyard, or vacant land available for recharge structures
                </p>
                <input
                  type="number"
                  min={0}
                  value={openSpaceArea}
                  onChange={(e) => setOpenSpaceArea(parseFloat(e.target.value) || 0)}
                  className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all placeholder:text-blue-500/50"
                  placeholder="e.g. 50"
                />
              </div>
              <div className="flex gap-5">
                <label className="flex items-center gap-2.5 text-sm text-blue-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={existingBorewell}
                    onChange={(e) => setExistingBorewell(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-500 accent-blue-500"
                  />
                  <span className="group-hover:text-white transition-colors">{t("borewellLabel")}</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-blue-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={storageAvailable}
                    onChange={(e) => setStorageAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-500 accent-blue-500"
                  />
                  <span className="group-hover:text-white transition-colors">{t("storageLabel")}</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all text-base shadow-xl shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Running CGWB Assessment...</>
              ) : (
                <>{t("calculateBtn")} <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        )}

        {/* Results Tab */}
        {tab === "results" && result && (
          <div className="space-y-6">
            <ResultsDashboard result={result} weatherData={weatherData} />
            <div className="glow-card bg-blue-950/30 border border-blue-700/20 rounded-2xl p-5">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🌍 {t("geologicalTwin")}
              </h2>
              <p className="text-sm text-blue-300/80 mb-4">
                3D subsurface visualization of the aquifer beneath your location
              </p>
              <GeologicalTwin aquifer={result.aquifer} />
            </div>
            <div className="glow-card bg-blue-950/30 border border-blue-700/20 rounded-2xl p-5">
              <h2 className="text-xl font-bold text-white mb-4">
                🥽 {t("arView")} — Augmented Reality Placement
              </h2>
              <p className="text-sm text-blue-300/80 mb-4">
                Point your camera at your yard to see where the recharge pit would fit
              </p>
              {result.structures.length > 0 && (
                <ARVisualization
                  rechargeDepth={result.structures[0].depth}
                  rechargeWidth={result.structures[0].width || 1.5}
                  rechargeLength={result.structures[0].length || 1.5}
                />
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {tab === "leaderboard" && <Leaderboard />}

        {/* Marketplace Tab */}
        {tab === "marketplace" && result && (
          <Marketplace state={result.input.state} lat={result.input.lat} lon={result.input.lon} />
        )}

        {/* Subsidy Tab */}
        {tab === "subsidy" && result && (
          <SubsidyTracker
            state={result.input.state}
            totalCost={result.costBenefit.totalInstallationCost}
          />
        )}

        {/* Blueprint Tab */}
        {tab === "blueprint" && result && (
          <BlueprintGenerator result={result} />
        )}
      </div>
      </div>
    </div>
  );
}
