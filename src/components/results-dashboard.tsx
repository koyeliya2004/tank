"use client";
import { AssessmentResult } from "@/lib/feasibility-engine";
import { computeHarvestFromRainfall, computeConfidenceScore } from "@/lib/harvest-utils";
import { useLang } from "./lang-context";
import {
  Droplets, AlertTriangle, CheckCircle, Info,
  DollarSign, Layers, CloudRain, Activity, Zap, ShieldCheck
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area,
} from "recharts";

interface ResultsDashboardProps {
  result: AssessmentResult;
  weatherData: {
    weeklyRainfallMm: number;
    current: { temp: number; humidity: number | null; rainfall_mm: number; description: string; city: string };
    source: string;
    fallback?: boolean;
  } | null;
}

export function ResultsDashboard({ result, weatherData }: ResultsDashboardProps) {
  const { t } = useLang();
  const localizeValue = (prefix: string, value: string) => t(`${prefix}.${value}`);

  const feasibilityColor =
    result.feasibility.score >= 75 ? "text-emerald-400" :
    result.feasibility.score >= 55 ? "text-yellow-400" :
    result.feasibility.score >= 35 ? "text-orange-400" : "text-red-400";

  const categoryBadge = (cat: string) =>
    cat === "Safe" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
    cat === "Semi-Critical" ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
    cat === "Critical" ? "bg-orange-500/20 text-orange-300 border-orange-500/30" :
    "bg-red-500/20 text-red-300 border-red-500/30";

  // Confidence score computation
  const apiFreshness = weatherData ? (weatherData.fallback ? 0.5 : 1.0) : 0.3;
  const datasetCoverage = result.meta?.datasetCoverage ?? 0.5;
  const noFallbackUsed = (result.meta?.taRecordFound !== false) ? 1.0 : 0.5;
  const confidenceScore = computeConfidenceScore({ apiFreshness, datasetCoverage, noFallbackUsed });

  // Forecast harvest: use actual weather data when available
  const runoffCoeff = result.waterHarvest.runoffCoefficient;
  const forecastHarvestLiters = weatherData
    ? computeHarvestFromRainfall(weatherData.weeklyRainfallMm, result.input.roofArea, runoffCoeff)
    : result.waterHarvest.predictiveWeeklyForecast;

  // Dynamic cost from meta or fallback to computed
  const costRate = result.meta?.costRate ?? 120;
  const dynamicCost = result.meta?.dynamicCost ?? result.input.roofArea * costRate;

  // Aquifer annotation with source and confidence
  const aquiferAnnotatedName = `${result.aquiferInfo.name} (CGWB${result.meta?.taRecordFound ? " + TA dataset" : ""}, ${confidenceScore}% confidence)`;

  // API-derived forecast phrase
  const forecastPhrase = weatherData
    ? t("forecastPhraseWeather")
      .replace("{city}", weatherData.current.city)
      .replace("{description}", weatherData.current.description ?? t("currentConditions"))
      .replace("{liters}", forecastHarvestLiters.toFixed(0))
    : t("forecastPhraseHistorical").replace("{liters}", forecastHarvestLiters.toFixed(0));

  const radarData = [
    { metric: t("radarRainfall"), value: Math.min(100, result.rainfall.annualRainfall / 30) },
    { metric: t("radarRoofArea"), value: Math.min(100, result.input.roofArea / 3) },
    { metric: t("radarOpenSpace"), value: Math.min(100, result.input.openSpaceArea / 2) },
    { metric: t("radarRechargePotential"), value: result.aquifer.rechargePotential === "High" ? 90 : result.aquifer.rechargePotential === "Medium" ? 60 : 30 },
    { metric: t("radarUrgency"), value: result.aquifer.stageOfExtraction > 100 ? 100 : result.aquifer.stageOfExtraction },
  ];

  const monthlyData = [
    { month: t("monthJan"), harvest: result.waterHarvest.annualHarvestable * 0.02 / 1000 },
    { month: t("monthFeb"), harvest: result.waterHarvest.annualHarvestable * 0.02 / 1000 },
    { month: t("monthMar"), harvest: result.waterHarvest.annualHarvestable * 0.025 / 1000 },
    { month: t("monthApr"), harvest: result.waterHarvest.annualHarvestable * 0.03 / 1000 },
    { month: t("monthMay"), harvest: result.waterHarvest.annualHarvestable * 0.04 / 1000 },
    { month: t("monthJun"), harvest: result.waterHarvest.annualHarvestable * 0.12 / 1000 },
    { month: t("monthJul"), harvest: result.waterHarvest.annualHarvestable * 0.22 / 1000 },
    { month: t("monthAug"), harvest: result.waterHarvest.annualHarvestable * 0.2 / 1000 },
    { month: t("monthSep"), harvest: result.waterHarvest.annualHarvestable * 0.15 / 1000 },
    { month: t("monthOct"), harvest: result.waterHarvest.annualHarvestable * 0.1 / 1000 },
    { month: t("monthNov"), harvest: result.waterHarvest.annualHarvestable * 0.04 / 1000 },
    { month: t("monthDec"), harvest: result.waterHarvest.annualHarvestable * 0.02 / 1000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">{t("assessmentResults")}</h2>
          <p className="text-blue-300 text-sm mt-1">
            {t("resultsFor").replace("{name}", result.input.name).replace("{location}", result.input.location)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 rounded-xl px-4 py-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-xs text-blue-300">{t("waterCredits")}</div>
              <div className="text-lg font-bold text-blue-200">💧 {result.waterCredits.toLocaleString()}</div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 rounded-xl px-4 py-2"
            title={t("dataAccuracyTooltip")
              .replace("{api}", (apiFreshness * 100).toFixed(0))
              .replace("{coverage}", (datasetCoverage * 100).toFixed(0))
              .replace("{record}", result.meta?.taRecordFound ? t("found") : t("notFound"))}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs text-emerald-300">{t("dataAccuracy")}</div>
              <div className="text-lg font-bold text-emerald-200">{confidenceScore}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feasibility Score */}
      <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-blue-200">{t("feasibilityScore")}</span>
          <span className={`text-2xl font-bold ${feasibilityColor}`}>{result.feasibility.score}/100</span>
        </div>
        <div className="w-full bg-blue-950 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              result.feasibility.score >= 75 ? "bg-emerald-500" :
              result.feasibility.score >= 55 ? "bg-yellow-500" :
              result.feasibility.score >= 35 ? "bg-orange-500" : "bg-red-500"
            }`}
            style={{ width: `${result.feasibility.score}%` }}
          />
        </div>
        <div className={`text-sm font-semibold ${feasibilityColor}`}>{result.feasibility.status}</div>
        <div className="mt-3 space-y-1">
          {result.feasibility.reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-blue-300">
              <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-900/20 border border-blue-600/20 rounded-xl p-3">
          <CloudRain className="w-5 h-5 text-blue-400 mb-1" />
          <div className="text-xl font-bold text-white">
            {(result.waterHarvest.annualHarvestable / 1000).toFixed(1)} {t("unitKl")}
          </div>
          <div className="text-xs text-blue-300">{t("annualHarvest")}</div>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-600/20 rounded-xl p-3">
          <Droplets className="w-5 h-5 text-cyan-400 mb-1" />
          <div className="text-xl font-bold text-white">
            {result.waterHarvest.dailyAverage.toFixed(0)} {t("unitLitersPerDay")}
          </div>
          <div className="text-xs text-cyan-300">{t("dailyAverage")}</div>
        </div>
        <div className="bg-purple-900/20 border border-purple-600/20 rounded-xl p-3">
          <Activity className="w-5 h-5 text-purple-400 mb-1" />
          <div className="text-xl font-bold text-white">
            {result.waterHarvest.perPersonPerDay.toFixed(0)} {t("unitLitersPerPerson")}
          </div>
          <div className="text-xs text-purple-300">{t("perPersonPerDay")}</div>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-600/20 rounded-xl p-3">
          <Zap className="w-5 h-5 text-emerald-400 mb-1" />
          <div className="text-xl font-bold text-white">
            {result.waterHarvest.runoffCoefficient}
          </div>
          <div className="text-xs text-emerald-300">{t("runoffCoefficient")}</div>
        </div>
      </div>

      {/* Weekly forecast */}
      {weatherData && (
        <div className="bg-indigo-900/20 border border-indigo-600/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-indigo-200 mb-2 flex items-center gap-2">
            <CloudRain className="w-4 h-4" />
            {t("weeklyForecast")} — {t("hyperLocalWeatherAnalytics")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <div className="text-xs text-indigo-300">{t("currentTemp")}</div>
              <div className="text-lg font-bold text-white">{weatherData.current.temp?.toFixed(1)}{t("unitCelsius")}</div>
            </div>
            <div>
              <div className="text-xs text-indigo-300">{t("humidity")}</div>
              <div className="text-lg font-bold text-white">
                {weatherData.current.humidity != null ? `${weatherData.current.humidity}%` : "—"}
              </div>
            </div>
            <div>
              <div className="text-xs text-indigo-300">{t("sevenDayRainfall")}</div>
              <div className="text-lg font-bold text-white">{weatherData.weeklyRainfallMm.toFixed(1)} {t("unitMm")}</div>
            </div>
            <div>
              <div className="text-xs text-indigo-300">{t("forecastHarvest")}</div>
              <div className="text-lg font-bold text-emerald-300">
                {forecastHarvestLiters.toFixed(0)} L
              </div>
            </div>
          </div>
          <p className="text-xs text-indigo-300 mt-2 italic">
            &ldquo;{forecastPhrase}&rdquo;
          </p>
          <p className="text-xs text-indigo-400 mt-1">
            {t("dataSource")}: {weatherData.source}{weatherData.fallback ? ` (${t("estimated")})` : ""}
          </p>
        </div>
      )}

      {/* Aquifer Information */}
      <div className="bg-slate-900/40 border border-slate-600/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          {t("aquiferInfo")} — {t("cgwbData")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-slate-400">{t("aquiferName")}</div>
            <div className="text-sm font-semibold text-white mt-0.5">{aquiferAnnotatedName}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("depthToWaterTable")}</div>
            <div className="text-sm font-semibold text-cyan-300 mt-0.5">{result.aquiferInfo.depthToWater} {t("unitMetersBgl")}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("aquiferThickness")}</div>
            <div className="text-sm font-semibold text-white mt-0.5">{result.aquiferInfo.thickness} m</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("waterQuality")}</div>
            <div className="text-sm font-semibold text-white mt-0.5">{result.aquiferInfo.quality}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("rechargePotential")}</div>
            <div className={`text-sm font-semibold mt-0.5 ${
              result.aquiferInfo.rechargePotential === "High" ? "text-emerald-400" :
              result.aquiferInfo.rechargePotential === "Medium" ? "text-yellow-400" : "text-red-400"
            }`}>{localizeValue("rechargePotentialValue", result.aquiferInfo.rechargePotential)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("groundwaterStatus")}</div>
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mt-0.5 ${categoryBadge(result.aquiferInfo.category)}`}>
              {localizeValue("category", result.aquiferInfo.category)} ({result.aquiferInfo.stageOfExtraction}%)
            </span>
          </div>
        </div>
        {result.aquiferInfo.category === "Over-Exploited" && (
          <div className="mt-3 flex items-start gap-2 bg-red-900/20 border border-red-600/30 rounded-lg p-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">
              {t("criticalOverExploited").replace("{stage}", String(result.aquiferInfo.stageOfExtraction))}
            </p>
          </div>
        )}
      </div>

      {/* Rainfall Data */}
      <div className="bg-slate-900/30 border border-slate-600/20 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-blue-400" />
          {t("rainfallData")} — {t("imdDataFor").replace("{district}", result.rainfall.district)}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-300">{result.rainfall.annualRainfall} {t("unitMm")}</div>
            <div className="text-xs text-slate-400">{t("annualRainfall")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-300">{result.rainfall.monsoonRainfall} {t("unitMm")}</div>
            <div className="text-xs text-slate-400">{t("monsoonRainfall")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-300">{result.rainfall.rainyDays}</div>
            <div className="text-xs text-slate-400">{t("rainyDaysPerYear")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-teal-300">{(result.waterHarvest.monsoonHarvest / 1000).toFixed(1)} {t("unitKl")}</div>
            <div className="text-xs text-slate-400">{t("monsoonHarvest")}</div>
          </div>
        </div>

        {/* Monthly distribution chart */}
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="harvestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 8, color: "#e2e8f0" }}
                formatter={(v: number) => [`${v.toFixed(2)} {t("unitKl")}`, t("harvest")]}
              />
              <Area type="monotone" dataKey="harvest" stroke="#3b82f6" fill="url(#harvestGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended Structures */}
      <div>
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          {t("structureRec")} — {t("cgwbTechnicalManual")}
        </h3>
        <div className="space-y-3">
          {result.structures.map((s, i) => (
            <div key={i} className="bg-blue-900/20 border border-blue-600/20 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold text-white">{s.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${
                    s.suitability === "Highly Recommended" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                    s.suitability === "Recommended" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                    "bg-slate-500/20 text-slate-300 border-slate-500/30"
                  }`}>
                    {localizeValue("suitability", s.suitability)}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-emerald-400 font-bold text-sm">
                    ₹{s.estimatedCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">{t("installation")}</div>
                </div>
              </div>
              <p className="text-xs text-blue-300 mb-2">{s.reason}</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {s.length && (
                  <div className="bg-blue-950/50 rounded p-1.5 text-center">
                    <div className="text-white font-bold">{s.length}m</div>
                    <div className="text-slate-400">{t("length")}</div>
                  </div>
                )}
                {s.width && (
                  <div className="bg-blue-950/50 rounded p-1.5 text-center">
                    <div className="text-white font-bold">{s.width}m</div>
                    <div className="text-slate-400">{t("width")}</div>
                  </div>
                )}
                <div className="bg-blue-950/50 rounded p-1.5 text-center">
                  <div className="text-white font-bold">{s.depth}m</div>
                  <div className="text-slate-400">{t("depth")}</div>
                </div>
                <div className="bg-blue-950/50 rounded p-1.5 text-center">
                  <div className="text-white font-bold">{s.volume.toFixed(1)} {t("unitCubicMeters")}</div>
                  <div className="text-slate-400">{t("volume")}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                <span className="font-medium text-slate-300">{t("filterMedia")}:</span> {s.filter_media}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost-Benefit Analysis */}
      <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-emerald-200 mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          {t("costBenefit")}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <div>
            <div className="text-xs text-slate-400">Total {t("installation")}</div>
            <div className="text-lg font-bold text-white">₹{result.costBenefit.totalInstallationCost.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("dynamicRoofCost")}</div>
            <div className="text-lg font-bold text-white">₹{dynamicCost.toLocaleString()}</div>
            <div className="text-xs text-slate-500">@ ₹{costRate}/{t("unitSquareMeter")}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("annualMaintenance")}</div>
            <div className="text-lg font-bold text-orange-300">₹{result.costBenefit.annualMaintenanceCost.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("annualWaterValue")}</div>
            <div className="text-lg font-bold text-emerald-300">₹{result.costBenefit.annualWaterValueINR.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("paybackPeriod")}</div>
            <div className="text-lg font-bold text-cyan-300">
              {result.costBenefit.paybackPeriodYears > 99 ? t("na") : `${result.costBenefit.paybackPeriodYears.toFixed(1)} {t("unitYearsShort")}`}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("waterSavedPerYear")}</div>
            <div className="text-lg font-bold text-blue-300">{result.costBenefit.waterSavedPerYear.toFixed(1)} {t("unitKl")}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{t("co2SavedPerYear")}</div>
            <div className="text-lg font-bold text-teal-300">{result.costBenefit.co2SavedKg.toFixed(1)} {t("unitKg")}</div>
          </div>
        </div>

        {/* Cost breakdown bar chart */}
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: t("installation"), amount: result.costBenefit.totalInstallationCost },
                { name: t("roofCost"), amount: dynamicCost },
                { name: t("annualMaintShort"), amount: result.costBenefit.annualMaintenanceCost },
                { name: t("waterValue"), amount: result.costBenefit.annualWaterValueINR },
              ]}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 8, color: "#e2e8f0" }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, t("amount")]}
              />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-slate-900/30 border border-slate-600/20 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">{t("rtrwhRadar")}</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e3a5f" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Radar name={t("potential")} dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact */}
      <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/20 rounded-xl p-4 text-center">
        <div className="text-3xl mb-2">🌊</div>
        <p className="text-white font-semibold">{result.impactEquivalent}</p>
        <p className="text-blue-300 text-sm mt-1">
          {t("impactFooter")}
        </p>
      </div>

      <p className="text-xs text-slate-500 text-center">
        {t("dataSourcesShort")}
      </p>
    </div>
  );
}
