"use client";

import { useSettings } from "@/context/SettingsContext";
import { BookOpen, Globe, PlayCircle } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import Link from "next/link";


export function Navbar() {
    const { language, setLanguage, t } = useSettings();
    const { currentTrack, playTrack } = useAudio();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "te" : "en");
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#F9F7F1]/80 backdrop-blur-md border-b border-[#e5e5e5] h-16">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-serif font-bold text-xl tracking-tight text-primary">
                        {t("hero.title")}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink href="/" label={t("nav.home")} />
                    <NavLink href="/foreword" label={t("nav.foreword")} />
                    <NavLink href="/about" label={t("nav.about")} />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                        aria-label="Switch Language"
                    >
                        <Globe className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium min-w-[2ch] uppercase font-sans">
                            {language}
                        </span>
                    </button>

                    {/* Play Button - Only shows when player is closed */}
                    {!currentTrack && (
                        <button
                            onClick={() => playTrack({
                                title: "Paratparasatakam - Intro",
                                src: "/Sri Nilayundu.m4a",
                                author: "Jagarlapudi Lakshmi Narayana"
                            })}
                            className="flex items-center justify-center p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                            aria-label="Play Audio"
                        >
                            <PlayCircle className="w-5 h-5" />
                        </button>
                    )}

                    <Link href="/read" className="hidden sm:inline-flex bg-primary text-white px-5 py-2 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                        {t("read.cta")}
                    </Link>
                </div>

            </div>
        </nav>
    );
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors group"
        >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
        </Link>
    );
}
