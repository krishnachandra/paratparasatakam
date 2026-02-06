"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { motion } from "framer-motion";

export function Hero() {
    const { t } = useSettings();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">

            {/* Background Decor - Subtle Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left space-y-6 z-10"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-2">
                        Satakam Series
                    </span>

                    <h1 className="font-telugu text-5xl md:text-7xl font-bold leading-tight text-foreground drop-shadow-sm">
                        {t("hero.title")}
                    </h1>

                    <p className="font-serif text-lg md:text-xl text-muted max-w-lg mx-auto lg:mx-0 italic">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
                        <Link href="/read" className="bg-primary text-white px-8 py-3 rounded-xl font-medium shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center">
                            {t("read.cta")}
                        </Link>
                        <Link href="/foreword" className="px-8 py-3 rounded-xl font-medium text-foreground hover:bg-black/5 transition-all block text-center">
                            {t("nav.foreword")}
                        </Link>
                    </div>
                </motion.div>

                {/* Right: 3D Book Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative flex justify-center perspective-1000"
                >
                    {/* Placeholder for actual 3D Book */}
                    <div className="relative w-[300px] h-[450px] md:w-[360px] md:h-[540px] bg-primary rounded-r-2xl rounded-l-sm shadow-2xl transform rotate-y-[-15deg] hover:rotate-y-0 transition-transform duration-700 ease-out cursor-pointer group">
                        {/* Book Spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-[40px] bg-[#146a94] transform -translate-x-full origin-right rotate-y-[-90deg] rounded-l-md" />

                        {/* Book Cover Design */}
                        <div className="absolute inset-0 border-t-2 border-b-2 border-r-2 border-[#ffffff]/20 rounded-r-2xl flex flex-col items-center justify-center p-8 text-white">
                            <div className="w-full h-full border border-white/30 rounded-r-xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                <h2 className="font-telugu text-4xl font-bold text-center z-10">
                                    పరాత్పర<br />శతకం
                                </h2>
                            </div>
                        </div>

                        {/* Pages Effect */}
                        <div className="absolute right-2 top-2 bottom-2 w-[10px] bg-white/90 rounded-r shadow-inner" />
                    </div>

                    {/* Floor Shadow */}
                    <div className="absolute bottom-[-40px] w-[80%] h-[20px] bg-black/20 blur-xl rounded-[100%]" />
                </motion.div>

            </div>
        </section>
    );
}
