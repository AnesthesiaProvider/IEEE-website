"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Shuffle, Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export interface SummitPhotoItem {
  id: string;
  image: string;
  title: string;
  tag: string;
}

const SUMMIT_PHOTOS: SummitPhotoItem[] = [
  {
    id: "summit-1",
    image: "/images/ai-summit/summit-1.jpg",
    title: "Global AI Summit",
    tag: "Meet & Greet 2025",
  },
  {
    id: "summit-2",
    image: "/images/ai-summit/summit-2.jpg",
    title: "Leadership Circle",
    tag: "Keynote Session",
  },
  {
    id: "summit-3",
    image: "/images/ai-summit/summit-3.jpg",
    title: "Student Organizers",
    tag: "Organizing Committee",
  },
  {
    id: "summit-4",
    image: "/images/ai-summit/summit-4.jpg",
    title: "Summit Delegates",
    tag: "Felicitation Ceremony",
  },
];

// Initial natural "bikhra hua" (scattered) positions so every photo is visibly spread out
const INITIAL_SCATTER = [
  { x: -36, y: -45, rotate: -9, zIndex: 10 },
  { x: 38, y: -32, rotate: 7, zIndex: 20 },
  { x: -30, y: 35, rotate: -5, zIndex: 30 },
  { x: 34, y: 48, rotate: 10, zIndex: 40 },
];

interface HeroPhotoDeckProps {
  className?: string;
}

export function HeroPhotoDeck({ className = "" }: HeroPhotoDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scatterPositions, setScatterPositions] = useState(INITIAL_SCATTER);
  const [topZIndex, setTopZIndex] = useState(50);
  const [activeModalPhoto, setActiveModalPhoto] = useState<SummitPhotoItem | null>(null);

  // Shuffle / toss the cards with realistic randomized scatter angles and positions
  const shuffleCards = () => {
    setScatterPositions((prev) => {
      const angles = [-12, 9, -7, 13].sort(() => Math.random() - 0.5);
      const xOffsets = [-45, 42, -28, 38].sort(() => Math.random() - 0.5);
      const yOffsets = [-48, -30, 32, 52].sort(() => Math.random() - 0.5);
      const zIndexes = [10, 20, 30, 40].sort(() => Math.random() - 0.5);

      return prev.map((_, i) => ({
        x: xOffsets[i] + (Math.random() * 12 - 6),
        y: yOffsets[i] + (Math.random() * 12 - 6),
        rotate: angles[i] + (Math.random() * 6 - 3),
        zIndex: zIndexes[i],
      }));
    });
  };

  const bringToFront = (index: number) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setScatterPositions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, zIndex: nextZ } : item))
    );
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top Header Tag */}
      <div className="mb-2 flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#120E1C]/90 border border-[#712EB7]/50 backdrop-blur-md shadow-lg shadow-[#712EB7]/15">
        <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD] animate-pulse" />
        <span className="text-xs font-semibold text-[#FAF8FD] tracking-wide">
          AI Summit Moments
        </span>
      </div>

      {/* Scattered Interactive Playfield Area */}
      <div
        ref={containerRef}
        className="relative w-[300px] sm:w-[330px] h-[340px] sm:h-[360px] flex items-center justify-center"
      >
        {SUMMIT_PHOTOS.map((photo, index) => {
          const config = scatterPositions[index];

          return (
            <motion.div
              key={photo.id}
              drag
              dragMomentum={true}
              dragElastic={0.25}
              dragConstraints={containerRef}
              initial={false}
              animate={{
                x: config.x,
                y: config.y,
                rotate: config.rotate,
                zIndex: config.zIndex,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              whileHover={{
                scale: 1.05,
                cursor: "grab",
              }}
              whileDrag={{
                scale: 1.12,
                cursor: "grabbing",
                zIndex: 100,
                boxShadow: "0 25px 50px -12px rgba(113, 46, 183, 0.55)",
              }}
              onDragStart={() => bringToFront(index)}
              onClick={() => bringToFront(index)}
              className="absolute w-[165px] sm:w-[180px] h-[215px] sm:h-[235px] rounded-2xl bg-[#120E1C] p-2 border-2 border-[#34224E] hover:border-[#8A38D4] shadow-2xl transition-colors duration-200 group flex flex-col"
            >
              {/* Photo Frame (No text at bottom) */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A0C15]">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  priority={index < 2}
                  sizes="220px"
                  className="object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Subtle vignette gloss */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15]/40 via-transparent to-transparent pointer-events-none" />

                {/* Quick Expand button in corner */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalPhoto(photo);
                  }}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[#0A0C15]/80 hover:bg-[#712EB7] text-[#CAC4D1] hover:text-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                  title="View full resolution"
                  aria-label="View full resolution"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Shuffle Button and Real-Life Drag Hint */}
      <div className="mt-2 flex flex-col items-center space-y-1">
        <button
          type="button"
          onClick={shuffleCards}
          className="px-4 py-1.5 rounded-full bg-[#1A1428] hover:bg-[#231B32] border border-[#712EB7]/60 text-xs font-semibold text-[#FAF8FD] flex items-center space-x-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-[#712EB7]/25 cursor-pointer group"
          title="Shuffle photos"
        >
          <Shuffle className="w-3.5 h-3.5 text-[#C4B5FD] transition-transform duration-500 group-hover:rotate-180" />
          <span>Shuffle Photos</span>
        </button>

        <span className="text-[10px] text-[#797380] tracking-wide">
          Drag & throw photos freely
        </span>
      </div>

      {/* Full-Screen High-Resolution Lightbox Modal */}
      {activeModalPhoto && (
        <Modal
          isOpen={!!activeModalPhoto}
          onClose={() => setActiveModalPhoto(null)}
          title={activeModalPhoto.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4">
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-[#0A0C15] border border-[#34224E]">
              <Image
                src={activeModalPhoto.image}
                alt={activeModalPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs px-1">
              <h4 className="text-base font-bold text-[#FAF8FD]">{activeModalPhoto.title}</h4>
              <span className="px-3 py-1 rounded-full bg-[#712EB7]/30 border border-[#712EB7]/50 text-[#C4B5FD] font-semibold">
                {activeModalPhoto.tag}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
