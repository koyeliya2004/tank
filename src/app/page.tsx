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
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_55%)]" />
        <div
          className="absolute -right-20 -top-10 h-[360px] w-[360px] opacity-30 blur-[1px]"
          style={{
            backgroundImage: "url('/globe.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-950 to-transparent" />
      </div>
      <div className="relative z-10">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 blur-sm opacity-70" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/20">
                <Droplets className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight">JalSetu</span>
              <span className="text-[10px] text-blue-400 ml-1.5 hidden sm:inline-block bg-blue-500/10 px-1.5 py-0.5 rounded-full">by CGWB</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/assess"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 flex items-center gap-1"
            >
              {t("startAssessment")} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-950 to-cyan-950 opacity-80" />
        <div
          className="absolute right-8 top-16 h-56 w-56 opacity-35"
          style={{
            backgroundImage: "url('/globe.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
        {/* Animated bg */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/8 animate-pulse"
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

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/20 rounded-full px-5 py-2 text-sm text-blue-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Powered by CGWB & IMD Official Data
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            <span className="gradient-text">{t("heroTitle")}</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200/90 mb-5 max-w-3xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <p className="text-blue-300/80 mb-10 max-w-2xl mx-auto text-base leading-relaxed">
            Groundwater replenishment is critical for India&apos;s water security. The Central Ground Water Board (CGWB)
            has published scientific manuals on RTRWH — now those insights are in your hands, on your phone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assess"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-lg shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <Droplets className="w-5 h-5" />
              {t("startAssessment")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/assess?tab=leaderboard"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 text-white font-medium px-8 py-4 rounded-2xl transition-all text-base backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              {t("viewLeaderboard")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-blue-900/20 bg-blue-950/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-white tracking-tight">
                {s.value}<span className="text-blue-400 text-2xl">{s.unit}</span>
              </div>
              <div className="text-sm text-blue-300/80 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is RTRWH + CGWB context */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-5">
              Why Groundwater Recharge Matters
            </h2>
            <div className="space-y-4 text-blue-200/80 text-sm leading-relaxed">
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
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Runoff Harvested", desc: "From roof to aquifer recharge", icon: "🏠" },
              { label: "Principal Aquifer", desc: "CGWB data on your area", icon: "🌊" },
              { label: "Recharge Structures", desc: "Pits, trenches, shafts", icon: "🔧" },
              { label: "Cost-Benefit Analysis", desc: "ROI on your investment", icon: "📈" },
            ].map((item, i) => (
              <div key={i} className="glow-card bg-blue-900/15 border border-blue-700/20 rounded-2xl p-5">
                <div className="text-2xl mb-3 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{item.icon}</div>
                <div className="font-semibold text-white text-sm">{item.label}</div>
                <div className="text-xs text-blue-300/70 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-blue-950/20 border-y border-blue-900/20 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Every Feature, Built for Impact</h2>
            <p className="text-blue-300/80">From feasibility check to AR visualization to community leaderboard</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="glow-card bg-gray-900/50 border border-blue-800/20 rounded-2xl p-5 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mb-3 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">{f.icon}</div>
                <div className="font-semibold text-white text-sm mb-1.5">{f.title}</div>
                <div className="text-xs text-blue-300/70 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How JalSetu Works</h2>
          <p className="text-blue-300/80">On-spot assessment in under 2 minutes</p>
        </div>
        <div className="grid md:grid-cols-5 gap-4 items-center">
          {[
            { step: 1, title: "Drop Pin", desc: "Select your location on the map", icon: "📍" },
            { step: 2, title: "CV Detects Roof", desc: "AI segments your rooftop area", icon: "🛰️" },
            { step: 3, title: "CGWB Analysis", desc: "Aquifer + rainfall data fetched", icon: "🗄️" },
            { step: 4, title: "Get Blueprint", desc: "Structure dimensions + costs", icon: "📋" },
            { step: 5, title: "Build & Earn Credits", desc: "Join community leaderboard", icon: "🏆" },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2.5 shadow-lg shadow-blue-500/20">
                {s.step}
              </div>
              <div className="font-semibold text-white text-sm">{s.title}</div>
              <div className="text-xs text-blue-300/70 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 ripple-effect">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Empower Yourself. Recharge Your Aquifer.
          </h2>
          <p className="text-blue-200/80 mb-8 leading-relaxed">
            The tool supports regional languages for better accessibility and inclusivity.
            Available in Hindi, Tamil, Telugu, Kannada, Gujarati, Marathi, Punjabi, Bengali, Malayalam, and English.
          </p>
          <Link
            href="/assess"
            className="group inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Droplets className="w-5 h-5" />
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 py-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-blue-400/80">
          <p className="mb-2 font-medium">
            JalSetu — Groundwater Recharge Assessment Platform
          </p>
          <p className="text-xs text-blue-600/60 max-w-2xl mx-auto leading-relaxed">
            Data Sources: Central Ground Water Board (CGWB) Ground Water Year Book 2023 •
            India Meteorological Department (IMD) Rainfall Atlas •
            CGWB Technical Manual on Artificial Recharge to Ground Water •
            National Water Mission, Ministry of Jal Shakti
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
