"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "te";
type Theme = "light" | "dark" | "sepia";

interface SettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Simple translation dictionary for core UI
const translations: Record<string, Record<Language, string>> = {
    "nav.home": { en: "Home", te: "ముఖద్వారం" },
    "nav.foreword": { en: "Foreword", te: "ముందుమాట" },
    "nav.about": { en: "About Author", te: "కవి గురించి" },
    "hero.title": { en: "Paratparasatakam", te: "పరాత్పర శతకం" },
    "hero.subtitle": {
        en: "A Neo-Classical journey through divine Telugu poetry.",
        te: "తెలుగు పద్య కవిత్వంలో ఒక అద్భుత ప్రయాణం."
    },
    "read.cta": { en: "Start Reading", te: "చదవడం ప్రారంభించండి" },
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    // Default to Telugu as per plan, or persist from local storage
    const [language, setLanguage] = useState<Language>("te");
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Basic persistence
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang) setLanguage(savedLang);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <SettingsContext.Provider
            value={{
                language,
                setLanguage: handleSetLanguage,
                theme,
                setTheme,
                t
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
