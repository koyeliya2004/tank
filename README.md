This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## OpenWeather configuration

To enable live weather data, add an API key before starting the app:

```bash
OPENWEATHER_API_KEY=your_key_here npm run dev
```

Supported variable names are `OPENWEATHER_API_KEY`, `OPEN_WEATHER_API_KEY`, and `OPENWEATHER_API`.
If no key is set (or weather API fails), the app falls back to estimated climate-zone data and labels the source in the results dashboard.
A `fallback: true` flag is returned so the confidence score is lowered accordingly.

## Cost rate configuration

The dynamic roof-area cost can be configured via environment variable:

```bash
COST_RATE=150 npm run dev   # INR per m²
```

If not set, the default rate is **₹120 per m²**. The rate used is displayed in the Results → Cost-Benefit section.

## TA dataset (thearchive/ta)

District-wise ground water resources data is stored in `thearchive/ta/dt_wise_resources_2013_csv_1_1.csv`.
Source: CGWB Dynamic Ground Water Resources of India 2013.

The loader (`src/data/loadTaDataset.ts`) normalises district keys and maps CSV columns to internal fields:
- `Annual Replenishable resources (Ham)` → `recharge`
- `Total annual Draft (Ham)` → `draft`
- `Stage of Ground Water Development (%)` → `extractionPercent`

When a district match is found, the stage-of-extraction value from the TA dataset overrides the CGWB aquifer record.

## Data Accuracy / Confidence score

Each assessment result includes a **Data Accuracy** percentage (0–100%) displayed in the results header. It is computed from:

| Factor | Weight | Notes |
|--------|--------|-------|
| `apiFreshness` | 0.5 | 1.0 for live API, 0.5 for fallback |
| `datasetCoverage` | 0.3 | loaded districts / 644 expected |
| `noFallbackUsed` | 0.2 | 1.0 if TA record found, 0.5 otherwise |

## Gemini assistant configuration

To enable the in-app Gemini chatbot, set the Gemini API key before starting the app:

```bash
GEMINI_API_KEY=your_key_here npm run dev
```

Do not commit your real API key to version control.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
