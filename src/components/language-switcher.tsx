"use client";
import { useLang } from "./lang-context";
import { LANGUAGES } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as Parameters<typeof setLang>[0])}
      className="bg-blue-900/50 text-white border border-blue-400/30 rounded-lg px-3 py-1.5 text-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code} className="bg-blue-950 text-white">
          {l.native}
        </option>
      ))}
    </select>
  );
}
