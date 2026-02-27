"use client";
import { useState, useEffect } from "react";
import { ExternalLink, Phone, Mail, Star, CheckCircle } from "lucide-react";
import { useLang } from "./lang-context";

interface Vendor {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  services: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  cgwbEmpanelled: boolean;
  priceRange: string;
  website: string;
}

interface MarketplaceProps {
  state: string;
  lat: number;
  lon: number;
}

export function Marketplace({ state, lat, lon }: MarketplaceProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    fetch(`/api/vendors?state=${encodeURIComponent(state)}&lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then((d) => { setVendors(d.vendors || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [state, lat, lon]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        🏪 {t("marketplace")}
      </h2>
      <p className="text-sm text-blue-300">
        Verified local vendors for RTRWH and Artificial Recharge installation near you.
      </p>

      {loading ? (
        <div className="text-center text-blue-300 py-6">Loading vendors...</div>
      ) : vendors.length === 0 ? (
        <div className="text-center text-blue-400 py-6">
          No vendors found for {state}. Contact CGWB regional office for referrals.
        </div>
      ) : (
        <div className="space-y-3">
          {vendors.map((v) => (
            <div key={v.id} className="bg-blue-900/20 border border-blue-600/20 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold text-white text-sm">{v.name}</div>
                  <div className="text-xs text-blue-300 mt-0.5">{v.city}, {v.state}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {v.verified && (
                      <span className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-600/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {v.cgwbEmpanelled && (
                      <span className="text-xs text-blue-300 bg-blue-900/30 border border-blue-600/20 px-2 py-0.5 rounded-full">
                        CGWB Empanelled
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-300 font-bold text-sm">{v.rating}</span>
                  </div>
                  <div className="text-xs text-slate-400">{v.reviews} reviews</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {v.services.map((s) => (
                  <span key={s} className="text-xs bg-blue-800/30 text-blue-200 border border-blue-600/20 px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className="text-sm font-semibold text-emerald-300 mb-2">{v.priceRange}</div>

              <div className="flex gap-2 flex-wrap">
                <a
                  href={`tel:${v.phone}`}
                  className="flex items-center gap-1 text-xs bg-blue-700/30 hover:bg-blue-700/50 text-blue-200 border border-blue-600/30 px-3 py-1.5 rounded-lg transition"
                >
                  <Phone className="w-3 h-3" /> {v.phone}
                </a>
                <a
                  href={`mailto:${v.email}`}
                  className="flex items-center gap-1 text-xs bg-blue-700/30 hover:bg-blue-700/50 text-blue-200 border border-blue-600/30 px-3 py-1.5 rounded-lg transition"
                >
                  <Mail className="w-3 h-3" /> Email
                </a>
                <a
                  href={v.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-200 border border-emerald-600/30 px-3 py-1.5 rounded-lg transition"
                >
                  <ExternalLink className="w-3 h-3" /> Website
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
