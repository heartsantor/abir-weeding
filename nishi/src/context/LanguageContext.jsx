import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("eleganza_lang_pref") || "en";
  });

  useEffect(() => {
    localStorage.setItem("eleganza_lang_pref", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "bn" ? "en" : "bn"));
  };

  // Helper function to resolve translated fields
  const t = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field["en"] || field["bn"] || "";
  };

  // Helper function to format numbers to Bengali numerals if Bengali is active
  const formatNum = (num) => {
    if (lang === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return String(num)
        .split("")
        .map((d) => bnDigits[d] || d)
        .join("");
    }
    return String(num);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, formatNum }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
