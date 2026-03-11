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

const LANG_STORAGE_KEY = "jalnet-lang";

const isLanguage = (value: string): value is Language =>
  LANGUAGES.some((lang) => lang.code === value);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && isLanguage(stored)) {
      setLang(stored);
      return;
    }
    const browserLang = window.navigator.language.split("-")[0];
    if (isLanguage(browserLang)) {
      setLang(browserLang);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
  }, [lang]);

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
