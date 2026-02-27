"use client";
import { useState, useEffect } from "react";
import { ExternalLink, Tag, Building } from "lucide-react";
import { useLang } from "./lang-context";

interface Subsidy {
  state: string;
  scheme: string;
  discount_percent: number;
  details: string;
  authority: string;
  url: string;
}

interface SubsidyTrackerProps {
  state: string;
  totalCost: number;
}

export function SubsidyTracker({ state, totalCost }: SubsidyTrackerProps) {
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);
  const [relevant, setRelevant] = useState<Subsidy | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    fetch(`/api/subsidies?state=${encodeURIComponent(state)}`)
      .then((r) => r.json())
      .then((d) => {
        setRelevant(d.subsidy);
        setSubsidies(d.all || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [state]);

  if (loading) return <div className="text-blue-300 text-sm py-4">Loading subsidy data...</div>;

  const savings = relevant ? (totalCost * relevant.discount_percent) / 100 : 0;
  const netCost = totalCost - savings;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Tag className="w-5 h-5 text-yellow-400" />
        {t("subsidyInfo")} & Policy Tracker
      </h2>

      {relevant && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">🏛️</div>
            <div>
              <div className="font-bold text-yellow-200">{relevant.scheme}</div>
              <div className="text-xs text-yellow-300 flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3" /> {relevant.authority}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-emerald-400">{relevant.discount_percent}%</div>
              <div className="text-xs text-slate-400">Subsidy</div>
            </div>
          </div>
          <p className="text-sm text-yellow-100 mb-3">{relevant.details}</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
            <div className="bg-yellow-900/30 rounded-lg p-2">
              <div className="text-white font-bold">₹{totalCost.toLocaleString()}</div>
              <div className="text-slate-400">Total Cost</div>
            </div>
            <div className="bg-emerald-900/30 rounded-lg p-2">
              <div className="text-emerald-300 font-bold">-₹{savings.toLocaleString()}</div>
              <div className="text-slate-400">You Save</div>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-2">
              <div className="text-blue-300 font-bold">₹{netCost.toLocaleString()}</div>
              <div className="text-slate-400">Net Cost</div>
            </div>
          </div>
          <a
            href={relevant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg transition font-medium w-full justify-center"
          >
            <ExternalLink className="w-4 h-4" /> Apply for {relevant.state} Subsidy
          </a>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2">All State Schemes</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {subsidies.map((s) => (
            <div key={s.state} className={`bg-blue-900/20 border rounded-xl p-3 flex items-center gap-3 ${s.state === state ? "border-yellow-500/40" : "border-blue-600/20"}`}>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-xs truncate">{s.scheme}</div>
                <div className="text-xs text-blue-300">{s.state} — {s.authority}</div>
              </div>
              <div className="shrink-0">
                <span className="text-emerald-400 font-bold text-sm">{s.discount_percent}%</span>
                <div className="text-xs text-slate-400">off</div>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 text-blue-400 hover:text-white" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Sources: National Water Mission, Ministry of Jal Shakti, State Water Boards. 
        Always verify current subsidy rates with local authorities.
      </p>
    </div>
  );
}
