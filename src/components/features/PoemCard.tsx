"use client";

import { Poem } from "@/data/poems";
import { useSettings } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface PoemCardProps {
    poem: Poem;
}

export function PoemCard({ poem }: PoemCardProps) {
    const { language, t } = useSettings();
    const [showMeaning, setShowMeaning] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 md:px-0 perspective-1000">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative bg-card text-card-foreground rounded-xl shadow-lg border border-border overflow-hidden"
            >
                {/* Header / Poem Number */}
                <div className="bg-primary/5 px-6 py-4 flex items-center justify-between border-b border-border/50">
                    <span className="font-serif text-primary font-bold tracking-wider text-sm">
                        VERSE {poem.id}
                    </span>
                    <BookOpen className="w-4 h-4 text-primary/40" />
                </div>

                {/* Main Content (The Poem) */}
                <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-6 min-h-[300px] justify-center relative">
                    {/* Decorative quote mark */}
                    <span className="absolute top-8 left-8 text-6xl text-primary/5 font-serif">“</span>

                    <div className="space-y-4 z-10">
                        {poem.telugu.map((line, idx) => (
                            <p
                                key={idx}
                                className="font-telugu text-xl md:text-2xl leading-relaxed md:leading-loose font-medium text-foreground/90"
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Decorative quote mark */}
                    <span className="absolute bottom-8 right-8 text-6xl text-primary/5 font-serif rotate-180">“</span>
                </div>

                {/* Interaction Area: Meaning */}
                <div className="border-t border-border">
                    <button
                        onClick={() => setShowMeaning(!showMeaning)}
                        className="w-full flex items-center justify-center space-x-2 py-4 hover:bg-muted/10 transition-colors group cursor-pointer"
                    >
                        <span className="text-xs uppercase font-bold tracking-widest text-muted group-hover:text-primary transition-colors">
                            {showMeaning ? "Hide Meaning" : "View Meaning"}
                        </span>
                        {showMeaning ? (
                            <ChevronUp className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showMeaning && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden bg-muted/5"
                            >
                                <div className="p-8 space-y-6">
                                    {/* Meaning Text */}
                                    <div>
                                        <h4 className="font-serif text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                                            Meaning
                                        </h4>
                                        <p className="font-serif text-lg leading-relaxed text-foreground/80">
                                            {language === "te" ? poem.meaning.telugu : poem.meaning.english}
                                        </p>
                                    </div>

                                    {/* Commentary (if present) */}
                                    {poem.commentary && (
                                        <div className="pt-4 border-t border-border/50">
                                            <h4 className="font-serif text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                                                Key Insight
                                            </h4>
                                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic">
                                                {poem.commentary.english}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
