"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Maximize2 } from "lucide-react";
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
  { x: -36, y: -42, rotate: -9, zIndex: 10 },
  { x: 38, y: -26, rotate: 7, zIndex: 20 },
  { x: -30, y: 36, rotate: -5, zIndex: 30 },
  { x: 34, y: 50, rotate: 10, zIndex: 40 },
];

interface HeroPhotoDeckProps {
  className?: string;
}

export function HeroPhotoDeck({ className = "" }: HeroPhotoDeckProps) {
  const [scatterPositions, setScatterPositions] = useState(INITIAL_SCATTER);
  const [topZIndex, setTopZIndex] = useState(50);
  const [activeModalPhoto, setActiveModalPhoto] = useState<SummitPhotoItem | null>(null);

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
      <div className="relative w-[320px] sm:w-[350px] h-[370px] sm:h-[400px] flex items-center justify-center">
        {SUMMIT_PHOTOS.map((photo, index) => {
          const config = scatterPositions[index];

          return (
            <motion.div
              key={photo.id}
              drag
              dragMomentum={true}
              dragElastic={false}
              /* No dragConstraints so the user can drag & throw pictures anywhere including off screen */
              initial={false}
              animate={{
                x: config.x,
                y: config.y,
                rotate: config.rotate,
                zIndex: config.zIndex,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
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
              className="absolute w-[190px] sm:w-[210px] h-[250px] sm:h-[275px] rounded-2xl bg-[#120E1C] p-2 border-2 border-[#34224E] hover:border-[#8A38D4] shadow-2xl transition-colors duration-200 group flex flex-col"
            >
              {/* Photo Frame (No text at bottom) */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A0C15]">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  priority={index < 2}
                  sizes="240px"
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
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0A0C15]/80 hover:bg-[#712EB7] text-[#CAC4D1] hover:text-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                  title="View full resolution"
                  aria-label="View full resolution"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
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
