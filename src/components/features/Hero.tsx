"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function Hero() {
    const { t } = useSettings();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[#FDFBF7]">

            {/* Background: Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Background: Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 space-y-10">

                {/* 1. 3D Book Element - Centered Top */}
                <motion.div
                    initial={{ opacity: 0, y: 20, rotateY: -10 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="relative flex justify-center perspective-1000 mb-2"
                >
                    {/* 3D Book Container - Scaled Down 30% */}
                    <div className="relative w-[150px] h-[225px] md:w-[180px] md:h-[270px] bg-primary rounded-r-xl rounded-l-sm shadow-2xl transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-700 ease-out cursor-pointer group origin-left">
                        {/* Book Spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-[20px] bg-[#146a94] transform -translate-x-full origin-right rotate-y-[-90deg] rounded-l-md" />

                        {/* Book Cover Design */}
                        <div className="absolute inset-0 border-t-2 border-b-2 border-r-2 border-[#ffffff]/20 rounded-r-xl flex flex-col items-center justify-center p-4 text-white">
                            <div className="w-full h-full border border-white/30 rounded-r-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                <h2 className="font-telugu text-xl font-bold text-center z-10 leading-snug">
                                    పరాత్పర<br />శతకం
                                </h2>
                            </div>
                        </div>

                        {/* Pages Effect */}
                        <div className="absolute right-1 top-1 bottom-1 w-[6px] bg-white/90 rounded-r shadow-inner" />
                    </div>

                    {/* Shadow underneath */}
                    <div className="absolute bottom-[-30px] w-[60%] h-[15px] bg-black/20 blur-xl rounded-[100%]" />
                </motion.div>

                {/* 2. Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-4 max-w-2xl"
                >
                    {/* Telugu Title */}
                    <h1 className="font-telugu text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                        పరాత్పరశతకం
                    </h1>

                    {/* English Title */}
                    <h2 className="font-sans text-3xl md:text-4xl font-bold text-primary tracking-tight">
                        Paratparasatakam
                    </h2>

                    {/* Author */}
                    <p className="font-serif italic text-lg text-gray-500 pt-2">
                        by [Author Name]
                    </p>

                    {/* Description - Using hardcoded text as per design request */}
                    <p className="font-sans text-lg text-gray-600 leading-relaxed pt-4">
                        A classical journey through divine Telugu poetry. Immerse yourself in verses that bridge the earthly and the eternal.
                    </p>
                </motion.div>

                {/* 3. Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-2"
                >
                    {/* Read Now (Primary) */}
                    <Link href="/read" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                        {t("read.cta")} <BookOpen className="w-4 h-4" />
                    </Link>

                    {/* Foreword (Secondary) */}
                    <Link href="/foreword" className="bg-[#EAE4D9] hover:bg-[#E0D8C8] text-[#5A5448] px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95">
                        {t("nav.foreword")}
                    </Link>

                    {/* About (Secondary) */}
                    <Link href="/about" className="bg-[#EAE4D9] hover:bg-[#E0D8C8] text-[#5A5448] px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95">
                        {t("nav.about")}
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
