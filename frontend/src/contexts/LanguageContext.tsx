import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (en: string, mr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (en: string, mr: string) => (lang === "en" ? en : mr);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
};
