"use client";
import Link from "next/link";
import { useLang } from "@/components/lang-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AnimatedBackground } from "@/components/animated-background";
import { Waves, MapPin, TrendingUp, Shield, Users, Download, Cpu, Globe, ArrowRight, ChevronRight, Droplets, Zap, BarChart3, Leaf, Building2, CloudRain, BookOpen } from "lucide-react";

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
    icon: <CloudRain className="w-6 h-6 text-sky-400" />,
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
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "AI-Powered Insights",
    desc: "Get instant guidance from our AI assistant trained on CGWB manuals and groundwater best practices.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
    title: "Cost-Benefit Analysis",
    desc: "See your projected savings over 5, 10, and 20 years with detailed ROI breakdowns.",
  },
  {
    icon: <Leaf className="w-6 h-6 text-green-400" />,
    title: "Subsidy Tracker",
    desc: "State-wise government subsidies and incentives for rainwater harvesting installations.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-rose-400" />,
    title: "Impact Metrics",
    desc: "Track your contribution to aquifer recharge. Share your impact certificate with the community.",
  },
];

const stats = [
  { value: "19", unit: "States", label: "CGWB data coverage" },
  { value: "61%", unit: "", label: "Indian blocks over-extracted" },
  { value: "₹0", unit: "", label: "Free to use, forever" },
  { value: "10", unit: "Languages", label: "Regional language support" },
];

const aquiferFacts = [
  { icon: <Building2 className="w-5 h-5 text-blue-400" />, title: "Urban Recharge Crisis", desc: "Rapid urbanisation has drastically reduced natural recharge zones in India's cities." },
  { icon: <BookOpen className="w-5 h-5 text-cyan-400" />, title: "CGWB Guidelines", desc: "The Central Ground Water Board mandates RTRWH for buildings above 100 sqm in water-stressed zones." },
  { icon: <Waves className="w-5 h-5 text-indigo-400" />, title: "Aquifer Depletion", desc: "India extracts 89% of its groundwater for irrigation — the highest in the world." },
  { icon: <CloudRain className="w-5 h-5 text-sky-400" />, title: "Monsoon Potential", desc: "India receives 1,170 mm of rainfall annually, yet only 8% is recharged into the ground." },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020b18 0%, #041426 30%, #061a33 60%, #051220 100%)" }}>
      {/* Animated rainwater harvesting background */}
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 backdrop-blur-xl border-b border-blue-900/30" style={{ background: "rgba(2,11,24,0.85)" }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 blur-sm opacity-70" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20">
                  <Waves className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="font-bold text-white text-lg tracking-tight">JalNet</span>
                <span className="text-[10px] text-cyan-400 ml-1.5 hidden sm:inline-block bg-cyan-500/10 px-1.5 py-0.5 rounded-full">by CGWB</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href="/assess"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/30 flex items-center gap-1"
              >
                {t("startAssessment")} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center">
          {/* Wave SVG at bottom */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
            <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="rgba(0,40,100,0.25)" />
              <path d="M0,60 C480,20 960,80 1440,60 L1440,80 L0,80 Z" fill="rgba(0,30,80,0.3)" />
            </svg>
          </div>

          {/* Animated concentric rings */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-cyan-500/10 animate-ping-slow"
                style={{
                  width: `${200 + i * 120}px`,
                  height: `${200 + i * 120}px`,
                  marginLeft: `-${100 + i * 60}px`,
                  marginTop: `-${100 + i * 60}px`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-28 text-center w-full">
            <div className="inline-flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/25 rounded-full px-5 py-2 text-sm text-cyan-300 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Powered by CGWB & IMD Official Data
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight tracking-tight">
              <span className="gradient-text">{t("heroTitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/90 mb-5 max-w-3xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <p className="text-blue-300/70 mb-12 max-w-2xl mx-auto text-base leading-relaxed">
              Groundwater replenishment is critical for India&apos;s water security. The Central Ground Water Board (CGWB)
              has published scientific manuals on RTRWH — now those insights are in your hands, on your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assess"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-lg shadow-xl shadow-cyan-600/25 hover:shadow-cyan-500/40 hover:-translate-y-1"
              >
                <Waves className="w-5 h-5" />
                {t("startAssessment")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/assess?tab=leaderboard"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/30 text-white font-medium px-8 py-4 rounded-2xl transition-all text-base backdrop-blur-sm hover:-translate-y-1"
              >
                <Users className="w-5 h-5" />
                {t("viewLeaderboard")}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-blue-900/30 backdrop-blur-sm" style={{ background: "rgba(0,30,80,0.4)" }}>
          <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {s.value}<span className="text-cyan-400 text-2xl">{s.unit}</span>
                </div>
                <div className="text-sm text-blue-300/80 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Aquifer Facts Strip */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {aquiferFacts.map((fact, i) => (
                <div
                  key={i}
                  className="glow-card rounded-2xl p-5 border border-blue-800/25 animate-fade-in-up"
                  style={{ background: "rgba(0,30,70,0.5)", animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-900/50 flex items-center justify-center mb-3">{fact.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{fact.title}</div>
                  <div className="text-xs text-blue-300/70 leading-relaxed">{fact.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is RTRWH */}
        <section className="max-w-5xl mx-auto px-4 py-16">
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
                <div key={i} className="glow-card border border-blue-700/20 rounded-2xl p-5" style={{ background: "rgba(0,30,80,0.5)" }}>
                  <div className="text-2xl mb-3 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{item.icon}</div>
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-blue-300/70 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-y border-blue-900/30 py-20" style={{ background: "rgba(0,20,60,0.4)" }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Every Feature, Built for Impact</h2>
              <p className="text-blue-300/80">From feasibility check to AR visualization to community leaderboard</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="glow-card border border-blue-800/20 rounded-2xl p-5 animate-fade-in-up"
                  style={{ background: "rgba(5,20,55,0.6)", animationDelay: `${i * 0.06}s` }}
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
            <h2 className="text-3xl font-bold text-white mb-3">How JalNet Works</h2>
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
                <div className="w-9 h-9 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2.5 shadow-lg shadow-cyan-500/20">
                  {s.step}
                </div>
                <div className="font-semibold text-white text-sm">{s.title}</div>
                <div className="text-xs text-blue-300/70 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, rgba(0,40,120,0.8), rgba(0,20,80,0.9), rgba(0,60,100,0.8))" }}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ripple-effect" style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)" }}>
              <Waves className="w-8 h-8 text-cyan-300" />
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
              className="group inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-4 rounded-2xl hover:bg-cyan-50 transition-all text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <Waves className="w-5 h-5" />
              Start Your Free Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-900/30 py-10">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-blue-400/80">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Waves className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="font-medium">JalNet — Groundwater Recharge Assessment Platform</p>
            </div>
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
