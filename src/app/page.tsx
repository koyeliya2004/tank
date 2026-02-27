"use client";
import Link from "next/link";
import { useLang } from "@/components/lang-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Droplets, MapPin, TrendingUp, Shield, Users, Download, Cpu, Globe, ArrowRight, ChevronRight } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-6 h-6 text-blue-400" />,
    title: "CV Roof Detection",
    desc: "Drop a pin on the map. AI auto-segments your roof and detects obstructions, eliminating manual area entry.",
  },
  {
    icon: <Droplets className="w-6 h-6 text-cyan-400" />,
    title: "Feasibility Check",
    desc: "CGWB data-backed feasibility score for RTRWH and Artificial Recharge at your specific location.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    title: "Hyper-Local Weather",
    desc: "OpenWeather integration gives predictive analytics. 'Based on next week's forecast, you could harvest 450 liters.'",
  },
  {
    icon: <Globe className="w-6 h-6 text-purple-400" />,
    title: "3D Geological Digital Twin",
    desc: "CGWB aquifer data rendered in 3D. Visualize the empty underground space beneath your feet — urging you to fill it.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-yellow-400" />,
    title: "AR Visualization",
    desc: "Use your camera to see exactly where a recharge pit fits in your yard and how it connects to your pipes.",
  },
  {
    icon: <Users className="w-6 h-6 text-pink-400" />,
    title: "Water Credit Leaderboard",
    desc: "Earn virtual credits for every liter recharged. Neighborhoods compete. Community impact dashboard shows collective results.",
  },
  {
    icon: <Shield className="w-6 h-6 text-orange-400" />,
    title: "Vendor Marketplace",
    desc: "Verified, CGWB-empanelled vendors near you for installation. No more wondering who to call.",
  },
  {
    icon: <Download className="w-6 h-6 text-teal-400" />,
    title: "DIY Blueprint + BOM",
    desc: "Generate a downloadable PDF with structure dimensions, bill of materials with local hardware prices.",
  },
];

const stats = [
  { value: "19", unit: "States", label: "CGWB data coverage" },
  { value: "61%", unit: "", label: "Indian blocks over-extracted" },
  { value: "₹0", unit: "", label: "Free to use, forever" },
  { value: "10", unit: "Languages", label: "Regional language support" },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">JalSetu</span>
            <span className="text-xs text-blue-400 hidden sm:block">by CGWB</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/assess"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition flex items-center gap-1"
            >
              {t("startAssessment")} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-950 to-cyan-950 opacity-80" />
        {/* Animated bg */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10 animate-pulse"
              style={{
                width: `${20 + i * 15}px`,
                height: `${20 + i * 15}px`,
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Powered by CGWB & IMD Official Data
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-4 max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <p className="text-blue-300 mb-8 max-w-2xl mx-auto text-base">
            Groundwater replenishment is critical for India's water security. The Central Ground Water Board (CGWB)
            has published scientific manuals on RTRWH — now those insights are in your hands, on your phone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/assess"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
            >
              <Droplets className="w-5 h-5" />
              {t("startAssessment")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/assess"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-8 py-4 rounded-xl transition text-base"
            >
              <Users className="w-5 h-5" />
              {t("viewLeaderboard")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-blue-900/30 bg-blue-950/20">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">
                {s.value}<span className="text-blue-400">{s.unit}</span>
              </div>
              <div className="text-sm text-blue-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is RTRWH + CGWB context */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Groundwater Recharge Matters
            </h2>
            <div className="space-y-3 text-blue-200 text-sm leading-relaxed">
              <p>
                Groundwater replenishment is a <strong className="text-white">critical factor for the augmentation and
                sustainability</strong> of water resources in India. There is significant potential in both
                rural and urban areas for harvesting rainwater from individual rooftops.
              </p>
              <p>
                The <strong className="text-white">Central Ground Water Board (CGWB)</strong> has published several
                scientific manuals and reports on rooftop rainwater harvesting (RTRWH) potential, as well as
                FAQs and practical guides for artificial recharge.
              </p>
              <p>
                However, there is currently <strong className="text-yellow-300">no user-friendly digital platform</strong> where
                individuals can directly assess their rainwater harvesting potential — until now.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Runoff Harvested", desc: "From roof to aquifer recharge", icon: "🏠" },
              { label: "Principal Aquifer", desc: "CGWB data on your area", icon: "🌊" },
              { label: "Recharge Structures", desc: "Pits, trenches, shafts", icon: "🔧" },
              { label: "Cost-Benefit Analysis", desc: "ROI on your investment", icon: "📈" },
            ].map((item, i) => (
              <div key={i} className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-white text-sm">{item.label}</div>
                <div className="text-xs text-blue-300 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-blue-950/20 border-y border-blue-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Every Feature, Built for Impact</h2>
            <p className="text-blue-300">From feasibility check to AR visualization to community leaderboard</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-900/60 border border-blue-800/30 rounded-xl p-4 hover:border-blue-600/50 transition">
                <div className="mb-3">{f.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{f.title}</div>
                <div className="text-xs text-blue-300 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">How JalSetu Works</h2>
          <p className="text-blue-300">On-spot assessment in under 2 minutes</p>
        </div>
        <div className="grid md:grid-cols-5 gap-4 items-center">
          {[
            { step: 1, title: "Drop Pin", desc: "Select your location on the map", icon: "📍" },
            { step: 2, title: "CV Detects Roof", desc: "AI segments your rooftop area", icon: "🛰️" },
            { step: 3, title: "CGWB Analysis", desc: "Aquifer + rainfall data fetched", icon: "🗄️" },
            { step: 4, title: "Get Blueprint", desc: "Structure dimensions + costs", icon: "📋" },
            { step: 5, title: "Build & Earn Credits", desc: "Join community leaderboard", icon: "🏆" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
                {s.step}
              </div>
              <div className="font-semibold text-white text-sm">{s.title}</div>
              <div className="text-xs text-blue-300 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Empower Yourself. Recharge Your Aquifer.
          </h2>
          <p className="text-blue-200 mb-6">
            The tool supports regional languages for better accessibility and inclusivity.
            Available in Hindi, Tamil, Telugu, Kannada, Gujarati, Marathi, Punjabi, Bengali, Malayalam, and English.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition text-lg"
          >
            <Droplets className="w-5 h-5" />
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-blue-400">
          <p className="mb-2">
            JalSetu — Groundwater Recharge Assessment Platform
          </p>
          <p className="text-xs text-blue-600">
            Data Sources: Central Ground Water Board (CGWB) Ground Water Year Book 2023 •
            India Meteorological Department (IMD) Rainfall Atlas •
            CGWB Technical Manual on Artificial Recharge to Ground Water •
            National Water Mission, Ministry of Jal Shakti
          </p>
        </div>
      </footer>
    </div>
  );
}
