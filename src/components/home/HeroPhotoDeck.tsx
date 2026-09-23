"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export interface SummitPhoto {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  date: string;
  tag: string;
}

const SUMMIT_PHOTOS: SummitPhoto[] = [
  {
    id: "summit-1",
    image: "/images/ai-summit/summit-1.jpg",
    title: "Global AI Summit",
    subtitle: "Dean & WIE Leadership Meet",
    date: "Bennett University",
    tag: "Meet & Greet 2025",
  },
  {
    id: "summit-2",
    image: "/images/ai-summit/summit-2.jpg",
    title: "Leadership Circle",
    subtitle: "Faculty, Mentors & Core Team",
    date: "Bennett University",
    tag: "Keynote Session",
  },
  {
    id: "summit-3",
    image: "/images/ai-summit/summit-3.jpg",
    title: "Student Organizers",
    subtitle: "WIE Technical Chapter Leads",
    date: "Bennett University",
    tag: "Organizing Committee",
  },
  {
    id: "summit-4",
    image: "/images/ai-summit/summit-4.jpg",
    title: "Summit Delegates",
    subtitle: "Innovators & Future Engineers",
    date: "Bennett University",
    tag: "Felicitation Ceremony",
  },
];

interface HeroPhotoDeckProps {
  className?: string;
}

export function HeroPhotoDeck({ className = "" }: HeroPhotoDeckProps) {
  // Ordered array of photo indices. The first element is always the top card.
  const [deck, setDeck] = useState<number[]>([0, 1, 2, 3]);
  const [activeModalPhoto, setActiveModalPhoto] = useState<SummitPhoto | null>(null);

  const cycleCard = (direction: number = 1) => {
    if (direction > 0) {
      setDeck((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    } else {
      setDeck((prev) => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
    }
  };

  const currentPhoto = SUMMIT_PHOTOS[deck[0]];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top Header Tag */}
      <div className="mb-3 flex items-center space-x-2 px-3 py-1 rounded-full bg-[#120E1C]/90 border border-[#712EB7]/50 backdrop-blur-md shadow-lg shadow-[#712EB7]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8A38D4] animate-pulse" />
        <span className="text-[11px] font-semibold text-[#C4B5FD] tracking-wide">
          AI Summit Moments
        </span>
        <span className="text-[10px] text-[#797380] font-mono">
          {SUMMIT_PHOTOS.indexOf(currentPhoto) + 1}/{SUMMIT_PHOTOS.length}
        </span>
      </div>

      {/* 3D Stack Container */}
      <div className="relative w-[215px] sm:w-[230px] h-[300px] sm:h-[315px] flex items-center justify-center">
        {deck.map((photoIndex, stackIndex) => {
          // Only render top 3 cards in the DOM to keep performance high
          if (stackIndex > 2) return null;

          const photo = SUMMIT_PHOTOS[photoIndex];
          const isTop = stackIndex === 0;

          // Preset visual transforms for the stack depth
          const stackStyles = [
            { scale: 1, rotate: -2, y: 0, x: 0, zIndex: 30, opacity: 1 },
            { scale: 0.94, rotate: 3, y: 8, x: 4, zIndex: 20, opacity: 0.85 },
            { scale: 0.88, rotate: -4, y: 16, x: -3, zIndex: 10, opacity: 0.65 },
          ][stackIndex];

          return isTop ? (
            <TopCard
              key={photo.id}
              photo={photo}
              onSwipe={(dir) => cycleCard(dir)}
              onExpand={() => setActiveModalPhoto(photo)}
            />
          ) : (
            <motion.div
              key={photo.id}
              className="absolute inset-0 rounded-2xl bg-[#120E1C] border border-[#34224E]/80 overflow-hidden shadow-xl p-2.5 flex flex-col justify-between pointer-events-none"
              initial={false}
              animate={{
                scale: stackStyles.scale,
                rotate: stackStyles.rotate,
                y: stackStyles.y,
                x: stackStyles.x,
                opacity: stackStyles.opacity,
                zIndex: stackStyles.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Image Frame */}
              <div className="relative w-full h-[195px] sm:h-[205px] rounded-xl overflow-hidden bg-[#0A0C15]">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="240px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15]/70 via-transparent to-transparent" />
              </div>

              {/* Bottom Label Placeholder */}
              <div className="pt-2 px-1 text-left space-y-0.5">
                <p className="text-xs font-bold text-[#FAF8FD] truncate">{photo.title}</p>
                <p className="text-[10px] text-[#C4B5FD] truncate">{photo.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controls & Swipe Guidance */}
      <div className="mt-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => cycleCard(-1)}
          className="p-1.5 rounded-full bg-[#120E1C]/90 hover:bg-[#1A1428] border border-[#34224E] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors focus:outline-none"
          title="Previous Photo"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => cycleCard(1)}
          className="px-3 py-1 rounded-full bg-[#1A1428] hover:bg-[#231B32] border border-[#34224E] text-[11px] font-semibold text-[#CAC4D1] hover:text-[#FAF8FD] transition-colors flex items-center space-x-1"
        >
          <span>Slide Photo</span>
          <ChevronRight className="w-3 h-3 text-[#8A38D4]" />
        </button>

        <button
          type="button"
          onClick={() => setActiveModalPhoto(currentPhoto)}
          className="p-1.5 rounded-full bg-[#120E1C]/90 hover:bg-[#1A1428] border border-[#34224E] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors focus:outline-none"
          title="Expand Photo"
          aria-label="Expand Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* High-Resolution Photo Lightbox Modal */}
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
              <div>
                <h4 className="text-base font-bold text-[#FAF8FD]">{activeModalPhoto.title}</h4>
                <p className="text-sm text-[#C4B5FD]">{activeModalPhoto.subtitle}</p>
              </div>
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

/**
 * Top interactive card with Framer Motion drag gestures and rotation physics.
 */
function TopCard({
  photo,
  onSwipe,
  onExpand,
}: {
  photo: SummitPhoto;
  onSwipe: (dir: number) => void;
  onExpand: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-18, -2, 18]);
  const opacity = useTransform(x, [-180, -120, 0, 120, 180], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (info.offset.x > 70 || info.velocity.x > 300) {
      onSwipe(1);
    } else if (info.offset.x < -70 || info.velocity.x < -300) {
      onSwipe(-1);
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: 40 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.03, cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 rounded-2xl bg-[#120E1C] border border-[#712EB7]/60 shadow-[0_12px_36px_-8px_rgba(113,46,183,0.35)] p-2.5 flex flex-col justify-between transition-colors group"
    >
      {/* Top Image Frame */}
      <div className="relative w-full h-[195px] sm:h-[205px] rounded-xl overflow-hidden bg-[#0A0C15]">
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          priority
          sizes="250px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15]/80 via-transparent to-transparent opacity-60" />

        {/* Floating Mini Tag */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0A0C15]/80 backdrop-blur-md border border-[#34224E] text-[10px] font-semibold text-[#C4B5FD]">
          {photo.tag}
        </div>

        {/* Expand Action */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0A0C15]/80 hover:bg-[#712EB7] text-[#CAC4D1] hover:text-[#FFFFFF] transition-colors"
          title="View full photo"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Label & Info */}
      <div className="pt-2 px-1 text-left flex items-center justify-between">
        <div className="space-y-0.5 max-w-[155px]">
          <p className="text-xs font-bold text-[#FAF8FD] truncate group-hover:text-[#C4B5FD] transition-colors">
            {photo.title}
          </p>
          <p className="text-[10px] text-[#CAC4D1] truncate">{photo.subtitle}</p>
        </div>

        {/* Small drag hint icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSwipe(1);
          }}
          className="p-1 rounded-lg bg-[#1A1428] border border-[#34224E] text-[#8A38D4] hover:text-[#C4B5FD] transition-colors cursor-pointer"
          title="Click to flip photo"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}
