"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "JP" | "EN";

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("EN");

  // Load language from localStorage on startup
  useEffect(() => {
    const savedLang = localStorage.getItem("app-lang") as Language;
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  const toggleLang = () => {
    setLangState((prev) => {
      const newLang = prev === "EN" ? "JP" : "EN";
      localStorage.setItem("app-lang", newLang);
      return newLang;
    });
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}