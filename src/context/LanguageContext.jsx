import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('wedding_lang') || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('wedding_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // Helper function to resolve translated fields
  const t = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['bn'] || field['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
