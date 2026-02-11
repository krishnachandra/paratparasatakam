"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Refined book component - clean design with proper containment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Book({ pageAnimation }: { pageAnimation: { animate: any; transition: (i: number) => object } }) {
    return (
        <div className="relative" style={{ perspective: '800px' }}>
            <div style={{ transform: 'rotateY(-15deg)', transformOrigin: 'left center' }}>
                {/* Main book face */}
                <div className="relative w-[180px] h-[270px] bg-[#0c4694] overflow-hidden shadow-[4px_4px_15px_rgba(0,0,0,0.25)] border border-[#093576]/50">

                    {/* Cover image */}
                    <div className="absolute inset-0 flex items-end justify-start pl-3 pb-2 z-10">
                        <div className="relative w-[85%] h-[85%]">
                            <Image src="/blue title.png" alt="Cover" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Pages - cream lines inset from edges */}
                    <div className="absolute right-[2px] top-[4px] bottom-[4px] w-[10px] z-20 overflow-hidden">
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
                                animate={pageAnimation.animate}
                                transition={pageAnimation.transition(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Spine */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[16px] bg-[#093576]"
                style={{ transform: 'translateX(-100%) rotateY(-90deg)', transformOrigin: 'right center' }}
            />

            {/* Shadow */}
            <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-[70%] h-[12px] bg-black/20 blur-xl rounded-[100%]" />
        </div>
    );
}

// 10 animation variations
const variations = [
    {
        name: "Gentle Breeze",
        desc: "Pages sway left gently, staggered timing",
        animate: { x: [0, -3, 0] },
        transition: (i: number) => ({ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }),
    },
    {
        name: "Soft Pulse",
        desc: "Pages breathe with subtle width changes",
        animate: { scaleX: [1, 2, 1] },
        transition: (i: number) => ({ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }),
    },
    {
        name: "Ripple Wave",
        desc: "A gentle wave ripples through the pages",
        animate: { x: [0, -3.5, 0.5, 0] },
        transition: (i: number) => ({ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }),
    },
    {
        name: "Breathing Pages",
        desc: "Opacity and position shift like breathing",
        animate: { opacity: [1, 0.4, 1], x: [0, -2, 0] },
        transition: (i: number) => ({ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }),
    },
    {
        name: "Cascade Lift",
        desc: "Pages lift one by one then settle",
        animate: { x: [0, -4, -2, 0] },
        transition: (i: number) => ({ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }),
    },
    {
        name: "Whisper Sway",
        desc: "Barely visible sway, extremely subtle",
        animate: { x: [0, -1.5, 0] },
        transition: (i: number) => ({ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }),
    },
    {
        name: "Feather Touch",
        desc: "Alternating pages shift in opposite rhythm",
        animate: { x: [0, -3, 0] },
        transition: (i: number) => ({ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i % 2 === 0 ? 0 : 1.25 }),
    },
    {
        name: "Slow Drift",
        desc: "Very slow, meditative page movement",
        animate: { x: [0, -2, 0] },
        transition: (i: number) => ({ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }),
    },
    {
        name: "Page Turn Hint",
        desc: "Outer page peels more, inner pages follow",
        animate: { x: [0, -4, 0] },
        transition: (i: number) => ({ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }),
    },
    {
        name: "Wind Whisper",
        desc: "All pages gust together, settle individually",
        animate: { x: [0, -3, -3, 0] },
        transition: (i: number) => ({
            duration: 3,
            times: [0, 0.2, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 + i * 0.12,
            repeatDelay: 2,
        }),
    },
];

export default function AnimationsPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">Book Animation Variations</h1>
                <p className="text-gray-500 text-center mb-16 text-lg">Pick your favourite subtle page animation</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
                    {variations.map((v, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-6">
                            <Book pageAnimation={{ animate: v.animate, transition: v.transition }} />
                            <div className="text-center mt-2">
                                <span className="inline-block bg-[#0c4694] text-white text-xs font-bold w-6 h-6 leading-6 rounded-full mb-2">{idx + 1}</span>
                                <h3 className="font-semibold text-gray-800 text-sm">{v.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
