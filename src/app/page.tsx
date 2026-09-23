"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code2,
  BookOpen,
  Crown,
  Share2,
  Users,
  Calendar,
  Terminal,
  Rocket,
  ChevronRight,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { FuturisticHeroCanvas } from "@/components/ui/FuturisticHeroCanvas";
import { StatCounter } from "@/components/ui/StatCounter";
import { TeamCard } from "@/components/team/TeamCard";
import { EventCard } from "@/components/events/EventCard";
import { RecruitmentCountdown } from "@/components/home/RecruitmentCountdown";
import { ApocalypseRegistrationModal } from "@/components/events/ApocalypseRegistrationModal";
import { seniorCoreTeam } from "@/data/team";
import { chapterEvents } from "@/data/events";
import { impactStats } from "@/data/stats";

const statIconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5 text-[#712EB7]" />,
  Calendar: <Calendar className="w-5 h-5 text-[#876DBF]" />,
  Terminal: <Terminal className="w-5 h-5 text-[#D88CF5]" />,
  Rocket: <Rocket className="w-5 h-5 text-[#712EB7]" />,
};

const aboutPillars = [
  {
    title: "Innovate",
    description:
      "Explore emerging technologies, build meaningful solutions, and turn conceptual blueprints into deployed systems.",
    icon: <Code2 className="w-6 h-6 text-[#712EB7]" />,
    gradient: "from-[#712EB7]/20 to-transparent",
    border: "group-hover:border-[#4B326D]",
  },
  {
    title: "Learn",
    description:
      "Participate in cutting-edge bootcamps, technical masterclasses, and hands-on experiences across AI, Web3, and IoT.",
    icon: <BookOpen className="w-6 h-6 text-[#876DBF]" />,
    gradient: "from-[#34224E]/20 to-transparent",
    border: "group-hover:border-[#34224E]",
  },
  {
    title: "Lead",
    description:
      "Develop executive leadership, project management, and public speaking skills while steering campus-wide technical events.",
    icon: <Crown className="w-6 h-6 text-[#D88CF5]" />,
    gradient: "from-[#664BA3]/20 to-transparent",
    border: "group-hover:border-[#664BA3]",
  },
  {
    title: "Connect",
    description:
      "Build enduring relationships with fellow students, faculty, research mentors, and distinguished female industry leaders.",
    icon: <Share2 className="w-6 h-6 text-[#876DBF]" />,
    gradient: "from-[#34224E]/20 to-transparent",
    border: "group-hover:border-[#4B326D]",
  },
];

export default function HomePage() {
  const previewTeam = seniorCoreTeam.slice(0, 4);
  const previewEvents = chapterEvents.filter((e) => e.status === "upcoming").slice(0, 3);
  const [isApocalypseModalOpen, setIsApocalypseModalOpen] = useState(false);
  const [hasRegisteredOnDevice, setHasRegisteredOnDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("apocalypse_registered_team");
        if (stored) {
          setHasRegisteredOnDevice(true);
        }
      } catch {
        // Ignore
      }
    }
  }, [isApocalypseModalOpen]);

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="glow-orb-wine w-96 h-96 top-20 -left-20" />
      <div className="glow-orb-purple w-[450px] h-[450px] top-80 -right-20" />

      {/* Background Interactive Technological Network Simulation */}
      <div className="absolute inset-x-0 top-0 h-[1050px] sm:h-[1150px] lg:h-[1350px] overflow-hidden pointer-events-none -z-0 opacity-60">
        <FuturisticHeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0C15]/30 to-[#0A0C15] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-12 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 flex flex-col items-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1A1428] border border-[#34224E] text-xs font-semibold text-[#D88CF5] backdrop-blur-md shadow-sm">
              <Image
                src="/images/wie-logo.png"
                alt="IEEE WIE Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain filter drop-shadow-[0_0_3px_rgba(216,140,245,0.4)]"
              />
              <span>IEEE WIE • Bennett University</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF8FD] leading-[1.1]">
              Empowering Women. <br />
              <span className="bg-gradient-to-r from-[#FAF8FD] via-[#D88CF5] to-[#876DBF] bg-clip-text text-transparent">
                Engineering the Future.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#CAC4D1] max-w-2xl leading-relaxed">
              IEEE Women in Engineering at Bennett University is a community of innovators, creators, leaders, and future engineers working together to learn, build, and inspire.
            </p>

            {/* Key Bullet Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 text-sm text-[#CAC4D1]">
              <div className="flex items-center space-x-2 bg-[#1A1428]/60 px-4 py-2 rounded-full border border-[#231B32]">
                <CheckCircle2 className="w-4 h-4 text-[#712EB7] shrink-0" />
                <span>National Hackathons & Tech Conferences</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1A1428]/60 px-4 py-2 rounded-full border border-[#231B32]">
                <CheckCircle2 className="w-4 h-4 text-[#876DBF] shrink-0" />
                <span>Industry Mentorship & Research Circles</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/junior-core"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#34224E] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FAF8FD] font-semibold text-sm shadow-xl shadow-[#712EB7]/30 flex items-center space-x-2 transition-all duration-300 hover:scale-[1.03]"
              >
                <Sparkles className="w-4 h-4 text-[#D88CF5]" />
                <span>Join Junior Core</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsApocalypseModalOpen(true)}
                className="px-7 py-3.5 rounded-full bg-[#120E1C] hover:bg-[#1A1428] text-[#CAC4D1] hover:text-[#FAF8FD] font-semibold text-sm border border-[#34224E] hover:border-[#712EB7] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] flex items-center space-x-2.5 shadow-lg shadow-[#712EB7]/20 cursor-pointer group"
              >
                <Flame className="w-4 h-4 text-[#D88CF5] group-hover:text-[#FAF8FD] transition-colors" />
                <span>
                  {hasRegisteredOnDevice ? "View Apocalypse WIE X BC3 Team" : "Register for Apocalypse WIE X BC3"}
                </span>
                <ArrowRight className="w-4 h-4 text-[#712EB7] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. JUNIOR CORE RECRUITMENT COUNTDOWN (WAITLIST)                           */}
      {/* ========================================================================= */}
      <div className="relative z-10">
        <RecruitmentCountdown />
      </div>

      {/* ========================================================================= */}
      {/* 3. ABOUT IEEE WIE SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 bg-[#120E1C]/40 border-y border-[#231B32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D88CF5] bg-[#1A1428] px-3 py-1 rounded-full border border-[#34224E]">
              Our Vision & Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8FD] tracking-tight">
              Where Ideas Become Impact.
            </h2>
            <p className="text-[#CAC4D1] text-base sm:text-lg leading-relaxed">
              IEEE Women in Engineering is a global community dedicated to inspiring and empowering women in engineering and technology. At Bennett University, we bring this vision to campus through technical events, workshops, leadership opportunities, collaborative projects, networking, and a community that encourages students to build fearlessly.
            </p>
          </div>

          {/* 4 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative rounded-2xl bg-[#120E1C]/90 border border-[#231B32] backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${pillar.border}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${pillar.gradient} rounded-tr-2xl pointer-events-none opacity-60`} />

                <div className="w-12 h-12 rounded-xl bg-[#1A1428] border border-[#231B32] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-bold text-[#FAF8FD] mb-2 group-hover:text-[#D88CF5] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#797380] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. IMPACT & STATISTICS SECTION                                            */}
      {/* ========================================================================= */}
      <section className="relative py-16 bg-gradient-to-b from-[#0A0C15] via-[#120E1C] to-[#0A0C15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#1A1428]/80 border border-[#34224E] backdrop-blur-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Radiant glow accent */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#712EB7]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF8FD]">
                Our Growing Impact at Bennett University
              </h2>
              <p className="text-sm text-[#797380] mt-1">
                Fostering an ecosystem where future engineering leaders thrive.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#231B32]">
              {impactStats.map((stat) => (
                <div key={stat.id} className="pt-6 sm:pt-0 sm:px-6 text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="p-2.5 rounded-xl bg-[#120E1C] border border-[#231B32]">
                      {statIconMap[stat.iconName]}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#FAF8FD] via-[#D88CF5] to-[#876DBF] bg-clip-text text-transparent">
                    <StatCounter value={stat.numericValue} suffix={stat.suffix} />
                  </div>
                  <h4 className="text-sm font-semibold text-[#FAF8FD] tracking-wide">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-[#797380] hidden sm:block max-w-[200px] mx-auto leading-normal">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SENIOR CORE PREVIEW SECTION                                            */}
      {/* ========================================================================= */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D88CF5] bg-[#1A1428] px-3 py-1 rounded-full border border-[#34224E]">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8FD] mt-2">
                Meet the Senior Core Team
              </h2>
              <p className="text-sm sm:text-base text-[#797380] mt-1">
                The people building the next generation of IEEE WIE at Bennett University.
              </p>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#712EB7] hover:text-[#D88CF5] transition-colors group self-start md:self-auto"
            >
              <span>Meet the Full Team</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. UPCOMING EVENTS PREVIEW                                                */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-[#120E1C]/50 border-t border-[#231B32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D88CF5] bg-[#1A1428] px-3 py-1 rounded-full border border-[#34224E]">
                What&apos;s Happening
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8FD] mt-2">
                Upcoming Events & Hackathons
              </h2>
              <p className="text-sm sm:text-base text-[#797380] mt-1">
                Deepen your engineering acumen through high-octane competitions and workshops.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#712EB7] hover:text-[#D88CF5] transition-colors group self-start md:self-auto"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HIGH-IMPACT JOIN COMMUNITY BANNER                                      */}
      {/* ========================================================================= */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1D162A]/90 via-[#161024]/95 to-[#120E1C] border border-[#34224E] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
            
            {/* Abstract decorative rings */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#712EB7]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#34224E]/20 blur-3xl pointer-events-none" />

            <span className="relative z-10 inline-block text-xs font-bold uppercase tracking-widest text-[#D88CF5] bg-[#1A1428]/80 px-3 py-1 rounded-full border border-[#4B326D]">
              Your Next Step
            </span>

            <h2 className="relative z-10 text-3xl sm:text-5xl font-extrabold text-[#FAF8FD] tracking-tight max-w-2xl mx-auto">
              Your Ideas Belong Here.
            </h2>

            <p className="relative z-10 text-base sm:text-lg text-[#CAC4D1] max-w-2xl mx-auto leading-relaxed">
              Whether you build, design, organize, research, create, or simply want to learn — there&apos;s a place for you in IEEE WIE.
            </p>

            <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/join"
                className="px-8 py-3.5 rounded-full bg-[#120E1C] hover:bg-[#1A1428] text-[#FAF8FD] font-semibold text-sm border border-[#34224E] hover:border-[#712EB7] transition-all shadow-lg"
              >
                Join the Community
              </Link>
              <Link
                href="/junior-core"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#34224E] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#D88CF5] text-[#FAF8FD] font-semibold text-sm shadow-xl shadow-[#712EB7]/35 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#D88CF5]" />
                <span>Apply for Junior Core</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Apocalypse 2026 Registration Modal */}
      <ApocalypseRegistrationModal
        isOpen={isApocalypseModalOpen}
        onClose={() => setIsApocalypseModalOpen(false)}
      />

    </div>
  );
}
