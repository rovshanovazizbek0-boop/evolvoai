"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationKey, SectionKey } from "@/lib/locales";

type Language = "uz" | "ru" | "en";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (section: SectionKey, key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const savedLang = localStorage.getItem("evolvoai_lang") as Language;
    if (savedLang && (savedLang === "uz" || savedLang === "ru" || savedLang === "en")) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("evolvoai_lang", newLang);
  };

  const t = (section: SectionKey, key: string): string => {
    try {
      const sectionTranslations = translations[lang]?.[section];
      if (sectionTranslations && key in sectionTranslations) {
        return (sectionTranslations as any)[key];
      }
      // Fallback to uz if key not found
      const fallback = translations["uz"]?.[section];
      if (fallback && key in fallback) {
        return (fallback as any)[key];
      }
      return `${section}.${key}`;
    } catch (e) {
      return `${section}.${key}`;
    }
  };

  // Avoid hydration mismatch by rendering a fallback or shell until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
