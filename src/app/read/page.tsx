"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SettingsProvider } from "@/context/SettingsContext";
import { motion } from "framer-motion";
import { PoemCard } from "@/components/features/PoemCard";
import { poems } from "@/data/poems";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReaderPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPoem = poems[currentIndex];

    const nextPoem = () => {
        if (currentIndex < poems.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevPoem = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <SettingsProvider>
            <main className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center py-10 relative">

                    {/* Background Texture Effect */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/paper-texture.png')] mix-blend-multiply" />

                    {/* Navigation Controls (Desktop - Left) */}
                    <button
                        onClick={prevPoem}
                        disabled={currentIndex === 0}
                        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all group"
                    >
                        <ChevronLeft className="w-8 h-8 text-primary group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Core Reader Area */}
                    <div className="w-full max-w-4xl z-10 px-4">
                        <motion.div
                            key={currentPoem.id}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -100) {
                                    nextPoem();
                                } else if (swipe > 100) {
                                    prevPoem();
                                }
                            }}
                            className="touch-pan-y"
                        >
                            <PoemCard poem={currentPoem} />
                        </motion.div>
                    </div>

                    {/* Navigation Controls (Desktop - Right) */}
                    <button
                        onClick={nextPoem}
                        disabled={currentIndex === poems.length - 1}
                        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all group"
                    >
                        <ChevronRight className="w-8 h-8 text-primary group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Mobile Navigation Controls (Bottom) */}
                    <div className="flex md:hidden items-center space-x-8 mt-8 z-20">
                        <button
                            onClick={prevPoem}
                            disabled={currentIndex === 0}
                            className="p-3 rounded-full bg-white border border-border shadow-sm disabled:opacity-50 active:scale-95 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6 text-foreground" />
                        </button>
                        <span className="font-serif text-sm font-bold text-muted">
                            {currentIndex + 1} / {poems.length}
                        </span>
                        <button
                            onClick={nextPoem}
                            disabled={currentIndex === poems.length - 1}
                            className="p-3 rounded-full bg-white border border-border shadow-sm disabled:opacity-50 active:scale-95 transition-all"
                        >
                            <ChevronRight className="w-6 h-6 text-foreground" />
                        </button>
                    </div>

                </div>
            </main>
        </SettingsProvider>
    );
}
