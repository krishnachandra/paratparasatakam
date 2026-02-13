"use client";

import { useSettings } from "@/context/SettingsContext";
import { Globe, PlayCircle } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


import { usePathname } from "next/navigation";

export function Navbar() {
    const { language, setLanguage, t } = useSettings();
    const { currentTrack, playTrack } = useAudio();
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#20809D] backdrop-blur-md border-b border-[#18637a] h-16 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                <div className="flex items-center gap-8">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/title - white.png"
                            alt="Paratparasatakam Title"
                            width={300}
                            height={60}
                            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                    </Link>

                    {/* Apple-style Language Toggle */}
                    <div className="relative flex items-center bg-[#18637a]/50 p-1 rounded-full border border-white/10">
                        <motion.div
                            className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm"
                            animate={{
                                x: language === "en" ? "100%" : "0%"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />

                        <button
                            onClick={() => setLanguage("te")}
                            className={`relative px-3 py-1 font-medium rounded-full transition-colors z-10 w-20 text-center font-telugu text-base pt-1
                                ${language === "te" ? "text-[#20809D]" : "text-white/60 hover:text-white"}`}
                        >
                            తెలుగు
                        </button>
                        <button
                            onClick={() => setLanguage("en")}
                            className={`relative px-3 py-1 text-sm font-medium rounded-full transition-colors z-10 w-20 text-center
                                ${language === "en" ? "text-[#20809D]" : "text-white/60 hover:text-white"}`}
                        >
                            English
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink href="/" label={t("nav.home")} />
                    <NavLink href="/foreword" label={t("nav.foreword")} />
                    <NavLink href="/about" label={t("nav.about")} />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
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

                    {pathname !== '/viewer' && (
                        <Link href="/viewer" className="hidden sm:inline-flex bg-white text-[#20809D] px-5 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-amber-50 hover:shadow-lg transition-all">
                            {t("read.cta")}
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="relative text-sm font-medium text-white/90 hover:text-white transition-colors group"
        >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all group-hover:w-full" />
        </Link>
    );
}
