"use client";

import Link from "next/link";
import Image from "next/image";
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

            <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-4 w-full">

                {/* Two-column layout: Book (left) | Titles (right) */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-16">

                    {/* LEFT HALF: 3D Book Element */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="relative flex justify-center items-center perspective-1000 md:w-1/2 shrink-0"
                    >
                        <div className="relative" style={{ perspective: '1000px' }}>
                            <div style={{ transform: 'rotateY(-15deg)', transformOrigin: 'left center' }} className="transition-transform duration-700 ease-out hover:rotate-y-0 cursor-pointer">
                                {/* Main book face */}
                                <div className="relative w-[200px] h-[300px] md:w-[270px] md:h-[405px] bg-[#0c4694] overflow-hidden shadow-[4px_4px_20px_rgba(0,0,0,0.3)] border border-[#093576]/50">

                                    {/* Cover image */}
                                    <div className="absolute inset-0 flex items-end justify-start pl-4 pb-3 z-10">
                                        <div className="relative w-[90%] h-[90%]">
                                            <Image
                                                src="/blue title.png"
                                                alt="Paratpara Satakam Book Cover"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Pages - refined inset look with Cascade Lift animation */}
                                    <div className="absolute right-[2px] top-[4px] bottom-[4px] w-[12px] z-20 overflow-hidden">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute top-0 bottom-0"
                                                style={{
                                                    right: i * 2,
                                                    width: '2px',
                                                    backgroundColor: i % 2 === 0 ? '#F5F0E8' : '#EDE7DA',
                                                    boxShadow: i === 0 ? '-1px 0 1px rgba(0,0,0,0.05)' : 'none',
                                                }}
                                                animate={{ x: [0, -4, -2, 0] }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.6
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Spine */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-[22px] bg-[#093576]"
                                style={{ transform: 'translateX(-100%) rotateY(-90deg)', transformOrigin: 'right center' }}
                            />

                            {/* Shadow underneath */}
                            <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 w-[70%] h-[15px] bg-black/20 blur-xl rounded-[100%]" />
                        </div>
                    </motion.div>

                    {/* RIGHT HALF: Titles + Author */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="md:w-1/2 space-y-5 text-center md:text-left"
                    >
                        {/* Telugu Title */}
                        <h1 className="font-telugu text-6xl md:text-8xl font-bold text-gray-900 leading-tight">
                            పరాత్పరశతకం
                        </h1>

                        {/* English Title */}
                        <h2 className="font-sans text-3xl md:text-5xl font-bold text-primary tracking-tight">
                            Paratparasatakam
                        </h2>

                        {/* Author */}
                        <p className="font-serif italic text-xl md:text-2xl text-gray-500 pt-2">
                            by [Author Name]
                        </p>

                        {/* Description */}
                        <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed pt-3">
                            A classical journey through divine Telugu poetry. Immerse yourself in verses that bridge the earthly and the eternal.
                        </p>
                    </motion.div>

                </div>

                {/* Buttons - Centered below the two-column layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-20"
                >
                    {/* Read Now (Primary) */}
                    <Link href="/read" className="bg-[#0c4694] hover:bg-[#093576] text-white px-8 py-3 rounded-xl font-medium shadow-xl shadow-[#0c4694]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
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
