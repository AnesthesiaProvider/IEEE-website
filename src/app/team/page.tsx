"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Users, Filter } from "lucide-react";
import { TeamCard } from "@/components/team/TeamCard";
import { seniorCoreTeam } from "@/data/team";

const domains = [
  "Leadership"
] as const;

export default function TeamPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = seniorCoreTeam.filter((member) => {
    const matchesDomain =
      selectedDomain === "All" || member.domain === selectedDomain;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.yearAndBranch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Dynamic ambient glow */}
      <div className="glow-orb-purple w-96 h-96 top-10 -left-20" />
      <div className="glow-orb-wine w-96 h-96 top-96 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A1428] border border-[#34224E] text-xs font-semibold text-[#D88CF5] backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-[#D88CF5]" />
            <span>Executive Board & Leads</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF8FD] tracking-tight">
            Meet the Senior Core Team
          </h1>

          <p className="text-[#FAF8FD]/80 text-base sm:text-lg leading-relaxed">
            The people building the next generation of IEEE WIE at Bennett University. Dedicated to fostering innovation, mentorship, and technical excellence.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Domain Tabs */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
            {domains.map((domain) => {
              const isActive = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-[#664BA3] to-[#712EB7] text-[#FFFFFF] shadow-lg shadow-[#712EB7]/30 border border-[#712EB7]"
                    : "bg-[#120E1C] text-[#CAC4D1] hover:text-[#FAF8FD] border border-[#231B32] hover:bg-[#1A1428] hover:border-[#34224E]"
                    }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#CAC4D1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#FAF8FD] placeholder-[#797380] text-xs focus:outline-none focus:border-[#712EB7] focus:ring-1 focus:ring-[#712EB7]/30 transition-all"
            />
          </div>
        </div>

        {/* Team Grid */}
        {filteredMembers.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-[#120E1C]/60 rounded-2xl border border-[#231B32]">
            <Users className="w-10 h-10 text-[#797380] mx-auto" />
            <h3 className="text-lg font-bold text-[#FAF8FD]">No team members found</h3>
            <p className="text-sm text-[#CAC4D1]">
              Try modifying your search query or domain filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
