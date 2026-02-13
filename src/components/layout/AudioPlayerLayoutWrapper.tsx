"use client";

import { usePathname } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { useEffect } from "react";

export function AudioPlayerLayoutWrapper() {
    const pathname = usePathname();
    const { isPlaying, togglePlay } = useAudio();

    // Stop audio on specific pages
    useEffect(() => {
        if ((pathname === '/read' || pathname.startsWith('/read/') || pathname === '/viewer') && isPlaying) {
            togglePlay();
        }
    }, [pathname]); // Intentionally omitting isPlaying/togglePlay to avoid aggressive re-runs, or include them if stable

    // Hide player on specific pages
    if (pathname === '/read' || pathname.startsWith('/read/') || pathname === '/viewer') {
        return null;
    }

    return <AudioPlayer />;
}
