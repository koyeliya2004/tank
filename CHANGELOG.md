# Changelog

## [Unreleased] — final-polish

### Added
- **TA dataset** (`thearchive/ta/dt_wise_resources_2013_csv_1_1.csv`): real CGWB district-wise ground water resources data (663 rows, 644 districts) replacing any dummy data.
- **Dataset loader** (`src/data/loadTaDataset.ts`): reads and normalises the TA CSV, maps columns to `recharge`, `draft`, and `extractionPercent` fields, logs missing/invalid rows.
- **`src/lib/harvest-utils.ts`**: unit-safe utility functions:
  - `computeHarvestFromRainfall(rainfallMm, roofAreaM2, runoffCoeff, firstFlushFactor)` — returns 0 for zero/missing inputs.
  - `computeCost(roofAreaM2, rate)` — dynamic cost with configurable rate.
  - `getCostRate()` — reads `COST_RATE` / `REACT_APP_COST_RATE` env var, defaults to ₹120/m².
  - `computeConfidenceScore(factors)` — 0–100 score from apiFreshness (0.5), datasetCoverage (0.3), noFallbackUsed (0.2).
  - `EXPECTED_INDIA_DISTRICTS = 644` constant.
- **Data Accuracy / Confidence score** surfaced in the results dashboard header with a tooltip listing factor contributions.
- **Dynamic cost display** in Cost-Benefit section showing `₹<dynamicCost>` and the rate used (`@ ₹<rate>/m²`). Rate configurable via `COST_RATE` env var.
- **TA dataset integration** in `/api/assess`: when a matching district is found in the TA dataset, `stageOfExtraction` is updated from real data. Missing matches are logged.
- **Aquifer annotation** in the UI: aquifer name now shows `"<name> (CGWB + TA dataset, XX% confidence)"` without mutating the original dataset.
- **API-derived forecast phrases**: forecast text now uses the actual weather description from OpenWeatherMap (e.g., `"Based on Chennai forecast (light rain): you could harvest ~450 liters this week"`).
- **`fallback` flag** added to weather API response (`/api/weather`). Used to reduce confidence score when live API is unavailable.
- **`meta` field** added to `AssessmentResult` and `/api/assess` response: `costRate`, `dynamicCost`, `taDatasetCount`, `datasetCoverage`, `taRecordFound`.

### Fixed
- **Forecast → harvest logic**: `predictiveWeeklyForecast` now uses `computeHarvestFromRainfall` ensuring 0 rainfall always yields 0 harvest (unit-safe, no spurious values).
- **Humidity display**: shows `—` when humidity is null (missing from API) instead of hardcoded fallback.
- **OpenWeather parsing**: `rainfall_mm` now falls back to `rain["3h"]` if `rain["1h"]` is absent; humidity uses `?? null` instead of `|| 0`.

### Changed
- `AssessmentResult` interface extended with optional `meta` field.
- `ResultsDashboardProps.weatherData.current.humidity` typed as `number | null`.
- README updated with TA dataset, cost rate, and confidence score documentation.
