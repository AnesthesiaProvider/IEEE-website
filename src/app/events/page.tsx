"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, Filter, AlertCircle } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { chapterEvents } from "@/data/events";
import { EventCategory } from "@/lib/types";

const categories: EventCategory[] = [
  "All",
  "Workshops",
  "Technical",
  "Competitions",
  "Speaker Sessions",
  "Networking",
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");

  const filterEvent = (e: (typeof chapterEvents)[0]) => {
    if (selectedCategory === "All") return true;
    return e.category === selectedCategory;
  };

  const upcomingEvents = chapterEvents.filter((e) => e.status === "upcoming" && filterEvent(e));
  const pastEvents = chapterEvents.filter((e) => e.status === "past" && filterEvent(e));

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Dynamic ambient glows */}
      <div className="glow-orb-purple w-96 h-96 top-12 -left-20" />
      <div className="glow-orb-purple w-96 h-96 top-96 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A1428] border border-[#34224E] text-xs font-semibold text-[#C4B5FD] backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Chapter Activities & Timeline</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF8FD] tracking-tight">
            Events & Hackathons
          </h1>

          <p className="text-[#FAF8FD]/80 text-base sm:text-lg leading-relaxed">
            From overnight coding sprints to expert leadership roundtables, discover opportunities to grow your network and craft impactful technology.
          </p>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#664BA3] to-[#712EB7] text-[#FFFFFF] shadow-lg shadow-[#712EB7]/30 border border-[#712EB7]"
                    : "bg-[#120E1C] text-[#CAC4D1] hover:text-[#FAF8FD] border border-[#231B32] hover:bg-[#1A1428]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section 1: Upcoming Events */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center space-x-3 border-b border-[#231B32] pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8A38D4] animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF8FD] tracking-tight">
              Upcoming Events
            </h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#120E1C]/70 border border-[#231B32] space-y-3">
              <AlertCircle className="w-8 h-8 text-[#876DBF] mx-auto" />
              <p className="text-base font-semibold text-[#FAF8FD]">
                No upcoming events right now in this category.
              </p>
              <p className="text-xs text-[#CAC4D1] max-w-md mx-auto">
                Follow IEEE WIE Bennett University on social channels for upcoming announcements and registration releases.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Past Events Archive */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3 border-b border-[#231B32] pb-4">
            <Calendar className="w-5 h-5 text-[#876DBF]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF8FD] tracking-tight">
              Past Events & Milestones
            </h2>
          </div>

          {pastEvents.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {pastEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#120E1C]/40 border border-[#231B32] text-[#CAC4D1] text-sm">
              No past events recorded for this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
