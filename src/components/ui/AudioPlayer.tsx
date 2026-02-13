"use client";

import React, { useRef } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AudioPlayer() {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        closePlayer,
        volume,
        setVolume,
        currentTime,
        duration,
        seek
    } = useAudio();


    const progressBarRef = useRef<HTMLDivElement>(null);

    // If no track is loaded, don't render anything
    if (!currentTrack) return null;



    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const percentage = Math.min(Math.max(x / width, 0), 1);
            seek(percentage * duration);
        }
    };

    return (
        <AnimatePresence>
            {currentTrack && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-1/2 right-0 -translate-y-1/2 md:translate-y-0 md:top-20 md:right-4 z-50 md:w-auto md:max-w-xs"
                >
                    {/* Glassmorphism Container */}
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-l-2xl rounded-r-none md:rounded-2xl shadow-2xl overflow-hidden">

                        {/* Progress Bar - Hidden on mobile vertical view */}
                        <div
                            ref={progressBarRef}
                            className="hidden md:block h-1 bg-white/10 cursor-pointer group relative"
                            onClick={handleSeek}
                        >
                            <div
                                className="absolute top-0 left-0 h-full bg-amber-500 rounded-r-full transition-all duration-100 ease-linear"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                            {/* Hover Indicator */}
                            <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <div
                                    className="absolute h-3 w-3 bg-white rounded-full -top-1 shadow-lg transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform"
                                    style={{ left: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-1.5 flex flex-col md:flex-row items-center justify-between gap-2">

                            {/* Track Info */}
                            <div className="md:flex-1 min-w-0">
                                <div className="flex items-center gap-2 text-center md:text-left">
                                    {/* Placeholder Art or Icon */}
                                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                                        <div className={`w-1 h-1 rounded-full bg-amber-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                                    </div>

                                    <div className="overflow-hidden hidden md:block">
                                        <h4 className="text-[11px] font-medium text-white truncate leading-tight">
                                            {currentTrack.title}
                                        </h4>
                                        <p className="text-[9px] text-white/50 truncate leading-tight">
                                            {currentTrack.author || "Unknown Artist"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                {/* Volume Control - Hidden on mobile */}
                                <div className="relative group hidden md:flex items-center">
                                    <button
                                        onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                                        className="text-white/70 hover:text-amber-400 transition-colors p-1"
                                    >
                                        {volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
                                    </button>
                                    {/* Volume Slider (shows on hover/interaction) */}
                                    <div className="w-0 overflow-hidden group-hover:w-16 transition-all duration-300 ease-out flex items-center">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={volume}
                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                            className="w-12 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500 ml-1"
                                        />
                                    </div>
                                </div>

                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlay}
                                    className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                                >
                                    {isPlaying ? (
                                        <Pause size={12} fill="currentColor" />
                                    ) : (
                                        <Play size={12} fill="currentColor" className="ml-0.5" />
                                    )}
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={closePlayer}
                                    className="text-white/40 hover:text-white/90 transition-colors p-0.5 hover:bg-white/10 rounded-full md:ml-0.5"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
