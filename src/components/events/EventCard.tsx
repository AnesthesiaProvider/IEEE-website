"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, ExternalLink, ArrowRight, Image as ImageIcon } from "lucide-react";
import { ChapterEvent } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

interface EventCardProps {
  event: ChapterEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-white/8 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(139,92,246,0.3)]">
        {/* Event Poster Header */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-800">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-violet-500/30 text-xs font-semibold text-violet-300">
            {event.category}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {event.status === "upcoming" ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                Upcoming
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-white/10 text-[11px] font-semibold">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center space-x-1.5 text-cyan-300">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate max-w-[180px]">{event.venue}</span>
              </div>
              {event.participantsCount && (
                <div className="flex items-center space-x-1.5 text-violet-300">
                  <Users className="w-3.5 h-3.5" />
                  <span>{event.participantsCount}+ attendees</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              {event.title}
            </h3>

            {/* Short Description */}
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {event.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
            <button
              onClick={() => setIsDetailsOpen(true)}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>

            <div className="flex items-center gap-2">
              {event.galleryImages && event.galleryImages.length > 0 && (
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 flex items-center space-x-1.5 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </button>
              )}

              {event.registrationOpen && event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-violet-600/25 flex items-center space-x-1.5 transition-all"
                >
                  <span>Register</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={event.title}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-5">
          <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-800">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-violet-600/80 text-white text-xs font-semibold backdrop-blur-md">
                {event.category}
              </span>
              <span className="text-xs text-slate-200 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                {event.date} {event.time && `• ${event.time}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-cyan-300">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {event.fullDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-xs text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {event.registrationOpen && event.registrationLink && (
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 inline-flex items-center space-x-2"
              >
                <span>Register for this Event</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </Modal>

      {/* Event Gallery Lightbox Modal */}
      {event.galleryImages && (
        <Modal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          title={`${event.title} - Event Highlights`}
          maxWidth="max-w-4xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative h-56 rounded-xl overflow-hidden bg-slate-800 border border-white/10"
              >
                <Image
                  src={img}
                  alt={`${event.title} moment ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
