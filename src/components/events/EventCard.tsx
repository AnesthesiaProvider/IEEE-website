"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  ArrowRight,
  Image as ImageIcon,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { ChapterEvent } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { ApocalypseRegistrationModal } from "@/components/events/ApocalypseRegistrationModal";

interface EventCardProps {
  event: ChapterEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isApocalypseModalOpen, setIsApocalypseModalOpen] = useState(false);
  const [hasRegisteredOnDevice, setHasRegisteredOnDevice] = useState(false);

  const isApocalypseEvent = event.id === "apocalypse-2026" || event.slug === "apocalypse";

  useEffect(() => {
    if (typeof window !== "undefined" && isApocalypseEvent) {
      try {
        const stored = localStorage.getItem("apocalypse_registered_team");
        if (stored) {
          setHasRegisteredOnDevice(true);
        }
      } catch {
        // Ignore localStorage error
      }
    }
  }, [isApocalypseEvent, isApocalypseModalOpen]);


  return (
    <>
      <div className="group relative flex flex-col rounded-2xl bg-[#120E1C]/90 border border-[#231B32] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#664BA3] hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(113,46,183,0.3)]">
        {/* Event Poster Header */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#1A1428]">
          {event.galleryImages && event.galleryImages.length > 1 ? (
            <div className="grid grid-cols-2 h-full w-full gap-1 p-1 bg-[#120E1C]">
              {event.galleryImages.slice(0, 2).map((img, idx) => (
                <div key={idx} className="relative h-full w-full rounded-lg overflow-hidden bg-[#0A0C15]">
                  <Image
                    src={img}
                    alt={`${event.title} poster ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15] via-transparent to-transparent opacity-50" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15] via-[#0A0C15]/30 to-transparent" />
            </>
          )}

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-[#120E1C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#664BA3]/50 text-xs font-semibold text-[#D88CF5]">
            {event.category}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {event.status === "upcoming" ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#34224E]/80 text-[#FAF8FD] border border-[#712EB7] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D88CF5] mr-1.5 animate-pulse" />
                Upcoming
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1A1428] text-[#CAC4D1] border border-[#231B32] text-[11px] font-semibold">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#CAC4D1] font-medium">
              <div className="flex items-center space-x-1.5 text-[#D88CF5]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#797380]" />
                <span className="truncate max-w-[180px]">{event.venue}</span>
              </div>
              {event.participantsCount && (
                <div className="flex items-center space-x-1.5 text-[#876DBF]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{event.participantsCount}+ attendees</span>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#FAF8FD] group-hover:text-[#D88CF5] transition-colors leading-snug">
                {event.title}
              </h3>
              {event.subtitle && (
                <p className="text-xs font-semibold text-[#876DBF] tracking-wide">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#FAF8FD]/80 line-clamp-2 leading-relaxed">
              {event.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#1A1428] border border-[#231B32] text-[11px] text-[#CAC4D1]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#231B32] flex items-center justify-between gap-3">
            <button
              onClick={() => setIsDetailsOpen(true)}
              className="text-xs font-semibold text-[#FAF8FD]/90 hover:text-[#D88CF5] transition-colors flex items-center space-x-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>

            <div className="flex items-center gap-2">
              {event.galleryImages && event.galleryImages.length > 0 && (
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#1A1428] hover:bg-[#231B32] text-[#FAF8FD] text-xs font-medium border border-[#231B32] flex items-center space-x-1.5 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </button>
              )}

              {event.registrationOpen && (
                isApocalypseEvent ? (
                  hasRegisteredOnDevice ? (
                    <button
                      onClick={() => setIsApocalypseModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1A1428] hover:bg-[#231B32] text-[#D88CF5] border border-[#664BA3] text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D88CF5]" />
                      <span>Team Registered</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsApocalypseModalOpen(true)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FFFFFF] text-xs font-semibold shadow-md shadow-[#712EB7]/30 flex items-center space-x-1.5 transition-all"
                    >
                      <Users className="w-3.5 h-3.5 text-[#FAF8FD]" />
                      <span>Register Team</span>
                    </button>
                  )
                ) : event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FFFFFF] text-xs font-semibold shadow-md shadow-[#712EB7]/30 flex items-center space-x-1.5 transition-all"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null
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
          {event.galleryImages && event.galleryImages.length > 1 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.galleryImages.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-60 sm:h-72 rounded-xl overflow-hidden bg-[#0A0C15] border border-[#34224E]"
                  >
                    <Image
                      src={img}
                      alt={`${event.title} Official Poster ${idx + 1}`}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#0A0C15]/90 border border-[#34224E] text-[10px] font-semibold text-[#D88CF5]">
                      Poster {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs px-1 text-[#CAC4D1]">
                <span className="px-2.5 py-1 rounded-full bg-[#712EB7]/30 text-[#D88CF5] border border-[#712EB7]/50 font-semibold">
                  {event.category}
                </span>
                <span className="bg-[#1A1428] px-3 py-1 rounded-full border border-[#231B32]">
                  {event.date} {event.time && `• ${event.time}`}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#1A1428]">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#712EB7]/80 text-[#FAF8FD] text-xs font-semibold backdrop-blur-md">
                  {event.category}
                </span>
                <span className="text-xs text-[#FAF8FD]/90 bg-[#0A0C15]/80 px-3 py-1 rounded-full border border-[#231B32] backdrop-blur-md">
                  {event.date} {event.time && `• ${event.time}`}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {event.subtitle && (
              <p className="text-sm font-semibold text-[#D88CF5] italic">
                {event.subtitle}
              </p>
            )}
            <div className="flex items-center space-x-2 text-sm text-[#D88CF5]">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <p className="text-[#FAF8FD]/90 text-sm leading-relaxed whitespace-pre-line">
              {event.fullDescription}
            </p>
          </div>

          {/* Featured Leadership / Dignitaries */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="space-y-2.5 p-4 rounded-xl bg-[#1A1428] border border-[#231B32]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D88CF5] flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-[#876DBF]" />
                <span>Featured Leadership & Dignitaries</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.speakers.map((sp, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-lg bg-[#120E1C] border border-[#231B32] flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D88CF5]" />
                    <span className="text-xs font-semibold text-[#FAF8FD]">{sp.role}</span>
                    {sp.name && <span className="text-xs text-[#CAC4D1]">— {sp.name}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="space-y-2.5 p-4 rounded-xl bg-[#1A1428] border border-[#231B32]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D88CF5] flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#876DBF]" />
                <span>Event Highlights & Takeaways</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#FAF8FD]/90">
                {event.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#D88CF5] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Series Episodes Breakdown */}
          {event.episodes && event.episodes.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl bg-[#1A1428] border border-[#231B32]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D88CF5] flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#876DBF]" />
                <span>Series Episodes Breakdown</span>
              </h4>
              <div className="space-y-2.5">
                {event.episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#120E1C] border border-[#231B32]/80 space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#34224E]/80 text-[#D88CF5] border border-[#712EB7]/60">
                        {ep.episode}
                      </span>
                      <span className="text-xs font-bold text-[#FAF8FD]">{ep.title}</span>
                    </div>
                    <p className="text-xs text-[#CAC4D1] leading-relaxed pl-1">{ep.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Distinguished External Judges */}
          {event.judges && event.judges.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl bg-[#1A1428] border border-[#231B32]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D88CF5] flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-[#876DBF]" />
                <span>Distinguished External Judges</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {event.judges.map((judge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#120E1C] border border-[#231B32] flex flex-col justify-between space-y-1"
                  >
                    <p className="text-xs font-bold text-[#FAF8FD]">{judge.name}</p>
                    <p className="text-[11px] text-[#D88CF5] font-medium">{judge.role}</p>
                    <p className="text-[11px] text-[#CAC4D1]">{judge.company}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer tags and buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#231B32]">
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-[#1A1428] border border-[#231B32] text-xs text-[#CAC4D1]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {event.galleryImages && event.galleryImages.length > 0 && (
              <button
                onClick={() => {
                  setIsDetailsOpen(false);
                  setIsGalleryOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#1A1428] hover:bg-[#231B32] text-[#FAF8FD] text-xs font-semibold border border-[#231B32] flex items-center space-x-1.5 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#D88CF5]" />
                <span>View Event Gallery &rarr;</span>
              </button>
            )}

            {event.registrationOpen && (
              isApocalypseEvent ? (
                hasRegisteredOnDevice ? (
                  <button
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setIsApocalypseModalOpen(true);
                    }}
                    className="px-6 py-2 rounded-xl bg-[#1A1428] hover:bg-[#231B32] border border-[#664BA3] text-[#D88CF5] text-xs font-semibold shadow-md inline-flex items-center space-x-2 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D88CF5]" />
                    <span>View Registered Squad</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setIsApocalypseModalOpen(true);
                    }}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FFFFFF] text-xs font-semibold shadow-lg shadow-[#712EB7]/30 inline-flex items-center space-x-2 transition-all"
                  >
                    <Users className="w-3.5 h-3.5 text-[#FAF8FD]" />
                    <span>Register Squad (2–4 Members)</span>
                  </button>
                )
              ) : event.registrationLink ? (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FFFFFF] text-xs font-semibold shadow-lg shadow-[#712EB7]/30 inline-flex items-center space-x-2"
                >
                  <span>Register for this Event</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null
            )}
          </div>
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
                className="relative h-56 rounded-xl overflow-hidden bg-[#1A1428] border border-[#231B32]"
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

      {/* Apocalypse Team Registration Modal */}
      {isApocalypseEvent && (
        <ApocalypseRegistrationModal
          isOpen={isApocalypseModalOpen}
          onClose={() => setIsApocalypseModalOpen(false)}
        />
      )}
    </>
  );
}
