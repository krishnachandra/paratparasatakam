"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SettingsProvider } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ReaderPage() {

    // ----------------------------------------------------------------------------------
    // CHANGE THIS FILENAME IF YOU UPLOAD A NEW PDF
    // ----------------------------------------------------------------------------------
    const currentPdfUrl = "/Paratpara Satakam Book_Inner_FSr.indd.pdf";
    // ----------------------------------------------------------------------------------

    const [numPages, setNumPages] = useState<number>(0);
    // spreadIndex 0 = Pages 1 & 2 (Wait, Cover is usually Page 1 alone)
    // Let's standardise:
    // Spread 0: [null, 1] (Cover)
    // Spread 1: [2, 3] 
    // Spread 2: [4, 5]
    const [spreadIndex, setSpreadIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setIsLoaded(true);
    };

    const nextSpread = () => {
        // Last spread index calculation
        // If 100 pages. 
        // 0: [_,1], 1:[2,3] ... 50:[100,_]
        // So approx numPages/2.
        const maxSpread = Math.ceil(numPages / 2);

        if (spreadIndex < maxSpread) {
            setDirection(1);
            setSpreadIndex(prev => prev + 1);
        }
    };

    const prevSpread = () => {
        if (spreadIndex > 0) {
            setDirection(-1);
            setSpreadIndex(prev => prev - 1);
        }
    };

    // Calculate which pages to display
    // Spread 0: Left=null, Right=1
    // Spread 1: Left=2, Right=3  (2*1, 2*1+1)
    // Spread k: Left=2k, Right=2k+1
    const leftPageNum = spreadIndex === 0 ? null : spreadIndex * 2;
    const rightPageNum = spreadIndex === 0 ? 1 : spreadIndex * 2 + 1;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextSpread();
            if (e.key === "ArrowLeft") prevSpread();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [spreadIndex, numPages]);

    return (
        <SettingsProvider>
            <main className="min-h-screen flex flex-col bg-[#EDEDE5] text-gray-800 overflow-hidden relative transition-colors duration-700">
                <Navbar />

                {/* Textured Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

                {/* Book Wrapper */}
                <div className="flex-1 flex flex-col items-center justify-center py-4 px-2 relative perspective-1500 z-10 w-full h-full">

                    {/* Book Container */}
                    <div className="relative w-full max-w-6xl aspect-[3/2] md:aspect-[2.2/1] bg-[#FDFBF6] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-r-lg rounded-l-lg md:rounded-l-sm flex overflow-hidden border border-stone-200/60 ring-1 ring-black/5">

                        {/* Loading State Overlay */}
                        {!isLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FDFBF6] z-50">
                                <Loader2 className="w-8 h-8 animate-spin text-stone-400 mb-2" />
                                <span className="font-serif text-stone-500 text-sm tracking-widest uppercase">Opening Book...</span>
                            </div>
                        )}

                        {/* Hidden PDF Loader to get stats */}
                        <div className="hidden">
                            <Document file={currentPdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                {/* Just metadata loading */}
                            </Document>
                        </div>

                        {/* 3D Book Spine Effect (Center Gradient) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-stone-900/10 to-transparent z-20 pointer-events-none mix-blend-multiply" />

                        {/* Pages Container with AnimatePresence */}
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                            <motion.div
                                key={`spread-${spreadIndex}`}
                                custom={direction}
                                initial={{ rotateY: direction > 0 ? 80 : -80, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                exit={{ rotateY: direction > 0 ? -80 : 80, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
                                className="flex w-full h-full backface-hidden origin-center"
                            >
                                {/* LEFT PAGE AREA */}
                                <div className="flex-1 relative bg-[#FDFBF6] overflow-hidden flex items-center justify-center border-r border-stone-200/50">
                                    {leftPageNum && leftPageNum <= numPages ? (
                                        <div className="w-full h-full flex items-center justify-center p-4 md:p-8 opacity-95 transition-opacity">
                                            <Document file={currentPdfUrl} loading={null} className="flex justify-center items-center h-full w-full">
                                                <Page
                                                    pageNumber={leftPageNum}
                                                    width={600}
                                                    className="shadow-sm max-w-full max-h-full object-contain !min-w-0"
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    canvasBackground="transparent"
                                                />
                                            </Document>
                                        </div>
                                    ) : (
                                        // Empty / End Page
                                        <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center border-r border-stone-100">
                                            {leftPageNum && leftPageNum > numPages && (
                                                <div className="text-stone-300 font-serif italic"></div>
                                            )}
                                        </div>
                                    )}
                                    {/* Page Number (Left) */}
                                    {leftPageNum && leftPageNum <= numPages && (
                                        <span className="absolute bottom-6 font-serif text-xs text-stone-400 font-medium">{leftPageNum}</span>
                                    )}
                                </div>

                                {/* RIGHT PAGE AREA */}
                                <div className="flex-1 relative bg-[#FDFBF6] overflow-hidden flex items-center justify-center">
                                    {rightPageNum && rightPageNum <= numPages ? (
                                        <div className="w-full h-full flex items-center justify-center p-4 md:p-8 opacity-95 transition-opacity">
                                            <Document file={currentPdfUrl} loading={null} className="flex justify-center items-center h-full w-full">
                                                <Page
                                                    pageNumber={rightPageNum}
                                                    width={600}
                                                    className="shadow-sm max-w-full max-h-full object-contain !min-w-0"
                                                    renderAnnotationLayer={false}
                                                    renderTextLayer={false}
                                                    canvasBackground="transparent"
                                                />
                                            </Document>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center">
                                            {/* Empty Right Page */}
                                        </div>
                                    )}
                                    {/* Page Number (Right) */}
                                    {rightPageNum && rightPageNum <= numPages && (
                                        <span className="absolute bottom-6 font-serif text-xs text-stone-400 font-medium">{rightPageNum}</span>
                                    )}
                                </div>

                            </motion.div>
                        </AnimatePresence>

                        {/* Interactive Zones for Flipping (Large Click Areas) */}
                        <div className="absolute inset-y-0 left-0 w-16 md:w-32 cursor-w-resize z-30 group" onClick={prevSpread}>
                            <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-black/5 to-transparent">
                                <ChevronLeft className="w-8 h-8 text-stone-400/50" />
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 w-16 md:w-32 cursor-e-resize z-30 group" onClick={nextSpread}>
                            <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-black/5 to-transparent">
                                <ChevronRight className="w-8 h-8 text-stone-400/50" />
                            </div>
                        </div>

                    </div>

                    {/* Bottom Controls / Status */}
                    <div className="mt-8 flex items-center justify-between gap-8 z-20 w-full max-w-xl px-4">
                        <button
                            onClick={prevSpread}
                            disabled={spreadIndex === 0}
                            className="p-3 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow text-stone-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex flex-col items-center select-none cursor-default bg-white/50 backdrop-blur-sm px-6 py-2 rounded-xl border border-white/20">
                            <span className="font-serif font-bold text-stone-800 text-sm tracking-wide">
                                Paratpara Satakam
                            </span>
                            <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest mt-1">
                                {spreadIndex === 0 ? 'Cover' : `Spread ${spreadIndex}`}
                            </span>
                        </div>

                        <button
                            onClick={nextSpread}
                            disabled={spreadIndex * 2 + 1 >= numPages}
                            className="p-3 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow text-stone-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                </div>
            </main>
        </SettingsProvider>
    );
}
