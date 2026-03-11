"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, LANGUAGES, t } from "@/lib/i18n";

interface LangContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

const LANG_STORAGE_KEY = "jalnet-language-preference";
const LEGACY_LANG_STORAGE_KEY = "jalnet-lang";

const isLanguage = (value: string): value is Language =>
  LANGUAGES.some((lang) => lang.code === value);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      const legacyStored = stored ? null : window.localStorage.getItem(LEGACY_LANG_STORAGE_KEY);
      const storedValue = stored ?? legacyStored;
      const browserLang = window.navigator.language.split("-")[0];
      const nextLang =
        storedValue && isLanguage(storedValue)
          ? storedValue
          : browserLang && isLanguage(browserLang)
            ? browserLang
            : null;
      if (nextLang) {
        setLang(nextLang);
      }
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, lang);
        window.localStorage.removeItem(LEGACY_LANG_STORAGE_KEY);
      } catch {}
    }
  }, [initialized, lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: (key: string) => t(lang, key) }),
    [lang],
  );
  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
