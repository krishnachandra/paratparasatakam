"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Track {
    title: string;
    src: string;
    author?: string; // Optional author/artist
}

interface AudioContextType {
    isPlaying: boolean;
    currentTrack: Track | null;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    closePlayer: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    duration: number;
    currentTime: number;
    seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>({
        title: "Paratparasatakam - Intro",
        src: "/Sri Nilayundu.m4a",
        author: "Jagarlapudi Lakshmi Narayana"
    });
    const [volume, setVolume] = useState(0.8);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();

        // Auto-play attempt on mount (might be blocked by browser policy)
        if (currentTrack) {
            audioRef.current.src = currentTrack.src;
            // Attempt to autoplay on load. Note: Browsers may block this until user interaction.
            setIsPlaying(true);
        }

        const audio = audioRef.current;

        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        const unlockAudio = () => {
            if (audio.paused && currentTrack) {
                audio.play().catch(e => console.log("Autoplay blocked, waiting for interaction", e));
                setIsPlaying(true);
            }
            // Remove listener once triggered
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);

        // Attempt immediate play
        if (currentTrack) {
            audio.play().catch(() => {
                // Convert state to paused if strictly blocked, 
                // but we leave isPlaying as true so the click listener matches intent
            });
        }

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            audio.pause();
            audio.src = '';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Playback failed:", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Track Change
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            // Only change src if it's different to prevent reloading same track issues if called redundantly
            if (audioRef.current.src !== currentTrack.src) {
                audioRef.current.src = currentTrack.src;
                audioRef.current.load();
                if (isPlaying) {
                    audioRef.current.play().catch(console.error);
                }
            }
        }
    }, [currentTrack, isPlaying]);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playTrack = (track: Track) => {
        // No log
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (currentTrack) {
            setIsPlaying(prev => !prev);
        }
    };

    const closePlayer = () => {
        setIsPlaying(false);
        setCurrentTrack(null);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            currentTrack,
            playTrack,
            togglePlay,
            closePlayer,
            volume,
            setVolume,
            duration,
            currentTime,
            seek
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}
