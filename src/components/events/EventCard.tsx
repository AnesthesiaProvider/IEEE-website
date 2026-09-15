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
      <div className="group relative flex flex-col rounded-2xl bg-[#121015]/90 border border-[#2A202D] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#5C2948] hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(122,24,51,0.25)]">
        {/* Event Poster Header */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#18131B]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0F] via-[#0D0B0F]/30 to-transparent" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-[#121015]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#5C2948] text-xs font-semibold text-[#E07AB0]">
            {event.category}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {event.status === "upcoming" ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#4A1028]/70 text-[#F5F1F5] border border-[#8F2450] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D05A9E] mr-1.5 animate-pulse" />
                Upcoming
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#18131B] text-[#A79EAB] border border-[#2A202D] text-[11px] font-semibold">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#A79EAB] font-medium">
              <div className="flex items-center space-x-1.5 text-[#C75491]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#756B7A]" />
                <span className="truncate max-w-[180px]">{event.venue}</span>
              </div>
              {event.participantsCount && (
                <div className="flex items-center space-x-1.5 text-[#914B91]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{event.participantsCount}+ attendees</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#F5F1F5] group-hover:text-[#E07AB0] transition-colors leading-snug">
              {event.title}
            </h3>

            {/* Short Description */}
            <p className="text-sm text-[#D8D0DA] line-clamp-2 leading-relaxed">
              {event.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#18131B] border border-[#2A202D] text-[11px] text-[#A79EAB]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#2A202D] flex items-center justify-between gap-3">
            <button
              onClick={() => setIsDetailsOpen(true)}
              className="text-xs font-semibold text-[#D8D0DA] hover:text-[#E07AB0] transition-colors flex items-center space-x-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>

            <div className="flex items-center gap-2">
              {event.galleryImages && event.galleryImages.length > 0 && (
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#18131B] hover:bg-[#2A202D] text-[#D8D0DA] text-xs font-medium border border-[#2A202D] flex items-center space-x-1.5 transition-colors"
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
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#5A1025] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] text-xs font-semibold shadow-md shadow-[#7A1833]/30 flex items-center space-x-1.5 transition-all"
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
          <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#18131B]">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0F] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#7A1833]/80 text-[#F5F1F5] text-xs font-semibold backdrop-blur-md">
                {event.category}
              </span>
              <span className="text-xs text-[#D8D0DA] bg-[#0D0B0F]/80 px-3 py-1 rounded-full border border-[#2A202D] backdrop-blur-md">
                {event.date} {event.time && `• ${event.time}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-[#C75491]">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <p className="text-[#D8D0DA] text-sm leading-relaxed whitespace-pre-line">
              {event.fullDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-[#18131B] border border-[#2A202D] text-xs text-[#A79EAB]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {event.registrationOpen && event.registrationLink && (
            <div className="pt-4 border-t border-[#2A202D] flex justify-end">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5A1025] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] text-sm font-semibold shadow-lg shadow-[#7A1833]/30 inline-flex items-center space-x-2"
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
                className="relative h-56 rounded-xl overflow-hidden bg-[#18131B] border border-[#2A202D]"
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
