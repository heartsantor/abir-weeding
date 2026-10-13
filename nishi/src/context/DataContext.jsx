import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const stored = localStorage.getItem("eleganza_wedding_data");
        const res = await fetch("/data.json");
        let defaultData = null;
        if (res.ok) {
          defaultData = await res.json();
        }

        if (stored) {
          const parsed = JSON.parse(stored);
          if (defaultData) {
            const merged = {
              ...defaultData,
              ...parsed,
              couple: { ...defaultData.couple, ...(parsed.couple || {}) },
              entrance: { ...defaultData.entrance, ...(parsed.entrance || {}) },
              hero: { ...defaultData.hero, ...(parsed.hero || {}) },
              countdown: { ...defaultData.countdown, ...(parsed.countdown || {}) },
              whenWhere: { ...defaultData.whenWhere, ...(parsed.whenWhere || {}) },
              venue: { ...defaultData.venue, ...(parsed.venue || {}) },
              celebration: { ...defaultData.celebration, ...(parsed.celebration || {}) },
              dressCodeSection: { ...defaultData.dressCodeSection, ...(parsed.dressCodeSection || {}) },
              programme: { ...defaultData.programme, ...(parsed.programme || {}) },
              gifts: { ...defaultData.gifts, ...(parsed.gifts || {}) },
              rsvp: { ...defaultData.rsvp, ...(parsed.rsvp || {}) },
              footer: { ...defaultData.footer, ...(parsed.footer || {}) },
            };
            setData(merged);
          } else {
            setData(parsed);
          }
          setLoading(false);
          return;
        }

        if (defaultData) {
          setData(defaultData);
        }
      } catch (err) {
        console.error("Error fetching data.json:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem("eleganza_wedding_data", JSON.stringify(newData, null, 2));
  };

  const resetData = async () => {
    try {
      localStorage.removeItem("eleganza_wedding_data");
      const res = await fetch("/data.json");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Error resetting data:", e);
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
